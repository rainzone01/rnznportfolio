export interface ServiceOffering {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  accentColor: string;
  technologies: string[];
  deliverables: string[];
  idealFor: string;
}

export const servicesData: ServiceOffering[] = [
  {
    id: 'web-apps',
    title: 'Custom Full-Stack Web Applications',
    tagline: 'End-to-end resilient web apps built for speed, scale, and high conversion.',
    description: 'From interactive SaaS platforms to internal ERP tools, I architect and build complete web applications combining modern React/Next.js client experiences with rock-solid backend engineering.',
    icon: 'Layout',
    accentColor: '#00f0ff',
    technologies: ['React', 'Next.js', 'PHP', 'Node.js', 'Tailwind CSS'],
    deliverables: [
      'Responsive, accessible UI with optimistic state updates',
      'Robust server validation and REST/GraphQL endpoints',
      'Role-based permissions & secure session handling',
      'Production Docker deployment and CI/CD pipelines',
    ],
    idealFor: 'Startups and enterprises launching new customer-facing SaaS products or portals.',
  },
  {
    id: 'apis',
    title: 'High-Throughput REST APIs & Microservices',
    tagline: 'Deterministic, low-latency API architectures engineered for high concurrency.',
    description: 'I design and implement battle-tested REST APIs in Node.js (Express) and modern PHP, complete with rate limiting, comprehensive error handling, JWT auth, and structured telemetry.',
    icon: 'Network',
    accentColor: '#a855f7',
    technologies: ['Node.js', 'Express', 'PHP', 'PostgreSQL', 'Redis'],
    deliverables: [
      'Sub-20ms p95 API response times with connection pooling',
      'Token-bucket rate limiting and DDoS mitigation',
      'Swagger / OpenAPI specification documentation',
      'Automated integration and load-testing suites',
    ],
    idealFor: 'Mobile app backends, external partner integrations, and distributed service communication.',
  },
  {
    id: 'database-design',
    title: 'Database Architecture & Query Optimization',
    tagline: 'Schema normalization, compound indexing, and zero-downtime optimization.',
    description: 'A slow database slows down your entire product. I optimize existing PostgreSQL and MySQL databases, eliminating sequential table scans, resolving deadlock conditions, and architecting scalable schemas.',
    icon: 'Database',
    accentColor: '#10b981',
    technologies: ['PostgreSQL', 'MySQL', 'PgBouncer', 'Redis', 'EXPLAIN ANALYZE'],
    deliverables: [
      'Deep query profiling and custom compound index strategies',
      'Partitioning schemas for multi-million row time-series tables',
      'ACID transaction isolation and row-level locking audits',
      'Automated replication and failover architecture',
    ],
    idealFor: 'Applications suffering from slow page loads, spike timeouts, or growing data volume.',
  },
  {
    id: 'system-digitization',
    title: 'Legacy System Modernization & Digitization',
    tagline: 'Safely transitioning manual paperwork and aging monoliths into cloud platforms.',
    description: 'Transform legacy spreadsheets, paper workflows, and monolithic PHP codebases into sleek modern software using incremental migration patterns that prevent business disruption.',
    icon: 'FileCode2',
    accentColor: '#f59e0b',
    technologies: ['PHP 8+', 'React Islands', 'MySQL', 'Docker', 'REST APIs'],
    deliverables: [
      'Strangler Fig migration roadmap without total rewrites',
      'Clean JSON API extraction from legacy database tables',
      'Automated digital document generation (PDFs with verification QR codes)',
      'Operator training and documentation handover',
    ],
    idealFor: 'Government offices, logistics hubs, clinics, and businesses running on physical paper or legacy systems.',
  },
  {
    id: 'maintenance',
    title: 'Performance Audits & Ongoing Maintenance',
    tagline: 'Keep your web infrastructure secure, lightning fast, and 99.99% available.',
    description: 'Proactive health monitoring, dependency vulnerability patching, SSL/TLS maintenance, performance profiling, and emergency incident response for mission-critical web applications.',
    icon: 'ShieldCheck',
    accentColor: '#f43f5e',
    technologies: ['Linux', 'Nginx', 'Docker', 'GitHub Actions', 'Prometheus'],
    deliverables: [
      'Google Lighthouse 95+ score optimization audits',
      'Security patching for PHP, Node, and database engines',
      'Real-time uptime monitoring and automated alert routing',
      'Database backup integrity testing and recovery drills',
    ],
    idealFor: 'Established businesses that require dedicated, senior-level engineering oversight.',
  },
];

export const processSteps = [
  {
    step: '01',
    title: 'Discovery & System Blueprint',
    description: 'We analyze your business requirements, existing data models, traffic projections, and create a comprehensive technical architecture blueprint.',
  },
  {
    step: '02',
    title: 'Database Schema & API Contracts',
    description: 'We construct normalized, indexed relational schemas and define strict OpenAPI endpoints before building the UI, guaranteeing zero architectural drift.',
  },
  {
    step: '03',
    title: 'Interactive Frontend & React Islands',
    description: 'We build fluid, accessible, high-performance interfaces equipped with optimistic updates, skeleton fallbacks, and intuitive interactions.',
  },
  {
    step: '04',
    title: 'Stress Testing & Performance Benchmarks',
    description: 'We run concurrency load tests, query EXPLAIN verification, and cross-browser accessibility checks to ensure production readiness.',
  },
  {
    step: '05',
    title: 'Deployment & Telemetry Handover',
    description: 'We deploy to modern cloud infrastructure with automated CI/CD, SSL certificates, health monitoring, and documentation.',
  },
];
