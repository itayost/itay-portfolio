export type Skill = {
  name: string;
  level: number;
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: Skill[];
};

export const SKILLS_DATA: Record<string, Skill[]> = {
  languages: [
    { name: "Java", level: 85 },
    { name: "Python", level: 80 },
    { name: "C", level: 75 },
    { name: "C#", level: 70 },
    { name: "JavaScript", level: 65 },
  ],
  frameworks: [
    { name: "Android", level: 80 },
    { name: "Unity", level: 75 },
    { name: "React", level: 60 },
    { name: "Next.js", level: 55 },
  ],
  tools: [
    { name: "Git", level: 85 },
    { name: "Firebase", level: 75 },
    { name: "SQL", level: 70 },
    { name: "Linux", level: 65 },
  ]
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: "languages", label: "Languages", skills: SKILLS_DATA.languages },
  { id: "frameworks", label: "Frameworks", skills: SKILLS_DATA.frameworks },
  { id: "tools", label: "Tools", skills: SKILLS_DATA.tools }
];

export const RESUME_DATA = {
  education: {
    degree: "B.Sc in Software Engineering",
    school: "Afeka College of Engineering",
    period: "2021 – Present",
  },
  languages: [
    { name: "Hebrew", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Spanish", level: "Basic" },
  ],
  resumePdfPath: "/Itay Ostraich Resume.pdf",
};