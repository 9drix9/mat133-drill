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
  mean as calcMean,
  standardDeviation as calcSD,
  median as calcMedian,
  quartiles as calcQuartiles,
} from "@/lib/utils";
import { Calculator, Info, BarChart3, TrendingUp, Target } from "lucide-react";

// Binomial Calculator Component
function BinomialCalculator() {
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
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Binomial Parameters</CardTitle>
          <CardDescription>Enter n (trials) and p (probability)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="n">n (trials)</Label>
              <Input id="n" type="number" min="1" placeholder="e.g., 10" value={n} onChange={(e) => setN(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p">p (success prob)</Label>
              <Input id="p" type="number" min="0" max="1" step="0.01" placeholder="e.g., 0.3" value={p} onChange={(e) => setP(e.target.value)} />
            </div>
          </div>

          {pVal > 0 && pVal <= 1 && <p className="text-sm text-muted-foreground">q = 1 - p = {qVal}</p>}

          <Tabs value={calcType} onValueChange={setCalcType}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="exact">P(X=k)</TabsTrigger>
              <TabsTrigger value="atleast">P(X≥k)</TabsTrigger>
              <TabsTrigger value="atmost">P(X≤k)</TabsTrigger>
              <TabsTrigger value="range">Range</TabsTrigger>
            </TabsList>

            <TabsContent value="exact" className="mt-4">
              <div className="space-y-2">
                <Label>k (exact successes)</Label>
                <Input type="number" min="0" placeholder="e.g., 3" value={k} onChange={(e) => setK(e.target.value)} />
              </div>
            </TabsContent>
            <TabsContent value="atleast" className="mt-4">
              <div className="space-y-2">
                <Label>k (minimum successes)</Label>
                <Input type="number" min="0" placeholder="e.g., 5" value={k} onChange={(e) => setK(e.target.value)} />
              </div>
            </TabsContent>
            <TabsContent value="atmost" className="mt-4">
              <div className="space-y-2">
                <Label>k (maximum successes)</Label>
                <Input type="number" min="0" placeholder="e.g., 2" value={k} onChange={(e) => setK(e.target.value)} />
              </div>
            </TabsContent>
            <TabsContent value="range" className="mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From (min)</Label>
                  <Input type="number" min="0" placeholder="e.g., 2" value={kStart} onChange={(e) => setKStart(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>To (max)</Label>
                  <Input type="number" min="0" placeholder="e.g., 5" value={kEnd} onChange={(e) => setKEnd(e.target.value)} />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {nVal > 0 && pVal > 0 && pVal <= 1 && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Distribution Statistics</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Mean (μ = np)</p>
                  <p className="text-lg font-bold">{mean}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Std Dev (σ = √npq)</p>
                  <p className="text-lg font-bold">{stdDev}</p>
                </div>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-4">
              <div className="p-6 bg-primary/5 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">{result.formula}</p>
                <p className="text-4xl font-bold text-primary">{roundTo(result.probability, 4)}</p>
                <p className="text-sm text-muted-foreground mt-2">{roundTo(result.probability * 100, 2)}%</p>
                {result.probability < 0.05 && <Badge variant="destructive" className="mt-2">Unusual (p &lt; 0.05)</Badge>}
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-1">
                <p className="text-sm font-medium mb-2">Steps:</p>
                {result.steps.map((step, i) => <p key={i} className="text-xs font-mono">{step}</p>)}
                <p className="text-sm font-mono font-bold pt-2 border-t">= {roundTo(result.probability, 6)}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Z-Score Calculator Component
function ZScoreCalculator() {
  const [x, setX] = useState("");
  const [mu, setMu] = useState("");
  const [sigma, setSigma] = useState("");
  const [calcMode, setCalcMode] = useState<"toZ" | "toX">("toZ");
  const [zInput, setZInput] = useState("");

  const xVal = parseFloat(x);
  const muVal = parseFloat(mu);
  const sigmaVal = parseFloat(sigma);
  const zInputVal = parseFloat(zInput);

  const zScore = useMemo(() => {
    if (calcMode === "toZ" && !isNaN(xVal) && !isNaN(muVal) && !isNaN(sigmaVal) && sigmaVal > 0) {
      return roundTo((xVal - muVal) / sigmaVal, 4);
    }
    return null;
  }, [xVal, muVal, sigmaVal, calcMode]);

  const xFromZ = useMemo(() => {
    if (calcMode === "toX" && !isNaN(zInputVal) && !isNaN(muVal) && !isNaN(sigmaVal) && sigmaVal > 0) {
      return roundTo(muVal + zInputVal * sigmaVal, 4);
    }
    return null;
  }, [zInputVal, muVal, sigmaVal, calcMode]);

  const isUnusual = zScore !== null && Math.abs(zScore) >= 2;

  const getPercentile = (z: number) => {
    if (z <= -3) return "~0.1%";
    if (z <= -2) return "~2.5%";
    if (z <= -1) return "~16%";
    if (z <= 0) return "~50%";
    if (z <= 1) return "~84%";
    if (z <= 2) return "~97.5%";
    return "~99.9%";
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Z-Score Calculator</CardTitle>
          <CardDescription>Convert between x-values and z-scores</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Mean (μ)</Label>
              <Input type="number" placeholder="e.g., 100" value={mu} onChange={(e) => setMu(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Std Dev (σ)</Label>
              <Input type="number" min="0" step="0.1" placeholder="e.g., 15" value={sigma} onChange={(e) => setSigma(e.target.value)} />
            </div>
          </div>

          <Tabs value={calcMode} onValueChange={(v) => setCalcMode(v as "toZ" | "toX")}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="toZ">Find Z-Score</TabsTrigger>
              <TabsTrigger value="toX">Find X-Value</TabsTrigger>
            </TabsList>

            <TabsContent value="toZ" className="mt-4">
              <div className="space-y-2">
                <Label>x (value)</Label>
                <Input type="number" placeholder="e.g., 120" value={x} onChange={(e) => setX(e.target.value)} />
              </div>
            </TabsContent>
            <TabsContent value="toX" className="mt-4">
              <div className="space-y-2">
                <Label>z-score</Label>
                <Input type="number" step="0.01" placeholder="e.g., 1.5" value={zInput} onChange={(e) => setZInput(e.target.value)} />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {calcMode === "toZ" && zScore !== null && (
            <>
              <div className="p-6 bg-primary/5 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">z = (x − μ) / σ</p>
                <p className="text-4xl font-bold text-primary">{zScore}</p>
                <p className="text-sm text-muted-foreground mt-2">≈ {getPercentile(zScore)} percentile</p>
                {isUnusual && <Badge variant="destructive" className="mt-2">Unusual (|z| ≥ 2)</Badge>}
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-1">
                <p className="text-sm font-medium mb-2">Calculation:</p>
                <p className="text-xs font-mono">z = ({xVal} − {muVal}) / {sigmaVal}</p>
                <p className="text-xs font-mono">z = {roundTo(xVal - muVal, 4)} / {sigmaVal}</p>
                <p className="text-xs font-mono font-bold">z = {zScore}</p>
              </div>
            </>
          )}

          {calcMode === "toX" && xFromZ !== null && (
            <>
              <div className="p-6 bg-primary/5 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">x = μ + z × σ</p>
                <p className="text-4xl font-bold text-primary">{xFromZ}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg space-y-1">
                <p className="text-sm font-medium mb-2">Calculation:</p>
                <p className="text-xs font-mono">x = {muVal} + ({zInputVal}) × {sigmaVal}</p>
                <p className="text-xs font-mono">x = {muVal} + {roundTo(zInputVal * sigmaVal, 4)}</p>
                <p className="text-xs font-mono font-bold">x = {xFromZ}</p>
              </div>
            </>
          )}

          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">Empirical Rule (68-95-99.7)</p>
            <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
              <li>68% of data: z between -1 and 1</li>
              <li>95% of data: z between -2 and 2</li>
              <li>99.7% of data: z between -3 and 3</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Statistics Calculator Component
function StatsCalculator() {
  const [dataInput, setDataInput] = useState("");

  const data = useMemo(() => {
    const nums = dataInput.split(/[,\s]+/).map((s) => parseFloat(s.trim())).filter((n) => !isNaN(n));
    return nums;
  }, [dataInput]);

  const stats = useMemo(() => {
    if (data.length < 2) return null;
    const sorted = [...data].sort((a, b) => a - b);
    const mean = calcMean(data);
    const sd = calcSD(data);
    const med = calcMedian(data);
    const q = calcQuartiles(data);
    const iqr = roundTo(q.q3 - q.q1, 4);
    const lowerFence = roundTo(q.q1 - 1.5 * iqr, 4);
    const upperFence = roundTo(q.q3 + 1.5 * iqr, 4);
    const outliers = sorted.filter((x) => x < lowerFence || x > upperFence);

    return {
      n: data.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      range: roundTo(sorted[sorted.length - 1] - sorted[0], 4),
      mean: roundTo(mean, 4),
      median: roundTo(med, 4),
      sd: roundTo(sd, 4),
      variance: roundTo(sd * sd, 4),
      q1: roundTo(q.q1, 4),
      q3: roundTo(q.q3, 4),
      iqr,
      lowerFence,
      upperFence,
      outliers,
    };
  }, [data]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Data Input</CardTitle>
          <CardDescription>Enter numbers separated by commas or spaces</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Data Values</Label>
            <textarea
              className="w-full h-32 p-3 border rounded-md text-sm font-mono resize-none"
              placeholder="Enter data: 12, 15, 18, 22, 25, 28, 30, 35, 42"
              value={dataInput}
              onChange={(e) => setDataInput(e.target.value)}
            />
          </div>
          {data.length > 0 && (
            <p className="text-sm text-muted-foreground">
              {data.length} values entered: {data.slice(0, 5).join(", ")}{data.length > 5 && "..."}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Statistics</CardTitle></CardHeader>
        <CardContent>
          {stats ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Mean (x̄)</p>
                  <p className="text-xl font-bold">{stats.mean}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Median</p>
                  <p className="text-xl font-bold">{stats.median}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Std Dev (s)</p>
                  <p className="text-xl font-bold">{stats.sd}</p>
                </div>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground">Variance (s²)</p>
                  <p className="text-xl font-bold">{stats.variance}</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Five-Number Summary</p>
                <div className="flex justify-between text-xs font-mono">
                  <span>Min: {stats.min}</span>
                  <span>Q1: {stats.q1}</span>
                  <span>Med: {stats.median}</span>
                  <span>Q3: {stats.q3}</span>
                  <span>Max: {stats.max}</span>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-medium">Outlier Detection</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>IQR: {stats.iqr}</div>
                  <div>Range: {stats.range}</div>
                  <div>Lower Fence: {stats.lowerFence}</div>
                  <div>Upper Fence: {stats.upperFence}</div>
                </div>
                {stats.outliers.length > 0 ? (
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                    Outliers: {stats.outliers.join(", ")}
                  </p>
                ) : (
                  <p className="text-sm text-green-600 dark:text-green-400">No outliers detected</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Enter at least 2 data values to calculate statistics
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Main Calculator Page
export default function CalculatorPage() {
  const [activeCalc, setActiveCalc] = useState("binomial");

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Calculator className="h-8 w-8 text-primary" />
          Statistics Calculators
        </h1>
        <p className="text-muted-foreground">
          Calculate probabilities and statistics with step-by-step solutions
        </p>
      </div>

      <Tabs value={activeCalc} onValueChange={setActiveCalc}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="binomial" className="gap-2">
            <Target className="h-4 w-4" />
            Binomial
          </TabsTrigger>
          <TabsTrigger value="zscore" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Z-Score
          </TabsTrigger>
          <TabsTrigger value="stats" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Statistics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="binomial" className="mt-6">
          <BinomialCalculator />
        </TabsContent>

        <TabsContent value="zscore" className="mt-6">
          <ZScoreCalculator />
        </TabsContent>

        <TabsContent value="stats" className="mt-6">
          <StatsCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
