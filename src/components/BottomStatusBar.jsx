import React, { useState, useEffect } from 'react';
import { Clock, User, HardDrive, CheckCircle2 } from 'lucide-react';

const BottomStatusBar = ({ user = 'admin (ผู้ดูแลระบบ)' }) => {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(now.toLocaleDateString('th-TH') + ' ' + now.toLocaleTimeString('th-TH'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="erp-footer-dark px-4 py-1 flex items-center justify-between text-[11px] font-mono fixed bottom-0 left-0 right-0 z-50 shadow-md border-t border-blue-900">
      <div className="flex items-center gap-4 text-slate-200">
        <span className="flex items-center gap-1 font-bold text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          พร้อมใช้งาน (System Operational)
        </span>
        <span>|</span>
        <span className="flex items-center gap-1 text-slate-300">
          <User className="w-3 h-3 text-slate-400" />
          {user}
        </span>
        <span>|</span>
        <span className="flex items-center gap-1 text-slate-300">
          <HardDrive className="w-3 h-3 text-slate-400" />
          Solar_ERP_Enterprise_v2.6
        </span>
      </div>

      <div className="flex items-center gap-1 text-slate-300">
        <Clock className="w-3 h-3 text-amber-400" />
        <span>{timeStr || '16/08/2026 01:31:00'}</span>
      </div>
    </footer>
  );
};

export default BottomStatusBar;
