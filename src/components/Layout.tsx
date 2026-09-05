import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Compass, 
  LayoutDashboard, 
  MessageSquareQuote, 
  Code2, 
  ExternalLink,
  Menu,
  X,
  BookOpen,
  Cpu,
  Building2,
  Users,
  ChevronRight
} from 'lucide-react';
import { BIDVEIL_CONTRACT_CONFIG } from '../utils/contract';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'landing' | 'terminal';
  onTabChange: (tab: 'landing' | 'terminal') => void;
  isConnected: boolean;
  network: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  isConnected,
  network,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId?: string) => {
    setMobileMenuOpen(false);
    if (activeTab !== 'landing') {
      onTabChange('landing');
    }
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-x-hidden">
      {/* Subtle Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="ambient-glow -top-40 -left-40 w-96 h-96 bg-indigo-600/10"></div>
        <div className="ambient-glow top-1/3 -right-40 w-96 h-96 bg-purple-600/10"></div>
        <div className="ambient-glow -bottom-40 left-1/3 w-96 h-96 bg-emerald-600/10"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <header className="border-b border-slate-800/80 bg-[#07090e]/85 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick()}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  Bidveil
                  <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/20">
                    ZK
                  </span>
                </span>
              </div>
            </div>

            {/* Desktop Navigation Menus */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <button 
                onClick={() => handleNavClick('about')}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                About
              </button>

              <button 
                onClick={() => handleNavClick('how-it-works')}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                How it works
              </button>

              <button 
                onClick={() => handleNavClick('feedbacks')}
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                Feedbacks
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                  52
                </span>
              </button>

              <button 
                onClick={() => handleNavClick('docs')}
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                Docs
              </button>
            </nav>

            {/* Top Right Actions */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold badge-emerald">
                <Activity className="w-3 h-3 animate-pulse" />
                {network} Active
              </span>

              {activeTab === 'landing' ? (
                <button
                  onClick={() => onTabChange('terminal')}
                  className="px-4 py-2 rounded-xl saas-button-primary text-xs flex items-center gap-1.5 font-bold shadow-md"
                >
                  <span>Get Started</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={() => onTabChange('landing')}
                  className="px-3.5 py-2 rounded-xl saas-button-secondary text-xs font-semibold"
                >
                  Overview
                </button>
              )}

              {/* Mobile Hamburger Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl px-4 py-4 space-y-3">
              <button
                onClick={() => handleNavClick('about')}
                className="w-full text-left py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2"
              >
                <Building2 className="w-4 h-4 text-indigo-400" />
                About
              </button>

              <button
                onClick={() => handleNavClick('how-it-works')}
                className="w-full text-left py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2"
              >
                <Cpu className="w-4 h-4 text-indigo-400" />
                How it works
              </button>

              <button
                onClick={() => handleNavClick('feedbacks')}
                className="w-full text-left py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <MessageSquareQuote className="w-4 h-4 text-indigo-400" />
                  Feedbacks
                </div>
                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-mono">
                  52
                </span>
              </button>

              <button
                onClick={() => handleNavClick('docs')}
                className="w-full text-left py-2 text-xs font-medium text-slate-300 hover:text-white flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                Docs
              </button>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onTabChange('terminal');
                  }}
                  className="w-full py-2.5 rounded-xl saas-button-primary text-xs font-bold text-center"
                >
                  Get Started (Launch Terminal)
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Main Body */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          {children}
        </main>
      </div>

      {/* Modern SaaS Footer */}
      <footer className="relative z-10 border-t border-slate-800/80 bg-[#07090e]/90 py-10 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm text-slate-200">Bidveil SaaS</span>
              <span className="text-xs text-slate-500">| Midnight Network Preprod</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-400">
              <button onClick={() => handleNavClick('about')} className="hover:text-white transition-colors">About</button>
              <button onClick={() => handleNavClick('how-it-works')} className="hover:text-white transition-colors">How it works</button>
              <button onClick={() => handleNavClick('feedbacks')} className="hover:text-white transition-colors">Feedbacks</button>
              <button onClick={() => handleNavClick('docs')} className="hover:text-white transition-colors">Docs</button>
              <button onClick={() => onTabChange('terminal')} className="hover:text-white transition-colors font-semibold text-indigo-400">Get Started</button>
              <a href="https://x.com/bidveilmain" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                Twitter / X
              </a>
              <a href="https://github.com/xynezakg/Midnight-Xyn" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                <Code2 className="w-3 h-3" /> GitHub
              </a>
            </div>
          </div>

          <div className="text-center text-[11px] text-slate-500 pt-4 border-t border-slate-900">
            © 2026 Bidveil. Built with Compact Language and Midnight.js for the Midnight Builder Challenge on Rise In.
          </div>
        </div>
      </footer>
    </div>
  );
};
