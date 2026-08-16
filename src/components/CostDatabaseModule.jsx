import React, { useState } from 'react';
import { 
  Database, Plus, Search, Trash2, Save, Lock, Unlock, 
  History, ChevronLeft, ChevronRight, ShieldAlert, CheckCircle2, RefreshCw
} from 'lucide-react';

const categoryNames = [
  'หมวด 1: Main Equipment (อุปกรณ์หลัก)',
  'หมวด 2: Electrical Part (งานระบบไฟฟ้า)',
  'หมวด 3: Metering, Protection & Comm.',
  'หมวด 4: Civil Part (งานโยธาและโครงสร้าง)',
  'หมวด 5: Facility (สิ่งอำนวยความสะดวก)',
  'หมวด 6: Mechanical (งานเครื่องกล)',
  'หมวด 7: Test and Commissioning',
  'หมวด 8: Engineering',
  'หมวด 9: Project Management',
  'หมวด 10: Permit (ค่าธรรมเนียมขออนุญาต)',
  'หมวด 11: Other (ค่าใช้จ่ายอื่นๆ)'
];

const CostDatabaseModule = ({ 
  costDatabase, 
  setCostDatabase, 
  globalMatMarkup, 
  setGlobalMatMarkup, 
  globalLaborMarkup, 
  setGlobalLaborMarkup,
  auditLogs,
  setAuditLogs,
  userRole = 'admin'
}) => {
  const [activeSubTab, setActiveSubTab] = useState('catalog'); // 'catalog' | 'logs'
  const [selectedCatId, setSelectedCatId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [logSearchQuery, setLogSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Role toggle simulator for demonstration
  const [currentUserRole, setCurrentUserRole] = useState(userRole);

  const [newItem, setNewItem] = useState({
    name: '',
    brand: '',
    spec: '',
    unit: 'ชุด',
    matPrice: 0,
    laborPrice: 0
  });

  const addAuditLog = (action, itemName, oldValue, newValue) => {
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleDateString('th-TH') + ' ' + new Date().toLocaleTimeString('th-TH'),
      user: currentUserRole === 'admin' ? 'admin (ผู้ดูแลระบบ)' : 'คุณสมชาย (BD User)',
      action,
      itemName,
      oldValue,
      newValue
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleMatMarkupChange = (val) => {
    if (currentUserRole !== 'admin') return;
    const num = parseFloat(val) || 0;
    addAuditLog('UPDATE_MARKUP', 'การตั้งค่า % Markup วัสดุ', `${globalMatMarkup}%`, `${num}%`);
    setGlobalMatMarkup(num);
  };

  const handleLaborMarkupChange = (val) => {
    if (currentUserRole !== 'admin') return;
    const num = parseFloat(val) || 0;
    addAuditLog('UPDATE_MARKUP', 'การตั้งค่า % Markup ค่าแรง', `${globalLaborMarkup}%`, `${num}%`);
    setGlobalLaborMarkup(num);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;

    const created = {
      id: `cd-${selectedCatId}${Date.now()}`,
      catId: selectedCatId,
      name: newItem.name.trim(),
      brand: newItem.brand.trim() || '-',
      spec: newItem.spec.trim() || '-',
      unit: newItem.unit.trim() || 'ชุด',
      matPrice: parseFloat(newItem.matPrice) || 0,
      laborPrice: parseFloat(newItem.laborPrice) || 0
    };

    setCostDatabase([created, ...costDatabase]);
    addAuditLog(
      'CREATE_ITEM', 
      `${created.name} (${created.brand})`, 
      '-', 
      `วัสดุ: ${created.matPrice.toLocaleString()} ฿, ค่าแรง: ${created.laborPrice.toLocaleString()} ฿`
    );
    setNewItem({ name: '', brand: '', spec: '', unit: 'ชุด', matPrice: 0, laborPrice: 0 });
  };

  const handleDeleteItem = (item) => {
    setCostDatabase(costDatabase.filter(i => i.id !== item.id));
    addAuditLog(
      'DELETE_ITEM', 
      `${item.name} (${item.brand} ${item.spec})`, 
      `วัสดุ: ${item.matPrice.toLocaleString()} ฿, ค่าแรง: ${item.laborPrice.toLocaleString()} ฿`, 
      'ลบรายการ'
    );
  };

  const filteredItems = costDatabase.filter(item => {
    const matchesCat = selectedCatId === 0 || item.catId === selectedCatId;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.spec.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredLogs = auditLogs.filter(log => 
    log.itemName.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
    log.user.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
    log.action.toLowerCase().includes(logSearchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Banner Header - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              Module 99: Cost Database
            </span>
            <span className="text-xs text-slate-500 font-semibold">คลังข้อมูลต้นทุน & ระบบ Audit Log ติดตามการแก้ไข</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            Cost Database (Master Catalog & Security Audit)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            กำหนดอัตราร้อยละ % Markup เฉพาะ Admin • บันทึก Log ทุกการเปลี่ยนแปลง • ดึงราคาต่อไปยัง BOQ ก่อสร้าง
          </p>
        </div>

        {/* Role Simulator Switcher */}
        <div className="flex items-center gap-3 bg-slate-800 p-2 rounded-xl border border-slate-700">
          <span className="text-xs text-slate-400 font-semibold pl-1">ทดสอบสิทธิ์ผู้ใช้:</span>
          <button 
            onClick={() => setCurrentUserRole('admin')}
            className={`px-3 py-1 text-xs rounded-lg font-bold transition flex items-center gap-1 ${
              currentUserRole === 'admin' 
                ? 'bg-amber-500 text-slate-950 shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" /> Admin (สิทธิ์เต็ม)
          </button>
          <button 
            onClick={() => setCurrentUserRole('user')}
            className={`px-3 py-1 text-xs rounded-lg font-bold transition flex items-center gap-1 ${
              currentUserRole === 'user' 
                ? 'bg-blue-600 text-white shadow' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> User ทั่วไป (BD/PM)
          </button>
        </div>
      </div>

      {/* Sub Tabs: Catalog vs Audit Trail Log */}
      <div className="erp-card-white p-2 rounded-lg flex items-center justify-between shadow-sm text-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`px-4 py-2 rounded font-bold flex items-center gap-2 transition ${
              activeSubTab === 'catalog'
                ? 'bg-[#0f4c81] text-white shadow'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>คลังข้อมูลอุปกรณ์ (Master Catalog)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('logs')}
            className={`px-4 py-2 rounded font-bold flex items-center gap-2 transition ${
              activeSubTab === 'logs'
                ? 'bg-[#0f4c81] text-white shadow'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <History className="w-4 h-4" />
            <span>📜 ประวัติการแก้ไขข้อมูล (Audit Trail Log)</span>
            <span className="px-1.5 py-0.2 bg-amber-400 text-blue-950 font-mono font-bold rounded text-[10px]">
              {auditLogs.length}
            </span>
          </button>
        </div>
      </div>

      {/* SUB TAB 1: MASTER CATALOG VIEW */}
      {activeSubTab === 'catalog' && (
        <div className="flex items-start gap-4 relative">
          {/* Left Category Selector Card (Collapsible) */}
          <div className={`transition-all duration-300 ease-in-out shrink-0 ${
            isSidebarCollapsed ? 'w-12' : 'w-72'
          }`}>
            <div className="erp-card-white rounded-xl p-3 space-y-2 sticky top-16 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                {!isSidebarCollapsed && (
                  <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5 truncate">
                    <Database className="w-4 h-4 text-blue-900" />
                    <span>หมวดหมู่ข้อมูล (11 Categories)</span>
                  </h3>
                )}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition font-bold mx-auto"
                >
                  {isSidebarCollapsed ? <ChevronRight className="w-4 h-4 text-blue-900" /> : <ChevronLeft className="w-4 h-4 text-blue-900" />}
                </button>
              </div>

              {!isSidebarCollapsed ? (
                <div className="space-y-1 pt-1 max-h-[70vh] overflow-y-auto pr-1">
                  <button
                    onClick={() => setSelectedCatId(0)}
                    className={`w-full text-left px-2.5 py-1.5 rounded font-bold transition text-xs flex justify-between items-center ${
                      selectedCatId === 0 ? 'bg-[#0f4c81] text-white shadow' : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>🌐 แสดงทุกหมวดหมู่ (All Items)</span>
                    <span className="text-[10px] font-mono bg-blue-950 px-1.5 py-0.5 rounded text-amber-400">{costDatabase.length}</span>
                  </button>

                  {categoryNames.map((catName, idx) => {
                    const catId = idx + 1;
                    const itemCount = costDatabase.filter(c => c.catId === catId).length;
                    return (
                      <button
                        key={catId}
                        onClick={() => setSelectedCatId(catId)}
                        className={`w-full text-left px-2.5 py-1.5 rounded font-semibold text-[11px] transition flex justify-between items-center ${
                          selectedCatId === catId ? 'bg-[#0f4c81] text-white font-bold shadow' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{catName}</span>
                        <span className={`px-1.5 py-0.2 text-[10px] rounded font-mono font-bold ${
                          selectedCatId === catId ? 'bg-blue-950 text-amber-400' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {itemCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2 text-center pt-1">
                  <button 
                    onClick={() => setSelectedCatId(0)}
                    className={`w-8 h-8 rounded-full font-bold text-xs flex items-center justify-center mx-auto ${
                      selectedCatId === 0 ? 'bg-[#0f4c81] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    ALL
                  </button>
                  {categoryNames.map((_, idx) => (
                    <button
                      key={idx + 1}
                      onClick={() => setSelectedCatId(idx + 1)}
                      className={`w-7 h-7 rounded font-bold text-[11px] flex items-center justify-center mx-auto transition ${
                        selectedCatId === idx + 1 ? 'bg-[#0f4c81] text-white shadow' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Main Table & Add Form */}
          <div className="flex-1 space-y-4 min-w-0">
            {/* Global Markup Control (Admin Only Lock) */}
            <div className="erp-card-white p-4 rounded-xl space-y-3 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
                <h3 className="font-bold text-blue-950 text-xs flex items-center gap-1.5">
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>+ เพิ่มรายการอุปกรณ์มาตรฐานใหม่ เข้า Cost Database (หมวด {selectedCatId || 1})</span>
                </h3>

                {/* Admin Only Markup Controller */}
                <div className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border text-xs ${
                  currentUserRole === 'admin' 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'bg-slate-100 border-slate-300 opacity-80'
                }`}>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-slate-700">% Markup วัสดุ:</span>
                    <input 
                      type="number" 
                      disabled={currentUserRole !== 'admin'}
                      value={globalMatMarkup} 
                      onChange={(e) => handleMatMarkupChange(e.target.value)}
                      className="w-14 bg-white border border-blue-300 rounded px-1.5 py-0.5 text-center font-bold text-orange-600 font-mono disabled:bg-slate-200 disabled:text-slate-500"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-slate-700">% Markup ค่าแรง:</span>
                    <input 
                      type="number" 
                      disabled={currentUserRole !== 'admin'}
                      value={globalLaborMarkup} 
                      onChange={(e) => handleLaborMarkupChange(e.target.value)}
                      className="w-14 bg-white border border-blue-300 rounded px-1.5 py-0.5 text-center font-bold text-emerald-600 font-mono disabled:bg-slate-200 disabled:text-slate-500"
                    />
                    <span className="text-slate-500">%</span>
                  </div>
                  
                  {currentUserRole !== 'admin' && (
                    <span className="ml-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-300">
                      <Lock className="w-3 h-3 text-amber-600" /> เฉพาะ Admin
                    </span>
                  )}
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleAddItem} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                  <div>
                    <label className="block text-slate-600 font-semibold text-[11px] mb-1">ชื่อรายการอุปกรณ์ *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="เช่น PV Module, Inverter"
                      value={newItem.name}
                      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold text-[11px] mb-1">แบรนด์ (Brand) *</label>
                    <input 
                      type="text" 
                      placeholder="เช่น JA Solar, Huawei"
                      value={newItem.brand}
                      onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold text-[11px] mb-1">รุ่น / สเปก (Spec) *</label>
                    <input 
                      type="text" 
                      placeholder="เช่น JAM66BV, 725Wp"
                      value={newItem.spec}
                      onChange={(e) => setNewItem({ ...newItem, spec: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold text-[11px] mb-1">หน่วย *</label>
                    <input 
                      type="text" 
                      placeholder="เช่น แผง, เครื่อง, ชุด"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold text-[11px] mb-1">ราคาวัสดุ/หน่วย (บาท)</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={newItem.matPrice || ''}
                      onChange={(e) => setNewItem({ ...newItem, matPrice: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-right font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 font-semibold text-[11px] mb-1">ราคาค่าแรง/หน่วย (บาท)</label>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={newItem.laborPrice || ''}
                      onChange={(e) => setNewItem({ ...newItem, laborPrice: e.target.value })}
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1.5 text-xs text-right font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button 
                    type="submit"
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-xs shadow flex items-center gap-1 transition"
                  >
                    <Save className="w-3.5 h-3.5" /> บันทึกเข้า Cost Database
                  </button>
                </div>
              </form>
            </div>

            {/* Catalog Items Table */}
            <div className="erp-card-white rounded-xl p-4 space-y-3 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="font-bold text-slate-800 text-xs">
                  รายการอุปกรณ์ใน Cost Database ({filteredItems.length} รายการ)
                </h3>

                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
                  <input 
                    type="text"
                    placeholder="ค้นหาอุปกรณ์ แบรนด์ สเปก..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1 bg-white border border-slate-300 rounded text-xs focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="border border-slate-300 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                      <th className="py-2 px-3 w-12 text-center">หมวด</th>
                      <th className="py-2 px-3">รายการอุปกรณ์</th>
                      <th className="py-2 px-3 font-bold text-blue-900">แบรนด์ (Brand)</th>
                      <th className="py-2 px-3 font-bold text-blue-900">รุ่น / สเปก (Spec)</th>
                      <th className="py-2 px-3 text-center w-14">หน่วย</th>
                      <th className="py-2 px-3 text-right">ค่าวัสดุ/หน่วย</th>
                      <th className="py-2 px-3 text-right font-bold text-orange-600 bg-orange-50/50">
                        ค่าวัสดุ Markup ({globalMatMarkup}%)
                      </th>
                      <th className="py-2 px-3 text-right">ค่าแรง/หน่วย</th>
                      <th className="py-2 px-3 text-right font-bold text-emerald-600 bg-emerald-50/50">
                        ค่าแรง Markup ({globalLaborMarkup}%)
                      </th>
                      <th className="py-2 px-3 text-center w-12">ลบ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredItems.map((item) => {
                      const matMarkupPrice = item.matPrice + (item.matPrice * globalMatMarkup / 100);
                      const laborMarkupPrice = item.laborPrice + (item.laborPrice * globalLaborMarkup / 100);

                      return (
                        <tr key={item.id} className="hover:bg-slate-50 transition">
                          <td className="py-1.5 px-3 text-center font-mono font-bold text-slate-500 text-[10px]">M-{item.catId}</td>
                          <td className="py-1.5 px-3 font-semibold text-slate-800">{item.name}</td>
                          <td className="py-1.5 px-3 font-bold text-blue-800">{item.brand}</td>
                          <td className="py-1.5 px-3 text-slate-700 font-medium">{item.spec}</td>
                          <td className="py-1.5 px-3 text-center text-slate-500 font-medium">{item.unit}</td>
                          
                          <td className="py-1.5 px-3 text-right font-mono font-semibold text-slate-700">
                            {item.matPrice > 0 ? item.matPrice.toLocaleString() : '-'}
                          </td>
                          <td className="py-1.5 px-3 text-right font-mono font-bold text-orange-600 bg-orange-50/30">
                            {matMarkupPrice > 0 ? matMarkupPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                          </td>

                          <td className="py-1.5 px-3 text-right font-mono font-semibold text-slate-700">
                            {item.laborPrice > 0 ? item.laborPrice.toLocaleString() : '-'}
                          </td>
                          <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-600 bg-emerald-50/30">
                            {laborMarkupPrice > 0 ? laborMarkupPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '-'}
                          </td>

                          <td className="py-1.5 px-3 text-center">
                            <button 
                              onClick={() => handleDeleteItem(item)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB TAB 2: AUDIT TRAIL LOG VIEW */}
      {activeSubTab === 'logs' && (
        <div className="erp-card-white p-5 rounded-xl space-y-4 shadow-sm text-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <History className="w-5 h-5 text-blue-900" />
                <span>ประวัติการแก้ไขข้อมูลทั้งหมด (Cost Database Audit Trail Log)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">ติดตามว่า ใครเป็นคนแก้ วันและเวลา ข้อมูลเดิม และ ข้อมูลใหม่</p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              <input 
                type="text"
                placeholder="ค้นหา Log โดยชื่อผู้ใช้ หรือ อุปกรณ์..."
                value={logSearchQuery}
                onChange={(e) => setLogSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3 w-40">วันและเวลา (Timestamp)</th>
                  <th className="py-2.5 px-3 w-44 font-bold text-blue-900">ผู้แก้ไข (User)</th>
                  <th className="py-2.5 px-3 w-32 text-center">ประเภทการกระทำ</th>
                  <th className="py-2.5 px-3">รายการอุปกรณ์ / การตั้งค่า</th>
                  <th className="py-2.5 px-3 text-rose-700 bg-rose-50/50">ข้อมูลเดิม (Old Value)</th>
                  <th className="py-2.5 px-3 text-emerald-700 bg-emerald-50/50">ข้อมูลใหม่ (New Value)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-2.5 px-3 font-mono text-slate-500 font-semibold text-[11px]">{log.timestamp}</td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{log.user}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.action === 'UPDATE_MARKUP' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                        log.action === 'CREATE_ITEM' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{log.itemName}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-600 bg-rose-50/30">{log.oldValue}</td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-700 bg-emerald-50/30">{log.newValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CostDatabaseModule;
