import React, { useState } from 'react';
import { 
  Building2, FileCheck, FileSpreadsheet, FileText, 
  Plus, CheckCircle, ArrowRight, ShieldCheck, Check, Send
} from 'lucide-react';
import InitialProjectForm from './bd/InitialProjectForm';
import PrelimDesignSection from './bd/PrelimDesignSection';
import BoqCostingTable from './bd/BoqCostingTable';
import QuotationCoverSheet from './bd/QuotationCoverSheet';
import ProposalSection from './bd/ProposalSection';

const BDModule = ({ 
  leads, 
  onConvertToProject,
  costDatabase,
  setCostDatabase,
  globalMatMarkup,
  globalLaborMarkup,
  onOpenModule99,
  userRole = 'admin'
}) => {
  const [activeTab, setActiveTab] = useState('initial');
  
  // Track save status for steps 1-5
  const [stepSavedState, setStepSavedState] = useState({
    initial: false,
    prelim: false,
    boq: false,
    quotation: false,
    proposal: false
  });

  const [projectData, setProjectData] = useState({
    projectCode: 'BD26-019',
    projectName: 'โครงการ โซลาร์รูฟท็อป โรงงานสมุทรปราการ',
    clientName: 'บริษัท ไทยอุตสาหกรรมพลาสติก จำกัด (มหาชน)',
    contactName: 'คุณวิชัย มั่นคง (ผู้จัดการฝ่ายจัดซื้อ)',
    contactPhone: '02-999-8888',
    contactEmail: 'contact@client-company.co.th',
    location: 'นิคมอุตสาหกรรมบางปู จ.สมุทรปราการ',
    billingAddress: 'นิคมอุตสาหกรรมบางปู จ.สมุทรปราการ 10280',
    taxId: '0105560999999 (สำนักงานใหญ่)',
    investor: 'PTT',
    businessType: 'PPA',
    capacityKwp: 100,
    developmentStage: 'Underdevelope',
    workStatus: 'In Progress',
    deadline: '2026-10-31'
  });

  const handleSaveStep = (stepKey) => {
    setStepSavedState(prev => ({ ...prev, [stepKey]: true }));
  };

  const tabs = [
    { id: 'initial', key: 'initial', label: '1. Initial Detail', icon: Building2, desc: 'ข้อมูลโครงการและลูกค้า' },
    { id: 'prelim', key: 'prelim', label: '2. Prelim Design', icon: FileCheck, desc: 'แบบร่างและ 6 Checklists' },
    { id: 'boq', key: 'boq', label: '3. BOQ Costing (11 หมวด)', icon: FileSpreadsheet, desc: 'ประมาณการต้นทุนวิศวกรรม' },
    { id: 'quotation', key: 'quotation', label: '4. ใบปะหน้าเสนอราคา', icon: FileText, desc: 'Quotation Summary & ROI' },
    { id: 'proposal', key: 'proposal', label: '5. Proposal Attachment', icon: Send, desc: 'แนบไฟล์ข้อเสนอโครงการ' },
  ];

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Module Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-white p-4 rounded-lg border border-slate-300 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0f4c81] text-white">
              BD MODULE
            </span>
            <h2 className="text-base font-bold text-slate-800">1. ฝ่ายพัฒนาธุรกิจและการขาย (Business Development)</h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            กระบวนการ 5 ขั้นตอน: กรอกข้อมูลและกดบันทึกในแต่ละ Flow ก่อนเปลี่ยนไปขั้นตอนถัดไป
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab('initial')}
            className="px-3.5 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1 shadow"
          >
            <Plus className="w-3.5 h-3.5" /> + สร้างโครงการใหม่ (BD26-XXX)
          </button>
        </div>
      </div>

      {/* 🌟 Top 5-Step Navigator Bar */}
      <div className="bg-white border border-slate-300 p-2 rounded-xl shadow-sm flex justify-between items-center gap-2 overflow-x-auto text-xs font-semibold">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isSaved = stepSavedState[tab.key];

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[160px] p-2.5 rounded-lg text-left transition flex items-center justify-between border ${
                isActive 
                  ? 'bg-[#0f4c81] text-white border-blue-900 shadow-md font-bold ring-2 ring-blue-300' 
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-blue-900'}`} />
                <div>
                  <div className="leading-tight text-xs flex items-center gap-1.5">
                    <span>{tab.label}</span>
                    {isSaved && (
                      <span className="px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 text-[9px] font-extrabold flex items-center gap-0.5 shadow-sm">
                        <Check className="w-2.5 h-2.5" /> บันทึกแล้ว
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] font-normal ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>{tab.desc}</div>
                </div>
              </div>
              {isActive && <CheckCircle className="w-4 h-4 text-amber-300 shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Main Tab Content */}
      <div className="mt-2">
        {activeTab === 'initial' && (
          <InitialProjectForm 
            projectData={projectData} 
            setProjectData={setProjectData}
            onSaveStep={handleSaveStep}
            onNext={() => setActiveTab('prelim')}
            userRole={userRole}
          />
        )}

        {activeTab === 'prelim' && (
          <PrelimDesignSection 
            projectData={projectData}
            onSaveStep={handleSaveStep}
            onNext={() => setActiveTab('boq')}
            onPrev={() => setActiveTab('initial')}
          />
        )}

        {activeTab === 'boq' && (
          <BoqCostingTable 
            projectSizeKwp={projectData.capacityKwp}
            costDatabase={costDatabase}
            setCostDatabase={setCostDatabase}
            globalMatMarkup={globalMatMarkup}
            globalLaborMarkup={globalLaborMarkup}
            onOpenModule99={onOpenModule99}
            onSaveStep={handleSaveStep}
            onNext={() => setActiveTab('quotation')}
            onPrev={() => setActiveTab('prelim')}
          />
        )}

        {activeTab === 'quotation' && (
          <QuotationCoverSheet 
            projectData={projectData}
            onSaveStep={handleSaveStep}
            onNext={() => setActiveTab('proposal')}
            onPrev={() => setActiveTab('boq')}
          />
        )}

        {activeTab === 'proposal' && (
          <ProposalSection 
            projectData={projectData}
            onSaveStep={handleSaveStep}
            onPrev={() => setActiveTab('quotation')}
          />
        )}
      </div>
    </div>
  );
};

export default BDModule;
