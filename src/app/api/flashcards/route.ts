import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { calculateSM2 } from "@/lib/sm2";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const moduleTag = searchParams.get("module");
    const dueOnly = searchParams.get("due") === "true";

    // Get flashcards with user state
    const flashcards = await prisma.flashcard.findMany({
      where: moduleTag ? { moduleTag } : undefined,
      include: {
        states: {
          where: { userId: session.userId },
        },
      },
    });

    // Transform to include state or defaults
    const now = new Date();
    const transformed = flashcards.map((fc) => {
      const state = fc.states[0];
      return {
        id: fc.id,
        moduleTag: fc.moduleTag,
        front: fc.front,
        back: fc.back,
        cardType: fc.cardType,
        easeFactor: state?.easeFactor ?? 2.5,
        interval: state?.interval ?? 1,
        repetitions: state?.repetitions ?? 0,
        nextReview: state?.nextReview ?? now,
        isDue: !state || new Date(state.nextReview) <= now,
      };
    });

    // Filter to due cards if requested
    const result = dueOnly
      ? transformed.filter((fc) => fc.isDue)
      : transformed;

    // Sort by next review date (soonest first for due cards)
    result.sort((a, b) =>
      new Date(a.nextReview).getTime() - new Date(b.nextReview).getTime()
    );

    return NextResponse.json({ flashcards: result });
  } catch (error) {
    console.error("Get flashcards error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { flashcardId, quality } = await request.json();

    if (quality < 0 || quality > 5) {
      return NextResponse.json(
        { error: "Quality must be between 0 and 5" },
        { status: 400 }
      );
    }

    // Get current state or defaults
    const currentState = await prisma.flashcardState.findUnique({
      where: {
        userId_flashcardId: {
          userId: session.userId,
          flashcardId,
        },
      },
    });

    const previousState = {
      easeFactor: currentState?.easeFactor ?? 2.5,
      interval: currentState?.interval ?? 1,
      repetitions: currentState?.repetitions ?? 0,
    };

    // Calculate new state using SM-2
    const newState = calculateSM2(quality, previousState);

    // Upsert state
    await prisma.flashcardState.upsert({
      where: {
        userId_flashcardId: {
          userId: session.userId,
          flashcardId,
        },
      },
      create: {
        userId: session.userId,
        flashcardId,
        easeFactor: newState.easeFactor,
        interval: newState.interval,
        repetitions: newState.repetitions,
        nextReview: newState.nextReviewDate,
        lastReview: new Date(),
      },
      update: {
        easeFactor: newState.easeFactor,
        interval: newState.interval,
        repetitions: newState.repetitions,
        nextReview: newState.nextReviewDate,
        lastReview: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      newState: {
        ...newState,
        nextReview: newState.nextReviewDate,
      },
    });
  } catch (error) {
    console.error("Update flashcard state error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
