import React, { useState } from 'react';
import { 
  FileCheck, Upload, Save, CheckCircle2, Download, Trash2, 
  Eye, FileText, CheckSquare, Square, Check
} from 'lucide-react';

const PrelimDesignSection = ({ projectData, onSaveStep, onNext, onPrev }) => {
  const [showSaveToast, setShowSaveToast] = useState(false);

  // 6 Required Checklists in Flow 2 requested by user
  const [checklists, setChecklists] = useState([
    { id: 'chk-1', name: 'Site survey (รายงานผลสำรวจพื้นที่จริง)', file: 'Site_Survey_Report_Bangpoo.pdf', checked: true },
    { id: 'chk-2', name: 'Load Analysis (วิเคราะห์การใช้ไฟฟ้า Load Profile)', file: 'Load_Analysis_ThaiPlastic_12M.xlsx', checked: true },
    { id: 'chk-3', name: 'PV Layout (แบบจัดวางแผงโซลาร์)', file: 'PV_Layout_Rooftop_100kWp.pdf', checked: true },
    { id: 'chk-4', name: 'Single line Diagram (แบบไดอะแกรมระบบไฟฟ้า SLD)', file: 'SLD_Solar_100kWp_PEA.pdf', checked: true },
    { id: 'chk-5', name: 'TOR (ข้อกำหนดขอบเขตงาน)', file: null, checked: false },
    { id: 'chk-6', name: 'Scope check list (รายการตรวจสอบขอบเขตงาน)', file: null, checked: false },
  ]);

  const handleToggleChecklist = (id) => {
    setChecklists(checklists.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
  };

  const handleFileUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      setChecklists(checklists.map(c => c.id === id ? { ...c, file: file.name, checked: true } : c));
    }
  };

  const handleSave = () => {
    if (onSaveStep) onSaveStep('prelim');
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleSaveAndNext = () => {
    handleSave();
    if (onNext) onNext();
  };

  const completedCount = checklists.filter(c => c.checked).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative text-xs">
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>บันทึกข้อมูล Flow 2: Prelim Design & File สำเร็จ!</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="erp-card-white p-5 rounded-lg border border-slate-300 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 font-bold text-slate-800 text-sm">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-700" />
            <span>Prelim Design & Attachment Checklists (แบบร่างและเอกสารประกอบ - Flow 2)</span>
          </div>

          <button 
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 2
          </button>
        </div>

        {/* 🌟 6 Required Document Checklists Box */}
        <div className="bg-slate-50 border border-slate-300 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-center border-b border-slate-200 pb-2">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-blue-800" />
              <span>Checklist เอกสารสำคัญที่ควรแนบ ({completedCount} / 6 รายการ)</span>
            </h4>
            <span className="px-2.5 py-0.5 bg-blue-100 text-blue-900 font-bold rounded text-[11px] font-mono">
              ความสมบูรณ์ {Math.round((completedCount / 6) * 100)}%
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {checklists.map((item) => (
              <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <button 
                    type="button"
                    onClick={() => handleToggleChecklist(item.id)}
                    className="text-blue-800 hover:text-blue-900"
                  >
                    {item.checked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <div>
                    <p className={`font-bold text-xs ${item.checked ? 'text-slate-900' : 'text-slate-500'}`}>
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      {item.file ? `📁 ${item.file}` : 'ยังไม่ได้แนบไฟล์'}
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <button className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] rounded border border-slate-300 flex items-center gap-1">
                    <Upload className="w-3 h-3 text-blue-800" /> แนบไฟล์
                  </button>
                  <input 
                    type="file"
                    onChange={(e) => handleFileUpload(item.id, e)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-slate-300">
        <button 
          onClick={onPrev}
          className="px-4 py-2 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs"
        >
          ← ย้อนกลับไป Initial Detail
        </button>

        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 2
          </button>

          <button 
            type="button"
            onClick={handleSaveAndNext}
            className="px-5 py-2 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs shadow flex items-center gap-1 transition"
          >
            บันทึก & ถัดไป: BOQ Costing (11 หมวด) ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrelimDesignSection;
