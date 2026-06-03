import { motion } from 'motion/react';
import { Smartphone, Menu, X, Layers, Briefcase, Star, Mail } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Studio', icon: Smartphone },
    { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'testimonials', label: 'Wall of Love', icon: Star },
    { id: 'contact', label: 'Consultation', icon: Mail },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')} 
            className="flex cursor-pointer items-center space-x-3 text-emerald-400 group"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-950/20 transition-all duration-300 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              <Smartphone className="h-5 w-5 stroke-[2] transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-base font-bold tracking-tight text-white">
                KINETIC<span className="text-emerald-400">LOGIC</span>
              </span>
              <span className="font-mono text-[9px] tracking-widest text-[#10b981]/80 uppercase leading-none mt-0.5">
                Independent Developer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive ? 'text-emerald-400 font-semibold' : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
            
            {/* Quick Consultation Button */}
            <button
              id="nav-consult-action"
              onClick={() => setActiveTab('contact')}
              className="ml-4 cursor-pointer relative overflow-hidden group rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 p-px font-semibold shadow-lg shadow-emerald-950/20 transition-all hover:shadow-emerald-500/20 duration-300 hover:scale-[1.02]"
            >
              <span className="flex items-center space-x-1.5 rounded-[11px] bg-zinc-950 px-4 py-1.5 text-xs text-white transition-colors duration-300 group-hover:bg-transparent">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Let's Build</span>
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-2 pb-4 space-y-1"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive ? 'bg-zinc-900 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 px-4">
            <button
              onClick={() => {
                setActiveTab('contact');
                setIsOpen(false);
              }}
              className="flex w-full items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-center text-sm font-semibold text-white shadow-lg"
            >
              <span>Schedule Call</span>
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
