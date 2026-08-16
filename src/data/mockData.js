export const mockProjects = [
  {
    id: 'SOL-2026-001',
    name: 'โรงงาน Thai Beverage - Solar Rooftop 1.5 MWp',
    type: 'ROOFTOP',
    client: 'บริษัท ไทยเบฟเวอเรจ จำกัด (มหาชน)',
    capacityKwp: 1500,
    contractValue: 34500000,
    baselineBudget: 27600000,
    actualSpent: 18200000,
    committedPO: 6400000,
    progress: 68,
    status: 'CONSTRUCTION',
    startDate: '2026-01-15',
    targetCod: '2026-05-30',
    pm: 'คุณสมชาย วิศวการ',
    location: 'อ.บางปะอิน จ.พระนครศรีอยุธยา',
    gridType: 'PEA 22kV',
  },
  {
    id: 'SOL-2026-002',
    name: 'โครงการอยุธยา โซลาร์ฟาร์ม 8.0 MWp',
    type: 'FARM',
    client: 'บริษัท อยุธยา พาวเวอร์ เอ็นเนอร์ยี่ จำกัด',
    capacityKwp: 8000,
    contractValue: 168000000,
    baselineBudget: 138600000,
    actualSpent: 42500000,
    committedPO: 65000000,
    progress: 32,
    status: 'DESIGN_PERMIT',
    startDate: '2026-02-01',
    targetCod: '2026-10-15',
    pm: 'คุณวิชัย พัฒนาการ',
    location: 'อ.วังน้อย จ.พระนครศรีอยุธยา',
    gridType: 'PEA High Voltage 115kV',
  },
  {
    id: 'SOL-2026-003',
    name: 'Siam Retail Plaza - Private PPA 750 kWp',
    type: 'PRIVATE_PPA',
    client: 'บริษัท สยาม รีเทล คอร์ปอเรชั่น จำกัด',
    capacityKwp: 750,
    contractValue: 0, // PPA contract value is 0 upfront, capitalized as asset
    capitalizedAssetValue: 18500000,
    baselineBudget: 18500000,
    actualSpent: 18100000,
    committedPO: 0,
    progress: 100,
    status: 'COD',
    startDate: '2025-08-10',
    targetCod: '2026-01-20',
    pm: 'คุณอนุรักษ์ ยั่งยืน',
    tariffRate: 3.25, // THB/kWh
    monthlyGenerationKwh: 98500,
    monthlyBillingThb: 320125,
    location: 'เขตบางนา กรุงเทพมหานคร',
    gridType: 'MEA 12kV',
  },
  {
    id: 'SOL-2026-004',
    name: 'ศูนย์กระจายสินค้า Bangna Logistics - Rooftop 2.2 MWp',
    type: 'ROOFTOP',
    client: 'บริษัท บางนา โลจิสติกส์ ฮับ จำกัด',
    capacityKwp: 2200,
    contractValue: 48000000,
    baselineBudget: 38400000,
    actualSpent: 0,
    committedPO: 0,
    progress: 5,
    status: 'PROPOSAL',
    startDate: '2026-04-01',
    targetCod: '2026-08-31',
    pm: 'คุณกิตติศักดิ์ ชาญชัย',
    location: 'อ.บางพลี จ.สมุทรปราการ',
    gridType: 'MEA 24kV',
  }
];

