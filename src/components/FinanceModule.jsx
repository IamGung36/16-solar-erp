import React from 'react';
import { 
  CircleDollarSign, ShieldCheck, TrendingUp, BarChart2, 
  ArrowUpRight, ArrowDownRight, Layers
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const mockNetCashTrajectory = [
  { month: 'ม.ค.', inflow: 6000000, outflow: 2000000 },
  { month: 'ก.พ.', inflow: 0, outflow: 4500000 },
  { month: 'มี.ค.', inflow: 12000000, outflow: 3000000 },
  { month: 'เม.ย.', inflow: 0, outflow: 2500000 },
  { month: 'พ.ค.', inflow: 10000000, outflow: 1000000 },
  { month: 'มิ.ย.', inflow: 3450000, outflow: 500000 },
];

const FinanceModule = ({ cashFlow, selectedProject }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Title Header - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 5: Finance & Treasury Control
            </span>
            <span className="text-xs text-slate-500 font-semibold">ควบคุมงบประมาณ & บริหารสภาพคล่องการเงิน</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            คุมงบประมาณโครงการ (Budget Control) & Cash Flow Monitor
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ติดตามสถานะ commitment งบประมาณ, เงินประกันผลงาน (Retention) และหนังสือค้ำประกันธนาคาร (Bank Guarantee)
          </p>
        </div>
      </div>

      {/* 3 Metric Cards: Retention & BG - White Theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <p className="text-slate-500 font-bold text-xs">เงินค้ำประกันผลงานลูกค้าหักไว้ (Client Retention 5%)</p>
          <p className="text-2xl font-extrabold text-amber-700 font-mono">1,725,000 ฿</p>
          <p className="text-[11px] text-slate-500 font-medium">รอคืนเมื่อครบ COD ครบ 1 ปี</p>
        </div>

        <div className="bg-white border border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <p className="text-slate-500 font-bold text-xs">หักประกันผู้รับเหมาช่วงหักไว้ (Subcontractor Retention)</p>
          <p className="text-2xl font-extrabold text-emerald-700 font-mono">573,000 ฿</p>
          <p className="text-[11px] text-slate-500 font-medium">หักไว้จากการจ่ายงวดผู้รับเหมา</p>
        </div>

        <div className="bg-white border border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <p className="text-slate-500 font-bold text-xs">หนังสือค้ำประกันธนาคาร (Performance BG)</p>
          <p className="text-2xl font-extrabold text-blue-900 font-mono">3,450,000 ฿</p>
          <p className="text-[11px] text-slate-500 font-medium">ธนาคารกสิกรไทย (หมดอายุ 30 ธ.ค. 2026)</p>
        </div>
      </div>

      {/* Cash Flow Trajectory Chart Container - White Theme */}
      <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-800" />
            <span>กราฟการไหลเวียนเงินสดโครงการ (Net Cash Flow Trajectory)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">แสดงการประเมินสภาพคล่องเงินสดตลอดระยะเวลาดำเนินงานโครงการ</p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockNetCashTrajectory} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '11px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                formatter={(val) => [`${(val / 1000000).toFixed(2)} ล้านบาท`, '']}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="inflow" name="เงินรับจากลูกค้า (Inflow)" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
              <Area type="monotone" dataKey="outflow" name="เงินจ่ายค่าสินค้า/ผู้รับเหมา (Outflow)" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FinanceModule;
