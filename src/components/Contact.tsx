import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, Calendar, Send, Sparkles, Code, Terminal, Clock, ShieldCheck, ClipboardCheck, Smartphone, MessageCircle } from 'lucide-react';
import { Inquiry } from '../types';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('native-app');
  const [budget, setBudget] = useState('unspecified');
  const [timeline, setTimeline] = useState('unspecified');
  const [description, setDescription] = useState('');
  
  // Local inquiries stack to mock instant persistence
  const [localInquiries, setLocalInquiries] = useState<Inquiry[]>([]);
  const [submittedInquiry, setSubmittedInquiry] = useState<Inquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Dynamic values helper
  const getEstimationStats = () => {
    switch (projectType) {
      case 'native-app':
        return { duration: '4-6 Weeks', team: 'Bespoke Builder', complexity: 'Complete Menu + Ordering', baseRate: '$4,800+' };
      case 'architecture':
        return { duration: '3-4 Weeks', team: 'Bespoke Builder', complexity: 'Calendar diaries + SMS alerts', baseRate: '$3,500+' };
      case 'performance':
        return { duration: '3-5 Weeks', team: 'Bespoke Builder', complexity: 'Member cards + RSVPs', baseRate: '$4,205+' };
      case 'hardware':
        return { duration: '2-4 Weeks', team: 'Bespoke Builder', complexity: 'RETINA catalogs + Apple Pay', baseRate: '$3,800+' };
      default:
        return { duration: 'Flexible', team: 'Bespoke Builder', complexity: 'Flexible Scope', baseRate: 'Contact' };
    }
  };

  const currentEstimates = getEstimationStats();

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !description) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const uniqueId = `KNL-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry: Inquiry = {
      id: uniqueId,
      name,
      email,
      projectType,
      budget,
      timeline,
      description,
      createdAt: new Date().toUTCString(),
    };

    const path = `inquiries/${uniqueId}`;
    try {
      await setDoc(doc(db, 'inquiries', uniqueId), newInquiry);

      setLocalInquiries(prev => [newInquiry, ...prev]);
      setSubmittedInquiry(newInquiry);

      // Clear input fields
      setName('');
      setEmail('');
      setDescription('');
    } catch (error) {
      setSubmitError("Failed to submit inquiry to the cloud database. Please try again later.");
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-950 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Grid */}
        <div className="max-w-3xl mb-16">
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            Project Consultation Desk
          </span>
          <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1">
            Let's Brand Your Business
          </h2>
          <p className="font-sans text-base text-zinc-400 mt-3 leading-relaxed">
            Fill out your concept goals below. Select your desired app pathways and timeline budgets to generate an interactive blueprint outlining our delivery scope.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Interactive Calculator Info Column Left */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              {/* Dynamic Estimates Manifest Card */}
              <div className="rounded-3xl border border-zinc-900 bg-zinc-900/10 p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-emerald-500/10 to-transparent blur-md" />
                
                <h3 className="font-sans text-base font-bold text-white flex items-center space-x-2">
                  <Smartphone className="h-4 w-4 text-emerald-400" />
                  <span>Real-time Scoping Specs</span>
                </h3>
                
                <div className="space-y-4 mt-6">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                    <span className="font-sans text-xs text-zinc-450 uppercase">Service Category</span>
                    <span className="font-mono text-xs text-white font-semibold uppercase">
                      {projectType.replace('-', ' ')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                    <span className="font-sans text-xs text-zinc-450 uppercase">Est. Sprints Duration</span>
                    <span className="font-mono text-xs text-emerald-400 font-bold">
                      {currentEstimates.duration}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                    <span className="font-sans text-xs text-zinc-405 uppercase">Service Format</span>
                    <span className="font-mono text-xs text-white font-semibold">
                      {currentEstimates.team}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-b border-zinc-900 pb-2.5">
                    <span className="font-sans text-xs text-zinc-405 uppercase">App Scope Deliverable</span>
                    <span className="font-mono text-[10px] text-zinc-200 font-medium">
                      {currentEstimates.complexity}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs text-zinc-450 uppercase">Indicative Rate Bounds</span>
                    <span className="font-mono text-sm text-emerald-400 font-bold bg-emerald-950/20 px-2 py-0.5 rounded border border-emerald-500/10">
                      {currentEstimates.baseRate}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-900 font-mono text-[9px] text-zinc-500 leading-normal">
                  *Estimated guidelines only. Definitives are tailored together in our introductory call.
                </div>
              </div>

              {/* Direct Access Channels */}
              <div className="space-y-4">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block">
                  OR CONNECT DIRECTLY VIA PHONE / INBOX
                </span>

                <div className="flex items-center space-x-3 text-sm text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850">
                    <Mail className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-zinc-500 tracking-wider">PROJECT TEAM INBOX</div>
                    <a href="mailto:rareone2003@gmail.com" className="font-sans font-semibold text-white hover:text-emerald-400 transition select-none">
                      rareone2003@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850">
                    <Phone className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-zinc-500 tracking-wider">DIRECT MOBILE TELECOMM</div>
                    <a href="tel:+917428474295" className="font-sans font-semibold text-white hover:text-emerald-400 transition select-none">
                      +91 7428474295
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm text-zinc-300">
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-zinc-500 tracking-wider">WHATSAPP CHAT CHANNELS</div>
                    <a 
                      href="https://wa.me/917428474295" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="font-sans font-semibold text-white hover:text-[#25D366] transition select-none flex items-center space-x-1"
                    >
                      <span>+91 7428474295</span>
                      <span className="text-[9px] text-[#25D366] font-mono font-bold bg-[#25D366]/10 px-1 py-0.5 rounded ml-1 animate-pulse">Chat Live</span>
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-sm text-zinc-300">
                  <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-850">
                    <Calendar className="h-4 w-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-mono text-[9px] text-zinc-500 tracking-wider">SECURE SYNC CALENDAR</div>
                    <span className="font-sans font-semibold text-white">
                      Intro Call 15-min booking bounds
                    </span>
                  </div>
                </div>
              </div>

            </div>

            <div className="rounded-2xl border border-zinc-900 p-4 font-mono text-[10px] text-zinc-500 leading-normal">
              🌐 Your transaction pipelines are encrypted. Code briefs adhere strictly to GDPR data-privacy policies.
            </div>
          </div>

          {/* Form Brief Input Column Right */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-zinc-900 p-6 md:p-8 bg-zinc-900/10">
              
              <AnimatePresence mode="wait">
                {!submittedInquiry ? (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Name input */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-sans text-xs font-semibold text-zinc-400">Your Full Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Marcus Chen"
                          className="bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition font-sans placeholder-zinc-700"
                        />
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-sans text-xs font-semibold text-zinc-400">Email Address (Business preferred)</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="m.chen@nexofinance.com"
                          className="bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500 transition font-sans placeholder-zinc-700"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-zinc-900 py-6 my-2">
                      
                      {/* Budget Selector */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-sans text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Target Budget Area</label>
                        <select
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition font-sans cursor-pointer"
                        >
                          <option value="unspecified">Select budget</option>
                          {/* <option value="lt-10k">&lt; $10,000</option> */}
                          <option value="10k-25k">Let's Discuss</option>
                          {/* <option value="gt-25k">$25,000 +</option> */}
                        </select>
                      </div>

                      {/* Timeline Selector */}
                      <div className="flex flex-col space-y-1.5">
                        <label className="font-sans text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Delivery Sprints</label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition font-sans cursor-pointer"
                        >
                          <option value="unspecified">Select launch timeline</option>
                          <option value="immediate">&lt; 1 Month (Urgent)</option>
                          <option value="standard">1 - 2 Months</option>
                          <option value="flexible">Flexible Sprints Schedule</option>
                        </select>
                      </div>

                    </div>

                    {/* Brief description area */}
                    <div className="flex flex-col space-y-1.5">
                      <label className="font-sans text-xs font-semibold text-zinc-400">Tell Me About Your Business</label>
                      <textarea
                        id="contact-brief"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Detail what type of app your business needs—e.g., table reservation flow, fitness calendars, menu checkout buttons, or user points..."
                        className="bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition font-sans placeholder-zinc-700 resize-none"
                      />
                    </div>

                    {/* Form submit button */}
                    {submitError && (
                      <div className="p-3.5 rounded-xl bg-red-950/35 border border-red-500/25 text-red-200 text-xs text-center font-sans tracking-wide">
                        ⚠️ {submitError}
                      </div>
                    )}

                    <button
                      id="contact-submit"
                      type="submit"
                      disabled={isSubmitting}
                      className="cursor-pointer w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-sm font-bold rounded-xl shadow-lg transition hover:opacity-95 duration-250 flex items-center justify-center space-x-2 disabled:opacity-50 select-none"
                    >
                      {isSubmitting ? (
                        <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Business App Brief</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  
                  // SUCCESS TICKET MODIFIED DISPLAY
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 flex flex-col items-center space-y-6"
                  >
                    <div className="h-14 w-14 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center">
                      <ClipboardCheck className="h-6 w-6 text-emerald-400" />
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-bold text-white">App Brief Submitted!</h3>
                      <p className="font-sans text-xs text-zinc-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
                        Your concept has been successfully queued for review. I will personally analyze your business goals and email you a tailored blueprint within 24 hours.
                      </p>
                    </div>

                    {/* SLA Manifest Ticket Receipt */}
                    <div className="w-full rounded-2xl bg-zinc-950 border border-zinc-850 text-left p-5 font-mono text-[11px] leading-normal space-y-2.5">
                      <div className="flex justify-between border-b border-zinc-900 pb-2 text-[10px] text-zinc-500">
                        <span>ESTIMATION ID: {submittedInquiry.id}</span>
                        <span>STATUS: QUEUED</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-y-2">
                        <div>
                          <span className="text-zinc-500 uppercase block text-[9px]">SENDER</span>
                          <span className="text-white truncate block">{submittedInquiry.name}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase block text-[9px]">INBOX</span>
                          <span className="text-white truncate block">{submittedInquiry.email}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase block text-[9px]">APP STYLE</span>
                          <span className="text-emerald-400 font-bold block uppercase">{submittedInquiry.projectType.replace('-', ' ')}</span>
                        </div>
                        <div>
                          <span className="text-zinc-500 uppercase block text-[9px]">INITIALIZED</span>
                          <span className="text-white block text-[10px]">Just now</span>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-2.5 text-[9px] text-zinc-500">
                        ⚡ Scoping parameters aligned. Let's build a magnificent app experience for your brand!
                      </div>
                    </div>

                    {/* Back trigger */}
                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="cursor-pointer font-mono text-xs text-zinc-500 hover:text-white transition select-none uppercase"
                    >
                      &larr; Submit alternative specs brief
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
