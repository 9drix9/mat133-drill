import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const progress = await prisma.moduleProgress.findMany({
      where: { userId: session.userId },
    });

    // Calculate accuracy for each module
    const progressWithAccuracy = progress.map((p) => ({
      ...p,
      accuracy: p.totalAttempts > 0
        ? Math.round((p.correctCount / p.totalAttempts) * 100)
        : 0,
    }));

    // Get recent attempts for timeline
    const recentAttempts = await prisma.questionAttempt.findMany({
      where: { userId: session.userId },
      include: { question: { select: { moduleTag: true } } },
      orderBy: { attemptedAt: "desc" },
      take: 50,
    });

    return NextResponse.json({
      progress: progressWithAccuracy,
      recentAttempts,
    });
  } catch (error) {
    console.error("Get progress error:", error);
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

    const { questionId, userAnswer, isCorrect, timeSpentMs, moduleTag } = await request.json();

    // Record attempt
    await prisma.questionAttempt.create({
      data: {
        userId: session.userId,
        questionId,
        userAnswer,
        isCorrect,
        timeSpentMs,
      },
    });

    // Update module progress
    await prisma.moduleProgress.upsert({
      where: {
        userId_moduleTag: {
          userId: session.userId,
          moduleTag,
        },
      },
      create: {
        userId: session.userId,
        moduleTag,
        totalAttempts: 1,
        correctCount: isCorrect ? 1 : 0,
        lastPracticed: new Date(),
      },
      update: {
        totalAttempts: { increment: 1 },
        ...(isCorrect && { correctCount: { increment: 1 } }),
        lastPracticed: new Date(),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Record progress error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
