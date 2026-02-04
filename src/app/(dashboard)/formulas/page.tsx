"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, FileText } from "lucide-react";

const formulaSections = [
  {
    title: "Descriptive Statistics",
    formulas: [
      { name: "Mean (Average)", formula: "x̄ = Σx / n", note: "Sum all values, divide by count" },
      { name: "Median", formula: "Middle value when sorted", note: "If even count: average of two middle values" },
      { name: "Mode", formula: "Most frequent value", note: "Can have multiple modes or none" },
      { name: "Range", formula: "Range = Max − Min", note: "Affected by outliers" },
      { name: "Variance (Sample)", formula: "s² = Σ(x − x̄)² / (n − 1)", note: "Use n−1 for sample" },
      { name: "Standard Deviation", formula: "s = √[Σ(x − x̄)² / (n − 1)]", note: "Square root of variance" },
      { name: "Class Midpoint", formula: "Midpoint = (Lower + Upper) / 2", note: "For grouped data" },
      { name: "Relative Frequency", formula: "Rel. Freq = f / n", note: "Must sum to 1" },
    ],
  },
  {
    title: "Quartiles & Outliers",
    formulas: [
      { name: "Quartiles", formula: "Q1 = 25th %, Q2 = 50th %, Q3 = 75th %", note: "Divide sorted data into 4 parts" },
      { name: "IQR", formula: "IQR = Q3 − Q1", note: "Interquartile Range (middle 50%)" },
      { name: "Lower Fence", formula: "Q1 − 1.5 × IQR", note: "Values below are outliers" },
      { name: "Upper Fence", formula: "Q3 + 1.5 × IQR", note: "Values above are outliers" },
      { name: "Five-Number Summary", formula: "Min, Q1, Median, Q3, Max", note: "Used for boxplots" },
    ],
  },
  {
    title: "Normal Distribution & Z-Scores",
    formulas: [
      { name: "Z-Score", formula: "z = (x − μ) / σ", note: "How many SDs from mean" },
      { name: "Value from Z", formula: "x = μ + z × σ", note: "Convert z back to x" },
      { name: "Empirical Rule (68-95-99.7)", formula: "68% within ±1σ, 95% within ±2σ, 99.7% within ±3σ", note: "For normal distributions only" },
      { name: "Unusual Value", formula: "|z| ≥ 2", note: "More than 2 SDs from mean" },
    ],
  },
  {
    title: "Regression & Correlation",
    formulas: [
      { name: "Regression Line", formula: "ŷ = a + bx", note: "a = y-intercept, b = slope" },
      { name: "Slope Interpretation", formula: "For each 1-unit ↑ in x, y changes by b", note: "b > 0: positive, b < 0: negative" },
      { name: "Residual", formula: "Residual = y − ŷ = Actual − Predicted", note: "+ means underestimated" },
      { name: "Correlation (r)", formula: "−1 ≤ r ≤ 1", note: "Strength & direction of linear relationship" },
      { name: "Coefficient of Determination", formula: "r² = (correlation)²", note: "% of variation explained" },
    ],
  },
  {
    title: "Probability Rules",
    formulas: [
      { name: "Basic Probability", formula: "P(A) = favorable / total", note: "Always between 0 and 1" },
      { name: "Complement Rule", formula: "P(not A) = 1 − P(A)", note: "P(at least 1) = 1 − P(none)" },
      { name: "Addition Rule", formula: "P(A or B) = P(A) + P(B) − P(A and B)", note: "Subtract overlap!" },
      { name: "Multiplication (Independent)", formula: "P(A and B) = P(A) × P(B)", note: "Only if independent" },
      { name: "Conditional Probability", formula: "P(A|B) = P(A and B) / P(B)", note: "Probability of A given B" },
    ],
  },
  {
    title: "Contingency Tables",
    formulas: [
      { name: "Joint Probability", formula: "P(A and B) = cell / grand total", note: "From inside the table" },
      { name: "Marginal Probability", formula: "P(A) = row or column total / grand total", note: "From the margins" },
      { name: "Conditional from Table", formula: "P(A|B) = cell count / column (or row) total", note: "Restrict to given condition" },
    ],
  },
  {
    title: "Discrete Distributions",
    formulas: [
      { name: "Expected Value", formula: "E(X) = Σ[x × P(x)]", note: "Weighted average of outcomes" },
      { name: "Variance", formula: "Var(X) = Σ[(x − μ)² × P(x)]", note: "Or: E(X²) − [E(X)]²" },
      { name: "Standard Deviation", formula: "σ = √Var(X)", note: "Square root of variance" },
      { name: "Valid Distribution Check", formula: "All P(x) ≥ 0 and ΣP(x) = 1", note: "Both conditions required" },
    ],
  },
  {
    title: "Expected Value & House Edge",
    formulas: [
      { name: "Expected Profit", formula: "E(profit) = Σ(profit × probability)", note: "Negative = you lose on average" },
      { name: "House Edge", formula: "House Edge = −E(profit per $1) × 100%", note: "Casino's advantage %" },
      { name: "Total Expected Value", formula: "E(total) = E(per game) × # games", note: "Scales with plays" },
    ],
  },
  {
    title: "Binomial Distribution",
    formulas: [
      { name: "Conditions (BINS)", formula: "Binary, Independent, N fixed, Same p", note: "All 4 must be met" },
      { name: "Probability Formula", formula: "P(X=k) = C(n,k) × p^k × q^(n−k)", note: "q = 1 − p" },
      { name: "Combinations", formula: "C(n,k) = n! / [k!(n−k)!]", note: "\"n choose k\"" },
      { name: "Mean", formula: "μ = np", note: "Expected number of successes" },
      { name: "Standard Deviation", formula: "σ = √(npq)", note: "Where q = 1 − p" },
      { name: "Complement Shortcut", formula: "P(X ≥ 1) = 1 − P(X = 0) = 1 − q^n", note: "Easier than summing" },
    ],
  },
];

