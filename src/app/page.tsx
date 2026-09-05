'use client';

import React, { useState, useRef } from 'react';
import { Header } from '@/components/Header';
import { ProfileForm } from '@/components/ProfileForm';
import { IdeaCard } from '@/components/IdeaCard';
import { BlueprintView } from '@/components/BlueprintView';
import { StudentProfile, ProjectIdea, ProjectBlueprint } from '@/types/project';
import { PRESET_PROFILES, MOCK_IDEAS, MOCK_BLUEPRINTS } from '@/lib/mockData';

export default function Home() {
  const [profile, setProfile] = useState<StudentProfile>({
    skills: ['Python', 'FastAPI', 'React', 'Tailwind CSS'],
    domain: 'Healthcare & Medical Tech',
    difficulty: 'Intermediate',
    interests: 'Automating clinical triage notes and anomaly detection from medical imaging scans',
  });

  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(null);
  const [blueprint, setBlueprint] = useState<ProjectBlueprint | null>(null);
  const [isLoadingIdeas, setIsLoadingIdeas] = useState(false);
  const [isLoadingBlueprint, setIsLoadingBlueprint] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const ideasRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);

  const handleLoadPreset = (index: number) => {
    const preset = PRESET_PROFILES[index];
    if (!preset) return;
    setProfile({
      skills: [...preset.skills],
      domain: preset.domain,
      difficulty: preset.difficulty,
      interests: preset.interests,
    });
    setSelectedIdea(null);
    setBlueprint(null);
  };

  const handleGenerateIdeas = async () => {
    setIsLoadingIdeas(true);
    setErrorMsg(null);
    setSelectedIdea(null);
    setBlueprint(null);

    try {
      const res = await fetch('/api/generate-ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      const data = await res.json();
      if (data.success && data.ideas && data.ideas.length > 0) {
        setIdeas(data.ideas);
        setTimeout(() => {
          ideasRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        setIdeas(MOCK_IDEAS);
      }
    } catch (err) {
      console.error('Failed to generate ideas:', err);
      setIdeas(MOCK_IDEAS);
    } finally {
      setIsLoadingIdeas(false);
    }
  };

  const handleSelectIdea = async (idea: ProjectIdea) => {
    setSelectedIdea(idea);
    setIsLoadingBlueprint(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, profile }),
      });

      const data = await res.json();
      if (data.success && data.blueprint) {
        setBlueprint(data.blueprint);
        setTimeout(() => {
          blueprintRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      } else if (MOCK_BLUEPRINTS[idea.id]) {
        setBlueprint(MOCK_BLUEPRINTS[idea.id]);
        setTimeout(() => {
          blueprintRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    } catch (err) {
      console.error('Failed to generate blueprint:', err);
      if (MOCK_BLUEPRINTS[idea.id]) {
        setBlueprint(MOCK_BLUEPRINTS[idea.id]);
      }
    } finally {
      setIsLoadingBlueprint(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 font-sans flex flex-col">
      <Header onLoadPreset={handleLoadPreset} isGenerating={isLoadingIdeas || isLoadingBlueprint} />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-16 space-y-16">
        <section className="max-w-2xl space-y-4">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-zinc-900">
            Project Architect.
          </h2>
          <p className="text-lg text-zinc-500">
            Input your stack. Generate a complete final-year project roadmap in seconds.
          </p>
        </section>

        <section>
          <ProfileForm
            profile={profile}
            onChange={setProfile}
            onSubmit={handleGenerateIdeas}
            isLoading={isLoadingIdeas}
          />
        </section>

        {ideas.length > 0 && (
          <section ref={ideasRef} className="space-y-8 pt-8 border-t border-zinc-200">
            <div>
              <h3 className="text-2xl font-medium tracking-tight text-zinc-900">
                Project Concepts
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ideas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  isSelected={selectedIdea?.id === idea.id}
                  onSelect={handleSelectIdea}
                  isLoadingBlueprint={isLoadingBlueprint}
                />
              ))}
            </div>
          </section>
        )}

        {blueprint && (
          <section ref={blueprintRef} className="pt-8 border-t border-zinc-200">
            <div className="mb-8">
              <h3 className="text-2xl font-medium tracking-tight text-zinc-900">
                Execution Blueprint
              </h3>
            </div>
            <BlueprintView blueprint={blueprint} />
          </section>
        )}
      </main>

      <footer className="border-t border-zinc-200 bg-white py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-400">
          <p>© 2026 CapstonePilot</p>
        </div>
      </footer>
    </div>
  );
}
