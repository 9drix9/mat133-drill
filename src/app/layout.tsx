import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PWANavigation } from "@/components/pwa-navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MAT133 Drill - Statistics Study Guide",
  description: "Master statistics for your MAT 133 midterm with practice problems, flashcards, and mock exams",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MAT133 Drill",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <PWANavigation />
          <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
