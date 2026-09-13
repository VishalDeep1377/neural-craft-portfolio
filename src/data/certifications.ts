// ============================================================
// CERTIFICATIONS & ACHIEVEMENTS DATA
// ============================================================

export type CertCategory = 'achievement' | 'specialization' | 'professional';

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;
  category: CertCategory;
  description: string;
  credentialId?: string;
  credentialUrl?: string;
  // File path in /public/certifications/
  file?: string;
  fileType?: 'pdf' | 'image';
  tags: string[];
  accentColor: string;           // Hex for ElectricBorder & card glow
  icon: string;                  // Fallback emoji
  isFeatured?: boolean;
}

export const certifications: Certification[] = [
  // ── AWS & CLOUD PROFESSIONAL CERTIFICATIONS ───────────────
  {
    id: 'aws-llm-genai',
    title: 'AWS Large Language Models & Generative AI',
    issuer: 'Amazon Web Services (AWS)',
    date: '2025',
    category: 'professional',
    description:
      'AWS Professional certification on building, fine-tuning, and deploying Large Language Models (LLMs) and Generative AI applications using AWS Bedrock, SageMaker, and Cloud AI services.',
    file: '/certifications/AWSLLM.pdf',
    fileType: 'pdf',
    tags: ['AWS', 'Bedrock', 'LLM', 'Generative AI', 'SageMaker'],
    accentColor: '#FF9900', // AWS Signature Smile Amber Gold
    icon: '☁️',
    isFeatured: true,
  },
  {
    id: 'ms-ai-ml',
    title: 'Microsoft AI & ML Engineering Specialization',
    issuer: 'Microsoft × Coursera',
    date: '2025',
    category: 'specialization',
    description:
      'Completed the Microsoft AI & ML Engineering Specialization covering machine learning fundamentals, Azure AI services, cognitive vision, and production ML pipelines.',
    file: '/certifications/microsoftAIML.pdf',
    fileType: 'pdf',
    tags: ['Microsoft', 'AI', 'Machine Learning', 'Azure'],
    accentColor: '#EC4899', // Vivid Rose Pink
    icon: '🤖',
    isFeatured: true,
  },
  {
    id: 'gen-ai-google',
    title: 'Generative AI Leader Professional Certificate',
    issuer: 'Google Cloud × Coursera',
    date: '2025',
    category: 'professional',
    description:
      'Google Cloud\'s flagship Generative AI professional certification — covering prompt engineering, foundation models, Vertex AI, and responsible AI practices.',
    file: '/certifications/Generative AI Leader Professional Certificate.pdf',
    fileType: 'pdf',
    tags: ['Google Cloud', 'Generative AI', 'LLM', 'Vertex AI'],
    accentColor: '#38BDF8', // Electric Google Cyan
    icon: '🌐',
    isFeatured: true,
  },

  // ── HACKATHONS & COMPETITION AWARDS ───────────────────────
  {
    id: 'nitrostack-runner-up',
    title: 'SRMIST × NITROSTACK Hackathon',
    issuer: 'SRM Institute of Science and Technology',
    date: '2025',
    category: 'achievement',
    description:
      'Runner Up at the SRMIST × NITROSTACK Hackathon — competed against 200+ teams building AI-powered products under 36-hour constraints.',
    file: '/certifications/nitrostack hackathon.jpg',
    fileType: 'image',
    tags: ['AI', 'Hackathon', 'Runner Up'],
    accentColor: '#F43F5E', // Electric Rose Coral
    icon: '🏆',
    isFeatured: true,
  },
  {
    id: 'dominion-best-design',
    title: 'DOMINION 2026 — Best Design Award',
    issuer: 'DOMINION 2026',
    date: '2026',
    category: 'achievement',
    description:
      'Received the Best Design Award at DOMINION 2026 for exceptional UI/UX craft and product presentation in a national-level design competition.',
    file: '/certifications/dominion 2026 hacathon.pdf',
    fileType: 'pdf',
    tags: ['Design', 'Award', 'UI/UX'],
    accentColor: '#10B981', // Dominion Emerald Green
    icon: '🎨',
    isFeatured: true,
  },

  // ── AI & DEEP LEARNING SPECIALIZATIONS ─────────────────────
  {
    id: 'deep-learning-ai',
    title: 'Advance Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2025',
    category: 'specialization',
    description:
      'Mastered neural network architectures, CNNs, RNNs, sequence models, and optimization algorithms through DeepLearning.AI\'s industry-standard curriculum.',
    file: '/certifications/AdvanceDeepLearning.pdf',
    fileType: 'pdf',
    tags: ['Deep Learning', 'Neural Networks', 'AI'],
    accentColor: '#FF3B5C', // DeepLearning.AI Coral Red
    icon: '🧠',
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI & AI Agents for Leaders',
    issuer: 'Vanderbilt University × Coursera',
    date: '2025',
    category: 'specialization',
    description:
      'Advanced specialization on building autonomous AI agents, multi-agent systems, and strategic leadership frameworks for agentic AI deployment.',
    file: '/certifications/Agentic AI and AI Agents for Leaders Specialization.pdf',
    fileType: 'pdf',
    tags: ['Agentic AI', 'LLM', 'Autonomous Agents'],
    accentColor: '#D4AF37', // Vanderbilt Gold
    icon: '⚡',
  },
  {
    id: 'fullstack-london',
    title: 'Full-Stack Web Development Specialization',
    issuer: 'University of London × Coursera',
    date: '2025',
    category: 'specialization',
    description:
      'Comprehensive full-stack development specialization covering React, Node.js, databases, REST APIs, and modern deployment strategies.',
    file: '/certifications/Full-Stack Web Development Specialization.pdf',
    fileType: 'pdf',
    tags: ['Full Stack', 'React', 'Node.js', 'APIs'],
    accentColor: '#DC2626', // University of London Crimson Red
    icon: '💻',
  },
];

export const featuredCerts = certifications.filter((c) => c.isFeatured);
export const allCerts = certifications;
