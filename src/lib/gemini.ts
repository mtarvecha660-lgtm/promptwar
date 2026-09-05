import { GoogleGenAI } from '@google/genai';
import { StudentProfile, ProjectIdea, ProjectBlueprint } from '@/types/project';
import { MOCK_IDEAS, MOCK_BLUEPRINTS } from './mockData';

const apiKey = process.env.GEMINI_API_KEY || '';

export async function generateProjectIdeas(profile: StudentProfile): Promise<ProjectIdea[]> {
  if (!apiKey) {
    console.log('[Gemini API] No GEMINI_API_KEY detected. Using dynamic fallback generator.');
    return generateFallbackIdeas(profile);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are an elite University Capstone Project Advisor & AI Architect.
A final-year engineering student needs 3 distinct, high-impact, realistic project ideas.

Student Profile:
- Skills: ${profile.skills.join(', ')}
- Domain Interest: ${profile.domain}
- Target Complexity: ${profile.difficulty}
- Specific Interests / Notes: ${profile.interests || 'None specified'}

Output exactly 3 distinct project ideas in valid JSON with this schema:
[
  {
    "id": "slug-id",
    "title": "Clear catchy title",
    "tagline": "One-line punchy subtitle",
    "problemStatement": "Clear 2-sentence real-world problem statement",
    "innovationHook": "What makes this stand out from generic student projects",
    "complexity": "${profile.difficulty}",
    "feasibilityScore": 8.5,
    "primaryTech": ["Tech1", "Tech2", "Tech3"],
    "estimatedWeeks": 6
  }
]
Requirements:
1. Ensure the projects are feasible within 4-8 weeks for a university team.
2. Avoid generic, boring clones (no simple to-do list, basic blog, or standard e-commerce).
3. Return ONLY pure JSON array without markdown backticks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return generateFallbackIdeas(profile);
  } catch (error) {
    console.error('[Gemini API Error - Ideas]:', error);
    return generateFallbackIdeas(profile);
  }
}

