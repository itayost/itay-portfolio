"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function LocationVisual() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="mt-16 rounded-2xl overflow-hidden h-64 shadow-lg"
      style={{ 
        backgroundColor: "var(--card-bg)", 
        borderColor: "var(--border)" 
      }}
    >
      <div className="w-full h-full relative">
        {/* Stylized location visualization */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <div 
                className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: "var(--primary)" }}
              >
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <h3 className="text-xl font-medium">Ramat Gan, Israel</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Software Engineering Student</p>
            </div>
          </div>
          
          <BackgroundElements />
        </div>
      </div>
    </motion.div>
  );
}

// Background decorative elements
function BackgroundElements() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {/* Gradient blobs */}
      <div 
        className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full" 
        style={{ backgroundColor: "var(--primary)", filter: 'blur(40px)' }}
      />
      <div 
        className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full" 
        style={{ backgroundColor: "var(--secondary)", filter: 'blur(35px)' }}
      />
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4">
        {[...Array(24)].map((_, index) => (
          <div key={index} className="border border-gray-400/20" />
        ))}
      </div>
    </div>
  );
}
