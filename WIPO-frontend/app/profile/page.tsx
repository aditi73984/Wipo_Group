"use client";

import { useState, useRef, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, ShieldCheck, 
  Camera, Calendar, MapPin, Hash, Check, X
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Final User State
  const [user, setUser] = useState({
    name: "Aryan Sharma",
    email: "aryan.sharma@example.com",
    phone: "+91 98765 43210",
    kycStatus: "Verified",
    memberSince: "January 2024",
    location: "Mumbai, India",
    accountId: "KYC-882941",
    profilePic: "" // Base64 ya URL yahan save hoga
  });

  // Edit Mode ke liye Temporary State
  const [tempUser, setTempUser] = useState({ ...user });

  // Photo Change Handler
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempUser({ ...tempUser, profilePic: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setUser({ ...tempUser });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempUser({ ...user });
    setIsEditing(false);
  };

  return (
    <section className="min-h-screen w-full bg-white pt-28 pb-12 px-4 flex justify-center items-start font-sans">
      <div className="max-w-xl w-full">
        
        <motion.div 
          layout
          className="bg-white border-2 border-slate-50 rounded-[40px] p-8 md:p-12 shadow-sm relative overflow-hidden"
        >
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 opacity-50"></div>

          {/* 1. PHOTO SECTION */}
          <div className="flex flex-col items-center mb-10">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-emerald-500 p-1 shadow-xl shadow-emerald-100 overflow-hidden">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                  {tempUser.profilePic ? (
                    <img 
                      src={tempUser.profilePic} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={60} className="text-slate-300" />
                  )}
                </div>
              </div>
              
              {/* Photo Upload Trigger */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute bottom-1 right-1"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handlePhotoChange}
                      className="hidden" 
                      accept="image/*"
                    />
                    <button 
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-emerald-500 text-white p-2.5 rounded-full border-4 border-white hover:bg-emerald-600 shadow-lg transition-all active:scale-90"
                    >
                      <Camera size={16} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="text-center mt-5 w-full">
              {isEditing ? (
                <input 
                  type="text" 
                  value={tempUser.name}
                  onChange={(e) => setTempUser({...tempUser, name: e.target.value})}
                  className="text-2xl font-black text-slate-900 uppercase tracking-tight text-center bg-emerald-50/50 border-b-2 border-emerald-500 outline-none w-full py-1 rounded-t-lg"
                  placeholder="Enter Name"
                />
              ) : (
                <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                  {user.name}
                </h1>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full mt-2 border border-emerald-100">
                <ShieldCheck size={14} strokeWidth={3} />
                <span className="text-[10px] font-black uppercase tracking-wider">{user.kycStatus}</span>
              </div>
            </div>
          </div>

          {/* 2. DETAILS SECTION */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[3px] mb-4 text-center">
              {isEditing ? "Editing Account Details" : "Account Details"}
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {/* Detail Items */}
              {[
                { id: 'email', label: 'Email Address', icon: <Mail size={18}/>, value: tempUser.email, type: 'email' },
                { id: 'phone', label: 'Phone Number', icon: <Phone size={18}/>, value: tempUser.phone, type: 'tel' },
                { id: 'location', label: 'Location', icon: <MapPin size={18}/>, value: tempUser.location, type: 'text' },
              ].map((item) => (
                <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${isEditing ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-50 bg-slate-50/50'}`}>
                  <div className={`p-3 rounded-xl shadow-sm transition-colors ${isEditing ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-500'}`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{item.label}</p>
                    {isEditing ? (
                      <input 
                        type={item.type}
                        value={item.value}
                        onChange={(e) => setTempUser({...tempUser, [item.id]: e.target.value})}
                        className="text-sm font-bold text-slate-800 bg-transparent outline-none w-full border-b border-emerald-100 focus:border-emerald-500 transition-colors"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-800">{user[item.id as keyof typeof user]}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Immutable Items (Non-editable) */}
              {!isEditing && (
                <>
                  <div className="flex items-center gap-4 p-4 bg-slate-50/20 rounded-2xl border border-slate-50 opacity-50">
                    <div className="p-3 bg-white text-emerald-500 rounded-xl shadow-sm"><Calendar size={18}/></div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Member Since</p>
                      <p className="text-sm font-bold text-slate-800">{user.memberSince}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-50/20 rounded-2xl border border-slate-50 opacity-50">
                    <div className="p-3 bg-white text-emerald-500 rounded-xl shadow-sm"><Hash size={18}/></div>
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Account ID</p>
                      <p className="text-sm font-bold text-slate-800">{user.accountId}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* 3. ACTION BUTTONS */}
          <div className="mt-10 flex gap-3">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl text-xs uppercase tracking-[2px] hover:bg-black transition-all active:scale-95 shadow-lg shadow-slate-200"
              >
                Edit Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={handleCancel}
                  className="flex-1 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl text-xs uppercase tracking-[1px] hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  <X size={14} /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="flex-[2] py-4 bg-emerald-500 text-white font-bold rounded-2xl text-xs uppercase tracking-[2px] hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
                >
                  <Check size={14} /> Save Profile
                </button>
              </>
            )}
          </div>
        </motion.div>

        {/* Security Info */}
        <p className="text-center mt-8 text-[9px] font-bold text-slate-300 uppercase tracking-[3px]">
          {isEditing ? "Review your changes before saving" : "Verified Profile • Encrypted Data"}
        </p>

      </div>
    </section>
  );
}