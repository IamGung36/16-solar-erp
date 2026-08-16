import React from 'react';
import { Sun, User, Bell } from 'lucide-react';

const TopNavbar = ({ user = 'admin (ผู้ดูแลระบบ)' }) => {
  return (
    <header className="erp-header-bg text-white px-4 py-2 flex justify-between items-center shadow-md border-b border-amber-500/20 select-none">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-lg shadow-sm">
          ☀️
        </div>
        <div>
          <h1 className="text-sm font-extrabold tracking-wide text-white flex items-center gap-1.5">
            ระบบ Solar ERP <span className="text-[10px] font-normal text-amber-400 font-mono">• Solar EPC & Private PPA Enterprise</span>
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3 text-xs">
        <div className="relative cursor-pointer p-1.5 hover:bg-white/10 rounded-full transition">
          <Bell className="w-4 h-4 text-slate-200" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
        </div>

        <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
            A
          </div>
          <span className="font-semibold text-slate-200">{user}</span>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
