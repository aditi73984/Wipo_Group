'use client';

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

const HeroSection = () => {
  const containerRef = useRef(null);
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse move effect for parallax
  useEffect(() => {
    // FIX: TypeScript ko bataya ki 'e' ek MouseEvent hai
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden bg-[#fafdfc]"
    >
      {/* --- ADVANCED DYNAMIC BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: mousePos.x / 20,
            y: mousePos.y / 20,
          }}
          className="absolute -top-[10%] -left-[5%] w-72 md:w-[600px] h-72 md:h-[600px] bg-emerald-100/40 rounded-full blur-[80px] md:blur-[120px]"
        />
        
        <motion.div
          animate={{
            x: -mousePos.x / 25,
            y: -mousePos.y / 25,
          }}
          className="absolute bottom-[5%] -right-[5%] w-64 md:w-[500px] h-64 md:h-[500px] bg-green-100/30 rounded-full blur-[80px] md:blur-[100px]"
        />

        <div className="absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"
             style={{ backgroundImage: `radial-gradient(#10b981 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }} 
        />
      </div>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <motion.div 
        className="relative z-20 w-full max-w-6xl mx-auto flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white border border-emerald-100 shadow-sm transition-transform hover:scale-105"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] md:text-[12px] font-bold text-emerald-800 uppercase tracking-widest">
            10K+ Active Investors
          </span>
        </motion.div>

        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-7xl lg:text-8xl font-[1000] text-slate-900 leading-[1.1] tracking-tight"
          >
            Invest Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400">
              Own WIPO Group.
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base md:text-xl lg:text-2xl text-slate-500 max-w-2xl mx-auto mb-10 font-medium leading-snug px-4 text-center"
        >
          Modern real estate investment for everyone. <br className="hidden md:block" />
          Secure your future with blockchain-backed assets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4"
        >
          <button 
            onClick={() => router.push('/properties')}
            className="w-full sm:w-auto h-14 md:h-16 px-10 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-emerald-600 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            Buy Property
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
          </button>
          
          <button 
            onClick={() => router.push('/committees')}
            className="w-full sm:w-auto h-14 md:h-16 px-10 bg-white text-slate-900 border-2 border-slate-100 font-bold rounded-2xl hover:border-emerald-200 transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          >
            Join Committee
          </button>
        </motion.div>
      </motion.div>

      {/* --- DESKTOP FLOATING CARDS --- */}
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden lg:block absolute left-12 top-1/3 p-4 bg-white/80 backdrop-blur-xl border border-white rounded-2xl shadow-2xl"
      >
        <div className="text-emerald-500 font-black text-2xl tracking-tighter">+24.8%</div>
        <div className="text-[10px] font-bold text-slate-400 uppercase">Quarterly Growth</div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
        className="hidden lg:block absolute right-16 top-1/4 p-4 bg-white/80 backdrop-blur-xl border border-white rounded-full shadow-lg"
      >
        <div className="flex items-center gap-2 px-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span className="text-xs font-black text-slate-800 tracking-tight whitespace-nowrap">Bank-Grade Security</span>
        </div>
      </motion.div>

      <motion.div 
        animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 flex flex-col items-center gap-2"
      >
        <div className="w-5 h-8 border-2 border-slate-200 rounded-full flex justify-center p-1">
          <motion.div className="w-1 h-1 bg-emerald-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;