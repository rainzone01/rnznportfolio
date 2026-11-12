# ⚡ Lorenzon Emmanuel S. Ahorro — Developer Portfolio

A production-grade, highly advanced developer portfolio built with **Astro**, **TypeScript**, **Tailwind CSS**, **React Three Fiber (Three.js)**, **GSAP**, and **Lenis**. Tailored for **Lorenzon Emmanuel S. Ahorro**, Computer Programmer at the Municipality of Bobon and Full-Stack Developer specializing in **PHP, JavaScript, Node.js, Express, React, Next.js, and MySQL**.

---

## 🌟 Architecture & Highlights

- **Static Output with Astro View Transitions**: Blazing fast static HTML with fluid, single-page-app transitions between pages (`<ClientRouter />`).
- **Selective React Islands (`@astrojs/react`)**: Interactive elements and 3D scenes are isolated in lightweight React islands without shipping unnecessary runtime JavaScript.
- **Hero 3D Spatial Scene (`React Three Fiber` + `Drei`)**: Interactive orbital core with floating tech nodes (PHP, React, Next.js, Node, Postgres, MySQL) and mouse parallax, with a static fallback for devices without WebGL or with `prefers-reduced-motion`.
- **Interactive Developer Terminal (CLI)**: Interactive shell in `/about` where users can execute `help`, `whoami`, `skills`, `projects`, `contact`, and `cat bio.txt` with arrow-key history and autocomplete.
- **Interactive 3D Skill Sphere**: Fibonacci-distributed 3D spherical tag cloud in `/skills` running on high-efficiency canvas.
- **Relational ER Diagram & API Flow Simulator**: Visualizes multi-tenant table relationships (`PK`, `FK`, and compound indexing) and simulates an HTTP packet roundtrip with latency telemetry.
- **GitHub Activity Telemetry**: 52-week contribution heatmap, language percentage breakdown, pinned repositories, and recent commit history.
- **Content Collections with Strict Zod Schemas**: Type-safe Markdown content for projects, blog posts, and career milestones.
- **Command Palette (`Ctrl/Cmd + K`)**: Global modal to instantly jump to any route, copy contact details, or trigger shortcuts.
- **Accessible & Performance-First**: WCAG contrast, semantic HTML, Google Lighthouse 95+ target, Open Graph, Twitter Cards, RSS feed (`/rss.xml`), and JSON-LD structured schema.

---

## 🚀 Quickstart

Ensure you have **Node.js 20+** installed.

```bash
# 1. Clone repository and install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build optimized static production bundle in dist/
npm run build

# 4. Preview local production build
npm run preview
```

---

## 📁 Project Structure

```
rnznportfolio/
├── public/                     # Static assets (favicons, robots.txt, resume.pdf)
├── src/
│   ├── config/
│   │   └── site.ts             # 👈 SINGLE SOURCE OF TRUTH (name, bio, email, socials)
│   ├── content/                # Content collections (Markdown files)
│   │   ├── blog/               # Technical blog articles
│   │   ├── experience/         # Career milestones & certifications
│   │   └── projects/           # Flagship system case studies
│   ├── components/
│   │   ├── ApiFlowDiagram.tsx  # Interactive request/response flow simulator
│   │   ├── BackToTop.astro     # Smooth back-to-top button
│   │   ├── CommandPalette.tsx  # Ctrl/Cmd+K quick navigation palette
│   │   ├── ContactForm.tsx     # Animated contact form with confetti & validation
│   │   ├── DatabaseDiagram.tsx # Interactive database ER model
│   │   ├── DeveloperTerminal.tsx # CLI shell on About page
│   │   ├── Footer.astro        # Global footer with live clock & links
│   │   ├── GitHubHeatmap.tsx   # 52-week commit activity heatmap
│   │   ├── Hero3D.tsx          # Three.js / React Three Fiber hero canvas
│   │   ├── Navbar.astro        # Sticky navigation bar with drawer
│   │   ├── ProjectGrid.tsx     # Filterable project cards
│   │   ├── ScrollProgress.astro# Scroll progress indicator
│   │   ├── SEO.astro           # Open Graph, Twitter & JSON-LD schema
│   │   ├── SkillSphere.tsx     # 3D interactive rotating skills canvas
│   │   ├── StatsCounter.astro  # Numerical metrics display
│   │   ├── TechMarquee.astro   # Infinite ticker marquee
│   │   ├── TestimonialsSection.astro # Testimonials from leaders & colleagues
│   │   └── TypewriterHero.tsx  # Dynamic typing effect subtitle
│   │   ├── SkillSphere.tsx     # 3D orbiting skill sphere
│   │   ├── StatsCounter.astro  # Numerical stats counters
│   │   ├── TechMarquee.astro   # Infinite scrolling tech marquee
│   │   ├── TestimonialsSection.astro # Client & lead feedback
│   │   └── TypewriterHero.tsx  # Rotating hero typing animation
│   ├── data/
│   │   ├── github.ts           # GitHub profile, languages, pinned repos & commits
│   │   ├── services.ts         # Service offerings & engineering process steps
│   │   ├── skills.ts           # Categorized proficiencies & years of experience
│   │   └── testimonials.ts     # Realistic client quotes
│   ├── layouts/
│   │   └── BaseLayout.astro    # Global HTML wrapper (Lenis smooth scroll, meta, fonts)
│   ├── pages/
│   │   ├── about.astro         # Bio, photo placeholder, CLI terminal & values
│   │   ├── blog/
│   │   │   ├── index.astro     # Blog archive with reading time & tags
│   │   │   └── [slug].astro    # Single blog post with syntax highlighting
│   │   ├── contact.astro       # Contact form, direct coordinates & FAQs
│   │   ├── experience.astro    # Vertical animated career timeline
│   │   ├── github.astro        # Heatmap, languages chart & repository pins
│   │   ├── index.astro         # Home page with 3D hero & feature showcases
│   │   ├── projects/
│   │   │   ├── index.astro     # Filterable project portfolio grid
│   │   │   └── [slug].astro    # Dynamic case study detail route
│   │   ├── resume.astro        # Printable CV view + PDF download button
│   │   ├── rss.xml.ts          # RSS feed generator
│   │   ├── services.astro      # Services cards & engagement models
│   │   ├── skills.astro        # Skill categories & 3D orbiting sphere
│   │   └── 404.astro           # Cyber terminal error glitch page
│   ├── styles/
│   │   └── global.css          # Tailwind CSS v4, neon accents, scrollbars
│   └── content.config.ts       # Astro Content Collections Zod definitions
├── .env.example                # Environment variables template
├── astro.config.mjs            # Astro configuration with React, Sitemap, and Tailwind
└── package.json
```

