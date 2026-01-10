"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  UsersRound, 
  MessageSquare, 
  Zap 
} from "lucide-react"; // Icons ke liye lucide-react use kiya hai

const adminLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Properties", path: "/admin/properties", icon: Building2 },
  { name: "Committees", path: "/admin/committees", icon: UsersRound },
  { name: "Enquiries", path: "/admin/enquiries", icon: MessageSquare },
  { name: "Referrals", path: "/admin/referrals", icon: Zap },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-slate-950 text-slate-400 min-h-screen p-6 flex flex-col border-r border-slate-800">
      {/* --- Branding Area --- */}
      <div className="mb-10 px-2">
        <Link href="/" className="inline-block transition-transform hover:scale-105">
          <Image 
            src="/wipo-logo.png" 
            alt="WIPO Logo" 
            width={110} 
            height={35} 
            className="object-contain"
            priority
          />
        </Link>
        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[3px] mt-3 ml-1">
          Admin Control
        </p>
      </div>

      {/* --- Navigation --- */}
      <nav className="flex-1 space-y-1.5">
        {adminLinks.map((link) => {
          const isActive = pathname === link.path;
          const Icon = link.icon;

          return (
            <Link
              key={link.path}
              href={link.path}
              className="group block"
            >
              <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-emerald-600/10 text-emerald-500 border border-emerald-500/20"
                  : "hover:bg-slate-900 hover:text-slate-200 border border-transparent"
              }`}>
                <Icon size={18} className={`${isActive ? "text-emerald-500" : "text-slate-500 group-hover:text-slate-200"}`} />
                <span className="text-sm font-bold tracking-wide">
                  {link.name}
                </span>
                {isActive && (
                  <motion.div 
                    layoutId="active-pill"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* --- User Footer --- */}
      <div className="mt-auto pt-6 border-t border-slate-900">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 font-bold text-xs">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-200 leading-none">Admin User</span>
            <span className="text-[10px] text-slate-500 mt-1">Super Admin</span>
          </div>
        </div>
      </div>
    </aside>
  );
}