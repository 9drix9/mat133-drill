export interface Question {
  id: string;
  moduleTag: string;
  prompt: string;
  choices?: string[];
  correctAnswer: string;
  roundingRule?: string;
  units?: string;
  difficulty: number;
  solutionSteps: string[];
  isGenerated?: boolean;
}

export interface Flashcard {
  id: string;
  moduleTag: string;
  front: string;
  back: string;
  cardType: 'formula' | 'definition' | 'rule';
}

export interface FlashcardWithState extends Flashcard {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextReview: Date;
}

export interface ModuleInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  topics: string[];
}

export interface ModuleProgress {
  moduleTag: string;
  totalAttempts: number;
  correctCount: number;
  accuracy: number;
  lastPracticed?: Date;
}

export interface ExamResult {
  questionId: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timeSpentMs?: number;
}

export interface ExamSession {
  id: string;
  startedAt: Date;
  completedAt?: Date;
  timeLimit?: number;
  score?: number;
  totalQuestions: number;
  results?: ExamResult[];
}

export interface SM2Response {
  quality: 0 | 1 | 2 | 3 | 4 | 5;
}

export interface SM2State {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export const MODULES: ModuleInfo[] = [
  {
    id: 'graphs-data',
    name: 'Graphs & Data Displays',
    description: 'Bar charts, histograms, boxplots, and time-series graphs',
    icon: 'BarChart3',
    topics: [
      'Frequency bar chart',
      'Pareto chart',
      'Histogram',
      'Time-series graph',
      'Boxplot interpretation',
    ],
  },
  {
    id: 'distribution-shape',
    name: 'Distribution Shape',
    description: 'Identifying skewness and symmetry in data',
    icon: 'TrendingUp',
    topics: [
      'Skewed left',
      'Skewed right',
      'Symmetric',
      'When shape cannot be determined',
    ],
  },
  {
    id: 'frequency-tables',
    name: 'Frequency Tables & Grouped Data',
    description: 'Working with frequency distributions and class intervals',
    icon: 'Table',
    topics: [
      'Relative frequency',
      'Cumulative frequency',
      'Class midpoints',
      'Class width',
      'Mean from grouped data',
      'Standard deviation from grouped data',
    ],
  },
  {
    id: 'quartiles-iqr',
    name: 'Quartiles, IQR & Outliers',
    description: 'Five-number summary and outlier detection',
    icon: 'GitBranch',
    topics: [
      'Q1, Q2 (median), Q3',
      'IQR = Q3 − Q1',
      'Lower fence = Q1 − 1.5(IQR)',
      'Upper fence = Q3 + 1.5(IQR)',
      'Identify outliers',
      'Best center/spread choice',
    ],
  },
  {
    id: 'normal-distribution',
    name: 'Normal Distribution',
    description: 'Z-scores and the empirical rule',
    icon: 'Activity',
    topics: [
      'Empirical rule (68-95-99.7)',
      'Z-score formula',
      'Identifying unusual values',
    ],
  },
  {
    id: 'regression-correlation',
    name: 'Regression & Correlation',
    description: 'Linear relationships and predictions',
    icon: 'LineChart',
    topics: [
      'Explanatory vs response variable',
      'Regression equation ŷ = a + bx',
      'Slope interpretation',
      'Correlation coefficient r',
      'Coefficient of determination r²',
      'Residuals',
      'Scope of model',
      'Lurking variables',
    ],
  },
  {
    id: 'probability-basics',
    name: 'Probability Basics',
    description: 'Fundamental probability concepts',
    icon: 'Dice1',
    topics: [
      'Sample space',
      'Union and intersection',
      'Complements',
      'Disjoint vs not disjoint',
      'Independent vs dependent',
      'Classical, empirical, subjective probability',
    ],
  },
  {
    id: 'contingency-tables',
    name: 'Contingency Tables',
    description: 'Two-way tables and conditional probability',
    icon: 'Grid3X3',
    topics: [
      'Joint probability',
      'Marginal probability',
      'Union with overlap',
      'Independent draws',
      'Unusual events (p < 0.05)',
    ],
  },
  {
    id: 'discrete-distributions',
    name: 'Discrete Probability Distributions',
    description: 'Expected value and variance calculations',
    icon: 'BarChart2',
    topics: [
      'Validity rules',
      'Expected value μ = Σ xP(x)',
      'Variance and standard deviation',
      'Multi-pick independence',
      'Complement shortcuts',
    ],
  },
  {
    id: 'expected-value-casino',
    name: 'Expected Value & House Edge',
    description: 'Casino and gambling probability problems',
    icon: 'DollarSign',
    topics: [
      'Profit distributions',
      'Expected profit per bet',
      'Scaling by bet size',
      'House edge calculation',
      'Fair vs unfair games',
    ],
  },
  {
    id: 'binomial',
    name: 'Binomial Distribution',
    description: 'Binomial probability calculations',
    icon: 'Binary',
    topics: [
      'Identify n, p, q',
      'Mean μ = np',
      'Standard deviation σ = √(npq)',
      'P(X = k), P(X ≥ k), P(a ≤ X ≤ b)',
      'Unusual probabilities',
      'Binomial conditions',
    ],
  },
];

export type ModuleId = typeof MODULES[number]['id'];
