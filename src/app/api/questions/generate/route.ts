import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { generateQuestion, generators } from "@/lib/generators";

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { moduleTag, count = 1 } = await request.json();

    if (!moduleTag) {
      return NextResponse.json(
        { error: "Module tag is required" },
        { status: 400 }
      );
    }

    // Check if generator exists for this module
    if (!generators[moduleTag]) {
      return NextResponse.json(
        { error: "No generator available for this module" },
        { status: 400 }
      );
    }

    // Validate count (1-50)
    const validCount = Math.min(Math.max(Number(count) || 1, 1), 50);

    const questions = [];
    for (let i = 0; i < validCount; i++) {
      const question = generateQuestion(moduleTag);
      if (question) {
        questions.push(question);
      }
    }

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Generate questions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return list of modules with generators
  const availableGenerators = Object.keys(generators);
  return NextResponse.json({ availableGenerators });
}
