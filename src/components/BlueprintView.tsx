'use client';

import React, { useState } from 'react';
import { ProjectBlueprint } from '@/types/project';
import { Download, Copy, Check, Printer } from 'lucide-react';
import { RoadmapSection } from '@/components/RoadmapSection';

interface BlueprintViewProps {
  blueprint: ProjectBlueprint;
}

export const BlueprintView: React.FC<BlueprintViewProps> = ({ blueprint }) => {
  const [activeTab, setActiveTab] = useState<'features' | 'tech' | 'roadmap' | 'viva' | 'improvements' | 'audit'>('features');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    return `# ${blueprint.title}
*${blueprint.tagline}*

## Executive Summary
${blueprint.executiveSummary}

## Core Features
### MVP Features (Essential)
${blueprint.coreFeatures.mvp.map((f) => `- [x] ${f}`).join('\n')}

### Stretch / Future Scope Features
${blueprint.coreFeatures.stretch.map((f) => `- [ ] ${f}`).join('\n')}

## Recommended Tech Stack & Rationale
${blueprint.techStack
  .map((t) => `### ${t.category}: ${t.tech}\n**Justification:** ${t.reason}\n`)
  .join('\n')}

## 4-Phase Sprint Roadmap
${blueprint.roadmap
  .map(
    (r) =>
      `### ${r.phase} (${r.duration})\n**Tasks:**\n${r.tasks
        .map((task) => `- ${task}`)
        .join('\n')}\n**Deliverable:** ${r.deliverable}\n`
  )
  .join('\n')}

## Academic Viva & Defense Strategy
${blueprint.vivaQuestions
  .map(
    (v, i) =>
      `### Q${i + 1}: ${v.question}\n**Strong Answer:** ${v.answerHook}\n**Examiner Trap:** ${v.examinerTrap}\n`
  )
  .join('\n')}

## Suggested Improvements & Future Scope
${blueprint.improvements.map((imp) => `- ${imp}`).join('\n')}

## Project Readiness Audit
- Problem Statement Alignment: ${blueprint.signals?.psAlignment?.score ?? 'N/A'}/100 (${blueprint.signals?.psAlignment?.note ?? ''})
- Google Tech Integration: ${blueprint.signals?.googleTech?.score ?? 'N/A'}/100 (${blueprint.signals?.googleTech?.note ?? ''})
  - Recommended Services: ${blueprint.signals?.googleTech?.recommendedServices?.join(', ') ?? 'None'}
