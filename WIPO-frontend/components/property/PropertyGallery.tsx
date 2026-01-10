"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";

interface PropertyGalleryProps {
  images: string[]; // Hum details page ke liye images array le rahe hain
}

const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* --- Main Featured Image --- */}
      <div className="relative h-[400px] md:h-[600px] w-full group overflow-hidden rounded-[32px] bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[activeImage]}
              alt="Property Featured"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            className="p-3 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
            className="p-3 bg-white/90 backdrop-blur-md rounded-2xl hover:bg-emerald-500 hover:text-white transition-all shadow-xl"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Expand Icon */}
        <div className="absolute top-6 right-6">
          <div className="p-3 bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl text-white cursor-pointer hover:bg-white hover:text-slate-900 transition-all">
            <Maximize2 size={20} />
          </div>
        </div>
      </div>

      {/* --- Thumbnail Strip --- */}
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl overflow-hidden transition-all duration-300 border-2 ${
              activeImage === idx 
              ? "border-emerald-500 scale-95 shadow-lg shadow-emerald-500/20" 
              : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={img}
              alt={`Thumbnail ${idx}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
        
        {/* "View All" Placeholder */}
        <button className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-slate-900 flex flex-col items-center justify-center text-white gap-2 group hover:bg-emerald-600 transition-all">
          <LayoutGrid size={24} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="text-[10px] font-black uppercase tracking-widest">All Photos</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyGallery;