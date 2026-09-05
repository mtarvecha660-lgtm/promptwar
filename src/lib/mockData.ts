import { ProjectIdea, ProjectBlueprint } from '@/types/project';

export const PRESET_PROFILES = [
  {
    name: 'AI Healthcare Diagnostic Assistant',
    skills: ['Python', 'FastAPI', 'React', 'Tailwind CSS'],
    domain: 'Healthcare & Medical Tech',
    difficulty: 'Intermediate' as const,
    interests: 'Automating clinical triage notes and anomaly detection from medical imaging scans',
  },
  {
    name: 'Campus Resource & Lab Equipment Tracker',
    skills: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    domain: 'Smart Campus & Education',
    difficulty: 'Beginner' as const,
    interests: 'Real-time booking and IoT sensor-based inventory for university labs',
  },
  {
    name: 'Decentralized Academic Credential Verifier',
    skills: ['Solidity', 'Web3.js', 'React', 'Python'],
    domain: 'Blockchain & Cyber Security',
    difficulty: 'Advanced' as const,
    interests: 'Tamper-proof degree certificates and instant employer verification API',
  },
];

export const MOCK_IDEAS: ProjectIdea[] = [
  {
    id: 'mediscan-triage',
    title: 'MediScribe AI: Multimodal Clinical Triage Assistant',
    tagline: 'Instant audio-to-EHR clinical transcription with ICD-10 diagnostic flagging',
    problemStatement: 'Doctors spend up to 40% of their consultation time manually typing clinical notes, leading to physician burnout and clinical documentation discrepancies.',
    innovationHook: 'Combines streaming speech-to-text with LLM-driven structured JSON clinical extraction and drug interaction warnings.',
    complexity: 'Intermediate',
    feasibilityScore: 9.2,
    primaryTech: ['Next.js', 'Python FastAPI', 'Gemini Flash', 'WebSockets'],
    estimatedWeeks: 6,
  },
  {
    id: 'campus-lab-pilot',
    title: 'LabPulse: IoT & Vision-Based University Equipment Optimizer',
    tagline: 'Autonomous hardware inventory auditing and predictive maintenance booking system',
    problemStatement: 'University engineering labs lose high-value equipment and experience unexpected instrument downtime due to manual check-out ledgers.',
    innovationHook: 'QR-code micro-kiosk with ultrasonic presence sensing and automated equipment health telemetry.',
    complexity: 'Beginner',
    feasibilityScore: 8.8,
    primaryTech: ['React', 'Node.js', 'ESP32 IoT', 'SQLite'],
    estimatedWeeks: 4,
  },
  {
    id: 'cert-shield-block',
    title: 'EduTrust: Zero-Knowledge Academic Credential Vault',
    tagline: 'Cryptographically verifiable university transcripts with privacy-preserving employer checks',
    problemStatement: 'Fraudulent degrees and forged marksheets are rising globally, while manual credential verification takes weeks for employers.',
    innovationHook: 'ZK-proof verifiable credentials that allow students to prove GPA thresholds without revealing their full transcripts.',
    complexity: 'Advanced',
    feasibilityScore: 7.9,
    primaryTech: ['Next.js', 'Solidity', 'IPFS', 'Ethers.js'],
    estimatedWeeks: 8,
  },
];

