"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  Flame,
  Target,
  Zap
} from "lucide-react";

interface ModuleProgress {
  moduleTag: string;
  totalAttempts: number;
  correctCount: number;
}

interface StudyRecommendationsProps {
  progress: ModuleProgress[];
  totalDueCards: number;
  modules: { id: string; name: string }[];
}

export function StudyRecommendations({
  progress,
  totalDueCards,
  modules
}: StudyRecommendationsProps) {
  // Calculate accuracy per module
  const moduleStats = modules.map((m) => {
    const p = progress.find((prog) => prog.moduleTag === m.id);
    const accuracy = p && p.totalAttempts > 0
      ? Math.round((p.correctCount / p.totalAttempts) * 100)
      : null;
    return {
      id: m.id,
      name: m.name,
      attempts: p?.totalAttempts || 0,
      accuracy,
    };
  });

  // Find weakest topics (with at least some attempts)
  const attemptedModules = moduleStats.filter((m) => m.attempts > 0);
  const weakestModules = attemptedModules
    .filter((m) => m.accuracy !== null && m.accuracy < 70)
    .sort((a, b) => (a.accuracy || 0) - (b.accuracy || 0))
    .slice(0, 3);

  // Find untried topics
  const untriedModules = moduleStats.filter((m) => m.attempts === 0).slice(0, 3);

  // Find strong topics
  const strongModules = attemptedModules
    .filter((m) => m.accuracy !== null && m.accuracy >= 80)
    .sort((a, b) => (b.accuracy || 0) - (a.accuracy || 0))
    .slice(0, 2);

  // Determine overall readiness
  const avgAccuracy = attemptedModules.length > 0
    ? Math.round(attemptedModules.reduce((sum, m) => sum + (m.accuracy || 0), 0) / attemptedModules.length)
    : 0;

  const topicsAttempted = attemptedModules.length;
  const readinessScore = Math.round((topicsAttempted / modules.length) * 50 + (avgAccuracy / 100) * 50);

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 border-orange-200 dark:border-orange-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
          <Target className="h-5 w-5" />
          Study Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Readiness Score */}
        <div className="bg-white dark:bg-orange-900/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Exam Readiness</span>
            <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
              {readinessScore}%
            </span>
          </div>
          <Progress
            value={readinessScore}
            className="h-2 [&>div]:bg-orange-500"
          />
          <p className="text-xs text-muted-foreground mt-2">
            {readinessScore < 30
              ? "Just getting started - keep practicing!"
              : readinessScore < 60
              ? "Making progress - focus on weak areas below"
              : readinessScore < 80
              ? "Good progress! A bit more practice and you're ready"
              : "Looking great! You're well prepared"}
          </p>
        </div>

        {/* Priority Actions */}
        <div className="space-y-3">
          {/* Weak topics - highest priority */}
          {weakestModules.length > 0 && (
            <div className="bg-red-50 dark:bg-red-950/50 rounded-lg p-3 border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300 font-medium text-sm mb-2">
                <AlertTriangle className="h-4 w-4" />
                Focus on These Topics
              </div>
              <div className="space-y-2">
                {weakestModules.map((m) => (
                  <div key={m.id} className="flex items-center justify-between">
                    <span className="text-sm">{m.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600 dark:text-red-400 font-medium">
                        {m.accuracy}% accuracy
                      </span>
                      <Link href={`/practice/${m.id}`}>
                        <Button size="sm" variant="outline" className="h-7 text-xs border-red-300 hover:bg-red-100 dark:border-red-700 dark:hover:bg-red-900">
                          Practice
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Due flashcards */}
          {totalDueCards > 0 && (
            <div className="bg-purple-50 dark:bg-purple-950/50 rounded-lg p-3 border border-purple-200 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    {totalDueCards} flashcards due for review
                  </span>
                </div>
                <Link href="/flashcards">
                  <Button size="sm" variant="outline" className="h-7 text-xs border-purple-300 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900">
                    Review Now
                    <Zap className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {/* Untried topics */}
          {untriedModules.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/50 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-medium text-sm mb-2">
                <BookOpen className="h-4 w-4" />
                Topics You Haven&apos;t Tried Yet
              </div>
              <div className="flex flex-wrap gap-2">
                {untriedModules.map((m) => (
                  <Link key={m.id} href={`/practice/${m.id}`}>
                    <Button size="sm" variant="outline" className="h-7 text-xs border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900">
                      {m.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Strong topics */}
          {strongModules.length > 0 && (
            <div className="bg-green-50 dark:bg-green-950/50 rounded-lg p-3 border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-medium text-sm mb-2">
                <CheckCircle className="h-4 w-4" />
                Your Strong Topics
              </div>
              <div className="flex flex-wrap gap-2">
                {strongModules.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded"
                  >
                    <Flame className="h-3 w-3" />
                    {m.name} ({m.accuracy}%)
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Action */}
        <Link href="/quick-review" className="block">
          <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
            <Zap className="h-4 w-4 mr-2" />
            5-Minute Quick Review
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
