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
            <h1 className="text-2xl font-bold">{currentModule.name}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline">
            {stats.correct}/{stats.total} correct
          </Badge>
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
                    ? "bg-green-50 border border-green-200"
                    : "bg-red-50 border border-red-200"
                }`}
              >
                <div className="flex items-center gap-2">
                  {isCorrect ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-700">
                        Correct!
                      </span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-700">
                        Incorrect. The correct answer is:{" "}
                        {currentQuestion.correctAnswer}
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Hints / Solution Steps */}
            {revealedSteps > 0 && (
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Lightbulb className="h-4 w-4 text-yellow-500" />
                  Solution Steps
                </div>
                {currentQuestion.solutionSteps
                  .slice(0, revealedSteps)
                  .map((step, i) => (
                    <p key={i} className="text-sm pl-6">
                      {i + 1}. {step}
                    </p>
                  ))}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {isCorrect === null ? (
                <>
                  <Button onClick={handleCheckAnswer} disabled={!userAnswer.trim()}>
                    Check Answer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={revealNextHint}
                    disabled={
                      revealedSteps >= currentQuestion.solutionSteps.length
                    }
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Hint ({revealedSteps}/{currentQuestion.solutionSteps.length})
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowSolution(true);
                      setRevealedSteps(currentQuestion.solutionSteps.length);
                    }}
                  >
                    Show Full Solution
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
            <h2 className="text-xl font-bold mb-2">Practice Complete!</h2>
            <p className="text-muted-foreground mb-4">
              You got {stats.correct} out of {stats.total} questions correct (
              {Math.round((stats.correct / stats.total) * 100)}%)
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={loadQuestions}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Practice More
              </Button>
              <Button variant="outline" onClick={() => router.push("/practice")}>
                Choose Different Module
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