export const MOCK_BLUEPRINTS: Record<string, ProjectBlueprint> = {
  'mediscan-triage': {
    ideaId: 'mediscan-triage',
    title: 'MediScribe AI: Multimodal Clinical Triage Assistant',
    tagline: 'Instant audio-to-EHR clinical transcription with ICD-10 diagnostic flagging',
    executiveSummary: 'MediScribe AI tackles clinical burnout by turning raw doctor-patient ambient audio or typed consultation notes into structured SOAP (Subjective, Objective, Assessment, Plan) records, automatically highlighting ICD-10 codes and contraindicated drug pairings in real time.',
    coreFeatures: {
      mvp: [
        'Live consultation recording / audio upload with Whisper/Gemini transcription',
        'Automated SOAP clinical note formatter with editable doctor fields',
        'ICD-10 preliminary diagnostic code suggestion engine',
        'Drug-to-drug interaction allergy warning badges',
        'Export to HL7/FHIR compliant JSON or PDF prescription summary',
      ],
      stretch: [
        'Integration with hospital local EMR/EHR mock API via REST',
        'Offline client-side speech processing fallback using WebAudio API',
        'Multi-lingual Indian language translation (Hindi/Gujarati to English clinical notes)',
      ],
    },
    techStack: [
      {
        category: 'Frontend',
        tech: 'Next.js 15, Tailwind CSS, Lucide Icons',
        reason: 'Fast SSR, reactive doctor dashboard, responsive audio visualizer.',
      },
      {
        category: 'Backend / API',
        tech: 'FastAPI (Python) or Next.js Route Handlers',
        reason: 'Async streaming response support and fast AI inference pipeline.',
      },
      {
        category: 'AI Engine',
        tech: 'Google Gemini 2.0 Flash / 1.5 Pro',
        reason: 'High speed, long context window for multi-turn medical consultation logs, strict JSON schema output.',
      },
      {
        category: 'Database & Storage',
        tech: 'PostgreSQL with pgvector (or Supabase)',
        reason: 'Secure storage of patient consultation notes with vector embeddings for past symptom similarity.',
      },
    ],
    roadmap: [
      {
        phase: 'Phase 1: Foundation & Data Flow',
        duration: 'Week 1-2',
        tasks: [
          'Design SOAP clinical template schema & JSON response contracts',
          'Implement microphone audio recording & base Next.js layout',
          'Configure Gemini structured generation with system prompts',
        ],
        deliverable: 'Working audio capture + AI transcription into formatted markdown notes.',
      },
      {
        phase: 'Phase 2: Clinical Logic & ICD-10 Engine',
        duration: 'Week 3-4',
        tasks: [
          'Integrate ICD-10 mapping module for diagnostic categorization',
          'Build Drug Interaction rule-check using open medical datasets',
          'Add doctor review/edit interface with differential diagnosis badges',
        ],
        deliverable: 'Functional clinical dashboard with real-time allergy & diagnostic alerts.',
      },
      {
        phase: 'Phase 3: Security & Export Pipeline',
        duration: 'Week 5',
        tasks: [
          'Implement HIPAA-compliant data masking (de-identification of PII)',
          'Generate one-click PDF prescriptions and EHR export payloads',
          'Build audit trail logs for clinical review history',
        ],
        deliverable: 'Printable medical report and exportable FHIR JSON file.',
      },
      {
        phase: 'Phase 4: Testing & Viva Preparation',
        duration: 'Week 6',
        tasks: [
          'Benchmark transcription latency and accuracy on synthetic patient audio',
          'Document system architecture, sequence diagrams, and class models',
          'Rehearse examiner viva questions on AI hallucination safeguards',
        ],
        deliverable: 'Full capstone project report, live deployment, and viva defense slides.',
      },
    ],
    vivaQuestions: [
      {
        question: 'How do you handle AI hallucinations in medical diagnoses during clinical use?',
        answerHook: 'MediScribe AI strictly functions as a "Doctor-in-the-Loop" triage assistant, never issuing final diagnoses autonomously. All LLM outputs provide confidence indicators and require explicit physician sign-off.',
        examinerTrap: 'Never say "the AI diagnoses the patient". Always emphasize assistive documentation and physician verification.',
      },
      {
        question: 'How does your system guarantee patient data privacy and compliance?',
        answerHook: 'We implement client-side PII de-identification (scrubbing names, SSN/Aadhaar, phone numbers) before sending transcription tokens to the LLM, adhering to HIPAA and DISHA guidelines.',
        examinerTrap: 'Judges often probe where the audio data is stored. Explain that raw audio is processed ephemerally and discarded unless opted-in.',
      },
      {
        question: 'Why did you choose Gemini over local open-source models like Llama 3 for this project?',
        answerHook: 'Gemini provides multi-modal audio context ingestion directly, lowering audio-to-text pipeline latency from multiple discrete steps to a single low-latency call, ideal for real-time doctor workflows.',
        examinerTrap: 'Be prepared to explain hardware constraints: running a 70B local model on student laptops is infeasible.',
      },
    ],
    improvements: [
      'Add voice-guided doctor shortcuts ("Computer: add Amoxicillin 500mg BD for 5 days")',
      'Integrate offline lightweight speech-to-text for rural clinics with patchy connectivity',
      'Create a patient-facing simplified discharge summary written in layperson terms',
    ],
    signals: {
      psAlignment: { score: 98, note: 'Directly addresses clinician burnout and transcription bottlenecks.' },
      googleTech: { score: 96, note: 'Heavy reliance on Google multimodal AI inference.', recommendedServices: ['Gemini 1.5 Pro', 'Google Cloud Storage', 'GCP Speech-to-Text'] },
      security: { score: 92, note: 'Addresses HIPAA constraints with PII masking.' },
      efficiency: { score: 88, note: 'Streaming audio processing ensures minimal latency.' },
      testing: { score: 84, note: 'Will require clinical validation sets for hallucination checks.' },
      accessibility: { score: 90, note: 'Voice-first interface inherently aids accessibility.' },
      codeQuality: { score: 95, note: 'Strict separation of SOAP components and UI.' }
    }
  },
};
