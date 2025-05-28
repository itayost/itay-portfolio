"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Project } from "@/types/project";
import { useKeyboard } from "@/hooks/useKeyboard";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
  allProjects: Project[];
}

export default function ProjectDetailModal({ project, onClose, allProjects }: ProjectDetailModalProps) {
  const [currentProject, setCurrentProject] = useState<Project>(project);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'challenges'>('overview');

  // Get current project index
  const currentIndex = allProjects.findIndex(p => p.id === currentProject.id);
  
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Navigate to previous project
  const navigatePrevious = () => {
    if (currentIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection('left');
      setTimeout(() => {
        setCurrentProject(allProjects[currentIndex - 1]);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Navigate to next project
  const navigateNext = () => {
    if (currentIndex < allProjects.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection('right');
      setTimeout(() => {
        setCurrentProject(allProjects[currentIndex + 1]);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Use keyboard shortcuts
  useKeyboard('Escape', onClose);
  useKeyboard('ArrowLeft', navigatePrevious);
  useKeyboard('ArrowRight', navigateNext);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative rounded-xl overflow-hidden max-w-5xl w-full max-h-[90vh] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--card-bg)',
          color: 'var(--foreground)'
        }}
      >
        {/* Header with navigation */}
        <div className="flex items-center justify-between p-4" style={{ 
          borderBottom: '1px solid var(--border)'
        }}>
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={navigatePrevious}
              disabled={currentIndex === 0}
              className={`rounded-full p-2`}
              aria-label="Previous project"
              style={{
                color: currentIndex === 0 ? 'var(--muted)' : 'var(--foreground)',
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer'
              }}
            >
              <FaChevronLeft size={16} />
            </motion.button>
            
            <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
              {currentIndex + 1} / {allProjects.length}
            </h2>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={navigateNext}
              disabled={currentIndex === allProjects.length - 1}
              className={`rounded-full p-2`}
              aria-label="Next project"
              style={{
                color: currentIndex === allProjects.length - 1 ? 'var(--muted)' : 'var(--foreground)',
                cursor: currentIndex === allProjects.length - 1 ? 'not-allowed' : 'pointer'
              }}
            >
              <FaChevronRight size={16} />
            </motion.button>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full p-2"
            onClick={onClose}
            aria-label="Close modal"
            style={{ color: 'var(--foreground)' }}
          >
            <FaTimes size={20} />
          </motion.button>
        </div>
        
        <div className="overflow-y-auto flex-grow modal-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ 
                opacity: 0, 
                x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0 
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ 
                opacity: 0, 
                x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0 
              }}
              transition={{ type: "spring", damping: 25 }}
              className="p-6"
            >
              {/* Project content */}
              <div className="relative w-full h-[400px] mb-6 rounded-xl overflow-hidden group">
                <Image
                  src={currentProject.imageUrl}
                  alt={currentProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-3xl font-bold text-white mb-2">{currentProject.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1 bg-black/30 backdrop-blur-sm text-white rounded-full text-sm border border-white/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tabs navigation */}
              <div className="mb-6" style={{ borderBottom: '1px solid var(--border)' }}>
                <nav className="flex space-x-8">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className="py-4 font-medium text-sm border-b-2 transition-colors"
                    style={{
                      borderBottomColor: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
                      color: activeTab === 'overview' ? 'var(--primary)' : 'var(--muted)'
                    }}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('features')}
                    className="py-4 font-medium text-sm border-b-2 transition-colors"
                    style={{
                      borderBottomColor: activeTab === 'features' ? 'var(--primary)' : 'transparent',
                      color: activeTab === 'features' ? 'var(--primary)' : 'var(--muted)'
                    }}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setActiveTab('challenges')}
                    className="py-4 font-medium text-sm border-b-2 transition-colors"
                    style={{
                      borderBottomColor: activeTab === 'challenges' ? 'var(--primary)' : 'transparent',
                      color: activeTab === 'challenges' ? 'var(--primary)' : 'var(--muted)'
                    }}
                  >
                    Challenges & Solutions
                  </button>
                </nav>
              </div>
              
              {/* Tab content */}
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                  >
                    <p className="text-lg leading-relaxed" style={{ color: 'var(--foreground)' }}>
                      {currentProject.fullDescription}
                    </p>
                  </motion.div>
                )}
                
                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                  >
                    <ul className="space-y-3">
                      {currentProject.features.map((feature, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start"
                        >
                          <span 
                            className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 mt-0.5"
                            style={{ 
                              background: 'var(--primary)',
                              color: 'var(--card-bg)'
                            }}
                          >
                            {index + 1}
                          </span>
                          <span style={{ color: 'var(--foreground)' }}>{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
                
                {activeTab === 'challenges' && (
                  <motion.div
                    key="challenges"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mb-6"
                  >
                    <ul className="space-y-6">
                      {currentProject.challenges.map((challenge, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg"
                          style={{ 
                            border: '1px solid var(--border)',
                            background: 'var(--background)'
                          }}
                        >
                          <h4 className="font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                            Challenge {index + 1}:
                          </h4>
                          <p style={{ color: 'var(--muted)' }}>{challenge}</p>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                {currentProject.githubUrl && (
                  <motion.a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-medium px-6 py-3 rounded-full border shadow-sm"
                    style={{ 
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                      backgroundColor: 'var(--card-bg)' 
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -2, 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      color: 'var(--primary)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaGithub size={18} /> View on GitHub
                  </motion.a>
                )}

                {currentProject.liveUrl && (
                  <motion.a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-medium px-6 py-3 rounded-full border shadow-sm"
                    style={{ 
                      borderColor: 'var(--border)',
                      color: 'var(--foreground)',
                      backgroundColor: 'var(--card-bg)' 
                    }}
                    whileHover={{ 
                      scale: 1.03, 
                      y: -2, 
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      color: 'var(--primary)'
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaExternalLinkAlt size={16} /> Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}