"use client";

import { motion } from "framer-motion";
import Button from "../Button";

// Create MotionButton by wrapping the existing Button component
const MotionButton = motion(Button);

MotionButton.displayName = "MotionButton";

export default MotionButton;
export type { ButtonProps as MotionButtonProps } from "../Button";