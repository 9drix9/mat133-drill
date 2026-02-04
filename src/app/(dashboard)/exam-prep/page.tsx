"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { MODULES } from "@/types";
import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle,
  CheckCircle2,
  Circle,
  ClipboardList,
  FileText,
  Flame,
  GraduationCap,
  RefreshCw,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

interface ModuleProgress {
  moduleTag: string;
  totalAttempts: number;
  correctCount: number;
}

interface ExamSession {
  id: string;
  score: number | null;
  totalQuestions: number;
  completedAt: string | null;
}

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  isComplete: boolean;
  priority: "high" | "medium" | "low";
  link?: string;
  linkLabel?: string;
}

export default function ExamPrepPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [dueCards, setDueCards] = useState(0);
  const [totalCards, setTotalCards] = useState(0);
  const [exams, setExams] = useState<ExamSession[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [progressRes, flashcardRes, examRes] = await Promise.all([
        fetch("/api/progress"),
        fetch("/api/flashcards"),
        fetch("/api/exam"),
      ]);

      const progressData = await progressRes.json();
      const flashcardData = await flashcardRes.json();
      const examData = await examRes.json();

      if (progressData.progress) {
        setProgress(progressData.progress);
      }

      if (flashcardData.flashcards) {
        const cards = flashcardData.flashcards;
        setTotalCards(cards.length);
        setDueCards(cards.filter((c: { isDue: boolean }) => c.isDue).length);
      }

      if (examData.sessions) {
        setExams(examData.sessions.filter((e: ExamSession) => e.completedAt));
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate statistics
  const moduleStats = MODULES.map((m) => {
    const p = progress.find((prog) => prog.moduleTag === m.id);
    const accuracy = p && p.totalAttempts > 0
      ? Math.round((p.correctCount / p.totalAttempts) * 100)
      : null;
    return {
      id: m.id,
      name: m.name,
      attempts: p?.totalAttempts || 0,
      accuracy,
      isPracticed: (p?.totalAttempts || 0) >= 5,
      isMastered: accuracy !== null && accuracy >= 80,
    };
  });

  const topicsPracticed = moduleStats.filter((m) => m.isPracticed).length;
  const topicsMastered = moduleStats.filter((m) => m.isMastered).length;
  const avgAccuracy = moduleStats.filter((m) => m.accuracy !== null).length > 0
    ? Math.round(moduleStats.filter((m) => m.accuracy !== null).reduce((sum, m) => sum + (m.accuracy || 0), 0) / moduleStats.filter((m) => m.accuracy !== null).length)
    : 0;

  const passedExam = exams.some((e) => (e.score || 0) >= 70);
  const recentExamScore = exams.length > 0 ? exams[0].score : null;
  const bestExamScore = exams.length > 0
    ? Math.max(...exams.map((e) => e.score || 0))
    : null;

  const flashcardProgress = totalCards > 0
    ? Math.round(((totalCards - dueCards) / totalCards) * 100)
    : 0;

  // Build checklist
  const checklist: ChecklistItem[] = [
    {
      id: "practice-all",
      label: "Practice all topics at least once",
      description: `${topicsPracticed}/${MODULES.length} topics practiced (5+ questions each)`,
      isComplete: topicsPracticed >= MODULES.length,
      priority: "high",
      link: "/practice",
      linkLabel: "Practice",
    },
    {
      id: "accuracy-70",
      label: "Achieve 70% accuracy overall",
      description: `Current: ${avgAccuracy}% average accuracy`,
      isComplete: avgAccuracy >= 70,
      priority: "high",
      link: "/practice",
      linkLabel: "Practice more",
    },
    {
      id: "weak-topics",
      label: "No topics below 60% accuracy",
      description: moduleStats.filter((m) => m.accuracy !== null && m.accuracy < 60).length > 0
        ? `Topics needing work: ${moduleStats.filter((m) => m.accuracy !== null && m.accuracy < 60).map((m) => m.name).join(", ")}`
        : "All practiced topics above 60%",
      isComplete: moduleStats.filter((m) => m.accuracy !== null && m.accuracy < 60).length === 0 && topicsPracticed > 0,
      priority: "high",
      link: moduleStats.filter((m) => m.accuracy !== null && m.accuracy < 60)[0]
        ? `/practice/${moduleStats.filter((m) => m.accuracy !== null && m.accuracy < 60)[0].id}`
        : undefined,
      linkLabel: "Practice weak topic",
    },
    {
      id: "flashcards",
      label: "Review all flashcards at least once",
      description: `${flashcardProgress}% of flashcards reviewed`,
      isComplete: flashcardProgress >= 80,
      priority: "medium",
      link: "/flashcards",
      linkLabel: "Review cards",
    },
    {
      id: "due-cards",
      label: "Clear flashcard review queue",
      description: dueCards > 0 ? `${dueCards} cards due for review` : "All cards up to date!",
      isComplete: dueCards === 0 && totalCards > 0,
      priority: "medium",
      link: "/flashcards",
      linkLabel: "Review now",
    },
    {
      id: "mock-exam",
      label: "Complete at least one mock exam",
      description: exams.length > 0
        ? `${exams.length} exam(s) completed, best: ${bestExamScore}%`
        : "No exams taken yet",
      isComplete: exams.length >= 1,
      priority: "high",
      link: "/exam",
      linkLabel: "Take exam",
    },
    {
      id: "pass-exam",
      label: "Score 70%+ on a mock exam",
      description: passedExam
        ? `Best score: ${bestExamScore}%`
        : recentExamScore !== null
          ? `Recent score: ${recentExamScore}% - keep practicing!`
          : "Complete an exam first",
      isComplete: passedExam,
      priority: "high",
      link: "/exam",
      linkLabel: "Try again",
    },
    {
      id: "formulas",
      label: "Review formula cheat sheet",
      description: "Make sure you know all key formulas",
      isComplete: false, // Can't track this automatically
      priority: "medium",
      link: "/formulas",
      linkLabel: "View formulas",
    },
  ];

  const completedItems = checklist.filter((item) => item.isComplete).length;
  const readinessScore = Math.round((completedItems / checklist.length) * 100);

  // Get readiness level
  const getReadinessLevel = () => {
    if (readinessScore >= 90) return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };
    if (readinessScore >= 75) return { label: "Good", color: "text-blue-600", bg: "bg-blue-100" };
    if (readinessScore >= 50) return { label: "Getting There", color: "text-yellow-600", bg: "bg-yellow-100" };
    return { label: "Needs Work", color: "text-red-600", bg: "bg-red-100" };
  };

  const readinessLevel = getReadinessLevel();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900 mb-4">
          <GraduationCap className="h-8 w-8 text-purple-600 dark:text-purple-400" />
        </div>
        <h1 className="text-3xl font-bold">Exam Readiness Checklist</h1>
        <p className="text-muted-foreground mt-2">
          Track your progress and know when you&apos;re ready for the midterm
        </p>
      </div>

      {/* Readiness Score */}
      <Card className={`${readinessLevel.bg} dark:bg-opacity-20 border-0`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Overall Readiness</h2>
              <p className={`font-medium ${readinessLevel.color}`}>
                {readinessLevel.label}
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{readinessScore}%</div>
              <p className="text-sm text-muted-foreground">
                {completedItems}/{checklist.length} complete
              </p>
            </div>
          </div>
          <Progress value={readinessScore} className="h-3" />

          {readinessScore >= 75 && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-900 rounded-lg flex items-center gap-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <div>
                <p className="font-medium">
                  {readinessScore >= 90
                    ? "You&apos;re ready for the exam!"
                    : "Almost there! Just a bit more practice."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {readinessScore >= 90
                    ? "Consider taking one final mock exam to boost confidence."
                    : "Focus on the incomplete items below."}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-6 w-6 mx-auto text-blue-600 mb-2" />
            <p className="text-2xl font-bold">{topicsPracticed}/{MODULES.length}</p>
            <p className="text-xs text-muted-foreground">Topics Practiced</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-6 w-6 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold">{avgAccuracy}%</p>
            <p className="text-xs text-muted-foreground">Avg Accuracy</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="h-6 w-6 mx-auto text-purple-600 mb-2" />
            <p className="text-2xl font-bold">{totalCards - dueCards}/{totalCards}</p>
            <p className="text-xs text-muted-foreground">Cards Reviewed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <ClipboardList className="h-6 w-6 mx-auto text-orange-600 mb-2" />
            <p className="text-2xl font-bold">{bestExamScore !== null ? `${bestExamScore}%` : "-"}</p>
            <p className="text-xs text-muted-foreground">Best Exam Score</p>
          </CardContent>
        </Card>
      </div>

      {/* Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Pre-Exam Checklist
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {checklist.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                item.isComplete
                  ? "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800"
                  : item.priority === "high"
                    ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800"
                    : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
              }`}
            >
              {item.isComplete ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-medium ${item.isComplete ? "text-green-700 dark:text-green-300" : ""}`}>
                    {item.label}
                  </p>
                  {!item.isComplete && item.priority === "high" && (
                    <Badge variant="destructive" className="text-xs">Important</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              {item.link && !item.isComplete && (
                <Link href={item.link}>
                  <Button size="sm" variant="outline" className="flex-shrink-0">
                    {item.linkLabel}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Topic Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Topic Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            {moduleStats.map((module) => (
              <div
                key={module.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  {module.isMastered ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : module.accuracy !== null && module.accuracy < 60 ? (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  ) : module.isPracticed ? (
                    <Target className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-400" />
                  )}
                  <span className="text-sm">{module.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {module.accuracy !== null ? (
                    <Badge
                      variant={
                        module.accuracy >= 80 ? "default" :
                        module.accuracy >= 60 ? "secondary" :
                        "destructive"
                      }
                    >
                      {module.accuracy}%
                    </Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">Not started</span>
                  )}
                  <Link href={`/practice/${module.id}`}>
                    <Button size="sm" variant="ghost" className="h-7">
                      Practice
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/quick-review">
          <Button className="gap-2">
            <Zap className="h-4 w-4" />
            Quick Review (5 min)
          </Button>
        </Link>
        <Link href="/exam">
          <Button variant="outline" className="gap-2">
            <ClipboardList className="h-4 w-4" />
            Take Mock Exam
          </Button>
        </Link>
        <Link href="/formulas">
          <Button variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Formula Sheet
          </Button>
        </Link>
      </div>
    </div>
  );
}
