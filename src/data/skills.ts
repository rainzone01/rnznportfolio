export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Databases' | 'Tools & DevOps';
  proficiency: number; // 0 - 100
  years: number;
  description: string;
  featured: boolean;
  color: string;
  badgeText?: string;
}

export const skillsData: Skill[] = [
  // Frontend
  {
    name: 'JavaScript (ES6+)',
    category: 'Frontend',
    proficiency: 95,
    years: 5,
    description: 'Modern asynchronous patterns, event loops, DOM manipulation, closures, and performance optimization.',
    featured: true,
    color: '#f7df1e',
    badgeText: 'Core'
  },
  {
    name: 'React',
    category: 'Frontend',
    proficiency: 92,
    years: 4,
    description: 'Component lifecycle, hooks, state management, suspense, virtual DOM reconciliation, and React 19 features.',
    featured: true,
    color: '#61dafb',
    badgeText: 'Daily Driver'
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    proficiency: 90,
    years: 3,
    description: 'App Router, React Server Components (RSC), SSR, SSG, streaming, and server actions.',
    featured: true,
    color: '#ffffff',
    badgeText: 'Production'
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    proficiency: 95,
    years: 4,
    description: 'Rapid responsive UI engineering, custom design system tokens, animations, and micro-interactions.',
    featured: true,
    color: '#38bdf8',
    badgeText: 'Preferred'
  },
  {
    name: 'HTML5 & Semantic Web',
    category: 'Frontend',
    proficiency: 98,
    years: 5,
    description: 'Semantic elements, WCAG 2.1 accessibility standards, SEO structured markup, and canvas API.',
    featured: false,
    color: '#e34f26'
  },
  {
    name: 'CSS3 & Modern Layouts',
    category: 'Frontend',
    proficiency: 94,
    years: 5,
    description: 'Flexbox, CSS Grid, container queries, custom properties, keyframe animations, and responsive media.',
    featured: false,
    color: '#1572b6'
  },

  // Backend
  {
    name: 'PHP',
    category: 'Backend',
    proficiency: 92,
    years: 5,
    description: 'Modern PHP 8+, OOP, PDO, strict types, dependency injection, MVC frameworks, and legacy modernization.',
    featured: true,
    color: '#777bb4',
    badgeText: 'Expert'
  },
  {
    name: 'Node.js',
    category: 'Backend',
    proficiency: 90,
    years: 4,
    description: 'Event-driven non-blocking I/O, worker threads, streams, file system pipelines, and cluster management.',
    featured: true,
    color: '#339933',
    badgeText: 'High Throughput'
  },
  {
    name: 'Express.js',
    category: 'Backend',
    proficiency: 92,
    years: 4,
    description: 'REST API design, custom middleware pipelines, authentication gates, rate limiting, and error handling.',
    featured: true,
    color: '#999999',
    badgeText: 'Production Standard'
  },
  {
    name: 'TypeScript',
    category: 'Backend',
    proficiency: 88,
    years: 3,
    description: 'Strict type modeling, generics, utility types, compile-time validation, and full-stack type safety.',
    featured: true,
    color: '#3178c6',
    badgeText: 'Type-Safe'
  },

  // Databases
  {
    name: 'PostgreSQL',
    category: 'Databases',
    proficiency: 90,
    years: 4,
    description: 'Complex joins, JSONB indexing, CTEs, materialized views, window functions, and EXPLAIN ANALYZE tuning.',
    featured: true,
    color: '#4169e1',
    badgeText: 'Primary RDBMS'
  },
  {
    name: 'MySQL',
    category: 'Databases',
    proficiency: 92,
    years: 5,
    description: 'InnoDB storage engine, B-Tree indexes, transactions, replication, stored procedures, and query profiling.',
    featured: true,
    color: '#4479a1',
    badgeText: 'Deep Experience'
  },
  {
    name: 'Redis',
    category: 'Databases',
    proficiency: 82,
    years: 3,
    description: 'In-memory caching, distributed lock coordination, session storage, and pub/sub messaging.',
    featured: false,
    color: '#dc382d'
  },

  // Tools & DevOps
  {
    name: 'Git & GitHub',
    category: 'Tools & DevOps',
    proficiency: 94,
    years: 5,
    description: 'Trunk-based development, rebase workflows, GitHub Actions CI/CD pipelines, and merge reviews.',
    featured: true,
    color: '#f05032'
  },
  {
    name: 'Docker & Containers',
    category: 'Tools & DevOps',
    proficiency: 84,
    years: 3,
    description: 'Multi-stage Dockerfiles, Docker Compose environments, image optimization, and volume mounts.',
    featured: false,
    color: '#2496ed'
  },
  {
    name: 'Linux & Nginx',
    category: 'Tools & DevOps',
    proficiency: 86,
    years: 4,
    description: 'Server provisioning, reverse proxying, SSL/TLS termination, systemd services, and log analysis.',
    featured: false,
    color: '#009639'
  },
  {
    name: 'Postman & REST Testing',
    category: 'Tools & DevOps',
    proficiency: 92,
    years: 5,
    description: 'Automated API integration test collections, mock servers, and contract verification.',
    featured: false,
    color: '#ff6c37'
  }
];

export const skillCategories = ['Frontend', 'Backend', 'Databases', 'Tools & DevOps'] as const;
