"use client";

import { motion, Variants } from "framer-motion"; // 1. Variants type add kiya
import { Shield, Target, Users, ArrowRight, Building2, CheckCircle2, Award } from "lucide-react";

// Animation Variants - Added 'as const' and explicit types to fix build errors
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: "easeOut" as const // 2. 'as const' add kiya taaki ease string error na de
    } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-white relative pt-32 md:pt-44 pb-20 px-6 overflow-hidden">
      
      {/* --- Advanced Green Background Elements --- */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.2, 0.4, 0.2] 
        }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-200 rounded-full blur-[120px] z-0" 
      />
      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-emerald-50/50 to-transparent z-0" />

      <div className="container max-w-6xl mx-auto relative z-10">
        
        {/* --- Header Section --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-start mb-24"
        >
          <div className="space-y-8">
            <motion.div 
              variants={fadeInUp} 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900 text-emerald-50 text-[10px] font-black uppercase tracking-[2px] shadow-lg shadow-emerald-200"
            >
              <Award size={14} className="text-emerald-400" /> Leading Prop-Tech Ecosystem
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-7xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Invest in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Real Assets.
              </span>
            </motion.h1>
            
            <motion.div variants={fadeInUp} className="space-y-4 max-w-lg border-l-4 border-emerald-500 pl-6">
              <p className="text-slate-700 text-xl font-bold leading-snug">
                WIPO Group makes real estate investing as simple as buying a stock.
              </p>
              <p className="text-slate-500 text-base font-medium leading-relaxed">
                Experience the power of fractional ownership. We bring you premium, high-yield assets that were previously reserved for institutional giants.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <a href="/contact">
                <button className="group px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm transition-all flex items-center gap-3 shadow-xl shadow-emerald-200 hover:bg-slate-900 hover:shadow-slate-200">
                  Join Now 
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </a>
            </motion.div>
          </div>

          {/* Right Card: Emerald Theme */}
          <motion.div 
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-emerald-900 to-slate-900 p-10 rounded-[40px] relative overflow-hidden group shadow-2xl shadow-emerald-900/20"
          >
            <div className="relative z-10 text-white">
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                Why WIPO? <span className="w-12 h-[2px] bg-emerald-400"></span>
              </h3>
              <div className="space-y-6">
                {[
                  "Fractional ownership in Grade-A properties.",
                  "Transparent legal and RERA documentation.",
                  "Monthly rental yields and appreciation.",
                  "End-to-end asset management."
                ].map((text, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    key={i} 
                    className="flex gap-4 items-start"
                  >
                    <div className="bg-emerald-500/20 p-1 rounded-lg">
                      <CheckCircle2 className="text-emerald-400 shrink-0" size={18} />
                    </div>
                    <p className="text-emerald-50/80 font-medium text-sm leading-relaxed">{text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" as const }}
              className="absolute -bottom-20 -right-20 opacity-10"
            >
              <Building2 size={300} className="text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* --- Stats Grid: Green Accents --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            { icon: Target, val: "100%", sub: "Transparency", color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-500" },
            { icon: Users, val: "12K+", sub: "Active Community", color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-500" },
            { icon: Shield, val: "Secure", sub: "Bank-Grade", color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-500" },
            { icon: Building2, val: "500+", sub: "Managed Assets", color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-500" },
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`group p-8 bg-white border-2 border-transparent rounded-[35px] shadow-sm hover:shadow-2xl ${item.border} transition-all duration-300`}
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                <item.icon size={28} className={item.color} />
              </div>
              <p className="text-4xl font-black text-slate-900 mb-1">{item.val}</p>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-4">{item.sub}</p>
              <div className="h-1 w-8 bg-emerald-100 group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}