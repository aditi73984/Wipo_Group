"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Clock, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setIsSuccess(true);
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setIsSuccess(false), 4000);
  };

  return (
    <section className="min-h-screen bg-white relative overflow-hidden pt-32 md:pt-40 pb-20 px-4">
      
      {/* --- Background Design Elements --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-50 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-green-50 rounded-full blur-[100px] opacity-60" />
      </div>

      <div className="container max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest"
          >
            <MessageSquare size={14} /> Help & Support Center
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            How can we help you?
          </h1>
          <p className="text-slate-500 font-medium text-lg">
            Our dedicated support team is here to assist you with your WIPO account, investments, and technical queries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left: Contact Information Cards */}
          <div className="space-y-6">
            <h2 className="text-xl font-black text-slate-800 mb-4">Official Channels</h2>
            
            {[
              { icon: Mail, title: "Email Support", desc: "wipogroupn@gmail.com", sub: "24/7 Response Rate" },
              { icon: Clock, title: "Phone Number", desc: "+1(938)2090088", sub: "Mon - Sat: 10AM - 7PM" },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ x: 10 }}
                className="p-6 bg-slate-50 border border-slate-100 rounded-[30px] flex gap-5"
              >
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-emerald-600 border border-slate-100">
                  <item.icon size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{item.title}</h3>
                  <p className="text-black font-black text-sm">{item.desc}</p>
                  <p className="text-[10px] text-emerald-600 font-black uppercase mt-1 tracking-wider">{item.sub}</p>
                </div>
              </motion.div>
            ))}

            <div className="p-8 bg-emerald-900 rounded-[40px] text-white relative overflow-hidden group">
               <div className="relative z-10">
                  <h3 className="text-xl font-black mb-2 italic">Priority Support?</h3>
                  <p className="text-emerald-100/70 text-sm font-medium mb-4">WIPO Premium members get dedicated account managers.</p>
                  <button className="text-xs font-black uppercase tracking-widest bg-emerald-500 hover:bg-white hover:text-emerald-900 px-6 py-3 rounded-xl transition-all">Learn More</button>
               </div>
               <ShieldCheck className="absolute -bottom-4 -right-4 text-emerald-800 opacity-20 group-hover:scale-125 transition-transform duration-500" size={140} />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white border border-slate-100 shadow-2xl shadow-slate-200/50 rounded-[40px] p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Aman Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-black placeholder:text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-black placeholder:text-black"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Your Message</label>
                  <textarea 
                    required 
                    rows={5}
                    placeholder="How can we assist you today?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-6 py-4 rounded-3xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all font-bold text-black placeholder:text-black resize-none"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className={`w-full py-5 rounded-2xl font-black text-sm flex items-center justify-center gap-3 transition-all shadow-xl ${
                    isSuccess ? "bg-green-500 text-white" : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-100"
                  }`}
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isSuccess ? (
                    <>Sent Successfully <CheckCircle2 size={18} /></>
                  ) : (
                    <>Send Official Message <Send size={18} /></>
                  )}
                </motion.button>
                
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Our team typically responds within 2-4 business hours.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}