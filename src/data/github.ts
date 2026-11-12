export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
  isPrivate: boolean;
  updatedAt: string;
  topics: string[];
}

export interface GitHubCommit {
  id: string;
  message: string;
  repo: string;
  branch: string;
  date: string;
  url: string;
}

export interface GitHubLanguage {
  name: string;
  percentage: number;
  color: string;
  bytes: number;
}

// Generate real 52-week contribution data matching rainzone01's GitHub history
export function generateRealContributions(): GitHubContributionDay[] {
  const days: GitHubContributionDay[] = [];
  const today = new Date();
  
  // Real recorded active contribution dates from GitHub profile @rainzone01
  const realActiveDays: Record<string, { count: number; level: 0 | 1 | 2 | 3 | 4 }> = {
    '2026-11-12': { count: 4, level: 4 },
    '2025-02-23': { count: 1, level: 2 },
    '2024-12-20': { count: 3, level: 3 },
    '2024-09-13': { count: 1, level: 2 },
  };

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const match = realActiveDays[dateStr];

    days.push({
      date: dateStr,
      count: match ? match.count : 0,
      level: match ? match.level : 0,
    });
  }

  return days;
}

// Real GitHub profile data for @rainzone01
export const githubProfile = {
  username: "rainzone01",
  displayName: "Lorenzon Emmanuel S. Ahorro",
  bio: "Full Stack Web Developer & Computer Programmer at the Municipality of Bobon. BSIT Graduate from the University of Eastern Philippines.",
  location: "Northern Samar, Philippines",
  publicRepos: 5,
  followers: 0,
  following: 0,
  totalContributionsLastYear: 9,
  avatarUrl: "https://avatars.githubusercontent.com/u/181438433?v=4",
  profileUrl: "https://github.com/rainzone01",
  memberSince: "September 2024",
};

// Real languages calculated from byte counts across rainzone01's repositories
export const githubTopLanguages: GitHubLanguage[] = [
  { name: 'TypeScript', percentage: 51.1, color: '#3178c6', bytes: 382535 },
  { name: 'Astro', percentage: 15.4, color: '#ff5a03', bytes: 115429 },
  { name: 'PHP', percentage: 15.3, color: '#777bb4', bytes: 114713 },
  { name: 'Blade', percentage: 13.1, color: '#f05340', bytes: 98206 },
  { name: 'CSS', percentage: 4.5, color: '#563d7c', bytes: 33307 },
  { name: 'JavaScript', percentage: 1.3, color: '#f7df1e', bytes: 9813 },
];

// Real public repositories on @rainzone01
export const githubPinnedRepos: GitHubRepo[] = [
  {
    name: 'rnznportfolio',
    description: 'Production developer portfolio website built with Astro, TypeScript, Tailwind CSS, React Three Fiber, GSAP & Lenis.',
    url: 'https://github.com/rainzone01/rnznportfolio',
    stars: 0,
    forks: 0,
    language: 'Astro',
    languageColor: '#ff5a03',
    isPrivate: false,
    updatedAt: 'Today',
    topics: ['astro', 'typescript', 'tailwind', 'threejs', 'portfolio', 'react'],
  },
  {
    name: 'BHMS',
    description: 'Boarding House Management System: Room occupancy tracking, tenant leases, and utility billing platform.',
    url: 'https://github.com/rainzone01/BHMS',
    stars: 0,
    forks: 0,
    language: 'PHP',
    languageColor: '#777bb4',
    isPrivate: false,
    updatedAt: 'Today',
    topics: ['php', 'mysql', 'property-management', 'boarding-house', 'billing'],
  },
  {
    name: 'GSM-VCCI-Distribution-System',
    description: 'Queuing, ticket routing, and waiting room display distribution system for GSM-VCCI.',
    url: 'https://github.com/rainzone01/GSM-VCCI-Distribution-System',
    stars: 0,
    forks: 0,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    isPrivate: false,
    updatedAt: 'Today',
    topics: ['javascript', 'express', 'queuing-system', 'realtime', 'display'],
  },
  {
    name: 'UEPvetsystem',
    description: 'University of Eastern Philippines Veterinary Clinic Information & Animal Patient Record System.',
    url: 'https://github.com/rainzone01/UEPvetsystem',
    stars: 0,
    forks: 0,
    language: 'PHP',
    languageColor: '#777bb4',
    isPrivate: false,
    updatedAt: 'Dec 2024',
    topics: ['php', 'blade', 'mysql', 'university', 'veterinary'],
  },
  {
    name: 'horizon-ui-chakra-nextjs',
    description: 'Horizon UI NextJS: Trendiest and innovative open source admin dashboard template built with Chakra UI & React.',
    url: 'https://github.com/rainzone01/horizon-ui-chakra-nextjs',
    stars: 0,
    forks: 0,
    language: 'TypeScript',
    languageColor: '#3178c6',
    isPrivate: false,
    updatedAt: 'Feb 2025',
    topics: ['typescript', 'nextjs', 'react', 'chakra-ui', 'dashboard'],
  },
];

// Real commits from @rainzone01's repositories
export const githubRecentCommits: GitHubCommit[] = [
  {
    id: 'f2c7f72',
    message: 'feat: complete developer portfolio for Lorenzon Emmanuel S. Ahorro',
    repo: 'rnznportfolio',
    branch: 'main',
    date: 'Today',
    url: 'https://github.com/rainzone01/rnznportfolio/commit/f2c7f72',
  },
  {
    id: '12ec4d9',
    message: 'Hello perd',
    repo: 'horizon-ui-chakra-nextjs',
    branch: 'main',
    date: 'Feb 23, 2025',
    url: 'https://github.com/rainzone01/horizon-ui-chakra-nextjs/commit/12ec4d9',
  },
  {
    id: '1b2caaa',
    message: 'Add files via upload',
    repo: 'UEPvetsystem',
    branch: 'master',
    date: 'Dec 20, 2024',
    url: 'https://github.com/rainzone01/UEPvetsystem/commit/1b2caaa',
  },
  {
    id: 'a90f963',
    message: 'Your commit message',
    repo: 'UEPvetsystem',
    branch: 'master',
    date: 'Dec 20, 2024',
    url: 'https://github.com/rainzone01/UEPvetsystem/commit/a90f963',
  },
];
