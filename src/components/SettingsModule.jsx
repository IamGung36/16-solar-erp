import React, { useState } from 'react';
import { 
  UserPlus, Calendar, Trash2, Plus, Settings, 
  ShieldCheck, CheckCircle2, User, Sparkles, UserCheck, Shield, Table, Edit3, Briefcase
} from 'lucide-react';

const moduleColumns = [
  { id: 'bd', name: '1. BD' },
  { id: 'pm', name: '2. PM' },
  { id: 'procurement', name: '3. จัดซื้อ' },
  { id: 'control', name: '4. Control' },
  { id: 'finance', name: '5. การเงิน' },
  { id: 'accounting', name: '6. บัญชี' },
  { id: 'om', name: '7. O&M' },
  { id: 'partner', name: '8. คู่ค้า' },
  { id: 'costdb', name: '99. Cost DB' },
];

const initialPositions = [
  'System Admin',
  'Senior BD',
  'BD Engineer',
  'Project Manager (PM)',
  'Procurement Officer',
  'Finance & Accounting',
  'O&M Engineer',
  'Viewer'
];

const initialMembers = [
  { 
    id: 'm-1', 
    name: 'admin', 
    position: 'System Admin',
    permissions: { bd: 'Editor', pm: 'Editor', procurement: 'Editor', control: 'Editor', finance: 'Editor', accounting: 'Editor', om: 'Editor', partner: 'Editor', costdb: 'Editor' } 
  },
  { 
    id: 'm-2', 
    name: 'Gung', 
    position: 'BD Engineer',
    permissions: { bd: 'Editor', pm: 'Viewer', procurement: 'Viewer', control: 'Viewer', finance: 'Viewer', accounting: 'Viewer', om: 'Viewer', partner: 'Viewer', costdb: 'Viewer' } 
  },
  { 
    id: 'm-3', 
    name: 'Hone', 
    position: 'BD Engineer',
    permissions: { bd: 'Editor', pm: 'Viewer', procurement: 'Viewer', control: 'Viewer', finance: 'Viewer', accounting: 'Viewer', om: 'Viewer', partner: 'Viewer', costdb: 'Viewer' } 
  },
  { 
    id: 'm-4', 
    name: 'Golf', 
    position: 'BD Engineer',
    permissions: { bd: 'Editor', pm: 'Viewer', procurement: 'Viewer', control: 'Viewer', finance: 'Viewer', accounting: 'Viewer', om: 'Viewer', partner: 'Viewer', costdb: 'Viewer' } 
  },
  { 
    id: 'm-5', 
    name: 'คุณสมชาย', 
    position: 'Project Manager (PM)',
    permissions: { bd: 'Viewer', pm: 'Editor', procurement: 'Viewer', control: 'Editor', finance: 'Viewer', accounting: 'Viewer', om: 'Editor', partner: 'Viewer', costdb: 'Viewer' } 
  },
];

const initialHolidays = [
  { id: 'h-1', date: '01/01/2026', label: 'วันปีใหม่' },
  { id: 'h-2', date: '03/03/2026', label: 'วันมาฆบูชา' },
  { id: 'h-3', date: '06/04/2026', label: 'วันจักรี' },
  { id: 'h-4', date: '13/04/2026', label: 'วันสงกรานต์' },
  { id: 'h-5', date: '14/04/2026', label: 'วันสงกรานต์' },
  { id: 'h-6', date: '15/04/2026', label: 'วันสงกรานต์' },
];

