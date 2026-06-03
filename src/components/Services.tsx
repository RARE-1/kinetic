import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { servicesData, lifecycleStepsData } from '../data';
import { Smartphone, Layers, Zap, Cpu, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

export default function Services() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="h-6 w-6 text-emerald-400" />;
      case 'Layers': return <Layers className="h-6 w-6 text-emerald-400" />;
      case 'Zap': return <Zap className="h-6 w-6 text-emerald-400" />;
      case 'Cpu': return <Cpu className="h-6 w-6 text-emerald-400" />;
      default: return <Smartphone className="h-6 w-6 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-zinc-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            Tailor-Made Features & Interactive Deliverables
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1">
            Mobile Apps Designed to Drive Growth
          </h2>
          <p className="font-sans text-base text-zinc-400 mt-3 leading-relaxed">
            I don't build generic templates or copy-paste slow web wrappers. I build gorgeous, elite-quality native iOS & Android applications optimized for what matters most: booking clients, automating orders, and securing recurring visitor loyalty.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {servicesData.map((service, idx) => (
            <div 
              key={service.id}
              className="p-6 rounded-3xl border border-zinc-900 bg-zinc-900/10 hover:bg-zinc-900/25 hover:border-zinc-800 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center">
                    {getServiceIcon(service.icon)}
                  </div>
                  {service.badge && (
                    <span className="font-mono text-[9px] font-bold text-emerald-400 bg-emerald-950/45 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                      {service.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-sans text-xl font-bold text-white mt-5">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-zinc-400 mt-2.5 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Deliverable bullets list */}
              <div className="mt-6 pt-5 border-t border-zinc-900">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-2.5">
                  Core Sprints & Assets Shipped
                </span>
                <ul className="space-y-2.5 text-xs text-zinc-300 font-sans">
                  {service.deliverables.map((dItem, id) => (
                    <li key={id} className="flex items-start space-x-2.5">
                      <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{dItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>

        {/* The Kinetic Lifecycle Timeline Slider */}
        <div className="border-t border-zinc-900 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
            <div>
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
                My Structured Sprint Path
              </span>
              <h3 className="font-sans text-2xl md:text-3xl font-extrabold tracking-tight text-white mt-1">
                Step-by-Step App Launch Path
              </h3>
            </div>
            <p className="font-sans text-sm text-zinc-400 max-w-sm leading-relaxed">
              I divide the building cycles into clear, structured checkpoints, guaranteeing full visual transparency and a completely stress-free deployment to the App Stores.
            </p>
          </div>

          {/* Interactive Navigation Steps Timeline */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-2 bg-zinc-900/30 rounded-2xl border border-zinc-900 mb-8 max-w-4xl mx-auto">
            {lifecycleStepsData.map((step, idx) => {
              const isActive = activeStepIdx === idx;
              return (
                <button
                  key={step.phase}
                  onClick={() => setActiveStepIdx(idx)}
                  className={`p-4 rounded-xl text-left transition duration-250 cursor-pointer ${
                    isActive 
                      ? 'bg-zinc-950 border border-emerald-500/30 shadow-md shadow-emerald-950/10' 
                      : 'hover:bg-zinc-900/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`font-mono text-2xl font-black ${isActive ? 'text-emerald-400 scale-102' : 'text-zinc-700'}`}>
                      {step.phase}
                    </span>
                    <span className="font-mono text-[9px] text-zinc-500 uppercase">{step.duration}</span>
                  </div>
                  <h4 className={`font-sans text-xs font-bold leading-tight mt-2 ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                    {step.title}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Sprints Details display container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStepIdx}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mx-auto max-w-4xl p-6 md:p-8 rounded-3xl border border-zinc-900 bg-zinc-900/20 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-5 gap-8 items-center"
            >
              {/* Highlight phase graphic left */}
              <div className="lg:col-span-2 text-center lg:text-left flex flex-col justify-center items-center lg:items-start border-b lg:border-b-0 lg:border-r border-zinc-900 pb-6 lg:pb-0 lg:pr-8">
                <span className="font-mono text-5xl font-black text-emerald-400/80 animate-pulse">
                  {lifecycleStepsData[activeStepIdx].phase}
                </span>
                <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-2">
                  Sprint Duration Target
                </span>
                <span className="font-sans text-lg font-bold text-white mt-1">
                  {lifecycleStepsData[activeStepIdx].duration}
                </span>
                <div className="flex items-center space-x-1.5 mt-3 px-2 py-1 bg-zinc-950 border border-zinc-850 rounded-lg">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  <span className="font-mono text-[10px] text-zinc-400">Continuous Integration Live</span>
                </div>
              </div>

              {/* Sprints Details content list right */}
              <div className="lg:col-span-3 flex flex-col justify-between h-full space-y-4">
                <div>
                  <h4 className="font-sans text-xl font-bold text-white">
                    {lifecycleStepsData[activeStepIdx].title}
                  </h4>
                  <p className="font-sans text-sm text-zinc-400 mt-2 leading-relaxed">
                    {lifecycleStepsData[activeStepIdx].description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase tracking-wider block">
                    Deliverables & validation logs:
                  </span>
                  {lifecycleStepsData[activeStepIdx].details.map((detail, id) => (
                    <div key={id} className="flex items-center space-x-2.5 text-xs text-zinc-300 font-sans">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
