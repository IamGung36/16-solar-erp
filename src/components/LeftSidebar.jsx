import React, { useState } from 'react';
import { 
  Home, ChevronDown, ChevronRight, TrendingUp, Compass, ShoppingCart, 
  Activity, CircleDollarSign, Receipt, Wrench, Database, Settings, Menu, FileText,
  ChevronLeft, Users
} from 'lucide-react';

const LeftSidebar = ({ activeModule, setActiveModule }) => {
  const [openModules, setOpenModules] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainModules = [
    { id: 'bd', num: '1.', name: 'ฝ่าย BD & เสนอขาย', icon: TrendingUp },
    { id: 'pm', num: '2.', name: 'PM & งบประมาณ WBS', icon: Compass },
    { id: 'procurement', num: '3.', name: 'จัดซื้อ PO & สแกน GRN', icon: ShoppingCart },
    { id: 'control', num: '4.', name: 'Project Control & S-Curve', icon: Activity },
    { id: 'finance', num: '5.', name: 'การเงิน & Cash Flow', icon: CircleDollarSign },
    { id: 'accounting', num: '6.', name: 'บัญชี AP/AR 3-Way', icon: Receipt },
    { id: 'om', num: '7.', name: 'COD Package & O&M', icon: Wrench },
    { id: 'partner', num: '8.', name: 'ทะเบียนคู่ค้า (Vendors)', icon: Users },
    { id: 'costdb', num: '99.', name: 'Cost Database (Master Catalog)', icon: Database },
  ];

  return (
    <aside className={`shrink-0 erp-sidebar-bg flex flex-col justify-between border-r border-slate-300 min-h-[calc(100vh-105px)] text-xs select-none transition-all duration-300 ${
      isCollapsed ? 'w-14' : 'w-60'
    }`}>
      <div className="p-2 space-y-1">
        {/* Section Header with Collapse Toggle Button */}
        <div className={`py-1.5 text-slate-500 font-bold text-[11px] flex items-center justify-between border-b border-slate-200 ${
          isCollapsed ? 'justify-center px-0' : 'px-2'
        }`}>
          {!isCollapsed && (
            <div className="flex items-center gap-1.5 truncate">
              <Menu className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span>เมนูลัด (Quick Menu)</span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-slate-200 text-slate-700 font-bold transition mx-auto"
            title={isCollapsed ? 'ขยายแถบเมนูซ้าย (Expand Sidebar)' : 'ย่อแถบเมนูซ้าย (Collapse Sidebar)'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4 text-blue-900" /> : <ChevronLeft className="w-4 h-4 text-blue-900" />}
          </button>
        </div>

        {/* Home Item */}
        <button
          onClick={() => setActiveModule('overview')}
          className={`w-full flex items-center justify-between py-2 rounded text-left font-bold transition ${
            isCollapsed ? 'px-0 justify-center' : 'px-3'
          } ${
            activeModule === 'overview'
              ? 'bg-[#0f4c81] text-white shadow-sm'
              : 'text-slate-700 hover:bg-slate-200'
          }`}
          title="หน้าหลัก (Dashboard)"
        >
          <div className="flex items-center gap-2">
            <Home className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>หน้าหลัก (Dashboard)</span>}
          </div>
          {!isCollapsed && activeModule === 'overview' && <div className="w-1.5 h-3 bg-amber-400 rounded-full"></div>}
        </button>

        {/* Collapsible Module Section */}
        <div className="pt-2">
          {!isCollapsed ? (
            <button 
              onClick={() => setOpenModules(!openModules)}
              className="w-full px-2 py-1.5 text-slate-600 font-bold text-[11px] flex items-center justify-between hover:bg-slate-200 rounded border-b border-slate-200"
            >
              <div className="flex items-center gap-1">
                <span>| โมดูล Solar ERP</span>
              </div>
              {openModules ? <ChevronDown className="w-3.5 h-3.5 text-slate-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-500" />}
            </button>
          ) : (
            <div className="border-b border-slate-200 my-1"></div>
          )}

          {(openModules || isCollapsed) && (
            <div className={`mt-1 space-y-0.5 ${isCollapsed ? '' : 'pl-1'}`}>
              {mainModules.map((m) => {
                const Icon = m.icon;
                const isActive = activeModule === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveModule(m.id)}
                    className={`w-full flex items-center py-1.5 rounded transition text-xs ${
                      isCollapsed ? 'justify-center px-0' : 'justify-between px-3 text-left'
                    } ${
                      isActive 
                        ? 'bg-[#0f4c81] text-white font-bold shadow-sm' 
                        : 'text-slate-700 hover:bg-slate-200/80 font-medium'
                    }`}
                    title={m.name}
                  >
                    <div className="flex items-center gap-2">
                      {!isCollapsed && <span className="text-slate-400 font-mono text-[11px]">{m.num}</span>}
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-amber-400' : 'text-blue-900'}`} />
                      {!isCollapsed && <span className="truncate">{m.name}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Section: Finance & Documents */}
        <div className="pt-2">
          {!isCollapsed ? (
            <div className="px-2 py-1.5 text-slate-600 font-bold text-[11px] border-b border-slate-200">
              | การเงิน-เอกสาร
            </div>
          ) : (
            <div className="border-b border-slate-200 my-1"></div>
          )}
          <div className="mt-1 space-y-0.5 text-slate-700">
            <button 
              onClick={() => setActiveModule('accounting')} 
              className={`w-full py-1.5 hover:bg-slate-200 rounded text-left flex items-center gap-2 ${
                isCollapsed ? 'justify-center px-0' : 'px-3'
              }`}
              title="ใบแจ้งหนี้ / ใบกำกับภาษี"
            >
              <FileText className="w-3.5 h-3.5 text-blue-900 shrink-0" />
              {!isCollapsed && <span>ใบแจ้งหนี้ / ใบกำกับภาษี</span>}
            </button>
            <button 
              onClick={() => setActiveModule('finance')} 
              className={`w-full py-1.5 hover:bg-slate-200 rounded text-left flex items-center gap-2 ${
                isCollapsed ? 'justify-center px-0' : 'px-3'
              }`}
              title="ค้ำประกัน BG / Retention"
            >
              <CircleDollarSign className="w-3.5 h-3.5 text-blue-900 shrink-0" />
              {!isCollapsed && <span>ค้ำประกัน BG / Retention</span>}
            </button>
          </div>
        </div>

        {/* Section: System Settings */}
        <div className="pt-2">
          {!isCollapsed ? (
            <div className="px-2 py-1.5 text-slate-600 font-bold text-[11px] border-b border-slate-200">
              | ระบบ
            </div>
          ) : (
            <div className="border-b border-slate-200 my-1"></div>
          )}
          <div className="mt-1 space-y-0.5 text-slate-700">
            <button 
              onClick={() => setActiveModule('settings')}
              className={`w-full py-1.5 hover:bg-slate-200 rounded text-left flex items-center gap-2 ${
                activeModule === 'settings' ? 'bg-[#0f4c81] text-white font-bold' : ''
              } ${
                isCollapsed ? 'justify-center px-0' : 'px-3'
              }`}
              title="ตั้งค่าสิทธิ์ผู้ใช้งาน & วันหยุด"
            >
              <Settings className={`w-3.5 h-3.5 shrink-0 ${activeModule === 'settings' ? 'text-amber-400' : 'text-blue-900'}`} />
              {!isCollapsed && <span>ตั้งค่าสิทธิ์ผู้ใช้งาน & วันหยุด</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LeftSidebar;