- Security: ${blueprint.signals?.security?.score ?? 'N/A'}/100 (${blueprint.signals?.security?.note ?? ''})
- Efficiency: ${blueprint.signals?.efficiency?.score ?? 'N/A'}/100 (${blueprint.signals?.efficiency?.note ?? ''})
- Testing: ${blueprint.signals?.testing?.score ?? 'N/A'}/100 (${blueprint.signals?.testing?.note ?? ''})
- Accessibility: ${blueprint.signals?.accessibility?.score ?? 'N/A'}/100 (${blueprint.signals?.accessibility?.note ?? ''})
- Code Quality: ${blueprint.signals?.codeQuality?.score ?? 'N/A'}/100 (${blueprint.signals?.codeQuality?.note ?? ''})
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateMarkdown()], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${blueprint.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-synopsis.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white border border-zinc-200">
      <div className="p-8 bg-zinc-900 text-white">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-medium tracking-tight mb-2">{blueprint.title}</h2>
            <p className="text-zinc-400">{blueprint.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-white text-zinc-900 hover:bg-zinc-100 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">Executive Summary</p>
          <p className="text-sm text-zinc-300 leading-relaxed">{blueprint.executiveSummary}</p>
        </div>
      </div>

      <div className="border-b border-zinc-200 bg-zinc-50 px-6 flex gap-4 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('features')}
          className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'features'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Features
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tech')}
          className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'tech'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Tech Stack
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('roadmap')}
          className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'roadmap'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Roadmap
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('viva')}
          className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'viva'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Defense Strategy
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('improvements')}
          className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'improvements'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Future Scope
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            activeTab === 'audit'
              ? 'border-zinc-900 text-zinc-900'
              : 'border-transparent text-zinc-500 hover:text-zinc-900'
          }`}
        >
          Readiness Audit
        </button>
      </div>

      <div className="p-8">
        {activeTab === 'features' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-sm font-medium text-zinc-900 mb-4 uppercase tracking-wider">
                MVP Requirements
              </h4>
              <ul className="space-y-3">
                {blueprint.coreFeatures.mvp.map((item, idx) => (
                  <li key={idx} className="text-sm text-zinc-700 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-zinc-900 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-zinc-400 mb-4 uppercase tracking-wider">
                Stretch Goals
              </h4>
              <ul className="space-y-3">
                {blueprint.coreFeatures.stretch.map((item, idx) => (
                  <li key={idx} className="text-sm text-zinc-500 flex items-start gap-3">
                    <span className="w-1.5 h-1.5 border border-zinc-400 mt-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'tech' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blueprint.techStack.map((tech, idx) => (
              <div key={idx} className="p-5 border border-zinc-200 bg-zinc-50">
                <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 block">
                  {tech.category}
                </span>
                <h4 className="text-base font-medium text-zinc-900 mb-3">{tech.tech}</h4>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {tech.reason}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            {/* Load and manage progress state */}
            <RoadmapSection blueprint={blueprint} />
          </div>
        )}

        {activeTab === 'viva' && (
          <div className="space-y-6">
            {blueprint.vivaQuestions.map((viva, idx) => (
              <div key={idx} className="p-6 border border-zinc-200 bg-white">
                <h4 className="text-base font-medium text-zinc-900 mb-4 pb-4 border-b border-zinc-100">
                  {idx + 1}. {viva.question}
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-zinc-50 border border-zinc-200">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider block mb-2">
                      Strong Response
                    </span>
                    <p className="text-sm text-zinc-900">{viva.answerHook}</p>
                  </div>
                  <div className="p-4 bg-white border border-zinc-200">
                    <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider block mb-2">
                      Examiner Trap
                    </span>
                    <p className="text-sm text-zinc-600">{viva.examinerTrap}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'improvements' && (
          <div className="space-y-4">
            {blueprint.improvements.map((imp, idx) => (
              <div key={idx} className="p-5 border border-zinc-200 bg-zinc-50 flex items-start gap-4">
                <span className="text-sm font-medium text-zinc-400 w-4">{idx + 1}.</span>
                <p className="text-sm text-zinc-900 leading-relaxed">{imp}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Problem Statement Alignment', data: blueprint.signals?.psAlignment },
                { label: 'Security & Auth', data: blueprint.signals?.security },
                { label: 'Efficiency & Perf', data: blueprint.signals?.efficiency },
                { label: 'Testability', data: blueprint.signals?.testing },
                { label: 'Accessibility', data: blueprint.signals?.accessibility },
                { label: 'Code Quality', data: blueprint.signals?.codeQuality },
              ].map((signal, idx) => (
                <div key={idx} className="p-5 border border-zinc-200 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">{signal.label}</span>
                    <span className="text-sm font-medium text-zinc-900 bg-zinc-100 px-2 py-1 border border-zinc-200">
                      {signal.data?.score ?? 'N/A'}/100
                    </span>
                  </div>
                  <p className="text-sm text-zinc-700 leading-relaxed">{signal.data?.note ?? 'No data provided.'}</p>
                </div>
              ))}
              
              {/* Google Tech Special Card */}
              <div className="p-5 border border-zinc-900 bg-zinc-50 md:col-span-2">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-zinc-900 uppercase tracking-wider">Google Tech Integration</span>
                  <span className="text-sm font-medium text-white bg-zinc-900 px-2 py-1 border border-zinc-900">
                    {blueprint.signals?.googleTech?.score ?? 'N/A'}/100
                  </span>
                </div>
                <p className="text-sm text-zinc-800 leading-relaxed mb-4">
                  {blueprint.signals?.googleTech?.note ?? 'No data provided.'}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs font-medium text-zinc-500 py-1 mr-2">Recommended Services:</span>
                  {(blueprint.signals?.googleTech?.recommendedServices || []).map(service => (
                    <span key={service} className="text-xs font-medium bg-zinc-200 text-zinc-900 px-2 py-1">
                      {service}
                    </span>
                  ))}
                  {(!blueprint.signals?.googleTech?.recommendedServices || blueprint.signals.googleTech.recommendedServices.length === 0) && (
                    <span className="text-xs text-zinc-500 py-1">None specified.</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
