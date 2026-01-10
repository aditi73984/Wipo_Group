"use client"

import { useState } from "react"
// Fix: Added missing Calendar and Users imports
import { TrendingUp, Calendar, Users, CheckCircle, ArrowRight, Calculator, Phone, X, ShieldCheck, BadgePercent, Landmark } from "lucide-react"
import { useRouter } from "next/navigation"

const committees = [
  { id: 1, name: "Gold Committee", dailyInvestment: 100, monthlyInvestment: 3000, duration: 12, totalReturn: 38000, members: 45, slotsLeft: 5, totalSlots: 50, roi: 12 },
  { id: 2, name: "Platinum Committee", dailyInvestment: 200, monthlyInvestment: 6000, duration: 12, totalReturn: 76000, members: 32, slotsLeft: 8, totalSlots: 40, roi: 12 },
  { id: 3, name: "Diamond Committee", dailyInvestment: 500, monthlyInvestment: 15000, duration: 24, totalReturn: 380000, members: 28, slotsLeft: 2, totalSlots: 30, roi: 15 },
  { id: 4, name: "Silver Committee", dailyInvestment: 50, monthlyInvestment: 1500, duration: 6, totalReturn: 9500, members: 68, slotsLeft: 12, totalSlots: 80, roi: 10 },
  { id: 5, name: "Emerald Committee", dailyInvestment: 300, monthlyInvestment: 9000, duration: 18, totalReturn: 171000, members: 25, slotsLeft: 5, totalSlots: 30, roi: 13 },
  { id: 6, name: "Ruby Committee", dailyInvestment: 1000, monthlyInvestment: 30000, duration: 24, totalReturn: 760000, members: 15, slotsLeft: 1, totalSlots: 16, roi: 16 },
]

