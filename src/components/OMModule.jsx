import React, { useState } from 'react';
import { 
  Wrench, FileCheck, ShieldCheck, Download, Search, 
  CheckCircle2, AlertTriangle, Calendar
} from 'lucide-react';

const mockAssets = [
  { serial: 'JK550-2026-90412', name: 'แผง Solar Jinko 550W', location: 'String 01 / Block A', expire: '2056-05-10 (30 ปี)', status: 'ปกติ' },
  { serial: 'JK550-2026-90413', name: 'แผง Solar Jinko 550W', location: 'String 01 / Block A', expire: '2056-05-10 (30 ปี)', status: 'ปกติ' },
  { serial: 'SG110-INV-0012', name: 'Inverter Sungrow 110kW', location: 'Inverter Room B', expire: '2036-05-30 (10 ปี)', status: 'ปกติ' },
  { serial: 'SG110-INV-0013', name: 'Inverter Sungrow 110kW', location: 'Inverter Room B', expire: '2036-05-30 (10 ปี)', status: 'แจ้งซ่อมด่วน' },
];

const OMModule = ({ selectedProject }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = searchTerm
    ? mockAssets.filter(a => a.serial.toLowerCase().includes(searchTerm.toLowerCase()) || a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : mockAssets;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Title Header Banner - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 7: Commissioning, COD & O&M
            </span>
            <span className="text-xs text-slate-500 font-semibold">บริหารการรับประกันสินทรัพย์ & บริการหลังการขาย</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            ส่งมอบงานวันขนานไฟ COD Package & O&M Warranty Master
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ค้นหา Serial Number เพื่อเคลมประกัน และวางแผนตรวจเช็คระบบตามประจำปี (Preventive Maintenance)
          </p>
        </div>
      </div>

      {/* Main Containers Grid - White Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: COD Package Downloads */}
        <div className="lg:col-span-5 bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-700" />
              <span>เอกสารชุดส่งมอบ COD Package</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">พร้อมดาวน์โหลดสำหรับลูกค้าและ PEA/MEA</p>
          </div>

          <div className="space-y-2">
            {[
              '1. หนังสือสัญญาซื้อขายไฟฟ้า PEA/MEA',
              '2. ผลทดสอบ Insulation & Ground Test',
              '3. ผลสแกน Thermo scan แผง Solar',
              '4. แบบแปลน As-Built Single Line Diagram'
            ].map((doc, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center hover:bg-slate-100 transition">
                <span className="font-semibold text-slate-800 text-xs">{doc}</span>
                <button className="p-1.5 bg-blue-50 text-blue-800 hover:bg-blue-100 rounded border border-blue-200" title="ดาวน์โหลด">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Asset Warranty Tracking Table */}
        <div className="lg:col-span-7 bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-800" />
                <span>ระบบค้นหาและติดตามประกันสินทรัพย์ (Asset Warranty Master)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">ค้นหาด้วย Serial Number เพื่อดูการรับประกันและระยะเวลาประกัน</p>
            </div>

            <div className="relative w-full sm:w-48">
              <input 
                type="text" 
                placeholder="ค้น Serial Number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none pl-8"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">SERIAL NUMBER</th>
                  <th className="py-2.5 px-3">ประเภทสินทรัพย์</th>
                  <th className="py-2.5 px-3">ตำแหน่งติดตั้งหน้างาน</th>
                  <th className="py-2.5 px-3 text-center">วันหมดอายุประกัน</th>
                  <th className="py-2.5 px-3 text-center">สถานะ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredAssets.map((asset) => (
                  <tr key={asset.serial} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-amber-700">{asset.serial}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{asset.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{asset.location}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-700">{asset.expire}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        asset.status === 'ปกติ' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {asset.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OMModule;
