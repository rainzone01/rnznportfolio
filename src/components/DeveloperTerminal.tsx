import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send } from 'lucide-react';
import { siteConfig } from '../config/site';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error' | 'system';
  text: string | React.ReactNode;
}

export default function DeveloperTerminal() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'system',
      text: `Terminal v2.5 (Lorenzon OS • Linux x86_64)\nType 'help' to see available commands or click the suggestion buttons below.`
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasMounted = useRef(false);

  // Scroll ONLY the terminal inner container, never the window
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add user command to log
    const cmdLine: TerminalLine = {
      id: `cmd-${Date.now()}`,
      type: 'command',
      text: trimmed,
    };

    let response: TerminalLine;

    switch (trimmed) {
      case 'help':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-neutral-300">
              <p className="text-white font-bold">AVAILABLE COMMANDS:</p>
              <p><span className="text-neutral-200 font-mono font-semibold">whoami</span> - Display developer persona, degree, location, status</p>
              <p><span className="text-neutral-200 font-mono font-semibold">experience</span> - View career journey: Municipality of Bobon &amp; UEP ICT Office</p>
              <p><span className="text-neutral-200 font-mono font-semibold">education</span> - View degree (BSIT graduate) and academic highlights</p>
              <p><span className="text-neutral-200 font-mono font-semibold">skills</span> - Inspect primary languages, frameworks, and databases</p>
              <p><span className="text-neutral-200 font-mono font-semibold">projects</span> - View flagship applications and case studies</p>
              <p><span className="text-neutral-200 font-mono font-semibold">contact</span> - Retrieve email, phone number, location, and socials</p>
              <p><span className="text-neutral-200 font-mono font-semibold">cat bio.txt</span> - Read full engineering journey and background</p>
              <p><span className="text-neutral-200 font-mono font-semibold">clear</span> - Clear terminal screen</p>
              <p><span className="text-neutral-200 font-mono font-semibold">sudo</span> - Test elevated permissions (Easter egg)</p>
            </div>
          )
        };
        break;

      case 'whoami':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-neutral-300">
              <p><span className="text-white font-bold">Name:</span> {siteConfig.name}</p>
              <p><span className="text-white font-bold">Current Role:</span> Computer Programmer (Municipality of Bobon) &amp; Full Stack Web Developer</p>
              <p><span className="text-white font-bold">Degree:</span> Bachelor of Science in Information Technology (BSIT) Graduate</p>
              <p><span className="text-white font-bold">Location:</span> {siteConfig.location}, Philippines</p>
              <p><span className="text-white font-bold">Status:</span> <span className="text-emerald-400 font-semibold">{siteConfig.availability}</span></p>
              <p className="text-neutral-400 text-xs mt-1 leading-relaxed">{siteConfig.bio}</p>
            </div>
          )
        };
        break;

      case 'experience':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2.5 text-neutral-300">
              <p className="text-white font-bold">WORK EXPERIENCE &amp; CAREER TIMELINE:</p>
              <div className="border-l-2 border-emerald-400 pl-3 space-y-0.5">
                <p className="text-white font-semibold">Computer Programmer</p>
                <p className="text-xs text-neutral-400">Municipality of Bobon (LGU) • Mid October 2026 - Present</p>
                <p className="text-xs text-neutral-300">Digitizing municipal systems (Katarungang Pambarangay, RHU inventory) &amp; IT technical support.</p>
              </div>
              <div className="border-l-2 border-neutral-400 pl-3 space-y-0.5">
                <p className="text-white font-semibold">Student Intern (ICT Office)</p>
                <p className="text-xs text-neutral-400">University of Eastern Philippines • February 2026 - June 2026</p>
                <p className="text-xs text-neutral-300">Contributed to Faculty Attendance System, IT assistance to UEP staff, and office administration.</p>
              </div>
              <div className="border-l-2 border-neutral-500 pl-3 space-y-0.5">
                <p className="text-white font-semibold">Student Assistant (Software Development)</p>
                <p className="text-xs text-neutral-400">University of Eastern Philippines ICT Office • 2024 - 2025</p>
                <p className="text-xs text-neutral-300">HRIS development: frontend modules with Next.js/Tailwind &amp; backend services with Express.js.</p>
              </div>
            </div>
          )
        };
        break;

      case 'education':
      case 'bsit':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1.5 text-neutral-300">
              <p className="text-emerald-400 font-bold">ACADEMIC CREDENTIAL:</p>
              <p className="font-semibold text-white">Bachelor of Science in Information Technology (BSIT)</p>
              <p className="text-xs text-neutral-400">University of Eastern Philippines • Northern Samar, Philippines</p>
              <ul className="text-xs text-neutral-300 space-y-1 pt-1 list-disc pl-4">
                <li>Major coursework in Web Systems Development, Relational Database Design, and Network Architecture.</li>
                <li>Hands-on practical development with PHP, MySQL, JavaScript, HTML/CSS, and system analysis.</li>
                <li>Lead developer on full-stack capstone web portal project.</li>
              </ul>
            </div>
          )
        };
        break;

      case 'skills':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2 text-neutral-300">
              <p className="text-white font-bold">CORE TECHNICAL ARSENAL:</p>
              <div>
                <span className="text-emerald-400 font-semibold">Languages &amp; Frontend:</span>
                <p className="text-neutral-300 text-xs">PHP, JavaScript (ES6+), React 19, Next.js, HTML5, CSS3, Tailwind CSS</p>
              </div>
              <div>
                <span className="text-neutral-200 font-semibold">Backend &amp; APIs:</span>
                <p className="text-neutral-300 text-xs">Node.js, Express.js, PHP Backend, RESTful API Engineering, Nginx</p>
              </div>
              <div>
                <span className="text-amber-400 font-semibold">Databases &amp; Storage:</span>
                <p className="text-neutral-300 text-xs">PostgreSQL (B-Tree, GIN, CTEs), MySQL (InnoDB, Transactions), Redis</p>
              </div>
            </div>
          )
        };
        break;

      case 'projects':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-neutral-300">
              <p className="text-white font-bold">KEY APPLICATIONS:</p>
              <p>• <a href="/projects/bobon-katarungang-pambarangay-system" className="text-white hover:underline font-semibold">Bobon Katarungang Pambarangay System</a> - Barangay mediation &amp; case docketing</p>
              <p>• <a href="/projects/bobon-rural-health-unit-inventory-system" className="text-white hover:underline font-semibold">Bobon Rural Health Unit Inventory System</a> - Medicine inventory &amp; dispensing</p>
              <p>• <a href="/projects/gsm-vcci-queuing-system" className="text-white hover:underline font-semibold">GSM-VCCI Queuing System</a> - Ticketing &amp; waiting room display system</p>
              <p>• <a href="/projects/boarding-house-management-system" className="text-white hover:underline font-semibold">Boarding House Management System</a> - Tenant occupancy &amp; utility billing</p>
              <p>• <a href="/projects/uep-facility-booking-system" className="text-white hover:underline font-semibold">UEP Facility Booking System</a> - University campus venue reservation</p>
              <p className="text-xs text-neutral-400 mt-1">Visit <a href="/projects" className="text-white hover:underline font-bold">/projects</a> to see all case studies.</p>
            </div>
          )
        };
        break;

      case 'contact':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-1 text-neutral-300">
              <p className="text-white font-bold">DIRECT CONTACT CHANNELS:</p>
              <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-white hover:underline font-semibold">{siteConfig.email}</a></p>
              <p>Phone: <span className="text-neutral-200 font-semibold">{siteConfig.phone}</span></p>
              <p>Location: <span className="text-neutral-200">{siteConfig.location}, Philippines</span></p>
              <p>GitHub: <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:underline">{siteConfig.socials.github}</a></p>
              <p>LinkedIn: <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-neutral-300 hover:underline">{siteConfig.socials.linkedin}</a></p>
            </div>
          )
        };
        break;

      case 'cat bio.txt':
      case 'bio':
        response = {
          id: `res-${Date.now()}`,
          type: 'output',
          text: (
            <div className="space-y-2 text-neutral-300 leading-relaxed text-xs">
              <p className="text-white font-mono font-bold">=== DEVELOPER MEMOIR: LORENZON ===</p>
              <p>
                I am a Full Stack Web Developer and BSIT graduate based in Bobon, Northern Samar. My passion for computing started with learning how data travels from servers to users, eventually leading me to master the core languages of the web: PHP, JavaScript, SQL, and modern reactive libraries.
              </p>
              <p>
                During my Information Technology studies and through real-world client builds, I focused on constructing practical, reliable applications—from transactional inventory platforms and government document portals to high-performance REST APIs.
              </p>
              <p>
                I prioritize clean architecture, strict data validation, normalized database design, and building intuitive user experiences that work seamlessly across desktop and mobile devices.
              </p>
            </div>
          )
        };
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'sudo':
      case 'sudo rm -rf /':
        response = {
          id: `res-${Date.now()}`,
          type: 'error',
          text: "PERMISSION GRANTED: Welcome, Administrator! You have full access to explore Lorenzon's portfolio."
        };
        break;

      default:
        response = {
          id: `res-${Date.now()}`,
          type: 'error',
          text: `Command not found: "${trimmed}". Type 'help' to see valid commands.`
        };
        break;
    }

    setHistory((prev) => [...prev, cmdLine, response]);
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInputVal('');
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandHistory[nextIndex]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[nextIndex]);
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const quickCommands = ['help', 'whoami', 'experience', 'education', 'skills', 'projects', 'contact', 'cat bio.txt', 'clear'];

  return (
    <div className="w-full rounded-2xl bg-neutral-900 border border-neutral-300 shadow-md overflow-hidden font-mono text-sm">
      {/* Terminal Top Window Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-800 border-b border-neutral-700">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-neutral-600"></span>
          <span className="w-3 h-3 rounded-full bg-neutral-600"></span>
          <span className="w-3 h-3 rounded-full bg-neutral-600"></span>
          <span className="text-xs text-neutral-300 font-semibold ml-2 flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-neutral-300" />
            lorenzon@bobon-samar:~$
          </span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-neutral-400">
          <span className="hidden sm:inline">bash 5.2 • online</span>
          <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
        </div>
      </div>

      {/* Quick Suggestion Buttons */}
      <div className="px-4 py-2.5 bg-neutral-800/60 border-b border-neutral-700/80 flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-neutral-400 text-[11px]">Click to run:</span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handleCommand(cmd)}
            className="px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-600 transition-all text-xs font-mono cursor-pointer active:scale-95"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Terminal Output Stream */}
      <div 
        ref={terminalContainerRef}
        className="p-4 sm:p-6 min-h-[300px] max-h-[440px] overflow-y-auto space-y-3 bg-neutral-950"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line) => {
          if (line.type === 'command') {
            return (
              <div key={line.id} className="flex items-center gap-2 text-white font-medium">
                <span className="text-neutral-500 font-bold">&gt;</span>
                <span className="font-semibold">{line.text}</span>
              </div>
            );
          }
          if (line.type === 'system') {
            return (
              <div key={line.id} className="text-neutral-400 text-xs whitespace-pre-line leading-relaxed pb-2">
                {line.text}
              </div>
            );
          }
          if (line.type === 'error') {
            return (
              <div key={line.id} className="text-rose-400 text-xs">
                {line.text}
              </div>
            );
          }
          return (
            <div key={line.id} className="text-neutral-300 text-xs py-1 leading-relaxed">
              {line.text}
            </div>
          );
        })}
      </div>

      {/* Terminal Form Input */}
      <form 
        onSubmit={onSubmit}
        className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-t border-neutral-800"
      >
        <span className="text-neutral-300 font-bold text-xs sm:text-sm">lorenzon:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent text-white focus:outline-none caret-white text-xs sm:text-sm font-mono placeholder:text-neutral-500"
          placeholder="Type 'help' and press Enter..."
        />
        <button
          type="submit"
          className="px-3 py-1 rounded-lg bg-white text-neutral-900 hover:bg-neutral-200 text-xs font-mono font-medium transition-colors flex items-center gap-1 cursor-pointer"
          title="Execute Command"
        >
          <span className="hidden sm:inline">Run</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
}
