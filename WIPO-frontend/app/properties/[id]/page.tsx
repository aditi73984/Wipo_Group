'use client';

import React, { use } from "react"; // 'use' hook import kiya
import { motion } from "framer-motion";
import { formatPrice } from "@/utils/formatPrice";
import PropertyGallery from "@/components/property/PropertyGallery";
import PropertyEnquiryForm from "@/components/property/PropertyEnquiryForm";
import { MapPin, Home, Info, ShieldCheck, TrendingUp } from "lucide-react";

interface PropertyDetails {
  id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  images: string[];
  type: "Residential" | "Commercial";
  status: "Available" | "Sold";
  roi?: string;
  sqft?: string;
  bhk?: string;
}

const getPropertyData = (id: string): PropertyDetails => ({
  id,
  title: "Emerald Heights Luxury Villa",
  location: "Beverly Hills, CA",
  price: 42000000,
  description:
    "Experience the pinnacle of luxury living in this architectural masterpiece. Featuring panoramic city views, a private infinity pool, and state-of-the-art smart home integration.",
  images: [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
  ],
  type: "Residential",
  status: "Available",
  roi: "+12.4%",
  sqft: "4,500",
  bhk: "4 BHK"
});

// Interface for Page Props with Promise
interface PageProps {
  params: Promise<{ id: string }>;
}

export default function PropertyDetailsPage({ params }: PageProps) {
  // NEXT.JS 15 FIX: Unwrap params using React.use()
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const property = getPropertyData(id);

  return (
    <main className="min-h-screen bg-[#fafdfc]">
      <section className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10"
          >
            <div>
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                {property.type} • {property.status}
              </span>
              <h1 className="text-4xl md:text-6xl font-[1000] text-slate-900 tracking-tight">
                {property.title}
              </h1>
              <div className="flex items-center gap-2 text-slate-500 mt-4">
                <MapPin className="text-emerald-500" size={20} />
                <span className="text-lg font-medium">{property.location}</span>
              </div>
            </div>
            
            <div className="text-left md:text-right bg-white p-6 rounded-[30px] border border-emerald-50 shadow-xl shadow-emerald-900/5">
              <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Investment Value</p>
              <p className="text-4xl font-[1000] text-emerald-600 tracking-tighter">
                {formatPrice(property.price)}
              </p>
            </div>
          </motion.div>

          {/* Gallery */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-[40px] overflow-hidden shadow-2xl"
          >
            <PropertyGallery images={property.images} />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-16">
            <div className="lg:col-span-2 space-y-10">
              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard icon={<Home />} label="Space" value={`${property.sqft} Sqft`} />
                <StatCard icon={<ShieldCheck />} label="Verified" value="Wipo Group" />
                <StatCard icon={<TrendingUp />} label="ROI" value={property.roi || "N/A"} color="text-emerald-600" />
                <StatCard icon={<Info />} label="Configuration" value={property.bhk || "N/A"} />
              </div>

              {/* Description */}
              <div className="bg-white rounded-[40px] p-8 md:p-12 border border-emerald-50 shadow-sm">
                <h2 className="text-2xl font-black text-slate-900 mb-6">Property Overview</h2>
                <p className="text-slate-600 leading-relaxed text-lg">{property.description}</p>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="relative">
              <div className="sticky top-28">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-[40px] p-8 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10"
                >
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Interested?</h3>
                  <p className="text-slate-500 text-sm mb-8">Get expert consultation for this asset.</p>
                  <PropertyEnquiryForm propertyId={property.id} />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function StatCard({ icon, label, value, color = "text-slate-900" }: any) {
  return (
    <div className="bg-white p-6 rounded-[30px] border border-emerald-50 flex flex-col items-center text-center shadow-sm">
      <div className="text-emerald-500 mb-3">{icon}</div>
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{label}</p>
      <p className={`text-lg font-black ${color}`}>{value}</p>
    </div>
  );
}