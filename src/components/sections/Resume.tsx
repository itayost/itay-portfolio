"use client";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCode, FaLanguage } from "react-icons/fa";
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
        <h1>Resume</h1>
        <p className="mb-6">
          Here's an overview of my background, skills, and projects.
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
