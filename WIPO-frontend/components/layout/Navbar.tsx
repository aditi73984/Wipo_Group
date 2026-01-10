'use client';

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Wallet,
  Settings,
  ShieldCheck,
  LogOut,
  ChevronDown,
  Menu,
  X
} from "lucide-react";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const privateLinks = [
  { name: "Committees", href: "/committees" },
  { name: "Wallet", href: "/Wallet" },
  { name: "Refer & Earn", href: "/refer-earn" },
];

const userMenuItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Wallet", href: "/Wallet", icon: Wallet }, 
  { name: "KYC Verification", href: "/kyc", icon: ShieldCheck },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const syncAuth = () => {
      const authState = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(authState);
    };
    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    router.push("/auth/login");
  };

  const activeLinks = isLoggedIn ? [...publicLinks, ...privateLinks] : publicLinks;

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${isScrolled ? "py-2" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`flex items-center justify-between px-3 md:px-6 py-2 rounded-full border transition-all duration-300 ${
            isScrolled 
              ? "bg-white/95 backdrop-blur-md border-slate-200 shadow-lg" 
              : "bg-white border-slate-100 shadow-sm"
          }`}
        >
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0 transition-transform active:scale-95">
            <Image
              src="/wipo-logo.png"
              alt="Logo"
              width={85}
              height={22}
              priority
              className="object-contain w-[65px] sm:w-[80px] md:w-[85px] h-auto"
            />
          </Link>

          {/* DESKTOP NAV - Hidden below 1024px (lg) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            {activeLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-[13px] xl:text-[14px] font-black text-black hover:text-emerald-600 transition-colors group tracking-tight whitespace-nowrap"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full rounded-full" />
              </Link>
            ))}
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 md:gap-2 bg-slate-50 border border-slate-200 p-1 md:pl-1.5 md:pr-3 rounded-full hover:bg-emerald-50 transition-all active:scale-95"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black shadow-sm shrink-0">
                    JD
                  </div>
                  <span className="font-black text-[12px] md:text-[13px] text-black hidden xs:block">Account</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-1.5 z-[110]"
                    >
                      {userMenuItems.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[14px] font-black text-black hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                        >
                          <item.icon className="w-4 h-4 text-emerald-600" />
                          {item.name}
                        </Link>
                      ))}
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] font-black text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-3">
                <Link href="/auth/login" className="font-black text-[13px] md:text-[14px] text-black hover:text-emerald-600 transition-colors px-2">
                  Log in
                </Link>
                <Link href="/auth/signup">
                  <button className="bg-emerald-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[12px] md:text-[13px] font-black hover:bg-emerald-700 transition-all shadow-md active:scale-95 whitespace-nowrap">
                    Get Started
                  </button>
                </Link>
              </div>
            )}

            {/* MOBILE MENU TOGGLE - Visible only on mobile/tablet */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="lg:hidden p-2 text-black hover:bg-slate-50 rounded-full transition-colors shrink-0"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>

        {/* MOBILE & TABLET OVERLAY MENU */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden mt-3 bg-white rounded-[2rem] shadow-2xl border border-slate-100 overflow-hidden z-[101]"
            >
              {/* Added scrollable area for long menus on small phones */}
              <div className="p-5 max-h-[80vh] overflow-y-auto overflow-x-hidden">
                <div className="flex flex-col gap-1">
                  {activeLinks.map(link => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block font-black text-[15px] text-black hover:text-emerald-600 hover:bg-emerald-50 px-4 py-3.5 rounded-xl transition-all"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                
                <div className="pt-4 mt-4 border-t border-slate-100">
                  {isLoggedIn ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {userMenuItems.map(item => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 font-black text-[14px] text-black px-4 py-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-all"
                        >
                          <item.icon className="w-4 h-4 text-emerald-600" /> {item.name}
                        </Link>
                      ))}
                      <button 
                        onClick={handleLogout} 
                        className="md:col-span-2 mt-2 py-4 bg-red-50 text-red-600 text-[14px] font-black rounded-full active:scale-95 transition-transform"
                      >
                        Logout Account
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link href="/auth/login" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center font-black text-[15px] text-black border border-slate-200 rounded-full active:scale-95">
                         Log in
                      </Link>
                      <Link href="/auth/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-4 text-center font-black text-[15px] bg-emerald-600 text-white rounded-full shadow-lg active:scale-95">
                         Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}