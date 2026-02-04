"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Question, MODULES } from "@/types";
import { checkAnswer } from "@/lib/answer-checker";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Flame,
  RefreshCw,
  Target,
  Trophy,
  XCircle,
  Zap,
} from "lucide-react";

export default function QuickReviewPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"setup" | "drill" | "results">("setup");
  const [weakestModule, setWeakestModule] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [loading, setLoading] = useState(true);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);

  // Load user's weakest module
  useEffect(() => {
    loadWeakestModule();
  }, []);

  const loadWeakestModule = async () => {
    setLoading(true);
    try {
      // Get user's progress to find weakest topic
      const res = await fetch("/api/progress");
      const data = await res.json();

      if (data.progress && data.progress.length > 0) {
        // Find module with lowest accuracy (min 3 attempts)
        const moduleStats = data.progress
          .filter((p: any) => p.totalAttempts >= 3)
          .map((p: any) => ({
            moduleTag: p.moduleTag,
            accuracy: p.totalAttempts > 0 ? (p.correctCount / p.totalAttempts) * 100 : 0,
          }))
          .sort((a: any, b: any) => a.accuracy - b.accuracy);

        if (moduleStats.length > 0) {
          setWeakestModule(moduleStats[0].moduleTag);
        } else {
          // No progress yet, pick a random module
          const randomModule = MODULES[Math.floor(Math.random() * MODULES.length)];
          setWeakestModule(randomModule.id);
        }
      } else {
        // No progress, pick first module
        setWeakestModule(MODULES[0].id);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
      setWeakestModule(MODULES[0].id);
    } finally {
      setLoading(false);
    }
  };

  const startDrill = async () => {
    if (!weakestModule) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/questions?module=${weakestModule}&limit=10`);
      const data = await res.json();

      if (data.questions && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIndex(0);
        setUserAnswer("");
        setIsCorrect(null);
        setStats({ correct: 0, total: 0 });
        setStreak(0);
        setBestStreak(0);
        setTimeRemaining(300);
        setMode("drill");
      } else {
        // Try generating questions
        const genRes = await fetch("/api/questions/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ moduleTag: weakestModule, count: 10 }),
        });
        const genData = await genRes.json();
        if (genData.questions && genData.questions.length > 0) {
          setQuestions(genData.questions);
          setCurrentIndex(0);
          setMode("drill");
        }
      }
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Timer
  useEffect(() => {
    if (mode !== "drill" || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setMode("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, timeRemaining]);

  const handleCheckAnswer = () => {
    const current = questions[currentIndex];
    if (!current || !userAnswer.trim()) return;

    const correct = checkAnswer(userAnswer, current.correctAnswer);
    setIsCorrect(correct);
    setStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    if (correct) {
      setStreak((prev) => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) setBestStreak(newStreak);
        return newStreak;
      });
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setIsCorrect(null);
    } else {
      setMode("results");
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentIndex];
  const moduleName = MODULES.find((m) => m.id === weakestModule)?.name || weakestModule;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (mode === "setup") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900 mb-4">
            <Zap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
          </div>
          <h1 className="text-3xl font-bold">Quick Review</h1>
          <p className="text-muted-foreground mt-2">
            5 minutes of focused practice on your weakest topic
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Today&apos;s Focus: {moduleName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground">
                Based on your practice history, this is the topic where you need the most improvement.
                Let&apos;s do a quick 5-minute drill to boost your skills!
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <Clock className="h-5 w-5 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
                <p className="font-bold">5 min</p>
                <p className="text-xs text-muted-foreground">Time limit</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                <Target className="h-5 w-5 mx-auto text-green-600 dark:text-green-400 mb-1" />
                <p className="font-bold">10</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                <Flame className="h-5 w-5 mx-auto text-orange-600 dark:text-orange-400 mb-1" />
                <p className="font-bold">Streak</p>
                <p className="text-xs text-muted-foreground">Bonus</p>
              </div>
            </div>

            <Button onClick={startDrill} className="w-full" size="lg">
              <Zap className="h-5 w-5 mr-2" />
              Start Quick Review
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "drill" && currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-lg px-3 py-1">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(timeRemaining)}
            </Badge>
            {streak >= 2 && (
              <Badge className="bg-orange-500 text-white">
                <Flame className="h-3 w-3 mr-1" />
                {streak} streak!
              </Badge>
            )}
          </div>
          <Badge variant="secondary">
            {currentIndex + 1} / {questions.length}
          </Badge>
        </div>

        {/* Progress */}
        <Progress value={(stats.total / questions.length) * 100} className="h-2" />

        {/* Question */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{moduleName}</Badge>
              <span className="text-sm text-muted-foreground">
                {stats.correct}/{stats.total} correct
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg whitespace-pre-line">{currentQuestion.prompt}</p>

            {currentQuestion.choices ? (
              <RadioGroup
                value={userAnswer}
                onValueChange={setUserAnswer}
                disabled={isCorrect !== null}
              >
                {currentQuestion.choices.map((choice, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={choice} id={`choice-${i}`} />
                    <Label
                      htmlFor={`choice-${i}`}
                      className={
                        isCorrect !== null
                          ? choice === currentQuestion.correctAnswer
                            ? "text-green-600 font-medium"
                            : userAnswer === choice && !isCorrect
                            ? "text-red-600"
                            : ""
                          : ""
                      }
                    >
                      {choice}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <Input
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Your answer..."
                disabled={isCorrect !== null}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && isCorrect === null) {
                    handleCheckAnswer();
                  }
                }}
              />
            )}

            {/* Result */}
            {isCorrect !== null && (
              <div className={`p-3 rounded-lg flex items-center gap-2 ${
                isCorrect ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                         : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
              }`}>
                {isCorrect ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                {isCorrect ? "Correct!" : `Answer: ${currentQuestion.correctAnswer}`}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              {isCorrect === null ? (
                <Button onClick={handleCheckAnswer} disabled={!userAnswer.trim()} className="flex-1">
                  Check Answer
                </Button>
              ) : (
                <Button onClick={nextQuestion} className="flex-1">
                  {currentIndex < questions.length - 1 ? (
                    <>Next <ArrowRight className="h-4 w-4 ml-1" /></>
                  ) : (
                    "See Results"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "results") {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 ${
              accuracy >= 80 ? "bg-green-100 dark:bg-green-900" :
              accuracy >= 60 ? "bg-yellow-100 dark:bg-yellow-900" :
              "bg-red-100 dark:bg-red-900"
            }`}>
              <Trophy className={`h-10 w-10 ${
                accuracy >= 80 ? "text-green-600 dark:text-green-400" :
                accuracy >= 60 ? "text-yellow-600 dark:text-yellow-400" :
                "text-red-600 dark:text-red-400"
              }`} />
            </div>

            <h1 className="text-2xl font-bold mb-2">
              {accuracy >= 80 ? "Excellent!" : accuracy >= 60 ? "Good Job!" : "Keep Practicing!"}
            </h1>

            <p className="text-4xl font-bold text-primary mb-2">
              {stats.correct} / {stats.total}
            </p>
            <p className="text-muted-foreground mb-4">{accuracy}% accuracy</p>

            {bestStreak >= 3 && (
              <Badge className="bg-orange-500 text-white mb-4">
                <Flame className="h-4 w-4 mr-1" />
                Best Streak: {bestStreak}
              </Badge>
            )}

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{formatTime(300 - timeRemaining)}</p>
                <p className="text-xs text-muted-foreground">Time used</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{moduleName}</p>
                <p className="text-xs text-muted-foreground">Topic practiced</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => { setMode("setup"); loadWeakestModule(); }}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Another Quick Review
              </Button>
              <Button variant="outline" onClick={() => router.push(`/practice/${weakestModule}`)}>
                Full Practice Session
              </Button>
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Back to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
}