export default function CommitteePage() {
  const router = useRouter()
  
  // FIX: Explicitly defining the type for selectedCommittee to prevent build errors
  const [selectedCommittee, setSelectedCommittee] = useState<(typeof committees)[0] | null>(null)
  
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN')}`

  const [loanCalculator, setLoanCalculator] = useState({
    monthlyInvestment: 5000,
    monthsCompleted: 6,
  })

  const loanEligibility = {
    totalInvested: loanCalculator.monthlyInvestment * loanCalculator.monthsCompleted,
    eligibleLoan: (loanCalculator.monthlyInvestment * loanCalculator.monthsCompleted) * 2,
    emi: Math.round(((loanCalculator.monthlyInvestment * loanCalculator.monthsCompleted) * 2) / 12)
  }

  return (
    <div className="min-h-screen bg-[#f1f8f4] text-gray-900 pb-20 font-sans">
      
      <div className="container mx-auto px-4 pt-28 pb-6">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Committee Investments</h1>
          <p className="text-gray-500 text-lg">Join investment committees with guaranteed returns</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Active Committees", val: "6" },
            { label: "Total Members", val: "213" },
            { label: "Avg. Returns", val: "12.5%" },
            { label: "Total Payout", val: formatCurrency(1434500) }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
              <p className={`text-3xl font-bold ${i === 2 ? 'text-green-500' : 'text-green-700'}`}>{stat.val}</p>
            </div>
          ))}
        </div>

        {/* Committee Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {committees.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm relative flex flex-col">
              {item.slotsLeft <= 3 && (
                <span className="absolute top-6 right-6 bg-red-500 text-white text-[12px] font-bold px-3 py-1 rounded-full">
                  Only {item.slotsLeft} slots left
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-green-500" /> {item.name}
                </h3>
                <p className="text-gray-400 mt-1">High-yield investment committee</p>
              </div>

              <div className="flex justify-between mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Daily Investment</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(item.dailyInvestment)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Monthly Investment</p>
                  <p className="text-2xl font-bold text-gray-800">{formatCurrency(item.monthlyInvestment)}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8 text-gray-600">
                <div className="flex justify-between items-center text-sm">
                  <span>Duration</span>
                  <span className="font-semibold flex items-center gap-1"><Calendar className="w-4 h-4"/> {item.duration} months</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>ROI</span>
                  <span className="font-bold text-green-500">{item.roi}%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Members</span>
                  <span className="font-semibold flex items-center gap-1"><Users className="w-4 h-4"/> {item.members}</span>
                </div>
              </div>

              <div className="bg-[#f8fcf9] rounded-2xl p-6 mb-6 text-center border border-green-50">
                <p className="text-sm text-gray-400 font-medium mb-1">Total Return After {item.duration} Months</p>
                <p className="text-3xl font-black text-green-600">{formatCurrency(item.totalReturn)}</p>
              </div>

              <div className="mt-auto space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-gray-400">
                    <span>Slots Available</span>
                    <span>{item.slotsLeft} / {item.totalSlots}</span>
                  </div>
                  <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-green-500 h-full transition-all" 
                      style={{ width: `${(item.members / item.totalSlots) * 100}%` }}
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedCommittee(item)}
                  className="w-full bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                  Join Committee <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Loan Section */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 md:p-12 shadow-sm">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Check Your Loan Eligibility</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Monthly Investment Amount</label>
              <input
                type="number"
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-lg font-bold outline-none focus:border-green-500 transition-all"
                value={loanCalculator.monthlyInvestment}
                onChange={(e) => setLoanCalculator({ ...loanCalculator, monthlyInvestment: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600">Months Completed</label>
              <input
                type="number"
                className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 text-lg font-bold outline-none focus:border-green-500 transition-all"
                value={loanCalculator.monthsCompleted}
                onChange={(e) => setLoanCalculator({ ...loanCalculator, monthsCompleted: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="bg-[#f8fcf9] rounded-2xl p-8 mb-8 border border-green-50 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase mb-2">Total Invested</p>
              <p className="text-3xl font-black text-gray-800">{formatCurrency(loanEligibility.totalInvested)}</p>
            </div>
            <div>
              <p className="text-sm text-green-600 font-bold uppercase mb-2">Eligible Loan Amount</p>
              <p className="text-3xl font-black text-green-600">{formatCurrency(loanEligibility.eligibleLoan)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400 font-bold uppercase mb-2">EMI (12 months)</p>
              <p className="text-3xl font-black text-gray-800">{formatCurrency(loanEligibility.emi)}</p>
            </div>
          </div>

          <div className="bg-[#dcfce7] rounded-2xl p-4 flex gap-3 items-center mb-10 border border-green-100">
            <CheckCircle className="h-6 w-6 text-green-600" />
            <p className="text-green-800 font-medium">
              You are eligible for a loan! Based on your investment, you can apply for up to {formatCurrency(loanEligibility.eligibleLoan)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => router.push("/contact")} className="flex-1 bg-[#22c55e] text-white font-bold py-4 rounded-xl hover:bg-green-600 transition-all active:scale-95">Apply for Loan</button>
            <button onClick={() => router.push("/contact")} className="flex-1 bg-white border border-gray-200 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-50 transition-all active:scale-95">Learn More</button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedCommittee && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden relative shadow-2xl">
            <button 
              onClick={() => setSelectedCommittee(null)}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>
            
            <div className="p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Join {selectedCommittee.name}</h2>
              <p className="text-gray-400 mb-8">Confirm your investment details</p>

              <div className="bg-[#f8fcf9] rounded-2xl p-6 mb-8 border border-green-50 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Daily Investment</span>
                  <span className="font-bold text-gray-900">{formatCurrency(selectedCommittee.dailyInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Monthly Investment</span>
                  <span className="font-bold text-gray-900">{formatCurrency(selectedCommittee.monthlyInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-bold text-gray-900">{selectedCommittee.duration} months</span>
                </div>
                <div className="h-px bg-gray-200 my-2" />
                <div className="flex justify-between items-center text-center">
                  <span className="text-gray-400">Total Return</span>
                  <span className="font-black text-green-600 text-2xl">{formatCurrency(selectedCommittee.totalReturn)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="bg-green-100 p-1 rounded-full"><BadgePercent className="w-4 h-4 text-green-600" /></div>
                  Guaranteed {selectedCommittee.roi}% returns
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="bg-green-100 p-1 rounded-full"><Landmark className="w-4 h-4 text-green-600" /></div>
                  Eligible for loan after 3 months
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="bg-green-100 p-1 rounded-full"><ShieldCheck className="w-4 h-4 text-green-600" /></div>
                  100% secure and transparent
                </div>
              </div>

              <button 
                onClick={() => router.push("/contact")}
                className="w-full bg-[#22c55e] text-white font-extrabold py-5 rounded-2xl shadow-lg transition-all active:scale-95 text-lg"
              >
                Confirm & Join Committee
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}