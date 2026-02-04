/**
 * Smart answer checker that handles various input formats
 */

// Normalize a string for comparison
function normalize(str: string): string {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')  // Normalize whitespace
    .replace(/,\s*/g, ', ') // Normalize comma spacing
    .replace(/:\s*/g, ': ') // Normalize colon spacing
    .replace(/\$/g, '')     // Remove dollar signs
    .replace(/%/g, '')      // Remove percent signs
    .replace(/^\+/, '');    // Remove leading plus
}

// Extract all numbers from a string
function extractNumbers(str: string): number[] {
  const matches = str.match(/-?\d+\.?\d*/g);
  return matches ? matches.map(Number) : [];
}

// Check if two numbers are approximately equal
function numbersApproxEqual(a: number, b: number, tolerance: number = 0.01): boolean {
  if (a === b) return true;
  if (a === 0 || b === 0) return Math.abs(a - b) < tolerance;
  return Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b)) < tolerance;
}

// Check if answer is a yes/no type
function isYesNo(answer: string): boolean {
  const normalized = normalize(answer);
  return ['yes', 'no', 'true', 'false'].includes(normalized);
}

// Common stop words to ignore when comparing sentences
const STOP_WORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare',
  'ought', 'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by',
  'from', 'as', 'into', 'through', 'during', 'before', 'after', 'above',
  'below', 'between', 'under', 'again', 'further', 'then', 'once', 'here',
  'there', 'when', 'where', 'why', 'how', 'all', 'each', 'few', 'more',
  'most', 'other', 'some', 'such', 'only', 'own', 'same', 'so', 'than',
  'too', 'very', 'just', 'and', 'but', 'if', 'or', 'because', 'until',
  'while', 'that', 'which', 'who', 'whom', 'this', 'these', 'those', 'am',
  'it', 'its', "it's", 'they', 'them', 'their', 'what', 'we', 'you', 'your'
]);

