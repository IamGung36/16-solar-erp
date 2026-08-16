import React, { useState } from 'react';
import TopNavbar from './components/TopNavbar';
import TopRibbonToolbar from './components/TopRibbonToolbar';
import LeftSidebar from './components/LeftSidebar';
import RightSidebarActivity from './components/RightSidebarActivity';
import BottomStatusBar from './components/BottomStatusBar';

import GreetingBanner from './components/GreetingBanner';
import ExecutiveDashboard from './components/ExecutiveDashboard';
import BDModule from './components/BDModule';
import PMModule from './components/PMModule';
import ProcurementModule from './components/ProcurementModule';
import ProjectControlModule from './components/ProjectControlModule';
import FinanceModule from './components/FinanceModule';
import AccountingModule from './components/AccountingModule';
import OMModule from './components/OMModule';
import PartnerModule from './components/PartnerModule';
import CostDatabaseModule from './components/CostDatabaseModule';
import SettingsModule from './components/SettingsModule';

import { 
  mockProjects, mockLeads, mockBoqItems, 
  mockRequisitions, mockPurchaseOrders, mockCashFlowData, mockMilestones 
} from './data/mockData';
import { initialCostDatabase } from './data/costDatabaseData';
import { initialAuditLogs } from './data/auditLogData';

