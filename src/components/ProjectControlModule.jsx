import React, { useState } from 'react';
import { 
  Activity, TrendingUp, Calendar, CheckCircle2, 
  FileCheck, ShieldCheck, ArrowRight, Layers
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const mockCurveData = [
  { month: 'สัปดาห์ 1', planned: 5, actual: 5 },
  { month: 'สัปดาห์ 2', planned: 15, actual: 16 },
  { month: 'สัปดาห์ 3', planned: 30, actual: 30 },
  { month: 'สัปดาห์ 4', planned: 48, actual: 46 },
  { month: 'สัปดาห์ 5', planned: 68, actual: 68 },
  { month: 'สัปดาห์ 6', planned: 85, actual: null },
  { month: 'สัปดาห์ 7', planned: 100, actual: null },
];

const ProjectControlModule = ({ selectedProject, milestones, onGenerateWcc }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Header Banner - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 4: Project Control & PMO
            </span>
            <span className="text-xs text-slate-500 font-semibold">โครงการ: {selectedProject?.name}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            ติดตาม S-Curve ความก้าวหน้า & ใบรับรองงานงวด (WCC)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            เปรียบเทียบความก้าวหน้าจริงกับแผนงาน (Physical Progress vs Plan) และออกเอกสาร WCC เพื่อปลดล็อกการวางบิล
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 bg-amber-500 text-slate-950 font-extrabold rounded-lg shadow text-xs">
            ความก้าวหน้าปัจจุบัน 68%
          </span>
        </div>
      </div>

      {/* Grid Charts & Milestones - White Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: S-Curve Chart Container */}
        <div className="lg:col-span-7 bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-800" />
                <span>กราฟความก้าวหน้าโครงการ (Project S-Curve Progress)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">ผลงานจริง % (Actual) vs แผนงาน % (Actual Physical Completion)</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCurveData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '11px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(val) => [`${val}%`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="actual" name="ผลงานจริง (% Actual)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                <Line type="monotone" dataKey="planned" name="แผนงาน (% Planned)" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Milestones & WCC Generation */}
        <div className="lg:col-span-5 bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>งวดงานโครงการ (Milestones)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">ออกเอกสาร WCC เพื่อส่งมอบให้ฝ่ายบัญชีออกใบแจ้งหนี้</p>
          </div>

          <div className="space-y-3">
            {milestones.map((m) => (
              <div 
                key={m.id}
                className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 hover:bg-slate-100 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">{m.title}</h4>
                    <p className="font-mono text-amber-700 font-bold text-xs mt-0.5">
                      {m.amount.toLocaleString()} ฿ <span className="text-slate-500 font-normal">({m.percentage}%)</span>
                    </p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    m.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    m.status === 'IN_PROGRESS' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-slate-200 text-slate-600'
                  }`}>
                    {m.status}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono">เอกสาร WCC: {m.invoiceNo || '-'}</span>
                  {m.status === 'IN_PROGRESS' ? (
                    <button 
                      onClick={() => onGenerateWcc(m)}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] rounded shadow transition flex items-center gap-1"
                    >
                      📜 ออกเอกสาร WCC
                    </button>
                  ) : m.status === 'COMPLETED' ? (
                    <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> อนุมัติ WCC แล้ว
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectControlModule;