---

## ⚙️ Customizing Your Information

### 1. Edit `src/config/site.ts`
All personal details across navigation, footer, hero, and SEO are driven by `src/config/site.ts`:

```typescript
export const siteConfig: SiteConfig = {
  name: "Lorenzon Emmanuel S. Ahorro",
  title: "Lorenzon Emmanuel S. Ahorro | Full Stack Web Developer",
  role: "Full Stack Web Developer",
  email: "ahorrorenzon01@gmail.com",
  phone: "09518205293",
  location: "Bobon, Northern Samar",
  timezone: "UTC+8 (PST)",
  availability: "Available for hire",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/rnznportfolio",
    linkedin: "https://linkedin.com/in/lorenzon-ahorro",
    twitter: "https://x.com/ahorrorenzon",
  },
  // ...
};
```

### 2. Connect Your Contact Form
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set `PUBLIC_CONTACT_ENDPOINT` to your Formspree endpoint, Resend webhook, or custom API route:
```env
PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/your-form-id
```

### 3. Connect Live GitHub Data
In `src/pages/github.astro`, the page currently renders sample data structured in `src/data/github.ts`. To stream live metrics directly from your GitHub profile, provide your `GITHUB_TOKEN` and username in `.env`:
```env
GITHUB_TOKEN=ghp_your_personal_access_token_here
PUBLIC_GITHUB_USERNAME=your-username
```
You can update `src/data/github.ts` to call GitHub's GraphQL API during static builds if desired.

---

## ✍️ Adding Content

### Adding a Project
Create a Markdown file inside `src/content/projects/my-new-project.md`:

```markdown
---
title: "My New Application"
description: "Short 1-line summary for project cards."
longDescription: "Detailed multi-sentence summary for the case study header."
category: "Enterprise Systems"
tags: ["PHP", "MySQL", "React", "Tailwind"]
featured: true
order: 8
liveUrl: "https://demo.example.com"
githubUrl: "https://github.com/your-username/repo"
stats:
  "Users": "10,000+"
  "Response Time": "15ms"
problem: "What problem was the client or system experiencing?"
solution: "How did you engineer the solution?"
features:
  - "Feature 1 with high performance"
  - "Feature 2 with database transaction safety"
architecture: "High-level summary of network and database topology."
---

## Technical Deep Dive
Write your Markdown case study here. Code blocks are automatically syntax highlighted with Shiki!
```

### Adding a Blog Post
Create a Markdown file in `src/content/blog/my-post-title.md`:

```markdown
---
title: "Tuning MySQL InnoDB Buffer Pools for High Throughput"
description: "How to eliminate disk thrashing and achieve 99% buffer cache hit ratios."
pubDate: 2026-11-10
tags: ["MySQL", "Databases", "Performance"]
readingTime: "5 min read"
featured: true
author: "Lorenzon Emmanuel S. Ahorro"
---

Write your article here. Code blocks support syntax highlighting across all languages (SQL, PHP, TS, Bash, etc.).
```

---

## 🚢 Deploying to Production

Because Astro is configured for **static output** (`output: 'static'`), this portfolio can be deployed anywhere with zero server runtime overhead:

### 1. Vercel
1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Vercel will auto-detect Astro and set build command: `npm run build` and output directory: `dist`.

### 2. Netlify
1. Connect repository in [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`

### 3. Cloudflare Pages
1. Connect repository in Cloudflare Pages.
2. Preset: `Astro`
3. Build command: `npm run build`
4. Output directory: `dist`

### 4. Docker / Self-Hosted Nginx
A simple Dockerfile for serving static files:
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📄 License
MIT License. Feel free to use this template for your own developer portfolio!
