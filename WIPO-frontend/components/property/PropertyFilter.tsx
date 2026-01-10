"use client";

import React, { useState } from "react";
import { Building2, CircleDollarSign, Filter, Search, X } from "lucide-react";

interface PropertyFilterProps {
  onChange: (filters: { type?: string; status?: string }) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({ onChange }) => {
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const handleApply = () => {
    onChange({ type, status });
  };

  const handleReset = () => {
    setType("");
    setStatus("");
    onChange({});
  };

  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
        
        {/* --- Property Type Selector --- */}
        <div className="relative w-full lg:flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            <Building2 size={18} />
          </div>
          <select
            className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none appearance-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all cursor-pointer"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All Asset Types</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
        </div>

        {/* --- Status Selector --- */}
        <div className="relative w-full lg:flex-1 group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            <CircleDollarSign size={18} />
          </div>
          <select
            className="w-full h-14 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-900 outline-none appearance-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all cursor-pointer"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Any Status</option>
            <option value="Available">Available</option>
            <option value="Sold">Sold Out</option>
          </select>
        </div>

        {/* --- Action Buttons --- */}
        <div className="flex items-center gap-2 w-full lg:w-auto">
          {/* Reset Button */}
          {(type || status) && (
            <button
              onClick={handleReset}
              className="h-14 px-4 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center"
              title="Reset Filters"
            >
              <X size={20} />
            </button>
          )}

          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="flex-1 lg:flex-none h-14 px-8 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[2px] hover:bg-emerald-600 shadow-lg shadow-slate-200 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Filter size={16} strokeWidth={3} />
            Find Assets
          </button>
        </div>

      </div>

      {/* Quick Chips (Optional) */}
      <div className="flex gap-2 mt-4 overflow-x-auto pb-2 no-scrollbar">
        {['Commercial', 'Residential', 'Available'].map((chip) => (
          <button
            key={chip}
            onClick={() => {
                if (chip === 'Available') setStatus(chip);
                else setType(chip);
            }}
            className="whitespace-nowrap px-4 py-1.5 rounded-full bg-white border border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider hover:border-emerald-500 hover:text-emerald-600 transition-all"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertyFilter;