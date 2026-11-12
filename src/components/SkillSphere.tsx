import React, { useEffect, useRef, useState } from 'react';

const skillsList = [
  { name: 'PHP 8+', color: '#777bb4' },
  { name: 'React 19', color: '#61dafb' },
  { name: 'Next.js', color: '#ffffff' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express.js', color: '#999999' },
  { name: 'PostgreSQL', color: '#4169e1' },
  { name: 'MySQL', color: '#4479a1' },
  { name: 'Tailwind CSS', color: '#38bdf8' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'HTML5', color: '#e34f26' },
  { name: 'CSS3', color: '#1572b6' },
  { name: 'Redis', color: '#dc382d' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Git', color: '#f05032' },
  { name: 'Nginx', color: '#009639' },
  { name: 'REST APIs', color: '#00f0ff' },
  { name: 'SQL Tuning', color: '#f59e0b' },
];

export default function SkillSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 400);

    const radius = Math.min(width, height) * 0.42;

    // Distribute tags over a Fibonacci sphere
    const items = skillsList.map((skill, index) => {
      const phi = Math.acos(-1 + (2 * index + 1) / skillsList.length);
      const theta = Math.sqrt(skillsList.length * Math.PI) * phi;
      return {
        ...skill,
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        screenX: 0,
        screenY: 0,
        scale: 1,
      };
    });

    let angleX = 0.003;
    let angleY = 0.003;
    let isMouseDown = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let animationId: number;

    const onMouseDown = (e: MouseEvent) => {
      isMouseDown = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDown) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left - width / 2;
        const my = e.clientY - rect.top - height / 2;
        angleY = mx * 0.00004;
        angleX = -my * 0.00004;
        return;
      }
      const dx = e.clientX - lastMouseX;
      const dy = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      angleY = dx * 0.002;
      angleX = -dy * 0.002;
    };

    const onMouseUp = () => {
      isMouseDown = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const render = () => {
      animationId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      // Rotate around X and Y
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      items.forEach((item) => {
        // Rotate Y
        const x1 = item.x * cosY - item.z * sinY;
        const z1 = item.z * cosY + item.x * sinY;

        // Rotate X
        const y2 = item.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + item.y * sinX;

        item.x = x1;
        item.y = y2;
        item.z = z2;

        const fov = 350;
        const scale = fov / (fov + z2);
        item.scale = scale;
        item.screenX = width / 2 + item.x * scale;
        item.screenY = height / 2 + item.y * scale;
      });

      // Sort by depth (Z)
      items.sort((a, b) => b.scale - a.scale);

      // Draw items
      items.forEach((item) => {
        const alpha = Math.max(0.25, (item.scale - 0.4) * 1.5);
        ctx.save();
        ctx.font = `600 ${Math.floor(12 * item.scale)}px "JetBrains Mono", monospace`;
        ctx.globalAlpha = Math.min(1, alpha);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Background tag capsule
        const textWidth = ctx.measureText(item.name).width;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(
          item.screenX - textWidth / 2 - 8,
          item.screenY - 11 * item.scale,
          textWidth + 16,
          22 * item.scale,
          6
        );
        ctx.fill();

        // Subtle Border
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Text
        ctx.fillStyle = '#1e293b';
        ctx.fillText(item.name, item.screenX, item.screenY);
        ctx.restore();
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center p-4">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[440px] h-[380px] sm:h-[420px] cursor-grab active:cursor-grabbing select-none"
      />
      <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-2 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse"></span>
        <span>Drag or hover to rotate interactive 3D skill sphere</span>
      </div>
    </div>
  );
}
