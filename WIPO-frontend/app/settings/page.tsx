"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Lock, Bell, Shield, Camera, 
  CheckCircle2, Globe, LogOut, Settings, Trash2 
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Form States
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john@wipo.in",
    mobile: "+91 9876543210",
    timezone: "IST (India) - GMT+5:30",
    twoFactor: false,
    notifications: {
      email: true,
      sms: false,
      browser: true
    }
  });

  // --- GLOBAL SIGN OUT LOGIC ---
  const handleSignOut = async () => {
    const confirmLogout = confirm("Are you sure you want to sign out from all devices?");
    
    if (confirmLogout) {
      setIsLoggingOut(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.clear();
      sessionStorage.clear();
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      router.replace("/auth/login");
      window.location.href = "/auth/login";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key: string) => {
    setProfileData({
      ...profileData,
      notifications: { 
        //@ts-ignore
        ...profileData.notifications, [key]: !profileData.notifications[key] 
      }
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
  ];

  return (
    <section className="min-h-screen w-full bg-[#F8FAFC] pt-28 pb-12 px-4">
      {/* Logout Overlay Loader */}
      {isLoggingOut && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-[999] flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="font-bold text-black">Signing out securely...</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg shadow-sm">
            <Settings size={24} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-black tracking-tight">Account Settings</h1>
            <p className="text-black/60 text-sm font-medium">Manage your personal information and security</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${
                  activeTab === tab.id 
                  ? "bg-emerald-600 text-white shadow-xl shadow-emerald-100 scale-[1.02]" 
                  : "bg-white text-black hover:bg-slate-50 border border-slate-100"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
            
            <div className="mt-4 pt-4 border-t border-slate-200">
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm text-red-600 hover:bg-red-50 transition-all border border-transparent hover:border-red-100 group"
              >
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                Global Sign Out
              </button>
            </div>
          </div>

          {/* Settings Content Area */}
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-9 bg-white border border-slate-200 rounded-[32px] p-6 md:p-10 shadow-sm relative"
          >
            <AnimatePresence mode="wait">
              
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="flex items-center gap-6 pb-6 border-b border-slate-50">
                    <div className="relative group">
                      <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-md overflow-hidden ring-1 ring-slate-200">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profileData.name}`} 
                          alt="Profile" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <button className="absolute bottom-0 right-0 p-2.5 bg-emerald-600 text-white rounded-full shadow-lg border-2 border-white hover:bg-emerald-700 transition-all">
                        <Camera size={14} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-black">{profileData.name}</h3>
                      <p className="text-sm text-black/50 font-medium">Administrator Profile</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">Full Name</label>
                      <input type="text" name="name" value={profileData.name} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm text-black" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-black uppercase tracking-widest ml-1">Email</label>
                      <input type="email" name="email" value={profileData.email} onChange={handleInputChange} className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-sm text-black" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                  <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Shield size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-black">Two-Factor Authentication</p>
                        <p className="text-xs text-black/60 font-medium">{profileData.twoFactor ? "Enabled" : "Disabled"}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setProfileData({...profileData, twoFactor: !profileData.twoFactor})}
                      className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${profileData.twoFactor ? "bg-red-500 text-white" : "bg-emerald-600 text-white"}`}
                    >
                      {profileData.twoFactor ? "Disable" : "Enable Now"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  {Object.entries(profileData.notifications).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-sm font-bold text-black capitalize">{key} Alerts</p>
                      <button 
                        onClick={() => toggleNotification(key)}
                        className={`w-12 h-6 rounded-full relative transition-all ${val ? "bg-emerald-600" : "bg-slate-300"}`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${val ? "left-7" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Privacy Tab */}
              {activeTab === "privacy" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center py-10">
                  <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-black">Danger Zone</h3>
                  <button className="mt-4 px-8 py-3 bg-red-100 text-red-600 font-bold rounded-2xl hover:bg-red-200 transition-all">
                    Delete My Account
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Save Buttons */}
            <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-end gap-4">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`px-10 py-3.5 rounded-2xl text-sm font-bold flex items-center gap-2 transition-all shadow-xl ${
                  isSuccess ? "bg-green-600 text-white shadow-green-100" : "bg-black text-white hover:bg-black shadow-slate-200"
                } disabled:opacity-70`}
              >
                {isSaving ? "Saving..." : isSuccess ? "Changes Saved" : "Save All Changes"}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}