"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, LayoutDashboard, PlusCircle, 
  Building, MapPin, Landmark, ArrowRight, 
  IndianRupee, UploadCloud, Bed, Bath, 
  Move, FileText, Trash2, Phone, Mail, Search
} from "lucide-react";
import Loader from "@/components/ui/Loader";

// --- TYPES ---
export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  type: "Residential" | "Commercial" | "Villa" | "Penthouse";
  area: string;
  bedrooms: string;
  bathrooms: string;
  description: string;
  images: string[];
  status: "Available" | "Sold";
  owner: "System" | "User";
}

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState<"buy" | "sell" | "list" | "contact">("buy");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [listForm, setListForm] = useState({
    title: "", location: "", price: "", type: "Residential" as any,
    area: "", bedrooms: "", bathrooms: "", description: "",
    images: [] as string[]
  });

  useEffect(() => {
    const initData = async () => {
      await new Promise(r => setTimeout(r, 1200));
      setProperties([
        {
          id: "1", title: "The Glass House", location: "Malabar Hill, Mumbai", price: 85000000,
          type: "Penthouse", area: "4200", bedrooms: "5", bathrooms: "4",
          description: "Ultra-modern glass structure with 360-degree ocean views.",
          images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
          status: "Available", owner: "System"
        },
        {
          id: "2", title: "Serene Villa", location: "Lonavala, MH", price: 32000000,
          type: "Villa", area: "3500", bedrooms: "4", bathrooms: "4",
          description: "Private pool villa surrounded by lush greenery.",
          images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800"],
          status: "Available", owner: "System"
        },
        {
          id: "3", title: "Skyline Business Hub", location: "BKC, Mumbai", price: 125000000,
          type: "Commercial", area: "12000", bedrooms: "0", bathrooms: "10",
          description: "Premium office space in the heart of the financial district.",
          images: ["https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"],
          status: "Available", owner: "System"
        }
      ]);
      setLoading(false);
    };
    initData();
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "All" || p.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setListForm(prev => ({ ...prev, images: [...prev.images, ...newImages].slice(0, 10) }));
    }
  };

  const handleListNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (listForm.images.length === 0) return alert("Photo to dalo!");
    const newProp: Property = {
      ...listForm,
      id: Date.now().toString(),
      price: Number(listForm.price),
      status: "Available",
      owner: "User",
    };
    setProperties([newProp, ...properties]);
    setListForm({ title: "", location: "", price: "", type: "Residential", area: "", bedrooms: "", bathrooms: "", description: "", images: [] });
    setActiveTab("sell");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Loader /></div>;

  return (
    /* Fix: Added pt-24 for mobile and lg:pt-32 for desktop to prevent Navbar overlap */
    <div className="min-h-screen bg-[#F4F7F5] flex flex-col lg:flex-row font-sans relative pt-24 lg:pt-32 pb-32 lg:pb-12 px-4 lg:px-8">
      
      {/* --- SIDEBAR (Fixed/Sticky Position Adjusted) --- */}
      <aside className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-sm lg:sticky lg:top-32 lg:translate-x-0 lg:left-0 lg:w-24 lg:h-[calc(100vh-160px)] bg-white border border-emerald-100 flex flex-row lg:flex-col items-center justify-around lg:justify-start py-4 lg:py-10 rounded-[40px] shadow-2xl z-[100]">
        <div className="hidden lg:block mb-12">
          <motion.div whileHover={{ rotate: 180 }} className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200 cursor-pointer">
            <Landmark size={28} />
          </motion.div>
        </div>
        
        <nav className="flex flex-row lg:flex-col gap-4 sm:gap-8 w-full items-center justify-around lg:justify-center">
          <SideBtn active={activeTab === "buy"} onClick={() => setActiveTab("buy")} icon={<ShoppingBag size={24}/>} label="Buy" />
          <SideBtn active={activeTab === "sell"} onClick={() => setActiveTab("sell")} icon={<LayoutDashboard size={24}/>} label="Sell" />
          <SideBtn active={activeTab === "list"} onClick={() => setActiveTab("list")} icon={<PlusCircle size={24}/>} label="Upload" />
        </nav>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 w-full max-w-7xl mx-auto lg:ml-12">
        <AnimatePresence mode="wait">
          
          {activeTab === "buy" && (
            <motion.div key="buy" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter italic">
                    Market <span className="text-emerald-500">Listings</span>
                  </h1>
                  <p className="text-slate-500 mt-3 font-bold text-base sm:text-lg">Discover exclusive verified properties.</p>
                </div>

                {/* --- SEARCH & FILTER UI --- */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:max-w-3xl">
                  <div className="relative w-full group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={22} />
                    <input 
                      type="text" 
                      placeholder="Search city, area or project..." 
                      className="w-full pl-14 pr-6 py-5 bg-white border border-slate-200 rounded-[24px] shadow-sm outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-black placeholder:text-slate-400"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <select 
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="w-full sm:w-56 px-6 py-5 bg-white border border-slate-200 rounded-[24px] shadow-sm font-black text-slate-700 outline-none cursor-pointer focus:ring-4 focus:ring-emerald-500/10 appearance-none bg-[url('https://cdn-icons-png.flaticon.com/512/60/60995.png')] bg-[length:12px] bg-[right_20px_center] bg-no-repeat"
                  >
                    <option value="All">All Types</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProperties.filter(p => p.owner === "System").length > 0 ? (
                  filteredProperties.filter(p => p.owner === "System").map(p => (
                    <PropertyCard key={p.id} property={p} onAction={() => setActiveTab("contact")} actionLabel="Contact to Buy" />
                  ))
                ) : (
                  <div className="col-span-full py-32 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-black text-xl">No properties found matching "{searchQuery}"</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "sell" && (
            <motion.div key="sell" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-12 text-center lg:text-left">
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter italic">My <span className="text-emerald-500">Uploads</span></h1>
                <p className="text-slate-500 mt-3 font-bold text-lg">Your listed inventory.</p>
              </div>
              {properties.filter(p => p.owner === "User").length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {properties.filter(p => p.owner === "User").map(p => (
                    <PropertyCard key={p.id} property={p} onAction={() => setProperties(prev => prev.filter(x => x.id !== p.id))} actionLabel="Delete Listing" isOwner />
                  ))}
                </div>
              ) : (
                <div className="h-[50vh] bg-white rounded-[48px] border-2 border-dashed border-emerald-100 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[32px] flex items-center justify-center mb-8"><Building size={48} /></div>
                  <h3 className="text-2xl font-black text-slate-900">Inventory Empty</h3>
                  <button onClick={() => setActiveTab("list")} className="mt-8 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-sm tracking-widest shadow-xl shadow-emerald-100">Upload Your First Property</button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "list" && (
            <motion.div key="list" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto">
              <div className="bg-white p-8 sm:p-16 rounded-[48px] shadow-2xl border border-emerald-50">
                <div className="mb-12 text-center">
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tighter italic">List <span className="text-emerald-500">Property</span></h2>
                  <p className="text-slate-400 font-bold mt-2">Fill in the details to go live.</p>
                </div>
                <form onSubmit={handleListNew} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-1">
                    <input type="file" multiple hidden ref={fileInputRef} onChange={handleImageUpload} accept="image/*" />
                    <div onClick={() => fileInputRef.current?.click()} className="aspect-square bg-slate-50 rounded-[40px] border-4 border-dashed border-emerald-100 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50 hover:border-emerald-300 transition-all group">
                      <UploadCloud className="text-emerald-400 group-hover:text-emerald-600 transition-colors" size={48} />
                      <p className="mt-4 text-sm font-black text-emerald-600 uppercase tracking-widest">Add Photos</p>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mt-6">
                      {listForm.images.map((img, idx) => (
                        <div key={idx} className="aspect-square rounded-2xl overflow-hidden border-2 border-emerald-100 shadow-sm"><img src={img} className="w-full h-full object-cover" alt="" /></div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput label="Project Title" icon={<Building size={16}/>} value={listForm.title} onChange={(v: string) => setListForm({...listForm, title: v})} />
                      <FormInput label="Full Location" icon={<MapPin size={16}/>} value={listForm.location} onChange={(v: string) => setListForm({...listForm, location: v})} />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <FormInput label="Price (₹)" icon={<IndianRupee size={16}/>} value={listForm.price} onChange={(v: string) => setListForm({...listForm, price: v})} />
                      <FormInput label="Sq Ft" icon={<Move size={16}/>} value={listForm.area} onChange={(v: string) => setListForm({...listForm, area: v})} />
                      <FormInput label="Beds" icon={<Bed size={16}/>} value={listForm.bedrooms} onChange={(v: string) => setListForm({...listForm, bedrooms: v})} />
                      <FormInput label="Baths" icon={<Bath size={16}/>} value={listForm.bathrooms} onChange={(v: string) => setListForm({...listForm, bathrooms: v})} />
                    </div>
                    <textarea required rows={5} className="w-full p-6 bg-slate-50 rounded-[32px] font-bold outline-none border-2 border-transparent focus:border-emerald-500 transition-all text-black placeholder:text-slate-400 shadow-inner" placeholder="Tell us about the property features..." value={listForm.description} onChange={e => setListForm({...listForm, description: e.target.value})} />
                    <button type="submit" className="w-full bg-emerald-600 text-white py-6 rounded-[32px] font-black uppercase tracking-[4px] shadow-2xl shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all">Submit Listing</button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div key="contact" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
              <div className="bg-white p-12 sm:p-20 rounded-[60px] shadow-2xl text-center border border-emerald-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner shadow-emerald-200/50"><Phone size={48} /></div>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 italic tracking-tight">Support <span className="text-emerald-500">Desk</span></h2>
                <div className="space-y-4 text-left max-w-sm mx-auto mb-12">
                  <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                    <Phone size={24} className="text-emerald-600 shrink-0"/>
                    <p className="font-black text-slate-800 text-lg">+1(938) 209-0088</p>
                  </div>
                  <div className="flex items-center gap-5 p-6 bg-slate-50 rounded-[30px] border border-slate-100">
                    <Mail size={24} className="text-emerald-600 shrink-0"/>
                    <p className="font-black text-slate-800 text-base break-all">wipogroupn@gmail.com</p>
                  </div>
                </div>
                <button onClick={() => setActiveTab("buy")} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[3px] shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all">Explore Properties</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

// Sub-components
function SideBtn({ active, onClick, icon, label }: any) {
  return (
    <div className="relative group">
      <motion.button 
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        onClick={onClick} 
        className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl sm:rounded-3xl transition-all duration-300 ${active ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-200 ring-4 ring-emerald-50' : 'text-slate-300 hover:bg-emerald-50 hover:text-emerald-600'}`}
      >
        {icon}
      </motion.button>
      <span className="absolute hidden lg:block left-20 top-1/2 -translate-y-1/2 bg-slate-900 text-white text-[10px] font-black uppercase px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap z-[110] ml-4 shadow-2xl tracking-widest">
        {label}
      </span>
    </div>
  );
}

function PropertyCard({ property, onAction, actionLabel, isOwner }: any) {
  return (
    <motion.div layout className="bg-white rounded-[40px] p-4 sm:p-5 border border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-emerald-200 hover:border-emerald-100 transition-all duration-500 group cursor-default">
      <div className="h-64 sm:h-80 rounded-[32px] overflow-hidden relative shadow-inner">
        <img src={property.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute top-5 right-5">
          <span className="bg-white/90 backdrop-blur-md text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
            {property.type}
          </span>
        </div>
      </div>

      <div className="mt-8 px-2">
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-400 mt-2 mb-6">
          <MapPin size={16} className="text-emerald-500" />
          <span className="text-xs font-bold uppercase tracking-widest truncate">{property.location}</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-emerald-600 font-[1000] text-3xl tracking-tighter">
            ₹{property.price.toLocaleString('en-IN')}
          </p>
          <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Verified</div>
        </div>

        <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-50 mb-8">
          <div className="flex flex-col items-center gap-1">
            <Bed size={20} className="text-slate-300" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{property.bedrooms} Beds</span>
          </div>
          <div className="flex flex-col items-center gap-1 border-x border-slate-50">
            <Bath size={20} className="text-slate-300" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{property.bathrooms} Bath</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Move size={20} className="text-slate-300" />
            <span className="text-[10px] font-black text-slate-600 uppercase">{property.area} Sqft</span>
          </div>
        </div>

        <button 
          onClick={onAction} 
          className={`w-full py-5 rounded-[24px] font-black uppercase text-xs tracking-[2px] transition-all flex items-center justify-center gap-3 shadow-lg ${
            isOwner 
            ? 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white shadow-rose-100' 
            : 'bg-emerald-600 text-white hover:bg-slate-900 shadow-emerald-100'
          }`}
        >
          {isOwner ? <Trash2 size={18}/> : <ArrowRight size={18}/>}
          {actionLabel}
        </button>
      </div>
    </motion.div>
  );
}

function FormInput({ label, type = "text", icon, value, onChange }: any) {
  return (
    <div className="space-y-3">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[2px] flex items-center gap-2 pl-2 italic">{icon} {label}</label>
      <input 
        required 
        type={type} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full p-5 bg-slate-50 border-2 border-transparent rounded-2xl font-bold outline-none focus:border-emerald-500 focus:bg-white transition-all text-sm text-black shadow-inner" 
      />
    </div>
  );
}