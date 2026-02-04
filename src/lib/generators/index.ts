import { Question } from '@/types';
import { randomInt, randomFloat, roundTo, combinations, binomialPMF, binomialCDF, mean, standardDeviation, quartiles } from '@/lib/utils';

function generateId(): string {
  return `gen-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generatePercentOfTotalProblem(): Question {
  const categories = ['freshmen', 'sophomores', 'juniors', 'seniors'];
  const counts = categories.map(() => randomInt(20, 150));
  const total = counts.reduce((a, b) => a + b, 0);
  const targetIndex = randomInt(0, categories.length - 1);
  const targetCategory = categories[targetIndex];
  const targetCount = counts[targetIndex];
  const percent = roundTo((targetCount / total) * 100, 2);

  return {
    id: generateId(),
    moduleTag: 'frequency-tables',
    prompt: `A survey of ${total} college students categorized them by year:\n${categories.map((c, i) => `${c.charAt(0).toUpperCase() + c.slice(1)}: ${counts[i]}`).join('\n')}\n\nWhat percent of students are ${targetCategory}?`,
    correctAnswer: `${percent}`,
    roundingRule: 'Round to 2 decimal places',
    units: '%',
    difficulty: 1,
    solutionSteps: [
      `Total number of students = ${counts.join(' + ')} = ${total}`,
      `Number of ${targetCategory} = ${targetCount}`,
      `Percent = (${targetCount} / ${total}) × 100`,
      `Percent = ${roundTo(targetCount / total, 4)} × 100 = ${percent}%`,
    ],
    isGenerated: true,
  };
}

export function generateHistogramBinProblem(): Question {
  const binWidth = randomInt(5, 20);
  const startValue = randomInt(0, 50);
  const numBins = randomInt(4, 7);
  const frequencies = Array.from({ length: numBins }, () => randomInt(2, 25));
  const targetBinIndex = randomInt(0, numBins - 1);
  const binStart = startValue + targetBinIndex * binWidth;
  const binEnd = binStart + binWidth;
  const total = frequencies.reduce((a, b) => a + b, 0);
  const cumFreq = frequencies.slice(0, targetBinIndex + 1).reduce((a, b) => a + b, 0);
  const relFreq = roundTo(frequencies[targetBinIndex] / total, 4);

  const questionType = randomInt(1, 3);
  let prompt: string, answer: string, steps: string[];

  if (questionType === 1) {
    prompt = `A histogram shows data with class width ${binWidth}, starting at ${startValue}. The frequencies are: ${frequencies.join(', ')}.\n\nWhat is the frequency for the class ${binStart}-${binEnd}?`;
    answer = `${frequencies[targetBinIndex]}`;
    steps = [
      `The classes are: ${Array.from({ length: numBins }, (_, i) => `${startValue + i * binWidth}-${startValue + (i + 1) * binWidth}`).join(', ')}`,
      `The class ${binStart}-${binEnd} is the ${targetBinIndex + 1}${targetBinIndex === 0 ? 'st' : targetBinIndex === 1 ? 'nd' : targetBinIndex === 2 ? 'rd' : 'th'} class`,
      `Its frequency is ${frequencies[targetBinIndex]}`,
    ];
  } else if (questionType === 2) {
    prompt = `A histogram shows data with class width ${binWidth}, starting at ${startValue}. The frequencies are: ${frequencies.join(', ')}.\n\nWhat is the relative frequency for the class ${binStart}-${binEnd}?`;
    answer = `${relFreq}`;
    steps = [
      `Total frequency = ${frequencies.join(' + ')} = ${total}`,
      `Frequency for class ${binStart}-${binEnd} = ${frequencies[targetBinIndex]}`,
      `Relative frequency = ${frequencies[targetBinIndex]} / ${total} = ${relFreq}`,
    ];
  } else {
    prompt = `A histogram shows data with class width ${binWidth}, starting at ${startValue}. The frequencies are: ${frequencies.join(', ')}.\n\nWhat is the cumulative frequency up to and including the class ${binStart}-${binEnd}?`;
    answer = `${cumFreq}`;
    steps = [
      `Classes up to ${binStart}-${binEnd}: ${Array.from({ length: targetBinIndex + 1 }, (_, i) => `${startValue + i * binWidth}-${startValue + (i + 1) * binWidth}`).join(', ')}`,
      `Frequencies: ${frequencies.slice(0, targetBinIndex + 1).join(', ')}`,
      `Cumulative frequency = ${frequencies.slice(0, targetBinIndex + 1).join(' + ')} = ${cumFreq}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'frequency-tables',
    prompt,
    correctAnswer: answer,
    roundingRule: questionType === 2 ? 'Round to 4 decimal places' : undefined,
    difficulty: 2,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export function generateFrequencyTableProblem(): Question {
  const classWidth = randomInt(5, 15);
  const lowerLimit = randomInt(10, 50);
  const numClasses = randomInt(4, 6);
  const frequencies = Array.from({ length: numClasses }, () => randomInt(3, 20));
  const total = frequencies.reduce((a, b) => a + b, 0);

  const classes = Array.from({ length: numClasses }, (_, i) => ({
    lower: lowerLimit + i * classWidth,
    upper: lowerLimit + (i + 1) * classWidth - 1,
    midpoint: lowerLimit + i * classWidth + (classWidth - 1) / 2,
    freq: frequencies[i],
  }));

  const relFrequencies = frequencies.map(f => roundTo(f / total, 4));
  const cumFrequencies = frequencies.reduce((acc, f, i) => {
    acc.push(i === 0 ? f : acc[i - 1] + f);
    return acc;
  }, [] as number[]);

  const sumFxM = classes.reduce((sum, c) => sum + c.freq * c.midpoint, 0);
  const groupedMean = roundTo(sumFxM / total, 2);

  return {
    id: generateId(),
    moduleTag: 'frequency-tables',
    prompt: `Given the frequency table:\n${classes.map(c => `Class ${c.lower}-${c.upper}: frequency ${c.freq}`).join('\n')}\n\nCalculate the mean using class midpoints.`,
    correctAnswer: `${groupedMean}`,
    roundingRule: 'Round to 2 decimal places',
    difficulty: 2,
    solutionSteps: [
      `Class midpoints: ${classes.map(c => c.midpoint).join(', ')}`,
      `Multiply each midpoint by its frequency:`,
      ...classes.map(c => `  ${c.midpoint} × ${c.freq} = ${c.midpoint * c.freq}`),
      `Sum of (midpoint × frequency) = ${sumFxM}`,
      `Total frequency = ${total}`,
      `Mean = ${sumFxM} / ${total} = ${groupedMean}`,
    ],
    isGenerated: true,
  };
}

export function generateIQROutlierProblem(): Question {
  const n = randomInt(8, 15);
  const baseValue = randomInt(20, 60);
  const data = Array.from({ length: n }, () => baseValue + randomInt(-15, 25));

  // Add potential outliers
  if (Math.random() > 0.5) {
    data.push(baseValue + randomInt(40, 60));
  }
  if (Math.random() > 0.5) {
    data.unshift(baseValue - randomInt(30, 50));
  }

  data.sort((a, b) => a - b);

  const q = quartiles(data);
  const iqr = roundTo(q.q3 - q.q1, 2);
  const lowerFence = roundTo(q.q1 - 1.5 * iqr, 2);
  const upperFence = roundTo(q.q3 + 1.5 * iqr, 2);
  const outliers = data.filter(x => x < lowerFence || x > upperFence);

  const questionTypes = ['iqr', 'fences', 'outliers'];
  const type = questionTypes[randomInt(0, 2)];

  let prompt: string, answer: string, steps: string[];

  if (type === 'iqr') {
    prompt = `Dataset: ${data.join(', ')}\n\nCalculate the IQR (Interquartile Range).`;
    answer = `${iqr}`;
    steps = [
      `Sorted data: ${data.join(', ')}`,
      `Q1 (25th percentile) = ${q.q1}`,
      `Q3 (75th percentile) = ${q.q3}`,
      `IQR = Q3 - Q1 = ${q.q3} - ${q.q1} = ${iqr}`,
    ];
  } else if (type === 'fences') {
    prompt = `Dataset: ${data.join(', ')}\n\nCalculate the lower and upper fences for outlier detection.`;
    answer = `Lower: ${lowerFence}, Upper: ${upperFence}`;
    steps = [
      `Q1 = ${q.q1}, Q3 = ${q.q3}`,
      `IQR = Q3 - Q1 = ${iqr}`,
      `Lower fence = Q1 - 1.5(IQR) = ${q.q1} - 1.5(${iqr}) = ${lowerFence}`,
      `Upper fence = Q3 + 1.5(IQR) = ${q.q3} + 1.5(${iqr}) = ${upperFence}`,
    ];
  } else {
    prompt = `Dataset: ${data.join(', ')}\n\nIdentify any outliers using the 1.5×IQR rule.`;
    answer = outliers.length === 0 ? 'No outliers' : outliers.join(', ');
    steps = [
      `Q1 = ${q.q1}, Q3 = ${q.q3}`,
      `IQR = ${iqr}`,
      `Lower fence = ${lowerFence}`,
      `Upper fence = ${upperFence}`,
      `Values below ${lowerFence} or above ${upperFence} are outliers`,
      outliers.length === 0
        ? 'All values fall within the fences, so there are no outliers'
        : `Outliers: ${outliers.join(', ')}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'quartiles-iqr',
    prompt,
    correctAnswer: answer,
    difficulty: 2,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export function generateZScoreProblem(): Question {
  const mu = randomInt(50, 150);
  const sigma = randomInt(5, 25);
  const x = mu + randomInt(-3, 3) * sigma + randomInt(-sigma, sigma);
  const z = roundTo((x - mu) / sigma, 2);
  const isUnusual = Math.abs(z) >= 2;

  const type = randomInt(1, 2);
  let prompt: string, answer: string, steps: string[];

  if (type === 1) {
    prompt = `A dataset has mean μ = ${mu} and standard deviation σ = ${sigma}.\n\nCalculate the z-score for x = ${x}. Is this value unusual?`;
    answer = `z = ${z}, ${isUnusual ? 'Yes, unusual' : 'No, not unusual'}`;
    steps = [
      `z-score formula: z = (x - μ) / σ`,
      `z = (${x} - ${mu}) / ${sigma}`,
      `z = ${x - mu} / ${sigma}`,
      `z = ${z}`,
      `A value is unusual if |z| ≥ 2`,
      `|${z}| = ${Math.abs(z)}`,
      isUnusual
        ? `Since ${Math.abs(z)} ≥ 2, this value IS unusual`
        : `Since ${Math.abs(z)} < 2, this value is NOT unusual`,
    ];
  } else {
    const percentile = z < -2 ? 'bottom 2.5%' : z < -1 ? 'bottom 16%' : z < 0 ? 'below average' : z < 1 ? 'above average' : z < 2 ? 'top 16%' : 'top 2.5%';
    prompt = `A dataset has mean μ = ${mu} and standard deviation σ = ${sigma}.\n\nIf a value has z-score = ${z}, what is the original value x?`;
    answer = `${x}`;
    steps = [
      `z-score formula: z = (x - μ) / σ`,
      `Solving for x: x = μ + z × σ`,
      `x = ${mu} + (${z}) × ${sigma}`,
      `x = ${mu} + ${roundTo(z * sigma, 2)}`,
      `x = ${x}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'normal-distribution',
    prompt,
    correctAnswer: answer,
    roundingRule: 'Round z-score to 2 decimal places',
    difficulty: 2,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export function generateEmpiricalRuleProblem(): Question {
  const mu = randomInt(40, 120);
  const sigma = randomInt(5, 20);
  const deviations = randomInt(1, 3);

  const lower = mu - deviations * sigma;
  const upper = mu + deviations * sigma;
  const percent = deviations === 1 ? 68 : deviations === 2 ? 95 : 99.7;

  const type = randomInt(1, 2);
  let prompt: string, answer: string, steps: string[];

  if (type === 1) {
    prompt = `A normally distributed dataset has mean μ = ${mu} and standard deviation σ = ${sigma}.\n\nUsing the empirical rule, approximately what percentage of data falls between ${lower} and ${upper}?`;
    answer = `${percent}%`;
    steps = [
      `Calculate how many standard deviations from the mean:`,
      `Lower bound: (${lower} - ${mu}) / ${sigma} = ${-deviations} standard deviations`,
      `Upper bound: (${upper} - ${mu}) / ${sigma} = ${deviations} standard deviations`,
      `This is within ±${deviations} standard deviations of the mean`,
      `Empirical Rule:`,
      `  ±1σ: 68% of data`,
      `  ±2σ: 95% of data`,
      `  ±3σ: 99.7% of data`,
      `Answer: ${percent}%`,
    ];
  } else {
    prompt = `A normally distributed dataset has mean μ = ${mu} and standard deviation σ = ${sigma}.\n\nUsing the empirical rule, between what two values do approximately ${percent}% of the data fall?`;
    answer = `${lower} to ${upper}`;
    steps = [
      `Empirical Rule: ${percent}% falls within ±${deviations}σ`,
      `Lower bound = μ - ${deviations}σ = ${mu} - ${deviations}(${sigma}) = ${lower}`,
      `Upper bound = μ + ${deviations}σ = ${mu} + ${deviations}(${sigma}) = ${upper}`,
      `Answer: ${lower} to ${upper}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'normal-distribution',
    prompt,
    correctAnswer: answer,
    difficulty: 1,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export function generateRegressionProblem(): Question {
  const slope = randomFloat(-5, 5, 2);
  const intercept = randomFloat(-20, 100, 2);
  const xValue = randomInt(5, 50);
  const yPredicted = roundTo(intercept + slope * xValue, 2);
  const yActual = roundTo(yPredicted + randomFloat(-10, 10, 2), 2);
  const residual = roundTo(yActual - yPredicted, 2);

  const type = randomInt(1, 3);
  let prompt: string, answer: string, steps: string[];

  if (type === 1) {
    prompt = `Given the regression equation ŷ = ${intercept} + ${slope}x\n\nPredict the value of y when x = ${xValue}.`;
    answer = `${yPredicted}`;
    steps = [
      `Substitute x = ${xValue} into the equation:`,
      `ŷ = ${intercept} + ${slope}(${xValue})`,
      `ŷ = ${intercept} + ${roundTo(slope * xValue, 2)}`,
      `ŷ = ${yPredicted}`,
    ];
  } else if (type === 2) {
    prompt = `Given the regression equation ŷ = ${intercept} + ${slope}x\n\nWhen x = ${xValue}, the actual y value is ${yActual}. Calculate the residual.`;
    answer = `${residual}`;
    steps = [
      `First, find the predicted value:`,
      `ŷ = ${intercept} + ${slope}(${xValue}) = ${yPredicted}`,
      `Residual = Actual - Predicted`,
      `Residual = ${yActual} - ${yPredicted}`,
      `Residual = ${residual}`,
    ];
  } else {
    const context = slope > 0
      ? `For each 1-unit increase in x, y increases by ${Math.abs(slope)} units`
      : `For each 1-unit increase in x, y decreases by ${Math.abs(slope)} units`;
    prompt = `Given the regression equation ŷ = ${intercept} + ${slope}x\n\nInterpret the slope in context.`;
    answer = context;
    steps = [
      `The slope is ${slope}`,
      slope > 0 ? 'Since the slope is positive, there is a positive relationship' : 'Since the slope is negative, there is a negative relationship',
      `Interpretation: ${context}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'regression-correlation',
    prompt,
    correctAnswer: answer,
    roundingRule: 'Round to 2 decimal places',
    difficulty: 2,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export function generateTwoWayTableProblem(): Question {
  const rowLabels = ['Male', 'Female'];
  const colLabels = ['Yes', 'No'];
  const cells = [
    [randomInt(20, 80), randomInt(20, 80)],
    [randomInt(20, 80), randomInt(20, 80)],
  ];
  const rowTotals = cells.map(row => row.reduce((a, b) => a + b, 0));
  const colTotals = [cells[0][0] + cells[1][0], cells[0][1] + cells[1][1]];
  const grandTotal = rowTotals.reduce((a, b) => a + b, 0);

  const type = randomInt(1, 4);
  let prompt: string, answer: string, steps: string[];

  const tableStr = `
|        | Yes | No  | Total |
|--------|-----|-----|-------|
| Male   | ${cells[0][0]}  | ${cells[0][1]}  | ${rowTotals[0]}   |
| Female | ${cells[1][0]}  | ${cells[1][1]}  | ${rowTotals[1]}   |
| Total  | ${colTotals[0]}  | ${colTotals[1]}  | ${grandTotal}   |`;

  if (type === 1) {
    // Joint probability
    const targetRow = randomInt(0, 1);
    const targetCol = randomInt(0, 1);
    const prob = roundTo(cells[targetRow][targetCol] / grandTotal, 4);
    prompt = `${tableStr}\n\nFind P(${rowLabels[targetRow]} AND ${colLabels[targetCol]}).`;
    answer = `${prob}`;
    steps = [
      `Joint probability = count in cell / grand total`,
      `P(${rowLabels[targetRow]} AND ${colLabels[targetCol]}) = ${cells[targetRow][targetCol]} / ${grandTotal}`,
      `= ${prob}`,
    ];
  } else if (type === 2) {
    // Marginal probability
    const useRow = Math.random() > 0.5;
    const index = randomInt(0, 1);
    const prob = roundTo((useRow ? rowTotals[index] : colTotals[index]) / grandTotal, 4);
    const label = useRow ? rowLabels[index] : colLabels[index];
    prompt = `${tableStr}\n\nFind P(${label}).`;
    answer = `${prob}`;
    steps = [
      `Marginal probability = row or column total / grand total`,
      `P(${label}) = ${useRow ? rowTotals[index] : colTotals[index]} / ${grandTotal}`,
      `= ${prob}`,
    ];
  } else if (type === 3) {
    // Union
    const prob = roundTo((rowTotals[0] + colTotals[0] - cells[0][0]) / grandTotal, 4);
    prompt = `${tableStr}\n\nFind P(Male OR Yes).`;
    answer = `${prob}`;
    steps = [
      `P(A OR B) = P(A) + P(B) - P(A AND B)`,
      `P(Male) = ${rowTotals[0]} / ${grandTotal}`,
      `P(Yes) = ${colTotals[0]} / ${grandTotal}`,
      `P(Male AND Yes) = ${cells[0][0]} / ${grandTotal}`,
      `P(Male OR Yes) = (${rowTotals[0]} + ${colTotals[0]} - ${cells[0][0]}) / ${grandTotal}`,
      `= ${rowTotals[0] + colTotals[0] - cells[0][0]} / ${grandTotal}`,
      `= ${prob}`,
    ];
  } else {
    // Independent draws
    const k = randomInt(2, 4);
    const p = roundTo(colTotals[0] / grandTotal, 4);
    const allYes = roundTo(Math.pow(p, k), 4);
    const noneYes = roundTo(Math.pow(1 - p, k), 4);
    const atLeastOne = roundTo(1 - noneYes, 4);
    prompt = `${tableStr}\n\nIf ${k} people are randomly selected (with replacement), what is the probability that at least one says "Yes"?`;
    answer = `${atLeastOne}`;
    steps = [
      `P(Yes) for one person = ${colTotals[0]} / ${grandTotal} = ${p}`,
      `P(No) for one person = 1 - ${p} = ${roundTo(1 - p, 4)}`,
      `P(none say Yes) = (${roundTo(1 - p, 4)})^${k} = ${noneYes}`,
      `P(at least one Yes) = 1 - P(none say Yes)`,
      `= 1 - ${noneYes}`,
      `= ${atLeastOne}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'contingency-tables',
    prompt,
    correctAnswer: answer,
    roundingRule: 'Round to 4 decimal places',
    difficulty: 2,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export function generateExpectedValueProblem(): Question {
  const numOutcomes = randomInt(3, 5);
  const values = Array.from({ length: numOutcomes }, (_, i) => (i - 1) * randomInt(5, 20));

  // Generate probabilities that sum to 1
  let probs = Array.from({ length: numOutcomes }, () => Math.random());
  const sum = probs.reduce((a, b) => a + b, 0);
  probs = probs.map(p => roundTo(p / sum, 2));

  // Adjust last probability to ensure sum = 1
  probs[probs.length - 1] = roundTo(1 - probs.slice(0, -1).reduce((a, b) => a + b, 0), 2);

  const expectedValue = roundTo(
    values.reduce((sum, v, i) => sum + v * probs[i], 0),
    2
  );

  const tableStr = values.map((v, i) => `x = ${v}: P(x) = ${probs[i]}`).join('\n');

  return {
    id: generateId(),
    moduleTag: 'discrete-distributions',
    prompt: `A discrete random variable X has the following probability distribution:\n${tableStr}\n\nCalculate the expected value E(X).`,
    correctAnswer: `${expectedValue}`,
    roundingRule: 'Round to 2 decimal places',
    difficulty: 2,
    solutionSteps: [
      `E(X) = Σ x·P(x)`,
      ...values.map((v, i) => `${v} × ${probs[i]} = ${roundTo(v * probs[i], 4)}`),
      `E(X) = ${values.map((v, i) => roundTo(v * probs[i], 4)).join(' + ')}`,
      `E(X) = ${expectedValue}`,
    ],
    isGenerated: true,
  };
}

export function generateCasinoHouseEdgeProblem(): Question {
  const betAmount = randomInt(1, 5) * 10;
  const winProb = randomFloat(0.3, 0.48, 4);
  const winAmount = randomInt(1, 3) * betAmount;
  const loseAmount = betAmount;

  const expectedProfit = roundTo(winAmount * winProb - loseAmount * (1 - winProb), 2);
  const houseEdge = roundTo(-expectedProfit / betAmount * 100, 2);

  return {
    id: generateId(),
    moduleTag: 'expected-value-casino',
    prompt: `A casino game costs $${betAmount} to play. You have a ${roundTo(winProb * 100, 2)}% chance of winning $${winAmount} (profit) and a ${roundTo((1 - winProb) * 100, 2)}% chance of losing your $${loseAmount} bet.\n\nCalculate the expected profit per bet and the house edge.`,
    correctAnswer: `Expected profit: $${expectedProfit}, House edge: ${houseEdge}%`,
    roundingRule: 'Round to 2 decimal places',
    units: 'dollars and percent',
    difficulty: 2,
    solutionSteps: [
      `Expected profit = (Win amount × Win probability) - (Lose amount × Lose probability)`,
      `Win: $${winAmount} × ${winProb} = $${roundTo(winAmount * winProb, 4)}`,
      `Lose: $${loseAmount} × ${roundTo(1 - winProb, 4)} = $${roundTo(loseAmount * (1 - winProb), 4)}`,
      `Expected profit = $${roundTo(winAmount * winProb, 4)} - $${roundTo(loseAmount * (1 - winProb), 4)}`,
      `Expected profit = $${expectedProfit}`,
      `House edge = -Expected profit / Bet × 100%`,
      `House edge = -($${expectedProfit}) / $${betAmount} × 100%`,
      `House edge = ${houseEdge}%`,
      expectedProfit < 0 ? 'Since expected profit is negative, the house has the edge.' : 'Since expected profit is positive, the player has the edge (unusual!).',
    ],
    isGenerated: true,
  };
}

export function generateBinomialProblem(): Question {
  const n = randomInt(5, 20);
  const p = randomFloat(0.1, 0.8, 2);
  const q = roundTo(1 - p, 2);

  const type = randomInt(1, 4);
  let k: number, probability: number, prompt: string, answer: string, steps: string[];

  if (type === 1) {
    // P(X = k)
    k = randomInt(Math.floor(n * 0.2), Math.ceil(n * 0.8));
    probability = roundTo(binomialPMF(n, p, k), 4);
    prompt = `In a binomial distribution with n = ${n} trials and p = ${p} probability of success:\n\nCalculate P(X = ${k}).`;
    answer = `${probability}`;
    steps = [
      `Using the binomial formula: P(X = k) = C(n,k) × p^k × q^(n-k)`,
      `n = ${n}, k = ${k}, p = ${p}, q = ${q}`,
      `C(${n}, ${k}) = ${combinations(n, k)}`,
      `P(X = ${k}) = ${combinations(n, k)} × ${p}^${k} × ${q}^${n - k}`,
      `P(X = ${k}) = ${combinations(n, k)} × ${roundTo(Math.pow(p, k), 6)} × ${roundTo(Math.pow(q, n - k), 6)}`,
      `P(X = ${k}) = ${probability}`,
    ];
  } else if (type === 2) {
    // P(X >= k)
    k = randomInt(Math.floor(n * 0.5), Math.ceil(n * 0.8));
    probability = roundTo(1 - binomialCDF(n, p, k - 1), 4);
    prompt = `In a binomial distribution with n = ${n} trials and p = ${p} probability of success:\n\nCalculate P(X ≥ ${k}).`;
    answer = `${probability}`;
    steps = [
      `P(X ≥ ${k}) = 1 - P(X < ${k}) = 1 - P(X ≤ ${k - 1})`,
      `P(X ≤ ${k - 1}) = P(X = 0) + P(X = 1) + ... + P(X = ${k - 1})`,
      `P(X ≤ ${k - 1}) = ${roundTo(binomialCDF(n, p, k - 1), 4)}`,
      `P(X ≥ ${k}) = 1 - ${roundTo(binomialCDF(n, p, k - 1), 4)}`,
      `P(X ≥ ${k}) = ${probability}`,
    ];
  } else if (type === 3) {
    // Mean and standard deviation
    const mean = roundTo(n * p, 2);
    const stdDev = roundTo(Math.sqrt(n * p * q), 4);
    prompt = `In a binomial distribution with n = ${n} trials and p = ${p} probability of success:\n\nCalculate the mean (μ) and standard deviation (σ).`;
    answer = `μ = ${mean}, σ = ${stdDev}`;
    steps = [
      `Mean formula: μ = n × p`,
      `μ = ${n} × ${p} = ${mean}`,
      `Standard deviation formula: σ = √(n × p × q)`,
      `σ = √(${n} × ${p} × ${q})`,
      `σ = √(${roundTo(n * p * q, 4)})`,
      `σ = ${stdDev}`,
    ];
  } else {
    // P(a <= X <= b)
    const a = randomInt(Math.floor(n * 0.2), Math.floor(n * 0.4));
    const b = randomInt(Math.ceil(n * 0.5), Math.ceil(n * 0.7));
    probability = roundTo(binomialCDF(n, p, b) - binomialCDF(n, p, a - 1), 4);
    prompt = `In a binomial distribution with n = ${n} trials and p = ${p} probability of success:\n\nCalculate P(${a} ≤ X ≤ ${b}).`;
    answer = `${probability}`;
    steps = [
      `P(${a} ≤ X ≤ ${b}) = P(X ≤ ${b}) - P(X ≤ ${a - 1})`,
      `P(X ≤ ${b}) = ${roundTo(binomialCDF(n, p, b), 4)}`,
      `P(X ≤ ${a - 1}) = ${roundTo(binomialCDF(n, p, a - 1), 4)}`,
      `P(${a} ≤ X ≤ ${b}) = ${roundTo(binomialCDF(n, p, b), 4)} - ${roundTo(binomialCDF(n, p, a - 1), 4)}`,
      `P(${a} ≤ X ≤ ${b}) = ${probability}`,
    ];
  }

  return {
    id: generateId(),
    moduleTag: 'binomial',
    prompt,
    correctAnswer: answer,
    roundingRule: 'Round to 4 decimal places',
    difficulty: 2,
    solutionSteps: steps,
    isGenerated: true,
  };
}

export const generators: Record<string, () => Question> = {
  'frequency-tables': () => {
    const funcs = [generatePercentOfTotalProblem, generateHistogramBinProblem, generateFrequencyTableProblem];
    return funcs[randomInt(0, funcs.length - 1)]();
  },
  'quartiles-iqr': generateIQROutlierProblem,
  'normal-distribution': () => Math.random() > 0.5 ? generateZScoreProblem() : generateEmpiricalRuleProblem(),
  'regression-correlation': generateRegressionProblem,
  'contingency-tables': generateTwoWayTableProblem,
  'discrete-distributions': generateExpectedValueProblem,
  'expected-value-casino': generateCasinoHouseEdgeProblem,
  'binomial': generateBinomialProblem,
};

export function generateQuestion(moduleTag: string): Question | null {
  const generator = generators[moduleTag];
  if (!generator) return null;
  return generator();
}
