import { NextRequest, NextResponse } from 'next/server';
import { generateProjectIdeas } from '@/lib/gemini';
import { StudentProfile } from '@/types/project';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const profile: StudentProfile = {
      skills: Array.isArray(body.skills) ? body.skills : ['JavaScript', 'Python'],
      domain: body.domain || 'Artificial Intelligence',
      difficulty: body.difficulty || 'Intermediate',
      interests: body.interests || '',
    };

    const ideas = await generateProjectIdeas(profile);
    return NextResponse.json({ success: true, ideas });
  } catch (error: any) {
    console.error('API Error /api/generate-ideas:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}
