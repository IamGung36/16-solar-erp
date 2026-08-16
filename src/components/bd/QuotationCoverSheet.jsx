import React, { useState } from 'react';
import { Printer, Download, Calculator, CheckCircle2, ShieldCheck, TrendingUp, Info, Save, Zap } from 'lucide-react';

const categoryNamesFull = [
  { id: 1, name: 'งานอุปกรณ์หลัก (Solar Panel, Inverter, Optimizer, Data Logger)', weight: 1.35 },
  { id: 2, name: 'งานระบบไฟฟ้า AC/DC, สายไฟ solar cable, ตู้ MDB Main Breaker', weight: 1.25 },
  { id: 3, name: 'งานระบบวัดหน่วย, รีเลย์ป้องกัน & การสื่อสาร SCADA / Zero Export', weight: 1.10 },
  { id: 4, name: 'งานโยธาและโครงสร้างจับยึดแผง Aluminium Solar Mounting Structure', weight: 0.90 },
  { id: 5, name: 'งานจัดเตรียมสิ่งอำนวยความสะดวก สำนักงานสนาม & อุปกรณ์ Safety PPE', weight: 0.80 },
  { id: 6, name: 'งานระบบเครื่องกล ปั๊มน้ำและระบบล้างแผงโซลาร์อัตโนมัติ', weight: 0.85 },
  { id: 7, name: 'งานทดสอบและคอมมิชชั่นนิ่งระบบ (Test & Commissioning)', weight: 1.00 },
  { id: 8, name: 'งานออกแบบทางวิศวกรรมไฟฟ้า/โยธา และเซ็นรับรองแบบ (Engineering)', weight: 1.40 },
  { id: 9, name: 'งานบริหารและควบคุมโครงการ (Project Management & Site Safety)', weight: 1.30 },
  { id: 10, name: 'งานดำเนินการขออนุญาต อ.1, รง.4, กกพ. และการไฟฟ้า PEA/MEA (Permit)', weight: 1.40 },
  { id: 11, name: 'งานค่าใช้จ่ายอื่นๆ (ค่าขนส่ง, Bank Guarantee, ประกันภัย CAR/TPL)', weight: 0.90 }
];

const defaultBaseCosts = [
  { id: 1, mat: 664400, labor: 46400 },   // Main Equipment
  { id: 2, mat: 140000, labor: 45000 },   // Electrical
  { id: 3, mat: 62000, labor: 47000 },    // Metering
  { id: 4, mat: 65000, labor: 35000 },    // Civil Part
  { id: 5, mat: 41000, labor: 0 },        // Facility
  { id: 6, mat: 25000, labor: 12000 },    // Mechanical
  { id: 7, mat: 0, labor: 15000 },        // Testing
  { id: 8, mat: 0, labor: 35000 },        // Engineering
  { id: 9, mat: 0, labor: 90000 },        // PM
  { id: 10, mat: 30000, labor: 10000 },   // Permit
  { id: 11, mat: 92000, labor: 8500 }     // Other
];

