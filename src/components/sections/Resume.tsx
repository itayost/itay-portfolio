"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaLanguage, FaDownload } from "react-icons/fa";
import SkillsVisualization from "@/components/SkillsVisualization";

export default function ResumeSection() {
  return (
    <section id="resume" className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h1>Resume</h1>
          <a 
            href="/Itay Ostraich Resume.pdf" 
            download 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors !no-underline"
          >
            <FaDownload /> Download PDF
          </a>
        </div>
        <p className="mb-6">
          Here&apos;s an overview of my background, skills, and projects.
        </p>
        <SkillsVisualization />
        <div className="space-y-10">
          <div>
            <h2 className="flex items-center gap-2">
              <FaGraduationCap /> Education
            </h2>
            <p>
              <strong>Afeka College of Engineering</strong><br />
              B.Sc in Software Engineering, 2021 – Present
            </p>
          </div>
          <div>
            <h2 className="flex items-center gap-2">
              <FaLanguage /> Languages
            </h2>
            <ul>
              <li>Hebrew – Native</li>
              <li>English – Intermediate</li>
              <li>Spanish – Basic</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}