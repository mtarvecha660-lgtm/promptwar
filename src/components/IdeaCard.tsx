'use client';

import React from 'react';
import { ProjectIdea } from '@/types/project';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface IdeaCardProps {
  idea: ProjectIdea;
  isSelected: boolean;
  onSelect: (idea: ProjectIdea) => void;
  isLoadingBlueprint: boolean;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({
  idea,
  isSelected,
  onSelect,
  isLoadingBlueprint,
}) => {
  return (
    <div
      className={`border transition-colors flex flex-col justify-between bg-white ${
        isSelected
          ? 'border-zinc-900 ring-1 ring-zinc-900'
          : 'border-zinc-200 hover:border-zinc-300'
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-medium text-zinc-500 bg-zinc-50 px-2 py-1 border border-zinc-200">
            {idea.complexity} • {idea.estimatedWeeks} Wks
          </span>
          <span className="text-xs font-medium text-zinc-900 bg-zinc-100 px-2 py-1 border border-zinc-200">
            {idea.feasibilityScore}/10
          </span>
        </div>

        <h3 className="text-lg font-medium text-zinc-900 leading-snug mb-1">{idea.title}</h3>
        <p className="text-sm text-zinc-500 mb-5">{idea.tagline}</p>

        <div className="mb-5">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Problem</p>
          <p className="text-sm text-zinc-700 leading-relaxed">{idea.problemStatement}</p>
        </div>

        <div className="mb-5 p-4 bg-zinc-50 border border-zinc-200">
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Innovation</p>
          <p className="text-sm text-zinc-900 leading-relaxed">{idea.innovationHook}</p>
        </div>

        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">Stack</p>
          <div className="flex flex-wrap gap-2">
            {idea.primaryTech.map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="text-xs font-medium bg-zinc-100 text-zinc-700 px-2 py-1 border border-zinc-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-200 bg-zinc-50 mt-auto">
        <button
          type="button"
          disabled={isLoadingBlueprint}
          onClick={() => onSelect(idea)}
          className={`w-full py-2.5 px-4 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
            isSelected
              ? 'bg-black text-white'
              : 'bg-white text-zinc-900 border border-zinc-200 hover:bg-zinc-100'
          }`}
        >
          {isLoadingBlueprint && isSelected ? (
            <>
              <div className="w-4 h-4 border-2 border-zinc-500 border-t-white rounded-full animate-spin" />
              <span>Generating...</span>
            </>
          ) : isSelected ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              <span>Blueprint Active</span>
            </>
          ) : (
            <>
              <span>Generate Blueprint</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