// Extract key words from a sentence (removing stop words)
function extractKeyWords(str: string): string[] {
  return normalize(str)
    .replace(/[.,!?;:'"()[\]{}]/g, ' ')  // Remove punctuation
    .split(/\s+/)
    .filter(word => word.length > 1 && !STOP_WORDS.has(word));
}

// Check if answer looks like a sentence (multiple words, not just numbers)
function isSentenceAnswer(answer: string): boolean {
  const words = answer.trim().split(/\s+/);
  const hasMultipleWords = words.length >= 3;
  const notJustNumbers = !/^[\d\s.,%-]+$/.test(answer);
  return hasMultipleWords && notJustNumbers;
}

// Calculate similarity between two sets of key words
function keyWordSimilarity(userWords: string[], correctWords: string[]): number {
  if (correctWords.length === 0) return 0;

  const matchedWords = correctWords.filter(word =>
    userWords.some(userWord =>
      userWord === word ||
      userWord.includes(word) ||
      word.includes(userWord) ||
      levenshteinDistance(userWord, word) <= 1  // Allow 1 typo
    )
  );

  return matchedWords.length / correctWords.length;
}

// Simple Levenshtein distance for typo tolerance
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Normalize yes/no answers
function normalizeYesNo(answer: string): string {
  const normalized = normalize(answer);
  if (['yes', 'true', 'correct', 'right'].includes(normalized)) return 'yes';
  if (['no', 'false', 'incorrect', 'wrong'].includes(normalized)) return 'no';
  return normalized;
}

/**
 * Check if user's answer matches the correct answer
 * Handles multiple formats and common variations
 */
export function checkAnswer(userAnswer: string, correctAnswer: string): boolean {
  // Empty check
  if (!userAnswer || !correctAnswer) return false;

  const userNorm = normalize(userAnswer);
  const correctNorm = normalize(correctAnswer);

  // Exact match after normalization
  if (userNorm === correctNorm) return true;

  // Yes/No answers
  if (isYesNo(correctAnswer)) {
    return normalizeYesNo(userAnswer) === normalizeYesNo(correctAnswer);
  }

  // Check if the correct answer contains the user's answer or vice versa
  // Useful for "Yes, unusual" matching "Yes"
  if (correctNorm.includes(userNorm) || userNorm.includes(correctNorm.split(',')[0])) {
    // Only if the key part matches
    const correctFirst = correctNorm.split(',')[0].trim();
    const userFirst = userNorm.split(',')[0].trim();
    if (correctFirst === userFirst) return true;
  }

  // Handle sentence-type answers with fuzzy matching
  if (isSentenceAnswer(correctAnswer)) {
    const userKeyWords = extractKeyWords(userAnswer);
    const correctKeyWords = extractKeyWords(correctAnswer);

    // Calculate similarity based on key words
    const similarity = keyWordSimilarity(userKeyWords, correctKeyWords);

    // Accept if user got at least 70% of key words correct
    if (similarity >= 0.7) return true;

    // Also check if all user's key words are in the correct answer
    // (user gave a shorter but correct answer)
    if (userKeyWords.length >= 2) {
      const reverseMatch = userKeyWords.every(word =>
        correctKeyWords.some(correctWord =>
          correctWord === word ||
          correctWord.includes(word) ||
          word.includes(correctWord)
        )
      );
      if (reverseMatch && userKeyWords.length >= correctKeyWords.length * 0.5) {
        return true;
      }
    }
  }

  // Extract numbers and compare
  const userNumbers = extractNumbers(userAnswer);
  const correctNumbers = extractNumbers(correctAnswer);

  // If it's primarily a numeric answer
  if (correctNumbers.length > 0 && userNumbers.length > 0) {
    // Single number comparison
    if (correctNumbers.length === 1 && userNumbers.length === 1) {
      if (numbersApproxEqual(userNumbers[0], correctNumbers[0])) {
        return true;
      }
    }

    // Multiple numbers - check if all match (in any order for some cases)
    if (correctNumbers.length === userNumbers.length) {
      const allMatch = correctNumbers.every(cn =>
        userNumbers.some(un => numbersApproxEqual(un, cn))
      );
      if (allMatch) return true;
    }

    // Check if user provided key numbers even if format differs
    // e.g., "Q1 = 16.5, Q2 = 25, Q3 = 33.5" vs "16.5, 25, 33.5"
    if (correctNumbers.every(cn =>
      userNumbers.some(un => numbersApproxEqual(un, cn))
    )) {
      return true;
    }
  }

  // Handle range answers like "65 to 71" vs "65-71" vs "65 - 71"
  const rangePattern1 = /(-?\d+\.?\d*)\s*(?:to|-)\s*(-?\d+\.?\d*)/i;
  const userRange = userAnswer.match(rangePattern1);
  const correctRange = correctAnswer.match(rangePattern1);
  if (userRange && correctRange) {
    if (numbersApproxEqual(parseFloat(userRange[1]), parseFloat(correctRange[1])) &&
        numbersApproxEqual(parseFloat(userRange[2]), parseFloat(correctRange[2]))) {
      return true;
    }
  }

  // Handle percentage answers
  const userPercent = userAnswer.match(/(-?\d+\.?\d*)\s*%?/);
  const correctPercent = correctAnswer.match(/(-?\d+\.?\d*)\s*%?/);
  if (userPercent && correctPercent && correctAnswer.includes('%')) {
    if (numbersApproxEqual(parseFloat(userPercent[1]), parseFloat(correctPercent[1]))) {
      return true;
    }
  }

  // Handle "No outliers" type answers
  if (correctNorm.includes('no outlier') && userNorm.includes('no outlier')) {
    return true;
  }
  if (correctNorm.includes('none') && userNorm.includes('none')) {
    return true;
  }

  // Handle z-score answers like "z = 2" vs "2"
  if (correctAnswer.toLowerCase().includes('z =') || correctAnswer.toLowerCase().includes('z=')) {
    const zMatch = correctAnswer.match(/z\s*=\s*(-?\d+\.?\d*)/i);
    if (zMatch && userNumbers.length === 1) {
      if (numbersApproxEqual(parseFloat(zMatch[1]), userNumbers[0])) {
        return true;
      }
    }
  }

  // Handle μ and σ answers
  const muMatch = correctAnswer.match(/[μu]\s*=\s*(-?\d+\.?\d*)/i);
  const sigmaMatch = correctAnswer.match(/[σs]\s*=\s*(-?\d+\.?\d*)/i);
  if ((muMatch || sigmaMatch) && userNumbers.length >= 1) {
    let matches = 0;
    if (muMatch && userNumbers.some(n => numbersApproxEqual(n, parseFloat(muMatch[1])))) matches++;
    if (sigmaMatch && userNumbers.some(n => numbersApproxEqual(n, parseFloat(sigmaMatch[1])))) matches++;
    if (matches > 0 && matches >= (muMatch ? 1 : 0) + (sigmaMatch ? 1 : 0)) return true;
  }

  // Handle Expected profit and house edge
  if (correctAnswer.toLowerCase().includes('expected') || correctAnswer.toLowerCase().includes('house edge')) {
    // Just check if numbers match
    if (correctNumbers.length > 0 && userNumbers.length > 0) {
      if (correctNumbers.every(cn => userNumbers.some(un => numbersApproxEqual(un, cn, 0.05)))) {
        return true;
      }
    }
  }

  // Fraction equivalence (e.g., "1/4" = "0.25")
  const fractionPattern = /(\d+)\s*\/\s*(\d+)/;
  const userFraction = userAnswer.match(fractionPattern);
  const correctFraction = correctAnswer.match(fractionPattern);

  if (correctFraction) {
    const correctValue = parseInt(correctFraction[1]) / parseInt(correctFraction[2]);
    if (userNumbers.length === 1 && numbersApproxEqual(userNumbers[0], correctValue)) {
      return true;
    }
    if (userFraction) {
      const userValue = parseInt(userFraction[1]) / parseInt(userFraction[2]);
      if (numbersApproxEqual(userValue, correctValue)) {
        return true;
      }
    }
  }

  if (userFraction && correctNumbers.length === 1) {
    const userValue = parseInt(userFraction[1]) / parseInt(userFraction[2]);
    if (numbersApproxEqual(userValue, correctNumbers[0])) {
      return true;
    }
  }

  return false;
}

/**
 * Format the correct answer for display
 */
export function formatCorrectAnswer(answer: string): string {
  return answer;
}
