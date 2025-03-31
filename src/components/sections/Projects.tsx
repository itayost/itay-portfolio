"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaProjectDiagram } from "react-icons/fa";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="flex items-center gap-2">
          <FaProjectDiagram /> Projects
        </h1>
        <p className="mb-8">
          Here are some personal and academic projects I&apos;ve worked on.
        </p>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="project-card">
            <div className="relative w-full h-[200px] mb-4">
              <Image
                src="/projects/tables.png"
                alt="Restaurant Reservation System"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="project-image object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Restaurant Reservation System</h2>
            <p>
              Android app for restaurant booking with Firebase backend.
              Built with <strong>Java</strong> and <strong>Firebase</strong>.
            </p>
            <button
              onClick={() => window.open("https://github.com/itayost/Tables", "_blank")}
              className="mt-4 bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FaGithub /> View on GitHub
              </span>
            </button>
          </div>

          <div className="project-card">
            <div className="relative w-full h-[200px] mb-4">
              <Image
                src="/projects/foosball.png"
                alt="Foosball Dodge"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="project-image object-cover"
              />
            </div>
            <h2 className="text-lg font-semibold mb-2">Foosball Dodge</h2>
            <p>
              2D arcade-style game in <strong>Unity</strong> using <strong>C#</strong> with power-ups and fast-paced gameplay.
            </p>
            <button
              onClick={() => window.open("https://github.com/itayost/Unity-Idea", "_blank")}
              className="mt-4 bg-blue-600 text-white font-medium px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              <span className="flex items-center gap-2">
                <FaGithub /> View on GitHub
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}