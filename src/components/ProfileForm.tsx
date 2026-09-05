'use client';

import React, { useState } from 'react';
import { StudentProfile, DifficultyLevel } from '@/types/project';
import { X, Plus, Cpu, Clock, Layers } from 'lucide-react';

const COMMON_SKILLS = [
  'Python',
  'React',
  'Next.js',
  'TypeScript',
  'FastAPI',
  'Node.js',
  'OpenCV',
  'TensorFlow',
  'PostgreSQL',
  'Solidity',
  'IoT/ESP32',
  'Tailwind CSS',
  'Docker',
  'Flutter',
];

const DOMAINS = [
  'Healthcare & Medical Tech',
  'Smart Campus & Education',
  'Blockchain & Cyber Security',
  'FinTech & Fraud Detection',
  'AgriTech & Climate Monitoring',
  'Autonomous Systems & Robotics',
  'E-Commerce & Supply Chain',
];

interface ProfileFormProps {
  profile: StudentProfile;
  onChange: (profile: StudentProfile) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onChange,
  onSubmit,
  isLoading,
}) => {
  const [skillInput, setSkillInput] = useState('');

  const addSkill = (skillName: string) => {
    const trimmed = skillName.trim();
    if (trimmed && !profile.skills.includes(trimmed)) {
      onChange({
        ...profile,
        skills: [...profile.skills, trimmed],
      });
    }
    setSkillInput('');
  };

  const removeSkill = (skillToRemove: string) => {
    onChange({
      ...profile,
      skills: profile.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(skillInput);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-8"
      >
        {/* Skills Selector */}
        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-3 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> Technologies & Skills
          </label>
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-2 text-sm bg-zinc-100 text-zinc-900 border border-zinc-200 px-3 py-1.5"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="hover:text-zinc-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add skill..."
              className="flex-1 text-sm px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 transition-all"
            />
            <button
              type="button"
              onClick={() => addSkill(skillInput)}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-medium text-sm flex items-center gap-1 transition-colors border border-zinc-200"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>Suggestions:</span>
            {COMMON_SKILLS.filter((s) => !profile.skills.includes(s)).slice(0, 6).map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="text-zinc-500 hover:text-zinc-900 transition-colors"
              >
                +{skill}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Domain */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> Target Domain
            </label>
            <select
              value={profile.domain}
              onChange={(e) => onChange({ ...profile, domain: e.target.value })}
              className="w-full text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-zinc-900 transition-all dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
            >
              {DOMAINS.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>
          </div>

          {/* Target Difficulty */}
          <div>
            <label className="block text-xs font-medium text-zinc-500 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Scope
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as DifficultyLevel[]).map((level) => {
                const isSelected = profile.difficulty === level;
                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => onChange({ ...profile, difficulty: level })}
                    className={`py-2 px-2 text-sm font-medium border transition-colors ${
                      isSelected
                        ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-950 dark:border-zinc-800 dark:hover:bg-zinc-200'
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-3">
            Additional Notes
          </label>
          <textarea
            rows={2}
            value={profile.interests || ''}
            onChange={(e) => onChange({ ...profile, interests: e.target.value })}
            placeholder="Any specific constraints or ideas..."
            className="w-full text-sm px-4 py-2.5 bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 text-zinc-900 placeholder-zinc-400 transition-all resize-none dark:bg-zinc-800 dark:text-white dark:border-zinc-700"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading || profile.skills.length === 0}
            className="w-full py-3.5 px-6 bg-black text-white font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <span>Generate Ideas</span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
