export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  type: string;
  location: string;
  period: string;
  current: boolean;
  summary: string;
  highlights: string[];
  skills: string[];
  accentColor: string;
}

export interface EducationEntry {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  grade?: string;
  status: 'completed' | 'pursuing';
  accentColor: string;
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'smartground',
    role: 'Software Engineer (Intern)',
    company: 'Smartground Infotech Pvt. Ltd.',
    type: 'Internship',
    location: 'Noida, UP (Remote)',
    period: 'Jan 2026 – Present',
    current: true,
    summary:
      'Building production-grade software at Smartground — from automating email marketing pipelines to architecting a job search portal connecting medical institutions with healthcare candidates.',
    highlights: [
      'Automated email marketing workflows, reducing manual send-time by 70%',
      'Built a full-stack job search portal for medical institutions & consultancies',
      'Developed and maintained the company website and internal tooling',
      'Designed scalable software infrastructure and system architecture',
    ],
    skills: ['Software Design', 'Software Infrastructure', 'Next.js', 'Node.js', 'System Architecture'],
    accentColor: '#6366f1',
  },
  {
    id: 'deloitte',
    role: 'Web Developer',
    company: 'Deloitte Australia',
    type: 'Virtual Internship (Forage)',
    location: 'Remote',
    period: 'Jul 2025',
    current: false,
    summary:
      'Forage virtual internship with Deloitte Australia — built interactive business intelligence dashboards and performed data cleansing/classification pipelines for dataset integrity.',
    highlights: [
      'Built interactive dashboards delivering real-time business insights',
      'Performed data cleansing and classification to ensure dataset reliability',
      'Applied enterprise-grade data transformation patterns',
    ],
    skills: ['Data Visualization', 'Dashboard Design', 'Data Cleansing', 'Business Intelligence'],
    accentColor: '#10b981',
  },
];

export const education: EducationEntry[] = [
  {
    id: 'mca-srm',
    degree: 'MCA',
    field: 'Generative AI',
    institution: 'SRM Institute of Science and Technology',
    location: 'Chennai, Tamil Nadu',
    period: '2026 – Expected 2028',
    status: 'pursuing',
    accentColor: '#6366f1',
  },
  {
    id: 'bca-lpu',
    degree: 'BCA',
    field: 'Data Science',
    institution: 'Lovely Professional University',
    location: 'Punjab',
    period: '2022 – May 2025',
    grade: 'CGPA 8.0',
    status: 'completed',
    accentColor: '#06b6d4',
  },
];
