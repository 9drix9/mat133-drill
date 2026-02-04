import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAT133 Drill - Statistics Study Guide",
  description: "Master statistics for your MAT 133 midterm with practice problems, flashcards, and mock exams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
          {children}
        </main>
      </body>
    </html>
  );
}
