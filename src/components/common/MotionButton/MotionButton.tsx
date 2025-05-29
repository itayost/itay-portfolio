"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { getButtonStyles, ButtonVariant, ButtonSize } from "../Button/styles";

export interface MotionButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const MotionButton = motion(
  forwardRef<HTMLButtonElement, MotionButtonProps>(
    ({ variant, size, fullWidth, className, children, ...props }, ref) => {
      return (
        <button
          ref={ref}
          className={getButtonStyles({ variant, size, fullWidth, className })}
          {...props}
        >
          {children}
        </button>
      );
    }
  )
);

MotionButton.displayName = "MotionButton";

export default MotionButton;