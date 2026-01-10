'use client';

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

// --- SERVICE CARD (Cleaned & Refined) ---
const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile to disable tilt for better UX
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Tilt only applies on desktop
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], isMobile ? ["0deg", "0deg"] : ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
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

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative min-h-[320px] md:h-[350px] w-full rounded-[32px] md:rounded-[40px] bg-slate-50 border border-slate-200/60 p-6 md:p-8 cursor-default transition-all duration-500 hover:bg-white hover:border-emerald-200"
    >
      <div style={{ transform: isMobile ? "none" : "translateZ(75px)", transformStyle: "preserve-3d" }} className="h-full flex flex-col justify-between">
        <div>
          {/* Icon Container */}
          <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mb-6 md:mb-8 shadow-xl shadow-emerald-900/5 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500 text-emerald-600">
            {service.icon}
          </div>
          {/* Title */}
          <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 md:mb-4 group-hover:text-emerald-600 transition-colors">
            {service.title}
          </h3>
          {/* Description */}
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed">
            {service.description}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity">
            Wipo Ecosystem
          </span>
        </div>
      </div>
      
      {/* Background Hover Glow */}
      <div className="absolute inset-0 rounded-[32px] md:rounded-[40px] bg-gradient-to-br from-emerald-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-2xl" />
    </motion.div>
  );
};

// --- SERVICES DATA ---
const services = [
  { 
    title: "Property Buy", 
    description: "Verified listings with secure smart-contract processing.", 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> 
  },
  { 
    title: "Property Sell", 
    description: "Reach global buyers with our high-speed marketing engine.", 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg> 
  },
  { 
    title: "Committees", 
    description: "Guaranteed high-yield investment groups for community growth.", 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg> 
  },
  { 
    title: "Loans", 
    description: "Leverage your assets for instant, low-interest liquidity.", 
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg> 
  }
];

const WhyWipo = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-[#FAFAFA] relative overflow-hidden w-full">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-48 h-48 md:w-72 md:h-72 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20 space-y-4 md:space-y-6">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            className="inline-block px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100"
          >
            <span className="text-emerald-700 text-[10px] md:text-xs font-bold uppercase tracking-widest">Wipo Premium Services</span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-[1000] text-slate-900 tracking-tight leading-[1.1]">
            Experience the <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-400 italic font-serif font-medium">Future of Wealth</span>
          </h2>
        </div>

        {/* 3D Grid - Fully Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-24">
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>
      </div>
    </section>
  );
};

export default WhyWipo;