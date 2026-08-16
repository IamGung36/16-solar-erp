import React, { useState } from 'react';
import { 
  Receipt, CheckCircle2, ShieldCheck, AlertCircle, 
  FileText, ArrowRight, Layers, Check
} from 'lucide-react';

const AccountingModule = ({ purchaseOrders, milestones }) => {
  const [activeTab, setActiveTab] = useState('3way');

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Title Header - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 6: Accounting & Tax
            </span>
            <span className="text-xs text-slate-500 font-semibold">ระบบบัญชีเจ้าหนี้ (AP) บัญชีลูกหนี้ (AR) & ภาษีหัก ณ ที่จ่าย</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            3-Way Matching (PO+GRN+Invoice) & ออกใบแจ้งหนี้ / ใบกำกับภาษี
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ตรวจสอบความถูกต้อง 100% ก่อนทำจ่ายซัพพลายเออร์ และจัดการ WHT 3% สำหรับงานรับเหมาวิศวกรรม
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setActiveTab('3way')}
            className={`px-3 py-1.5 rounded font-bold transition ${
              activeTab === '3way' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3-Way Matching (AP)
          </button>
          <button 
            onClick={() => setActiveTab('ar')}
            className={`px-3 py-1.5 rounded font-bold transition ${
              activeTab === 'ar' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            วางบิล & ออกใบแจ้งหนี้ (AR)
          </button>
        </div>
      </div>

      {/* Main Container - White Theme */}
      {activeTab === '3way' && (
        <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>เครื่องมือตรวจสอบ 3-Way Matching Verification (Gate 3)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">ตรวจสอบ 3 สัญลักษณ์ ได้แก่ ใบสั่งซื้อ (PO) + ใบรับสินค้า (GRN) + ใบแจ้งหนี้ซัพพลายเออร์ (Invoice)</p>
            </div>

            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold rounded">
              PO-2026-042 (Jinko Solar)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1: PO Data */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-800" /> 1. ข้อมูล PO อนุมัติแล้ว
              </span>
              <p className="font-mono text-[11px] text-slate-500">เลขที่ใบสั่งซื้อ: <strong className="text-slate-900">PO-2026-042</strong></p>
              <p className="font-semibold text-slate-800 text-xs">แผง Solar Mono 550W (2,727 แผง)</p>
              <p className="font-mono font-bold text-amber-700 text-xs pt-1 border-t border-slate-200">
                ยอดเงินรวม VAT: 11,453,400 ฿
              </p>
            </div>

            {/* Step 2: GRN Inspection Data */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> 2. ข้อมูล GRN รับของหน้าไซต์
              </span>
              <p className="font-mono text-[11px] text-slate-500">เลขที่ใบตรวจรับ: <strong className="text-slate-900">GRN-2026-018</strong></p>
              <p className="font-semibold text-slate-800 text-xs">2,727 แผง (ตรงตาม PO 100%)</p>
              <p className="font-mono font-bold text-emerald-700 text-xs pt-1 border-t border-slate-200">
                Passed Inspection
              </p>
            </div>

            {/* Step 3: Supplier Invoice Data */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <span className="font-bold text-slate-700 text-xs flex items-center gap-1.5">
                <Receipt className="w-3.5 h-3.5 text-purple-700" /> 3. ใบแจ้งหนี้จาก Vendor
              </span>
              <p className="font-mono text-[11px] text-slate-500">เลขที่ใบแจ้งหนี้ Vendor: <strong className="text-slate-900">INV-JK-88401</strong></p>
              <p className="font-semibold text-slate-800 text-xs">ยอดเงินตรงตาม VAT 12,255,138 บาท</p>
              <p className="font-mono font-bold text-purple-800 text-xs pt-1 border-t border-slate-200">
                หักภาษี ณ ที่จ่าย WHT 3%: 343,602 บาท
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <div>
                <h4 className="font-bold text-emerald-950 text-xs">ผลการตรวจสอบ 3-Way Matching: ถูกต้องสมบูรณ์ 100%</h4>
                <p className="text-[11px] text-emerald-800">ยอดเงิน PO + จำนวนรับ GRN + ยอดแจ้งหนี้ Invoice ตรงกันทุกประการ</p>
              </div>
            </div>

            <button className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded shadow transition">
              อนุมัติออกใบสำคัญจ่าย (Payment Voucher - PV)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountingModule;
