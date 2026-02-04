import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { shuffleArray } from "@/lib/utils";
import { checkAnswer } from "@/lib/answer-checker";

export async function GET(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("sessionId");

    if (sessionId) {
      // Get specific exam session
      const examSession = await prisma.examSession.findUnique({
        where: { id: sessionId, userId: session.userId },
      });

      if (!examSession) {
        return NextResponse.json({ error: "Exam not found" }, { status: 404 });
      }

      // Get questions for this exam
      const questionIds = JSON.parse(examSession.questionIds);
      const questions = await prisma.question.findMany({
        where: { id: { in: questionIds } },
      });

      // Parse and order questions
      const orderedQuestions = questionIds.map((id: string) => {
        const q = questions.find((q) => q.id === id);
        return q ? {
          ...q,
          choices: q.choices ? JSON.parse(q.choices) : null,
          solutionSteps: JSON.parse(q.solutionSteps),
        } : null;
      }).filter(Boolean);

      return NextResponse.json({
        session: {
          ...examSession,
          answers: examSession.answers ? JSON.parse(examSession.answers) : {},
          results: examSession.results ? JSON.parse(examSession.results) : null,
        },
        questions: orderedQuestions,
      });
    }

    // Get all exam sessions for user
    const sessions = await prisma.examSession.findMany({
      where: { userId: session.userId },
      orderBy: { startedAt: "desc" },
    });

    return NextResponse.json({
      sessions: sessions.map((s) => ({
        ...s,
        answers: s.answers ? JSON.parse(s.answers) : {},
        results: s.results ? JSON.parse(s.results) : null,
      })),
    });
  } catch (error) {
    console.error("Get exam error:", error);
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

    const { action, sessionId, answers, timeLimit = 60 } = await request.json();

    if (action === "start") {
      // Get random questions from all modules
      const questions = await prisma.question.findMany();

      // Shuffle and select 30 questions, trying to get even distribution
      const shuffled = shuffleArray(questions);
      const selected = shuffled.slice(0, 30);
      const questionIds = selected.map((q) => q.id);

      // Create exam session
      const examSession = await prisma.examSession.create({
        data: {
          userId: session.userId,
          totalQuestions: 30,
          timeLimit,
          questionIds: JSON.stringify(questionIds),
        },
      });

      // Return session with questions
      const orderedQuestions = selected.map((q) => ({
        ...q,
        choices: q.choices ? JSON.parse(q.choices) : null,
        solutionSteps: JSON.parse(q.solutionSteps),
      }));

      return NextResponse.json({
        session: examSession,
        questions: orderedQuestions,
      });
    }

    if (action === "submit") {
      if (!sessionId || !answers) {
        return NextResponse.json(
          { error: "Session ID and answers required" },
          { status: 400 }
        );
      }

      // Get exam session
      const examSession = await prisma.examSession.findUnique({
        where: { id: sessionId, userId: session.userId },
      });

      if (!examSession) {
        return NextResponse.json({ error: "Exam not found" }, { status: 404 });
      }

      if (examSession.completedAt) {
        return NextResponse.json(
          { error: "Exam already submitted" },
          { status: 400 }
        );
      }

      // Get questions and grade
      const questionIds = JSON.parse(examSession.questionIds);
      const questions = await prisma.question.findMany({
        where: { id: { in: questionIds } },
      });

      const results = questionIds.map((id: string) => {
        const question = questions.find((q) => q.id === id);
        const userAnswer = answers[id] || "";
        const isCorrect = question
          ? checkAnswer(userAnswer.toString(), question.correctAnswer.toString())
          : false;

        return {
          questionId: id,
          userAnswer,
          correctAnswer: question?.correctAnswer || "",
          isCorrect,
          moduleTag: question?.moduleTag || "",
        };
      });

      const score = (results.filter((r: { isCorrect: boolean }) => r.isCorrect).length / results.length) * 100;

      // Update session
      await prisma.examSession.update({
        where: { id: sessionId },
        data: {
          completedAt: new Date(),
          score,
          answers: JSON.stringify(answers),
          results: JSON.stringify(results),
        },
      });

      // Update module progress
      for (const result of results) {
        if (result.moduleTag) {
          await prisma.moduleProgress.upsert({
            where: {
              userId_moduleTag: {
                userId: session.userId,
                moduleTag: result.moduleTag,
              },
            },
            create: {
              userId: session.userId,
              moduleTag: result.moduleTag,
              totalAttempts: 1,
              correctCount: result.isCorrect ? 1 : 0,
              lastPracticed: new Date(),
            },
            update: {
              totalAttempts: { increment: 1 },
              correctCount: result.isCorrect ? { increment: 1 } : undefined,
              lastPracticed: new Date(),
            },
          });
        }
      }

      return NextResponse.json({
        success: true,
        score,
        results,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Exam action error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
