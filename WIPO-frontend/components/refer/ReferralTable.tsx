"use client";

import React from "react";
import { Calendar, Mail, User, IndianRupee } from "lucide-react";

interface Referral {
  id: string | number;
  name: string;
  email: string;
  joinedDate: string; // aapke data mein 'joinedDate' hai
  reward: number;
}

interface ReferralTableProps {
  referrals: Referral[];
}

const ReferralTable: React.FC<ReferralTableProps> = ({ referrals }) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-100 bg-white">
      <table className="w-full text-left border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="bg-slate-50/50 border-b border-slate-100">
            <th className="p-5 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Investor</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Contact Details</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[2px] text-slate-400">Joined Date</th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[2px] text-slate-400 text-right">Commission</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-slate-50">
          {referrals.length > 0 ? (
            referrals.map((r) => (
              <tr key={r.id} className="group hover:bg-emerald-50/30 transition-colors">
                {/* Investor Name with Initials */}
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold shadow-sm group-hover:bg-emerald-600 transition-colors">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900 leading-none">{r.name}</p>
                      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">Verified Member</span>
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="p-5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Mail size={14} className="text-slate-300" />
                    <span className="text-sm font-medium">{r.email}</span>
                  </div>
                </td>

                {/* Date */}
                <td className="p-5">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} className="text-slate-300" />
                    <span className="text-sm font-medium">{r.joinedDate}</span>
                  </div>
                </td>

                {/* Reward / Commission */}
                <td className="p-5 text-right">
                  <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-100">
                    <IndianRupee size={12} strokeWidth={3} />
                    <span className="text-sm font-black tracking-tight">{r.reward}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="p-10 text-center">
                <p className="text-slate-400 text-sm font-medium">No referrals yet. Share your code to start earning!</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReferralTable;