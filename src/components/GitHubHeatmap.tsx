import React, { useState } from 'react';
import { generateRealContributions, type GitHubContributionDay } from '../data/github';

interface GitHubHeatmapProps {
  initialContributions?: GitHubContributionDay[];
}

export default function GitHubHeatmap({ initialContributions }: GitHubHeatmapProps) {
  const [contributions] = useState<GitHubContributionDay[]>(() => 
    initialContributions && initialContributions.length > 0 
      ? initialContributions 
      : generateRealContributions()
  );
  const [hoveredDay, setHoveredDay] = useState<GitHubContributionDay | null>(null);

  // Split into 52 weeks (7 days each)
  const weeks: GitHubContributionDay[][] = [];
  for (let i = 0; i < contributions.length; i += 7) {
    weeks.push(contributions.slice(i, i + 7));
  }

  const totalContributions = contributions.reduce((sum, d) => sum + d.count, 0);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-emerald-200';
      case 2: return 'bg-emerald-400';
      case 3: return 'bg-emerald-600';
      case 4: return 'bg-emerald-800';
      default: return 'bg-neutral-200/80';
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 flex items-center gap-2">
            <span>GitHub Contribution Calendar</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
              {totalContributions} Contributions in the last year
            </span>
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Visualizing code commits, repository pushes, and activity recorded on @rainzone01.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-xs bg-neutral-200"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-200"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-400"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-600"></span>
            <span className="w-3 h-3 rounded-xs bg-emerald-800"></span>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Heatmap Grid Container (Scrollable horizontally on smaller screens) */}
      <div className="overflow-x-auto py-6">
        <div className="inline-flex gap-1.5 min-w-[720px]">
          {weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="flex flex-col gap-1.5">
              {week.map((day) => (
                <div
                  key={day.date}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  className={`w-3 h-3 rounded-xs cursor-pointer transition-transform hover:scale-125 hover:z-10 ${getLevelColor(day.level)}`}
                  title={`${day.count} contributions on ${day.date}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Hover Info Tooltip Bar */}
      <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-600 min-h-[2rem]">
        {hoveredDay ? (
          <div>
            <span className="text-neutral-900 font-bold">{hoveredDay.count} contribution{hoveredDay.count === 1 ? '' : 's'}</span> on{' '}
            <span className="text-neutral-800 font-semibold">{hoveredDay.date}</span>
          </div>
        ) : (
          <div className="text-neutral-400">
            Hover over any day cell to inspect detailed commit activity.
          </div>
        )}
        <div className="text-neutral-400 text-[11px]">
          Calculated across 52 calendar weeks
        </div>
      </div>
    </div>
  );
}
