import React, { useState } from 'react';
import { 
  FileSpreadsheet, PlusCircle, Database, Download, Calculator, 
  ChevronDown, ChevronRight, BarChart2, Check, RefreshCw, Save, CheckCircle2
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import CostDatabaseModal from './CostDatabaseModal';

const categoryColors = [
  '#2563eb', // Cat 1: Blue
  '#059669', // Cat 2: Emerald
  '#d97706', // Cat 3: Amber/Orange
  '#dc2626', // Cat 4: Red
  '#7c3aed', // Cat 5: Purple
  '#0891b2', // Cat 6: Cyan
  '#b45309', // Cat 7: Brown/Amber
  '#65a30d', // Cat 8: Lime
  '#0d9488', // Cat 9: Teal
  '#c026d3', // Cat 10: Fuchsia
  '#4f46e5', // Cat 11: Indigo
];

const initialBoqCategories = [
  {
    id: 1,
    name: 'หมวด 1: Main Equipment (อุปกรณ์หลัก)',
    items: [
      { id: '1.1', name: 'PV module', brand: 'JA Solar', spec: 'JAM66BV, 725Wp n-type', unit: 'แผง', qty: 138 },
      { id: '1.2', name: 'Inverter', brand: 'Huawei', spec: 'SUN2000-100KTL-M2', unit: 'เครื่อง', qty: 1 },
      { id: '1.3', name: 'Inverter', brand: 'Sungrow', spec: 'SG125CX-P2', unit: 'เครื่อง', qty: 0 },
      { id: '1.4', name: 'Optimizer', brand: 'Huawei', spec: 'MERC-1300W-P', unit: 'ตัว', qty: 0 },
      { id: '1.5', name: 'Data logger & Acc.', brand: 'Huawei', spec: 'SmartLogger 3000A', unit: 'ชุด', qty: 1 },
    ]
  },
  {
    id: 2,
    name: 'หมวด 2: Electrical Part (งานระบบไฟฟ้า)',
    items: [
      { id: '2.1', name: 'DC part (สาย, ท่อ, บ่อต่อ)', brand: 'Link / Arrow', spec: 'PV1-F 6 sq.mm / EMT', unit: 'เหมา', qty: 1 },
      { id: '2.2', name: 'LV part (MDB, สาย AC)', brand: 'ประกอบในประเทศ', spec: 'ตู้ IP65 / เบรกเกอร์ ABB', unit: 'เหมา', qty: 1 },
    ]
  },
  {
    id: 3,
    name: 'หมวด 3: Metering, Protection & Comm.',
    items: [
      { id: '3.1', name: 'Metering', brand: 'Janitza', spec: 'Class 0.5s', unit: 'ชุด', qty: 1 },
      { id: '3.2', name: 'Zero export & PQM', brand: 'Huawei', spec: 'Smart Power Sensor', unit: 'ชุด', qty: 1 },
      { id: '3.3', name: 'Relay protection', brand: 'Microelettrica', spec: 'ตามมาตรฐาน กฟภ.', unit: 'ชุด', qty: 1 },
      { id: '3.4', name: 'Grid code', brand: 'PEA/MEA Approved', spec: 'ทดสอบคุณภาพไฟฟ้า', unit: 'งาน', qty: 1 },
      { id: '3.5', name: 'Communication / SCADA', brand: 'Cisco / Moxa', spec: 'Fiber Optic / LAN', unit: 'งาน', qty: 1 },
    ]
  },
  {
    id: 4,
    name: 'หมวด 4: Civil Part (งานโยธาและโครงสร้าง)',
    items: [
      { id: '4.1', name: 'Aluminum Mounting Structure', brand: 'Clenergy', spec: 'Rail, Clamp, L-feet', unit: 'kWp', qty: 100 },
    ]
  },
  {
    id: 5,
    name: 'หมวด 5: Facility (สิ่งอำนวยความสะดวก)',
    items: [
      { id: '5.1', name: 'สำนักงานสนาม / น้ำไฟชั่วคราว', brand: 'Local Container', spec: 'ตู้คอนเทนเนอร์ 2 เดือน', unit: 'เดือน', qty: 2 },
      { id: '5.2', name: 'อุปกรณ์ Safety PPE', brand: 'Pangolin', spec: 'หมวก, เข็มขัด, รองเท้า', unit: 'ชุด', qty: 10 },
    ]
  },
  {
    id: 6,
    name: 'หมวด 6: Mechanical (งานเครื่องกล)',
    items: [
      { id: '6.1', name: 'Water cleaning system', brand: 'Mitsubishi', spec: 'ปั๊มน้ำและระบบท่อสปริงเกลอร์', unit: 'ระบบ', qty: 1 },
    ]
  },
  {
    id: 7,
    name: 'หมวด 7: Test and Commissioning',
    items: [
      { id: '7.1', name: 'ค่าทำ Commissioning', brand: 'Fluke / Megger', spec: 'Insulation, Ground Test', unit: 'งาน', qty: 1 },
    ]
  },
  {
    id: 8,
    name: 'หมวด 8: Engineering',
    items: [
      { id: '8.1', name: 'ค่าออกแบบและเซ็นรับรองแบบ (คต.)', brand: 'สามัญวิศวกร', spec: 'สามัญวิศวกรไฟฟ้า/โยธา', unit: 'งาน', qty: 1 },
    ]
  },
  {
    id: 9,
    name: 'หมวด 9: Project Management',
    items: [
      { id: '9.1', name: 'ค่าบริหารโครงการ (PM, Site Eng, จป.)', brand: 'PMO Team', spec: 'ระยะเวลา 2 เดือน', unit: 'เดือน', qty: 2 },
    ]
  },
  {
    id: 10,
    name: 'หมวด 10: Permit (ค่าธรรมเนียมขออนุญาต)',
    items: [
      { id: '10.1', name: 'ดำเนินการขออนุญาต (อ.1, รง.4, ERC)', brand: 'Government Fee', spec: 'รวมค่าธรรมเนียมภาครัฐ', unit: 'รายการ', qty: 1 },
      { id: '10.2', name: 'ค่าเชื่อมต่อการไฟฟ้า (PEA/MEA)', brand: 'PEA/MEA Utility', spec: 'รวมค่าตรวจพิจารณาแบบ', unit: 'รายการ', qty: 1 },
    ]
  },
  {
    id: 11,
    name: 'หมวด 11: Other (ค่าใช้จ่ายอื่นๆ)',
    items: [
      { id: '11.1', name: 'ค่าขนส่ง (Transportation / Crane)', brand: 'Logistics Express', spec: 'รถเฮี๊ยบยกของขึ้นหลังคา', unit: 'เที่ยว', qty: 1 },
      { id: '11.2', name: 'ค่า Bank guarantee / Bond EPC', brand: 'KBank', spec: '2 Years Performance Bond', unit: 'งาน', qty: 1 },
      { id: '11.4', name: 'ค่า Insurance (CAR / TPL)', brand: 'ทิพยประกันภัย', spec: 'วงเงินคุ้มครอง 15 ล้าน', unit: 'งาน', qty: 1 },
      { id: '11.5', name: 'ค่า Contingency (งบสำรองฉุกเฉิน)', brand: 'Project Reserve', spec: '5% ของโครงการ', unit: 'งาน', qty: 1 },
    ]
  }
];

const BoqCostingTable = ({ 
  projectSizeKwp = 100, 
  onNext, 
  onPrev,
  costDatabase = [],
  setCostDatabase,
  globalMatMarkup = 10,
  globalLaborMarkup = 15,
  onOpenModule99,
  onSaveStep
}) => {
  const [categories, setCategories] = useState(initialBoqCategories);
  const [collapsed, setCollapsed] = useState({});
  const [isAllCollapsed, setIsAllCollapsed] = useState(false);
  const [isCostDbModalOpen, setIsCostDbModalOpen] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleToggleCollapseExpandAll = () => {
    const nextState = !isAllCollapsed;
    const newCollapsedMap = {};
    categories.forEach(c => {
      newCollapsedMap[c.id] = nextState;
    });
    setCollapsed(newCollapsedMap);
    setIsAllCollapsed(nextState);
  };

  const toggleCategory = (catId) => {
    setCollapsed({ ...collapsed, [catId]: !collapsed[catId] });
  };

  const handleItemQtyChange = (catId, itemId, qtyVal) => {
    const numVal = parseFloat(qtyVal) || 0;
    setCategories(categories.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, qty: numVal } : item)
      };
    }));
  };

  const handleBrandSelect = (catId, itemId, brandVal) => {
    setCategories(categories.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, brand: brandVal } : item)
      };
    }));
  };

  const handleSpecSelect = (catId, itemId, specVal) => {
    setCategories(categories.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => item.id === itemId ? { ...item, spec: specVal } : item)
      };
    }));
  };

  const handleAddItem = (catId) => {
    const itemName = prompt('ระบุชื่อรายการวัสดุ/งานจ้างย่อยใหม่:');
    if (!itemName) return;
    setCategories(categories.map(cat => {
      if (cat.id !== catId) return cat;
      const newSubId = `${catId}.${cat.items.length + 1}`;
      return {
        ...cat,
        items: [
          ...cat.items,
          { id: newSubId, name: itemName, brand: '-', spec: 'มาตรฐาน', unit: 'ชุด', qty: 1 }
        ]
      };
    }));
  };

  const handleSave = () => {
    if (onSaveStep) onSaveStep('boq');
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleSaveAndNext = () => {
    handleSave();
    if (onNext) onNext();
  };

  const getCatalogItemPrices = (catId, brand, spec) => {
    const catalogMatch = costDatabase.find(c => c.catId === catId && c.spec === spec) ||
                         costDatabase.find(c => c.catId === catId && c.brand === brand) ||
                         costDatabase.find(c => c.catId === catId);

    const baseMatPrice = catalogMatch ? catalogMatch.matPrice : 0;
    const baseLaborPrice = catalogMatch ? catalogMatch.laborPrice : 0;
    const unit = catalogMatch ? catalogMatch.unit : 'ชุด';

    const matMarkupPrice = baseMatPrice * (1 + globalMatMarkup / 100);
    const laborMarkupPrice = baseLaborPrice * (1 + globalLaborMarkup / 100);

    return {
      unit,
      matMarkupPrice,
      laborMarkupPrice,
      baseMatPrice,
      baseLaborPrice
    };
  };

  let totalMaterialSum = 0;
  let totalLaborSum = 0;

  const categoryTotals = categories.map((cat, idx) => {
    let catMat = 0;
    let catLabor = 0;

    cat.items.forEach(item => {
      const prices = getCatalogItemPrices(cat.id, item.brand, item.spec);
      catMat += (item.qty * prices.matMarkupPrice);
      catLabor += (item.qty * prices.laborMarkupPrice);
    });

    const catTotal = catMat + catLabor;
    totalMaterialSum += catMat;
    totalLaborSum += catLabor;

    return {
      id: cat.id,
      name: cat.name,
      shortName: `หมวด ${cat.id}`,
      total: catTotal,
      mat: catMat,
      labor: catLabor,
      color: categoryColors[idx % categoryColors.length]
    };
  });

  const netCostTotal = totalMaterialSum + totalLaborSum;
  const totalWatts = (projectSizeKwp * 1000) || 1;
  const avgCostPerWp = netCostTotal / totalWatts;

  const chartData = categoryTotals.map(c => ({
    name: c.shortName,
    fullName: c.name,
    amount: c.total,
    costPerWatt: (c.total / totalWatts).toFixed(2),
    color: c.color
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>บันทึกข้อมูล Flow 3: BOQ Costing (11 หมวด) สำเร็จ!</span>
        </div>
      )}

      {/* Top Header Card */}
      <div className="erp-card-white p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
            <FileSpreadsheet className="w-5 h-5 text-blue-700" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-800">BOQ Costing (Flow 3)</h2>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded border border-emerald-300 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-emerald-600 animate-spin" /> Real-time DB Sync
              </span>
            </div>
            <p className="text-xs text-slate-500">
              ราคาต่อหน่วยใน BOQ ดึงจาก Cost DB (Markup วัสดุ {globalMatMarkup}% / ค่าแรง {globalLaborMarkup}%) เรียลไทม์
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button 
            type="button"
            onClick={handleSave}
            className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 shadow"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 3
          </button>

          <button 
            onClick={handleToggleCollapseExpandAll}
            className="px-3 py-1.5 rounded border border-slate-300 hover:bg-slate-100 font-bold text-slate-700 flex items-center gap-1 shadow-sm transition"
          >
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isAllCollapsed ? 'rotate-180' : ''}`} />
            <span>{isAllCollapsed ? 'ขยายทั้งหมด' : 'ย่อ-ขยาย'}</span>
          </button>

          <button 
            onClick={() => onOpenModule99 ? onOpenModule99() : setIsCostDbModalOpen(true)}
            className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1 shadow"
          >
            <Database className="w-3.5 h-3.5 text-amber-400" /> Cost DB (99)
          </button>
        </div>
      </div>

      {/* BOQ Table Container */}
      <div className="erp-card-white rounded-lg overflow-hidden border border-slate-300 shadow-sm text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1080px]">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-bold uppercase text-[11px]">
                <th className="py-2.5 px-3 w-12 text-center">ID</th>
                <th className="py-2.5 px-3 min-w-[170px]">รายการ / หมวดหมู่</th>
                <th className="py-2.5 px-3 w-36 font-bold text-blue-900">แบรนด์ (Cost DB)</th>
                <th className="py-2.5 px-3 w-48 font-bold text-blue-900">รุ่น / สเปก (Cost DB)</th>
                <th className="py-2.5 px-3 w-14 text-center">หน่วย</th>
                <th className="py-2.5 px-3 w-20 text-center">ระบุปริมาณ</th>
                <th className="py-2.5 px-3 w-32 text-right text-orange-700">วัสดุ+Markup/หน่วย</th>
                <th className="py-2.5 px-3 w-32 text-right font-semibold text-orange-600 bg-orange-50/50">รวมวัสดุ Markup</th>
                <th className="py-2.5 px-3 w-32 text-right text-emerald-700">ค่าแรง+Markup/หน่วย</th>
                <th className="py-2.5 px-3 w-32 text-right font-semibold text-emerald-600 bg-emerald-50/50">รวมค่าแรง Markup</th>
                <th className="py-2.5 px-3 w-36 text-right font-bold text-blue-900 bg-blue-50/30">รวมเป็นเงินเสนอราคา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {categories.map((cat, catIdx) => {
                const isCatCollapsed = collapsed[cat.id];
                const catTotalInfo = categoryTotals.find(c => c.id === cat.id);

                const catDbItems = costDatabase.filter(c => c.catId === cat.id);
                const categoryBrands = Array.from(new Set(catDbItems.map(c => c.brand).filter(Boolean)));

                return (
                  <React.Fragment key={cat.id}>
                    <tr className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-800 text-xs">
                      <td colSpan={7} className="py-2 px-3">
                        <button 
                          onClick={() => toggleCategory(cat.id)}
                          className="flex items-center gap-1.5 hover:text-blue-700 transition"
                        >
                          <span 
                            className="w-2.5 h-2.5 rounded-full inline-block" 
                            style={{ backgroundColor: categoryColors[catIdx % categoryColors.length] }}
                          ></span>
                          {isCatCollapsed ? <ChevronRight className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                          <span>{cat.name}</span>
                        </button>
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-orange-600 bg-orange-50/50">
                        {catTotalInfo.mat > 0 ? catTotalInfo.mat.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                      </td>
                      <td className="py-2 px-3"></td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-emerald-600 bg-emerald-50/50">
                        {catTotalInfo.labor > 0 ? catTotalInfo.labor.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                      </td>
                      <td className="py-2 px-3 text-right font-mono font-bold text-blue-950 bg-blue-50/50">
                        {catTotalInfo.total > 0 ? catTotalInfo.total.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                      </td>
                    </tr>

                    {!isCatCollapsed && (
                      <>
                        {cat.items.map((item) => {
                          const prices = getCatalogItemPrices(cat.id, item.brand, item.spec);

                          const itemMatTotal = item.qty * prices.matMarkupPrice;
                          const itemLaborTotal = item.qty * prices.laborMarkupPrice;
                          const itemGrandTotal = itemMatTotal + itemLaborTotal;

                          const brandSpecs = catDbItems
                            .filter(c => item.brand === '-' || c.brand.toLowerCase() === item.brand.toLowerCase())
                            .map(c => c.spec);

                          return (
                            <tr key={item.id} className="hover:bg-blue-50/40 transition">
                              <td className="py-1.5 px-3 text-center text-slate-400 font-mono">{item.id}</td>
                              <td className="py-1.5 px-3 font-medium text-slate-800">{item.name}</td>
                              
                              <td className="py-1.5 px-2">
                                <select
                                  value={item.brand}
                                  onChange={(e) => handleBrandSelect(cat.id, item.id, e.target.value)}
                                  className="w-full bg-white border border-blue-300 rounded px-1.5 py-0.5 text-xs text-blue-900 font-semibold focus:border-blue-500 focus:outline-none"
                                >
                                  {categoryBrands.map((b, bIdx) => (
                                    <option key={bIdx} value={b}>{b}</option>
                                  ))}
                                  {!categoryBrands.includes(item.brand) && (
                                    <option value={item.brand}>{item.brand}</option>
                                  )}
                                </select>
                              </td>

                              <td className="py-1.5 px-2">
                                <select
                                  value={item.spec}
                                  onChange={(e) => handleSpecSelect(cat.id, item.id, e.target.value)}
                                  className="w-full bg-white border border-blue-300 rounded px-1.5 py-0.5 text-xs text-slate-800 font-medium focus:border-blue-500 focus:outline-none"
                                >
                                  {brandSpecs.map((s, sIdx) => (
                                    <option key={sIdx} value={s}>{s}</option>
                                  ))}
                                  {!brandSpecs.includes(item.spec) && (
                                    <option value={item.spec}>{item.spec}</option>
                                  )}
                                </select>
                              </td>

                              <td className="py-1.5 px-3 text-center text-slate-600 font-semibold">{prices.unit}</td>
                              <td className="py-1.5 px-3 text-center">
                                <input 
                                  type="number"
                                  value={item.qty}
                                  onChange={(e) => handleItemQtyChange(cat.id, item.id, e.target.value)}
                                  className="w-16 bg-white border border-slate-300 rounded px-1.5 py-0.5 text-center font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
                                />
                              </td>

                              <td className="py-1.5 px-3 text-right font-mono font-bold text-orange-700 bg-orange-50/20">
                                {prices.matMarkupPrice > 0 ? prices.matMarkupPrice.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                              </td>
                              <td className="py-1.5 px-3 text-right font-mono font-bold text-orange-600 bg-orange-50/40">
                                {itemMatTotal > 0 ? itemMatTotal.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                              </td>

                              <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-700 bg-emerald-50/20">
                                {prices.laborMarkupPrice > 0 ? prices.laborMarkupPrice.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                              </td>
                              <td className="py-1.5 px-3 text-right font-mono font-bold text-emerald-600 bg-emerald-50/40">
                                {itemLaborTotal > 0 ? itemLaborTotal.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                              </td>

                              <td className="py-1.5 px-3 text-right font-mono font-extrabold text-blue-950 bg-blue-50/20">
                                {itemGrandTotal > 0 ? itemGrandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 }) : '-'}
                              </td>
                            </tr>
                          );
                        })}

                        <tr className="bg-slate-50/50">
                          <td colSpan={11} className="py-1.5 px-8">
                            <button 
                              onClick={() => handleAddItem(cat.id)}
                              className="text-blue-600 hover:text-blue-800 font-bold text-xs flex items-center gap-1"
                            >
                              <PlusCircle className="w-3.5 h-3.5" /> เพิ่มรายการย่อย (Add Item)
                            </button>
                          </td>
                        </tr>
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Summary Bar */}
        <div className="bg-slate-900 text-white p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-700">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="font-bold text-slate-300">Project Size: </span>
            <span className="font-mono font-extrabold text-amber-400 text-sm">{projectSizeKwp} kWp</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">AVG. COST / Wp</span>
              <span className="font-bold text-white text-sm">{avgCostPerWp.toFixed(3)} ฿/Wp</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px]">TOTAL MATERIAL (MARKUP)</span>
              <span className="font-bold text-orange-400 text-sm">{totalMaterialSum.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿</span>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px]">TOTAL LABOR (MARKUP)</span>
              <span className="font-bold text-emerald-400 text-sm">{totalLaborSum.toLocaleString(undefined, { maximumFractionDigits: 0 })} ฿</span>
            </div>

            <div className="bg-[#0b2b4e] border border-blue-400 px-4 py-2 rounded-lg text-right shadow-lg">
              <span className="text-blue-200 block text-[10px] uppercase font-bold tracking-wider">NET COST TOTAL (OFFER)</span>
              <span className="font-extrabold text-white text-lg">฿ {netCostTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cost Database Modal Window */}
      <CostDatabaseModal 
        isOpen={isCostDbModalOpen}
        onClose={() => setIsCostDbModalOpen(false)}
        costDatabase={costDatabase}
        setCostDatabase={setCostDatabase}
      />

      {/* Navigation Bar with Explicit Save Button */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-300">
        <button 
          onClick={onPrev}
          className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
        >
          ← ย้อนกลับไป Prelim Design
        </button>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleSave}
            className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 3
          </button>

          <button 
            type="button"
            onClick={handleSaveAndNext}
            className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow transition flex items-center gap-1"
          >
            บันทึก & ถัดไป: สร้างใบปะหน้าเสนอราคา ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoqCostingTable;
