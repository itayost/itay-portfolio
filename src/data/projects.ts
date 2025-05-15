// src/data/projects.ts
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "tables",
    title: "Restaurant Reservation System",
    shortDescription: "Android app for restaurant booking with Firebase backend.",
    fullDescription: "A comprehensive restaurant reservation system that allows users to browse restaurants, check table availability, and make reservations. The app includes user authentication, reservation management, and admin features for restaurant owners.",
    technologies: ["Java", "Firebase", "Android SDK"],
    imageUrl: "/projects/tables.png",
    githubUrl: "https://github.com/itayost/Tables",
    features: [
      "User authentication and profile management",
      "Restaurant browsing with search and filters",
      "Real-time table availability visualization",
      "Reservation creation and management",
      "Admin dashboard for restaurant owners"
    ],
    challenges: [
      "Implementing real-time database updates with Firebase",
      "Designing an intuitive booking flow",
      "Handling concurrent reservation requests",
      "Creating a flexible notification system"
    ]
  },
  {
    id: "foosball-dodge",
    title: "Foosball Dodge",
    shortDescription: "3D arcade-style game in Unity using C# with power-ups and fast-paced gameplay.",
    fullDescription: "A fast-paced 3D arcade game built in Unity where players control a ball navigating through moving obstacles. The game features various power-ups, difficulty progression, and a scoring system.",
    technologies: ["Unity", "C#", "Blender", "Game Design"],
    imageUrl: "/projects/foosball.png",
    githubUrl: "https://github.com/itayost/Unity-Idea",
    features: [
      "Dynamic obstacle generation system",
      "Various power-up mechanics",
      "Progressive difficulty scaling",
      "Particle effects and visual feedback",
      "High score tracking system"
    ],
    challenges: [
      "Balancing game difficulty progression",
      "Optimizing performance for smooth gameplay",
      "Creating intuitive controls for various platforms",
      "Implementing a dynamic camera system"
    ]
  },
  {
    id: "sql-project",
    title: "Test Management System",
    shortDescription: "SQL-based system for managing questions, answers, and building tests.",
    fullDescription: "A comprehensive database system designed to help educators create, manage, and organize test questions and answers. The system allows for categorizing questions, assembling tests, and tracking student performance.",
    technologies: ["SQL", "Database Design", "Normalization", "Stored Procedures"],
    imageUrl: "/projects/sql-project.png",
    githubUrl: "https://github.com/itayost/SQLproject",
    features: [
      "Hierarchical question categorization",
      "Test assembly and generation",
      "Answer tracking and analysis",
      "User permission management",
      "Performance reporting tools"
    ],
    challenges: [
      "Designing an efficient normalized database schema",
      "Creating complex queries for test generation",
      "Implementing logical constraints for test integrity",
      "Balancing flexibility with data consistency"
    ]
  }
];