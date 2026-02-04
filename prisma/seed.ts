import { PrismaClient } from '@prisma/client';
import questionsData from '../src/data/questions.json';
import flashcardsData from '../src/data/flashcards.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.flashcardState.deleteMany();
  await prisma.questionAttempt.deleteMany();
  await prisma.moduleProgress.deleteMany();
  await prisma.examSession.deleteMany();
  await prisma.question.deleteMany();
  await prisma.flashcard.deleteMany();

  // Seed questions
  console.log('Seeding questions...');
  for (const q of questionsData as any[]) {
    await prisma.question.create({
      data: {
        id: q.id,
        moduleTag: q.moduleTag,
        prompt: q.prompt,
        choices: q.choices ? JSON.stringify(q.choices) : null,
        correctAnswer: q.correctAnswer,
        roundingRule: q.roundingRule || null,
        units: q.units || null,
        difficulty: q.difficulty,
        solutionSteps: JSON.stringify(q.solutionSteps),
        isGenerated: false,
      },
    });
  }
  console.log(`Seeded ${questionsData.length} questions`);

  // Seed flashcards
  console.log('Seeding flashcards...');
  for (const fc of flashcardsData) {
    await prisma.flashcard.create({
      data: {
        id: fc.id,
        moduleTag: fc.moduleTag,
        front: fc.front,
        back: fc.back,
        cardType: fc.cardType,
      },
    });
  }
  console.log(`Seeded ${flashcardsData.length} flashcards`);

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
