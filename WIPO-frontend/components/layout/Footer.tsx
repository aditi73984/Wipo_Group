"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Youtube, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white border-t border-slate-100 pt-12 pb-8">
      {/* --- Main Wrapper --- */}
      <div className="w-full px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Section - Mobile Centered */}
          <div className="space-y-6 text-center md:text-left flex flex-col items-center md:items-start">
            <Link href="/" className="inline-block transition-transform duration-300 hover:scale-105">
              <Image src="/wipo-logo.png" alt="WIPO Logo" width={130} height={40} className="object-contain" />
            </Link>
            <p className="text-slate-600 text-base leading-relaxed font-medium max-w-xs md:max-w-none">
              Your trusted partner in real estate and investment since 2009. 
              We simplify property growth for everyone.
            </p>
            {/* Social Links */}
            <div className="flex gap-4 justify-center md:justify-start">
              {[
                { Icon: Instagram, href: "https://instagram.com" },
                { Icon: Facebook, href: "https://facebook.com" },
                { Icon: Linkedin, href: "https://linkedin.com" },
                { Icon: Youtube, href: "https://youtube.com" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-50 text-slate-500 hover:bg-emerald-600 hover:text-white hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300"
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Company Links */}
          <div className="text-center md:text-left">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-[2px] mb-6">Company</h4>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Us", path: "/contact" },
                { name: "Properties", path: "/properties" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="group text-slate-600 hover:text-emerald-600 text-[15px] font-bold flex items-center justify-center md:justify-start transition-all duration-300"
                  >
                    <span className="hidden md:block w-0 group-hover:w-4 h-[2px] bg-emerald-500 mr-0 group-hover:mr-3 transition-all duration-300 rounded-full" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Legal Links */}
          <div className="text-center md:text-left">
            <h4 className="text-slate-900 font-black text-sm uppercase tracking-[2px] mb-6">Legal</h4>
            <ul className="space-y-4">
              {[
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Refund Policy", path: "/refund" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="group text-slate-600 hover:text-emerald-600 text-[15px] font-bold flex items-center justify-center md:justify-start transition-all duration-300"
                  >
                    <ArrowUpRight size={14} className="mr-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all text-emerald-500" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Section - Optimized for Mobile touch */}
          <div className="bg-emerald-50/50 p-6 rounded-[32px] border border-emerald-100/50 space-y-5 flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-emerald-900 font-black text-sm uppercase tracking-[2px]">Quick Connect</h4>
            
            <a href="mailto:support@wipogroup.in" className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Mail size={18} />
              </div>
              <span className="text-[15px] font-bold text-slate-700 group-hover:text-emerald-600 transition-colors underline decoration-emerald-200 underline-offset-4">
                  wipogroupn@gmail.com
              </span>
            </a>

            <a href="tel:+919759209006" className="flex flex-col md:flex-row items-center gap-3 md:gap-4 group">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Phone size={18} />
              </div>
              <span className="text-[15px] font-bold text-slate-700 group-hover:text-emerald-600 transition-colors">
                +1(938)2090088
              </span>
            </a>

            
          </div>

        </div>

        {/* --- Bottom Footer --- */}
        <div className="pt-8 border-t border-slate-100 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-slate-500 text-[12px] md:text-sm font-bold tracking-tight">
              © {new Date().getFullYear()} WIPO GROUP. ALL RIGHTS RESERVED.
            </p>
          </div>

          <button 
            onClick={scrollToTop}
            className="text-sm font-black text-emerald-600 hover:text-emerald-700 uppercase tracking-widest flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
          >
            Back to Top <ArrowUpRight size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}