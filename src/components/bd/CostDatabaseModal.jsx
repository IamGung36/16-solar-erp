import React, { useState } from 'react';
import { Database, Plus, Search, Trash2, X, Save, ChevronLeft, ChevronRight } from 'lucide-react';

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

const CostDatabaseModal = ({ isOpen, onClose, costDatabase, setCostDatabase }) => {
  const [selectedCatId, setSelectedCatId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [globalMatMarkup, setGlobalMatMarkup] = useState(10);
  const [globalLaborMarkup, setGlobalLaborMarkup] = useState(15);

  const [newItem, setNewItem] = useState({
    name: '',
    brand: '',
    spec: '',
    unit: 'ชุด',
    matPrice: 0,
    laborPrice: 0
  });

  if (!isOpen) return null;

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
      laborPrice: parseFloat(newItem.laborPrice) || 0,
      matMarkupPct: globalMatMarkup,
      laborMarkupPct: globalLaborMarkup
    };

    setCostDatabase([created, ...costDatabase]);
    setNewItem({ name: '', brand: '', spec: '', unit: 'ชุด', matPrice: 0, laborPrice: 0 });
  };

  const handleDeleteItem = (id) => {
    setCostDatabase(costDatabase.filter(item => item.id !== id));
  };

  const filteredItems = costDatabase.filter(item => {
    const matchesCat = selectedCatId === 0 || item.catId === selectedCatId;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.spec.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white border border-slate-300 w-full max-w-6xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-xs">
        {/* Header Bar */}
        <div className="erp-header-blue px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-white text-sm">Cost Database (Master Catalog 11 หมวดหมู่)</h3>
              <p className="text-[11px] text-blue-200">คลังข้อมูลอุปกรณ์ แบรนด์ สเปก และคำนวณราคา Markup</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded text-white hover:bg-blue-800 transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Control Bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2" />
              <input 
                type="text"
                placeholder="ค้นหาอุปกรณ์ แบรนด์ สเปก..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded text-xs focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Global Markup Rates */}
            <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1 rounded border border-blue-200 text-xs">
              <span className="font-semibold text-slate-700">% Markup วัสดุ:</span>
              <input 
                type="number" 
                value={globalMatMarkup} 
                onChange={(e) => setGlobalMatMarkup(parseFloat(e.target.value) || 0)}
                className="w-12 bg-white border border-blue-300 rounded px-1 text-center font-bold text-orange-600 font-mono"
              />
              <span className="font-semibold text-slate-700">% ค่าแรง:</span>
              <input 
                type="number" 
                value={globalLaborMarkup} 
                onChange={(e) => setGlobalLaborMarkup(parseFloat(e.target.value) || 0)}
                className="w-12 bg-white border border-blue-300 rounded px-1 text-center font-bold text-emerald-600 font-mono"
              />
            </div>
          </div>

          <span className="text-slate-500 font-semibold text-xs">
            รวม {costDatabase.length} รายการ
          </span>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Category Selector (Collapsible) */}
          <div className={`transition-all duration-300 bg-slate-50 border-r border-slate-300 p-2 overflow-y-auto space-y-1 shrink-0 ${
            isSidebarCollapsed ? 'w-12 text-center' : 'w-64'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1">
              {!isSidebarCollapsed && (
                <span className="font-bold text-slate-700 text-[11px]">เลือกหมวดหมู่ข้อมูล</span>
              )}
              <button 
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-1 rounded hover:bg-slate-200 text-slate-600 mx-auto"
              >
                {isSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              </button>
            </div>

            {!isSidebarCollapsed ? (
              <>
                <button
                  onClick={() => setSelectedCatId(0)}
                  className={`w-full text-left px-2.5 py-1.5 rounded font-bold transition text-xs flex justify-between items-center ${
                    selectedCatId === 0 ? 'bg-blue-900 text-white' : 'text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <span>🌐 ทุกหมวดหมู่ (All)</span>
                  <span className="text-[10px] font-mono bg-blue-950 text-amber-400 px-1 rounded">{costDatabase.length}</span>
                </button>

                {categoryNames.map((catName, idx) => {
                  const catId = idx + 1;
                  const itemCount = costDatabase.filter(c => c.catId === catId).length;
                  return (
                    <button
                      key={catId}
                      onClick={() => setSelectedCatId(catId)}
                      className={`w-full text-left px-2.5 py-1.5 rounded font-semibold text-[11px] transition flex justify-between items-center ${
                        selectedCatId === catId ? 'bg-blue-900 text-white font-bold' : 'text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span className="truncate">{catName}</span>
                      <span className={`px-1.5 py-0.2 text-[9px] rounded font-bold ${
                        selectedCatId === catId ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {itemCount}
                      </span>
                    </button>
                  );
                })}
              </>
            ) : (
              <div className="space-y-2 pt-1">
                <button 
                  onClick={() => setSelectedCatId(0)}
                  className={`w-7 h-7 rounded font-bold text-[10px] flex items-center justify-center mx-auto ${
                    selectedCatId === 0 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  ALL
                </button>
                {categoryNames.map((_, idx) => (
                  <button
                    key={idx + 1}
                    onClick={() => setSelectedCatId(idx + 1)}
                    className={`w-7 h-7 rounded font-bold text-[10px] flex items-center justify-center mx-auto ${
                      selectedCatId === idx + 1 ? 'bg-blue-900 text-white' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Main Table & Add Form */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {/* Add Form */}
            <form onSubmit={handleAddItem} className="p-3 bg-blue-50/60 rounded-lg border border-blue-200 space-y-2">
              <p className="font-bold text-blue-900 text-xs flex items-center gap-1">
                <Plus className="w-4 h-4" /> + เพิ่มรายการอุปกรณ์มาตรฐานใหม่ เข้า Cost Database (หมวด {selectedCatId || 1})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                <input 
                  type="text" 
                  required
                  placeholder="ชื่อรายการ *"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
                <input 
                  type="text" 
                  placeholder="แบรนด์ *"
                  value={newItem.brand}
                  onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
                <input 
                  type="text" 
                  placeholder="รุ่น / สเปก *"
                  value={newItem.spec}
                  onChange={(e) => setNewItem({ ...newItem, spec: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
                <input 
                  type="text" 
                  placeholder="หน่วย *"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs"
                />
                <input 
                  type="number" 
                  placeholder="ราคาวัสดุ/หน่วย"
                  value={newItem.matPrice || ''}
                  onChange={(e) => setNewItem({ ...newItem, matPrice: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-right font-mono"
                />
                <input 
                  type="number" 
                  placeholder="ราคาค่าแรง/หน่วย"
                  value={newItem.laborPrice || ''}
                  onChange={(e) => setNewItem({ ...newItem, laborPrice: e.target.value })}
                  className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-right font-mono"
                />
              </div>

              <div className="flex justify-end pt-1">
                <button 
                  type="submit"
                  className="px-4 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs shadow flex items-center gap-1"
                >
                  <Save className="w-3.5 h-3.5" /> บันทึกเข้า Catalog
                </button>
              </div>
            </form>

            {/* Table */}
            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[10px]">
                    <th className="py-2 px-3 w-10">หมวด</th>
                    <th className="py-2 px-3">รายการอุปกรณ์</th>
                    <th className="py-2 px-3 font-bold text-blue-900">แบรนด์ (Brand)</th>
                    <th className="py-2 px-3 font-bold text-blue-900">รุ่น / สเปก (Spec)</th>
                    <th className="py-2 px-3 text-center w-12">หน่วย</th>
                    <th className="py-2 px-3 text-right">ค่าวัสดุ/หน่วย</th>
                    <th className="py-2 px-3 text-right font-bold text-orange-600 bg-orange-50/50">ค่าวัสดุ Markup</th>
                    <th className="py-2 px-3 text-right">ค่าแรง/หน่วย</th>
                    <th className="py-2 px-3 text-right font-bold text-emerald-600 bg-emerald-50/50">ค่าแรง Markup</th>
                    <th className="py-2 px-3 text-center w-10">ลบ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredItems.map((item) => {
                    const matMarkupRate = item.matMarkupPct !== undefined ? item.matMarkupPct : globalMatMarkup;
                    const laborMarkupRate = item.laborMarkupPct !== undefined ? item.laborMarkupPct : globalLaborMarkup;

                    const matMarkupPrice = item.matPrice + (item.matPrice * matMarkupRate / 100);
                    const laborMarkupPrice = item.laborPrice + (item.laborPrice * laborMarkupRate / 100);

                    return (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-mono font-bold text-slate-500 text-[10px]">M-{item.catId}</td>
                        <td className="py-1.5 px-3 font-semibold text-slate-800">{item.name}</td>
                        <td className="py-1.5 px-3 font-bold text-blue-800">{item.brand}</td>
                        <td className="py-1.5 px-3 text-slate-700">{item.spec}</td>
                        <td className="py-1.5 px-3 text-center text-slate-500">{item.unit}</td>
                        
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
                            onClick={() => handleDeleteItem(item.id)}
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

        {/* Footer */}
        <div className="p-3 bg-slate-100 border-t border-slate-300 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-700 hover:bg-slate-800 text-white font-bold rounded text-xs"
          >
            ปิดหน้าต่าง Cost Database
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostDatabaseModal;
