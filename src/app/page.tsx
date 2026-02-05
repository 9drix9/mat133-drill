import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Brain, Calculator, GraduationCap, Target, Trophy } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header with theme toggle */}
      <header className="container mx-auto px-4 py-4 flex justify-end">
        <ThemeToggle />
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
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
            Your free study buddy for the MAT 133 statistics midterm.
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice problems, memorize formulas with flashcards, and test yourself with mock exams.
            We track your progress and show you what to focus on.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Studying - It&apos;s Free
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                I Already Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">How It Works</h2>
        <p className="mb-12 text-center text-muted-foreground max-w-2xl mx-auto">
          Three simple steps to better grades
        </p>
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">1</div>
            <h3 className="font-semibold text-lg">Pick a Topic</h3>
            <p className="text-sm text-muted-foreground">Choose what you want to study - like probability, z-scores, or regression</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">2</div>
            <h3 className="font-semibold text-lg">Practice & Learn</h3>
            <p className="text-sm text-muted-foreground">Solve problems and see step-by-step solutions when you need help</p>
          </div>
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">3</div>
            <h3 className="font-semibold text-lg">Track Progress</h3>
            <p className="text-sm text-muted-foreground">See your accuracy improve and know exactly what to review</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-4 text-center text-3xl font-bold">Everything You Need</h2>
        <p className="mb-12 text-center text-muted-foreground">All the tools to help you succeed</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Target className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Practice Problems</CardTitle>
              <CardDescription>
                165+ multiple choice questions across 11 topics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Pick any answer and instantly see if you&apos;re right. Wrong? No problem - we&apos;ll show you exactly how to solve it step by step.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Brain className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Flashcards</CardTitle>
              <CardDescription>
                Memorize formulas the smart way
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Our flashcards focus on what you need to know. Cards you get wrong will show up more often until you master them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Mock Exams</CardTitle>
              <CardDescription>
                Practice under real exam conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Take a 30-question timed test just like the real thing. See your score and which topics need more work.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Calculator</CardTitle>
              <CardDescription>
                Built-in binomial probability calculator
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Type in your numbers and get the answer. We&apos;ll even show you the formula and steps so you understand how it works.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Progress Dashboard</CardTitle>
              <CardDescription>
                See how you&apos;re doing at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Your dashboard shows your accuracy for each topic. Green means you&apos;ve got it, red means keep practicing.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-2">
                100%
              </div>
              <CardTitle>Completely Free</CardTitle>
              <CardDescription>
                No payment, no ads, no catch
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This app was made to help students. Create an account and start studying right away. Everything is free forever.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Topics Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30 rounded-lg">
        <h2 className="mb-4 text-center text-3xl font-bold">All 11 MAT 133 Topics Covered</h2>
        <p className="mb-8 text-center text-muted-foreground">Every topic from your syllabus, with practice problems and flashcards</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {[
            "Graphs & Data Displays",
            "Distribution Shape",
            "Frequency Tables & Grouped Data",
            "Quartiles, IQR & Outliers",
            "Normal Distribution & Z-Scores",
            "Regression & Correlation",
            "Probability Basics",
            "Contingency Tables",
            "Discrete Distributions",
            "Expected Value & House Edge",
            "Binomial Distribution",
          ].map((topic) => (
            <div key={topic} className="flex items-center gap-3 text-sm bg-background p-3 rounded-lg">
              <div className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="mb-4 text-3xl font-bold">Ready to Ace Your Midterm?</h2>
        <p className="mb-8 text-muted-foreground max-w-xl mx-auto">
          Join other MAT 133 students who are using this app to study smarter.
          Create your free account in 30 seconds.
        </p>
        <Link href="/register">
          <Button size="lg">
            Start Studying Now
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>MAT133 Drill - Statistics Study Guide</p>
        <p className="mt-2">Made by Logan Morris and Ricky Thach</p>
      </footer>
    </div>
  );
}