export const mockLeads = [
  {
    id: 'LEAD-001',
    customer: 'บริษัท ซีพี ออลล์ โรงงานอาหารสำเร็จรูป',
    contact: 'คุณประสิทธิ์ (ผู้จัดการฝ่ายวิศวกรรมอาคาร)',
    phone: '081-987-6543',
    capacityEstimateKwp: 1200,
    type: 'ROOFTOP',
    stage: 'SITE_SURVEY',
    estimatedValue: 27600000,
    paybackYears: 3.8,
    shadingScore: '96% Clean (Optimal)',
    surveyPhotos: 4,
  },
  {
    id: 'LEAD-002',
    customer: 'บริษัท นิคมอุตสาหกรรมอมตะ นิเวศน์',
    contact: 'คุณนภา (Director of Sustainability)',
    phone: '089-111-2233',
    capacityEstimateKwp: 5000,
    type: 'PRIVATE_PPA',
    stage: 'PROPOSAL_SUBMITTED',
    estimatedValue: 115000000,
    paybackYears: 6.2,
    shadingScore: '98% Clean',
    surveyPhotos: 12,
  },
  {
    id: 'LEAD-003',
    customer: 'บริษัท ไทยเบฟเวอร์เรจ โลจิสติกส์ ปทุมธานี',
    contact: 'คุณภาณุ (ผู้จัดการแผนกจัดซื้อ)',
    phone: '086-444-5566',
    capacityEstimateKwp: 800,
    type: 'ROOFTOP',
    stage: 'CONTRACT_REVIEW',
    estimatedValue: 18400000,
    paybackYears: 4.1,
    shadingScore: '94% Minor Tree Obstruction',
    surveyPhotos: 6,
  }
];

export const mockBoqItems = [
  { code: 'EQ-001', category: 'EQUIPMENT', name: 'แผง Solar Mono PERC 550W (Tier-1 Jinko/JA)', unit: 'PCS', qty: 2727, unitCost: 4200, totalCost: 11453400, budgetCode: 'WBS-1.1' },
  { code: 'EQ-002', category: 'EQUIPMENT', name: 'Inverter Sungrow 110kW String Inverter', unit: 'SETS', qty: 12, unitCost: 185000, totalCost: 2220000, budgetCode: 'WBS-1.2' },
  { code: 'EQ-003', category: 'EQUIPMENT', name: 'Mounting Structure Aluminum Rail & Clamps', unit: 'LOT', qty: 1, unitCost: 2400000, totalCost: 2400000, budgetCode: 'WBS-1.3' },
  { code: 'EQ-004', category: 'EQUIPMENT', name: 'DC Cable 6mm2 Solar Cable & Combiner Box', unit: 'LOT', qty: 1, unitCost: 1450000, totalCost: 1450000, budgetCode: 'WBS-1.4' },
  { code: 'CV-001', category: 'CIVIL', name: 'งานเตรียมพื้นผิวหลังคา & Walkway ติดตั้งโครงสร้าง', unit: 'LOT', qty: 1, unitCost: 1800000, totalCost: 1800000, budgetCode: 'WBS-2.1' },
  { code: 'EL-001', category: 'ELECTRICAL', name: 'ค่าแรงและอุปกรณ์ติดตั้งระบบไฟฟ้า AC/DC + Grounding', unit: 'LOT', qty: 1, unitCost: 3500000, totalCost: 3500000, budgetCode: 'WBS-3.1' },
  { code: 'PM-001', category: 'PERMIT', name: 'ค่าธรรมเนียมวิศวกรขนานไฟ PEA + กกพ. + ภ.ก.1', unit: 'LOT', qty: 1, unitCost: 850000, totalCost: 850000, budgetCode: 'WBS-4.1' },
  { code: 'CN-001', category: 'CONTINGENCY', name: 'สำรองฉุกเฉินความเสี่ยงโครงการ (Contingency 5%)', unit: 'LOT', qty: 1, unitCost: 1380000, totalCost: 1380000, budgetCode: 'WBS-5.1' }
];

