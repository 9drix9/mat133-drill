import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MODULES } from "@/types";
import { ModuleCard } from "@/components/practice/module-card";
import { StatsOverview } from "@/components/practice/stats-overview";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  // Get user's progress
  const progress = await prisma.moduleProgress.findMany({
    where: { userId: user.id },
  });

  // Get flashcard due counts
  const flashcardStates = await prisma.flashcardState.findMany({
    where: {
      userId: user.id,
      nextReview: { lte: new Date() },
    },
    include: {
      flashcard: { select: { moduleTag: true } },
    },
  });

  // Calculate stats
  const totalAttempts = progress.reduce((sum, p) => sum + p.totalAttempts, 0);
  const totalCorrect = progress.reduce((sum, p) => sum + p.correctCount, 0);
  const overallAccuracy = totalAttempts > 0
    ? Math.round((totalCorrect / totalAttempts) * 100)
    : 0;

  // Get recent exam sessions
  const recentExams = await prisma.examSession.findMany({
    where: { userId: user.id, completedAt: { not: null } },
    orderBy: { completedAt: "desc" },
    take: 5,
  });

  const avgExamScore = recentExams.length > 0
    ? Math.round(
        recentExams.reduce((sum, e) => sum + (e.score || 0), 0) / recentExams.length
      )
    : 0;

  // Create progress map
  const progressMap = new Map(progress.map((p) => [p.moduleTag, p]));

  // Calculate due cards per module
  const dueCardsMap = new Map<string, number>();
  flashcardStates.forEach((state) => {
    const tag = state.flashcard.moduleTag;
    dueCardsMap.set(tag, (dueCardsMap.get(tag) || 0) + 1);
  });

  const totalDueCards = flashcardStates.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Skills Map</h1>
        <p className="text-muted-foreground">
          Track your progress across all statistics topics
        </p>
      </div>

      <StatsOverview
        totalAttempts={totalAttempts}
        overallAccuracy={overallAccuracy}
        totalDueCards={totalDueCards}
        avgExamScore={avgExamScore}
        examCount={recentExams.length}
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((module) => {
          const moduleProgress = progressMap.get(module.id);
          const dueCards = dueCardsMap.get(module.id) || 0;

          return (
            <ModuleCard
              key={module.id}
              module={module}
              progress={moduleProgress}
              dueCards={dueCards}
            />
          );
        })}
      </div>
    </div>
  );
}
