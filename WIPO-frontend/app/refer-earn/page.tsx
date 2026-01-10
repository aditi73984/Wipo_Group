"use client"

import { Trophy, Users, Copy, Share2, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const leaderboardData = {
  weekly: [
    { rank: 1, name: "Rajesh Kumar", referrals: 45, earnings: 5000 },
    { rank: 2, name: "Priya Sharma", referrals: 38, earnings: 3500 },
    { rank: 3, name: "Amit Patel", referrals: 32, earnings: 2500 },
    { rank: 4, name: "Sneha Gupta", referrals: 28, earnings: 1800 },
    { rank: 5, name: "Vikram Singh", referrals: 25, earnings: 1500 },
  ],
  monthly: [
    { rank: 1, name: "Ankit Verma", referrals: 180, earnings: 50000 },
    { rank: 2, name: "Neha Reddy", referrals: 156, earnings: 35000 },
    { rank: 3, name: "Rohit Mehta", referrals: 142, earnings: 25000 },
    { rank: 4, name: "Kavita Joshi", referrals: 128, earnings: 18000 },
    { rank: 5, name: "Suresh Rao", referrals: 115, earnings: 15000 },
  ],
  yearly: [
    { rank: 1, name: "Manish Agarwal", referrals: 2150, earnings: 1000000 },
    { rank: 2, name: "Deepika Iyer", referrals: 1890, earnings: 750000 },
    { rank: 3, name: "Arjun Nair", referrals: 1650, earnings: 500000 },
    { rank: 4, name: "Pooja Desai", referrals: 1420, earnings: 350000 },
    { rank: 5, name: "Karan Chopra", referrals: 1280, earnings: 250000 },
  ],
}

export default function ReferEarnPage() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly" | "yearly">("weekly")
  
  const t = (key: string) => {
    const translations: Record<string, string> = {
      "refer.title": "Refer & Earn",
      "refer.subtitle": "Invite friends to WIPO and grow your wealth together with rewards.",
      "refer.your_code": "Referral Link",
      "refer.share_earn": "Share this link to start earning commissions",
      "refer.rewards": "Rewards Program",
      "refer.weekly_top": "Weekly Bonus",
      "refer.monthly_top": "Monthly Reward",
      "refer.yearly_top": "Annual Jackpot",
      "refer.leaderboard": "Top Referrers",
      "refer.leaderboard_desc": "Highest earners in the community",
      "refer.share": "Share Now",
      "refer.referrals": "Referrals"
    }
    return translations[key] || key
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`
  const referralCode = "WIPO7X92B1" 
  const shareUrl = `https://wipogroup.in/signup?ref=${referralCode}`

  const copyReferralCode = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    /* Navbar fix: Added pt-24 for mobile and md:pt-32 for desktop */
    <section className="bg-slate-50 min-h-screen pt-24 pb-12 md:pt-32 md:pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section */}
        <div className="text-center mb-10 md:mb-16">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-emerald-100/50 border border-emerald-200 text-emerald-700 text-[10px] md:text-xs font-black tracking-widest uppercase">
            🚀 WIPO Partner Program
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            {t("refer.title")}
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed px-2">
            {t("refer.subtitle")}
          </p>
        </div>

        {/* Top Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-12">
          
          {/* Referral Link Card (Spans 3 columns on desktop) */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-[2.5rem] p-6 md:p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-14 w-14 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-100 shrink-0">
                <Users className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{t("refer.your_code")}</h3>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{t("refer.share_earn")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-[13px] font-mono text-slate-600 truncate flex items-center">
                {shareUrl}
              </div>
              <button 
                onClick={copyReferralCode}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-emerald-100"
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                <span className="md:hidden lg:inline">{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
            
            <button className="w-full mt-4 flex items-center justify-center gap-2 border-2 border-slate-100 hover:border-emerald-600 hover:text-emerald-600 text-slate-600 font-black py-4 rounded-2xl transition-all text-[12px] uppercase tracking-widest bg-white">
              <Share2 size={18} />
              {t("refer.share")}
            </button>
          </div>

          {/* Quick Rewards Summary (Spans 2 columns) */}
          <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden text-white shadow-2xl">
            <h3 className="text-lg font-black mb-6 flex items-center gap-2">
              <Trophy className="text-emerald-400" size={20}/> {t("refer.rewards")}
            </h3>
            <div className="space-y-4">
              {[
                { label: "Weekly Top", amount: 5000, color: "bg-emerald-500" },
                { label: "Monthly Top", amount: 50000, color: "bg-blue-500" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-[10px] font-black uppercase text-slate-400">{item.label}</span>
                  <span className="text-xl font-black">{formatCurrency(item.amount)}</span>
                </div>
              ))}
            </div>
            {/* Visual element */}
            <div className="absolute -right-4 -bottom-4 opacity-10">
              <Trophy size={120} />
            </div>
          </div>
        </div>

        {/* Leaderboard Section */}
        <div className="bg-white border border-slate-200 rounded-[3rem] shadow-sm overflow-hidden mb-10">
          <div className="p-6 md:p-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-xl">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                </div>
                {t("refer.leaderboard")}
              </h3>
              <p className="text-slate-400 font-bold text-xs uppercase mt-2 tracking-widest">{t("refer.leaderboard_desc")}</p>
            </div>
            
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-center md:self-auto">
              {(["weekly", "monthly", "yearly"] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setActiveTab(period)}
                  className={`px-5 py-3 text-[10px] font-black rounded-xl transition-all uppercase tracking-widest ${
                    activeTab === period 
                    ? "bg-white text-emerald-600 shadow-sm border border-slate-200" 
                    : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 md:p-8">
            <div className="grid gap-3">
              {leaderboardData[activeTab].map((user) => (
                <div
                  key={user.rank}
                  className="flex items-center justify-between p-5 md:p-6 bg-white border border-slate-50 rounded-[2rem] hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-50/50 transition-all group"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-sm shrink-0
                      ${user.rank === 1 ? "bg-yellow-400 text-white shadow-lg shadow-yellow-100" : 
                        user.rank === 2 ? "bg-slate-200 text-slate-600" : 
                        user.rank === 3 ? "bg-orange-300 text-white" : 
                        "bg-slate-50 text-slate-400 border border-slate-100"}
                    `}>
                      #{user.rank}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm md:text-lg tracking-tight">{user.name}</p>
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] md:text-[12px] mt-1 bg-emerald-50 w-fit px-2 py-0.5 rounded-full uppercase">
                        <Users size={12} />
                        {user.referrals} {t("refer.referrals")}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Earned</p>
                    <span className="text-lg md:text-2xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {formatCurrency(user.earnings)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}