"use client";

import React, { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

interface ReferralCodeBoxProps {
  code: string;
  onCopy?: () => void;
}

const ReferralCodeBox: React.FC<ReferralCodeBoxProps> = ({ code, onCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-3">
      {/* Container */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 p-2 rounded-2xl group focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-500/5 transition-all duration-300">
        
        {/* Code Section */}
        <div className="flex items-center gap-3 pl-3">
          <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-100">
             <Share2 size={14} className="text-slate-400" />
          </div>
          <span className="font-black text-slate-900 tracking-[3px] text-lg font-mono uppercase">
            {code}
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopy}
          className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 overflow-hidden ${
            copied 
            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200" 
            : "bg-slate-900 text-white hover:bg-emerald-600 shadow-lg shadow-slate-200"
          }`}
        >
          <div className="relative z-10 flex items-center gap-2">
            {copied ? (
              <>
                <Check size={14} strokeWidth={3} />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy size={14} strokeWidth={3} />
                <span>Copy</span>
              </>
            )}
          </div>
          
          {/* Subtle shimmer effect on hover */}
          <div className="absolute inset-0 bg-white/10 w-1/2 h-full skew-x-[45deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
        </button>
      </div>
      
      {/* Help Text */}
      <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-widest">
        Click to copy your unique invitation link
      </p>
    </div>
  );
};

export default ReferralCodeBox;