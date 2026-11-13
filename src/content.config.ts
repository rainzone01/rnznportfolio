import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    longDescription: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(0),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    stats: z.record(z.string()).optional(),
    problem: z.string(),
    solution: z.string(),
    features: z.array(z.string()),
    architecture: z.string().optional(),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    companyUrl: z.string().optional(),
    location: z.string(),
    period: z.string(),
    type: z.enum(['work', 'education', 'certification']),
    order: z.number().default(0),
    technologies: z.array(z.string()),
    highlights: z.array(z.string()),
  }),
});

export const collections = { projects, experience };
