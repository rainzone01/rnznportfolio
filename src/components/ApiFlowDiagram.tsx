import React, { useState } from 'react';
import { Play, CheckCircle2, Database, Server, Smartphone, Cpu, ArrowRight } from 'lucide-react';

export default function ApiFlowDiagram() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [responseTime, setResponseTime] = useState<number>(14);

  const steps = [
    {
      id: 1,
      title: 'Client Layer',
      subtitle: 'React / Next.js SPA',
      tech: 'GET /api/v1/inventory/items?limit=50',
      icon: Smartphone,
      color: '#00f0ff',
      details: 'Dispatches authenticated request with Bearer JWT token.'
    },
    {
      id: 2,
      title: 'Gateway / Middleware',
      subtitle: 'Express & Nginx Rate Limiter',
      tech: 'Token Bucket: 100 req/min • CORS OK',
      icon: Cpu,
      color: '#a855f7',
      details: 'Validates HMAC signature, checks IP rate limit in Redis cache.'
    },
    {
      id: 3,
      title: 'Application Service',
      subtitle: 'PHP 8.2 / Node.js Engine',
      tech: 'Business Validation & Query Dispatch',
      icon: Server,
      color: '#10b981',
      details: 'Executes atomic transaction logic with prepared parameter bindings.'
    },
    {
      id: 4,
      title: 'Relational Database',
      subtitle: 'PostgreSQL / MySQL InnoDB',
      tech: 'Index Scan on (tenant_id, sku)',
      icon: Database,
      color: '#38bdf8',
      details: 'Uses compound B-Tree index, avoiding sequential table scan.'
    }
  ];

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(1);

    const randomLatency = Math.floor(Math.random() * 8) + 11;
    setResponseTime(randomLatency);

    setTimeout(() => setActiveStep(2), 500);
    setTimeout(() => setActiveStep(3), 1100);
    setTimeout(() => setActiveStep(4), 1700);
    setTimeout(() => {
      setActiveStep(5); // Complete / Returned
      setIsRunning(false);
    }, 2400);
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-neutral-200 shadow-sm">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neutral-900 animate-ping"></span>
            <span className="text-xs font-mono text-neutral-700 uppercase tracking-wider font-semibold">
              Interactive System Architecture
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mt-1">
            Deterministic High-Throughput Request Pipeline
          </h3>
          <p className="text-sm text-neutral-600 mt-1">
            Simulate a live end-to-end transaction from client click to indexed database read.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white disabled:opacity-50 transition-all shadow-xs shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? 'Tracing Packet...' : 'Simulate API Call'}</span>
        </button>
      </div>

      {/* Pipeline Diagram Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-8 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isPassed = activeStep > step.id;
          const isCurrent = activeStep === step.id;

          return (
            <div
              key={step.id}
              className={`relative p-5 rounded-xl border transition-all duration-300 ${
                isCurrent 
                  ? 'bg-neutral-100/80 border-neutral-900 shadow-sm scale-[1.01]' 
                  : isPassed
                  ? 'bg-neutral-50 border-neutral-300 text-neutral-900'
                  : 'bg-white border-neutral-200 text-neutral-700'
              }`}
            >
              {/* Connector arrow on desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-neutral-400 pointer-events-none">
                  <ArrowRight className={`w-5 h-5 ${isPassed ? 'text-neutral-800' : 'text-neutral-300'}`} />
                </div>
              )}

              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-lg border ${isCurrent ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-neutral-100 text-neutral-700 border-neutral-200'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200">
                  Step 0{step.id}
                </span>
              </div>

              <div className="font-semibold text-neutral-900 text-sm">{step.title}</div>
              <div className="text-xs text-neutral-500 mb-2">{step.subtitle}</div>
              <div className="text-[11px] font-mono p-1.5 rounded bg-neutral-100 border border-neutral-200 text-neutral-800 truncate mb-2">
                {step.tech}
              </div>
              <p className="text-[11px] text-neutral-600 leading-relaxed">{step.details}</p>
            </div>
          );
        })}
      </div>

      {/* Telemetry Output Log */}
      <div className="p-4 rounded-xl bg-neutral-100 border border-neutral-200 font-mono text-xs text-neutral-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>HTTP/2 200 OK</span>
          </div>
          <span className="text-neutral-300">|</span>
          <span className="text-neutral-600">Response Size: <span className="text-neutral-900 font-semibold">2.4 KB gzip</span></span>
          <span className="text-neutral-300">|</span>
          <span className="text-neutral-600">Total Latency: <span className="text-neutral-900 font-semibold">{responseTime}ms</span></span>
        </div>
        <div className="text-[11px] text-neutral-500">
          Cache-Control: private, max-age=0, must-revalidate
        </div>
      </div>
    </div>
  );
}
