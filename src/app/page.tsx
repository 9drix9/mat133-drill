import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Brain, Calculator, GraduationCap, Target, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-4">
              <GraduationCap className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            MAT133 <span className="text-primary">Drill</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Master statistics for your midterm with targeted practice, spaced repetition flashcards, and realistic mock exams.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-12 text-center text-3xl font-bold">Everything You Need to Ace Your Midterm</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Targeted Practice</CardTitle>
              <CardDescription>
                Focus on specific topics like normal distribution, regression, or binomial probability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose your module and difficulty level. Get instant feedback with step-by-step solutions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Smart Flashcards</CardTitle>
              <CardDescription>
                Spaced repetition system (SM-2) for efficient memorization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn formulas, definitions, and rules. Cards you struggle with appear more often.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Mock Exams</CardTitle>
              <CardDescription>
                30-question timed exams that simulate the real thing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track your progress, identify weak areas, and build exam confidence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-10 w-10 text-primary mb-2" />
              <CardTitle>StatCrunch Calculator</CardTitle>
              <CardDescription>
                Built-in binomial probability calculator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calculate PMF, CDF, and ranges. See formulas and step-by-step computations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Visual dashboard showing your mastery of each topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                See accuracy rates, time per question, and areas that need more work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-2">
                15+
              </div>
              <CardTitle>Rich Question Bank</CardTitle>
              <CardDescription>
                Curated questions plus randomly generated problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                15+ questions per module, plus unlimited generated variations for endless practice.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Topics Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-lg">
        <h2 className="mb-8 text-center text-3xl font-bold">Covers All MAT 133 Topics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Graphs & Data Displays",
            "Distribution Shape",
            "Frequency Tables & Grouped Data",
            "Quartiles, IQR & Outliers",
            "Normal Distribution",
            "Regression & Correlation",
            "Probability Basics",
            "Contingency Tables",
            "Discrete Distributions",
            "Expected Value & House Edge",
            "Binomial Distribution",
          ].map((topic) => (
            <div key={topic} className="flex items-center gap-2 text-sm">
              <div className="h-2 w-2 rounded-full bg-primary" />
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Start Studying?</h2>
        <p className="mb-8 text-muted-foreground">
          Create a free account and begin mastering statistics today.
        </p>
        <Link href="/register">
          <Button size="lg">
            Create Free Account
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>MAT133 Drill - Statistics Study Guide</p>
      </footer>
    </div>
  );
}
