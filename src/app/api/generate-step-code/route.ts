import { NextRequest, NextResponse } from 'next/server';
import { generateStepCode } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { task, techStack } = body;

    if (!task) {
      return NextResponse.json(
        { success: false, error: 'Task is required' },
        { status: 400 }
      );
    }

    const code = await generateStepCode(task, techStack || 'Standard web stack');
    return NextResponse.json({ success: true, code });
  } catch (error: any) {
    console.error('API Error /api/generate-step-code:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate code' },
      { status: 500 }
    );
  }
}
