import React, { useState } from 'react';
import { ExternalLink, Github, ArrowRight, Layers, Database } from 'lucide-react';

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  stats?: Record<string, string>;
}

interface ProjectGridProps {
  projects: ProjectItem[];
}

const filterOptions = [
  'All',
  'PHP',
  'MySQL',
  'JavaScript',
  'Tailwind CSS',
  'Node.js',
  'Express.js',
  'Three.js / WebGL'
];

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredProjects = projects.filter((project) => {
    if (selectedFilter === 'All') return true;
    const filterLower = selectedFilter.toLowerCase();
    return project.tags.some((tag) => {
      const tagLower = tag.toLowerCase();
      if (filterLower.includes('webgl') || filterLower.includes('three')) {
        return tagLower.includes('webgl') || tagLower.includes('three');
      }
      return tagLower === filterLower || tagLower.includes(filterLower) || filterLower.includes(tagLower);
    });
  });

  return (
    <div className="space-y-8">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 pb-4">
        {filterOptions.map((filter) => {
          const isActive = selectedFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-neutral-900 text-white font-medium shadow-xs scale-102'
                  : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-300/80 shadow-2xs'
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl bg-white border border-neutral-200/90 shadow-xs hover:border-neutral-400 hover:shadow-md p-6 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              {/* Top Meta: Category & Featured Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono text-neutral-500 font-semibold tracking-wider uppercase">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-[10px] font-mono font-medium">
                    Featured Core
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-neutral-700 transition-colors mb-2">
                <a href={`/projects/${project.slug}`} className="focus:outline-none">
                  {project.title}
                </a>
              </h3>

              {/* Description */}
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Highlight Stats Pill */}
              {project.stats && (
                <div className="grid grid-cols-2 gap-2 mb-6 p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs font-mono">
                  {Object.entries(project.stats).slice(0, 2).map(([key, val]) => (
                    <div key={key}>
                      <div className="text-neutral-500 text-[10px] truncate">{key}</div>
                      <div className="text-neutral-900 font-semibold truncate">{val}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-neutral-100 border border-neutral-200/80 text-[11px] font-mono text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-mono">
                <a
                  href={`/projects/${project.slug}`}
                  className="flex items-center gap-1.5 text-neutral-900 hover:text-neutral-600 font-semibold transition-colors"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="flex items-center gap-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 hover:text-neutral-900 border border-neutral-300 transition-colors"
                      title="View GitHub Repository"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code ↗</span>
                    </a>
                  ) : (
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono text-neutral-500 bg-neutral-100 border border-neutral-200"
                      title="Internal / Private Organization Repository"
                    >
                      Private Repo
                    </span>
                  )}
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
                      title="Live Demo Application"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-neutral-500 font-mono text-sm">
          No projects found matching the filter "{selectedFilter}".
        </div>
      )}
    </div>
  );
}
