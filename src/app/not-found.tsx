"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
          className="text-7xl mb-6 mx-auto text-blue-600 dark:text-blue-400"
        >
          <FaExclamationTriangle />
        </motion.div>
        
        <h1 className="text-5xl font-bold mb-6">404</h1>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors">
          <FaHome /> Return Home
        </Link>
      </motion.div>
    </main>
  );
}