const QuotationCoverSheet = ({ projectData, onPrev, onSaveStep }) => {
  const [marginPct, setMarginPct] = useState(10);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const currentDateStr = new Date().toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handleSave = () => {
    if (onSaveStep) onSaveStep('quotation');
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  // Build Installation System Breakdown & Total Installed Capacity Sum Text
  const sys = projectData?.systems || {};
  let totalKwpSum = 0;
  let totalKwhSum = 0;
  let systemDescriptions = [];

  if (sys.rooftop?.enabled && sys.rooftop?.val) {
    totalKwpSum += parseFloat(sys.rooftop.val) || 0;
    systemDescriptions.push(`Solar Rooftop ${sys.rooftop.val} kWp`);
  }
  if (sys.farm?.enabled && sys.farm?.val) {
    totalKwpSum += parseFloat(sys.farm.val) || 0;
    systemDescriptions.push(`Solar Farm ${sys.farm.val} kWp`);
  }
  if (sys.floating?.enabled && sys.floating?.val) {
    totalKwpSum += parseFloat(sys.floating.val) || 0;
    systemDescriptions.push(`Solar Floating ${sys.floating.val} kWp`);
  }
  if (sys.carpark?.enabled && sys.carpark?.val) {
    totalKwpSum += parseFloat(sys.carpark.val) || 0;
    systemDescriptions.push(`Solar Carpark ${sys.carpark.val} kWp`);
  }
  if (sys.bess?.enabled && sys.bess?.val) {
    totalKwhSum += parseFloat(sys.bess.val) || 0;
    systemDescriptions.push(`BESS ${sys.bess.val} kWh`);
  }

  if (systemDescriptions.length === 0) {
    totalKwpSum = projectData?.capacityKwp || 100;
    systemDescriptions.push(`Solar Rooftop ${totalKwpSum} kWp`);
  }

  const categoryBaseTotals = categoryNamesFull.map(cat => {
    const base = defaultBaseCosts.find(b => b.id === cat.id) || { mat: 10000, labor: 5000 };
    const totalBaseCost = base.mat + base.labor;
    return {
      ...cat,
      baseCost: totalBaseCost
    };
  });

  const totalBaseCostSum = categoryBaseTotals.reduce((sum, c) => sum + c.baseCost, 0);
  const profitAmountTotal = totalBaseCostSum * (marginPct / 100);

  const weightedSum = categoryBaseTotals.reduce((sum, c) => sum + (c.baseCost * c.weight), 0);

  const categoryOfferPrices = categoryBaseTotals.map(cat => {
    const weightedShare = (cat.baseCost * cat.weight) / (weightedSum || 1);
    const catProfitAlloc = profitAmountTotal * weightedShare;
    const finalOfferPrice = Math.round(cat.baseCost + catProfitAlloc);
    return {
      ...cat,
      offerPrice: finalOfferPrice
    };
  });

  const calculatedSubtotal = categoryOfferPrices.reduce((sum, c) => sum + c.offerPrice, 0);
  const vat7Pct = Math.round(calculatedSubtotal * 0.07);
  const grandTotal = calculatedSubtotal + vat7Pct;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative text-xs">
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>บันทึกข้อมูล Flow 4: ใบเสนอราคา (Quotation Cover Sheet) สำเร็จ!</span>
        </div>
      )}

      {/* Top Controls Bar */}
      <div className="erp-card-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">ใบปะหน้าเสนอราคา (Flow 4)</h2>
            <p className="text-xs text-slate-500">ปรับอัตรากำไร (Margin %) และคำนวณราคาเสนอขาย 11 หมวดหมู่อัตโนมัติ</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
            <span className="font-bold text-slate-700">กำหนด Margin (%):</span>
            <input 
              type="number"
              value={marginPct}
              onChange={(e) => setMarginPct(parseFloat(e.target.value) || 0)}
              className="w-16 bg-white border border-blue-400 rounded px-2 py-0.5 text-center font-extrabold text-blue-900 text-sm focus:outline-none"
            />
            <span className="text-slate-500 font-bold">%</span>
          </div>

          <button 
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 4
          </button>

          <button 
            onClick={handlePrint}
            className="px-4 py-2 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4 text-amber-400" /> พิมพ์ (Print / PDF)
          </button>
        </div>
      </div>

      {/* Unbalanced Bidding Strategy Note Banner */}
      <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">กลยุทธ์การจัดโครงสร้างราคาเสนอขาย (Unbalanced Bidding / Front-Loading):</span>
          <p className="text-[11px] text-amber-800 mt-0.5">
            ระบบทำการถัวเฉลี่ยและโยกสัดส่วนกำไร (Margin {marginPct}%) เข้าไปในหมวดที่ไม่เสี่ยงถูกตัดลดงาน เพื่อรักษากำไรสุทธิของบริษัทหากลูกค้าขอลดเนื้องานภายหลัง
          </p>
        </div>
      </div>

      {/* 📄 QUOTATION FORM PAPER CONTAINER */}
      <div className="bg-white border border-slate-300 rounded-xl shadow-xl p-8 max-w-4xl mx-auto space-y-6 text-slate-800 font-sans print:shadow-none print:border-none print:p-0">
        {/* Header Branding */}
        <div className="flex justify-between items-start border-b border-slate-300 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-xl shadow">
              ☀️
            </div>
            <div>
              <h1 className="text-lg font-extrabold text-slate-900 tracking-wider">SOLAR EPC ENTERPRISE CO., LTD.</h1>
              <p className="text-xs text-slate-500">123 อาคารซันไชน์ ชั้น 15 ถนนวิภาวดีรังสิต เขตจตุจักร กรุงเทพมหานคร 10900</p>
              <p className="text-xs text-slate-500">โทร: 02-999-8888 • เลขประจำตัวผู้เสียภาษี: 0105560888888</p>
            </div>
          </div>

          <div className="text-right">
            <h2 className="text-xl font-extrabold text-blue-900 tracking-tight">ใบเสนอราคา / QUOTATION</h2>
            <p className="text-xs text-slate-600 font-mono font-bold mt-1">เลขที่: QT-2026-0891</p>
            <p className="text-xs text-slate-500 mt-0.5">วันที่: {currentDateStr}</p>
          </div>
        </div>

        {/* Project & Client Specification Metadata */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
          <div className="space-y-1">
            <p className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">ข้อมูลลูกค้า (Client Specification)</p>
            <p><span className="text-slate-500">บริษัท/ลูกค้า:</span> <strong className="text-slate-800">{projectData?.clientName || 'บริษัท ไทยอุตสาหกรรมพลาสติก จำกัด (มหาชน)'}</strong></p>
            <p><span className="text-slate-500">ผู้ลงนามติดต่อ:</span> <span className="text-slate-800">{projectData?.contactName || 'คุณวิชัย มั่นคง (ฝ่ายจัดซื้อ)'}</span></p>
            <p><span className="text-slate-500">เบอร์โทรศัพท์:</span> <span className="font-mono text-slate-800">{projectData?.contactPhone || '02-999-8888'}</span></p>
            <p><span className="text-slate-500">อีเมล:</span> <span className="font-mono text-slate-800">{projectData?.contactEmail || 'contact@client-company.co.th'}</span></p>
            <p><span className="text-slate-500">ที่อยู่วางบิล:</span> <span className="text-slate-800">{projectData?.billingAddress || projectData?.location || 'นิคมอุตสาหกรรมบางปู จ.สมุทรปราการ 10280'}</span></p>
            <p><span className="text-slate-500">เลขผู้เสียภาษี:</span> <strong className="font-mono text-blue-900">{projectData?.taxId || '0105560999999 (สำนักงานใหญ่)'}</strong></p>
          </div>

          <div className="space-y-1">
            <p className="font-bold text-slate-900 text-xs border-b border-slate-200 pb-1">ข้อมูลโครงการ (Project Specification)</p>
            <p><span className="text-slate-500">รหัสโครงการ:</span> <strong className="font-mono text-blue-900">{projectData?.projectCode || 'BD26-019'}</strong></p>
            <p><span className="text-slate-500">ชื่อโครงการ:</span> <strong className="text-slate-800">{projectData?.projectName || 'โครงการ โซลาร์รูฟท็อป โรงงานสมุทรปราการ'}</strong></p>
            <p><span className="text-slate-500">สถานที่ติดตั้ง:</span> <span className="text-slate-800">{projectData?.location || 'นิคมอุตสาหกรรมบางปู จ.สมุทรปราการ'}</span></p>
            <p><span className="text-slate-500">นักลงทุน (Investor):</span> <span className="font-semibold text-slate-800">{projectData?.investor || 'PTT'}</span></p>
            <p><span className="text-slate-500">ประเภทสัญญา:</span> <span className="font-semibold text-slate-800">{projectData?.businessType || 'PPA'} Turnkey</span></p>
            <p><span className="text-slate-500">ระบบที่ติดตั้ง:</span> <span className="font-semibold text-slate-900">{systemDescriptions.join(' + ')}</span></p>
            <p><span className="text-slate-500">ผลรวมกำลังการติดตั้งทั้งหมด:</span> <strong className="font-mono text-amber-700">{totalKwpSum > 0 ? `${totalKwpSum.toLocaleString()} kWp` : '100 kWp'}{totalKwhSum > 0 && ` / ${totalKwhSum.toLocaleString()} kWh`}</strong></p>
          </div>
        </div>

        {/* 📊 11 CATEGORIES QUOTATION TABLE (Swapped Unit column to come BEFORE Quantity) */}
        <div className="border border-slate-300 rounded-lg overflow-hidden text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0f4c81] text-white font-bold uppercase text-[11px]">
                <th className="py-2.5 px-3 w-12 text-center">ลำดับ</th>
                <th className="py-2.5 px-3">รายการงานก่อสร้างและหมวดหมู่อุปกรณ์ (11 หมวดหมู่)</th>
                {/* 🌟 Swapped column order: Unit first, then Quantity */}
                <th className="py-2.5 px-3 w-20 text-center">หน่วย</th>
                <th className="py-2.5 px-3 w-20 text-center">ปริมาณ</th>
                <th className="py-2.5 px-3 w-36 text-right">จำนวนเงิน (บาท)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {categoryOfferPrices.map((cat, idx) => (
                <tr key={cat.id} className="hover:bg-slate-50 transition">
                  <td className="py-2 px-3 text-center font-mono font-bold text-slate-500">{idx + 1}</td>
                  <td className="py-2 px-3 font-medium text-slate-800">{cat.name}</td>
                  {/* 🌟 Unit column first (lot), Quantity column second (1) */}
                  <td className="py-2 px-3 text-center font-mono font-semibold text-slate-700">lot</td>
                  <td className="py-2 px-3 text-center font-mono font-semibold text-slate-700">1</td>
                  <td className="py-2 px-3 text-right font-mono font-semibold text-slate-900">
                    {cat.offerPrice.toLocaleString()} ฿
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-100 font-bold border-t-2 border-slate-300 text-xs">
                <td colSpan={4} className="py-2.5 px-4 text-right text-slate-700">
                  รวมเงินเสนอราคาก่อนภาษีมูลค่าเพิ่ม (Subtotal):
                </td>
                <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 text-sm">
                  {calculatedSubtotal.toLocaleString()} ฿
                </td>
              </tr>

              <tr className="bg-slate-100 font-bold text-xs">
                <td colSpan={4} className="py-2 px-4 text-right text-slate-600">
                  ภาษีมูลค่าเพิ่ม 7% (VAT 7%):
                </td>
                <td className="py-2 px-3 text-right font-mono font-semibold text-slate-700">
                  {vat7Pct.toLocaleString()} ฿
                </td>
              </tr>

              <tr className="bg-slate-900 text-white font-extrabold text-sm">
                <td colSpan={4} className="py-3 px-4 text-right tracking-wider">
                  จำนวนเงินรวมทั้งสิ้น (Grand Total):
                </td>
                <td className="py-3 px-3 text-right font-mono text-amber-400 text-base">
                  ฿ {grandTotal.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Signature Area */}
        <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
          <div className="space-y-12">
            <p className="font-semibold text-slate-700">เสนอราคาโดย (ผู้จัดทำโครงการ)</p>
            <div className="border-b border-slate-400 w-48 mx-auto"></div>
            <p className="text-slate-500">( วิศวกรโครงการ / BD Engineer )</p>
          </div>

          <div className="space-y-12">
            <p className="font-semibold text-slate-700">อนุมัติสั่งซื้อ (ผู้อนุมัติฝ่ายลูกค้า)</p>
            <div className="border-b border-slate-400 w-48 mx-auto"></div>
            <p className="text-slate-500">( ผู้มีอำนาจลงนาม / Client Representative )</p>
          </div>
        </div>
      </div>

      {/* Navigation Bar with Explicit Save Button */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-300">
        <button 
          onClick={onPrev}
          className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
        >
          ← ย้อนกลับไป BOQ Costing
        </button>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 4
          </button>

          <button 
            onClick={handlePrint}
            className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-amber-400" /> พิมพ์ใบเสนอราคา (Print / PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationCoverSheet;
