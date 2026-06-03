import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import { Smartphone, Mail, Phone, Calendar, ShieldCheck, Terminal, Heart, CircleDot } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-400">

      {/* Hero Header Sticky Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area with Fluid Component Transitions */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            {activeTab === 'home' && <Hero setActiveTab={setActiveTab} />}
            {activeTab === 'portfolio' && <Portfolio />}
            {activeTab === 'services' && <Services />}
            {activeTab === 'testimonials' && <Testimonials />}
            {activeTab === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Digital Engineering Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 text-sm text-zinc-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 mb-8 border-b border-zinc-900">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-emerald-400">
                <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-950/20">
                  <Smartphone className="h-4.5 w-4.5 stroke-[2]" />
                </div>
                <span className="font-sans text-sm font-bold tracking-tight text-white uppercase">
                  Kinetic<span className="text-emerald-400">Logic</span>
                </span>
              </div>
              <p className="font-sans text-xs text-zinc-500 leading-relaxed">
                A premier boutique mobile systems design and high-performance product engineering studio. Shipped worldwide architectures on Swift, Kotlin, and Flutter.
              </p>
            </div>

            {/* Quick Slices */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Engineering Slices
              </h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <button 
                    onClick={() => setActiveTab('home')} 
                    className="hover:text-emerald-400 hover:underline transition cursor-pointer"
                  >
                    Mobile Sandbox Simulator
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('portfolio')} 
                    className="hover:text-emerald-400 hover:underline transition cursor-pointer"
                  >
                    Enterprise Case Portfolios
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('services')} 
                    className="hover:text-emerald-400 hover:underline transition cursor-pointer"
                  >
                    Services & Lifecycle Steps
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveTab('testimonials')} 
                    className="hover:text-emerald-400 hover:underline transition cursor-pointer"
                  >
                    Verified Customer Wall
                  </button>
                </li>
              </ul>
            </div>

            {/* Systems Metrics */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                SLA Targets
              </h4>
              <ul className="space-y-1.5 text-xs font-mono text-zinc-500">
                <li className="flex justify-between">
                  <span>Frame Render Baseline:</span>
                  <span className="text-white">120Hz / 8.3ms</span>
                </li>
                <li className="flex justify-between">
                  <span>SLA Session Crash Target:</span>
                  <span className="text-white">99.9% Core</span>
                </li>
                <li className="flex justify-between">
                  <span>API Link Integrity Checks:</span>
                  <span className="text-emerald-400">Verified</span>
                </li>
                <li className="flex justify-between">
                  <span>Memory Isolation Leak:</span>
                  <span className="text-white">0 Count SLA</span>
                </li>
              </ul>
            </div>

            {/* Secure Sync channels */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                Contact Coordination
              </h4>
              <p className="text-xs text-zinc-500 leading-normal">
                Want to run diagnostics on an existing application cluster or draft mobile designs? Let's brief models directly.
              </p>
              <button
                onClick={() => setActiveTab('contact')}
                className="cursor-pointer inline-flex items-center space-x-1.5 text-xs text-emerald-400 font-mono hover:text-emerald-300 group select-none"
              >
                <span>Draft custom project specs</span>
                <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
              </button>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-650">
            <div>
              &copy; {new Date().getFullYear()} KINETIC LOGIC STUDIO. All engineering rights preserved.
            </div>
            <div className="flex items-center space-x-4">
              <span>GDPR DATA COMPLIANT</span>
              <span>•</span>
              <span>ISO 27001 SECURE</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
