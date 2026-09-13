export interface SkillGroup {
  category: string;
  icon: string;
  color: string;
  skills: { name: string; level: number }[];  // level 1-5
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    icon: '{ }',
    color: '#6366f1',
    skills: [
      { name: 'JavaScript (ES6+)', level: 5 },
      { name: 'TypeScript', level: 5 },
      { name: 'Python', level: 4 },
      { name: 'Java', level: 3 },
    ],
  },
  {
    category: 'Frontend',
    icon: '⬡',
    color: '#06b6d4',
    skills: [
      { name: 'React.js', level: 5 },
      { name: 'Next.js', level: 5 },
      { name: 'CSS / Tailwind', level: 4 },
      { name: 'Bootstrap', level: 4 },
    ],
  },
  {
    category: 'Backend',
    icon: '⚙',
    color: '#10b981',
    skills: [
      { name: 'Node.js', level: 5 },
      { name: 'Express.js', level: 5 },
      { name: 'REST APIs', level: 5 },
      { name: 'JWT Auth', level: 4 },
    ],
  },
  {
    category: 'Databases',
    icon: '◎',
    color: '#f59e0b',
    skills: [
      { name: 'MongoDB', level: 5 },
      { name: 'MongoDB Atlas', level: 4 },
      { name: 'MySQL', level: 4 },
    ],
  },
  {
    category: 'AI / Systems',
    icon: '◈',
    color: '#a78bfa',
    skills: [
      { name: 'PyTorch', level: 4 },
      { name: 'FastAPI', level: 4 },
      { name: 'WebSockets', level: 4 },
      { name: 'Reinforcement Learning', level: 3 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁',
    color: '#f97316',
    skills: [
      { name: 'Docker', level: 3 },
      { name: 'Git / GitHub', level: 5 },
      { name: 'Vercel', level: 5 },
      { name: 'Netlify', level: 4 },
    ],
  },
  {
    category: 'Core CS',
    icon: '⊕',
    color: '#ec4899',
    skills: [
      { name: 'DSA', level: 4 },
      { name: 'OOP', level: 5 },
      { name: 'DBMS', level: 4 },
      { name: 'OS', level: 3 },
      { name: 'Computer Networks', level: 3 },
    ],
  },
];
