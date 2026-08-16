import React, { useState } from 'react';
import { 
  Users, Plus, Search, Building2, Phone, Mail, 
  ShieldCheck, CreditCard, Tag, Edit3, Trash2, CheckCircle2, Star, Save
} from 'lucide-react';

const initialVendors = [
  { id: 'v-1', name: 'บริษัท จิงโกะ โซลาร์ (ประเทศไทย) จำกัด', category: 'อุปกรณ์หลัก (Solar Panels)', taxId: '0105560111111', contact: 'คุณณัฐพล (Sales Director)', phone: '02-111-2222', email: 'sales@jinkosolar.co.th', creditTerm: '30 วัน', rating: 5 },
  { id: 'v-2', name: 'บริษัท ซันโกรว์ พาวเวอร์ ซัพพลาย จำกัด', category: 'อุปกรณ์หลัก (Inverters)', taxId: '0105560222222', contact: 'คุณอรพินท์ (Key Account)', phone: '02-333-4444', email: 'service@sungrow.co.th', creditTerm: '45 วัน', rating: 5 },
  { id: 'v-3', name: 'บริษัท บางกอกเคเบิ้ล จำกัด (มหาชน)', category: 'งานระบบไฟฟ้า (Solar Cable/MDB)', taxId: '0105560333333', contact: 'คุณวิชัย (Manager)', phone: '02-555-6666', email: 'contact@bangkokcable.com', creditTerm: '30 วัน', rating: 4 },
  { id: 'v-4', name: 'บริษัท ไทยโครงสร้างโซลาร์ จำกัด', category: 'งานโยธา & Mounting Structure', taxId: '0105560444444', contact: 'คุณเกรียงไกร (Project Coordinator)', phone: '081-888-9999', email: 'info@thaisolarstructure.co.th', creditTerm: '15 วัน', rating: 4 },
  { id: 'v-5', name: 'บริษัท เอ็นจิเนียริ่ง เทสติ้ง แอนด์ คอมมิชชั่นนิ่ง จำกัด', category: 'งานทดสอบ & Permit', taxId: '0105560555555', contact: 'ดร.สมเกียรติ (Lead Engineer)', phone: '02-777-8888', email: 'test@etc-engineer.co.th', creditTerm: 'สด/เงินงวด', rating: 5 },
];

