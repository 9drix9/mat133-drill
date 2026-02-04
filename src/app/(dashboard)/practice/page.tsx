import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MODULES } from "@/types";
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

export default function PracticePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice Problems</h1>
        <p className="text-muted-foreground">
          Pick a topic below to start practicing. Each topic has 15+ questions.
        </p>
      </div>

      {/* Quick tips */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Tip:</strong> Start with topics you find hardest. If you get stuck, click &quot;Hint&quot; to see the solution step by step. Don&apos;t worry about mistakes - that&apos;s how you learn!
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MODULES.map((module) => {
          const Icon = iconMap[module.icon] || BarChart3;
          return (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.name}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">
                    <p className="font-medium mb-2">Topics covered:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {module.topics.slice(0, 4).map((topic) => (
                        <li key={topic} className="text-xs">
                          {topic}
                        </li>
                      ))}
                      {module.topics.length > 4 && (
                        <li className="text-xs text-primary">
                          +{module.topics.length - 4} more
                        </li>
                      )}
                    </ul>
                  </div>
                  <Link href={`/practice/${module.id}`}>
                    <Button className="w-full">Start Practice</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
