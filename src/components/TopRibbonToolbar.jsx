import React from 'react';
import { 
  Home, TrendingUp, Compass, ShoppingCart, Activity, 
  CircleDollarSign, Receipt, Wrench, Database, Users, Settings
} from 'lucide-react';

const TopRibbonToolbar = ({ activeModule, setActiveModule }) => {
  const ribbonItems = [
    { id: 'overview', name: 'หน้าหลัก', icon: Home },
    { id: 'bd', name: 'BD & เสนอขาย', icon: TrendingUp },
    { id: 'pm', name: 'ผังงบ WBS', icon: Compass },
    { id: 'procurement', name: 'จัดซื้อ PO', icon: ShoppingCart },
    { id: 'control', name: 'S-Curve & WCC', icon: Activity },
    { id: 'finance', name: 'Cash Flow', icon: CircleDollarSign },
    { id: 'accounting', name: '3-Way Match', icon: Receipt },
    { id: 'om', name: 'O&M Warranty', icon: Wrench },
    { id: 'partner', name: '8. คู่ค้า', icon: Users },
    { id: 'costdb', name: 'Cost DB (99)', icon: Database },
    { id: 'settings', name: 'ตั้งค่าระบบ', icon: Settings },
  ];

  return (
    <div className="bg-white border-b border-slate-300 px-3 py-1.5 flex items-center gap-1 overflow-x-auto shadow-sm select-none text-xs">
      {ribbonItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeModule === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveModule(item.id)}
            className={`px-3 py-1.5 rounded-md font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
              isActive 
                ? 'bg-[#0f4c81] text-white shadow ring-2 ring-blue-300' 
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-blue-900'}`} />
            <span>{item.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TopRibbonToolbar;
