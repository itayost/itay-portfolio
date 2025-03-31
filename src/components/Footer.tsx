"use client";
import { FaLinkedin, FaGithub, FaEnvelope, FaChevronUp } from "react-icons/fa";
import { Link as ScrollLink } from "react-scroll";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 pt-12 pb-6 text-gray-800 dark:text-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Itay Ostraich</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A passionate software engineer focused on creating intuitive, efficient, and enjoyable user experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/itayost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl transition"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/itayost"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white text-xl transition"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="mailto:itayost1@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-xl transition"
                aria-label="Email Me"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 list-none">
              {["about", "resume", "projects", "contact"].map((item) => (
                <li key={item}>
                  <ScrollLink
                    to={item}
                    smooth={true}
                    duration={500}
                    offset={-80}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition no-underline capitalize"
                  >
                    {item}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {currentYear} Itay Ostraich. All rights reserved.
          </p>
          
          <ScrollLink
            to="about"
            smooth={true}
            duration={800}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition"
          >
            Back to top <FaChevronUp />
          </ScrollLink>
        </div>
      </div>
    </footer>
  );
}