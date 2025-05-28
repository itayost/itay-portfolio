"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaComments } from "react-icons/fa";
import ContactInfoCard from "./ContactInfoCard";
import ConnectCard from "./ConnectCard";
import AnimatedCircles from "@/components/ui/AnimatedCircles";
import { fadeInUp, staggerContainer } from "@/lib/utils/animations";

export default function ContactSection() {
  return (
    <section id="contact" className="section-wrapper">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="relative"
      >
        <DecorativeBackground />
        
        <ContactHeader />
        <ContactIntro />
        <ContactCards />
        
        <DecorativeCircles />
      </motion.div>
    </section>
  );
}

// Decorative Background Component
function DecorativeBackground() {
  return (
    <>
      <div 
        className="hidden md:block absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10" 
        style={{ backgroundColor: "var(--primary)" }}
      />
      <div 
        className="hidden md:block absolute -bottom-20 -left-20 w-60 h-60 rounded-full blur-3xl opacity-10" 
        style={{ backgroundColor: "var(--secondary)" }}
      />
    </>
  );
}

// Contact Header Component
function ContactHeader() {
  return (
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
  );
}

// Contact Intro Component
function ContactIntro() {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="text-lg max-w-2xl mb-10 text-gray-600 dark:text-gray-400"
    >
      Feel free to reach out if you want to collaborate, have a question, or just want to connect. 
      I&apos;m always open to new opportunities and interesting conversations!
    </motion.p>
  );
}

// Contact Cards Component
function ContactCards() {
  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <ContactInfoCard className="lg:col-span-2" />
      <ConnectCard className="lg:col-span-3" />
    </motion.div>
  );
}

// Decorative Circles Component
function DecorativeCircles() {
  return (
    <div className="hidden lg:block absolute -bottom-4 right-8 opacity-50">
      <AnimatedCircles />
    </div>
  );
}