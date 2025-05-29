"use client";

import { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { 
  getButtonStyles, 
  getEnhancedButtonStyles, 
  ButtonVariant, 
  ButtonSize, 
  buttonEnhancements 
} from "./styles";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  enhancements?: (keyof typeof buttonEnhancements)[];
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    loading = false,
    disabled,
    leftIcon,
    rightIcon,
    enhancements,
    children,
    ...props 
  }, ref) => {
    // Determine if button is disabled (explicitly disabled or loading)
    const isDisabled = disabled || loading;
    
    // Get appropriate styles based on whether enhancements are used
    const buttonClassName = enhancements?.length 
      ? getEnhancedButtonStyles({ 
          variant, 
          size, 
          fullWidth, 
          loading,
          disabled: isDisabled,
          className,
          enhancements 
        })
      : getButtonStyles({ 
          variant, 
          size, 
          fullWidth, 
          loading,
          disabled: isDisabled,
          className 
        });
    
    // Button content with icons
    const buttonContent = (
      <>
        {leftIcon && !loading && (
          <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        {loading ? (
          <span className="opacity-0">{children}</span>
        ) : (
          children
        )}
        {rightIcon && !loading && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </>
    );
    
    return (
      <button
        ref={ref}
        className={buttonClassName}
        disabled={isDisabled}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

// Example IconButton component using the enhanced Button
export const IconButton = forwardRef<HTMLButtonElement, Omit<ButtonProps, 'children'> & { 
  icon: ReactNode;
  'aria-label': string;
}>(({ icon, size = 'md', ...props }, ref) => {
  // Adjust padding for icon-only buttons
  const iconSizeClasses = {
    xs: 'p-1',
    sm: 'p-1.5',
    md: 'p-2.5',
    lg: 'p-3',
    xl: 'p-4'
  };
  
  return (
    <Button
      ref={ref}
      size={size}
      className={iconSizeClasses[size]}
      {...props}
    >
      {icon}
    </Button>
  );
});

IconButton.displayName = "IconButton";