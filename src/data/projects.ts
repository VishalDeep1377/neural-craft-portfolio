export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  accentColor: string;
  status: 'live' | 'beta' | 'archived';
  year: string;
  // TODO: add image screenshots per project
}

export const projects: Project[] = [
  {
    id: 'codetocareer',
    title: 'CodeToCareer',
    tagline: 'AI-driven adaptive learning for career-ready engineers',
    description:
      'An adaptive AI learning platform that bridges the gap between programming education and real-world career readiness. Features AI mentorship, resume analysis, and interview simulation.',
    problem:
      'Most coding education platforms teach syntax, not careers. Students graduate with knowledge but lack the portfolio, interview skills, or real-world AI exposure to land jobs.',
    solution:
      'CodeToCareer bridges theory and employment with AI-driven learning paths, live resume analysis, interview simulations, and modular REST API architecture that adapts to each learner.',
    features: [
      'AI-powered personalized learning roadmaps',
      'Resume analysis with ATS scoring',
      'Mock interview simulator with AI feedback',
      'Adaptive question bank (DSA + system design)',
      'Modular REST API architecture (Express.js + MongoDB)',
      'Progress tracking dashboard with analytics',
    ],
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'AI/ML'],
    liveUrl: 'https://code-to-carrer.netlify.app/',
    accentColor: '#6366f1',
    status: 'live',
    year: '2025',
  },
  {
    id: 'freakyfit',
    title: 'FreakyFit',
    tagline: 'AI fitness coach. Live sessions. Zero excuses.',
    description:
      'A full-stack AI fitness platform with personalized workout generation, nutrition planning, real-time live fitness sessions via ZegoCloud, AI chatbot guidance, and Razorpay payments.',
    problem:
      'Personal trainers are expensive, gym subscriptions are wasted, and fitness apps are generic. People need personalized coaching at scale.',
    solution:
      'FreakyFit democratizes personal training with AI-generated routines, live virtual sessions, a real-time AI coach chatbot, and integrated payments — all in one platform.',
    features: [
      'AI-personalized workout & nutrition plans',
      'Real-time live sessions (ZegoCloud WebRTC)',
      'AI chatbot fitness advisor (24/7)',
      'Razorpay payment gateway integration',
      'Progress analytics & body metric tracking',
      'Community workout challenges',
    ],
    techStack: ['React.js', 'Node.js', 'MongoDB', 'Razorpay', 'ZegoCloud', 'AI/ML'],
    liveUrl: 'https://bodymind-ai.netlify.app/',
    accentColor: '#10b981',
    status: 'live',
    year: '2025',
  },
  {
    id: 'chatera',
    title: 'Chatera',
    tagline: 'Your AI workspace. Built for deep work.',
    description:
      'A full-featured AI workspace powered by Google Gemini with multi-model fallback, real-time SSE streaming, project-based conversation management, GitHub integration, and PDF context ingestion.',
    problem:
      'AI tools like ChatGPT treat every conversation in isolation. Developers need context-aware assistants that understand their projects, codebases, and documents.',
    solution:
      'Chatera is a project-scoped AI workspace — conversations live inside project contexts, PDFs and GitHub repos feed the AI\'s knowledge, and responses stream in real-time with SSE.',
    features: [
      'Google Gemini multi-model fallback',
      'Real-time SSE response streaming',
      'Project-based conversation threads',
      'GitHub repo context ingestion',
      'PDF document understanding',
      'PWA support + offline mode',
      'Rate-limited REST APIs + NextAuth.js auth',
    ],
    techStack: ['Next.js 15', 'TypeScript', 'Gemini API', 'MongoDB', 'NextAuth.js', 'SSE'],
    liveUrl: 'https://chat-era.vercel.app/',
    accentColor: '#06b6d4',
    status: 'live',
    year: '2025',
  },
  {
    id: 'rakshanet',
    title: 'RakshaNet SilentShield',
    tagline: 'Protection. Not Surveillance.',
    // TODO: PLACEHOLDER — real description pending from project owner
    description:
      'A privacy-first personal safety platform built with agentic AI and machine learning. RakshaNet continuously assesses ambient signals (audio, motion, location anomalies) through a risk scoring engine that escalates protective actions — from silent check-ins to emergency SOS — only when genuinely needed, never intrusively.',
    problem:
      'Existing safety apps are either too passive (manual SOS buttons) or too intrusive (constant location surveillance). Neither earns user trust.',
    solution:
      'RakshaNet\'s Agentic AI engine computes a real-time Raksha Risk Score from multimodal signals. It acts autonomously — silently alerting trusted contacts, escalating to emergency services — without requiring the user to manually trigger anything under duress.',
    features: [
      'Real-time Raksha Risk Score engine (rule-based ML)',
      'Multimodal signal analysis (audio + motion + GPS)',
      'Autonomous agentic escalation pipeline',
      'Silent SOS with trusted contact alerts',
      'Privacy-first architecture — no passive surveillance',
      'Mobile PWA with DeviceMotion API integration',
    ],
    techStack: [
      'Next.js',
      'Python',
      'FastAPI',
      'Machine Learning',
      'Agentic AI',
      'Mobile APIs',
    ],
    liveUrl: 'https://raksha-net-three.vercel.app/',
    accentColor: '#f59e0b',
    status: 'live',
    year: '2026',
  },
  // TODO: Add project #5 here — simply add one object to this array, no code changes needed elsewhere
  // {
  //   id: 'project-five',
  //   title: 'Project Five',
  //   tagline: 'Coming soon',
  //   description: '',
  //   problem: '',
  //   solution: '',
  //   features: [],
  //   techStack: [],
  //   accentColor: '#ec4899',
  //   status: 'beta',
  //   year: '2026',
  // },
];