export const mockRequisitions = [
  {
    prNumber: 'PR-2026-088',
    projectId: 'SOL-2026-001',
    projectName: 'โรงงาน Thai Beverage - Solar Rooftop 1.5 MWp',
    requestedBy: 'คุณสมชาย (PM)',
    wbsCode: 'WBS-1.1',
    wbsName: 'แผง Solar Mono PERC 550W (Tier 1)',
    itemDescription: 'สั่งซื้อแผง Jinko Solar 550W N-type จำนวน 2,727 แผง',
    requestedAmount: 11453400,
    approvedBudget: 12000000,
    spentSoFar: 0,
    budgetStatus: 'WITHIN_BUDGET',
    status: 'PENDING_APPROVAL',
    date: '2026-02-10'
  },
  {
    prNumber: 'PR-2026-092',
    projectId: 'SOL-2026-001',
    projectName: 'โรงงาน Thai Beverage - Solar Rooftop 1.5 MWp',
    requestedBy: 'คุณสมชาย (PM)',
    wbsCode: 'WBS-2.1',
    wbsName: 'งานเตรียมพื้นผิวหลังคา & Walkway',
    itemDescription: 'งานเสริมโครงสร้างเหล็กเพิ่มเติมพิเศษบริเวณจั่วหลังคาโรงงาน',
    requestedAmount: 2400000,
    approvedBudget: 1800000,
    spentSoFar: 0,
    budgetStatus: 'EXCEEDED_BUDGET', // Exceeds budget! Triggers VO alert
    exceededBy: 600000,
    status: 'BLOCKED_BY_BUDGET',
    date: '2026-02-14'
  }
];

export const mockPurchaseOrders = [
  {
    poNumber: 'PO-2026-042',
    prNumber: 'PR-2026-088',
    vendor: 'บริษัท จินโกะ โซลาร์ (ประเทศไทย) จำกัด',
    projectId: 'SOL-2026-001',
    items: 'แผง Solar Mono PERC 550W N-Type จำนวน 2,727 แผง',
    amount: 11453400,
    vat: 801738,
    grandTotal: 12255138,
    deliveryDate: '2026-03-05',
    status: 'ISSUED',
    grnStatus: 'PARTIAL_DELIVERED'
  },
  {
    poNumber: 'PO-2026-045',
    prNumber: 'PR-2026-075',
    vendor: 'บริษัท ซังกรีม อินเวอร์เตอร์ จำกัด',
    projectId: 'SOL-2026-001',
    items: 'Sungrow 110kW Inverter จำนวน 12 เครื่อง',
    amount: 2220000,
    vat: 155400,
    grandTotal: 2375400,
    deliveryDate: '2026-03-10',
    status: 'ISSUED',
    grnStatus: 'COMPLETED'
  }
];

export const mockCashFlowData = [
  { month: 'ม.ค.', inflow: 6900000, outflow: 3500000, net: 3400000 },
  { month: 'ก.พ.', inflow: 0, outflow: 12255138, net: -12255138 },
  { month: 'มี.ค.', inflow: 13800000, outflow: 4500000, net: 9300000 },
  { month: 'เม.ย.', inflow: 10350000, outflow: 5200000, net: 5150000 },
  { month: 'พ.ค.', inflow: 3450000, outflow: 1800000, net: 1650000 },
  { month: 'มิ.ย.', inflow: 320125, outflow: 150000, net: 170125 }
];

export const mockMilestones = [
  { id: 'M-1', name: 'งวดที่ 1: เงินมัดจำลงนามสัญญา (Deposit 20%)', percent: 20, amount: 6900000, status: 'COMPLETED', invoiceNo: 'INV-2026-001', paid: true },
  { id: 'M-2', name: 'งวดที่ 2: สินค้าหลักและแผง Solar ถึงไซต์งาน (40%)', percent: 40, amount: 13800000, status: 'IN_PROGRESS', invoiceNo: 'INV-2026-015', paid: false },
  { id: 'M-3', name: 'งวดที่ 3: ติดตั้งโครงสร้างและทดสอบการขนานไฟ PEA (30%)', percent: 30, amount: 10350000, status: 'PENDING', invoiceNo: '-', paid: false },
  { id: 'M-4', name: 'งวดที่ 4: วันเปิดใช้งานระบบ COD & Handover (10%)', percent: 10, amount: 3450000, status: 'PENDING', invoiceNo: '-', paid: false }
];
