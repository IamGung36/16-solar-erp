import React, { useState } from 'react';
import { 
  Compass, Plus, Lock, CheckCircle2, AlertTriangle, 
  FileSpreadsheet, ShieldCheck, ArrowRight, Layers, Edit3, Save
} from 'lucide-react';
import { mockBoqItems } from '../data/mockData';

const PMModule = ({ selectedProject, boqItems: initialBoqItems = mockBoqItems, onCreatePr, requisitions }) => {
  const [boqItems, setBoqItems] = useState(initialBoqItems || mockBoqItems);
  const [showPrModal, setShowPrModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [prAmount, setPrAmount] = useState('');
  const [prReason, setPrReason] = useState('');

  // Edit WBS Item Modal State
  const [showEditWbsModal, setShowEditWbsModal] = useState(false);
  const [editingWbsItem, setEditingWbsItem] = useState(null);

  const handleOpenPrModal = (item) => {
    setSelectedItem(item);
    setPrAmount((item.baselineBudget || 0).toString());
    setPrReason(`จัดซื้ออุปกรณ์ ${item.name || ''} ตามงบประมาณ Baseline`);
    setShowPrModal(true);
  };

  const handlePrSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem || !prAmount) return;

    const requestedNum = parseFloat(prAmount) || 0;
    const baseBudget = selectedItem.baselineBudget || 0;
    const isWithinBudget = requestedNum <= baseBudget;

    const newPr = {
      prNumber: `PR-2026-0${Math.floor(Math.random() * 80 + 10)}`,
      projectId: selectedProject?.id || 'SOL-2026-001',
      wbsCode: selectedItem.code || 'WBS-1.1',
      itemDescription: `${selectedItem.name || ''} (${selectedItem.qty || 1} ${selectedItem.unit || 'LOT'})`,
      requestedAmount: requestedNum,
      baselineBudget: baseBudget,
      budgetStatus: isWithinBudget ? 'WITHIN_BUDGET' : 'OVER_BUDGET',
      requester: 'คุณสมชาย (PM)',
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING_PO',
      reason: prReason
    };

    if (onCreatePr) onCreatePr(newPr);
    setShowPrModal(false);
  };

  // Edit WBS item handlers
  const handleOpenEditWbsModal = (item) => {
    setEditingWbsItem({ ...item });
    setShowEditWbsModal(true);
  };

  const handleSaveWbsEdit = (e) => {
    e.preventDefault();
    if (!editingWbsItem) return;

    const qty = parseFloat(editingWbsItem.qty) || 1;
    const unitPrice = parseFloat(editingWbsItem.unitPrice) || 0;
    const computedBaseline = qty * unitPrice;

    const updated = (boqItems || []).map(i => 
      i.code === editingWbsItem.code 
        ? { ...editingWbsItem, qty, unitPrice, baselineBudget: computedBaseline > 0 ? computedBaseline : (editingWbsItem.baselineBudget || 0) } 
        : i
    );

    setBoqItems(updated);
    setShowEditWbsModal(false);
  };

  const itemsList = boqItems && boqItems.length > 0 ? boqItems : mockBoqItems;
  const totalBaselineSum = itemsList.reduce((s, i) => s + (i.baselineBudget || 0), 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Module Title Banner - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 2: Project Management & Budgeting
            </span>
            <span className="text-xs text-slate-500 font-semibold">โครงการ: {selectedProject?.name || 'โครงการ Solar Rooftop 1.5 MWp'}</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            ตั้งงบประมาณ Baseline Budget (WBS) & ออกใบขอซื้อ (PR)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ควบคุมรหัสงบประมาณแต่ละรายการ (Cost Code Control) ตรวจสอบอัตโนมัติไม่ให้เกินงบจากยกมาจากเสนอขาย
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleOpenPrModal(itemsList[0])}
            className="px-4 py-2 rounded bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow transition"
          >
            <Plus className="w-4 h-4" /> + ออกใบขอซื้อใหม่ (PR Creation)
          </button>
        </div>
      </div>

      {/* Main WBS Master BOQ Table Container - White Theme */}
      <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-800" />
              <span>โครงสร้างงบประมาณต้นทุน Master BOQ (Baseline Budget)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">ถอดมาจาก 11 หมวดหมู่ ของฝ่ายวิศวกรรม/เสนอขาย (สามารถกดแก้ไขข้อมูลได้)</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg text-amber-900 font-mono font-bold text-xs">
            งบประมาณรวมทั้งสิ้น: {(totalBaselineSum / 1000000).toFixed(2)} ล้านบาท
          </div>
        </div>

        {/* WBS Table with Edit Column & Safe Guards */}
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3 w-24">WBS CODE</th>
                <th className="py-2.5 px-3 w-28">หมวดหมู่</th>
                <th className="py-2.5 px-3">รายการสินค้า/งานจ้าง</th>
                <th className="py-2.5 px-3 text-center w-28">จำนวน / หน่วย</th>
                <th className="py-2.5 px-3 text-right w-32">ราคาต่อหน่วย</th>
                <th className="py-2.5 px-3 text-right w-36">งบประมาณอนุมัติ (BASELINE)</th>
                <th className="py-2.5 px-3 text-center w-28">สถานะควบคุม</th>
                <th className="py-2.5 px-3 text-center w-36">จัดการ / แก้ไข</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {itemsList.map((item) => (
                <tr key={item.code} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-mono font-bold text-amber-700 bg-amber-50/40">{item.code}</td>
                  <td className="py-2.5 px-3 font-bold text-slate-600">
                    <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px]">
                      {item.category || 'EQUIPMENT'}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{item.name}</td>
                  <td className="py-2.5 px-3 text-center font-mono font-medium text-slate-700">
                    {item.qty || 1} {item.unit || 'LOT'}
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                    {(item.unitPrice || 0).toLocaleString()} ฿
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 bg-slate-50">
                    {(item.baselineBudget || 0).toLocaleString()} ฿
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center gap-1">
                      <Lock className="w-2.5 h-2.5" /> Gate Locked
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <button 
                        onClick={() => handleOpenEditWbsModal(item)}
                        className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] rounded transition flex items-center gap-0.5"
                        title="แก้ไขรายการ WBS"
                      >
                        <Edit3 className="w-3 h-3 text-blue-700" /> แก้ไข
                      </button>
                      <button 
                        onClick={() => handleOpenPrModal(item)}
                        className="px-2 py-1 bg-[#0f4c81] hover:bg-blue-900 text-white font-bold text-[10px] rounded transition shadow-sm"
                      >
                        + ออก PR
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit WBS Item Modal */}
      {showEditWbsModal && editingWbsItem && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-700" />
                <span>แก้ไขรายการ WBS - {editingWbsItem.code}</span>
              </h3>
              <button onClick={() => setShowEditWbsModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveWbsEdit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">ชื่อรายการสินค้า/งานจ้าง</label>
                <input 
                  type="text"
                  required
                  value={editingWbsItem.name || ''}
                  onChange={(e) => setEditingWbsItem({ ...editingWbsItem, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">จำนวน (Qty)</label>
                  <input 
                    type="number"
                    required
                    value={editingWbsItem.qty || ''}
                    onChange={(e) => setEditingWbsItem({ ...editingWbsItem, qty: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">หน่วย (Unit)</label>
                  <input 
                    type="text"
                    required
                    value={editingWbsItem.unit || ''}
                    onChange={(e) => setEditingWbsItem({ ...editingWbsItem, unit: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ราคาต่อหน่วย (บาท)</label>
                  <input 
                    type="number"
                    required
                    value={editingWbsItem.unitPrice || ''}
                    onChange={(e) => setEditingWbsItem({ ...editingWbsItem, unitPrice: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">งบอนุมัติ Baseline (บาท)</label>
                  <input 
                    type="number"
                    required
                    value={editingWbsItem.baselineBudget || 0}
                    onChange={(e) => setEditingWbsItem({ ...editingWbsItem, baselineBudget: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-amber-50 border border-amber-300 rounded px-3 py-1.5 font-mono font-bold text-amber-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setShowEditWbsModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 shadow flex items-center gap-1"
                >
                  <Save className="w-4 h-4" /> บันทึกการแก้ไข
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PR Creation Modal */}
      {showPrModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-700" />
                <span>ออกใบขอซื้อ (PR Creation) - {selectedItem?.code}</span>
              </h3>
              <button onClick={() => setShowPrModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handlePrSubmit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">รายการสินค้า/งานจ้าง</label>
                <input 
                  type="text"
                  readOnly
                  value={selectedItem?.name || ''}
                  className="w-full bg-slate-100 border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">งบประมาณ Baseline (บาท)</label>
                  <input 
                    type="text"
                    readOnly
                    value={(selectedItem?.baselineBudget || 0).toLocaleString()}
                    className="w-full bg-amber-50 border border-amber-300 rounded px-3 py-1.5 font-mono font-bold text-amber-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">จำนวนเงินขอซื้อ (PR Amount)</label>
                  <input 
                    type="number"
                    required
                    value={prAmount}
                    onChange={(e) => setPrAmount(e.target.value)}
                    className="w-full bg-white border border-blue-400 rounded px-3 py-1.5 font-mono font-bold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">เหตุผลในการขอซื้อ</label>
                <textarea 
                  rows={2}
                  value={prReason}
                  onChange={(e) => setPrReason(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-slate-800 focus:outline-none"
                />
              </div>

              {parseFloat(prAmount || 0) > (selectedItem?.baselineBudget || 0) && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-lg flex items-center gap-2 text-rose-800 font-bold">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>คำเตือน: จำนวนเงินเกินงบ Baseline ระบบจะทำการ Block การขอซื้อ!</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setShowPrModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow"
                >
                  ยื่นขอซื้อ (Submit PR)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PMModule;
