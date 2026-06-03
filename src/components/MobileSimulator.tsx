import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, Battery, Smartphone, Utensils, Calendar, 
  Sparkles, Check, Play, MapPin, RefreshCw, 
  ShoppingBag, Star, Plus, ShieldCheck
} from 'lucide-react';

export default function MobileSimulator() {
  const [activeApp, setActiveApp] = useState<'bistro' | 'gym' | 'salon'>('bistro');
  
  // Gusto Bistro States
  const [bistroCart, setBistroCart] = useState<string[]>([]);
  const [orderState, setOrderState] = useState<'idle' | 'prepping' | 'delivering' | 'done'>('idle');
  const [bistroCartTotal, setBistroCartTotal] = useState(0);
  const [orderPulseStep, setOrderPulseStep] = useState(0);

  // Apex Gym States
  const [spotsFilled, setSpotsFilled] = useState(14);
  const [bookedGym, setBookedGym] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Power HIIT Cardio');

  // Aura Salon States
  const [selectedStylist, setSelectedStylist] = useState('Emma (Master)');
  const [bookingHour, setBookingHour] = useState('2:30 PM');
  const [salonPaying, setSalonPaying] = useState(false);
  const [salonPaid, setSalonPaid] = useState(false);

  // Order timeline simulation
  useEffect(() => {
    let timer: any;
    if (orderState === 'prepping') {
      timer = setTimeout(() => {
        setOrderState('delivering');
      }, 4000);
    } else if (orderState === 'delivering') {
      timer = setTimeout(() => {
        setOrderState('done');
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [orderState]);

  // Handle Bistro adding items
  const addBistroItem = (name: string, price: number) => {
    if (orderState !== 'idle') {
      // Reset order if they click plus while done or order state is running
      setOrderState('idle');
      setBistroCart([name]);
      setBistroCartTotal(price);
    } else {
      setBistroCart(prev => [...prev, name]);
      setBistroCartTotal(prev => prev + price);
    }
  };

  const handleBistroCheckout = () => {
    if (bistroCart.length === 0) return;
    setOrderState('prepping');
  };

  const resetBistro = () => {
    setBistroCart([]);
    setBistroCartTotal(0);
    setOrderState('idle');
  };

  // Gym booking toggle
  const handleGymRSVP = () => {
    if (bookedGym) {
      setSpotsFilled(prev => prev - 1);
      setBookedGym(false);
    } else {
      setSpotsFilled(prev => prev + 1);
      setBookedGym(true);
    }
  };

  // Salon Apple Pay trigger
  const runSalonCheckout = () => {
    setSalonPaying(true);
    setTimeout(() => {
      setSalonPaying(false);
      setSalonPaid(true);
      setTimeout(() => setSalonPaid(false), 3000);
    }, 1800);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 w-full">
      {/* Description Info Left */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        <div className="inline-flex items-center space-x-2 rounded-full border border-emerald-500/20 bg-emerald-950/20 px-3 py-1 self-start">
          <Smartphone className="h-4 w-4 text-emerald-400" />
          <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest">
            Interactive Customer App Demos
          </span>
        </div>
        
        <h3 className="font-sans text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
          Interact with Real Business App Features
        </h3>
        
        <p className="font-sans text-base text-zinc-400 leading-relaxed">
          No dry lines of code or complex tech jargon. Tap the toggles below to try out custom mobile modules I design for local business owners. Watch exactly how patrons order, book, reserve, and pay in real time.
        </p>

        {/* Dynamic Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveApp('bistro')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeApp === 'bistro'
                ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                : 'border-zinc-850 bg-zinc-900/20 hover:border-zinc-700'
            }`}
          >
            <Utensils className={`h-5 w-5 mb-2 ${activeApp === 'bistro' ? 'text-emerald-400' : 'text-zinc-500'}`} />
            <h4 className="font-sans font-semibold text-sm text-white">Gusto Bistro</h4>
            <p className="font-sans text-[11px] text-zinc-400 mt-1">Gourmet ordering & active delivery tracking timelines.</p>
          </button>

          <button
            onClick={() => setActiveApp('gym')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeApp === 'gym'
                ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                : 'border-zinc-850 bg-zinc-900/20 hover:border-zinc-700'
            }`}
          >
            <Calendar className={`h-5 w-5 mb-2 ${activeApp === 'gym' ? 'text-emerald-400' : 'text-zinc-500'}`} />
            <h4 className="font-sans font-semibold text-sm text-white">IronPulse Gym</h4>
            <p className="font-sans text-[11px] text-zinc-400 mt-1">RSVP class scheduler & live capacity indicators.</p>
          </button>

          <button
            onClick={() => setActiveApp('salon')}
            className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
              activeApp === 'salon'
                ? 'border-emerald-500 bg-emerald-950/10 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                : 'border-zinc-850 bg-zinc-900/20 hover:border-zinc-700'
            }`}
          >
            <Sparkles className={`h-5 w-5 mb-2 ${activeApp === 'salon' ? 'text-emerald-400' : 'text-zinc-500'}`} />
            <h4 className="font-sans font-semibold text-sm text-white">Aura Salon</h4>
            <p className="font-sans text-[11px] text-zinc-400 mt-1">Luxury beauty stylist calendar & Apple Pay sheets.</p>
          </button>
        </div>

        {/* Business Value Highlight Box */}
        <div className="rounded-xl border border-zinc-805 bg-zinc-90 w/25 p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-start space-x-3">
            <div className="p-1 px-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 rounded font-bold uppercase shrink-0 mt-0.5 select-none">
              LIVE APP TEST
            </div>
            <div>
              <h5 className="font-sans font-semibold text-xs text-white">What I deliver to you</h5>
              <p className="font-sans text-xs text-zinc-400 mt-1 leading-normal">
                An app that resides directly on your customer's screen, making it incredibly simple to order, reserve spots, or receive instant notifications. Try navigating the phone on the right!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* iPhone Simulator Right */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative mx-auto w-[290px] h-[580px] rounded-[42px] border-[10px] border-zinc-800 bg-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-emerald-950/5 flex flex-col overflow-hidden">
          {/* Speaker, camera notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-28 bg-zinc-800 rounded-b-2xl z-40 flex justify-center items-center">
            <div className="h-1 w-8 bg-zinc-700 rounded-full mb-1" />
            <div className="h-2 w-2 rounded-full bg-zinc-900 ml-2 mb-1" />
          </div>

          {/* iOS Top Bar */}
          <div className="h-9 pt-3 px-6 flex justify-between items-center bg-zinc-950 text-[10px] font-medium text-white z-30 select-none font-mono">
            <span>09:41</span>
            <div className="flex items-center space-x-1.5">
              <Wifi className="h-3 w-3 text-white" />
              <div className="h-2 w-3.5 border border-white/80 rounded-[3px] p-px flex items-center">
                <div className="h-full w-full bg-emerald-400 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Main App Canvas Container */}
          <div className="flex-1 overflow-hidden relative bg-[#09090b] flex flex-col justify-between">
            
            {/* GUSTO BISTRO APP */}
            {activeApp === 'bistro' && (
              <div className="flex-1 flex flex-col select-none text-white h-full justify-between">
                
                {/* Header */}
                <div className="bg-zinc-900/90 border-b border-zinc-800 px-3.5 py-2 flex justify-between items-center shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <Utensils className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="font-sans text-xs font-bold tracking-tight">Gusto Bistro</span>
                  </div>
                  {orderState !== 'idle' && (
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-full bg-amber-955 text-amber-400 border border-amber-500/20 uppercase tracking-widest animate-pulse">
                      ACTIVE ORDER
                    </span>
                  )}
                </div>

                {/* Main scrollable body */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 flex flex-col justify-between h-full">
                  {orderState === 'idle' ? (
                    <div className="space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                          Chef's Gourmet Specialties
                        </div>

                        {/* Menu Items */}
                        {[
                          { name: 'Truffle Tagliatelle', price: 24, desc: 'Fresh egg pasta, local shaved black truffle' },
                          { name: 'Aged Filet Mignon', price: 38, desc: '8oz tenderloin, garlic compound butter' },
                          { name: 'Artisan Limonata', price: 6, desc: 'Fresh squeezed local lemons, mint sprig' }
                        ].map((item, idx) => (
                          <div key={idx} className="bg-zinc-900/50 p-2 py-2.5 rounded-xl border border-zinc-850 flex justify-between items-center">
                            <div className="flex-1 pr-2">
                              <h5 className="text-[11px] font-bold text-white leading-none">{item.name}</h5>
                              <p className="text-[8.5px] text-zinc-450 mt-1 lines-clamp-1 leading-none">{item.desc}</p>
                            </div>
                            <div className="flex items-center space-x-2 shrink-0">
                              <span className="font-mono text-[10px] text-emerald-400 font-semibold">${item.price}</span>
                              <button
                                onClick={() => addBistroItem(item.name, item.price)}
                                className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 p-1 rounded-lg border border-zinc-700 text-emerald-400 active:scale-95 transition"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart Checkouts */}
                      <div className="bg-zinc-900/40 border border-zinc-850 rounded-xl p-2.5 mt-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-[9px] text-zinc-400 font-sans">
                            {bistroCart.length === 0 ? 'Your basket is empty' : `Cart (${bistroCart.length} items)`}
                          </span>
                          {bistroCartTotal > 0 && (
                            <span className="font-mono text-xs font-extrabold text-white">${bistroCartTotal}</span>
                          )}
                        </div>

                        <button
                          onClick={handleBistroCheckout}
                          disabled={bistroCart.length === 0}
                          className={`w-full py-2 rounded-lg text-[10px] font-bold mt-2 text-center transition flex justify-center items-center cursor-pointer ${
                            bistroCart.length > 0
                              ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-850'
                          }`}
                        >
                          <ShoppingBag className="h-3 w-3 mr-1" />
                          <span>PLACE GUSTO BISTRO ORDER</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 flex-1 flex flex-col justify-center">
                      <div className="text-center space-y-1">
                        <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-950/50 border border-emerald-500/20">
                          {orderState !== 'done' ? (
                            <RefreshCw className="h-5 w-5 text-emerald-450 animate-spin" />
                          ) : (
                            <Check className="h-5 w-5 text-emerald-450" />
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-white mt-2">
                          {orderState === 'prepping' && 'Your Bistro meal is prepping...'}
                          {orderState === 'delivering' && 'Out for delivery!'}
                          {orderState === 'done' && 'Order Safely Delivered!'}
                        </h4>
                        <p className="text-[9px] text-emerald-400/80 font-mono">
                          {orderState === 'prepping' && 'Milestone: Kitchen confirming raw files'}
                          {orderState === 'delivering' && 'ETA: 12 minutes to home doorstep'}
                          {orderState === 'done' && 'Stripe Checkout Receipt processed'}
                        </p>
                      </div>

                      {/* Progress roadmap */}
                      <div className="space-y-2 p-2.5 bg-zinc-900/60 rounded-xl border border-zinc-850">
                        <div className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest text-center">
                          Order Progress Milestone
                        </div>
                        
                        <div className="relative h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-900">
                          <motion.div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-400"
                            animate={{ 
                              width: orderState === 'prepping' ? '30%' : orderState === 'delivering' ? '70%' : '100%' 
                            }}
                            transition={{ duration: 1 }}
                          />
                        </div>

                        <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                          <span className={orderState !== 'idle' ? 'text-emerald-400 font-bold' : ''}>Prepped</span>
                          <span className={orderState === 'delivering' || orderState === 'done' ? 'text-emerald-400 font-bold' : ''}>Transit</span>
                          <span className={orderState === 'done' ? 'text-emerald-400 font-bold' : ''}>Arrived</span>
                        </div>
                      </div>

                      <button
                        onClick={resetBistro}
                        className="cursor-pointer text-[9px] font-mono hover:underline text-zinc-500 text-center w-full block mt-2"
                      >
                        Reset and order again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* APEX GYM APP */}
            {activeApp === 'gym' && (
              <div className="flex-1 flex flex-col select-none text-white h-full justify-between">
                
                {/* Header */}
                <div className="bg-zinc-900/90 border-b border-zinc-800 px-3.5 py-2 flex justify-between items-center shrink-0">
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="h-3.5 w-3.5 text-zinc-200" />
                    <span className="font-sans text-xs font-bold tracking-tight">Apex Athletic Club</span>
                  </div>
                  <span className="font-mono text-[8px] px-1.5 py-0.5 rounded bg-zinc-950 text-emerald-400 font-semibold border border-emerald-500/15">
                    ACTIVE SESSIONS
                  </span>
                </div>

                {/* Main Gym body */}
                <div className="flex-1 p-3 space-y-3 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-mono text-zinc-550 block uppercase tracking-wider">
                      Today's Workout Classes
                    </span>

                    {/* Classes options */}
                    {[
                      { name: 'Power HIIT Cardio', time: '11:00 AM', coach: 'Coach Leo', spots: '14/20 booked' },
                      { name: 'Aero Kettlebell Lift', time: '2:30 PM', coach: 'Coach Sarah', spots: '8/15 booked' },
                      { name: 'Stretch & Vinyasa Yoga', time: '5:45 PM', coach: 'Coach Ana', spots: '18/20 booked' }
                    ].map((cls, idx) => {
                      const isSelected = selectedClass === cls.name;
                      return (
                        <div 
                          key={idx}
                          onClick={() => {
                            if (!bookedGym) {
                              setSelectedClass(cls.name);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-left transition cursor-pointer ${
                            isSelected 
                              ? 'border-emerald-500 bg-emerald-950/10' 
                              : 'border-zinc-850 bg-zinc-900/45 hover:border-zinc-800'
                          } ${bookedGym && !isSelected ? 'opacity-55' : ''}`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-mono text-[8px] text-zinc-500">{cls.time}</span>
                            <span className="font-mono text-[8px] text-emerald-400 font-medium">{isSelected && bookedGym ? 'CONFIRMED' : cls.spots}</span>
                          </div>
                          <h5 className="text-[11px] font-bold text-white mt-1">{cls.name}</h5>
                          <span className="text-[9px] text-zinc-455 block">{cls.coach}</span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Attendance Card & Buttons */}
                  <div className="space-y-2 bg-zinc-900/50 p-2.5 rounded-xl border border-zinc-850">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500 font-sans">Live Class Capacity:</span>
                      <span className="font-mono text-white font-black">
                        {bookedGym && selectedClass === 'Power HIIT Cardio' ? '15 / 20' : '14 / 20'} Spots
                      </span>
                    </div>

                    <p className="text-[8.5px] text-zinc-400 leading-normal">
                      {bookedGym 
                        ? `Spot secured! Show your digital member passcard at the desk scanner for 1-click attendance.` 
                        : 'Select your preferred studio session above and secure your trainer RSVP ticket instantly.'
                      }
                    </p>

                    <button
                      onClick={handleGymRSVP}
                      className={`w-full py-2 rounded-lg text-[10px] font-extrabold transition cursor-pointer ${
                        bookedGym
                          ? 'bg-rose-500 text-black hover:bg-rose-455 shadow-md shadow-rose-950/10'
                          : 'bg-emerald-500 text-black hover:bg-emerald-450'
                      }`}
                    >
                      {bookedGym ? 'CANCEL MEMBERSHIP RSVP' : 'BOOK MY SPOT NOW'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* AURA BEAUTY SALON APP */}
            {activeApp === 'salon' && (
              <div className="flex-1 flex flex-col select-none text-white h-full justify-between">
                
                {/* Header */}
                <div className="bg-zinc-900/90 border-b border-zinc-800 px-3.5 py-2 flex justify-between items-center shrink-0">
                  <span className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#d4af37]">
                    Aura Salon & Spa
                  </span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Main Salon body */}
                <div className="flex-1 p-3 space-y-3 flex flex-col justify-between overflow-y-auto">
                  {salonPaid ? (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 text-center my-auto space-y-2"
                    >
                      <div className="h-8 w-8 rounded-full bg-emerald-950 border border-emerald-500/20 flex items-center justify-center mx-auto">
                        <Check className="h-4 w-4 text-emerald-400" />
                      </div>
                      <h4 className="text-xs font-bold text-emerald-400">⚡ Booking Confirmed!</h4>
                      <p className="text-[9px] text-zinc-400 leading-relaxed">
                        Appointment filed for {bookingHour} with stylist {selectedStylist}. Receipt logged to Apple Wallet.
                      </p>
                      <span className="font-mono text-[8px] text-zinc-500 block">Twilio SMS auto-reminder scheduled</span>
                    </motion.div>
                  ) : (
                    <>
                      <div className="space-y-3">
                        {/* Select Beautician Stylist */}
                        <div className="space-y-1.5">
                          <span className="text-[8.5px] font-mono text-zinc-500 tracking-wider block uppercase">
                            Choose Master Stylist
                          </span>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { label: 'Emma (Master)', exp: '12 yr exp' },
                              { label: 'Leo (Artistic)', exp: '8 yr exp' }
                            ].map((st, i) => (
                              <button
                                key={i}
                                onClick={() => setSelectedStylist(st.label)}
                                className={`cursor-pointer p-2 rounded-lg border text-left transition ${
                                  selectedStylist === st.label
                                    ? 'border-[#d4af37] bg-[#d4af37]/5 text-white'
                                    : 'border-zinc-850 bg-zinc-900/50 text-zinc-400'
                                }`}
                              >
                                <div className="text-[10px] font-extrabold">{st.label}</div>
                                <div className="text-[8px] text-zinc-500">{st.exp}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Select Hour slot */}
                        <div className="space-y-1.5">
                          <span className="text-[8.5px] font-mono text-zinc-500 tracking-wider block uppercase">
                            Available Hours (Today)
                          </span>
                          <div className="grid grid-cols-3 gap-1.5 font-mono text-[9px]">
                            {['1:30 PM', '2:30 PM', '4:00 PM'].map((hr, idx) => (
                              <button
                                key={idx}
                                onClick={() => setBookingHour(hr)}
                                className={`cursor-pointer py-1.5 rounded text-center transition ${
                                  bookingHour === hr
                                    ? 'bg-[#d4af37] text-black font-extrabold'
                                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-850'
                                }`}
                              >
                                {hr}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Premium Treatment detail */}
                        <div className="p-2.5 rounded-xl border border-dashed border-zinc-800 bg-zinc-950 text-[10px]">
                          <div className="flex justify-between font-bold text-white">
                            <span>Artistic Blowout & Styling</span>
                            <span className="text-[#d4af37]">$85.00</span>
                          </div>
                          <p className="text-[8.5px] text-zinc-450 mt-1 leading-normal">
                            Shampoo conditioning, massage and blow styling by {selectedStylist}.
                          </p>
                        </div>
                      </div>

                      {/* Direct Payments Checkout */}
                      <button
                        onClick={runSalonCheckout}
                        disabled={salonPaying}
                        className="cursor-pointer w-full py-2.5 rounded-xl bg-white text-black font-bold text-[11px] transition shadow-lg hover:opacity-95 flex items-center justify-center space-x-1.5"
                      >
                        {salonPaying ? (
                          <RefreshCw className="h-3 w-3 animate-spin text-black" />
                        ) : (
                          <ShieldCheck className="h-3.5 w-3.5 text-black shrink-0" />
                        )}
                        <span>{salonPaying ? 'SECURE TRANSIT PORTAL...' : '1-CLICK APPLE PAY CHECKOUT'}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Apple Home Indicator bar */}
            <div className="h-6 flex justify-center items-center bg-zinc-950 shrink-0">
              <div className="h-1 w-24 bg-zinc-810 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
