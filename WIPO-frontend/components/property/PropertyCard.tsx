"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, ArrowUpRight, IndianRupee, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/utils/formatPrice";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    image: string;
    type: "Residential" | "Commercial";
    status: "Available" | "Sold";
  };
  onClick?: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-500/10 cursor-pointer transition-all duration-300"
      onClick={onClick}
    >
      {/* --- Image Section --- */}
      <div className="relative h-72 w-full overflow-hidden">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        
        {/* Badges Overlay */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-sm">
            <ShieldCheck size={12} className="text-emerald-500" /> Verified
          </div>
          <div className={`px-3 py-1.5 rounded-full backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-sm ${
            property.status === "Available" ? "bg-emerald-500/80" : "bg-red-500/80"
          }`}>
            {property.status}
          </div>
        </div>

        {/* Floating Price Tag */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl flex items-center gap-1 shadow-xl">
            <IndianRupee size={14} className="text-emerald-400" />
            <span className="text-lg font-black tracking-tight">
               {property.price >= 10000000 ? `${(property.price / 10000000).toFixed(2)} Cr` : `${(property.price / 100000).toFixed(2)} L`}
            </span>
          </div>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[2px]">
              {property.type}
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight line-clamp-1">
            {property.title}
          </h3>
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin size={14} />
            <span className="text-xs font-medium uppercase tracking-tight">{property.location}</span>
          </div>
        </div>

        {/* --- Footer / Quick Features --- */}
        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex -space-x-2">
            {/* Mock avatars of other investors interested */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="investor" />
              </div>
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-white bg-emerald-50 flex items-center justify-center text-[8px] font-bold text-emerald-600">
              +12
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            12.5% Target Yield
          </p>
        </div>
      </div>

      {/* Hover Overlay Line */}
      <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 w-0 group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};

export default PropertyCard;