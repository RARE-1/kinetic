import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { Project } from '../types';
import { ArrowUpRight, Cpu, Clock, CheckCircle, Smartphone, ExternalLink, X, Info } from 'lucide-react';

export default function Portfolio() {
  const [filter, setFilter] = useState<'all' | 'ios' | 'android' | 'cross-platform'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category === filter);

  return (
    <div className="bg-zinc-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-8 border-b border-zinc-900">
          <div>
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              Proven App Case Studies
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1">
              Apps that Deliver Customers & Sales
            </h2>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Showcase Apps' },
              { id: 'ios', label: 'iOS Native' },
              { id: 'android', label: 'Android Native' },
              { id: 'cross-platform', label: 'Cross-Platform' },
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id as any)}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-xl border transition cursor-pointer select-none ${
                  filter === btn.id
                    ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                    : 'border-zinc-850 bg-zinc-900/10 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-90 w-full flex flex-col justify-between hover:border-zinc-800 transition duration-300"
              >
                
                {/* Product visual card graphic */}
                <div className="relative h-60 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-neutral-950/45 group-hover:bg-neutral-950/20 transition-all duration-300 z-10" />
                  <img 
                    referrerPolicy="no-referrer"
                    src={project.image} 
                    alt={project.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  
                  {/* Category Pill Tag Overlay */}
                  <span className="absolute top-4 left-4 z-20 font-mono text-[9px] font-bold text-white uppercase tracking-wider bg-zinc-950/90 py-1.5 px-3 rounded-lg border border-zinc-800 backdrop-blur-sm shadow-md">
                    {project.category}
                  </span>
                </div>

                {/* Info and stats portion */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">{project.client}</span>
                      <span className="font-mono text-xs text-amber-400/80">Premium Client App</span>
                    </div>

                    <h3 className="font-sans text-xl font-bold text-white mt-1 group-hover:text-emerald-400 transition">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-zinc-400 mt-2.5 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="font-mono text-[10px] text-zinc-400 bg-zinc-900/60 px-2.5 py-1 rounded-md border border-zinc-850/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Operational Metrics list */}
                  <div className="grid grid-cols-3 gap-3 border-t border-zinc-900 pt-5 mt-6 bg-zinc-950/20 rounded-xl p-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="text-center">
                        <div className="font-sans text-base font-extrabold text-white tracking-tight">{m.value}</div>
                        <div className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest mt-1 leading-normal">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Draw activation item button */}
                  <div className="mt-5 pt-3 flex justify-between items-center text-xs">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="cursor-pointer font-sans font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 group/btn select-none"
                    >
                      <span>Explore Features & Layouts</span>
                      <ArrowUpRight className="h-3.5 w-3.5 transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </button>
                    <span className="font-mono text-[10px] text-zinc-550 uppercase">Explore Specs</span>
                  </div>

                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Detailed System Specification Slide-out Sheet Drawer */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
              
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black backdrop-blur-sm cursor-pointer"
              />

              {/* Drawer Sheet Body */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="relative w-full max-w-lg md:max-w-xl h-full bg-zinc-950 border-l border-zinc-850 shadow-2xl p-6 md:p-8 overflow-y-auto flex flex-col justify-between z-10"
              >
                <div>
                  {/* Top Header tools */}
                  <div className="flex justify-between items-start mb-6 border-b border-zinc-900 pb-4">
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                        Feature Blueprint & Solutions
                      </span>
                      <h3 className="font-sans text-2xl font-bold text-white mt-1">
                        {selectedProject.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="cursor-pointer p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-900 transition"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Banner image representation */}
                  <div className="h-44 w-full rounded-2xl overflow-hidden mb-6 border border-zinc-900">
                    <img 
                      referrerPolicy="no-referrer"
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="h-full w-full object-cover" 
                    />
                  </div>

                  {/* Challenges and solutions */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest flex items-center space-x-1.5 font-bold mb-2">
                        <Info className="h-3.5 w-3.5 text-zinc-500" />
                        <span>The Brief</span>
                      </h4>
                      <p className="font-sans text-sm text-zinc-350 leading-relaxed bg-zinc-900/30 rounded-xl p-3 border border-zinc-900/60">
                        {selectedProject.detailedDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Challenge segment */}
                      <div className="p-4 rounded-xl border border-zinc-900/80 bg-zinc-900/15">
                        <span className="font-mono text-[9px] font-bold text-rose-400 uppercase tracking-wider block mb-1">
                          THE CLIENT'S NEED
                        </span>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                          {selectedProject.challenges}
                        </p>
                      </div>

                      {/* Solution segment */}
                      <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/5">
                        <span className="font-mono text-[9px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                          HOW I BUILT IT
                        </span>
                        <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                          {selectedProject.solutions}
                        </p>
                      </div>
                    </div>

                    {/* Integrated technology modules */}
                    <div>
                      <h4 className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest flex items-center space-x-1.5 font-bold mb-2.5">
                        <Cpu className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Core Features Packed Inside</span>
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProject.techStack.map((tech, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-xs font-mono text-zinc-400 p-2 rounded bg-zinc-900/40 border border-zinc-850/50">
                            <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                            <span>{tech}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer specs details check */}
                <div className="border-t border-zinc-900 pt-6 mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-center sm:text-left">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">PROJECT STATUS</span>
                    <span className="text-xs text-emerald-400 font-semibold font-sans">Custom designed & launched to Apple/Google stores successfully</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                    }}
                    className="cursor-pointer w-full sm:w-auto px-5 py-2.5 bg-zinc-900 text-white border border-zinc-850 hover:border-zinc-700 font-sans text-xs rounded-xl font-bold transition select-none"
                  >
                    Close Sheet
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
