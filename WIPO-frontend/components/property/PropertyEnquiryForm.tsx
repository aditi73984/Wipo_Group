"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Mail, MessageSquare, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

interface PropertyEnquiryFormProps {
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
  propertyName?: string;
  propertyId?: string;
}

const PropertyEnquiryForm = ({ onSubmit, propertyName, propertyId }: PropertyEnquiryFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate Elite API call
    setTimeout(() => {
      if (onSubmit) onSubmit(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1800);
  };

  return (
    <div className="relative overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="enquiry-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Input Name */}
            <div className="group space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-500">
                <User size={12} /> Full Name
              </label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="w-full h-14 bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 rounded-2xl px-5 text-sm font-bold text-slate-900 transition-all outline-none placeholder:text-slate-300"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Input Email */}
            <div className="group space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-500">
                <Mail size={12} /> Work Email
              </label>
              <input
                required
                type="email"
                placeholder="email@company.com"
                className="w-full h-14 bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 rounded-2xl px-5 text-sm font-bold text-slate-900 transition-all outline-none placeholder:text-slate-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Input Message */}
            <div className="group space-y-1.5">
              <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-500">
                <MessageSquare size={12} /> Additional Notes
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share your investment goals or questions..."
                className="w-full bg-slate-50 border border-slate-100 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 rounded-2xl px-5 py-4 text-sm font-bold text-slate-900 transition-all outline-none resize-none placeholder:text-slate-300"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Elite Submit Button */}
            <motion.button
              disabled={isSubmitting}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full h-16 rounded-2xl font-black text-[11px] uppercase tracking-[2px] transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-slate-900 text-white hover:bg-emerald-600 shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/20"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <>
                  Express Interest <ArrowRight size={16} strokeWidth={3} />
                </>
              )}
            </motion.button>
            
            <div className="flex items-center justify-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              <ShieldCheck size={12} className="text-emerald-500" /> Secure Investment Protocol
            </div>
          </motion.form>
        ) : (
          /* SUCCESS STATE */
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-6"
          >
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} className="text-emerald-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Request Received</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                An investment consultant will contact you with the documentation for <br />
                <span className="text-slate-900 font-bold">"{propertyName || "this asset"}"</span> shortly.
              </p>
            </div>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-b-2 border-emerald-600 pb-0.5"
            >
              Send another enquiry
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyEnquiryForm;