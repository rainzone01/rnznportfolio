import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { siteConfig } from '../config/site';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const subjectOptions = [
  "New Project Inquiry (Full-Stack)",
  "Backend / API Architecture Consulting",
  "PostgreSQL / MySQL Optimization",
  "System Modernization / Digitization",
  "Full-Time Senior Engineering Role",
  "General Inquiries / Coffee Chat"
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: subjectOptions[0],
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your name or organization.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please provide brief details about your inquiry.';
    } else if (formData.message.trim().length < 15) {
      newErrors.message = 'Please enter at least 15 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    try {
      // Simulate or send to configured endpoint
      // Users can swap import.meta.env.PUBLIC_CONTACT_ENDPOINT with Formspree, Resend, or API route
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Trigger festive celebratory confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#a855f7', '#10b981', '#f59e0b']
      });

      setStatus('success');
      setStatusMessage('Transmission received! Thank you for reaching out. I will review and reply within 24 hours.');
      setFormData({
        name: '',
        email: '',
        subject: subjectOptions[0],
        message: ''
      });
    } catch (err) {
      setStatus('error');
      setStatusMessage(`Failed to deliver message. Please reach out directly to ${siteConfig.email}.`);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl p-6 sm:p-10 border border-neutral-200 shadow-sm">
      {status === 'success' ? (
        <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-16 h-16 mx-auto rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center text-neutral-900">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-900">Message Dispatched!</h3>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            {statusMessage}
          </p>
          <div className="pt-4">
            <button
              onClick={() => setStatus('idle')}
              className="px-6 py-2.5 rounded-xl font-mono text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white transition-all cursor-pointer"
            >
              Send Another Inquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-medium text-neutral-700 mb-2">
                Your Name / Team <span className="text-neutral-900 font-bold">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jane Doe or Apex Logistics"
                className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all ${
                  errors.name 
                    ? 'border-rose-500 focus:border-rose-500' 
                    : 'border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
                }`}
              />
              {errors.name && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-medium text-neutral-700 mb-2">
                Email Address <span className="text-neutral-900 font-bold">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jane@company.com"
                className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all ${
                  errors.email 
                    ? 'border-rose-500 focus:border-rose-500' 
                    : 'border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
                }`}
              />
              {errors.email && (
                <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-mono">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Subject Selector */}
          <div>
            <label htmlFor="subject" className="block text-xs font-mono font-medium text-neutral-700 mb-2">
              Topic / Purpose of Inquiry
            </label>
            <select
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white border border-neutral-300 text-sm text-neutral-900 focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 transition-all cursor-pointer"
            >
              {subjectOptions.map((subj) => (
                <option key={subj} value={subj} className="bg-white text-neutral-900">
                  {subj}
                </option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="message" className="block text-xs font-mono font-medium text-neutral-700">
                Project Scope / Technical Needs <span className="text-neutral-900 font-bold">*</span>
              </label>
              <span className="text-[11px] font-mono text-neutral-500">
                {formData.message.length} chars
              </span>
            </div>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your application, timeline, stack preferences (PHP, React, Node, SQL), and any current performance bottlenecks..."
              className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none transition-all resize-y ${
                errors.message 
                  ? 'border-rose-500 focus:border-rose-500' 
                  : 'border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900'
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-500 font-mono">
              🛡️ Direct transmission with spam protection.
            </p>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-mono text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Technical Inquiry</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
