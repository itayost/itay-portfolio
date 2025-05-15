"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";
import ContactInfoCard from "../ContactInfoCard";
import ConnectCard from "../ConnectCard";
import AnimatedCircles from "../AnimatedCircles";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function ContactSection() {
  return (
    <div id="contact" className="section-wrapper">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        {/* Decorative background elements */}
        <div 
          className="hidden md:block absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10" 
          style={{ backgroundColor: "var(--primary)" }}
        />
        <div 
          className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-10" 
          style={{ backgroundColor: "var(--secondary)" }}
        />
        
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 text-4xl md:text-5xl font-bold mb-2"
        >
          <motion.span 
            whileHover={{ rotate: 15 }}
            className="text-3xl md:text-4xl"
            style={{ color: "var(--primary)" }}
          >
            <FaComments />
          </motion.span> 
          Get in Touch
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg max-w-2xl mb-10"
        >
          Feel free to reach out if you want to collaborate, have a question, or just want to connect. 
          I&apos;m always open to new opportunities and interesting conversations!
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info Card */}
          <ContactInfoCard 
            className="lg:col-span-2" 
            variants={containerVariants} 
          />
          
          {/* Connect Card */}
          <ConnectCard className="lg:col-span-3" />
        </div>
        
        {/* Decorative SVG element */}
        <div className="hidden lg:block absolute -bottom-4 right-8 opacity-50">
          <AnimatedCircles />
        </div>
      </motion.div>
      
    </div>
  );
}
