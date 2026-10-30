import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Shield, ChevronRight, CheckCircle, BarChart3, FileText,
  Bell, Lock, Globe, ArrowRight, Star, Users, Building2,
  Award, Zap, TrendingUp, Menu, X, ExternalLink
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Statistics', href: '#stats' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES = [
  {
    icon: FileText,
    title: 'Smart Application Management',
    desc: 'Submit, track and manage all AICTE applications from a single unified dashboard with real-time status updates.',
    color: '#2457d4',
  },
  {
    icon: Bell,
    title: 'Deadline & Compliance Alerts',
    desc: 'Never miss a submission deadline. Get proactive alerts for compliance requirements, renewals and pending tasks.',
    color: '#10b981',
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    desc: 'Visual dashboards with compliance scores, application progress, and historical performance data.',
    color: '#fbbf24',
  },
  {
    icon: Lock,
    title: 'Secure Document Vault',
    desc: 'Upload and manage all institutional documents in an encrypted, AICTE-compliant secure repository.',
    color: '#a78bfa',
  },
  {
    icon: TrendingUp,
    title: 'Stage-wise Tracking',
    desc: 'Monitor every stage of your application with detailed progress timelines and officer assignments.',
    color: '#f472b6',
  },
  {
    icon: Zap,
    title: 'Instant Notifications',
    desc: 'Get real-time notifications for approvals, rejections, document requests, and system updates.',
    color: '#34d399',
  },
];

const STATS = [
  { label: 'Institutions Registered', value: '11,400+', icon: Building2 },
  { label: 'Applications Processed', value: '2.8L+', icon: FileText },
  { label: 'Compliance Rate', value: '96.2%', icon: Award },
  { label: 'Active Users', value: '45,000+', icon: Users },
];

