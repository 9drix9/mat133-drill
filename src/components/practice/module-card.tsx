"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ModuleInfo } from "@/types";
import {
  Activity,
  BarChart2,
  BarChart3,
  Binary,
  Dice1,
  DollarSign,
  GitBranch,
  Grid3X3,
  LineChart,
  Table,
  TrendingUp,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BarChart3,
  TrendingUp,
  Table,
  GitBranch,
  Activity,
  LineChart,
  Dice1,
  Grid3X3,
  BarChart2,
  DollarSign,
  Binary,
};

interface ModuleProgress {
  totalAttempts: number;
  correctCount: number;
  lastPracticed: Date | null;
}

interface ModuleCardProps {
  module: ModuleInfo;
  progress?: ModuleProgress | null;
  dueCards: number;
}

export function ModuleCard({ module, progress, dueCards }: ModuleCardProps) {
  const Icon = iconMap[module.icon] || BarChart3;

  const accuracy = progress && progress.totalAttempts > 0
    ? Math.round((progress.correctCount / progress.totalAttempts) * 100)
    : 0;

  const getMasteryLevel = (acc: number, attempts: number): { label: string; color: string } => {
    if (attempts < 5) return { label: "New", color: "secondary" };
    if (acc >= 90) return { label: "Mastered", color: "success" };
    if (acc >= 70) return { label: "Proficient", color: "default" };
    if (acc >= 50) return { label: "Learning", color: "warning" };
    return { label: "Needs Work", color: "destructive" };
  };

  const mastery = getMasteryLevel(accuracy, progress?.totalAttempts || 0);

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{module.name}</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">
                {module.description}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Accuracy</span>
            <span className="font-medium">{accuracy}%</span>
          </div>
          <Progress value={accuracy} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Badge variant={mastery.color as "default" | "secondary" | "destructive" | "outline" | "success" | "warning"}>
              {mastery.label}
            </Badge>
            {dueCards > 0 && (
              <Badge variant="outline" className="text-purple-600">
                {dueCards} cards due
              </Badge>
            )}
          </div>
          <span className="text-muted-foreground">
            {progress?.totalAttempts || 0} attempts
          </span>
        </div>

        {/* Topics Preview */}
        <div className="text-xs text-muted-foreground">
          <span className="font-medium">Topics: </span>
          {module.topics.slice(0, 3).join(", ")}
          {module.topics.length > 3 && ` +${module.topics.length - 3} more`}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link href={`/practice/${module.id}`} className="flex-1">
            <Button className="w-full" size="sm">
              Practice
            </Button>
          </Link>
          <Link href={`/flashcards?module=${module.id}`}>
            <Button variant="outline" size="sm">
              Flashcards
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
