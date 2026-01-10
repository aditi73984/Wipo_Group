"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Gift, Wallet, ArrowDownLeft, X,
  Plus, History, Copy, TrendingUp, 
  Landmark, ShieldCheck, Check, Users, 
  ChevronRight, Award, Zap, QrCode, CreditCard, Bitcoin,
  Upload, Hash, Info, Trophy, Crown, Medal
} from "lucide-react";

export default function ReferEarnPage() {
  const [balance, setBalance] = useState(25000);
  const [totalDeposit, setTotalDeposit] = useState(50000);
  const [totalWithdraw, setTotalWithdraw] = useState(25000);
  const [copied, setCopied] = useState(false);
  const [modalType, setModalType] = useState<"deposit" | "withdraw" | null>(null);
  const [activeTab, setActiveTab] = useState("UPI");
  
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [cryptoNetwork, setCryptoNetwork] = useState("TRC20");

  useEffect(() => {
    if (modalType) {
      document.body.style.overflow = "hidden";
      setAmount("");
      if(modalType === "deposit") setActiveTab("UPI");
      else setActiveTab("UPI (INR Only)");
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalType]);

  const transactions = [
    { id: 1, date: "2024-01-15", type: "deposit", method: "UPI", amount: 5000, status: "completed" },
    { id: 2, date: "2024-01-14", type: "withdraw", method: "Bank", amount: 2000, status: "completed" },
    { id: 3, date: "2024-01-13", type: "deposit", method: "USDT", amount: 10000, status: "pending" },
  ];

  const copyLink = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // 🟢 Fix: Padding values ko standard Tailwind (pt-24, pt-32, pt-40) mein change kiya hai
    <main className="min-h-screen bg-[#FDFDFD] pt-[125px] md:pt-[150px] lg:pt-[200px] xl:pt-[200px] pb-20 font-sans selection:bg-emerald-100 relative">

      
      {/* 🟢 Mobile Spacer: Extra safety for fixed navbars */}
      <div className="h-4 md:hidden" />

     <div className="max-w-[1200px] mx-auto px-5 pt-[120px] pb-20 md:pt-[160px] lg:pt-[200px] xl:pt-[220px]">

        
        {/* --- HERO HEADER --- */}
        <header className="text-left space-y-3 mb-8 md:mb-10"> 
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-100">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-black uppercase tracking-[1px]">Institutional Grade Security</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-black tracking-tight">
            My <span className="text-emerald-500 italic underline decoration-emerald-100 underline-offset-4">Vault.</span>
          </h1>
        </header>

        {/* --- WALLET SECTION --- */}
        <section className="space-y-6 mb-12 md:mb-16">
          <div className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-7 text-left">
                <p className="text-black text-[10px] font-black uppercase tracking-[3px] mb-2 flex items-center gap-2">
                  <Landmark size={14} /> Global Portfolio Value
                </p>
                <div className="flex items-baseline gap-2 overflow-hidden">
                  <span className="text-2xl md:text-3xl font-black text-black opacity-30">₹</span>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter truncate">
                    {balance.toLocaleString()}
                  </h2>
                </div>
                <div className="mt-6 flex flex-wrap gap-2 md:gap-3">
                  <div className="bg-emerald-50 text-emerald-600 px-3 md:px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border border-emerald-100 whitespace-nowrap">Growth: +12.5%</div>
                  <div className="bg-black text-white px-3 md:px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider whitespace-nowrap">Instant Payouts</div>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4">
                <button onClick={() => setModalType("deposit")} className="group bg-emerald-600 hover:bg-emerald-700 text-white p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all flex flex-col justify-between h-32 md:h-40 shadow-lg shadow-emerald-100">
                  <Plus className="group-hover:rotate-90 transition-transform" size={20} />
                  <div className="text-left">
                    <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Inflow</p>
                    <p className="text-base md:text-xl font-black uppercase">Deposit</p>
                  </div>
                </button>
                <button onClick={() => setModalType("withdraw")} className="group bg-black hover:bg-slate-800 text-white p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all flex flex-col justify-between h-32 md:h-40">
                  <ArrowDownLeft className="group-hover:-translate-x-1 transition-transform" size={20} />
                  <div className="text-left">
                    <p className="text-[9px] font-bold opacity-70 uppercase tracking-widest">Outflow</p>
                    <p className="text-base md:text-xl font-black uppercase">Withdraw</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <StatCard label="Total Deposit" value={totalDeposit} color="emerald" />
            <StatCard label="Total Withdraw" value={totalWithdraw} color="black" />
            <StatCard label="Bonus Balance" value={8500} color="emerald" isBonus />
          </div>
        </section>

        {/* --- TRANSACTION HISTORY --- */}
        <section className="mb-10">
          <div className="bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-5 md:px-8 md:py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/20">
              <h4 className="text-[10px] font-black uppercase tracking-[3px] flex items-center gap-2 text-black">
                <History size={16} /> Asset Transaction History
              </h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <tbody className="divide-y divide-slate-50">
                  {transactions.map(tx => (
                    <tr key={tx.id} className="group hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 md:px-8 md:py-6">
                         <p className="text-[9px] font-black text-black/30 uppercase tracking-widest mb-1">{tx.date}</p>
                         <p className="text-sm font-black text-black uppercase">{tx.method}</p>
                      </td>
                      <td className="px-6 py-4 md:px-8 md:py-6 text-right">
                         <p className={`text-base md:text-lg font-black ${tx.type === 'deposit' ? 'text-emerald-600' : 'text-black'}`}>{tx.type === 'deposit' ? '+' : '-'} ₹{tx.amount.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4 md:px-8 md:py-6 text-right">
                         <div className="w-8 h-8 rounded-full border border-slate-100 inline-flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all"><ChevronRight size={14} /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* --- MODALS --- */}
        <AnimatePresence>
          {modalType && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setModalType(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />
              
              <motion.div 
                initial={{ scale: 0.95, y: 20, opacity: 0 }} 
                animate={{ scale: 1, y: 0, opacity: 1 }} 
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                className="bg-white w-full max-w-xl rounded-[24px] md:rounded-[32px] overflow-hidden shadow-2xl relative z-10"
              >
                <button onClick={() => setModalType(null)} className="absolute right-4 md:right-6 top-4 md:top-6 text-black hover:opacity-70 transition-colors z-20"><X size={24} /></button>
                
                <div className="p-6 md:p-8 max-h-[90vh] overflow-y-auto scrollbar-hide">
                  <h2 className="text-xl md:text-2xl font-black text-black mb-2 uppercase tracking-tight">
                    {modalType === "deposit" ? "Add Funds" : "Withdraw Funds"}
                  </h2>
                  <p className="text-black/60 text-[11px] mb-6 font-bold">
                    {modalType === "deposit" ? "Select currency and enter amount to deposit" : `Enter withdrawal details. Available: ₹${balance.toLocaleString()}`}
                  </p>

                  <div className="mb-6 space-y-4">
                    <label className="text-[10px] font-black text-black uppercase tracking-widest block">Select Asset Currency</label>
                    <div className="flex gap-2">
                      {[
                        { code: "INR", symbol: "₹" },
                        { code: "USD", symbol: "$" },
                        { code: "USDT", symbol: "₮" }
                      ].map((curr) => (
                        <button
                          key={curr.code}
                          onClick={() => setCurrency(curr.code)}
                          className={`flex-1 py-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1
                            ${currency === curr.code 
                              ? "border-emerald-500 bg-emerald-50 text-emerald-700 font-bold" 
                              : "border-slate-100 bg-white text-black font-bold hover:border-slate-200"}`}
                        >
                          <span className="text-xs font-black">{curr.code}</span>
                          <span className="text-[9px] font-bold opacity-60">{curr.symbol}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-black uppercase tracking-widest block">
                        Enter Amount
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-black">
                          {currency === "INR" ? "₹" : currency === "USD" ? "$" : "₮"}
                        </span>
                        <input 
                          type="number" 
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00" 
                          className="w-full pl-10 pr-4 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-lg font-black text-black placeholder:text-black outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide border-b border-slate-100">
                    {(modalType === "deposit" 
                      ? ["UPI", "Bank Transfer", "USDT (Crypto)"] 
                      : ["UPI (INR Only)", "Bank Transfer (INR Only)", "USDT (TRC20)", "USDT (ERC20)", "USD Gateway"]
                    ).map((tab) => (
                      <button 
                        key={tab} onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all 
                        ${activeTab === tab ? "bg-emerald-600 text-white" : "bg-slate-50 text-black hover:bg-slate-100"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 md:p-6 border border-slate-100">
                    {modalType === "deposit" ? (
                      <div className="space-y-6">
                        {activeTab === "UPI" && (
                          <div className="text-center space-y-4">
                            <div className="w-36 h-36 md:w-44 md:h-44 bg-white mx-auto flex items-center justify-center rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden p-2">
                                <img src="/upi-qr.png" alt="UPI QR" className="w-full h-full object-contain" />
                            </div>
                            <p className="text-[10px] font-black text-black uppercase tracking-widest">Scan to Pay {currency === "INR" ? "₹" : currency === "USD" ? "$" : "₮"}{amount || "0"}</p>
                            <div className="bg-white p-3 rounded-xl border border-slate-100 flex items-center justify-between gap-2 overflow-hidden">
                              <span className="text-[11px] font-black text-black truncate">wipogroup@postbank</span>
                              <button onClick={() => copyLink("wipogroup@postbank")} className="text-emerald-600 text-[10px] font-black uppercase underline shrink-0">Copy</button>
                            </div>
                            <div className="space-y-4 pt-2">
                                <div className="text-left">
                                    <label className="text-[9px] font-black text-black uppercase block mb-1">Transaction ID / UTR</label>
                                    <input type="text" placeholder="12-digit UTR Number" className="w-full p-3 rounded-xl bg-white border border-slate-100 text-xs font-bold text-black placeholder:text-black outline-none" />
                                </div>
                                <UploadBox label="Upload Payment Screenshot" />
                            </div>
                          </div>
                        )}

                        {activeTab === "Bank Transfer" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 gap-3">
                              <DetailBox label="Account Name" value="WIPO Group Private Limited" />
                              <DetailBox label="Account Number" value="50200012345678" />
                              <DetailBox label="IFSC Code" value="HDFC0001234" />
                              <DetailBox label="Bank Name" value="HDFC Bank" />
                            </div>
                            <div className="pt-4 space-y-4">
                                <UploadBox label="Upload Bank Transfer Receipt" />
                            </div>
                          </div>
                        )}

                        {activeTab === "USDT (Crypto)" && (
                          <div className="text-center space-y-6">
                             <div className="flex p-1 bg-slate-200 rounded-xl">
                                <button onClick={() => setCryptoNetwork("TRC20")} className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${cryptoNetwork === 'TRC20' ? 'bg-emerald-600 text-white shadow-sm' : 'text-black font-bold'}`}>TRON (TRC20)</button>
                                <button onClick={() => setCryptoNetwork("ERC20")} className={`flex-1 py-2 rounded-lg text-[9px] font-black transition-all ${cryptoNetwork === 'ERC20' ? 'bg-emerald-600 text-white shadow-sm' : 'text-black font-bold'}`}>ETHEREUM (ERC20)</button>
                            </div>
                            <div className="w-36 h-36 md:w-44 md:h-44 bg-white mx-auto flex items-center justify-center rounded-2xl border-2 border-slate-100 shadow-sm p-2 overflow-hidden">
                                <img src="/usdt-qr.png" alt="USDT QR" className="w-full h-full object-contain" />
                            </div>
                            <div className="bg-white p-4 rounded-xl border border-slate-100 text-left">
                              <p className="text-[9px] font-black text-black mb-1 uppercase">USDT {cryptoNetwork} Address</p>
                              <p className="text-[10px] md:text-[11px] font-black text-black break-all leading-tight">
                                {cryptoNetwork === "TRC20" ? "TLmrfjXANu7f14P4qg9PuL2Q6p8v3aj62r" : "TLmrfjXANu7f14P4qg9PuL2Q6p8v3aj62r"}
                              </p>
                              <button onClick={() => copyLink(cryptoNetwork === "TRC20" ? "TLmrfjXANu7f14P4qg9PuL2Q6p8v3aj62r" : "TLmrfjXANu7f14P4qg9PuL2Q6p8v3aj62r")} className="mt-3 w-full py-2 bg-black text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Copy Address</button>
                            </div>
                            <div className="space-y-4">
                                <div className="text-left">
                                    <label className="text-[9px] font-black text-black uppercase block mb-1">Transaction Hash (TxID)</label>
                                    <div className="relative">
                                        <Hash size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
                                        <input type="text" placeholder="Paste hash here" className="w-full pl-9 pr-3 py-3 rounded-xl bg-white border border-slate-100 text-xs font-bold text-black placeholder:text-black outline-none" />
                                    </div>
                                </div>
                                <UploadBox label="Upload Transaction Screenshot" />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black text-black uppercase tracking-widest">{activeTab} Details</label>
                          <input type="text" placeholder={`Enter ${activeTab} address/ID...`} className="w-full p-4 rounded-xl bg-white border border-slate-100 text-sm font-black text-black placeholder:text-black outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all" />
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                           <p className="text-[10px] text-emerald-700 font-bold uppercase mb-1">Estimated Arrival</p>
                           <p className="text-xs font-black text-emerald-900">15-30 Minutes (Instant Payout Enabled)</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-8 py-4 md:py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-[20px] md:rounded-[24px] font-black text-xs uppercase tracking-[2px] transition-all shadow-xl shadow-emerald-100 active:scale-[0.98]">
                    {modalType === "deposit" ? "Submit Deposit Request" : "Submit Withdrawal Request"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}

// SUB-COMPONENTS - Keep unchanged
function UploadBox({ label }: { label: string }) {
    return (
        <div className="text-left">
            <label className="text-[9px] font-black text-black uppercase block mb-1">{label}</label>
            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-200 rounded-xl bg-white cursor-pointer hover:bg-emerald-50/30 hover:border-emerald-200 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={20} className="text-black group-hover:text-emerald-500 mb-1" />
                    <p className="text-[9px] font-black text-black group-hover:text-emerald-600 text-center px-2">JPG, PNG or PDF (Max 2MB)</p>
                </div>
                <input type="file" className="hidden" />
            </label>
        </div>
    )
}

function DetailBox({ label, value }: { label: string, value: string }) {
  return (
    <div className="bg-white p-3 md:p-4 rounded-xl border border-slate-100 flex justify-between items-center group hover:border-emerald-200 transition-all overflow-hidden gap-2">
      <div className="min-w-0">
        <p className="text-[8px] font-black text-black uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-[11px] md:text-[12px] font-black text-black tracking-tight truncate">{value}</p>
      </div>
      <button 
        onClick={() => navigator.clipboard.writeText(value)}
        className="p-2 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors shrink-0"
      >
        <Copy size={14} />
      </button>
    </div>
  );
}

function StatCard({ label, value, color, isBonus }: any) {
  return (
    <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group text-left h-full">
      <p className="text-black text-[9px] font-black uppercase tracking-[2px] mb-2 group-hover:text-emerald-500 transition-colors">{label}</p>
      <p className={`text-xl md:text-2xl font-black ${color === 'emerald' ? 'text-emerald-600' : 'text-black'}`}>₹{value.toLocaleString()}</p>
      {isBonus && <p className="text-[9px] font-black text-emerald-400 uppercase mt-1 italic tracking-tight flex items-center gap-1"><Zap size={10} /> +15% Boost Included</p>}
    </div>
  );
}