const PartnerModule = () => {
  const [vendors, setVendors] = useState(initialVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  
  // New Partner Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVendor, setNewVendor] = useState({
    name: '', category: 'อุปกรณ์หลัก (Solar Panels)', taxId: '', contact: '', phone: '', email: '', creditTerm: '30 วัน', rating: 5
  });

  const [showSaveToast, setShowSaveToast] = useState(false);

  const categories = [
    'ALL',
    'อุปกรณ์หลัก (Solar Panels)',
    'อุปกรณ์หลัก (Inverters)',
    'งานระบบไฟฟ้า (Solar Cable/MDB)',
    'งานโยธา & Mounting Structure',
    'งานทดสอบ & Permit'
  ];

  const filteredVendors = vendors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'ALL' || v.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  const handleAddVendor = (e) => {
    e.preventDefault();
    if (!newVendor.name.trim()) return;

    const created = {
      id: `v-${Date.now()}`,
      ...newVendor
    };

    setVendors([created, ...vendors]);
    setShowAddModal(false);
    setNewVendor({ name: '', category: 'อุปกรณ์หลัก (Solar Panels)', taxId: '', contact: '', phone: '', email: '', creditTerm: '30 วัน', rating: 5 });
    
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter(v => v.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 text-xs relative">
      {/* Save Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>เพิ่มข้อมูลคู่ค้าใหม่สำเร็จ!</span>
        </div>
      )}

      {/* Header Banner - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 8: Partner & Vendor Management
            </span>
            <span className="text-xs text-slate-500 font-semibold">คลังข้อมูลซัพพลายเออร์ & ผู้รับเหมาช่วง</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            8. ทะเบียนคู่ค้าและผู้รับเหมา (Vendor & Subcontractor Directory)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            บริหารรายชื่อคู่ค้า Credit Term เลขผู้เสียภาษี ช่องทางติดต่อ และคะแนนการทำงาน (Vendor Rating)
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded bg-[#055726] hover:bg-[#03401b] text-white font-bold text-xs flex items-center gap-1.5 shadow transition"
        >
          <Plus className="w-4 h-4 text-amber-300" /> + ลงทะเบียนคู่ค้าใหม่
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="erp-card-white p-4 rounded-xl border border-slate-300 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <input 
            type="text" 
            placeholder="ค้นหาชื่อคู่ค้า, ผู้ติดต่อ, หรือประเภท..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none pl-8"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1 rounded font-bold text-[11px] transition whitespace-nowrap ${
                selectedCat === cat ? 'bg-[#0f4c81] text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'ALL' ? 'ทั้งหมด' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vendors Table - White Theme */}
      <div className="bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
              <th className="py-2.5 px-3">ชื่อคู่ค้า / บริษัท</th>
              <th className="py-2.5 px-3">ประเภทงาน / สินค้า</th>
              <th className="py-2.5 px-3 font-mono">เลขผู้เสียภาษี (Tax ID)</th>
              <th className="py-2.5 px-3">ผู้ติดต่อหลัก</th>
              <th className="py-2.5 px-3 text-center">Credit Term</th>
              <th className="py-2.5 px-3 text-center">Rating</th>
              <th className="py-2.5 px-3 text-center w-20">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredVendors.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50 transition">
                <td className="py-3 px-3">
                  <div className="font-bold text-slate-900">{v.name}</div>
                  <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-0.5"><Phone className="w-3 h-3 text-slate-400" /> {v.phone}</span>
                    <span className="flex items-center gap-0.5"><Mail className="w-3 h-3 text-slate-400" /> {v.email}</span>
                  </div>
                </td>
                <td className="py-3 px-3 font-bold text-slate-700">
                  <span className="px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded text-[10px]">
                    {v.category}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono font-semibold text-slate-600">{v.taxId}</td>
                <td className="py-3 px-3 font-semibold text-slate-800">{v.contact}</td>
                <td className="py-3 px-3 text-center font-mono font-bold text-amber-700">
                  <span className="px-2 py-0.5 bg-amber-50 rounded border border-amber-200">
                    {v.creditTerm}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <div className="flex items-center justify-center gap-0.5 text-amber-500">
                    {[...Array(v.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400" />
                    ))}
                  </div>
                </td>
                <td className="py-3 px-3 text-center">
                  <button 
                    onClick={() => handleDeleteVendor(v.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 transition"
                    title="ลบข้อมูลคู่ค้า"
                  >
                    <Trash2 className="w-4 h-4 mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-700" />
                <span>ลงทะเบียนคู่ค้า/ซัพพลายเออร์ใหม่</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleAddVendor} className="space-y-3">
              <div>
                <label className="block text-slate-700 font-bold mb-1">ชื่อคู่ค้า / บริษัท</label>
                <input 
                  type="text"
                  required
                  placeholder="เช่น บริษัท จิงโกะ โซลาร์ (ประเทศไทย) จำกัด"
                  value={newVendor.name}
                  onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ประเภทสินค้า/งาน</label>
                  <select
                    value={newVendor.category}
                    onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
                  >
                    {categories.filter(c => c !== 'ALL').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">เลขประจำตัวผู้เสียภาษี</label>
                  <input 
                    type="text"
                    placeholder="เช่น 0105560999999"
                    value={newVendor.taxId}
                    onChange={(e) => setNewVendor({ ...newVendor, taxId: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">ผู้ติดต่อหลัก</label>
                  <input 
                    type="text"
                    placeholder="ชื่อผู้ติดต่อ"
                    value={newVendor.contact}
                    onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">เบอร์โทรศัพท์</label>
                  <input 
                    type="text"
                    placeholder="02-xxx-xxxx"
                    value={newVendor.phone}
                    onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Credit Term</label>
                  <input 
                    type="text"
                    placeholder="เช่น 30 วัน"
                    value={newVendor.creditTerm}
                    onChange={(e) => setNewVendor({ ...newVendor, creditTerm: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">อีเมลผู้ติดต่อ</label>
                <input 
                  type="email"
                  placeholder="sales@vendor.com"
                  value={newVendor.email}
                  onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-slate-200 text-slate-700 font-bold hover:bg-slate-300"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 rounded bg-[#055726] text-white font-bold hover:bg-[#03401b] shadow flex items-center gap-1"
                >
                  <Save className="w-4 h-4" /> บันทึกลงทะเบียน
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerModule;