function App() {
  const [activeModule, setActiveModule] = useState('overview');
  const [selectedType, setSelectedType] = useState('ALL');
  const [projects, setProjects] = useState(mockProjects);
  const [selectedProject, setSelectedProject] = useState(mockProjects[0]);
  const [leads, setLeads] = useState(mockLeads);
  const [boqItems, setBoqItems] = useState(mockBoqItems);
  const [requisitions, setRequisitions] = useState(mockRequisitions);
  const [purchaseOrders, setPurchaseOrders] = useState(mockPurchaseOrders);
  const [cashFlow, setCashFlow] = useState(mockCashFlowData);
  const [milestones, setMilestones] = useState(mockMilestones);

  // Global Synchronized Cost Database & Markup State
  const [costDatabase, setCostDatabase] = useState(initialCostDatabase);
  const [globalMatMarkup, setGlobalMatMarkup] = useState(10);
  const [globalLaborMarkup, setGlobalLaborMarkup] = useState(15);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);
  const [userRole, setUserRole] = useState('admin');

  // Filter projects based on type filter
  const filteredProjects = selectedType === 'ALL' 
    ? projects 
    : projects.filter(p => p.type === selectedType);

  // Handlers for cross-module interactions
  const handleConvertToProject = (lead) => {
    const newProj = {
      id: `SOL-2026-00${projects.length + 1}`,
      name: `${lead.customer} - Solar ${lead.type} ${lead.capacityEstimateKwp} kWp`,
      type: lead.type,
      client: lead.customer,
      capacityKwp: lead.capacityEstimateKwp,
      contractValue: lead.estimatedValue,
      baselineBudget: Math.round(lead.estimatedValue * 0.8),
      actualSpent: 0,
      committedPO: 0,
      progress: 5,
      status: 'DESIGN_PERMIT',
      startDate: new Date().toISOString().split('T')[0],
      targetCod: '2026-11-30',
      pm: 'คุณสมชาย วิศวการ',
      location: 'จังหวัดสมุทรปราการ',
      gridType: 'PEA High Voltage'
    };

    setProjects([newProj, ...projects]);
    setSelectedProject(newProj);
    setLeads(leads.filter(l => l.id !== lead.id));
    setActiveModule('pm');
  };

  const handleCreatePr = (newPr) => {
    setRequisitions([newPr, ...requisitions]);
    if (newPr.budgetStatus === 'WITHIN_BUDGET') {
      setActiveModule('procurement');
    }
  };

  const handleCreatePo = (pr) => {
    const newPo = {
      poNumber: `PO-2026-0${purchaseOrders.length + 50}`,
      prNumber: pr.prNumber,
      vendor: 'บริษัท ซัพพลายเออร์มาตรฐาน จำกัด',
      projectId: pr.projectId,
      items: pr.itemDescription,
      amount: pr.requestedAmount,
      vat: Math.round(pr.requestedAmount * 0.07),
      grandTotal: Math.round(pr.requestedAmount * 1.07),
      deliveryDate: '2026-03-20',
      status: 'ISSUED',
      grnStatus: 'PENDING_DELIVERY'
    };

    setPurchaseOrders([newPo, ...purchaseOrders]);
    setRequisitions(requisitions.map(r => r.prNumber === pr.prNumber ? { ...r, status: 'CONVERTED_TO_PO' } : r));
    setProjects(projects.map(p => p.id === pr.projectId ? { ...p, committedPO: p.committedPO + pr.requestedAmount } : p));
  };

  const handleGenerateWcc = (milestone) => {
    setMilestones(milestones.map(m => m.id === milestone.id ? { ...m, status: 'COMPLETED', invoiceNo: `INV-2026-0${Math.floor(Math.random() * 80 + 10)}` } : m));
    setActiveModule('accounting');
  };

  return (
    <div className="min-h-screen bg-[#ebf0f5] text-slate-800 flex flex-col font-sans pb-8">
      {/* 1. Top Royal Blue Navbar */}
      <TopNavbar user="admin (ผู้ดูแลระบบ)" />

      {/* 2. Top Horizontal Ribbon Toolbar */}
      <TopRibbonToolbar activeModule={activeModule} setActiveModule={setActiveModule} />

      {/* 3. Main Workspace Grid Container */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left Collapsible Accordion Sidebar */}
        <LeftSidebar activeModule={activeModule} setActiveModule={setActiveModule} />

        {/* Center Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto space-y-4 max-w-full">
          {activeModule === 'overview' && (
            <div className="space-y-4">
              <GreetingBanner user="admin (ผู้ดูแลระบบ)" setActiveModule={setActiveModule} />
              <ExecutiveDashboard 
                projects={filteredProjects}
                cashFlow={cashFlow}
                onSelectProject={setSelectedProject}
                setActiveModule={setActiveModule}
              />
            </div>
          )}

          {activeModule === 'bd' && (
            <BDModule 
              leads={leads}
              onConvertToProject={handleConvertToProject}
              costDatabase={costDatabase}
              setCostDatabase={setCostDatabase}
              globalMatMarkup={globalMatMarkup}
              globalLaborMarkup={globalLaborMarkup}
              onOpenModule99={() => setActiveModule('costdb')}
            />
          )}

          {activeModule === 'pm' && (
            <PMModule 
              selectedProject={selectedProject}
              boqItems={boqItems}
              onCreatePr={handleCreatePr}
              requisitions={requisitions}
            />
          )}

          {activeModule === 'procurement' && (
            <ProcurementModule 
              requisitions={requisitions}
              purchaseOrders={purchaseOrders}
              onCreatePo={handleCreatePo}
            />
          )}

          {activeModule === 'control' && (
            <ProjectControlModule 
              selectedProject={selectedProject}
              milestones={milestones}
              onGenerateWcc={handleGenerateWcc}
            />
          )}

          {activeModule === 'finance' && (
            <FinanceModule 
              cashFlow={cashFlow}
              selectedProject={selectedProject}
            />
          )}

          {activeModule === 'accounting' && (
            <AccountingModule 
              purchaseOrders={purchaseOrders}
              milestones={milestones}
            />
          )}

          {activeModule === 'om' && (
            <OMModule 
              selectedProject={selectedProject}
            />
          )}

          {/* Module 8: Partner Management */}
          {activeModule === 'partner' && (
            <PartnerModule />
          )}

          {/* Module 99: Cost Database View */}
          {activeModule === 'costdb' && (
            <CostDatabaseModule 
              costDatabase={costDatabase}
              setCostDatabase={setCostDatabase}
              globalMatMarkup={globalMatMarkup}
              setGlobalMatMarkup={setGlobalMatMarkup}
              globalLaborMarkup={globalLaborMarkup}
              setGlobalLaborMarkup={setGlobalLaborMarkup}
              auditLogs={auditLogs}
              setAuditLogs={setAuditLogs}
              userRole={userRole}
            />
          )}

          {/* System Settings View */}
          {activeModule === 'settings' && (
            <SettingsModule />
          )}
        </main>

        {/* Right Activity Log Panel */}
        <RightSidebarActivity />
      </div>

      {/* 4. Bottom Status Footer Bar */}
      <BottomStatusBar user="admin (ผู้ดูแลระบบ)" />
    </div>
  );
}

export default App;
