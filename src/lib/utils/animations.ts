import { Variants } from "framer-motion";

/**
 * Common animation variants for Framer Motion
 */

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5 
    }
  }
};

export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem: Variants = {
  hidden: { 
    y: 20, 
    opacity: 0 
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 100 
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    scale: 0.9, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 20 
    }
  }
};

export const slideInFromLeft: Variants = {
  hidden: { 
    x: -100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 25 
    }
  }
};

export const slideInFromRight: Variants = {
  hidden: { 
    x: 100, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { 
      type: "spring", 
      damping: 25 
    }
  }
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { 
    type: "spring", 
    stiffness: 400, 
    damping: 10 
  }
};

export const tapScale = {
  scale: 0.95
};

// Loading animation
export const loadingRotate = {
  rotate: 360,
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: "linear"
  }
};