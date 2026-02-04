import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { shuffleArray } from "@/lib/utils";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const moduleTag = searchParams.get("module");
    // Cap limit at 100 to prevent excessive database load
    const limit = Math.min(Math.max(parseInt(searchParams.get("limit") || "10") || 10, 1), 100);
    const difficulty = searchParams.get("difficulty");

    const where: Record<string, unknown> = {};
    if (moduleTag) where.moduleTag = moduleTag;
    if (difficulty) where.difficulty = parseInt(difficulty);

    // Get more questions than needed, then shuffle and take limit
    const questions = await prisma.question.findMany({
      where,
    });

    // Shuffle and take the requested limit
    const shuffled = shuffleArray(questions).slice(0, limit);

    // Parse JSON fields with error handling
    const parsed = shuffled.map((q) => {
      try {
        return {
          ...q,
          choices: q.choices ? JSON.parse(q.choices) : null,
          solutionSteps: q.solutionSteps ? JSON.parse(q.solutionSteps) : [],
        };
      } catch {
        return { ...q, choices: null, solutionSteps: [] };
      }
    });

    return NextResponse.json({ questions: parsed });
  } catch (error) {
    console.error("Get questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
