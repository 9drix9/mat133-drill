"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  binomialPMF,
  binomialCDF,
  combinations,
  roundTo,
} from "@/lib/utils";
import { Calculator, Info } from "lucide-react";

export default function CalculatorPage() {
  const [n, setN] = useState("");
  const [p, setP] = useState("");
  const [k, setK] = useState("");
  const [kStart, setKStart] = useState("");
  const [kEnd, setKEnd] = useState("");
  const [calcType, setCalcType] = useState("exact");

  const nVal = parseInt(n) || 0;
  const pVal = parseFloat(p) || 0;
  const kVal = parseInt(k) || 0;
  const kStartVal = parseInt(kStart) || 0;
  const kEndVal = parseInt(kEnd) || 0;
  const qVal = roundTo(1 - pVal, 4);

  const isValidInput = useMemo(() => {
    if (nVal <= 0 || pVal < 0 || pVal > 1) return false;
    if (calcType === "exact" && (kVal < 0 || kVal > nVal)) return false;
    if (calcType === "range" && (kStartVal < 0 || kEndVal > nVal || kStartVal > kEndVal)) return false;
    if (calcType === "atleast" && (kVal < 0 || kVal > nVal)) return false;
    if (calcType === "atmost" && (kVal < 0 || kVal > nVal)) return false;
    return true;
  }, [nVal, pVal, kVal, kStartVal, kEndVal, calcType]);

  const result = useMemo(() => {
    if (!isValidInput) return null;

    switch (calcType) {
      case "exact":
        return {
          probability: binomialPMF(nVal, pVal, kVal),
          formula: `P(X = ${kVal})`,
          steps: [
            `C(${nVal}, ${kVal}) = ${combinations(nVal, kVal)}`,
            `p^k = ${pVal}^${kVal} = ${roundTo(Math.pow(pVal, kVal), 6)}`,
            `q^(n-k) = ${qVal}^${nVal - kVal} = ${roundTo(Math.pow(qVal, nVal - kVal), 6)}`,
            `P(X = ${kVal}) = ${combinations(nVal, kVal)} × ${roundTo(Math.pow(pVal, kVal), 6)} × ${roundTo(Math.pow(qVal, nVal - kVal), 6)}`,
          ],
        };
      case "range":
        const rangeProb = binomialCDF(nVal, pVal, kEndVal) - binomialCDF(nVal, pVal, kStartVal - 1);
        return {
          probability: rangeProb,
          formula: `P(${kStartVal} ≤ X ≤ ${kEndVal})`,
          steps: [
            `P(X ≤ ${kEndVal}) = ${roundTo(binomialCDF(nVal, pVal, kEndVal), 6)}`,
            `P(X ≤ ${kStartVal - 1}) = ${roundTo(binomialCDF(nVal, pVal, kStartVal - 1), 6)}`,
            `P(${kStartVal} ≤ X ≤ ${kEndVal}) = P(X ≤ ${kEndVal}) - P(X ≤ ${kStartVal - 1})`,
          ],
        };
      case "atleast":
        const atLeastProb = 1 - binomialCDF(nVal, pVal, kVal - 1);
        return {
          probability: atLeastProb,
          formula: `P(X ≥ ${kVal})`,
          steps: [
            `P(X ≥ ${kVal}) = 1 - P(X < ${kVal})`,
            `P(X ≥ ${kVal}) = 1 - P(X ≤ ${kVal - 1})`,
            `P(X ≤ ${kVal - 1}) = ${roundTo(binomialCDF(nVal, pVal, kVal - 1), 6)}`,
            `P(X ≥ ${kVal}) = 1 - ${roundTo(binomialCDF(nVal, pVal, kVal - 1), 6)}`,
          ],
        };
      case "atmost":
        return {
          probability: binomialCDF(nVal, pVal, kVal),
          formula: `P(X ≤ ${kVal})`,
          steps: [
            `P(X ≤ ${kVal}) = P(X = 0) + P(X = 1) + ... + P(X = ${kVal})`,
            `This is the cumulative distribution function (CDF)`,
          ],
        };
      default:
        return null;
    }
  }, [nVal, pVal, qVal, kVal, kStartVal, kEndVal, calcType, isValidInput]);

  const mean = roundTo(nVal * pVal, 4);
  const stdDev = roundTo(Math.sqrt(nVal * pVal * qVal), 4);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          Binomial Calculator
        </h1>
        <p className="text-muted-foreground">
          Calculate binomial probabilities with step-by-step solutions
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Parameters</CardTitle>
            <CardDescription>
              Enter your binomial distribution parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="n">n (trials)</Label>
                <Input
                  id="n"
                  type="number"
                  min="1"
                  placeholder="e.g., 10"
                  value={n}
                  onChange={(e) => setN(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="p">p (success prob)</Label>
                <Input
                  id="p"
                  type="number"
                  min="0"
                  max="1"
                  step="0.01"
                  placeholder="e.g., 0.3"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                />
              </div>
            </div>

            {pVal > 0 && pVal <= 1 && (
              <p className="text-sm text-muted-foreground">
                q = 1 - p = {qVal}
              </p>
            )}

            <Tabs value={calcType} onValueChange={setCalcType}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="exact">P(X=k)</TabsTrigger>
                <TabsTrigger value="atleast">P(X≥k)</TabsTrigger>
                <TabsTrigger value="atmost">P(X≤k)</TabsTrigger>
                <TabsTrigger value="range">Range</TabsTrigger>
              </TabsList>

              <TabsContent value="exact" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="k">k (exact successes)</Label>
                  <Input
                    id="k"
                    type="number"
                    min="0"
                    placeholder="e.g., 3"
                    value={k}
                    onChange={(e) => setK(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="atleast" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="k-atleast">k (minimum successes)</Label>
                  <Input
                    id="k-atleast"
                    type="number"
                    min="0"
                    placeholder="e.g., 5"
                    value={k}
                    onChange={(e) => setK(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="atmost" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="k-atmost">k (maximum successes)</Label>
                  <Input
                    id="k-atmost"
                    type="number"
                    min="0"
                    placeholder="e.g., 2"
                    value={k}
                    onChange={(e) => setK(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="range" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="k-start">From (min)</Label>
                    <Input
                      id="k-start"
                      type="number"
                      min="0"
                      placeholder="e.g., 2"
                      value={kStart}
                      onChange={(e) => setKStart(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="k-end">To (max)</Label>
                    <Input
                      id="k-end"
                      type="number"
                      min="0"
                      placeholder="e.g., 5"
                      value={kEnd}
                      onChange={(e) => setKEnd(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {nVal > 0 && pVal > 0 && pVal <= 1 && (
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">
                  Distribution Statistics
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Mean (μ)</p>
                    <p className="text-lg font-bold">{mean}</p>
                    <p className="text-xs text-muted-foreground">μ = np</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Std Dev (σ)</p>
                    <p className="text-lg font-bold">{stdDev}</p>
                    <p className="text-xs text-muted-foreground">σ = √(npq)</p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-primary/5 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-1">
                    {result.formula}
                  </p>
                  <p className="text-4xl font-bold text-primary">
                    {roundTo(result.probability, 4)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {roundTo(result.probability * 100, 2)}%
                  </p>
                  {result.probability < 0.05 && (
                    <Badge variant="warning" className="mt-2">
                      Unusual (p &lt; 0.05)
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    Calculation Steps
                  </p>
                  <div className="p-4 bg-muted rounded-lg space-y-2">
                    {result.steps.map((step, i) => (
                      <p key={i} className="text-sm font-mono">
                        {step}
                      </p>
                    ))}
                    <p className="text-sm font-mono font-bold pt-2 border-t">
                      = {roundTo(result.probability, 6)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!isValidInput && n && p && (
              <div className="p-4 bg-red-50 text-red-700 rounded-lg">
                <p className="text-sm">
                  Please check your inputs:
                </p>
                <ul className="text-sm list-disc list-inside mt-2">
                  {nVal <= 0 && <li>n must be positive</li>}
                  {(pVal < 0 || pVal > 1) && <li>p must be between 0 and 1</li>}
                  {kVal < 0 && <li>k must be non-negative</li>}
                  {kVal > nVal && <li>k cannot exceed n</li>}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Formula Reference */}
      <Card>
        <CardHeader>
          <CardTitle>Binomial Formula Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">PMF (Probability Mass Function)</p>
              <p className="font-mono text-sm">
                P(X = k) = C(n,k) × p^k × q^(n-k)
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Where C(n,k) = n! / (k!(n-k)!)
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Mean & Standard Deviation</p>
              <p className="font-mono text-sm">μ = np</p>
              <p className="font-mono text-sm">σ = √(npq)</p>
              <p className="text-xs text-muted-foreground mt-2">
                Where q = 1 - p
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Binomial Conditions</p>
              <ul className="text-sm list-disc list-inside space-y-1">
                <li>Fixed number of trials (n)</li>
                <li>Independent trials</li>
                <li>Two outcomes (success/failure)</li>
                <li>Constant probability (p)</li>
              </ul>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium mb-2">Useful Shortcuts</p>
              <p className="font-mono text-sm">P(X ≥ k) = 1 - P(X ≤ k-1)</p>
              <p className="font-mono text-sm">P(X &gt; k) = 1 - P(X ≤ k)</p>
              <p className="font-mono text-sm">
                P(a ≤ X ≤ b) = P(X ≤ b) - P(X ≤ a-1)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
