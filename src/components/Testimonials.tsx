import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Testimonial } from '../types';
import { Star, Quote, ShieldCheck, Plus, Sparkles, Send, X } from 'lucide-react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export default function Testimonials() {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'finance' | 'iot' | 'performance'>('all');
  
  // Custom Review Form State
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [projectAssociated] = useState('Verified Client App');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Real-time listener from database
  useEffect(() => {
    const colRef = collection(db, 'testimonials');
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const list: Testimonial[] = [];
      snapshot.forEach((doc) => {
        list.push(doc.data() as Testimonial);
      });
      // Sort testimonials so newer submissions can stay consistent or sort by id
      list.sort((a, b) => b.id.localeCompare(a.id));
      setReviews(list);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'testimonials');
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !role || !company || !content || !projectAssociated) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const uniqueId = `REV-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
    const randomAvatarId = Math.floor(1 + Math.random() * 70);
    const avatarUrl = `https://i.pravatar.cc/120?img=${randomAvatarId}`;

    const newTestimonial: Testimonial = {
      id: uniqueId,
      name,
      role,
      company,
      logo: company,
      avatar: avatarUrl,
      content,
      rating,
      projectAssociated,
    };

    const path = `testimonials/${uniqueId}`;
    try {
      await setDoc(doc(db, 'testimonials', uniqueId), newTestimonial);
      
      // Reset form fields
      setName('');
      setRole('');
      setCompany('');
      setContent('');
      setRating(5);
      setSubmitSuccess(true);
      
      // Close form after timeout
      setTimeout(() => {
        setShowForm(false);
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError('Failed to publish testimonial to database. Please make sure fields are valid.');
      handleFirestoreError(error, OperationType.WRITE, path);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredReviews = reviews.filter(t => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'finance') return t.projectAssociated.includes('Finance') || t.projectAssociated.toLowerCase().includes('gusto');
    if (activeFilter === 'iot') return t.projectAssociated.includes('Hub') || t.projectAssociated.includes('Telehealth') || t.projectAssociated.toLowerCase().includes('pulse');
    if (activeFilter === 'performance') return t.projectAssociated.includes('Audit') || t.projectAssociated.includes('Pro') || t.projectAssociated.toLowerCase().includes('checkout') || t.projectAssociated.toLowerCase().includes('luna');
    return true;
  });

  return (
    <div className="bg-zinc-950 py-16 md:py-24" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-8 border-b border-zinc-900">
          <div>
            <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
              Verified Recommendations & Endorsements
            </span>
            <h2 className="font-sans text-3xl md:text-4xl font-extrabold tracking-tight text-white mt-1">
              Engineering Trust At Scale
            </h2>
          </div>

          {/* Testimonial category filters & Add Review button */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: 'finance', label: 'Ledger & Finance' },
                { id: 'iot', label: 'IoT & Sensors' },
                { id: 'performance', label: 'Core SLA Tuning' }
              ].map(btn => (
                <button
                  key={btn.id}
                  onClick={() => setActiveFilter(btn.id as any)}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase rounded-lg border transition cursor-pointer select-none ${
                    activeFilter === btn.id
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-400'
                      : 'border-zinc-850 bg-zinc-900/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-1.5 text-[11px] font-mono uppercase text-emerald-400 border border-emerald-500/30 bg-emerald-950/10 rounded-lg hover:bg-emerald-950/30 hover:border-emerald-500 transition duration-240 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="h-3 w-3" />
              Write A Review
            </button>
          </div>
        </div>

        {/* Expandable Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 28 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-6 md:p-8 rounded-2xl border border-zinc-900 bg-zinc-900/20 max-w-2xl mx-auto relative">
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="flex items-center space-x-2 mb-6">
                  <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs text-zinc-300 uppercase tracking-widest">Submit Client Endorsement</span>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="h-10 w-10 bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <h4 className="font-sans text-sm font-bold text-white mb-1">Review Published Successfully!</h4>
                    <p className="font-sans text-xs text-zinc-400">Your recommendation has been streamed onto the ledger wall.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="E.g., Jessica Pearson"
                          className="w-full px-3 py-2 text-xs font-sans text-zinc-200 bg-zinc-950 border border-zinc-900 rounded-xl focus:border-emerald-500/50 focus:outline-none transition"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">Role / Position</label>
                        <input
                          type="text"
                          required
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          placeholder="E.g., Operations Director"
                          className="w-full px-3 py-2 text-xs font-sans text-zinc-200 bg-zinc-950 border border-zinc-900 rounded-xl focus:border-emerald-500/50 focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">Company Name</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="E.g., Pearson Specter Corp"
                        className="w-full px-3 py-2 text-xs font-sans text-zinc-200 bg-zinc-950 border border-zinc-900 rounded-xl focus:border-emerald-500/50 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">Rating Score</label>
                      <div className="flex space-x-1.5 items-center bg-zinc-950 border border-zinc-900 p-2 rounded-xl w-32 justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setRating(star)}
                            className="focus:outline-none cursor-pointer"
                          >
                            <Star
                              className={`h-4.5 w-4.5 ${
                                star <= rating
                                  ? 'text-emerald-400 fill-emerald-400'
                                  : 'text-zinc-700 hover:text-zinc-500'
                              } transition`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[10px] text-zinc-400 uppercase tracking-wider mb-1.5">Review Recommendation</label>
                      <textarea
                        required
                        rows={3}
                        maxLength={950}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Write details about the app performance, client results, and development experience..."
                        className="w-full px-3 py-2 text-xs font-sans text-zinc-200 bg-zinc-950 border border-zinc-900 rounded-xl focus:border-emerald-500/50 focus:outline-none transition leading-relaxed resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="p-3 rounded-xl bg-red-950/25 border border-red-500/20 text-red-200 text-xs text-center font-sans">
                        ⚠️ {submitError}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-2 bg-emerald-500 text-zinc-950 font-mono text-xs uppercase font-extrabold rounded-xl hover:bg-emerald-400 transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        'Signing Ledger...'
                      ) : (
                        <>
                          <Send className="h-3 w-3" />
                          Publish Endorsement
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Loading Indicator or Testimonial Cards Layout - Masonry / Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <span className="font-mono text-xs text-zinc-500 uppercase animate-pulse">Syncing client reviews from cloud Firestore ledger...</span>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {filteredReviews.length === 0 ? (
              <div className="col-span-full text-center py-12 border border-dashed border-zinc-900 rounded-2xl bg-zinc-900/5">
                <span className="font-mono text-xs text-zinc-500 uppercase">
                  No verified recommendations found on the ledger. Write a review using the system action above to populate the ledger.
                </span>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredReviews.map((t) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={t.id}
                    className="p-6 rounded-2xl border border-zinc-900 bg-zinc-900/10 relative flex flex-col justify-between hover:border-emerald-500/10 transition duration-300 group"
                  >
                    {/* Double quotes graphic right corner */}
                    <Quote className="absolute right-4 top-4 h-8 w-8 text-zinc-800/20 group-hover:text-emerald-500/5 transition duration-350" />

                    <div>
                      {/* Rating Stars */}
                      <div className="flex space-x-1 mb-4 select-none">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-emerald-400 fill-emerald-400 stroke-[1.5]" />
                        ))}
                      </div>

                      {/* Feedback summary */}
                      <p className="font-sans text-sm text-zinc-300 leading-relaxed italic">
                        "{t.content}"
                      </p>
                    </div>

                    {/* Profile info section */}
                    <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-zinc-900/60 w-full">
                      <div className="h-10 w-10 rounded-full overflow-hidden border border-zinc-800">
                        <img 
                          referrerPolicy="no-referrer"
                          src={t.avatar} 
                          alt={t.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <span className="font-sans text-sm font-bold text-white leading-none">
                            {t.name}
                          </span>
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 fill-emerald-950/40" />
                        </div>
                        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">
                          {t.role}, <span className="text-emerald-400/80">{t.company}</span>
                        </div>
                      </div>
                    </div>

                    {/* Associated code reference flag */}
                    <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition duration-300">
                      <span className="font-mono text-[8px] text-zinc-500 uppercase">
                        Ref: {t.projectAssociated}
                      </span>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        )}

        {/* Dynamic Consultation Prompt */}
        <div className="mt-16 text-center max-w-xl mx-auto p-6 rounded-2xl border border-zinc-900 bg-zinc-90 w-full">
          <p className="font-sans text-sm text-zinc-400">
            Have high-demand mobile rendering issues, telemetry synchronization leaks, or BLE peripheral pairing lag? Let's discuss a performant engineering sprint for your startup.
          </p>
        </div>

      </div>
    </div>
  );
}
