/**
 * Site Configuration
 * 
 * Central configuration for Lorenzon Emmanuel S. Ahorro's portfolio.
 * All components across the portfolio reference this single file.
 */

export interface SiteConfig {
  name: string;
  title: string;
  role: string;
  tagline: string;
  bio: string;
  aboutTeaser: string;
  email: string;
  phone: string;
  location: string;
  timezone: string;
  availability: 'Available for hire' | 'Open to opportunities' | 'Booked';
  resumeUrl: string;
  siteUrl: string;
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
  stats: {
    yearsExperience: number;
    completedProjects: number;
    gitCommits: number;
    cupsOfCoffee: number;
    happyClients: number;
  };
  navLinks: Array<{ label: string; href: string; icon?: string }>;
}

export const siteConfig: SiteConfig = {
  name: "Lorenzon Emmanuel S. Ahorro",
  title: "Lorenzon Emmanuel S. Ahorro | Full Stack Web Developer",
  role: "Full Stack Web Developer",
  tagline: "Computer Programmer at Municipality of Bobon & Full Stack Web Developer. Building resilient web systems with Next.js, Express, PHP & MySQL.",
  bio: "A dedicated Computer Programmer and Full Stack Web Developer based in Bobon, Northern Samar. BSIT graduate from the University of Eastern Philippines with proven experience developing real-world government and institutional systems (HRIS, Faculty Attendance, RHU Inventory, Katarungang Pambarangay) using Next.js, Express, PHP, and MySQL.",
  aboutTeaser: "I bridge the gap between robust backend systems and fluid, intuitive user interfaces. From municipal digitization and institutional attendance portals to responsive Next.js frontend modules and Express/PHP backends.",
  email: "ahorrorenzon01@gmail.com",
  phone: "09518205293",
  location: "Bobon, Northern Samar",
  timezone: "UTC+8 (PST)",
  availability: "Available for hire",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://rnznportfolio.dev",
  socials: {
    github: "https://github.com/rainzone01",
    linkedin: "https://www.linkedin.com/in/rainzone01",
    twitter: "https://x.com/ahorrorenzon",
    facebook: "https://www.facebook.com/rulinzun",
    instagram: "https://instagram.com/ahorrorenzon",
  },
  stats: {
    yearsExperience: 3,
    completedProjects: 5,
    gitCommits: 1420,
    cupsOfCoffee: 850,
    happyClients: 12,
  },
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Skills", href: "/skills" },
    { label: "Experience", href: "/experience" },
    { label: "Services", href: "/services" },
    { label: "GitHub", href: "/github" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
};
