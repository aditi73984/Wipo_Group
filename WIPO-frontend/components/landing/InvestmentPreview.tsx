'use client';

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const InvestmentPreview = () => {
  const [amount, setAmount] = useState(250000);
  const roi = 15.4;

  // Calculation Logic
  const monthlyReturn = Math.round((amount * (roi / 100)) / 12);
  const yearlyProfit = Math.round(amount * (roi / 100));

  // --- 3D Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply tilt on larger screens for better UX
    if (window.innerWidth < 1024) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleInvestClick = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = '/contact'; 
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#fafdfc] relative overflow-hidden w-full">
      
      {/* Dynamic Background Animation - Responsive sizes */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-100 rounded-full blur-[80px] md:blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-5%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-green-100 rounded-full blur-[70px] md:blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 xl:gap-24 items-center">
          
          {/* Left Side: Dynamic Text */}
          <div className="w-full lg:w-[45%] space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white shadow-sm border border-emerald-100 rounded-2xl text-emerald-600 text-[10px] md:text-xs font-bold uppercase tracking-widest"
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
              Real-time Growth
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[1000] text-slate-900 leading-[1.1] tracking-tight">
              Invest in <br />
              <span className="bg-gradient-to-r from-emerald-600 to-green-400 bg-clip-text text-transparent italic font-serif font-medium">Your Future</span>
            </h2>
            
            <p className="text-slate-500 text-base md:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-medium px-4 lg:px-0">
              Join Wipo's premium asset-backed committees. Use the calculator to visualize your passive income.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm mx-auto lg:mx-0">
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-xl md:text-2xl font-black text-slate-900 leading-none">15.4%</p>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mt-2">Target ROI</p>
              </div>
              <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <p className="text-xl md:text-2xl font-black text-emerald-600 leading-none">Fixed</p>
                <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mt-2">Payouts</p>
              </div>
            </div>
          </div>

          {/* Right Side: 3D Interactive Card */}
          <motion.div
            style={{ 
              rotateX: rotateX, 
              rotateY: rotateY, 
              transformStyle: "preserve-3d",
              perspective: "1000px" 
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full lg:w-[55%] relative group cursor-pointer max-w-2xl mx-auto"
          >
            {/* Card Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[40px] blur-2xl opacity-10 group-hover:opacity-30 transition duration-500" />
            
            <div className="relative bg-slate-900 rounded-[32px] md:rounded-[45px] p-6 sm:p-10 md:p-14 border border-slate-800 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.3)]">
              
              <div className="space-y-8 md:space-y-12" style={{ transform: "translateZ(50px)" }}>
                {/* Selector */}
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                    <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">Investment Amount</span>
                    <motion.span 
                      key={amount}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-white text-3xl md:text-5xl font-black tracking-tighter"
                    >
                      ₹{amount.toLocaleString('en-IN')}
                    </motion.span>
                  </div>
                  <div className="relative pt-4">
                    <input 
                      type="range" 
                      min="50000" 
                      max="2000000" 
                      step="10000"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                    />
                    <div className="flex justify-between mt-3 text-[10px] font-bold text-slate-500 uppercase">
                      <span>50K</span>
                      <span>10L</span>
                      <span>20L</span>
                    </div>
                  </div>
                </div>

                {/* Results Glass Boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white/[0.04] backdrop-blur-md border border-white/5 p-5 md:p-7 rounded-[24px] md:rounded-[32px]">
                    <p className="text-slate-500 text-[9px] md:text-[10px] font-black uppercase mb-2">Monthly Payout</p>
                    <p className="text-xl md:text-2xl font-black text-white">₹{monthlyReturn.toLocaleString('en-IN')}</p>
                  </div>

                  <div className="bg-emerald-500 p-5 md:p-7 rounded-[24px] md:rounded-[32px] shadow-xl shadow-emerald-500/10">
                    <p className="text-emerald-950/60 text-[9px] md:text-[10px] font-black uppercase mb-2">Total Yield (1Yr)</p>
                    <p className="text-emerald-950 text-xl md:text-2xl font-black">₹{yearlyProfit.toLocaleString('en-IN')}</p>
                  </div>
                </div>

                {/* Progress Tracking */}
                <div className="space-y-3 pt-2">
                  <div className="flex justify-between text-[10px] md:text-xs font-bold">
                    <span className="text-slate-400">Security: Asset-Backed</span>
                    <span className="text-emerald-400">Risk: Low</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-emerald-600 via-emerald-400 to-cyan-400 rounded-full"
                    />
                  </div>
                </div>

                {/* Main Action Button */}
                <motion.button
                  onClick={handleInvestClick}
                  whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 md:py-6 bg-gradient-to-r from-emerald-500 to-emerald-400 text-slate-950 font-black text-base md:text-xl rounded-2xl md:rounded-[24px] shadow-2xl shadow-emerald-500/20 flex items-center justify-center gap-3 transition-all"
                >
                  Invest Now
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </motion.button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default InvestmentPreview;