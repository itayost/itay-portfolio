"use client";
import { FaGraduationCap } from "react-icons/fa";
import Card from "@/components/common/Card";
import { RESUME_DATA } from "@/lib/constants/skills";

export default function EducationCard() {
  return (
    <Card 
      variant="hover" 
      padding="lg"
      motionProps={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
      }}
    >
      <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
        <FaGraduationCap className="text-blue-600 dark:text-blue-400" /> 
        Education
      </h2>
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{RESUME_DATA.education.degree}</h3>
        <p className="text-gray-600 dark:text-gray-400">{RESUME_DATA.education.school}</p>
        <p className="text-sm text-gray-500 dark:text-gray-500">{RESUME_DATA.education.period}</p>
      </div>
    </Card>
  );
}