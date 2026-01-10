"use client";

import React from "react";
import { Users, Wallet, TrendingUp } from "lucide-react";

interface Referral {
  reward: number;
}

interface ReferralStatsProps {
  referrals: Referral[];
}

const ReferralStats: React.FC<ReferralStatsProps> = ({ referrals }) => {
  const totalReferrals = referrals.length;
  const totalEarnings = referrals.reduce((acc, curr) => acc + curr.reward, 0);

  const stats = [
    {
      label: "My Network",
      value: totalReferrals.toString(),
      icon: <Users className="text-blue-600" size={22} />,
      bgColor: "bg-blue-50",
      description: "Direct active connections"
    },
    {
      label: "Total Earnings",
      value: `₹${totalEarnings.toLocaleString()}`,
      icon: <Wallet className="text-emerald-600" size={22} />,
      bgColor: "bg-emerald-50",
      description: "Successfully credited rewards"
    },
    {
      label: "Partner Level",
      value: "Level 2",
      icon: <TrendingUp className="text-orange-600" size={22} />,
      bgColor: "bg-orange-50",
      description: "5 more for next upgrade"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white border border-slate-100 p-7 rounded-[32px] shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-300 min-h-[180px] flex flex-col relative overflow-hidden group"
        >
          {/* Top Section: Icon & Label */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 ${stat.bgColor} rounded-3xl shrink-0 transition-transform duration-500 group-hover:rotate-[10deg]`}>
              {stat.icon}
            </div>
            <p className="text-[11px] font-black uppercase tracking-[2.5px] text-slate-400">
              {stat.label}
            </p>
          </div>
          
          {/* Middle Section: Value & Description */}
          <div className="mt-auto">
            <h4 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
              {stat.value}
            </h4>
            <p className="text-[12px] font-bold text-slate-400/80 tracking-tight">
              {stat.description}
            </p>
          </div>

          {/* Design Decoration: Numbering */}
          <span className="absolute top-6 right-8 text-4xl font-black text-slate-50 group-hover:text-emerald-50/50 transition-colors pointer-events-none">
            0{index + 1}
          </span>
          
          {/* Bottom Progress/Accent line */}
          <div className="absolute bottom-0 left-0 h-1.5 w-0 bg-emerald-500 group-hover:w-full transition-all duration-700" />
        </div>
      ))}
    </div>
  );
};

export default ReferralStats;