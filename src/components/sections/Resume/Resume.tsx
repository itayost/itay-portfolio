"use client";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import SkillsVisualization from "./SkillsVisualization";
import EducationCard from "./EducationCard";
import LanguagesCard from "./LanguagesCard";
import Button from "@/components/common/Button";
import { RESUME_DATA } from "@/lib/constants/skills";
import { fadeInUp } from "@/lib/utils/animations";

export default function ResumeSection() {
  return (
    <section id="resume" className="section-wrapper">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <ResumeHeader />
        <ResumeIntro />
        <SkillsVisualization />
        <ResumeCards />
      </motion.div>
    </section>
  );
}

// Resume Header Component
function ResumeHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
      <h1 className="text-4xl font-bold">Resume</h1>
      <a href={RESUME_DATA.resumePdfPath} download>
        <Button
          variant="secondary"
          size="md"
          motionProps={{
            whileHover: { scale: 1.05 },
            whileTap: { scale: 0.95 }
          }}
        >
          <FaDownload /> Download PDF
        </Button>
      </a>
    </div>
  );
}

// Resume Intro Component
function ResumeIntro() {
  return (
    <p className="mb-6 text-gray-600 dark:text-gray-400">
      Here&apos;s an overview of my background, skills, and expertise.
    </p>
  );
}

// Resume Cards Component
function ResumeCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
      <EducationCard />
      <LanguagesCard />
    </div>
  );
}