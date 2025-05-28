import { 
  FaUser, 
  FaGraduationCap, 
  FaProjectDiagram, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaCode
} from "react-icons/fa";

export type NavItem = {
  id: string;
  label: string;
  icon?: React.ComponentType;
  subItems?: NavSubItem[];
};

export type NavSubItem = {
  id: string;
  label: string;
};

export const NAV_ITEMS: NavItem[] = [
  { 
    id: "about", 
    label: "About",
    icon: FaUser
  },
  { 
    id: "resume", 
    label: "Resume",
    icon: FaGraduationCap
  },
  {
    id: "projects", 
    label: "Projects",
    icon: FaProjectDiagram,
    subItems: [
      { id: "personal-projects", label: "Personal Projects" },
      { id: "academic-projects", label: "Academic Projects" }
    ]
  },
  { 
    id: "contact", 
    label: "Contact",
    icon: FaEnvelope
  },
];

export const FOOTER_NAV_ITEMS = [
  { id: "about", label: "About", icon: FaMapMarkerAlt },
  { id: "resume", label: "Resume", icon: FaGraduationCap },
  { id: "projects", label: "Projects", icon: FaCode },
  { id: "contact", label: "Contact", icon: FaEnvelope }
];

export const SCROLL_OFFSET = -80;
export const SCROLL_DURATION = 500;