import React, { useState } from 'react';
import { 
  Building2, Calendar, User, Phone, Mail, MapPin, 
  Receipt, Plus, Save, ArrowRight, Upload, Image as ImageIcon, Copy, CheckCircle2, Zap, Lock
} from 'lucide-react';

const InitialProjectForm = ({ projectData, setProjectData, onSaveStep, onNext, userRole = 'admin' }) => {
  const [sitePhoto, setSitePhoto] = useState(null);
  const [showSaveToast, setShowSaveToast] = useState(false);

  // Installation Systems State (Rooftop, Farm, Floating, Carpark, BESS)
  const [systems, setSystems] = useState(projectData.systems || {
    rooftop: { enabled: true, val: projectData.capacityKwp || 100, unit: 'kWp' },
    farm: { enabled: false, val: '', unit: 'kWp' },
    floating: { enabled: false, val: '', unit: 'kWp' },
    carpark: { enabled: false, val: '', unit: 'kWp' },
    bess: { enabled: false, val: '', unit: 'kWh' }
  });

  const handleInputChange = (field, value) => {
    setProjectData({ ...projectData, [field]: value });
  };

  const handleSystemToggle = (sysKey) => {
    const nextState = {
      ...systems,
      [sysKey]: {
        ...systems[sysKey],
        enabled: !systems[sysKey].enabled,
        val: !systems[sysKey].enabled ? (systems[sysKey].val || (sysKey === 'bess' ? 5000 : 100)) : ''
      }
    };
    setSystems(nextState);
    updateTotalCapacityToProject(nextState);
  };

  const handleSystemValChange = (sysKey, valStr) => {
    const numVal = valStr === '' ? '' : parseFloat(valStr) || 0;
    const nextState = {
      ...systems,
      [sysKey]: {
        ...systems[sysKey],
        val: numVal
      }
    };
    setSystems(nextState);
    updateTotalCapacityToProject(nextState);
  };

  const updateTotalCapacityToProject = (sysState) => {
    let solarKwpSum = 0;
    ['rooftop', 'farm', 'floating', 'carpark'].forEach(key => {
      if (sysState[key].enabled && sysState[key].val) {
        solarKwpSum += (parseFloat(sysState[key].val) || 0);
      }
    });

    setProjectData(prev => ({
      ...prev,
      capacityKwp: solarKwpSum > 0 ? solarKwpSum : (sysState.rooftop.val || 0),
      systems: sysState
    }));
  };

  const handleCopySiteToBillingAddress = () => {
    setProjectData({ ...projectData, billingAddress: projectData.location || '' });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSitePhoto(url);
    }
  };

  const handleSave = () => {
    if (onSaveStep) onSaveStep('initial');
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleSaveAndNext = () => {
    handleSave();
    if (onNext) onNext();
  };

  // Calculate Total Capacity Badge Summary (kWp & kWh)
  let totalKwp = 0;
  let totalKwh = 0;
  let activeSystemTypesList = [];

  if (systems.rooftop.enabled && systems.rooftop.val) {
    totalKwp += parseFloat(systems.rooftop.val) || 0;
    activeSystemTypesList.push(`Rooftop ${systems.rooftop.val} kWp`);
  }
  if (systems.farm.enabled && systems.farm.val) {
    totalKwp += parseFloat(systems.farm.val) || 0;
    activeSystemTypesList.push(`Farm ${systems.farm.val} kWp`);
  }
  if (systems.floating.enabled && systems.floating.val) {
    totalKwp += parseFloat(systems.floating.val) || 0;
    activeSystemTypesList.push(`Floating ${systems.floating.val} kWp`);
  }
  if (systems.carpark.enabled && systems.carpark.val) {
    totalKwp += parseFloat(systems.carpark.val) || 0;
    activeSystemTypesList.push(`Carpark ${systems.carpark.val} kWp`);
  }
  if (systems.bess.enabled && systems.bess.val) {
    totalKwh += parseFloat(systems.bess.val) || 0;
    activeSystemTypesList.push(`BESS ${systems.bess.val} kWh`);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative">
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>บันทึกข้อมูล Flow 1: Initial Project Details สำเร็จ!</span>
        </div>
      )}

      {/* 1. Project Details Header Card */}
      <div className="erp-card-white p-5 rounded-lg border border-slate-300 space-y-4 shadow-sm text-xs">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 font-bold text-slate-800 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-700" />
            <span>Project Details (ข้อมูลโครงการและลูกค้า - Flow 1)</span>
          </div>

          <button 
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 1
          </button>
        </div>

        {/* Row 1: Code (Red Circle - Admin Edit Only) & Name */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* 🌟 Red Circle: Project Code (Editable ONLY by Admin) */}
          <div className="md:col-span-4">
            <div className="flex justify-between items-center mb-1">
              <label className="block text-slate-700 font-bold">Project Code (Auto-run)</label>
              {userRole !== 'admin' && (
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-bold border border-amber-300 flex items-center gap-0.5">
                  <Lock className="w-2.5 h-2.5" /> เฉพาะ Admin แก้ไข
                </span>
              )}
            </div>
            <input 
              type="text" 
              readOnly={userRole !== 'admin'}
              disabled={userRole !== 'admin'}
              value={projectData.projectCode || 'BD26-019'}
              onChange={(e) => handleInputChange('projectCode', e.target.value)}
              className={`w-full rounded px-3 py-1.5 font-mono font-bold text-slate-800 focus:outline-none transition ${
                userRole === 'admin'
                  ? 'bg-amber-100/90 border-2 border-amber-400 focus:border-blue-600'
                  : 'bg-amber-100/60 border border-amber-300 cursor-not-allowed opacity-90'
              }`}
            />
          </div>

          <div className="md:col-span-8">
            <label className="block text-slate-700 font-bold mb-1">Project Name</label>
            <input 
              type="text"
              placeholder="e.g. Solar Rooftop Siam Cement"
              value={projectData.projectName || ''}
              onChange={(e) => handleInputChange('projectName', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Row 2: Region, BD Engineer, Investor, Business Type */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-3">
            <label className="block text-slate-700 font-bold mb-1">Region</label>
            <input 
              type="text" 
              readOnly
              value="Auto from Coordinates (ภาคกลาง)"
              className="w-full bg-slate-100 border border-slate-300 rounded px-3 py-1.5 text-slate-600 focus:outline-none"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-slate-700 font-bold mb-1">BD Engineer</label>
            <select
              value={projectData.bdEngineer || ''}
              onChange={(e) => handleInputChange('bdEngineer', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="">-- Select BD Engineer --</option>
              <option value="คุณสมชาย">คุณสมชาย (BD Engineer)</option>
              <option value="คุณวิภา">คุณวิภา (Senior BD)</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-slate-700 font-bold mb-1">Investor</label>
            <select
              value={projectData.investor || 'PTT'}
              onChange={(e) => handleInputChange('investor', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="PTT">PTT</option>
              <option value="GPSC">GPSC</option>
              <option value="OR">OR</option>
              <option value="GC">GC</option>
              <option value="Client">Client (ลูกค้าลงทุนเอง)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <label className="block text-slate-700 font-bold mb-1">Business Type</label>
            <select
              value={projectData.businessType || 'PPA'}
              onChange={(e) => handleInputChange('businessType', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="EPC">EPC</option>
              <option value="PPA">PPA</option>
              <option value="Trading">Trading</option>
              <option value="Service">Service</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Row 3: Client / Contracting Entity */}
        <div>
          <label className="block text-slate-700 font-bold mb-1">Client / Contracting Entity (ชื่อบริษัท/ลูกค้า)</label>
          <input 
            type="text"
            placeholder="Client / Contracting Entity e.g. บริษัท ไทยอุตสาหกรรมพลาสติก จำกัด (มหาชน)"
            value={projectData.clientName || ''}
            onChange={(e) => handleInputChange('clientName', e.target.value)}
            className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-blue-950 focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* 🌟 Black Circle 2: Customer Contact Details Section (White Theme Alignment) */}
        <div className="bg-white border border-slate-300 p-4 rounded-xl space-y-3 shadow-sm">
          <p className="font-bold text-slate-900 text-xs flex items-center gap-1.5 border-b border-slate-200 pb-2">
            <User className="w-4 h-4 text-blue-900" />
            <span>รายละเอียดผู้ติดต่อ และ ข้อมูลสำหรับการวางบิล (Customer & Billing Contact Details)</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-500" /> ชื่อผู้ติดต่อ (Contact Name)
              </label>
              <input 
                type="text"
                placeholder="เช่น คุณวิชัย มั่นคง (ผู้จัดการฝ่ายจัดซื้อ)"
                value={projectData.contactName || ''}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500" /> เบอร์โทรศัพท์ (Phone Number)
              </label>
              <input 
                type="text"
                placeholder="เช่น 02-999-8888, 081-234-5678"
                value={projectData.contactPhone || ''}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> อีเมล (Email Address)
              </label>
              <input 
                type="email"
                placeholder="เช่น contact@client-company.co.th"
                value={projectData.contactEmail || ''}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6">
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> ที่อยู่ติดตั้งโครงการ (Site / Facility Address)
              </label>
              <textarea 
                rows={2}
                placeholder="ระบุที่อยู่สถานที่ติดตั้ง เช่น 88 หมู่ 3 นิคมอุตสาหกรรมบางปู ต.บางปู อ.เมือง จ.สมุทรปราการ 10280"
                value={projectData.location || ''}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:col-span-6">
              <div className="flex justify-between items-center mb-1">
                <label className="block text-slate-700 font-semibold flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5 text-slate-500" /> ที่อยู่สำหรับวางบิล (Billing / Invoicing Address)
                </label>
                <button
                  type="button"
                  onClick={handleCopySiteToBillingAddress}
                  className="text-[11px] text-blue-700 hover:text-blue-900 font-bold flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> ใช้ที่อยู่เดียวกับสถานที่ติดตั้ง
                </button>
              </div>
              <textarea 
                rows={2}
                placeholder="ระบุที่อยู่ตามภพ.20 สำหรับวางบิล เช่น 123 อาคารไทยพลาสติก ชั้น 10 ถ.สุขุมวิท กรุงเทพฯ 10110"
                value={projectData.billingAddress || ''}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-slate-700 font-semibold mb-1 flex items-center gap-1">
                <Receipt className="w-3.5 h-3.5 text-slate-500" /> เลขประจำตัวผู้เสียภาษี (Tax ID / VAT Registration No.)
              </label>
              <input 
                type="text"
                placeholder="เช่น 0105560999999 (สำนักงานใหญ่)"
                value={projectData.taxId || ''}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-mono font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Installation Systems & Capacity (kW) */}
        <div className="space-y-2 pt-2 border-t border-slate-200">
          <div className="flex items-center gap-3 flex-wrap">
            <label className="block text-slate-800 font-bold text-xs">
              Installation Systems & Capacity (kW)
            </label>

            <div className="bg-blue-100/80 border border-blue-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Zap className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>
                ผลรวมกำลังการติดตั้งทั้งหมด: {totalKwp > 0 ? `${totalKwp.toLocaleString()} kWp` : '0 kWp'}
                {totalKwh > 0 && ` / ${totalKwh.toLocaleString()} kWh`}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            {/* Rooftop */}
            <div className={`flex items-center gap-2 border p-2 rounded-lg transition ${
              systems.rooftop.enabled ? 'bg-blue-50/60 border-blue-400' : 'bg-slate-50 border-slate-200 opacity-70'
            }`}>
              <input 
                type="checkbox" 
                checked={systems.rooftop.enabled}
                onChange={() => handleSystemToggle('rooftop')}
                className="w-4 h-4 accent-blue-600 cursor-pointer" 
              />
              <span className="font-semibold text-slate-700">Rooftop</span>
              <input 
                type="number"
                disabled={!systems.rooftop.enabled}
                value={systems.rooftop.enabled ? systems.rooftop.val : ''}
                onChange={(e) => handleSystemValChange('rooftop', e.target.value)}
                placeholder="-"
                className="w-20 bg-white border border-emerald-600 rounded px-2 py-0.5 font-bold font-mono text-center text-slate-800 disabled:bg-slate-100 disabled:border-slate-300"
              />
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded font-mono">kWp</span>
            </div>

            {/* Farm */}
            <div className={`flex items-center gap-2 border p-2 rounded-lg transition ${
              systems.farm.enabled ? 'bg-blue-50/60 border-blue-400' : 'bg-slate-50 border-slate-200 opacity-70'
            }`}>
              <input 
                type="checkbox" 
                checked={systems.farm.enabled}
                onChange={() => handleSystemToggle('farm')}
                className="w-4 h-4 accent-blue-600 cursor-pointer" 
              />
              <span className="font-semibold text-slate-700">Farm</span>
              <input 
                type="number" 
                disabled={!systems.farm.enabled}
                value={systems.farm.enabled ? systems.farm.val : ''}
                onChange={(e) => handleSystemValChange('farm', e.target.value)}
                placeholder="-"
                className="w-20 bg-white border border-emerald-600 rounded px-2 py-0.5 font-bold font-mono text-center text-slate-800 disabled:bg-slate-100 disabled:border-slate-300"
              />
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded font-mono">kWp</span>
            </div>

            {/* Floating */}
            <div className={`flex items-center gap-2 border p-2 rounded-lg transition ${
              systems.floating.enabled ? 'bg-blue-50/60 border-blue-400' : 'bg-slate-50 border-slate-200 opacity-70'
            }`}>
              <input 
                type="checkbox" 
                checked={systems.floating.enabled}
                onChange={() => handleSystemToggle('floating')}
                className="w-4 h-4 accent-blue-600 cursor-pointer" 
              />
              <span className="font-semibold text-slate-700">Floating</span>
              <input 
                type="number" 
                disabled={!systems.floating.enabled}
                value={systems.floating.enabled ? systems.floating.val : ''}
                onChange={(e) => handleSystemValChange('floating', e.target.value)}
                placeholder="-"
                className="w-20 bg-white border border-emerald-600 rounded px-2 py-0.5 font-bold font-mono text-center text-slate-800 disabled:bg-slate-100 disabled:border-slate-300"
              />
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded font-mono">kWp</span>
            </div>

            {/* Carpark */}
            <div className={`flex items-center gap-2 border p-2 rounded-lg transition ${
              systems.carpark.enabled ? 'bg-blue-50/60 border-blue-400' : 'bg-slate-50 border-slate-200 opacity-70'
            }`}>
              <input 
                type="checkbox" 
                checked={systems.carpark.enabled}
                onChange={() => handleSystemToggle('carpark')}
                className="w-4 h-4 accent-blue-600 cursor-pointer" 
              />
              <span className="font-semibold text-slate-700">Carpark</span>
              <input 
                type="number" 
                disabled={!systems.carpark.enabled}
                value={systems.carpark.enabled ? systems.carpark.val : ''}
                onChange={(e) => handleSystemValChange('carpark', e.target.value)}
                placeholder="-"
                className="w-20 bg-white border border-emerald-600 rounded px-2 py-0.5 font-bold font-mono text-center text-slate-800 disabled:bg-slate-100 disabled:border-slate-300"
              />
              <span className="px-2 py-0.5 bg-blue-100 text-blue-800 font-bold rounded font-mono">kWp</span>
            </div>

            {/* BESS */}
            <div className={`flex items-center gap-2 border p-2 rounded-lg transition ${
              systems.bess.enabled ? 'bg-rose-50/60 border-rose-400' : 'bg-slate-50 border-slate-200 opacity-70'
            }`}>
              <input 
                type="checkbox" 
                checked={systems.bess.enabled}
                onChange={() => handleSystemToggle('bess')}
                className="w-4 h-4 accent-rose-600 cursor-pointer" 
              />
              <span className="font-semibold text-slate-700">BESS</span>
              <input 
                type="number" 
                disabled={!systems.bess.enabled}
                value={systems.bess.enabled ? systems.bess.val : ''}
                onChange={(e) => handleSystemValChange('bess', e.target.value)}
                placeholder="-"
                className="w-20 bg-white border border-emerald-600 rounded px-2 py-0.5 font-bold font-mono text-center text-slate-800 disabled:bg-slate-100 disabled:border-slate-300"
              />
              <span className="px-2 py-0.5 bg-rose-100 text-rose-800 font-bold rounded font-mono">kWh</span>
            </div>
          </div>
        </div>

        {/* Statuses & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
          <div>
            <label className="block text-slate-700 font-bold mb-1">Project Deadline (dd/mm/yyyy)</label>
            <input 
              type="date"
              value={projectData.deadline || '2026-10-31'}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-medium text-slate-800 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Development Stage</label>
            <select
              value={projectData.developmentStage || 'Underdevelope'}
              onChange={(e) => handleInputChange('developmentStage', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="Underdevelope">Underdevelope</option>
              <option value="Award">Award</option>
              <option value="Cancle">Cancle</option>
              <option value="Hold">Hold</option>
              <option value="Loss">Loss</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-bold mb-1">Work Status</label>
            <select
              value={projectData.workStatus || 'In Progress'}
              onChange={(e) => handleInputChange('workStatus', e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="Standby">Standby</option>
              <option value="In Progress">In Progress</option>
              <option value="Complete">Complete</option>
              <option value="Cancle">Cancle</option>
            </select>
          </div>
        </div>

        {/* Attachment Photo Section */}
        <div className="pt-2 border-t border-slate-200">
          <label className="block text-slate-800 font-bold mb-2">แนบภาพถ่ายสถานที่ติดตั้ง (Site Photo Attachment)</label>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-full sm:w-64 h-36 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden group">
              {sitePhoto ? (
                <img src={sitePhoto} alt="Site" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-3">
                  <ImageIcon className="w-8 h-8 text-slate-400 mx-auto mb-1" />
                  <p className="text-[11px] text-slate-500 font-medium">คลิกเพื่ออัปโหลดภาพสถานที่จริง (.png, .jpg)</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handlePhotoUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p className="font-semibold text-slate-700">• รูปถ่ายอาคาร/หลังคาโรงงาน สำหรับประเมิน Prelim Design</p>
              <p>• รองรับไฟล์ภาพประเภท JPG, PNG ขนาดไม่เกิน 10MB</p>
              <p>• รูปภาพจะถูกจัดเก็บไว้ในฐานข้อมูลเพื่ออ้างอิงกับทีมสำรวจพื้นที่ (Site Survey)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer with Explicit Save Button */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-300">
        <button 
          type="button"
          onClick={handleSave}
          className="px-5 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
        >
          <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 1
        </button>

        <button 
          type="button"
          onClick={handleSaveAndNext}
          className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow flex items-center gap-1 transition"
        >
          บันทึก & ถัดไป: แนบไฟล์ Prelim Design ➔
        </button>
      </div>
    </div>
  );
};

export default InitialProjectForm;
