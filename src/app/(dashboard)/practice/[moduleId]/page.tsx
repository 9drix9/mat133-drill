"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MODULES, Question } from "@/types";
import { checkAnswer as checkAnswerUtil } from "@/lib/answer-checker";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  HelpCircle,
  Lightbulb,
  RefreshCw,
  XCircle,
} from "lucide-react";
import Link from "next/link";

export default function PracticeSessionPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  const currentModule = MODULES.find((m) => m.id === moduleId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [showSolution, setShowSolution] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [questionCount, setQuestionCount] = useState("10");
  const [useGenerator, setUseGenerator] = useState(false);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (currentModule) {
      loadQuestions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentModule, questionCount, useGenerator]);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      if (useGenerator) {
        const res = await fetch("/api/questions/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            moduleTag: moduleId,
            count: parseInt(questionCount),
          }),
        });
        const data = await res.json();
        setQuestions(data.questions || []);
      } else {
        const res = await fetch(
          `/api/questions?module=${moduleId}&limit=${questionCount}`
        );
        const data = await res.json();
        setQuestions(data.questions || []);
      }
      setCurrentIndex(0);
      setUserAnswer("");
      setShowSolution(false);
      setRevealedSteps(0);
      setIsCorrect(null);
      setStats({ correct: 0, total: 0 });
      setStartTime(Date.now());
    } catch (error) {
      console.error("Failed to load questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentIndex];

  const handleCheckAnswer = async () => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const correct = checkAnswerUtil(userAnswer, currentQuestion.correctAnswer);
    setIsCorrect(correct);
    setStats((prev) => ({
      correct: prev.correct + (correct ? 1 : 0),
      total: prev.total + 1,
    }));

    // Record progress
    try {
      const timeSpent = Date.now() - startTime;
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: currentQuestion.id,
          userAnswer,
          isCorrect: correct,
          timeSpentMs: timeSpent,
          moduleTag: moduleId,
        }),
      });
    } catch (error) {
      console.error("Failed to record progress:", error);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserAnswer("");
      setShowSolution(false);
      setRevealedSteps(0);
      setIsCorrect(null);
      setStartTime(Date.now());
    }
  };

  const revealNextHint = () => {
    if (currentQuestion && revealedSteps < currentQuestion.solutionSteps.length) {
      setRevealedSteps((prev) => prev + 1);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Enter to check answer or go to next question
      if (e.key === "Enter") {
        if (isCorrect !== null) {
          // Answer already checked, go to next
          if (currentIndex < questions.length - 1) {
            nextQuestion();
          }
        } else if (userAnswer.trim()) {
          // Check the answer
          handleCheckAnswer();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCorrect, userAnswer, currentIndex, questions.length]);

  if (!currentModule) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold">Module not found</h1>
        <Button onClick={() => router.push("/practice")} className="mt-4">
          Back to Practice
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="text-center py-12 space-y-4">
        <h1 className="text-2xl font-bold">No questions available</h1>
        <p className="text-muted-foreground">
          Try enabling generated questions or check back later.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => setUseGenerator(true)}>
            Try Generated Questions
          </Button>
          <Button variant="outline" onClick={() => router.push("/practice")}>
            Back to Practice
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/practice")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">{currentModule.name}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentIndex + 1} of {questions.length}
              </p>
            </div>
          </div>
          <Badge variant="outline" className="text-sm">
            {stats.correct}/{stats.total} correct
          </Badge>
        </div>
        {/* Options row - hidden on mobile, shown at bottom */}
        <div className="hidden sm:flex items-center justify-end gap-2">
          <Select value={questionCount} onValueChange={setQuestionCount}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 Q&apos;s</SelectItem>
              <SelectItem value="10">10 Q&apos;s</SelectItem>
              <SelectItem value="15">15 Q&apos;s</SelectItem>
              <SelectItem value="20">20 Q&apos;s</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUseGenerator(!useGenerator)}
          >
            {useGenerator ? "Use Stored" : "Generate New"}
          </Button>
          <Link href={`/flashcards?module=${moduleId}`}>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Flashcards
            </Button>
          </Link>
        </div>
      </div>

      {/* Progress */}
      <Progress
        value={((currentIndex + 1) / questions.length) * 100}
        className="h-2"
      />

      {/* Question Card */}
      {currentQuestion && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg">
                {currentQuestion.prompt.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </CardTitle>
              <Badge variant="secondary">
                Difficulty: {currentQuestion.difficulty}/3
              </Badge>
            </div>
            {currentQuestion.roundingRule && (
              <p className="text-sm text-muted-foreground mt-2">
                <span className="font-medium">Note: </span>
                {currentQuestion.roundingRule}
              </p>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Answer Input */}
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
              <div className="space-y-2">
                <Label htmlFor="answer">Your Answer</Label>
                <Input
                  id="answer"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Enter your answer..."
                  disabled={isCorrect !== null}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && isCorrect === null) {
                      handleCheckAnswer();
                    }
                  }}
                />
                {currentQuestion.units && (
                  <p className="text-xs text-muted-foreground">
                    Units: {currentQuestion.units}
                  </p>
                )}
              </div>
            )}

            {/* Result Display */}
            {isCorrect !== null && (
              <div
                className={`p-4 rounded-lg ${
                  isCorrect
                    ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-green-700 dark:text-green-300 text-lg">
                          Correct! Great job!
                        </span>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                          You&apos;re getting the hang of this. Keep it up!
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-red-700 dark:text-red-300">
                          Not quite right
                        </span>
                        <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                          The correct answer is: <strong>{currentQuestion.correctAnswer}</strong>
                        </p>
                        <p className="text-xs text-red-500 dark:text-red-500 mt-2">
                          Don&apos;t worry - click &quot;Show Full Solution&quot; below to see how to solve it, then try a similar problem!
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Hints / Solution Steps */}
            {revealedSteps > 0 && (
              <div className="space-y-3 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  <Lightbulb className="h-4 w-4" />
                  Here&apos;s How to Solve It:
                </div>
                {currentQuestion.solutionSteps
                  .slice(0, revealedSteps)
                  .map((step, i) => (
                    <p key={i} className="text-sm pl-6 text-yellow-900 dark:text-yellow-100">
                      <span className="font-semibold">Step {i + 1}:</span> {step}
                    </p>
                  ))}
                {revealedSteps < currentQuestion.solutionSteps.length && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 pl-6 italic">
                    Click &quot;Need a Hint?&quot; to see the next step...
                  </p>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {isCorrect === null ? (
                <>
                  <Button onClick={handleCheckAnswer} disabled={!userAnswer.trim()}>
                    Check My Answer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={revealNextHint}
                    disabled={
                      revealedSteps >= currentQuestion.solutionSteps.length
                    }
                    title="Get a hint if you're stuck"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Need a Hint? ({revealedSteps}/{currentQuestion.solutionSteps.length})
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowSolution(true);
                      setRevealedSteps(currentQuestion.solutionSteps.length);
                    }}
                    title="See the complete solution"
                  >
                    I Give Up - Show Answer
                  </Button>
                </>
              ) : (
                <>
                  {currentIndex < questions.length - 1 ? (
                    <Button onClick={nextQuestion}>
                      Next Question
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={() => router.push("/practice")}>
                      Finish Practice
                    </Button>
                  )}
                  {!showSolution && revealedSteps < currentQuestion.solutionSteps.length && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowSolution(true);
                        setRevealedSteps(currentQuestion.solutionSteps.length);
                      }}
                    >
                      Show Full Solution
                    </Button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Session Complete */}
      {currentIndex === questions.length - 1 && isCorrect !== null && (
        <Card>
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-2">
              {Math.round((stats.correct / stats.total) * 100) >= 80
                ? "Excellent Work!"
                : Math.round((stats.correct / stats.total) * 100) >= 60
                ? "Good Progress!"
                : "Keep Practicing!"}
            </h2>
            <p className="text-2xl font-bold text-primary mb-2">
              {stats.correct} / {stats.total} correct
            </p>
            <p className="text-muted-foreground mb-4">
              {Math.round((stats.correct / stats.total) * 100) >= 80
                ? "You're doing great! Try another topic or take a mock exam."
                : Math.round((stats.correct / stats.total) * 100) >= 60
                ? "You're getting there! A bit more practice and you'll master this."
                : "Don't give up! Review the flashcards for this topic, then try again."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button onClick={loadQuestions}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Practice This Topic Again
              </Button>
              <Button variant="outline" onClick={() => router.push(`/flashcards?module=${moduleId}`)}>
                Review Flashcards
              </Button>
              <Button variant="outline" onClick={() => router.push("/practice")}>
                Try a Different Topic
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
