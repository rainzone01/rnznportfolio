import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Home, 
  User, 
  FolderGit2, 
  Cpu, 
  Briefcase, 
  Wrench, 
  Github, 
  FileText, 
  Mail, 
  Copy, 
  ExternalLink, 
  X,
  Check
} from 'lucide-react';
import { siteConfig } from '../config/site';

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Navigation' | 'Actions' | 'Socials';
  icon: React.ComponentType<{ className?: string }>;
  handler: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigateTo = (url: string) => {
    setIsOpen(false);
    window.location.href = url;
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const actions: ActionItem[] = [
    { id: 'nav-home', title: 'Home', subtitle: 'Return to landing overview', category: 'Navigation', icon: Home, handler: () => navigateTo('/') },
    { id: 'nav-about', title: 'About Developer', subtitle: 'Bio, terminal, philosophy & fun facts', category: 'Navigation', icon: User, handler: () => navigateTo('/about') },
    { id: 'nav-projects', title: 'Projects Portfolio', subtitle: 'Filterable system catalog & case studies', category: 'Navigation', icon: FolderGit2, handler: () => navigateTo('/projects') },
    { id: 'nav-skills', title: 'Skills & Tech Stack', subtitle: 'Interactive 3D skill sphere & proficiencies', category: 'Navigation', icon: Cpu, handler: () => navigateTo('/skills') },
    { id: 'nav-exp', title: 'Experience & Timeline', subtitle: 'Work history, education & credentials', category: 'Navigation', icon: Briefcase, handler: () => navigateTo('/experience') },
    { id: 'nav-services', title: 'Services & Offerings', subtitle: 'Full-stack engineering & system modernization', category: 'Navigation', icon: Wrench, handler: () => navigateTo('/services') },
    { id: 'nav-resume', title: 'Resume / CV', subtitle: 'Digital curriculum vitae & PDF download', category: 'Navigation', icon: FileText, handler: () => navigateTo('/resume') },
    { id: 'nav-contact', title: 'Contact Me', subtitle: 'Start a project or send an inquiry', category: 'Navigation', icon: Mail, handler: () => navigateTo('/contact') },
    { id: 'act-copy-email', title: copied ? 'Copied to Clipboard!' : 'Copy Email Address', subtitle: siteConfig.email, category: 'Actions', icon: copied ? Check : Copy, handler: copyEmail, shortcut: '↵' },
    { id: 'act-view-github', title: 'Visit GitHub Profile', subtitle: siteConfig.socials.github, category: 'Socials', icon: ExternalLink, handler: () => { window.open(siteConfig.socials.github, '_blank'); setIsOpen(false); } },
    { id: 'act-view-linkedin', title: 'Connect on LinkedIn', subtitle: siteConfig.socials.linkedin, category: 'Socials', icon: ExternalLink, handler: () => { window.open(siteConfig.socials.linkedin, '_blank'); setIsOpen(false); } },
    { id: 'act-view-facebook', title: 'Connect on Facebook', subtitle: siteConfig.socials.facebook, category: 'Socials', icon: ExternalLink, handler: () => { window.open(siteConfig.socials.facebook, '_blank'); setIsOpen(false); } },
  ];

  const filteredActions = actions.filter((item) => {
    const text = `${item.title} ${item.subtitle} ${item.category}`.toLowerCase();
    return text.includes(query.toLowerCase());
  });

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % filteredActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].handler();
      }
    }
  };

  return (
    <>
      {/* Keyboard Trigger Button in Navigation or floating */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-neutral-600 bg-neutral-100 hover:text-neutral-900 hover:bg-neutral-200 border border-neutral-300/80 rounded-lg transition-all shadow-xs"
        title="Open Command Palette (Ctrl+K)"
        aria-label="Open Command Palette"
      >
        <Search className="w-3.5 h-3.5 text-neutral-500" />
        <span className="hidden sm:inline font-sans font-medium text-neutral-700">Search</span>
        <kbd className="px-1.5 py-0.5 text-[10px] bg-white text-neutral-600 rounded border border-neutral-300 shadow-xs">⌘K</kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-neutral-900/40 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-xl bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden font-sans"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Input Header */}
            <div className="flex items-center px-4 py-3.5 border-b border-neutral-200 bg-neutral-50/70">
              <Search className="w-5 h-5 text-neutral-500 mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search pages... (e.g. Projects, PHP, Contact)"
                className="w-full bg-transparent text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 p-1 rounded-md"
                aria-label="Close Command Palette"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List Results */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filteredActions.length === 0 ? (
                <div className="py-8 text-center text-sm text-neutral-400">
                  No matching commands or pages found.
                </div>
              ) : (
                filteredActions.map((action, index) => {
                  const Icon = action.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={action.id}
                      onClick={action.handler}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-neutral-100 border border-neutral-300 text-neutral-900' 
                          : 'text-neutral-700 hover:bg-neutral-50 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-neutral-900 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <div className="text-sm font-medium leading-none text-neutral-900 mb-1">{action.title}</div>
                          <div className="text-xs text-neutral-500 truncate">{action.subtitle}</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200 shrink-0 ml-2">
                        {action.category}
                      </span>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <div className="flex items-center gap-3">
                <span><kbd className="px-1 bg-white border border-neutral-200 rounded shadow-xs">↑↓</kbd> navigate</span>
                <span><kbd className="px-1 bg-white border border-neutral-200 rounded shadow-xs">↵</kbd> select</span>
                <span><kbd className="px-1 bg-white border border-neutral-200 rounded shadow-xs">esc</kbd> close</span>
              </div>
              <span className="text-neutral-400">Jump to page</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
