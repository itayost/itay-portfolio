export interface HeaderProps {
  className?: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
}

export interface DesktopNavProps {
  activeSection: string;
  scrolled: boolean;
}