const quickReference = [
  { label: "68-95-99.7", value: "% within 1, 2, 3 standard deviations" },
  { label: "z ≥ 2 or z ≤ −2", value: "Unusual value" },
  { label: "P < 0.05", value: "Unusual event" },
  { label: "r close to ±1", value: "Strong correlation" },
  { label: "r² = 0.64", value: "64% variation explained" },
];

export default function FormulasPage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header - hidden when printing */}
      <div className="flex items-center justify-between print:hidden">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-primary" />
            Formula Cheat Sheet
          </h1>
          <p className="text-muted-foreground">
            All the formulas you need for MAT 133 in one place
          </p>
        </div>
        <Button onClick={handlePrint} className="gap-2">
          <Printer className="h-4 w-4" />
          Print / Save PDF
        </Button>
      </div>

      {/* Print header - only shown when printing */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-2xl font-bold">MAT 133 Formula Cheat Sheet</h1>
        <p className="text-sm text-gray-600">Keep this handy while studying!</p>
      </div>

      {/* Quick Reference Box */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 print:bg-blue-50 print:border-blue-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-blue-800 dark:text-blue-200 print:text-blue-800">
            ⚡ Quick Reference
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
            {quickReference.map((item, i) => (
              <div key={i} className="text-center p-2 bg-white dark:bg-blue-900 rounded print:bg-white">
                <div className="font-bold text-blue-700 dark:text-blue-300 print:text-blue-700">{item.label}</div>
                <div className="text-xs text-blue-600 dark:text-blue-400 print:text-blue-600">{item.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Formula Sections */}
      <div className="grid gap-4 md:grid-cols-2 print:grid-cols-2 print:gap-2">
        {formulaSections.map((section, idx) => (
          <Card key={idx} className="print:break-inside-avoid print:border print:shadow-none">
            <CardHeader className="pb-2 print:pb-1">
              <CardTitle className="text-base print:text-sm">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="print:pt-0">
              <div className="space-y-2 print:space-y-1">
                {section.formulas.map((f, i) => (
                  <div key={i} className="border-b last:border-0 pb-2 last:pb-0 print:pb-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-medium text-sm print:text-xs">{f.name}</span>
                    </div>
                    <div className="font-mono text-sm text-primary print:text-xs print:text-blue-700 bg-muted/50 px-2 py-1 rounded mt-1 print:bg-gray-100">
                      {f.formula}
                    </div>
                    {f.note && (
                      <div className="text-xs text-muted-foreground mt-1 print:text-gray-600">
                        💡 {f.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Common Mistakes Box */}
      <Card className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 print:bg-red-50 print:border-red-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-red-800 dark:text-red-200 print:text-red-800">
            ⚠️ Common Mistakes to Avoid
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid md:grid-cols-2 gap-2 text-sm print:text-xs">
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>Forgetting to subtract P(A and B) in addition rule</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>Using z = (μ − x)/σ instead of (x − μ)/σ</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>Confusing r (correlation) with r² (determination)</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>Not sorting data before finding median/quartiles</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>Using binomial when trials aren&apos;t independent</span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-500">✗</span>
              <span>Thinking P(A|B) = P(B|A) (they&apos;re usually different!)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Print footer */}
      <div className="hidden print:block text-center text-xs text-gray-500 mt-4">
        Generated by MAT133 Drill - Good luck on your exam! 🍀
      </div>
    </div>
  );
}
