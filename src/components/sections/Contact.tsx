"use client";
import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactSection() {
  return (
    <section id="contact" className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="flex items-center gap-2">
          <FaEnvelope /> Contact
        </h1>
        <p>
          Feel free to reach out if you want to collaborate, have a question, or just want to connect.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div>
            <h3 >Contact Information</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                <FaEnvelope className="text-blue-600 dark:text-blue-400" />
                <a href="mailto:itayost1@gmail.com" className="underline hover:text-blue-800 dark:hover:text-blue-300">
                  itayost1@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                <FaLinkedin className="text-blue-600 dark:text-blue-400" />
                <a
                  href="https://www.linkedin.com/in/itayost"
                  target="_blank"
                  className="underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  linkedin.com/in/itayost
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-800 dark:text-gray-200">
                <FaGithub className="text-blue-600 dark:text-blue-400" />
                <a
                  href="https://github.com/itayost"
                  target="_blank"
                  className="underline hover:text-blue-800 dark:hover:text-blue-300"
                >
                  github.com/itayost
                </a>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}