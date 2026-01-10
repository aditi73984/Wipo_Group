'use client';

import { motion } from "framer-motion";
import React from "react";
import { useRouter } from "next/navigation"; 

const CTASection = () => {
  const router = useRouter(); 

  return (
    // Section ko full width kiya aur padding ko device ke hisaab se adjust kiya
    <section className="w-full py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      
      {/* --- Smooth Animated Background "The Aura" --- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[5%] w-[80%] md:w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[80px] md:blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            x: [0, -50, 0],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[5%] w-[70%] md:w-[50%] h-[50%] bg-green-100/30 rounded-full blur-[80px] md:blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative group">
          
          {/* Glass Card Container - Mobile friendly padding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden bg-white/60 backdrop-blur-3xl border border-white shadow-[0_40px_100px_-20px_rgba(16,185,129,0.1)] rounded-[30px] md:rounded-[50px] p-8 sm:p-12 md:p-20 lg:p-24"
          >
            {/* Inner Design Elements - Responsive visibility */}
            <div className="absolute top-0 right-0 p-6 md:p-10 opacity-10 hidden sm:block">
               <svg width="80" height="80" className="md:w-[120px] md:h-[120px]" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M12 2v20M2 12h20"/></svg>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-6 md:space-y-10">
              
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="px-4 py-1.5 md:px-5 md:py-2 bg-emerald-50 border border-emerald-100 rounded-full"
              >
                <span className="text-emerald-700 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">Secure Ecosystem</span>
              </motion.div>

              {/* Main Text Content */}
              <div className="space-y-4 md:space-y-6 max-w-4xl">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-[1000] text-slate-900 tracking-tighter leading-[1.1]">
                  Ready to Start Your <br className="hidden sm:block" />
                  <span className="text-emerald-500 italic font-serif font-medium">Investment Journey?</span>
                </h2>
                <p className="text-slate-500 text-base md:text-xl font-medium max-w-2xl mx-auto leading-relaxed px-2">
                  Join thousands of successful investors who trust <span className="text-slate-900 font-bold tracking-tight uppercase">WIPO Group</span> for their property and investment needs.
                </p>
              </div>

              {/* --- Working Buttons Section - Responsive layout --- */}
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pt-4 md:pt-8 w-full justify-center max-w-sm sm:max-w-none mx-auto">
                {/* Button 1: Register */}
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/auth/signup')}
                  className="px-8 md:px-10 py-4 md:py-5 bg-emerald-500 text-white font-black rounded-xl md:rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center gap-3 transition-all w-full sm:w-auto justify-center cursor-pointer text-sm md:text-base"
                >
                  Create Free Account
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                </motion.button>

                {/* Button 2: Contact */}
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "#f8fafc" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/contact')}
                  className="px-8 md:px-10 py-4 md:py-5 bg-white border-2 border-slate-100 text-slate-900 font-bold rounded-xl md:rounded-2xl transition-all w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base"
                >
                  Contact Us
                </motion.button>
              </div>
            </div>

            {/* Subtle Overlay Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                  style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;