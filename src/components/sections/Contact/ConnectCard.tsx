"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";
import Card from "@/components/common/Card";
import Button from "@/components/common/Button";

interface ConnectCardProps {
  className?: string;
}

const SKILLS_FOCUS = [
  "Android Development", 
  "Unity Game Dev", 
  "React", 
  "Next.js", 
  "Cloud Solutions", 
  "UI/UX Design"
];

export default function ConnectCard({ className = "" }: ConnectCardProps) {
  return (
    <Card
      variant="hover"
      className={className}
      motionProps={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.3 }
      }}
    >
      <div className="flex flex-col h-full justify-between">
        <div>
          <ConnectHeader />
          <ConnectDescription />
          <SkillsFocus skills={SKILLS_FOCUS} />
        </div>
        
        <div className="mt-10">
          <InspirationQuote />
          <EmailButton />
        </div>
      </div>
    </Card>
  );
}

// Connect Header Component
function ConnectHeader() {
  return (
    <h3 className="text-xl md:text-2xl font-semibold mb-6">
      Let&apos;s Connect
    </h3>
  );
}

// Connect Description Component
function ConnectDescription() {
  return (
    <>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        Whether you&apos;re looking for a software engineer for a project or just want to discuss technology, 
        I&apos;m always open to new connections and opportunities.
      </p>
      
      <p className="text-lg text-gray-700 dark:text-gray-300">
        I&apos;m currently focused on expanding my skills in:
      </p>
    </>
  );
}

// Skills Focus Component
function SkillsFocus({ skills }: { skills: string[] }) {
  return (
    <motion.div 
      className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      {skills.map((skill, index) => (
        <motion.div 
          key={index} 
          className="flex items-center gap-2"
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0 }
          }}
        >
          <span 
            className="h-2 w-2 rounded-full" 
            style={{ backgroundColor: 'var(--primary)' }}
          />
          <span className="font-medium">{skill}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Inspiration Quote Component
function InspirationQuote() {
  return (
    <blockquote
      className="italic pl-4 py-2 my-6 text-gray-700 dark:text-gray-300"
      style={{ 
        borderLeftWidth: '4px',
        borderLeftColor: 'var(--primary)'
      }}
    >
      &quot;The best way to predict the future is to create it.&quot;
    </blockquote>
  );
}

// Email Button Component
function EmailButton() {
  return (
    <motion.a
      href="mailto:itayost1@gmail.com"
      whileHover={{ 
        scale: 1.03, 
        y: -2, 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Button
        variant="outline"
        size="md"
        className="w-full sm:w-auto"
      >
        <FaEnvelope className="text-lg" />
        <span>Email Me</span>
      </Button>
    </motion.a>
  );
}