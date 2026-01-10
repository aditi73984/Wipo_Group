"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, CheckCircle2, UploadCloud, 
  Smartphone, ShieldCheck, CreditCard, Lock, ArrowRight, Send
} from "lucide-react";

export default function KYCPage() {
  const [isPending, setIsPending] = useState(false);
  
  // Email States
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  
  // Phone States
  const [phoneSent, setPhoneSent] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [formData, setFormData] = useState({
    email: "", phone: "", aadharNo: "", panNo: "",
    aadharFile: null as File | null,
    panFile: null as File | null,
  });

  const aadharRef = useRef<HTMLInputElement>(null);
  const panRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!emailVerified || !phoneVerified) return alert("Pehle Email aur Phone verify karein!");
    setIsPending(true);
  };

  return (
    <section className="min-h-screen w-full bg-white pt-28 pb-12 px-4 md:px-6 flex justify-center items-start font-sans">
      <div className="max-w-2xl w-full">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 border border-emerald-100">
            Secure Verification
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Complete your <span className="text-emerald-500">KYC</span>
          </h1>
          <p className="text-black/60 font-bold mt-2 text-sm">
            Please provide your details to unlock full account features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* 1. EMAIL VERIFICATION */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 bg-emerald-500 text-white rounded-full text-xs font-black shadow-lg shadow-emerald-100">1</span>
              <h3 className="font-black text-black uppercase text-xs tracking-wider">Email Authentication</h3>
            </div>
            
            <div className={`p-1 bg-white border-2 rounded-[22px] transition-all duration-300 ${emailVerified ? 'border-emerald-500' : 'border-slate-100 group-focus-within:border-emerald-100'}`}>
              <div className="flex flex-col md:flex-row gap-2">
                <input 
                  type="email" 
                  disabled={emailVerified}
                  placeholder="yourname@email.com" 
                  className="flex-[2] px-5 py-4 bg-transparent outline-none font-bold text-sm text-black placeholder:text-black/40 disabled:opacity-50"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                {!emailSent && !emailVerified && (
                  <button 
                    type="button"
                    onClick={() => setEmailSent(true)}
                    className="m-1 px-6 py-3 bg-emerald-500 text-white text-[11px] font-black uppercase rounded-[16px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-100"
                  >
                    Send OTP <Send size={14}/>
                  </button>
                )}
              </div>

              <AnimatePresence>
                {emailSent && !emailVerified && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-4 overflow-hidden">
                    <div className="flex gap-2 pt-2 border-t border-slate-50">
                      <input 
                        type="text" placeholder="Enter 6-Digit Code" 
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-center font-black tracking-widest text-sm text-black placeholder:text-black/30"
                      />
                      <button 
                        type="button"
                        onClick={() => setEmailVerified(true)}
                        className="px-8 py-3 bg-black text-white text-[11px] font-black uppercase rounded-xl hover:bg-zinc-800 transition-all"
                      >
                        Verify
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {emailVerified && (
                <div className="px-5 pb-4 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase">
                  <CheckCircle2 size={14} /> Verified Successfully
                </div>
              )}
            </div>
          </div>

          {/* 2. PHONE VERIFICATION */}
          <div className="group">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 bg-emerald-500 text-white rounded-full text-xs font-black shadow-lg shadow-emerald-100">2</span>
              <h3 className="font-black text-black uppercase text-xs tracking-wider">Phone Verification</h3>
            </div>
            
            <div className={`p-1 bg-white border-2 rounded-[22px] transition-all duration-300 ${phoneVerified ? 'border-emerald-500' : 'border-slate-100 group-focus-within:border-emerald-100'}`}>
              <div className="flex flex-col md:flex-row gap-2">
                <input 
                  type="tel" 
                  disabled={phoneVerified}
                  placeholder="+91 00000 00000" 
                  className="flex-[2] px-5 py-4 bg-transparent outline-none font-bold text-sm text-black placeholder:text-black/40 disabled:opacity-50"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                {!phoneSent && !phoneVerified && (
                  <button 
                    type="button"
                    onClick={() => setPhoneSent(true)}
                    className="m-1 px-6 py-3 bg-emerald-500 text-white text-[11px] font-black uppercase rounded-[16px] hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-100"
                  >
                    Get OTP <Send size={14}/>
                  </button>
                )}
              </div>

              <AnimatePresence>
                {phoneSent && !phoneVerified && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="px-5 pb-4 overflow-hidden">
                    <div className="flex gap-2 pt-2 border-t border-slate-50">
                      <input 
                        type="text" placeholder="SMS OTP Code" 
                        className="flex-1 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl outline-none text-center font-black tracking-widest text-sm text-black placeholder:text-black/30"
                      />
                      <button 
                        type="button"
                        onClick={() => setPhoneVerified(true)}
                        className="px-8 py-3 bg-black text-white text-[11px] font-black uppercase rounded-xl hover:bg-zinc-800 transition-all"
                      >
                        Verify
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {phoneVerified && (
                <div className="px-5 pb-4 flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase">
                  <CheckCircle2 size={14} /> Mobile Verified
                </div>
              )}
            </div>
          </div>

          {/* 3. DOCUMENT UPLOAD */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">Aadhar Card</label>
              <div className="bg-white border-2 border-slate-100 rounded-[22px] p-4 hover:border-emerald-100 transition-all">
                <input 
                  type="text" placeholder="12 Digit Number" 
                  className="w-full bg-transparent outline-none font-black text-sm mb-4 px-1 text-black placeholder:text-black/30"
                  onChange={(e) => setFormData({...formData, aadharNo: e.target.value})}
                />
                <div onClick={() => aadharRef.current?.click()} className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/30 transition-all">
                  <input type="file" ref={aadharRef} className="hidden" onChange={(e) => setFormData({...formData, aadharFile: e.target.files?.[0] || null})} />
                  <UploadCloud size={24} className="text-emerald-500 mb-2" />
                  <span className="text-[9px] font-black text-black uppercase tracking-tighter text-center">
                    {formData.aadharFile ? formData.aadharFile.name : "Front Side Photo"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-black uppercase tracking-widest ml-1">PAN Card</label>
              <div className="bg-white border-2 border-slate-100 rounded-[22px] p-4 hover:border-emerald-100 transition-all">
                <input 
                  type="text" placeholder="PAN Number" 
                  className="w-full bg-transparent outline-none font-black text-sm mb-4 px-1 uppercase text-black placeholder:text-black/30"
                  onChange={(e) => setFormData({...formData, panNo: e.target.value})}
                />
                <div onClick={() => panRef.current?.click()} className="bg-slate-50 rounded-xl p-6 border border-dashed border-slate-200 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/30 transition-all">
                  <input type="file" ref={panRef} className="hidden" onChange={(e) => setFormData({...formData, panFile: e.target.files?.[0] || null})} />
                  <UploadCloud size={24} className="text-emerald-500 mb-2" />
                  <span className="text-[9px] font-black text-black uppercase tracking-tighter text-center">
                    {formData.panFile ? formData.panFile.name : "PAN Card Photo"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-8">
            <button 
              type="submit"
              disabled={isPending}
              className="w-full py-5 bg-emerald-500 text-white font-black rounded-[22px] shadow-xl shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3"
            >
              {isPending ? "Submitting..." : <>Complete KYC Process <ArrowRight size={16}/></>}
            </button>
            <div className="mt-6 flex items-center justify-center gap-2 text-black/20">
              <Lock size={12} />
              <p className="text-[9px] font-black uppercase tracking-widest">End-to-End Encrypted Verification</p>
            </div>
          </div>
        </form>

        {/* Success Modal */}
        <AnimatePresence>
          {isPending && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-white/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="bg-white rounded-[40px] p-10 max-w-sm w-full text-center shadow-2xl border border-emerald-50">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-200">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-black text-black uppercase tracking-tight">Success!</h2>
                <p className="text-black/60 mt-3 text-sm font-bold leading-relaxed">
                  Aapke documents verify ho rahe hain. Agle 24 hours mein update mil jayega.
                </p>
                <button 
                  onClick={() => setIsPending(false)} 
                  className="mt-8 w-full py-4 bg-black text-white font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-zinc-800 transition-all"
                >
                  Back to Dashboard
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}