"use client";

import { motion } from "framer-motion";
import { Users, Target, ArrowUpRight, Lock, CheckCircle2, TrendingUp, MapPin, Wallet } from "lucide-react";
import Link from "next/link";

export default function CommitteeCard({ committee }: { committee: any }) {
  const progress = (committee.collectedAmount / committee.targetAmount) * 100;
  const isClosed = committee.status === "closed";
  
  const formatCurrency = (num: number) => {
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    return `₹${num}`;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* --- Image Section --- */}
      <div className="relative h-56 w-full overflow-hidden">
        <img 
          src={committee.image} 
          alt={committee.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        
        {/* Location Tag */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90">
          <MapPin size={14} className="text-emerald-400" />
          <span className="text-xs font-bold tracking-wide">{committee.location}</span>
        </div>

        {/* Status Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${
          isClosed 
          ? "bg-slate-900/50 text-slate-300 border-slate-500/30" 
          : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
        }`}>
          {committee.status}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-black text-slate-900 leading-tight group-hover:text-emerald-600 transition-colors">
            {committee.name}
          </h3>
          <div className="text-emerald-600 font-black text-sm flex items-center gap-1">
             <TrendingUp size={16} /> {committee.estimatedYield}
          </div>
        </div>

        <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
          {committee.description}
        </p>

        {/* --- Progress Bar --- */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Funding Progress</span>
            <span className="text-xs font-black text-slate-900">{progress.toFixed(0)}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full ${isClosed ? "bg-slate-400" : "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.4)]"}`}
            />
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 mb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Users size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Investors</span>
            </div>
            <p className="text-sm font-black text-slate-900">{committee.members}</p>
          </div>
          <div className="space-y-1 border-l border-slate-100 pl-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Wallet size={12} />
              <span className="text-[9px] font-bold uppercase tracking-widest">Min. Invest</span>
            </div>
            <p className="text-sm font-black text-slate-900">{formatCurrency(committee.minInvestment)}</p>
          </div>
        </div>

        {/* --- Footer Button --- */}
        <div className="mt-auto">
          {isClosed ? (
            <button disabled className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock size={14} /> Committee Fulfilled
            </button>
          ) : (
            <Link href={`/contact`} className="block">
              <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-emerald-600 transition-all duration-300">
                Join Committee <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}