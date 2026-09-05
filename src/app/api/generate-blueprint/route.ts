import { NextRequest, NextResponse } from 'next/server';
import { generateProjectBlueprint } from '@/lib/gemini';
import { ProjectIdea, StudentProfile } from '@/types/project';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const idea: ProjectIdea = body.idea;
    const profile: StudentProfile = body.profile || {
      skills: ['Python', 'Fullstack'],
      domain: 'AI Software',
      difficulty: 'Intermediate',
    };

    if (!idea || !idea.title) {
      return NextResponse.json(
        { success: false, error: 'Project idea object is required' },
        { status: 400 }
      );
    }

    const blueprint = await generateProjectBlueprint(idea, profile);
    return NextResponse.json({ success: true, blueprint });
  } catch (error: any) {
    console.error('API Error /api/generate-blueprint:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate blueprint' },
      { status: 500 }
    );
  }
}
