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

// Generate realistic 52-week contribution data (52 * 7 = 364 days)
export function generateMockContributions(): GitHubContributionDay[] {
  const days: GitHubContributionDay[] = [];
  const today = new Date();
  
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday

    // Higher activity on weekdays
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const rand = Math.random();
    let count = 0;
    let level: 0 | 1 | 2 | 3 | 4 = 0;

    if (isWeekend) {
      if (rand > 0.6) {
        count = Math.floor(Math.random() * 4) + 1;
        level = count > 2 ? 2 : 1;
      }
    } else {
      if (rand > 0.15) {
        count = Math.floor(Math.random() * 9) + 1;
        if (count >= 7) level = 4;
        else if (count >= 5) level = 3;
        else if (count >= 3) level = 2;
        else level = 1;
      }
    }

    days.push({
      date: dateStr,
      count,
      level,
    });
  }

  return days;
}

export const githubProfile = {
  username: "rnznportfolio",
  displayName: "Lorenzon Emmanuel S. Ahorro",
  bio: "Full Stack Web Developer & BSIT Graduate • Building web systems with PHP, Node, React & PostgreSQL",
  publicRepos: 42,
  followers: 320,
  following: 114,
  totalContributionsLastYear: 1482,
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
};

export const githubTopLanguages: GitHubLanguage[] = [
  { name: 'PHP', percentage: 34.2, color: '#777bb4', bytes: 640000 },
  { name: 'TypeScript', percentage: 28.5, color: '#3178c6', bytes: 533000 },
  { name: 'JavaScript', percentage: 18.1, color: '#f7df1e', bytes: 338000 },
  { name: 'SQL', percentage: 11.4, color: '#e38c00', bytes: 213000 },
  { name: 'HTML & CSS', percentage: 7.8, color: '#e34f26', bytes: 145000 },
];

export const githubPinnedRepos: GitHubRepo[] = [
  {
    name: 'bobon-katarungang-pambarangay-system',
    description: 'Barangay justice, dispute mediation, and incident docketing platform for the Municipality of Bobon.',
    url: 'https://github.com/rainzone01/bobon-katarungang-pambarangay-system',
    stars: 84,
    forks: 18,
    language: 'PHP',
    languageColor: '#777bb4',
    isPrivate: false,
    updatedAt: '2 days ago',
    topics: ['php', 'mysql', 'barangay-justice', 'legal-tech', 'tailwind'],
  },
  {
    name: 'bobon-rhu-inventory-system',
    description: 'Medicine stock, pharmaceutical supplies, and patient prescription disbursement ledger for Bobon RHU.',
    url: 'https://github.com/rainzone01/bobon-rhu-inventory-system',
    stars: 96,
    forks: 21,
    language: 'PHP',
    languageColor: '#777bb4',
    isPrivate: false,
    updatedAt: 'Yesterday',
    topics: ['php', 'mysql', 'healthcare', 'inventory-system', 'fifo'],
  },
  {
    name: 'gsm-vcci-queuing-system',
    description: 'High-throughput ticketing, counter routing, and real-time public queuing display for GSM-VCCI.',
    url: 'https://github.com/rainzone01/gsm-vcci-queuing-system',
    stars: 112,
    forks: 24,
    language: 'JavaScript',
    languageColor: '#f7df1e',
    isPrivate: false,
    updatedAt: '3 days ago',
    topics: ['nodejs', 'express', 'queuing-system', 'realtime', 'display'],
  },
  {
    name: 'boarding-house-management-system',
    description: 'Room occupancy tracking, tenant leases, and utility billing platform for rental properties.',
    url: 'https://github.com/rainzone01/boarding-house-management-system',
    stars: 78,
    forks: 15,
    language: 'PHP',
    languageColor: '#777bb4',
    isPrivate: false,
    updatedAt: '1 week ago',
    topics: ['php', 'mysql', 'property-management', 'billing', 'tailwind'],
  },
  {
    name: 'uep-facility-booking-system',
    description: 'Campus venue reservations, schedule conflict prevention, and approval workflow for UEP.',
    url: 'https://github.com/rainzone01/uep-facility-booking-system',
    stars: 142,
    forks: 32,
    language: 'TypeScript',
    languageColor: '#3178c6',
    isPrivate: false,
    updatedAt: '4 days ago',
    topics: ['react', 'nextjs', 'booking-system', 'campus-tech', 'php'],
  },
];

export const githubRecentCommits: GitHubCommit[] = [
  {
    id: 'c8f1a29',
    message: 'feat(docket): add automated Lupon summons letter generation with printable template',
    repo: 'bobon-katarungang-pambarangay-system',
    branch: 'main',
    date: '3 hours ago',
    url: 'https://github.com/rainzone01/bobon-katarungang-pambarangay-system/commit/c8f1a29',
  },
  {
    id: 'b492d11',
    message: 'feat(rhu): implement FIFO batch expiry alerts for vaccine and medicine allocations',
    repo: 'bobon-rhu-inventory-system',
    branch: 'feat/batch-expiry',
    date: 'Yesterday',
    url: 'https://github.com/rainzone01/bobon-rhu-inventory-system/commit/b492d11',
  },
  {
    id: 'f93c72b',
    message: 'perf(queue): optimize counter call dispatch latency to lobby TV displays',
    repo: 'gsm-vcci-queuing-system',
    branch: 'main',
    date: '2 days ago',
    url: 'https://github.com/rainzone01/gsm-vcci-queuing-system/commit/f93c72b',
  },
  {
    id: 'e10884a',
    message: 'fix(schedule): refine overlap conflict boundary check in auditorium reservation engine',
    repo: 'uep-facility-booking-system',
    branch: 'fix/collision-check',
    date: '3 days ago',
    url: 'https://github.com/rainzone01/uep-facility-booking-system/commit/e10884a',
  },
  {
    id: '8a3014e',
    message: 'feat(billing): add water and electric sub-meter proportional utility split calculator',
    repo: 'boarding-house-management-system',
    branch: 'main',
    date: '5 days ago',
    url: 'https://github.com/rainzone01/boarding-house-management-system/commit/8a3014e',
  },
];
