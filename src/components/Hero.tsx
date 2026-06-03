import { motion } from 'motion/react';
import { ChevronRight, ShieldCheck, Terminal, Heart, Smartphone, ArrowDown } from 'lucide-react';
import MobileSimulator from './MobileSimulator';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-zinc-950 pt-16 md:pt-24 pb-20">
      
      {/* Background Decorative Grid - Custom Tailwind Layout */}
      <div className="absolute inset-0 select-none bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
      
      {/* Glowing Ambient Light Orbs */}
      <div className="absolute top-10 left-1/4 h-72 w-72 rounded-full bg-emerald-500/10 blur-[120px] select-none" />
      <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-teal-500/10 blur-[130px] select-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Core Tagline Area */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24">
          
          {/* Availability Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 px-3.5 py-1.5 text-xs text-emerald-400 font-mono mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>AVAILABLE FOR CLIENT PROJECT BOOKINGS • Q2-Q3 2026</span>
          </motion.div>

          <h1 className="font-sans text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]">
            Premium Mobile Apps <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">
              Built for Your Business
            </span>
          </h1>

          <p className="font-sans text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
            I design and build boutique iOS & Android apps that turn local businesses and retail shops into modern digital outlets. Streamline appointment desks, lock in recurring members, and accept effortless payments with zero stress.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <button
              onClick={() => setActiveTab('portfolio')}
              className="cursor-pointer w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-sm font-bold text-black hover:opacity-95 transition-all shadow-lg shadow-emerald-500/10 hover:scale-[1.01] flex items-center justify-center space-x-2"
            >
              <span>See App Examples</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="cursor-pointer w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 text-sm font-semibold text-white hover:bg-zinc-900 transition-all hover:border-zinc-700 flex items-center justify-center space-x-2"
            >
              <span>Discuss Your App Idea</span>
              <Smartphone className="h-4 w-4 text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Floating Core Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-24 max-w-4xl mx-auto">
          {[
            { metric: '1.5 Years', label: 'App Design Experience' },
            { metric: '15+', label: 'Local Storefront Apps Shipped' },
            { metric: '4.9★', label: 'Client Feedback Score' }
          ].map((stat, i) => (
            <div 
              key={i} 
              className="p-5 rounded-2xl border border-zinc-850 bg-zinc-900/30 backdrop-blur-sm shadow-md flex flex-col justify-between"
            >
              <div className="font-sans text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {stat.metric}
              </div>
              <div className="font-mono text-[11px] text-zinc-500 uppercase mt-2 tracking-widest leading-normal">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Live Device Simulator Playground Section */}
        <div className="border-t border-zinc-900 pt-20 mb-20">
          <MobileSimulator />
        </div>

        {/* Core Expertise Zone */}
        <div className="border-t border-zinc-900 pt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              My Core Capabilities
            </span>
            <h2 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">
              Engineered to make managing your business effortless
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Seamless Ordering & Payments',
                subtitle: 'No high delivery commissions or checkout clutter',
                desc: 'Give your clients a premium 1-click ordering space matching your specific brand aesthetics, integrated seamlessly with Apple Pay and Stripe.',
                items: ['Stripe, Square, & PayPal merchants', 'Native Apple Pay & Google Pay grids', 'Real-time order milestone tracking', 'Digital recipes, items, and menu locks']
              },
              {
                title: 'Frictionless Calendar Schedulers',
                subtitle: 'Automated staff diaries and client reminders',
                desc: 'Discard spreadsheets and reservation booklets. Enable direct reservation diaries that manage stylist chains, classes, or dinner tables.',
                items: ['Active booking conflict protectors', 'Automated Twilio SMS seat logs', 'Trainer or specialist listing sheets', 'Recurring membership subscription portals']
              },
              {
                title: 'Loyalty Boosters & Push Alerts',
                subtitle: 'Keep your neighborhood customers coming back',
                desc: 'Reward repeat patrons directly on their phone screens. Notify nearby users of flash discounts and convert active visitors into Google reviews.',
                items: ['Custom digital loyalty stamp booklets', 'Segmented push alert campaign systems', 'Prompt windows for organic salon reviews', 'Special flash sale drop banner widgets']
              }
            ].map((skill, index) => (
              <div 
                key={index}
                className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/20 flex flex-col justify-between hover:border-zinc-800 transition duration-300"
              >
                <div>
                  <span className="font-mono text-xs text-emerald-500 font-bold">0{index + 1}</span>
                  <h3 className="font-sans text-lg font-bold text-white mt-2 leading-snug">{skill.title}</h3>
                  <p className="font-mono text-[10px] text-zinc-500 uppercase mt-1 tracking-wider leading-relaxed">{skill.subtitle}</p>
                  <p className="font-sans text-sm text-zinc-400 mt-3 leading-relaxed">{skill.desc}</p>
                </div>
                
                <ul className="mt-5 space-y-2 border-t border-zinc-900 pt-4 font-mono text-[11px] text-zinc-400">
                  {skill.items.map((item, id) => (
                    <li key={id} className="flex items-center space-x-2">
                       <span className="h-1 w-1 rounded-full bg-emerald-400" />
                       <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
