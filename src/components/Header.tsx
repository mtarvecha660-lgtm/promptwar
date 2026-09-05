'use client';

import React from 'react';
import { GraduationCap } from 'lucide-react';
// ThemeToggle removed

interface HeaderProps {
  onLoadPreset: (index: number) => void;
  isGenerating: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onLoadPreset, isGenerating }) => {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center text-zinc-900">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h1 className="text-lg font-medium text-zinc-900 tracking-tight">CapstonePilot</h1>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
          <div className="flex gap-2">
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => onLoadPreset(0)}
              className="text-xs px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200 transition-colors disabled:opacity-50"
            >
              Healthcare AI
            </button>
            <button
              type="button"
              disabled={isGenerating}
              onClick={() => onLoadPreset(1)}
              className="text-xs px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200 transition-colors disabled:opacity-50"
            >
              Smart Campus IoT
            </button>
          </div>
          <div className="w-px h-5 bg-zinc-200 hidden sm:block" />
        </div>
      </div>
    </header>
  );
};
