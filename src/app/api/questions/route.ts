import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const moduleTag = searchParams.get("module");
    const limit = parseInt(searchParams.get("limit") || "10");
    const difficulty = searchParams.get("difficulty");

    const where: Record<string, unknown> = {};
    if (moduleTag) where.moduleTag = moduleTag;
    if (difficulty) where.difficulty = parseInt(difficulty);

    const questions = await prisma.question.findMany({
      where,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Parse JSON fields
    const parsed = questions.map((q) => ({
      ...q,
      choices: q.choices ? JSON.parse(q.choices) : null,
      solutionSteps: JSON.parse(q.solutionSteps),
    }));

    return NextResponse.json({ questions: parsed });
  } catch (error) {
    console.error("Get questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