const SettingsModule = ({ members = initialMembers, setMembers, holidays = initialHolidays, setHolidays }) => {
  const [memberList, setMemberList] = useState(members);
  const [holidayList, setHolidayList] = useState(holidays);
  const [positionOptions, setPositionOptions] = useState(initialPositions);

  // New Member Form
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPosition, setNewMemberPosition] = useState(initialPositions[2]);

  // Manage Position Options Modal
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [newPosInput, setNewPosInput] = useState('');

  // New Holiday Form
  const [newHolidayDate, setNewHolidayDate] = useState('');
  const [newHolidayLabel, setNewHolidayLabel] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const defaultPerms = {};
    moduleColumns.forEach(m => defaultPerms[m.id] = 'Viewer');

    const created = {
      id: `m-${Date.now()}`,
      name: newMemberName.trim(),
      position: newMemberPosition,
      permissions: defaultPerms
    };

    const updated = [...memberList, created];
    setMemberList(updated);
    if (setMembers) setMembers(updated);
    setNewMemberName('');

    triggerToast('เพิ่มสมาชิกใหม่สำเร็จ!');
  };

  const handleMemberPositionChange = (memberId, newPos) => {
    const updated = memberList.map(m => m.id === memberId ? { ...m, position: newPos } : m);
    setMemberList(updated);
    if (setMembers) setMembers(updated);
    triggerToast('อัปเดตตำแหน่งสมาชิกสำเร็จ!');
  };

  const handleModulePermissionChange = (memberId, moduleId, newRole) => {
    const updated = memberList.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          permissions: {
            ...(m.permissions || {}),
            [moduleId]: newRole
          }
        };
      }
      return m;
    });

    setMemberList(updated);
    if (setMembers) setMembers(updated);
    triggerToast('อัปเดตสิทธิ์การใช้งานสำเร็จ!');
  };

  const handleAddPositionOption = (e) => {
    e.preventDefault();
    if (!newPosInput.trim()) return;
    if (positionOptions.includes(newPosInput.trim())) return;

    const updated = [...positionOptions, newPosInput.trim()];
    setPositionOptions(updated);
    setNewPosInput('');
    triggerToast('เพิ่มตัวเลือกตำแหน่งใหม่ใน Dropdown สำเร็จ!');
  };

  const handleDeletePositionOption = (posToDelete) => {
    if (positionOptions.length <= 1) return;
    const updated = positionOptions.filter(p => p !== posToDelete);
    setPositionOptions(updated);
    triggerToast('ลบตัวเลือกตำแหน่งสำเร็จ!');
  };

  const handleDeleteMember = (id) => {
    const updated = memberList.filter(m => m.id !== id);
    setMemberList(updated);
    if (setMembers) setMembers(updated);
  };

  const handleAddHoliday = (e) => {
    e.preventDefault();
    if (!newHolidayDate || !newHolidayLabel.trim()) return;

    const parts = newHolidayDate.split('-');
    const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : newHolidayDate;

    const created = {
      id: `h-${Date.now()}`,
      date: formattedDate,
      label: newHolidayLabel.trim()
    };

    const updated = [...holidayList, created];
    setHolidayList(updated);
    if (setHolidays) setHolidays(updated);
    setNewHolidayDate('');
    setNewHolidayLabel('');

    triggerToast('เพิ่มวันหยุดบริษัทสำเร็จ!');
  };

  const handleDeleteHoliday = (id) => {
    const updated = holidayList.filter(h => h.id !== id);
    setHolidayList(updated);
    if (setHolidays) setHolidays(updated);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative text-xs">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Header - White Theme */}
      <div className="erp-card-white p-5 rounded-xl border border-slate-300 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              System Settings
            </span>
            <span className="text-xs text-slate-500 font-semibold">บริหารจัดการสมาชิก ตำแหน่ง สิทธิ์การใช้งานตามโมดูล และวันหยุดบริษัท</span>
          </div>
          <h2 className="text-lg font-bold text-slate-800 mt-1">
            การตั้งค่าระบบ (System Settings & Module Permission Matrix)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Admin สามารถเลือกตำแหน่ง (Position) จาก Dropdown List และกำหนดสิทธิ์แยกแต่ละโมดูล (Viewer / Editor) ให้กับบุคลากรในทีม
          </p>
        </div>

        <button 
          onClick={() => setShowPositionModal(true)}
          className="px-3.5 py-2 bg-[#0f4c81] hover:bg-blue-900 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow"
        >
          <Briefcase className="w-4 h-4 text-amber-300" /> ⚙️ จัดการตัวเลือกตำแหน่ง (Positions DDL)
        </button>
      </div>

      {/* 🌟 1. Module Permission Matrix Table (With Position Column requested in Red Circle) */}
      <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-800" />
            <h3 className="font-bold text-slate-800 text-sm">Member & Role Management (ตารางกำหนดสิทธิ์แยกตามโมดูล)</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded font-bold border border-emerald-300 flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block"></span> Editor = แก้ไขได้ (แถบสีเขียว)
            </span>
            <span className="text-[10px] text-slate-700 bg-slate-100 px-2.5 py-1 rounded font-bold border border-slate-300">
              Viewer = อ่านอย่างเดียว
            </span>
          </div>
        </div>

        {/* Add Member Form */}
        <form onSubmit={handleAddMember} className="flex flex-col sm:flex-row items-center gap-2 max-w-xl">
          <input 
            type="text" 
            placeholder="ชื่อสมาชิกใหม่ (Full Name)"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            className="flex-1 w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
          />

          <select
            value={newMemberPosition}
            onChange={(e) => setNewMemberPosition(e.target.value)}
            className="w-full sm:w-48 bg-white border border-slate-300 rounded px-3 py-1.5 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-none"
          >
            {positionOptions.map(pos => (
              <option key={pos} value={pos}>{pos}</option>
            ))}
          </select>

          <button 
            type="submit"
            className="w-full sm:w-auto px-4 py-1.5 bg-[#055726] hover:bg-[#03401b] text-white font-bold rounded text-xs shadow flex items-center justify-center gap-1 transition shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Member
          </button>
        </form>

        {/* 📊 Permission Matrix Table (Includes Position Column at Red Circle) */}
        <div className="border border-slate-300 rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0f4c81] text-white font-bold text-[11px]">
                <th className="py-3 px-3 w-36 sticky left-0 bg-[#0f4c81] z-10">รายชื่อสมาชิก (Member Name)</th>
                
                {/* 🌟 Position Column (Red Circle in screenshot) */}
                <th className="py-3 px-3 w-44 bg-[#0f4c81] border-l border-blue-800">
                  ตำแหน่ง (Position / Role)
                </th>

                {moduleColumns.map(mod => (
                  <th key={mod.id} className="py-3 px-2 text-center w-28 whitespace-nowrap border-l border-blue-800">
                    {mod.name}
                  </th>
                ))}
                <th className="py-3 px-2 text-center w-16 border-l border-blue-800">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {memberList.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-bold text-slate-900 sticky left-0 bg-white shadow-sm z-10">
                    {m.name}
                  </td>

                  {/* 🌟 Position Cell with Dropdown List Selection */}
                  <td className="py-2.5 px-2 border-l border-slate-200">
                    <select
                      value={m.position || positionOptions[0]}
                      onChange={(e) => handleMemberPositionChange(m.id, e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1 text-[11px] font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
                    >
                      {positionOptions.map(pos => (
                        <option key={pos} value={pos}>{pos}</option>
                      ))}
                    </select>
                  </td>

                  {moduleColumns.map((mod) => {
                    const currentRole = (m.permissions && m.permissions[mod.id]) || 'Viewer';
                    const isEditor = currentRole === 'Editor';

                    return (
                      <td key={mod.id} className="py-2 px-1 text-center border-l border-slate-200">
                        <select
                          value={currentRole}
                          onChange={(e) => handleModulePermissionChange(m.id, mod.id, e.target.value)}
                          className={`w-full text-center rounded px-1.5 py-1 text-[11px] cursor-pointer transition focus:outline-none ${
                            isEditor 
                              ? 'bg-emerald-100 border-2 border-emerald-400 font-extrabold text-emerald-950 shadow-sm' 
                              : 'bg-slate-100 border border-slate-300 font-medium text-slate-700'
                          }`}
                        >
                          <option value="Viewer">Viewer</option>
                          <option value="Editor">Editor</option>
                        </select>
                      </td>
                    );
                  })}

                  <td className="py-2.5 px-2 text-center border-l border-slate-200">
                    <button 
                      onClick={() => handleDeleteMember(m.id)}
                      className="p-1 text-rose-500 hover:text-rose-700 transition"
                      title="ลบสมาชิก"
                    >
                      <Trash2 className="w-4 h-4 mx-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Company Holidays Setup Container */}
      <div className="bg-white border border-slate-300 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 font-bold text-slate-800 text-sm">
          <Calendar className="w-5 h-5 text-emerald-700" />
          <span>Company Holidays Setup (ปฏิทินวันหยุดบริษัท)</span>
        </div>

        {/* Form */}
        <form onSubmit={handleAddHoliday} className="space-y-2 max-w-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input 
              type="date" 
              value={newHolidayDate}
              onChange={(e) => setNewHolidayDate(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none font-mono"
            />
            <input 
              type="text" 
              placeholder="Holiday Label (e.g. วันสงกรานต์)"
              value={newHolidayLabel}
              onChange={(e) => setNewHolidayLabel(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-2 bg-[#055726] hover:bg-[#03401b] text-white font-bold rounded text-xs shadow flex items-center justify-center gap-1 transition"
          >
            <Plus className="w-4 h-4" /> Add Holiday
          </button>
        </form>

        {/* Company Holidays List */}
        <div className="space-y-2 pt-2 border-t border-slate-100 max-w-xl">
          <h4 className="font-bold text-slate-700 text-xs">Company Holidays ({holidayList.length})</h4>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden max-h-80 overflow-y-auto">
            {holidayList.map((h) => (
              <div key={h.id} className="p-2.5 bg-white hover:bg-slate-50 flex justify-between items-center transition">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-0.5 bg-rose-600 text-white font-mono font-bold rounded text-[11px]">
                    {h.date}
                  </span>
                  <span className="font-bold text-slate-800">{h.label}</span>
                </div>

                <button 
                  onClick={() => handleDeleteHoliday(h.id)}
                  className="p-1 text-rose-500 hover:text-rose-700 transition"
                  title="Delete Holiday"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌟 Manage Position DDL Options Modal */}
      {showPositionModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-300 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-700" />
                <span>จัดการตัวเลือกตำแหน่งใน Dropdown List</span>
              </h3>
              <button onClick={() => setShowPositionModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            {/* Add New Option Form */}
            <form onSubmit={handleAddPositionOption} className="flex gap-2">
              <input 
                type="text"
                placeholder="ระบุชื่อตำแหน่งใหม่..."
                value={newPosInput}
                onChange={(e) => setNewPosInput(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:border-blue-500 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded text-xs shadow flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> เพิ่ม
              </button>
            </form>

            {/* Existing Options List */}
            <div className="space-y-1.5 pt-2">
              <h4 className="font-bold text-slate-700 text-xs">รายการตำแหน่งที่มีใน Dropdown ({positionOptions.length})</h4>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden max-h-60 overflow-y-auto">
                {positionOptions.map((pos) => (
                  <div key={pos} className="p-2.5 bg-white hover:bg-slate-50 flex justify-between items-center transition">
                    <span className="font-bold text-slate-800 text-xs">{pos}</span>
                    <button 
                      onClick={() => handleDeletePositionOption(pos)}
                      className="p-1 text-rose-500 hover:text-rose-700 transition"
                      title="ลบตำแหน่งนี้"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-200">
              <button 
                onClick={() => setShowPositionModal(false)}
                className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsModule;
