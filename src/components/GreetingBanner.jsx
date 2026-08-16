import React from 'react';
import { 
  Smile, Clock, Users, Building, FileCheck, AlertTriangle, 
  TrendingUp, Compass, ShoppingCart, Activity, CircleDollarSign, Receipt, Wrench, Settings 
} from 'lucide-react';

const GreetingBanner = ({ user = 'admin (ผู้ดูแลระบบ)', setActiveModule }) => {
  const quickAccessItems = [
    { id: 'bd', name: 'BD & เสนอขาย', icon: TrendingUp },
    { id: 'pm', name: 'PM & งบ WBS', icon: Compass },
    { id: 'procurement', name: 'จัดซื้อ PO', icon: ShoppingCart },
    { id: 'control', name: 'S-Curve & WCC', icon: Activity },
    { id: 'finance', name: 'Cash Flow', icon: CircleDollarSign },
    { id: 'accounting', name: 'บัญชี 3-Way', icon: Receipt },
    { id: 'om', name: 'O&M Warranty', icon: Wrench },
    { id: 'settings', name: 'ตั้งค่าระบบ', icon: Settings },
  ];

  return (
    <div className="space-y-4">
      {/* Breadcrumb Bar */}
      <div className="text-xs text-slate-600 font-medium flex items-center gap-1 bg-slate-200/60 px-3 py-1.5 rounded border border-slate-300">
        <span>🏠 หน้าหลัก</span>
        <span>&gt;</span>
        <span className="text-blue-900 font-bold">Dashboard</span>
      </div>

      {/* Greeting Banner Box */}
      <div className="erp-card-white p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center border border-blue-300 shadow-sm">
            <Smile className="w-7 h-7 stroke-[2.2]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">สวัสดีคุณ {user}</h2>
            <p className="text-xs text-slate-500 mt-0.5">วันนี้ 16 สิงหาคม 2569 · ระบบบริหารโครงการ Solar EPC & Private PPA</p>
          </div>
        </div>

        <button className="px-3.5 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 shadow-sm flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-blue-800" />
          <span>เช็คอินเข้างานวันนี้</span>
        </button>
      </div>

      {/* 4 KPI Summary Cards with Color Top Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Blue Strip */}
        <div className="erp-card-white rounded-lg p-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-blue-600"></div>
          <div className="flex items-center gap-3 pt-1">
            <div className="p-2.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">วิศวกร/ทีมงานในไซต์</p>
              <h3 className="text-xl font-bold text-slate-800 font-mono">30 <span className="text-xs font-normal text-slate-500">คน</span></h3>
            </div>
          </div>
        </div>

        {/* Card 2: Green Strip */}
        <div className="erp-card-white rounded-lg p-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
          <div className="flex items-center gap-3 pt-1">
            <div className="p-2.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">โครงการกำลังทำอยู่</p>
              <h3 className="text-xl font-bold text-slate-800 font-mono">4 <span className="text-xs font-normal text-slate-500">โครงการ</span></h3>
            </div>
          </div>
        </div>

        {/* Card 3: Orange Strip */}
        <div className="erp-card-white rounded-lg p-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
          <div className="flex items-center gap-3 pt-1">
            <div className="p-2.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">ใบขอซื้อ PR รออนุมัติ</p>
              <h3 className="text-xl font-bold text-slate-800 font-mono">2 <span className="text-xs font-normal text-slate-500">รายการ</span></h3>
            </div>
          </div>
        </div>

        {/* Card 4: Red Strip */}
        <div className="erp-card-white rounded-lg p-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-rose-600"></div>
          <div className="flex items-center gap-3 pt-1">
            <div className="p-2.5 rounded bg-rose-50 text-rose-800 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-slate-500">PR เกินงบอนุมัติ (VO)</p>
              <h3 className="text-xl font-bold text-rose-600 font-mono">1 <span className="text-xs font-normal text-slate-500">รายการ</span></h3>
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Attendance Banner */}
      <div className="erp-card-white rounded-lg overflow-hidden">
        <div className="erp-section-header px-3 py-1.5 flex items-center gap-2 font-bold text-xs">
          <Clock className="w-4 h-4 text-amber-400" />
          <span>สถานะการขนานไฟและความก้าวหน้าโครงการวันนี้</span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-slate-200 text-xs">
          <div>
            <p className="text-slate-500">Rooftop ThaiBev (1.5MWp)</p>
            <p className="text-base font-bold text-blue-900 font-mono mt-1">68% <span className="text-[11px] font-normal text-emerald-600">(ตามแผน)</span></p>
          </div>
          <div>
            <p className="text-slate-500">Ayutthaya Farm (8.0MWp)</p>
            <p className="text-base font-bold text-blue-900 font-mono mt-1">32% <span className="text-[11px] font-normal text-emerald-600">(ตามแผน)</span></p>
          </div>
          <div>
            <p className="text-slate-500">Siam Retail PPA (750kWp)</p>
            <p className="text-base font-bold text-emerald-600 font-mono mt-1">100% COD</p>
          </div>
          <div>
            <p className="text-slate-500">Bangna Rooftop (2.2MWp)</p>
            <p className="text-base font-bold text-amber-600 font-mono mt-1">Proposal</p>
          </div>
        </div>
      </div>

      {/* Quick Access Grid Card */}
      <div className="erp-card-white rounded-lg overflow-hidden">
        <div className="erp-section-header px-3 py-1.5 flex items-center gap-2 font-bold text-xs">
          <span className="text-amber-400">田</span>
          <span>Quick Access (ทางลัดโมดูล Solar ERP)</span>
        </div>
        <div className="p-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {quickAccessItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className="flex flex-col items-center justify-center p-3 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition group shadow-sm"
              >
                <div className="w-10 h-10 rounded bg-blue-50 text-blue-900 flex items-center justify-center border border-blue-200 group-hover:scale-105 transition">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-slate-700 mt-2 text-center group-hover:text-blue-900">
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GreetingBanner;
