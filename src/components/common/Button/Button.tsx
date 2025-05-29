"use client";

import { forwardRef, ButtonHTMLAttributes } from "react";
import { getButtonStyles, ButtonVariant, ButtonSize } from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    children,
    ...props 
  }, ref) => {
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
);

Button.displayName = "Button";

export default Button;