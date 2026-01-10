"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Loader from "@/components/ui/Loader";
import ReferralCodeBox from "@/components/refer/ReferralCodeBox";
import ReferralStats from "@/components/refer/ReferralStats";
import ReferralTable from "@/components/refer/ReferralTable";
import { Share2, Users, Info, Sparkles } from "lucide-react";

interface Referral {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  reward: number;
}

export default function ClientReferralSection() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [referralCode, setReferralCode] = useState("WIPO1234");

  useEffect(() => {
    const fetchReferrals = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setReferrals([
        { id: "r1", name: "Amit Kumar", email: "amit@example.com", joinedDate: "2026-01-01", reward: 500 },
        { id: "r2", name: "Neha Sharma", email: "neha@example.com", joinedDate: "2026-01-02", reward: 300 },
        { id: "r3", name: "Rahul Singh", email: "rahul@example.com", joinedDate: "2026-01-03", reward: 450 },
      ]);
      setLoading(false);
    };
    fetchReferrals();
  }, []);

  if (loading) return (
    <div className="flex justify-center py-32">
      <Loader />
    </div>
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12" // Massive spacing between sections
    >
      {/* --- Top Section: Code & Stats --- */}
      <div className="grid lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Referral Code Box - Now more spacious */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 flex-1 flex flex-col justify-between overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
            
            <div className="p-10 relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <Share2 size={16} />
                  </div>
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[3px]">Your Invite Code</span>
                </div>
                
                <div className="py-2">
                  <ReferralCodeBox code={referralCode} />
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 bg-slate-50 p-4 rounded-2xl">
                <Sparkles size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                  Earn up to <span className="text-slate-900 font-black">₹1,000</span> for every successful referral. No limits on invites!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Added breathing room */}
        <div className="lg:col-span-7">
          <div className="h-full flex flex-col justify-center">
             <ReferralStats referrals={referrals} />
          </div>
        </div>
      </div>

      {/* --- Bottom Section: Table --- */}
      <div className="space-y-6">
        {/* Section Header with more whitespace */}
        <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h3 className="font-black text-slate-900 text-2xl tracking-tighter uppercase">My Network</h3>
               <span className="px-3 py-1 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest">
                  {referrals.length} Partners
               </span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Users size={12} className="text-emerald-500" /> Track your direct active connections
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase bg-white px-4 py-2 rounded-xl border border-slate-100">
            <Info size={14} className="text-emerald-500" /> Real-time updates
          </div>
        </div>

        {/* Table Container with more padding inside */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 overflow-hidden">
          <div className="p-2 md:p-6">
            <ReferralTable referrals={referrals} />
          </div>
        </div>
      </div>

    </motion.div>
  );
}