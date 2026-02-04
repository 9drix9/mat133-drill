"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MODULES, FlashcardWithState } from "@/types";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Check,
  RefreshCw,
  RotateCcw,
  X,
} from "lucide-react";

export default function FlashcardsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialModule = searchParams.get("module") || "all";

  const [flashcards, setFlashcards] = useState<FlashcardWithState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedModule, setSelectedModule] = useState(initialModule);
  const [dueOnly, setDueOnly] = useState(true);
  const [stats, setStats] = useState({ reviewed: 0, total: 0 });

  const loadFlashcards = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedModule !== "all") params.set("module", selectedModule);
      if (dueOnly) params.set("due", "true");

      const res = await fetch(`/api/flashcards?${params}`);
      const data = await res.json();
      setFlashcards(data.flashcards || []);
      setCurrentIndex(0);
      setFlipped(false);
      setStats({ reviewed: 0, total: data.flashcards?.length || 0 });
    } catch (error) {
      console.error("Failed to load flashcards:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedModule, dueOnly]);

  useEffect(() => {
    loadFlashcards();
  }, [loadFlashcards]);

  const currentCard = flashcards[currentIndex];

  const rateCard = async (quality: number) => {
    if (!currentCard) return;

    try {
      await fetch("/api/flashcards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flashcardId: currentCard.id,
          quality,
        }),
      });

      setStats((prev) => ({ ...prev, reviewed: prev.reviewed + 1 }));

      // Move to next card
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setFlipped(false);
      } else {
        // All cards reviewed
        setFlipped(false);
      }
    } catch (error) {
      console.error("Failed to rate card:", error);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case " ": // Space to flip
          e.preventDefault();
          setFlipped((f) => !f);
          break;
        case "ArrowLeft": // Previous card
          if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
            setFlipped(false);
          }
          break;
        case "ArrowRight": // Next card
          if (currentIndex < flashcards.length - 1) {
            setCurrentIndex((prev) => prev + 1);
            setFlipped(false);
          }
          break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
          // Rate card with number keys (only when flipped)
          if (flipped && currentCard) {
            rateCard(parseInt(e.key));
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, flashcards.length, flipped, currentCard]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Flashcards
          </h1>
          <p className="text-muted-foreground">
            Memorize formulas and key concepts
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All modules" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Modules</SelectItem>
              {MODULES.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant={dueOnly ? "secondary" : "outline"}
            size="sm"
            onClick={() => setDueOnly(!dueOnly)}
          >
            {dueOnly ? "Due Only" : "All Cards"}
          </Button>
        </div>
      </div>

      {/* Progress */}
      {flashcards.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span>
              {stats.reviewed} / {stats.total} reviewed
            </span>
          </div>
          <Progress value={(stats.reviewed / stats.total) * 100} className="h-2" />
        </div>
      )}

      {/* Quick tips for new users */}
      {flashcards.length > 0 && stats.reviewed === 0 && (
        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>How flashcards work:</strong> Click the card to see the answer. Then rate how well you knew it (0 = forgot completely, 5 = knew it instantly). Cards you struggle with will appear more often until you master them.
          </p>
        </div>
      )}

      {/* No cards message */}
      {flashcards.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">
              {dueOnly ? "All Caught Up!" : "No Cards Found"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {dueOnly
                ? "You've reviewed all the flashcards that are due. Come back tomorrow for more review!"
                : "No flashcards found for this module."}
            </p>
            {dueOnly && (
              <Button onClick={() => setDueOnly(false)}>
                Practice All Cards Anyway
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Flashcard */}
      {currentCard && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary">
              {MODULES.find((m) => m.id === currentCard.moduleTag)?.name}
            </Badge>
            <Badge variant="outline">
              {currentCard.cardType}
            </Badge>
          </div>

          <div
            className="flashcard-container cursor-pointer"
            onClick={() => setFlipped(!flipped)}
          >
            <Card
              className={`min-h-[300px] transition-all duration-300 ${
                flipped ? "bg-primary/5" : ""
              }`}
            >
              <CardContent className="p-8 flex items-center justify-center min-h-[300px]">
                <div className="text-center space-y-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">
                    {flipped ? "Answer" : "Question"}
                  </p>
                  <p className="text-lg font-medium whitespace-pre-line">
                    {flipped ? currentCard.back : currentCard.front}
                  </p>
                  {!flipped && (
                    <p className="text-sm text-muted-foreground">
                      Click or press Space to reveal answer
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Rating buttons (only show after flip) */}
          {flipped && (
            <div className="space-y-4">
              <p className="text-center text-sm font-medium">
                Did you know the answer?
              </p>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant="outline"
                  className="flex-col h-auto py-4 border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
                  onClick={() => rateCard(1)}
                >
                  <X className="h-5 w-5 mb-1" />
                  <span className="text-sm font-semibold">Didn&apos;t Know</span>
                  <span className="text-[10px] text-muted-foreground">Show again soon</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-col h-auto py-4 border-yellow-300 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-700 dark:text-yellow-400 dark:hover:bg-yellow-950"
                  onClick={() => rateCard(3)}
                >
                  <span className="text-xl mb-1">😐</span>
                  <span className="text-sm font-semibold">Kind Of</span>
                  <span className="text-[10px] text-muted-foreground">Had to think</span>
                </Button>
                <Button
                  variant="outline"
                  className="flex-col h-auto py-4 border-green-300 text-green-600 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-950"
                  onClick={() => rateCard(5)}
                >
                  <Check className="h-5 w-5 mb-1" />
                  <span className="text-sm font-semibold">Knew It!</span>
                  <span className="text-[10px] text-muted-foreground">Show less often</span>
                </Button>
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Keyboard: 1 = Didn&apos;t know, 3 = Kind of, 5 = Knew it
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                  setFlipped(false);
                }
              }}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} / {flashcards.length}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (currentIndex < flashcards.length - 1) {
                  setCurrentIndex((prev) => prev + 1);
                  setFlipped(false);
                }
              }}
              disabled={currentIndex === flashcards.length - 1}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}

      {/* Session complete */}
      {stats.reviewed === stats.total && stats.total > 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Check className="h-12 w-12 mx-auto text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Nice Work!</h2>
            <p className="text-muted-foreground mb-4">
              You reviewed all {stats.total} flashcards. The ones you struggled with will show up again next time.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button onClick={loadFlashcards}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Review Again
              </Button>
              <Button variant="outline" onClick={() => router.push("/practice")}>
                Practice Problems
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
