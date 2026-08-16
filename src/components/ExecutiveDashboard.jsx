import React, { useState } from 'react';
import { 
  TrendingUp, CircleDollarSign, Compass, Activity, ShieldCheck, 
  BarChart2, ArrowUpRight, ArrowDownRight, Layers, Eye, CheckCircle2,
  Calendar, FileText, Filter
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

const ExecutiveDashboard = ({ projects, cashFlow, onSelectProject, setActiveModule }) => {
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  // Filter projects
  const filteredProjects = selectedStatus === 'ALL' 
    ? projects 
    : projects.filter(p => p.status === selectedStatus);

  // Compute metrics
  const totalCapacityKwp = projects.reduce((sum, p) => sum + p.capacityKwp, 0);
  const totalContractValue = projects.reduce((sum, p) => sum + p.contractValue, 0);
  const totalCommittedPo = projects.reduce((sum, p) => sum + p.committedPO, 0);
  const totalBaselineBudget = projects.reduce((sum, p) => sum + p.baselineBudget, 0);
  const overallCommitmentPct = totalBaselineBudget > 0 
    ? Math.round((totalCommittedPo / totalBaselineBudget) * 100) 
    : 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Executive Control Header Bar - White Theme matching Quick Access */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Solar PMO Control Center
            </span>
            <span className="text-xs text-slate-500 font-semibold">ข้อมูลแบบเรียลไทม์</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            ภาพรวมการบริหารโครงการโซลาร์เซลล์และสถานะการเงิน (Executive Dashboard)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ติดตามกำลังการติดตั้ง, งบประมาณ WBS, กระแสเงินสด Cash Flow และระบบเกตควบคุมการเงิน (Gate) ครบทุกโครงการ
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveModule('bd')}
            className="px-3.5 py-2 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1 shadow transition"
          >
            + สร้างโครงการเสนอขายใหม่ (BD)
          </button>
          <button 
            onClick={() => setActiveModule('control')}
            className="px-3.5 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 shadow transition"
          >
            <Activity className="w-4 h-4 text-amber-400" /> ห้องควบคุมโครงการ / WBS
          </button>
        </div>
      </div>

      {/* 4 Top KPI Cards - White Background Theme matching Quick Access */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Capacity */}
        <div className="bg-white border-t-4 border-amber-500 border-x border-b border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold text-slate-700 text-xs">กำลังการติดตั้งรวม (Total Capacity)</span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600 border border-amber-200">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {(totalCapacityKwp / 1000).toFixed(2)} <span className="text-sm font-bold text-slate-500">MWp</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +15% YoY
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">รวม Rooftop + Farm + PPA</p>
        </div>

        {/* Card 2: Contract Value */}
        <div className="bg-white border-t-4 border-blue-600 border-x border-b border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold text-slate-700 text-xs">มูลค่าสัญญารวม (Contract Value)</span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {(totalContractValue / 1000000).toFixed(1)} <span className="text-sm font-bold text-slate-500">ล้านบาท</span>
            </span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              {projects.length} โครงการในมือ
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">รวม 4 โครงการหลักที่ดำเนินงาน</p>
        </div>

        {/* Card 3: PO Commitment */}
        <div className="bg-white border-t-4 border-purple-600 border-x border-b border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold text-slate-700 text-xs">ออก PO ผูกพันแล้ว (Committed)</span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {overallCommitmentPct}% <span className="text-xs font-bold text-slate-500">ของ Baseline</span>
            </span>
            <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              {(totalCommittedPo / 1000000).toFixed(1)} ลบ.
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-purple-600 h-full rounded-full" style={{ width: `${overallCommitmentPct}%` }}></div>
          </div>
        </div>

        {/* Card 4: Net Cash Flow */}
        <div className="bg-white border-t-4 border-emerald-500 border-x border-b border-slate-300 p-4 rounded-xl shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="font-bold text-slate-700 text-xs">กระแสเงินสดสุทธิ (Net Cash Flow)</span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200">
              <BarChart2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-emerald-600 font-mono">
              +5.15 <span className="text-sm font-bold text-slate-500">ล้านบาท</span>
            </span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
              Cash Inflow เป็นบวก
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium">Cash Flow ปลอดภัย ไร้สถานะติดลบ</p>
        </div>
      </div>

      {/* Main Charts & Control Gate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Cash Flow Projection Chart (White Theme) */}
        <div className="lg:col-span-8 bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-800" />
                <span>ประมาณการกระแสเงินสดโครงการ (Project Cash Flow Projection)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">เปรียบเทียบคาดการณ์เงินรับ (Inflow) และเงินจ่ายตาม PO (Outflow) รายเดือน</p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 bg-slate-100 border border-slate-300 rounded font-semibold text-slate-700">
                รายเดือน (Monthly)
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cashFlow} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a', fontSize: '11px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  formatter={(val) => [`${(val / 1000000).toFixed(2)} ล้านบาท`, '']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="outflow" name="เงินจ่าย (Outflow)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="inflow" name="เงินรับ (Inflow)" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Financial Control Gates Status (White Theme) */}
        <div className="lg:col-span-4 bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>ด่านควบคุมทางการเงิน (Control Gates Status)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">การอนุมัติข้ามขั้นตอน ERP เพื่อคุมความเสี่ยง</p>
          </div>

          <div className="space-y-2.5">
            {[
              { gate: 'Gate 1', title: 'Sales Hardover Freeze', desc: 'ทีมขายส่งมอบแบบ BD ยืนยัน Baseline', status: 'PASS', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
              { gate: 'Gate 2', title: 'PR Budget Enforcement', desc: 'ขอซื้อ PR ไม่เกินงบ Baseline WBS', status: 'WORKING', color: 'bg-amber-100 text-amber-800 border-amber-300' },
              { gate: 'Gate 3', title: 'AP 3-Way Matching', desc: 'PO + GRN + Invoice ตรงกัน 100%', status: 'ACTIVE', color: 'bg-blue-100 text-blue-800 border-blue-300' },
              { gate: 'Gate 4', title: 'WCC Milestone Interlock', desc: 'ส่งมอบงานงวดแลกเงิน 30%', status: 'ACTIVE', color: 'bg-blue-100 text-blue-800 border-blue-300' },
            ].map((g, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center gap-2 hover:bg-slate-100 transition">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-700 text-xs">{g.gate}:</span>
                    <span className="font-bold text-slate-900 text-xs">{g.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-500">{g.desc}</p>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border shrink-0 ${g.color}`}>
                  {g.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Table: Active Projects Table (White Theme matching Quick Access) */}
      <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-800" />
              <span>รายการโครงการที่กำลังดำเนินการ (Active Projects)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">คลิกที่ชื่อโครงการเพื่อดูข้อมูลในแต่ละโมดูลอย่างละเอียด</p>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            {[
              { id: 'ALL', label: 'ทั้งหมด' },
              { id: 'DESIGN_PERMIT', label: 'ออกแบบ & ขออนุญาต' },
              { id: 'PROCUREMENT', label: 'กำลังจัดซื้อ' },
              { id: 'COD', label: 'COD ส่งมอบแล้ว' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`px-3 py-1 rounded font-bold transition ${
                  selectedStatus === tab.id
                    ? 'bg-[#0f4c81] text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Table */}
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">รหัสโครงการ / ชื่อโครงการ</th>
                <th className="py-2.5 px-3 text-center">ประเภท</th>
                <th className="py-2.5 px-3 text-center">กำลังติดตั้ง</th>
                <th className="py-2.5 px-3 text-right">มูลค่าสัญญา (บาท)</th>
                <th className="py-2.5 px-3 text-right">งบประมาณ Baseline</th>
                <th className="py-2.5 px-3 text-center">ความคืบหน้า (%)</th>
                <th className="py-2.5 px-3 text-center">เป้าหมาย COD</th>
                <th className="py-2.5 px-3 text-center">สถานะ</th>
                <th className="py-2.5 px-3 text-center w-24">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3">
                    <button 
                      onClick={() => onSelectProject(p)}
                      className="text-left group"
                    >
                      <p className="font-bold text-slate-900 group-hover:text-blue-700 transition">{p.name}</p>
                      <p className="font-mono text-[10px] text-slate-500">{p.id} • {p.client}</p>
                    </button>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.type === 'ROOFTOP' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      p.type === 'FARM' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      'bg-purple-100 text-purple-800 border border-purple-300'
                    }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-800">
                    {p.capacityKwp} kWp
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                    {p.contractValue.toLocaleString()} ฿
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    {p.baselineBudget.toLocaleString()} ฿
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <span className="font-mono font-bold text-blue-900">{p.progress}%</span>
                      <div className="w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: `${p.progress}%` }}></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-center font-mono text-slate-600">
                    {p.targetCod}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                      p.status === 'COD' ? 'bg-emerald-600 text-white' :
                      p.status === 'PROCUREMENT' ? 'bg-blue-600 text-white' :
                      p.status === 'DESIGN_PERMIT' ? 'bg-amber-500 text-slate-950' :
                      'bg-slate-700 text-white'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <button 
                      onClick={() => {
                        onSelectProject(p);
                        setActiveModule('control');
                      }}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] rounded transition shadow-sm"
                    >
                      👁 ดูรายละเอียด
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
