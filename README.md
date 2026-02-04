# MAT133 Drill - Statistics Study Guide

A comprehensive web application to help you ace your MAT 133 statistics midterm. Features targeted practice, spaced repetition flashcards, mock exams, and a binomial calculator.

## Features

- **Skills Map Dashboard**: Track your progress across 11 statistics modules
- **Targeted Practice**: Choose specific modules and difficulty levels
- **Smart Flashcards**: SM-2 spaced repetition algorithm for efficient memorization
- **Mock Exams**: 30-question timed exams with detailed analytics
- **Question Generators**: Unlimited dynamically-generated practice problems
- **StatCrunch Calculator**: Built-in binomial probability calculator with step-by-step solutions

## Modules Covered

1. Graphs & Data Displays
2. Distribution Shape
3. Frequency Tables & Grouped Data
4. Quartiles, IQR & Outliers
5. Normal Distribution
6. Regression & Correlation
7. Probability Basics
8. Contingency Tables
9. Discrete Probability Distributions
10. Expected Value & House Edge
11. Binomial Distribution

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Prisma + SQLite
- **Authentication**: JWT-based local auth

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone or navigate to the project**:
   ```bash
   cd mat133-drill
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Seed the database with questions and flashcards**:
   ```bash
   npm run db:seed
   ```

5. **Start the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser** to [http://localhost:3000](http://localhost:3000)

### First Time Setup

1. Go to [http://localhost:3000](http://localhost:3000)
2. Click "Create Account" to register
3. Start practicing!

## Project Structure

```
mat133-drill/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── src/
│   ├── app/
│   │   ├── (auth)/        # Login/register pages
│   │   ├── (dashboard)/   # Protected pages
│   │   └── api/           # API routes
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   ├── practice/      # Practice components
│   │   └── ...
│   ├── data/
│   │   ├── questions.json # Seed questions
│   │   └── flashcards.json# Seed flashcards
│   ├── lib/
│   │   ├── auth.ts        # Authentication utilities
│   │   ├── generators/    # Question generators
│   │   ├── prisma.ts      # Prisma client
│   │   ├── sm2.ts         # Spaced repetition algorithm
│   │   └── utils.ts       # Utility functions
│   └── types/
│       └── index.ts       # TypeScript types
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema to database
- `npm run db:seed` - Seed database with questions/flashcards
- `npm run db:studio` - Open Prisma Studio

## Question Generators

The app includes generators for dynamically creating new questions:

- Percent of total problems
- Histogram bin counting
- Frequency tables (relative + cumulative)
- IQR/fence/outlier problems
- Z-score + empirical rule
- Regression prediction + residual
- Two-way table probability
- Discrete expected value
- Casino house edge
- Binomial probability

Each generated problem includes:
- Random but realistic values
- Auto-calculated correct answer
- Step-by-step solution

## Flashcard System (SM-2)

The flashcard system uses the SM-2 spaced repetition algorithm:

- **Quality 0-2**: Card is reset (review again soon)
- **Quality 3-5**: Card advances (longer intervals)

Cards you struggle with appear more frequently, while mastered cards appear less often.

## API Routes

- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `POST /api/auth/logout` - Sign out
- `GET /api/auth/me` - Get current user
- `GET /api/questions` - Get questions by module
- `POST /api/questions/generate` - Generate new questions
- `GET/POST /api/progress` - Track progress
- `GET/POST /api/flashcards` - Manage flashcard states
- `GET/POST /api/exam` - Create and submit exams

## Contributing

Feel free to add more questions to `src/data/questions.json` or flashcards to `src/data/flashcards.json`, then run `npm run db:seed` to update the database.

## License

MIT
