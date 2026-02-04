"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Question } from "@/types";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  ClipboardList,
  Play,
  RefreshCw,
  XCircle,
} from "lucide-react";

interface ExamSession {
  id: string;
  startedAt: string;
  completedAt?: string;
  timeLimit?: number;
  score?: number;
  totalQuestions: number;
}

export default function ExamPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"start" | "exam" | "results">("start");
  const [session, setSession] = useState<ExamSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [timeLimit, setTimeLimit] = useState(60);
  const [results, setResults] = useState<{ isCorrect: boolean; correctAnswer: string; moduleTag: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [pastExams, setPastExams] = useState<ExamSession[]>([]);

  useEffect(() => {
    loadPastExams();
  }, []);

  useEffect(() => {
    if (mode === "exam" && timeRemaining !== null && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev === null || prev <= 1) {
            submitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, timeRemaining]);

  const loadPastExams = async () => {
    try {
      const res = await fetch("/api/exam");
      const data = await res.json();
      setPastExams(data.sessions?.filter((s: ExamSession) => s.completedAt) || []);
    } catch (error) {
      console.error("Failed to load past exams:", error);
    }
  };

  const startExam = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start", timeLimit }),
      });
      const data = await res.json();
      setSession(data.session);
      setQuestions(data.questions);
      setAnswers({});
      setCurrentIndex(0);
      setTimeRemaining(timeLimit * 60);
      setMode("exam");
    } catch (error) {
      console.error("Failed to start exam:", error);
    } finally {
      setLoading(false);
    }
  };

  const submitExam = async () => {
    if (!session) return;
    setLoading(true);
    try {
      const res = await fetch("/api/exam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          sessionId: session.id,
          answers,
        }),
      });
      const data = await res.json();
      setResults(data.results);
      setSession((prev) => prev ? { ...prev, score: data.score, completedAt: new Date().toISOString() } : null);
      setMode("results");
      loadPastExams();
    } catch (error) {
      console.error("Failed to submit exam:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercent = (answeredCount / questions.length) * 100;

  if (mode === "start") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            Mock Exam
          </h1>
          <p className="text-muted-foreground">
            Test your knowledge with a timed 30-question exam
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Start New Exam</CardTitle>
            <CardDescription>
              30 random questions across all modules
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Time Limit: {timeLimit} minutes</Label>
                <Slider
                  value={[timeLimit]}
                  onValueChange={([v]) => setTimeLimit(v)}
                  min={15}
                  max={120}
                  step={5}
                />
                <p className="text-xs text-muted-foreground">
                  {timeLimit === 60 ? "Standard exam time" : ""}
                </p>
              </div>
            </div>
            <Button onClick={startExam} disabled={loading} className="w-full">
              {loading ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Start Exam
            </Button>
          </CardContent>
        </Card>

        {pastExams.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Past Exams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pastExams.slice(0, 5).map((exam) => (
                  <div
                    key={exam.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(exam.completedAt!).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exam.totalQuestions} questions
                      </p>
                    </div>
                    <Badge
                      variant={
                        (exam.score || 0) >= 70
                          ? "success"
                          : (exam.score || 0) >= 50
                          ? "warning"
                          : "destructive"
                      }
                    >
                      {Math.round(exam.score || 0)}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  if (mode === "exam" && currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Mock Exam</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-lg px-4 py-2">
              <Clock className="h-4 w-4 mr-2" />
              {timeRemaining !== null && formatTime(timeRemaining)}
            </Badge>
            <Badge variant="secondary">
              {answeredCount}/{questions.length} answered
            </Badge>
          </div>
        </div>

        <Progress value={progressPercent} className="h-2" />

        {/* Question */}
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <Badge variant="outline">{currentQuestion.moduleTag}</Badge>
              <p className="text-lg whitespace-pre-line">
                {currentQuestion.prompt}
              </p>
              {currentQuestion.roundingRule && (
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.roundingRule}
                </p>
              )}
            </div>

            {currentQuestion.choices ? (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={(v) =>
                  setAnswers((prev) => ({ ...prev, [currentQuestion.id]: v }))
                }
              >
                {currentQuestion.choices.map((choice, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={choice} id={`choice-${i}`} />
                    <Label htmlFor={`choice-${i}`}>{choice}</Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                <Label>Your Answer</Label>
                <Input
                  value={answers[currentQuestion.id] || ""}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [currentQuestion.id]: e.target.value,
                    }))
                  }
                  placeholder="Enter your answer..."
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex gap-2">
            {currentIndex === questions.length - 1 ? (
              <Button onClick={submitExam} disabled={loading}>
                {loading && <RefreshCw className="h-4 w-4 mr-2 animate-spin" />}
                Submit Exam
              </Button>
            ) : (
              <Button
                onClick={() =>
                  setCurrentIndex((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {questions.map((q, i) => (
                <Button
                  key={q.id}
                  variant={answers[q.id] ? "secondary" : "outline"}
                  size="sm"
                  className={`w-10 h-10 ${i === currentIndex ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setCurrentIndex(i)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (mode === "results") {
    const score = session?.score || 0;
    const correctCount = results.filter((r) => r.isCorrect).length;

    // Group results by module
    const moduleStats = results.reduce((acc, r) => {
      if (!acc[r.moduleTag]) {
        acc[r.moduleTag] = { correct: 0, total: 0 };
      }
      acc[r.moduleTag].total++;
      if (r.isCorrect) acc[r.moduleTag].correct++;
      return acc;
    }, {} as Record<string, { correct: number; total: number }>);

    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardContent className="p-8 text-center">
            <div
              className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                score >= 70
                  ? "bg-green-100"
                  : score >= 50
                  ? "bg-yellow-100"
                  : "bg-red-100"
              }`}
            >
              <span
                className={`text-3xl font-bold ${
                  score >= 70
                    ? "text-green-600"
                    : score >= 50
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {Math.round(score)}%
              </span>
            </div>
            <h1 className="text-2xl font-bold mb-2">
              {score >= 70 ? "Great Job!" : score >= 50 ? "Keep Practicing!" : "Need More Study"}
            </h1>
            <p className="text-muted-foreground">
              You got {correctCount} out of {results.length} questions correct
            </p>
          </CardContent>
        </Card>

        {/* Module Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Module</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(moduleStats)
                .sort((a, b) => (a[1].correct / a[1].total) - (b[1].correct / b[1].total))
                .map(([module, stats]) => {
                  const pct = Math.round((stats.correct / stats.total) * 100);
                  return (
                    <div key={module} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{module}</span>
                        <span>
                          {stats.correct}/{stats.total} ({pct}%)
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className={`h-2 ${
                          pct >= 70
                            ? "[&>div]:bg-green-500"
                            : pct >= 50
                            ? "[&>div]:bg-yellow-500"
                            : "[&>div]:bg-red-500"
                        }`}
                      />
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>

        {/* Question Review */}
        <Card>
          <CardHeader>
            <CardTitle>Question Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions.map((q, i) => {
                const result = results[i];
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border ${
                      result?.isCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {result?.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          Q{i + 1}: {q.prompt.substring(0, 100)}
                          {q.prompt.length > 100 ? "..." : ""}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your answer: {answers[q.id] || "(no answer)"}
                          {!result?.isCorrect && (
                            <span className="text-green-700 ml-2">
                              Correct: {result?.correctAnswer}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button onClick={() => setMode("start")}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Another Exam
          </Button>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return null;
}
