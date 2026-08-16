import React from 'react';
import { 
  Sun, LayoutDashboard, TrendingUp, Compass, ShoppingCart, 
  Activity, CircleDollarSign, Receipt, Wrench, Database, Bell, Search, ShieldCheck
} from 'lucide-react';

const Header = ({ activeModule, setActiveModule, selectedType, setSelectedType }) => {
  const modules = [
    { id: 'overview', name: 'ภาพรวมระบบ (Overview)', icon: LayoutDashboard, badge: null },
    { id: 'bd', name: '1. ฝ่าย BD & ขาย', icon: TrendingUp, badge: '3 Leads' },
    { id: 'pm', name: '2. ฝ่าย PM & งบประมาณ', icon: Compass, badge: '4 โครงการ' },
    { id: 'procurement', name: '3. จัดซื้อ & คลังสินค้า', icon: ShoppingCart, badge: '1 Alert' },
    { id: 'control', name: '4. Project Control & S-Curve', icon: Activity, badge: '68%' },
    { id: 'finance', name: '5. การเงิน & Cash Flow', icon: CircleDollarSign, badge: 'Gate Active' },
    { id: 'accounting', name: '6. บัญชี AP/AR & ภาษี', icon: Receipt, badge: '3-Way Match' },
    { id: 'om', name: '7. ส่งมอบ COD & O&M', icon: Wrench, badge: 'PPA Meter' },
    { id: 'costdb', name: '99. Cost Database', icon: Database, badge: 'Master Catalog' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50 shadow-2xl">
      {/* Top Branding Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-yellow-400 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Sun className="w-6 h-6 text-slate-950 font-bold animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-wider font-sans">SOLAR <span className="text-amber-400">ERP</span></h1>
              <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full">
                EPC & Private PPA Edition
              </span>
            </div>
            <p className="text-xs text-slate-400">ระบบบริหารจัดการโครงการโซลาร์เซลล์ครบวงจร</p>
          </div>
        </div>

        {/* Global Controls & Search */}
        <div className="flex items-center gap-4">
          {/* Project Type Filter */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 px-2 font-medium">ประเภท:</span>
            {[
              { id: 'ALL', name: 'ทั้งหมด' },
              { id: 'ROOFTOP', name: 'Rooftop' },
              { id: 'FARM', name: 'Solar Farm' },
              { id: 'PRIVATE_PPA', name: 'Private PPA' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all font-medium ${
                  selectedType === type.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-slate-800"></div>

          {/* User profile & Notifications */}
          <button className="relative p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-amber-400 hover:bg-slate-700 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-amber-500 rounded-full ring-2 ring-slate-900"></span>
          </button>

          <div className="flex items-center gap-2 bg-slate-800/60 pl-2 pr-3 py-1 rounded-xl border border-slate-700/60">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-xs">
              PM
            </div>
            <div className="text-left text-xs">
              <p className="font-semibold text-slate-200 leading-none">ผู้ดูแลระบบ ERP</p>
              <p className="text-[10px] text-slate-400 mt-0.5">PMO & Financial Lead</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
        <div className="flex space-x-1 py-1.5 min-w-max">
          {modules.map(mod => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/10 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{mod.name}</span>
                {mod.badge && (
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded-md ${
                    isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}>
                    {mod.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Header;
