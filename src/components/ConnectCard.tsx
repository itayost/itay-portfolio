"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

type ConnectCardProps = {
  className?: string;
};

export default function ConnectCard({ className = "" }: ConnectCardProps) {
  // Skills list
  const skills = [
    "Android Development", 
    "Unity Game Dev", 
    "React", 
    "Next.js", 
    "Cloud Solutions", 
    "UI/UX Design"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`project-card ${className}`}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold mb-6">Let's Connect</h3>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Whether you're looking for a software engineer for a project or just want to discuss technology, 
            I'm always open to new connections and opportunities.
          </p>
          
          <p className="text-lg text-gray-700 dark:text-gray-300">
            I'm currently focused on expanding my skills in:
          </p>
          
          <SkillsList skills={skills} />
        </div>
        
        <div className="mt-10">
          <blockquote 
            className="italic pl-4 py-2 my-6 text-gray-700 dark:text-gray-300"
            style={{ 
              borderLeftWidth: '4px',
              borderLeftColor: 'var(--primary)'
            }}
          >
            "The best way to predict the future is to create it."
          </blockquote>
          
          <EmailButton />
        </div>
      </div>
    </motion.div>
  );
}

// SkillsList component
function SkillsList({ skills }: { skills: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <span 
            className="h-2 w-2 rounded-full" 
            style={{ backgroundColor: 'var(--primary)' }}
          ></span>
          <span className="font-medium">{skill}</span>
        </div>
      ))}
    </div>
  );
}

// EmailButton component
function EmailButton() {
  return (
    <motion.a
      href="mailto:itayost1@gmail.com"
      whileHover={{ 
        scale: 1.03, 
        y: -2, 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        color: 'var(--primary)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className="inline-flex items-center gap-2 px-6 py-3 font-medium rounded-full border shadow-sm"
      style={{ 
        borderColor: 'var(--border)',
        color: 'var(--foreground)',
        backgroundColor: 'var(--card-bg)' 
      }}
    >
      <FaEnvelope className="text-lg" />
      <span>Email Me</span>
    </motion.a>
  );
}
