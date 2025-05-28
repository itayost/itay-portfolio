"use client";
import { FaLanguage } from "react-icons/fa";
import Card from "@/components/common/Card";
import { RESUME_DATA } from "@/lib/constants/skills";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/utils/animations";

export default function LanguagesCard() {
  return (
    <Card 
      variant="hover" 
      padding="lg"
      motionProps={{
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: 0.1 }
      }}
    >
      <h2 className="flex items-center gap-2 text-2xl font-semibold mb-4">
        <FaLanguage className="text-blue-600 dark:text-blue-400" /> 
        Languages
      </h2>
      <motion.ul 
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="space-y-2"
      >
        {RESUME_DATA.languages.map((language) => (
          <motion.li 
            key={language.name}
            variants={staggerItem}
            className="flex justify-between items-center"
          >
            <span className="font-medium">{language.name}</span>
            <span className="text-gray-600 dark:text-gray-400">{language.level}</span>
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  );
}