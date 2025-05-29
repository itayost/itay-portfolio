import { cn } from "@/lib/utils/cn";

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonStylesProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

const baseStyles = "font-medium rounded-full transition-all inline-flex items-center justify-center gap-2";

const variants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md",
  secondary: "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100",
  outline: "border border-current hover:bg-gray-100 dark:hover:bg-gray-800",
  ghost: "hover:bg-gray-100 dark:hover:bg-gray-800"
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-3",
  lg: "px-8 py-4 text-lg"
};

export function getButtonStyles({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className
}: ButtonStylesProps = {}) {
  return cn(
    baseStyles,
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );
}