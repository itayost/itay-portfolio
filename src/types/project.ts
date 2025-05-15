// src/types/project.ts
export type Project = {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string; // Optional
  features: string[];
  challenges: string[];
};