import React from 'react';
import { Activity, LogIn, LogOut, KeyRound, CheckCircle, FileCheck, ShieldAlert } from 'lucide-react';

const RightSidebarActivity = () => {
  const logs = [
    { type: 'APPROVE', title: 'PR-2026-088 อนุมัติ', user: 'PM (คุณสมชาย)', desc: 'ผ่านด่านคุมงบ Baseline', time: '16 สิงหาคม 2026, 01:25' },
    { type: 'ALERT', title: 'PR-2026-092 ถูกบล็อก (VO)', user: 'System Budget Gate', desc: 'เกินงบ WBS-2.1 จำนวน 600,000 ฿', time: '16 สิงหาคม 2026, 01:20' },
    { type: 'PO', title: 'PO-2026-042 ออกใบสั่งซื้อ', user: 'Procurement (จัดซื้อ)', desc: 'สั่งซื้อแผง Jinko 550W (2,727 แผง)', time: '16 สิงหาคม 2026, 01:15' },
    { type: 'LOGIN', title: 'LOGIN โดย admin', user: 'admin', desc: 'login success', time: '16 สิงหาคม 2026, 01:00' },
    { type: 'WCC', title: 'WCC Milestone 2 อนุมัติ', user: 'วิศวกรควบคุมงาน', desc: 'ปลดล็อกวางบิล 13.8M ฿', time: '15 สิงหาคม 2026, 18:30' },
    { type: 'LOGIN', title: 'LOGIN โดย user_pm', user: 'user_pm', desc: 'login success', time: '15 สิงหาคม 2026, 16:45' },
  ];

  return (
    <aside className="w-72 shrink-0 bg-white border-l border-slate-300 min-h-[calc(100vh-105px)] text-xs shadow-sm hidden xl:block">
      {/* Dark Blue Section Header */}
      <div className="erp-section-header px-3 py-2 flex items-center gap-1.5 font-bold text-xs shadow-sm">
        <Activity className="w-4 h-4 text-amber-400" />
        <span>กิจกรรมล่าสุด (Activity Log)</span>
      </div>

      <div className="p-3 space-y-3 divide-y divide-slate-100">
        {logs.map((log, idx) => (
          <div key={idx} className="pt-2.5 first:pt-0 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                {log.type === 'ALERT' ? (
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                ) : log.type === 'APPROVE' || log.type === 'WCC' ? (
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span className="truncate">{log.title}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 pl-5">{log.desc}</p>
            <p className="text-[10px] text-slate-400 pl-5 font-mono">{log.time}</p>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default RightSidebarActivity;
