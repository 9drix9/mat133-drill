/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Quality ratings:
 * 0 - Complete blackout, no recall
 * 1 - Incorrect, but upon seeing correct answer remembered
 * 2 - Incorrect, but correct answer seemed easy to recall
 * 3 - Correct with serious difficulty
 * 4 - Correct with hesitation
 * 5 - Perfect response
 */

export interface SM2State {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface SM2Result extends SM2State {
  nextReviewDate: Date;
}

export function calculateSM2(
  quality: number, // 0-5
  previousState: SM2State
): SM2Result {
  let { easeFactor, interval, repetitions } = previousState;

  // Clamp quality to 0-5
  quality = Math.max(0, Math.min(5, Math.round(quality)));

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  } else {
    // Incorrect response - reset
    repetitions = 0;
    interval = 1;
  }

  // Update ease factor
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));

  // Ease factor must be at least 1.3
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    easeFactor: Math.round(easeFactor * 100) / 100,
    interval,
    repetitions,
    nextReviewDate,
  };
}

export function getQualityDescription(quality: number): string {
  switch (quality) {
    case 0:
      return 'Complete blackout';
    case 1:
      return "Didn't know, but recognized when shown";
    case 2:
      return "Didn't know, but it was on the tip of my tongue";
    case 3:
      return 'Correct, but with difficulty';
    case 4:
      return 'Correct, after some thought';
    case 5:
      return 'Perfect recall';
    default:
      return 'Unknown';
  }
}

export function getNextReviewText(interval: number): string {
  if (interval === 1) return 'Tomorrow';
  if (interval < 7) return `In ${interval} days`;
  if (interval < 30) return `In ${Math.round(interval / 7)} week(s)`;
  if (interval < 365) return `In ${Math.round(interval / 30)} month(s)`;
  return `In ${Math.round(interval / 365)} year(s)`;
}
