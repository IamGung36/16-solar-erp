import React, { useState } from 'react';
import { 
  ShoppingCart, FileText, CheckCircle2, AlertOctagon, 
  ArrowRight, ShieldCheck, QrCode, Layers, Search, Edit3, Save
} from 'lucide-react';
import { mockRequisitions, mockPurchaseOrders } from '../data/mockData';

const ProcurementModule = ({ requisitions: initialRequisitions = mockRequisitions, purchaseOrders: initialPurchaseOrders = mockPurchaseOrders, onCreatePo }) => {
  const [requisitions, setRequisitions] = useState(initialRequisitions || mockRequisitions);
  const [purchaseOrders, setPurchaseOrders] = useState(initialPurchaseOrders || mockPurchaseOrders);
  const [activeTab, setActiveTab] = useState('pr_list');
  
  // Edit PR Modal State
  const [showEditPrModal, setShowEditPrModal] = useState(false);
  const [editingPr, setEditingPr] = useState(null);

  // Edit PO Modal State
  const [showEditPoModal, setShowEditPoModal] = useState(false);
  const [editingPo, setEditingPo] = useState(null);

  const reqList = requisitions && requisitions.length > 0 ? requisitions : mockRequisitions;
  const poList = purchaseOrders && purchaseOrders.length > 0 ? purchaseOrders : mockPurchaseOrders;

  const handleCreatePoAction = (pr) => {
    if (onCreatePo) onCreatePo(pr);
  };

  const handleOpenEditPrModal = (pr) => {
    setEditingPr({ ...pr });
    setShowEditPrModal(true);
  };

  const handleSavePrEdit = (e) => {
    e.preventDefault();
    if (!editingPr) return;

    const reqAmt = parseFloat(editingPr.requestedAmount) || 0;
    const baseBudget = editingPr.baselineBudget || 0;
    const isWithinBudget = reqAmt <= baseBudget;

    const updated = reqList.map(r => 
      r.prNumber === editingPr.prNumber 
        ? { ...editingPr, requestedAmount: reqAmt, budgetStatus: isWithinBudget ? 'WITHIN_BUDGET' : 'OVER_BUDGET' } 
        : r
    );

    setRequisitions(updated);
    setShowEditPrModal(false);
  };

  const handleOpenEditPoModal = (po) => {
    setEditingPo({ ...po });
    setShowEditPoModal(true);
  };

  const handleSavePoEdit = (e) => {
    e.preventDefault();
    if (!editingPo) return;

    const amt = parseFloat(editingPo.amount) || 0;
    const vat = Math.round(amt * 0.07);
    const grandTotal = amt + vat;

    const updated = poList.map(p => 
      p.poNumber === editingPo.poNumber 
        ? { ...editingPo, amount: amt, vat, grandTotal } 
        : p
    );

    setPurchaseOrders(updated);
    setShowEditPoModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs">
      {/* Title Banner Header - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 3: Procurement & Inventory
            </span>
            <span className="text-xs text-slate-500 font-semibold">เปรียบเทียบราคา & ตรวจรับ Serial Number</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            จัดซื้อสินค้า (RFQ/PO) & สแกน Serial Number แผง Solar
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            เปรียบเทียบใบเสนอราคา 3 เจ้า ออก PO อัตโนมัติ และสแกน Barcode เพื่อลงทะเบียนการรับประกันสินทรัพย์ (สามารถกดแก้ไขข้อมูลได้)
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button 
            onClick={() => setActiveTab('pr_list')}
            className={`px-3 py-1.5 rounded font-bold transition ${
              activeTab === 'pr_list' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รายการขอซื้อ (PR List)
          </button>
          <button 
            onClick={() => setActiveTab('po_list')}
            className={`px-3 py-1.5 rounded font-bold transition ${
              activeTab === 'po_list' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            รายการสั่งซื้อ (PO List)
          </button>
          <button 
            onClick={() => setActiveTab('grn')}
            className={`px-3 py-1.5 rounded font-bold transition ${
              activeTab === 'grn' ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            สแกน Serial Number (GRN)
          </button>
        </div>
      </div>

      {/* Main Content Area - White Theme */}
      {activeTab === 'pr_list' && (
        <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-800" />
                <span>รายการใบขอซื้อรอการออก PO (Requisitions Inbox)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">ตรวจเช็คสถานะการขอซื้อเทียบกับงบอนุมัติในการจัดซื้อ (สามารถกดแก้ไขข้อมูลได้)</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-blue-50 border border-blue-200 text-blue-900 font-bold rounded">
                รออนุมัติ PO ({reqList.filter(r => r.status === 'PENDING_PO').length})
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {reqList.map((pr) => (
              <div 
                key={pr.prNumber} 
                className={`p-4 rounded-xl border transition flex flex-col md:flex-row justify-between items-start md:items-center gap-3 ${
                  pr.budgetStatus === 'WITHIN_BUDGET' 
                    ? 'bg-white border-slate-300 hover:border-blue-400 shadow-sm' 
                    : 'bg-rose-50/50 border-rose-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {pr.prNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{pr.itemDescription}</h4>
                  </div>
                  <p className="text-slate-500">
                    ผู้ขอซื้อ: <span className="font-medium text-slate-800">{pr.requester || 'PM'}</span> • 
                    WBS: <span className="font-mono font-bold text-slate-700">{pr.wbsCode || 'WBS-1.1'}</span>
                  </p>

                  <div className="pt-1 flex items-center gap-2">
                    {pr.budgetStatus === 'WITHIN_BUDGET' ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> อยู่ในกรอบงบประมาณ (Pass Gate 2)
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                        <AlertOctagon className="w-3 h-3" /> เกินงบ Baseline {(pr.baselineBudget || 0).toLocaleString()} ฿ (BLOCKED)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500">มูลค่าขอซื้อ</p>
                    <p className="font-mono font-extrabold text-slate-900 text-base">
                      {(pr.requestedAmount || 0).toLocaleString()} <span className="text-xs font-normal">฿</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleOpenEditPrModal(pr)}
                      className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-blue-700" /> แก้ไข
                    </button>

                    {pr.budgetStatus === 'WITHIN_BUDGET' ? (
                      <button 
                        onClick={() => handleCreatePoAction(pr)}
                        className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded shadow transition"
                      >
                        ⚡ อนุมัติออก PO
                      </button>
                    ) : (
                      <button 
                        disabled 
                        className="px-4 py-1.5 bg-slate-200 text-slate-400 font-bold rounded cursor-not-allowed"
                      >
                        🔒 อนุมัติไม่ได้ (Over Budget)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab PO List */}
      {activeTab === 'po_list' && (
        <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <h3 className="font-bold text-slate-800 text-sm">รายการสั่งซื้อ Purchase Orders (PO List) - สามารถกดแก้ไขข้อมูลได้</h3>
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">เลขที่ PO</th>
                  <th className="py-2.5 px-3">เลขที่ PR</th>
                  <th className="py-2.5 px-3">ผู้ขาย / ซัพพลายเออร์</th>
                  <th className="py-2.5 px-3">รายการสินค้า</th>
                  <th className="py-2.5 px-3 text-right">ยอดรวมก่อน VAT</th>
                  <th className="py-2.5 px-3 text-right">ยอดรวม VAT 7%</th>
                  <th className="py-2.5 px-3 text-center">กำหนดส่งสินค้า</th>
                  <th className="py-2.5 px-3 text-center">สถานะ</th>
                  <th className="py-2.5 px-3 text-center">แก้ไข</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {poList.map((po) => (
                  <tr key={po.poNumber} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono font-bold text-blue-900">{po.poNumber}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">{po.prNumber}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{po.vendor}</td>
                    <td className="py-2.5 px-3 text-slate-700">{po.items}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">{(po.amount || 0).toLocaleString()} ฿</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-amber-700">{(po.grandTotal || 0).toLocaleString()} ฿</td>
                    <td className="py-2.5 px-3 text-center font-mono text-slate-600">{po.deliveryDate}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded border border-emerald-300 text-[10px]">
                        {po.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <button 
                        onClick={() => handleOpenEditPoModal(po)}
                        className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-[10px] rounded transition flex items-center gap-0.5 mx-auto"
                      >
                        <Edit3 className="w-3 h-3 text-blue-700" /> แก้ไข
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab GRN Serial Scanning */}
      {activeTab === 'grn' && (
        <div className="bg-white border border-slate-300 p-5 rounded-xl shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-700" />
                <span>ระบบสแกน Serial Number แผงโซลาร์และอินเวอร์เตอร์ (GRN Inspection)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">รับประกันสินค้า 25 ปีแบบติดตามด้วย Barcode/Serial รายแผง</p>
            </div>
            <button className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow">
              📷 เปิดกล้องสแกน Barcode
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-center">
              <span className="text-2xl font-extrabold text-slate-900 font-mono">2,727</span>
              <p className="font-bold text-slate-700 text-xs">จำนวนแผงทั้งหมดตาม PO</p>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-center">
              <span className="text-2xl font-extrabold text-emerald-700 font-mono">2,727</span>
              <p className="font-bold text-emerald-900 text-xs">สแกนรับเข้าแล้ว (100%)</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2 text-center">
              <span className="text-2xl font-extrabold text-blue-900 font-mono">0</span>
              <p className="font-bold text-blue-900 text-xs">แผงชำรุดรอเปลี่ยนเคลม</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit PR Modal */}
      {showEditPrModal && editingPr && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-700" />
                <span>แก้ไขใบขอซื้อ - {editingPr.prNumber}</span>
              </h3>
              <button onClick={() => setShowEditPrModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSavePrEdit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">รายการสินค้า/รายละเอียด</label>
                <input 
                  type="text"
                  required
                  value={editingPr.itemDescription || ''}
                  onChange={(e) => setEditingPr({ ...editingPr, itemDescription: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">งบ Baseline (บาท)</label>
                  <input 
                    type="text"
                    readOnly
                    value={(editingPr.baselineBudget || 0).toLocaleString()}
                    className="w-full bg-amber-50 border border-amber-300 rounded px-3 py-1.5 font-mono font-bold text-amber-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">มูลค่าขอซื้อ (บาท)</label>
                  <input 
                    type="number"
                    required
                    value={editingPr.requestedAmount || 0}
                    onChange={(e) => setEditingPr({ ...editingPr, requestedAmount: e.target.value })}
                    className="w-full bg-white border border-blue-400 rounded px-3 py-1.5 font-mono font-bold text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setShowEditPrModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 shadow flex items-center gap-1"
                >
                  <Save className="w-4 h-4" /> บันทึกการแก้ไข PR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit PO Modal */}
      {showEditPoModal && editingPo && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-700" />
                <span>แก้ไขใบสั่งซื้อ - {editingPo.poNumber}</span>
              </h3>
              <button onClick={() => setShowEditPoModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleSavePoEdit} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">ชื่อผู้ขาย / ซัพพลายเออร์ (Vendor)</label>
                <input 
                  type="text"
                  required
                  value={editingPo.vendor || ''}
                  onChange={(e) => setEditingPo({ ...editingPo, vendor: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">รายการสินค้า PO</label>
                <input 
                  type="text"
                  required
                  value={editingPo.items || ''}
                  onChange={(e) => setEditingPo({ ...editingPo, items: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ยอดเงินก่อน VAT (บาท)</label>
                  <input 
                    type="number"
                    required
                    value={editingPo.amount || 0}
                    onChange={(e) => setEditingPo({ ...editingPo, amount: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">กำหนดส่งมอบสินค้า</label>
                  <input 
                    type="date"
                    required
                    value={editingPo.deliveryDate || ''}
                    onChange={(e) => setEditingPo({ ...editingPo, deliveryDate: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setShowEditPoModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded bg-blue-700 text-white font-bold hover:bg-blue-800 shadow flex items-center gap-1"
                >
                  <Save className="w-4 h-4" /> บันทึกการแก้ไข PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcurementModule;
