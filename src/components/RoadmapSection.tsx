import React, { useState, useEffect } from 'react';
import { ProjectBlueprint } from '@/types/project';
import ReactMarkdown from 'react-markdown';

interface RoadmapSectionProps {
  blueprint: ProjectBlueprint;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({ blueprint }) => {
  // Unique key for storage per blueprint (fallback to title)
  const storageKey = `roadmap-progress-${blueprint.title}`;

  // Set of completed task identifiers "stageIdx-taskIdx"
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [openSteps, setOpenSteps] = useState<Set<string>>(new Set());
  const [loadingTask, setLoadingTask] = useState<string | null>(null);
  const [taskCode, setTaskCode] = useState<Record<string, string>>({});

  // Load persisted progress on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const arr: string[] = JSON.parse(saved);
        setCompleted(new Set(arr));
      } catch (_) {}
    }
  }, [storageKey]);

  // Persist whenever completed changes
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(completed)));
  }, [completed, storageKey]);

  const totalTasks = blueprint.roadmap.reduce((sum, s) => sum + s.tasks.length, 0);
  const completedCount = completed.size;
  const progressPercent = totalTasks === 0 ? 0 : Math.round((completedCount / totalTasks) * 100);

  const toggleTask = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const fetchStepCode = async (stageIdx: number, taskIdx: number, task: string) => {
    const taskId = `${stageIdx}-${taskIdx}`;
    setLoadingTask(taskId);
    try {
      const techStack = blueprint.techStack.map((t) => t.tech).join(', ');
      const res = await fetch('/api/generate-step-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, techStack }),
      });
      const data = await res.json();
      if (data.success && data.code) {
        setTaskCode((prev) => ({ ...prev, [taskId]: data.code }));
      } else {
        setTaskCode((prev) => ({ ...prev, [taskId]: 'Failed to generate code.' }));
      }
    } catch (e) {
      setTaskCode((prev) => ({ ...prev, [taskId]: 'Error contacting AI service.' }));
    } finally {
      setLoadingTask(null);
    }
  };

  const toggleCode = (stageIdx: number, taskIdx: number, task: string) => {
    const id = `${stageIdx}-${taskIdx}`;
    const currentlyOpen = openSteps.has(id);
    if (!currentlyOpen && !taskCode[id]) {
      // fetch code if not yet fetched
      fetchStepCode(stageIdx, taskIdx, task);
    }
    setOpenSteps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center gap-2 text-sm text-zinc-600 mb-4">
        <span>Progress: {progressPercent}% Complete</span>
        <div className="flex-1 h-2 bg-zinc-200 rounded">
          <div
            className="h-2 bg-zinc-900 rounded"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Roadmap Stages */}
      {blueprint.roadmap.map((stage, stageIdx) => (
        <div key={stageIdx} className="p-6 border border-zinc-200 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-zinc-100">
            <h4 className="text-base font-medium text-zinc-900">{stage.phase}</h4>
            <span className="text-xs font-medium text-zinc-500 bg-zinc-100 px-3 py-1 border border-zinc-200">
              {stage.duration}
            </span>
          </div>

          <div className="space-y-3 mb-5">
            {stage.tasks.map((task, taskIdx) => {
              const id = `${stageIdx}-${taskIdx}`;
              const isDone = completed.has(id);
              return (
                <div key={id} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={isDone}
                    onChange={() => toggleTask(id)}
                    className="mt-1 h-4 w-4 text-black border-zinc-300 rounded"
                  />
                  <span className="text-sm text-zinc-700 flex-1">{task}</span>
                  <button
                      type="button"
                      onClick={() => toggleCode(stageIdx, taskIdx, task)}
                      className="text-xs font-medium text-zinc-900 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 px-2 py-1"
                    >
                      {openSteps.has(`${stageIdx}-${taskIdx}`) ? 'Hide Code' : '⚡ Get Implementation Code'}
                    </button>
                </div>
              );
            })}
          </div>

          <div className="text-sm text-zinc-900 bg-zinc-50 p-3 border border-zinc-200">
            <span className="font-medium text-zinc-500 mr-2">Deliverable:</span>
            {stage.deliverable}
          </div>

          {/* Render fetched code snippets below the stage */}
          {Array.from(openSteps)
            .filter((id) => id.startsWith(`${stageIdx}-`))
            .map((id) => {
              const code = taskCode[id];
              return (
                <div
                  key={id}
                  className="bg-zinc-950 border border-zinc-800 text-zinc-100 p-4 rounded-md mt-3 max-h-80 overflow-y-auto whitespace-pre-wrap font-mono text-sm"
                >
                  {loadingTask === id ? 'Loading…' : code ? (
                    <ReactMarkdown>{code}</ReactMarkdown>
                  ) : (
                    'No code available.'
                  )}
                </div>
              );
            })}
        </div>
      ))}
    </div>
  );
};
