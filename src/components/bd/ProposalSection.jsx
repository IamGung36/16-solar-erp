import React, { useState } from 'react';
import { 
  FileText, Upload, Save, CheckCircle2, Download, Trash2, 
  Eye, FileCheck, ArrowRight, File
} from 'lucide-react';

const ProposalSection = ({ projectData, onSaveStep, onPrev }) => {
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [proposalFiles, setProposalFiles] = useState([
    { id: 'f-1', name: 'Proposal_Solar_Rooftop_ThaiPlastic_V1.pdf', size: '4.8 MB', date: '15 ส.ค. 2026', version: 'V1.0 (Draft)', type: 'pdf' },
    { id: 'f-2', name: 'Proposal_Presentation_Final_Approved.pptx', size: '12.5 MB', date: '16 ส.ค. 2026', version: 'V2.0 (Final Approved)', type: 'pptx' }
  ]);

  const handleSave = () => {
    if (onSaveStep) onSaveStep('proposal');
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDoc = {
        id: `f-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
        version: `V${proposalFiles.length + 1}.0`,
        type: file.name.split('.').pop().toLowerCase()
      };
      setProposalFiles([newDoc, ...proposalFiles]);
    }
  };

  const handleDeleteFile = (id) => {
    setProposalFiles(proposalFiles.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 relative text-xs">
      {/* Toast Notification */}
      {showSaveToast && (
        <div className="fixed top-20 right-8 bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-2xl z-50 flex items-center gap-2 font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-5 h-5 text-amber-300" />
          <span>บันทึกข้อมูล Flow 5: Proposal Attachment สำเร็จ!</span>
        </div>
      )}

      {/* Title Card */}
      <div className="erp-card-white p-5 rounded-lg border border-slate-300 shadow-sm space-y-4">
        <div className="flex justify-between items-center border-b border-slate-200 pb-3 font-bold text-slate-800 text-sm">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <span>Proposal Attachment (แนบไฟล์เอกสารข้อเสนอโครงการ - Flow 5)</span>
          </div>

          <button 
            type="button"
            onClick={handleSave}
            className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
          >
            <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 5
          </button>
        </div>

        <p className="text-slate-600">
          อัปโหลดและจัดเก็บเอกสารข้อเสนอโครงการ (Project Proposal), เล่มนำเสนอ (Presentation Deck) และข้อเสนอทางเทคนิคเพื่อส่งให้ลูกค้าพิจารณา
        </p>

        {/* File Upload Box */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 bg-slate-50 text-center relative transition group cursor-pointer">
          <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-600 mx-auto mb-2 transition" />
          <h4 className="font-bold text-slate-800 text-xs">ลากและวางไฟล์ Proposal หรือ คลิกเพื่อเลือกไฟล์</h4>
          <p className="text-[11px] text-slate-500 mt-1">รองรับไฟล์ประเภท PDF, PPTX, DOCX (ขนาดไฟล์สูงสุด 50MB)</p>

          <input 
            type="file" 
            accept=".pdf,.pptx,.ppt,.docx,.doc"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>

        {/* Attached Proposal Files List */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-blue-800" />
            <span>เอกสาร Proposal ที่แนบในโครงการ ({proposalFiles.length} รายการ)</span>
          </h4>

          <div className="divide-y divide-slate-200 border border-slate-300 rounded-lg overflow-hidden">
            {proposalFiles.map((file) => (
              <div key={file.id} className="p-3.5 bg-white hover:bg-slate-50 flex items-center justify-between transition">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
                    <File className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-xs">{file.name}</p>
                    <div className="text-[11px] text-slate-500 font-mono flex items-center gap-3 mt-0.5">
                      <span>เวอร์ชัน: <strong className="text-amber-700">{file.version}</strong></span>
                      <span>ขนาด: {file.size}</span>
                      <span>วันที่แนบ: {file.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded flex items-center gap-1 border border-slate-300">
                    <Download className="w-3.5 h-3.5 text-blue-800" /> ดาวน์โหลด
                  </button>
                  <button 
                    onClick={() => handleDeleteFile(file.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 transition"
                    title="ลบไฟล์"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
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
          ← ย้อนกลับไป ใบปะหน้าเสนอราคา
        </button>

        <button 
          type="button"
          onClick={handleSave}
          className="px-5 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow flex items-center gap-1.5 transition"
        >
          <Save className="w-4 h-4 text-amber-300" /> บันทึกข้อมูล Flow 5
        </button>
      </div>
    </div>
  );
};

export default ProposalSection;
