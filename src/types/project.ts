export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentProfile {
  skills: string[];
  domain: string;
  difficulty: DifficultyLevel;
  interests?: string;
}

export interface ProjectIdea {
  id: string;
  title: string;
  tagline: string;
  problemStatement: string;
  innovationHook: string;
  complexity: DifficultyLevel;
  feasibilityScore: number; // 1 to 10
  primaryTech: string[];
  estimatedWeeks: number;
}

export interface TechStackItem {
  category: string;
  tech: string;
  reason: string;
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
  deliverable: string;
}

export interface VivaQuestion {
  question: string;
  answerHook: string;
  examinerTrap: string;
}

export interface SignalBase {
  score: number;
  note: string;
}

export interface GoogleTechSignal extends SignalBase {
  recommendedServices: string[];
}

export interface ProjectSignals {
  psAlignment: SignalBase;
  googleTech: GoogleTechSignal;
  security: SignalBase;
  efficiency: SignalBase;
  testing: SignalBase;
  accessibility: SignalBase;
  codeQuality: SignalBase;
}

export interface ProjectBlueprint {
  ideaId: string;
  title: string;
  tagline: string;
  executiveSummary: string;
  coreFeatures: {
    mvp: string[];
    stretch: string[];
  };
  techStack: TechStackItem[];
  roadmap: RoadmapPhase[];
  vivaQuestions: VivaQuestion[];
  improvements: string[];
  signals: ProjectSignals;
}