export async function generateProjectBlueprint(
  idea: ProjectIdea,
  profile: StudentProfile
): Promise<ProjectBlueprint> {
  if (!apiKey) {
    console.log('[Gemini API] No GEMINI_API_KEY detected. Using dynamic blueprint generator.');
    return generateFallbackBlueprint(idea);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `You are a Senior Project Evaluator and Chief Solutions Architect.
Generate a comprehensive, university-grade Capstone Execution Blueprint for this project idea:

Project Idea:
- Title: ${idea.title}
- Tagline: ${idea.tagline}
- Problem Statement: ${idea.problemStatement}
- Innovation Hook: ${idea.innovationHook}
- Primary Tech: ${idea.primaryTech.join(', ')}
- Student Skills: ${profile.skills.join(', ')}
- Complexity: ${idea.complexity}

Produce a complete, highly realistic JSON response matching this schema:
{
  "ideaId": "${idea.id}",
  "title": "${idea.title}",
  "tagline": "${idea.tagline}",
  "executiveSummary": "2-3 sentences concise executive summary suitable for a college project synopsis submission.",
  "coreFeatures": {
    "mvp": ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"],
    "stretch": ["Stretch Feature 1", "Stretch Feature 2", "Stretch Feature 3"]
  },
  "techStack": [
    {"category": "Frontend", "tech": "...", "reason": "..."},
    {"category": "Backend / API", "tech": "...", "reason": "..."},
    {"category": "AI / Core Logic", "tech": "...", "reason": "..."},
    {"category": "Database / Storage", "tech": "...", "reason": "..."}
  ],
  "roadmap": [
    {
      "phase": "Phase 1: Architecture & Prototyping",
      "duration": "Weeks 1-2",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "Working baseline prototype"
    },
    {
      "phase": "Phase 2: Core Feature Implementation",
      "duration": "Weeks 3-4",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "End-to-end user flow"
    },
    {
      "phase": "Phase 3: Integration, Polish & Security",
      "duration": "Week 5",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "Production build + test suites"
    },
    {
      "phase": "Phase 4: Academic Defense & Documentation",
      "duration": "Week 6",
      "tasks": ["Task 1", "Task 2", "Task 3"],
      "deliverable": "Complete thesis synopsis and live demo"
    }
  ],
  "vivaQuestions": [
    {
      "question": "Rigorous technical or architecture viva question",
      "answerHook": "Best structured response highlight for the student to state",
      "examinerTrap": "What professors look for or trap students with on this topic"
    },
    {
      "question": "Second critical viva question regarding trade-offs or scalability",
      "answerHook": "Strategic answer",
      "examinerTrap": "Common pitfall to avoid"
    },
    {
      "question": "Third viva question regarding testing and failure modes",
      "answerHook": "Strategic answer",
      "examinerTrap": "Common pitfall to avoid"
    }
  ],
  "improvements": [
    "Next-gen expansion or patentable improvement 1",
    "Scaling / real-world deployment recommendation 2",
    "Open-source community contribution idea 3"
  ],
  "signals": {
    "psAlignment": { "score": 92, "note": "Strong alignment with core problem statement and objectives." },
    "googleTech": { "score": 95, "note": "Effectively leverages GCP components.", "recommendedServices": ["Gemini API", "Cloud Run", "Firebase"] },
    "security": { "score": 88, "note": "Solid authentication flow and data at rest encryption." },
    "efficiency": { "score": 90, "note": "Low latency inference due to edge caching." },
    "testing": { "score": 85, "note": "Requires heavy integration test coverage for the AI loop." },
    "accessibility": { "score": 89, "note": "Follows ARIA standards for core UI flows." },
    "codeQuality": { "score": 94, "note": "Strong separation of concerns and typed API boundaries." }
  }
}

Requirements:
- Ensure all scores are integers between 1 and 100.
- Make the viva defense questions sharp and realistic for engineering college external examiners.
- Return ONLY valid JSON without markdown wrapping.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.6,
      },
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    if (parsed && parsed.title && parsed.roadmap) {
      return parsed;
    }
    return generateFallbackBlueprint(idea);
  } catch (error) {
    console.error('[Gemini API Error - Blueprint]:', error);
    return generateFallbackBlueprint(idea);
  }
}

function generateFallbackIdeas(profile: StudentProfile): ProjectIdea[] {
  const domainLower = profile.domain.toLowerCase();
  const primarySkills = profile.skills.length > 0 ? profile.skills : ['Next.js', 'Python', 'AI'];

  return [
    {
      id: `smart-${profile.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}-copilot`,
      title: `IntelliFlow: Autonomous ${profile.domain} Workflow Orchestrator`,
      tagline: `AI-driven context synthesizer and automated pipeline tailored for ${profile.domain}`,
      problemStatement: `Teams working in ${profile.domain} waste hours daily reconciling fragmented data silos and manual repetitive coordination.`,
      innovationHook: `Combines multi-agent reasoning with deterministic validation rules to eliminate human input errors.`,
      complexity: profile.difficulty,
      feasibilityScore: 9.1,
      primaryTech: [primarySkills[0] || 'TypeScript', primarySkills[1] || 'Python', 'Gemini AI', 'Tailwind CSS'],
      estimatedWeeks: profile.difficulty === 'Beginner' ? 4 : profile.difficulty === 'Intermediate' ? 6 : 8,
    },
    {
      id: `sentinel-${profile.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}-guard`,
      title: `SentinelCore: Real-Time Anomaly Detection & Audit Guard for ${profile.domain}`,
      tagline: `Continuous telemetry telemetry stream monitoring with instant automated mitigation`,
      problemStatement: `Standard monitoring tools in ${profile.domain} alert administrators only after severe regressions or service downtime occur.`,
      innovationHook: `Predictive trend analysis using edge anomaly detection algorithms before SLA violations trigger.`,
      complexity: profile.difficulty,
      feasibilityScore: 8.6,
      primaryTech: [primarySkills[1] || 'Python', 'FastAPI', 'Vector Search', 'WebSockets'],
      estimatedWeeks: profile.difficulty === 'Beginner' ? 5 : profile.difficulty === 'Intermediate' ? 6 : 8,
    },
    {
      id: `decentralized-${profile.domain.toLowerCase().replace(/[^a-z0-9]/g, '-')}-mesh`,
      title: `PeerTrust: Distributed Verification Network for ${profile.domain}`,
      tagline: `Tamper-proof verifiable consensus records with zero-knowledge authenticity proofs`,
      problemStatement: `Centralized verification authorities in ${profile.domain} are slow, vulnerable to single-point failure, and lack auditability.`,
      innovationHook: `Lightweight verifiable cryptographic receipts that can be validated offline without third-party reliance.`,
      complexity: profile.difficulty,
      feasibilityScore: 8.2,
      primaryTech: [primarySkills[0] || 'TypeScript', 'Next.js', 'Cryptographic Proofs', 'PostgreSQL'],
      estimatedWeeks: profile.difficulty === 'Beginner' ? 5 : profile.difficulty === 'Intermediate' ? 7 : 8,
    },
  ];
}

function generateFallbackBlueprint(idea: ProjectIdea): ProjectBlueprint {
  if (MOCK_BLUEPRINTS[idea.id]) {
    return MOCK_BLUEPRINTS[idea.id];
  }

  return {
    ideaId: idea.id,
    title: idea.title,
    tagline: idea.tagline,
    executiveSummary: `${idea.title} directly solves the critical bottleneck in ${idea.problemStatement} by providing an end-to-end automated platform featuring ${idea.innovationHook}. Designed specifically for final-year engineering evaluation.`,
    coreFeatures: {
      mvp: [
        'Interactive real-time dashboard with metrics visualization and state telemetry',
        'Automated AI inference engine processing user inputs and domain signals',
        'Configurable parameter settings and operational rule engine',
        'Data export pipeline supporting PDF synopsis and structured JSON outputs',
        'Role-based access view for student administrator and faculty evaluator',
      ],
      stretch: [
        'Real-time WebSocket streaming updates with latency monitoring',
        'Offline client caching mechanism for low-connectivity environments',
        'Automated CI/CD deployment pipeline with Docker containerization',
      ],
    },
    techStack: [
      {
        category: 'Frontend & UI',
        tech: 'Next.js 15, React, Tailwind CSS, Lucide React',
        reason: 'Rapid development, server-side rendering, and production-ready component tree.',
      },
      {
        category: 'Backend & APIs',
        tech: 'Next.js Server Actions / FastAPI',
        reason: 'High throughput async endpoint processing and low-latency payload delivery.',
      },
      {
        category: 'AI Engine',
        tech: 'Google Gemini 2.5 Flash / Structured Output',
        reason: 'Sub-second inference, deterministic JSON schema compliance, and low cost.',
      },
      {
        category: 'Database & State',
        tech: 'PostgreSQL / Supabase with Vector Indexing',
        reason: 'ACID transactional integrity combined with semantic search capabilities.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1: Architecture & Scaffolding',
        duration: 'Week 1-2',
        tasks: [
          'Design entity-relationship diagrams and API endpoint contracts',
          'Set up Next.js / Python repository structure and environment configurations',
          'Implement core database migrations and seed baseline datasets',
        ],
        deliverable: 'Functional base project with authenticated routing and database connection.',
      },
      {
        phase: 'Phase 2: Core Algorithm & Feature Build',
        duration: 'Week 3-4',
        tasks: [
          'Implement the primary algorithm and AI reasoning service layer',
          'Connect frontend dashboard components to live backend routes',
          'Build input validation and error boundary handlers',
        ],
        deliverable: 'Fully working core feature loop from user input to computed output.',
      },
      {
        phase: 'Phase 3: Testing & Performance Hardening',
        duration: 'Week 5',
        tasks: [
          'Conduct end-to-end integration tests and latency profiling',
          'Implement responsive styling for mobile, tablet, and presentation projector views',
          'Add rate limiting and input sanitization to prevent adversarial attacks',
        ],
        deliverable: 'Polished, bug-free release candidate deployed to production staging.',
      },
      {
        phase: 'Phase 4: Capstone Viva Defense & Report',
        duration: 'Week 6',
        tasks: [
          'Generate formal IEEE-format capstone synopsis and architectural diagrams',
          'Prepare slide deck highlighting innovation, benchmarks, and comparison with baseline methods',
          'Conduct mock viva drill targeting examiner question traps',
        ],
        deliverable: 'Final project submission document, live demo link, and viva presentation deck.',
      },
    ],
    vivaQuestions: [
      {
        question: 'What architectural pattern did you select, and how does it prevent tight coupling?',
        answerHook: 'We decoupled the user interface from business logic through a clean layered architecture using REST/Server Actions with strict TypeScript interfaces.',
        examinerTrap: 'Avoid vague answers like "we used standard MVC". Detail how the data layer and AI service can be swapped without touching the UI.',
      },
      {
        question: 'How does your solution scale when concurrent user requests increase tenfold?',
        answerHook: 'Stateless API route handlers allow horizontal auto-scaling, with cached responses for duplicate queries and asynchronous worker queues for intensive tasks.',
        examinerTrap: 'Do not claim "infinite scalability". Ground your answer in caching layers and connection pooling.',
      },
      {
        question: 'What was the most challenging technical roadblock during implementation and how was it solved?',
        answerHook: 'Handling non-deterministic AI latency and ensuring schema compliance, solved by enforcing strict JSON response contracts and client optimistic UI updates.',
        examinerTrap: 'Never say "we had no difficulties". Examiners want to hear an honest debugging and problem-solving narrative.',
      },
    ],
    improvements: [
      'Integrate multi-modal input processing (voice commands and document OCR ingestion)',
      'Publish a reusable npm / PyPI client package for the university developer community',
      'Benchmark against peer academic papers to prepare for conference publication submission',
    ],
    signals: {
      psAlignment: { score: 94, note: 'Directly addresses the selected problem statement with high relevance.' },
      googleTech: { score: 92, note: 'Incorporates Google GenAI models and scalable hosting.', recommendedServices: ['Gemini 2.5 API', 'Google Cloud Run', 'Firebase Auth'] },
      security: { score: 87, note: 'Employs standard token validation and CORS protections.' },
      efficiency: { score: 89, note: 'API routes optimized for edge caching and fast inference.' },
      testing: { score: 85, note: 'Provides testing strategies for AI indeterminism.' },
      accessibility: { score: 90, note: 'Utilizes semantic HTML and ARIA labels.' },
      codeQuality: { score: 95, note: 'Strict TypeScript typing and clean modular component design.' }
    }
  };
}

export async function generateStepCode(task: string, techStack: string): Promise<string> {
  if (!apiKey) {
    return generateFallbackStepCode(task, techStack);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `Give me the minimal starter code and step-by-step terminal commands to build this specific feature: "${task}" using the following tech stack: ${techStack}. 
    
Requirements:
1. Provide exact bash commands to install any needed dependencies.
2. Provide the minimum boilerplate code required.
3. Keep explanations brief and strictly technical.
4. Format using markdown with proper code blocks.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    return response.text || generateFallbackStepCode(task, techStack);
  } catch (error) {
    console.error('[Gemini API Error - Step Code]:', error);
    return generateFallbackStepCode(task, techStack);
  }
}

function generateFallbackStepCode(task: string, techStack: string): string {
  return `### Implementation Guide: ${task}

Here is the recommended approach to build this using **${techStack}**.

#### 1. Setup Dependencies
\`\`\`bash
npm install next react react-dom
npm install -D tailwindcss postcss autoprefixer
\`\`\`

#### 2. Core Implementation
\`\`\`typescript
// src/lib/feature.ts
export async function initializeFeature() {
  console.log("Initializing: ${task}");
  // TODO: Add core logic here
  
  return {
    status: 'success',
    timestamp: new Date().toISOString()
  };
}
\`\`\`

#### 3. Next Steps
- Integrate the above function into your main route handler.
- Verify environment variables are configured correctly.
- Run unit tests to validate edge cases.
`;
}
