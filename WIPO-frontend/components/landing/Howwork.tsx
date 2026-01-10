'use client';

import { motion } from "framer-motion";
import React from "react";

const steps = [
  { 
    id: "01",
    title: "Create Account", 
    text: "Sign up and complete your KYC verification to get started in minutes.",
    icon: "👤",
    gradient: "from-emerald-50 to-white"
  },
  { 
    id: "02",
    title: "Choose Investment", 
    text: "Browse properties or join committee investments that match your goals.",
    icon: "💰",
    gradient: "from-emerald-50 to-white"
  },
  { 
    id: "03",
    title: "Start Earning", 
    text: "Track your real-time performance and watch your wealth grow seamlessly.",
    icon: "🚀",
    gradient: "from-emerald-50 to-white"
  },
];

const HowItWorks = () => {
  return (
    // Section padding adjusted for mobile
    <section className="py-16 md:py-32 px-4 sm:px-6 bg-[#FAFAFA] relative overflow-hidden w-full">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-1/4 -left-10 w-48 h-48 md:w-64 md:h-64 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-10 w-64 h-64 md:w-96 md:h-96 bg-green-100/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/50 border border-emerald-200 mb-6"
          >
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-700 text-[10px] md:text-xs font-black uppercase tracking-widest">The Process</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-6 md:mb-8 leading-[1.1] md:leading-[0.9]">
            Simple. Transparent. <br className="hidden sm:block" />
            <span className="text-emerald-500 italic">Effective.</span>
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
            We've removed the complexity from real estate investing. Follow these three steps to begin your journey.
          </p>
        </div>

        {/* --- Steps Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true }}
              className="relative group w-full"
            >
              {/* Step Number Background - Responsive Size */}
              <div className="absolute -top-6 md:-top-10 left-6 md:left-10 text-[8rem] md:text-[12rem] font-black text-slate-200/30 select-none group-hover:text-emerald-200/40 transition-colors -z-0">
                {step.id}
              </div>

              <div className="relative z-10 p-8 md:p-10 bg-white border border-slate-100 rounded-[40px] md:rounded-[50px] shadow-sm hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-500">
                
                {/* Icon Box */}
                <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 rounded-[24px] md:rounded-[28px] flex items-center justify-center text-3xl md:text-4xl mb-8 md:mb-10 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 shadow-inner">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="space-y-3 md:space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed text-sm md:text-lg">
                    {step.text}
                  </p>
                </div>

                {/* Animated Arrow/Indicator */}
                <div className="mt-8 md:mt-10 flex items-center gap-2">
                  <div className="h-1 w-10 md:w-12 bg-emerald-500 rounded-full" />
                  <div className="h-1 w-2 bg-emerald-200 rounded-full group-hover:w-6 transition-all duration-500" />
                </div>
              </div>

              {/* Connector for Large Screens Only */}
              {i < 2 && (
                <div className="hidden lg:block absolute top-1/2 -right-5 translate-x-1/2 -translate-y-1/2 z-20">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-emerald-200">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;