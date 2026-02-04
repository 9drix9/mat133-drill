import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { MODULES } from "@/types";
import { ModuleCard } from "@/components/practice/module-card";
import { StatsOverview } from "@/components/practice/stats-overview";
import { StudyRecommendations } from "@/components/practice/study-recommendations";

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

  // Check if user is new (no attempts yet)
  const isNewUser = totalAttempts === 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          {isNewUser ? `Welcome, ${user.username}!` : "Your Progress"}
        </h1>
        <p className="text-muted-foreground">
          {isNewUser
            ? "Ready to start studying? Pick any topic below to begin!"
            : "Track your progress across all statistics topics"}
        </p>
      </div>

      {/* Getting started guide for new users */}
      {isNewUser && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="font-semibold text-lg mb-3">How to Get Started</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
              <div>
                <p className="font-medium">Practice Problems</p>
                <p className="text-sm text-muted-foreground">Pick a topic and solve questions. We&apos;ll show you solutions when you need help.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
              <div>
                <p className="font-medium">Review Flashcards</p>
                <p className="text-sm text-muted-foreground">Memorize formulas and key concepts with our smart flashcard system.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
              <div>
                <p className="font-medium">Take Mock Exams</p>
                <p className="text-sm text-muted-foreground">Test yourself with timed 30-question exams when you feel ready.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <StatsOverview
        totalAttempts={totalAttempts}
        overallAccuracy={overallAccuracy}
        totalDueCards={totalDueCards}
        avgExamScore={avgExamScore}
        examCount={recentExams.length}
      />

      {/* Study Recommendations - show for users with some progress */}
      {!isNewUser && (
        <StudyRecommendations
          progress={progress.map((p) => ({
            moduleTag: p.moduleTag,
            totalAttempts: p.totalAttempts,
            correctCount: p.correctCount,
          }))}
          totalDueCards={totalDueCards}
          modules={MODULES.map((m) => ({ id: m.id, name: m.name }))}
        />
      )}

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
