"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, CheckCircle, ClipboardList, Target } from "lucide-react";

interface StatsOverviewProps {
  totalAttempts: number;
  overallAccuracy: number;
  totalDueCards: number;
  avgExamScore: number;
  examCount: number;
}

export function StatsOverview({
  totalAttempts,
  overallAccuracy,
  totalDueCards,
  avgExamScore,
  examCount,
}: StatsOverviewProps) {
  const stats = [
    {
      label: "Problems Solved",
      value: totalAttempts.toLocaleString(),
      subtext: totalAttempts === 0 ? "Start practicing!" : "Keep it up!",
      icon: Target,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Accuracy Rate",
      value: totalAttempts > 0 ? `${overallAccuracy}%` : "—",
      subtext: totalAttempts === 0
        ? "Solve some problems first"
        : overallAccuracy >= 80
        ? "Excellent!"
        : overallAccuracy >= 60
        ? "Good progress"
        : "Keep practicing",
      icon: CheckCircle,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      label: "Flashcards to Review",
      value: totalDueCards.toLocaleString(),
      subtext: totalDueCards === 0 ? "All caught up!" : "Ready to review",
      icon: Brain,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Mock Exam Average",
      value: examCount > 0 ? `${avgExamScore}%` : "—",
      subtext: examCount > 0 ? `Based on ${examCount} exam${examCount > 1 ? 's' : ''}` : "Take an exam to see your score",
      icon: ClipboardList,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  {stat.subtext && (
                    <p className="text-xs text-muted-foreground">{stat.subtext}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
