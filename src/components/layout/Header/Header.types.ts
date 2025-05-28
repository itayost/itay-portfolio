export interface HeaderProps {
  className?: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  isDarkMode: boolean;
}

export interface DesktopNavProps {
  activeSection: string;
  isDarkMode: boolean;
  scrolled: boolean;
}