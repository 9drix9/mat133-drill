import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundTo(value: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function factorial(n: number): number {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

export function combinations(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  return factorial(n) / (factorial(k) * factorial(n - k));
}

export function binomialPMF(n: number, p: number, k: number): number {
  return combinations(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

export function binomialCDF(n: number, p: number, k: number): number {
  let sum = 0;
  for (let i = 0; i <= k; i++) {
    sum += binomialPMF(n, p, i);
  }
  return sum;
}

export function mean(data: number[]): number {
  return data.reduce((a, b) => a + b, 0) / data.length;
}

export function standardDeviation(data: number[], population = false): number {
  const avg = mean(data);
  const squaredDiffs = data.map(x => Math.pow(x - avg, 2));
  const divisor = population ? data.length : data.length - 1;
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / divisor);
}

export function median(data: number[]): number {
  const sorted = [...data].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function quartiles(data: number[]): { q1: number; q2: number; q3: number } {
  const sorted = [...data].sort((a, b) => a - b);
  const q2 = median(sorted);
  const mid = Math.floor(sorted.length / 2);
  const lowerHalf = sorted.length % 2 === 0
    ? sorted.slice(0, mid)
    : sorted.slice(0, mid);
  const upperHalf = sorted.length % 2 === 0
    ? sorted.slice(mid)
    : sorted.slice(mid + 1);
  return {
    q1: median(lowerHalf),
    q2,
    q3: median(upperHalf),
  };
}

export function zScore(x: number, mean: number, stdDev: number): number {
  return (x - mean) / stdDev;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomFloat(min: number, max: number, decimals: number = 2): number {
  const value = Math.random() * (max - min) + min;
  return roundTo(value, decimals);
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${roundTo(value * 100, decimals)}%`;
}