const TESTIMONIALS = [
  {
    name: 'Dr. Rajesh Sharma',
    role: 'Principal, NIT Trichy',
    text: 'AICTE Sentinel has completely transformed how we manage our approvals. The transparency and tracking system is exceptional.',
    rating: 5,
  },
  {
    name: 'Dr. Priya Menon',
    role: 'Director, Chennai Engineering College',
    text: 'The compliance tracking feature alone saves us countless hours every semester. Highly recommend to all institutions.',
    rating: 5,
  },
  {
    name: 'Prof. Amit Gupta',
    role: 'Registrar, Delhi Technical University',
    text: 'The document management and deadline alerts have ensured we never miss a critical AICTE submission.',
    rating: 5,
  },
];

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-20"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background: i % 3 === 0 ? '#2457d4' : i % 3 === 1 ? '#10b981' : '#6b93f0',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #020818 0%, #060f2e 50%, #0a1840 100%)' }}>

      {/* ── Navbar ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(6,15,46,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(59,110,232,0.2)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2457d4,#10b981)' }}>
              <Shield size={20} color="#fff" />
            </div>
            <div>
              <div className="font-bold text-white text-base leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>AICTE Sentinel</div>
              <div className="text-xs" style={{ color: 'rgba(240,244,255,0.5)' }}>Regulatory Intelligence Platform</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="text-sm font-medium transition-colors duration-200" style={{ color: 'rgba(240,244,255,0.7)' }}
                onMouseEnter={e => e.target.style.color = '#f0f4ff'}
                onMouseLeave={e => e.target.style.color = 'rgba(240,244,255,0.7)'}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="btn-secondary text-sm py-2 px-4" onClick={() => navigate('/login')}>Sign In</button>
            <button className="btn-primary text-sm py-2 px-4" onClick={() => navigate('/register')}>
              Register Institution <ChevronRight size={14} />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2 rounded-lg" style={{ color: '#f0f4ff' }} onClick={() => setMobileOpen(p => !p)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden glass border-t border-blue-900/30 px-4 py-4 space-y-3">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="block text-sm py-2" style={{ color: 'rgba(240,244,255,0.8)' }} onClick={() => setMobileOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              <button className="btn-secondary w-full justify-center" onClick={() => navigate('/login')}>Sign In</button>
              <button className="btn-primary w-full justify-center" onClick={() => navigate('/register')}>Register Institution</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16" id="about">
        <ParticleBackground />

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#2457d4' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl" style={{ background: '#10b981' }} />

        <div className="relative max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(36,87,212,0.15)', border: '1px solid rgba(36,87,212,0.3)' }}>
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium" style={{ color: '#6b93f0' }}>Official AICTE Regulatory Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            <span className="text-white">Empowering Institutions.</span>
            <br />
            <span style={{ background: 'linear-gradient(135deg,#2457d4,#10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Elevating Standards.
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: 'rgba(240,244,255,0.7)', lineHeight: '1.8' }}>
            AICTE Sentinel is India's premier regulatory intelligence platform for technical institutions — 
            streamlining approvals, compliance tracking, and document management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-base py-3 px-8 animate-pulse-glow" onClick={() => navigate('/register')}>
              Register Your Institution <ArrowRight size={18} />
            </button>
            <button className="btn-secondary text-base py-3 px-8" onClick={() => navigate('/login')}>
              Sign In to Portal <ExternalLink size={16} />
            </button>
          </div>

          {/* Trust Bar */}
          <div className="mt-14 flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'rgba(240,244,255,0.5)' }}>
            {['Ministry of Education Endorsed', 'ISO 27001 Certified', 'SSL Secured'].map(t => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle size={14} style={{ color: '#10b981' }} />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section id="stats" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="stat-card text-center">
                <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(36,87,212,0.15)' }}>
                  <s.icon size={24} style={{ color: '#6b93f0' }} />
                </div>
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'Outfit, sans-serif', color: '#f0f4ff' }}>{s.value}</div>
                <div className="text-sm" style={{ color: 'rgba(240,244,255,0.6)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="badge-blue inline-flex mb-4">Platform Features</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Everything You Need in One Place
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'rgba(240,244,255,0.6)' }}>
              A comprehensive suite of tools designed specifically for AICTE-affiliated technical institutions.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="card group cursor-default" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}40` }}>
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,244,255,0.6)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="badge-green inline-flex mb-4">Testimonials</div>
          <h2 className="text-3xl font-bold text-white mb-12" style={{ fontFamily: 'Outfit, sans-serif' }}>Trusted by Leading Institutions</h2>

          <div className="relative min-h-48">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="card absolute inset-0 transition-all duration-500"
                style={{
                  opacity: activeTestimonial === i ? 1 : 0,
                  transform: activeTestimonial === i ? 'translateY(0)' : 'translateY(20px)',
                  pointerEvents: activeTestimonial === i ? 'auto' : 'none',
                }}
              >
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} fill="#fbbf24" style={{ color: '#fbbf24' }} />
                  ))}
                </div>
                <p className="text-base mb-6 italic" style={{ color: 'rgba(240,244,255,0.8)' }}>"{t.text}"</p>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm" style={{ color: 'rgba(240,244,255,0.5)' }}>{t.role}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{ background: i === activeTestimonial ? '#2457d4' : 'rgba(240,244,255,0.2)', width: i === activeTestimonial ? '24px' : '8px' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-12 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0e2154,#122a68)', border: '1px solid rgba(59,110,232,0.3)' }}>
            <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at center, rgba(36,87,212,0.4) 0%, transparent 70%)' }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Ready to Transform Your Institution Management?
              </h2>
              <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(240,244,255,0.7)' }}>
                Join 11,400+ institutions already using AICTE Sentinel for seamless regulatory compliance.
              </p>
              <button className="btn-accent text-base py-3 px-10" onClick={() => navigate('/register')}>
                Get Started — It's Free <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer id="contact" className="border-t py-12 px-4" style={{ borderColor: 'rgba(59,110,232,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2457d4,#10b981)' }}>
                  <Shield size={16} color="#fff" />
                </div>
                <span className="font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>AICTE Sentinel</span>
              </div>
              <p className="text-sm" style={{ color: 'rgba(240,244,255,0.5)' }}>
                India's premier AICTE regulatory intelligence platform for technical institutions.
              </p>
            </div>
            {[
              { title: 'Platform', links: ['Dashboard', 'Applications', 'Documents', 'Compliance'] },
              { title: 'Support', links: ['Help Center', 'User Guide', 'API Docs', 'Contact Us'] },
              { title: 'AICTE', links: ['About AICTE', 'Circulars', 'Regulations', 'Approved Institutes'] },
            ].map(col => (
              <div key={col.title}>
                <div className="font-semibold text-white mb-4 text-sm">{col.title}</div>
                <ul className="space-y-2">
                  {col.links.map(l => (
                    <li key={l}>
                      <a href="#" className="text-sm transition-colors" style={{ color: 'rgba(240,244,255,0.5)' }}
                        onMouseEnter={e => e.target.style.color = '#6b93f0'}
                        onMouseLeave={e => e.target.style.color = 'rgba(240,244,255,0.5)'}
                      >{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(59,110,232,0.1)' }}>
            <p className="text-xs" style={{ color: 'rgba(240,244,255,0.4)' }}>
              © 2024 AICTE Sentinel. All rights reserved. | Ministry of Education, Govt. of India
            </p>
            <div className="flex gap-4">
              {['Privacy Policy', 'Terms of Service', 'Security'].map(l => (
                <a key={l} href="#" className="text-xs" style={{ color: 'rgba(240,244,255,0.4)' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
