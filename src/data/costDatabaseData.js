export const initialCostDatabase = [
  // หมวด 1: Main Equipment
  { id: 'cd-101', catId: 1, name: 'PV module', brand: 'JA Solar', spec: 'JAM66BV, 725Wp n-type', unit: 'แผง', matPrice: 4200, laborPrice: 300, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-102', catId: 1, name: 'PV module', brand: 'Jinko Solar', spec: 'Tiger Neo 550W N-type', unit: 'แผง', matPrice: 4150, laborPrice: 300, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-103', catId: 1, name: 'PV module', brand: 'Trina Solar', spec: 'Vertex N 550W Mono', unit: 'แผง', matPrice: 4300, laborPrice: 300, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-104', catId: 1, name: 'PV module', brand: 'Longi Solar', spec: 'Hi-MO 6 575W Mono', unit: 'แผง', matPrice: 4250, laborPrice: 300, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-105', catId: 1, name: 'Inverter', brand: 'Huawei', spec: 'SUN2000-100KTL-M2', unit: 'เครื่อง', matPrice: 85000, laborPrice: 5000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-106', catId: 1, name: 'Inverter', brand: 'Huawei', spec: 'SUN2000-330KTL-H1', unit: 'เครื่อง', matPrice: 220000, laborPrice: 10000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-107', catId: 1, name: 'Inverter', brand: 'Sungrow', spec: 'SG125CX-P2', unit: 'เครื่อง', matPrice: 92000, laborPrice: 5000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-108', catId: 1, name: 'Inverter', brand: 'Sungrow', spec: 'SG350HX High Voltage', unit: 'เครื่อง', matPrice: 240000, laborPrice: 12000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-109', catId: 1, name: 'Optimizer', brand: 'Huawei', spec: 'MERC-1300W-P', unit: 'ตัว', matPrice: 2500, laborPrice: 150, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-110', catId: 1, name: 'Data logger & Acc.', brand: 'Huawei', spec: 'SmartLogger 3000A', unit: 'ชุด', matPrice: 15000, laborPrice: 1000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-111', catId: 1, name: 'Data logger & Acc.', brand: 'Sungrow', spec: 'Logger 1000B', unit: 'ชุด', matPrice: 16500, laborPrice: 1000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 2: Electrical Part
  { id: 'cd-201', catId: 2, name: 'DC part (สาย, ท่อ, บ่อต่อ)', brand: 'Link / Arrow', spec: 'PV1-F 6 sq.mm / EMT', unit: 'เหมา', matPrice: 45000, laborPrice: 20000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-202', catId: 2, name: 'DC part (สาย, ท่อ, บ่อต่อ)', brand: 'Phelps Dodge', spec: 'Solar Cable 10 sq.mm', unit: 'เหมา', matPrice: 52000, laborPrice: 22000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-203', catId: 2, name: 'LV part (MDB, สาย AC)', brand: 'ประกอบในประเทศ', spec: 'ตู้ IP65 / เบรกเกอร์ ABB', unit: 'เหมา', matPrice: 95000, laborPrice: 25000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-204', catId: 2, name: 'LV part (MDB, สาย AC)', brand: 'Schneider Electric', spec: 'ตู้ MDB Main Breaker 400A', unit: 'เหมา', matPrice: 120000, laborPrice: 30000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 3: Metering, Protection & Comm.
  { id: 'cd-301', catId: 3, name: 'Metering', brand: 'Janitza', spec: 'Class 0.5s', unit: 'ชุด', matPrice: 12000, laborPrice: 2000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-302', catId: 3, name: 'Zero export & PQM', brand: 'Huawei', spec: 'Smart Power Sensor', unit: 'ชุด', matPrice: 15000, laborPrice: 3000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-303', catId: 3, name: 'Relay protection', brand: 'Microelettrica', spec: 'ตามมาตรฐาน กฟภ.', unit: 'ชุด', matPrice: 25000, laborPrice: 5000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-304', catId: 3, name: 'Grid code', brand: 'PEA/MEA Approved', spec: 'ทดสอบคุณภาพไฟฟ้า', unit: 'งาน', matPrice: 0, laborPrice: 35000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-305', catId: 3, name: 'Communication / SCADA', brand: 'Cisco / Moxa', spec: 'Fiber Optic / LAN', unit: 'งาน', matPrice: 10000, laborPrice: 5000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 4: Civil Part
  { id: 'cd-401', catId: 4, name: 'Aluminum Mounting Structure', brand: 'Clenergy', spec: 'Rail, Clamp, L-feet', unit: 'kWp', matPrice: 650, laborPrice: 350, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-402', catId: 4, name: 'Aluminum Mounting Structure', brand: 'Schletter', spec: 'Solar Mounting Aluminum', unit: 'kWp', matPrice: 720, laborPrice: 380, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-403', catId: 4, name: 'Concrete Ballast Ground Mount', brand: 'Local Civil', spec: 'ฐานรากคอนกรีตเสริมเหล็ก', unit: 'ฐาน', matPrice: 1200, laborPrice: 800, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 5: Facility
  { id: 'cd-501', catId: 5, name: 'สำนักงานสนาม / น้ำไฟชั่วคราว', brand: 'Local Container', spec: 'ตู้คอนเทนเนอร์ 2 เดือน', unit: 'เดือน', matPrice: 8000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-502', catId: 5, name: 'อุปกรณ์ Safety PPE', brand: 'Pangolin', spec: 'หมวก, เข็มขัด, รองเท้า', unit: 'ชุด', matPrice: 2500, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 6: Mechanical
  { id: 'cd-601', catId: 6, name: 'Water cleaning system', brand: 'Mitsubishi', spec: 'ปั๊มน้ำและระบบท่อสปริงเกลอร์', unit: 'ระบบ', matPrice: 25000, laborPrice: 12000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-602', catId: 6, name: 'Robotic Cleaning System', brand: 'Ecoppia', spec: 'หุ่นยนต์ล้างแผงอัตโนมัติ', unit: 'เครื่อง', matPrice: 180000, laborPrice: 20000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 7: Test and Commissioning
  { id: 'cd-701', catId: 7, name: 'ค่าทำ Commissioning', brand: 'Fluke / Megger', spec: 'Insulation, Ground Test', unit: 'งาน', matPrice: 0, laborPrice: 15000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 8: Engineering
  { id: 'cd-801', catId: 8, name: 'ค่าออกแบบและเซ็นรับรองแบบ (คต.)', brand: 'สามัญวิศวกร', spec: 'สามัญวิศวกรไฟฟ้า/โยธา', unit: 'งาน', matPrice: 0, laborPrice: 35000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 9: Project Management
  { id: 'cd-901', catId: 9, name: 'ค่าบริหารโครงการ (PM, Site Eng, จป.)', brand: 'PMO Team', spec: 'ระยะเวลา 2 เดือน', unit: 'เดือน', matPrice: 0, laborPrice: 45000, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 10: Permit
  { id: 'cd-1001', catId: 10, name: 'ดำเนินการขออนุญาต (อ.1, รง.4, ERC)', brand: 'Government Fee', spec: 'รวมค่าธรรมเนียมภาครัฐ', unit: 'รายการ', matPrice: 15000, laborPrice: 10000, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-1002', catId: 10, name: 'ค่าเชื่อมต่อการไฟฟ้า (PEA/MEA)', brand: 'PEA/MEA Utility', spec: 'รวมค่าตรวจพิจารณาแบบ', unit: 'รายการ', matPrice: 15000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },

  // หมวด 11: Other
  { id: 'cd-1101', catId: 11, name: 'ค่าขนส่ง (Transportation / Crane)', brand: 'Logistics Express', spec: 'รถเฮี๊ยบยกของขึ้นหลังคา', unit: 'เที่ยว', matPrice: 0, laborPrice: 8500, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-1102', catId: 11, name: 'ค่า Bank guarantee / Bond EPC', brand: 'KBank', spec: '2 Years Performance Bond', unit: 'งาน', matPrice: 20000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-1103', catId: 11, name: 'ค่า Bank guarantee / Bond EPC', brand: 'SCB', spec: 'Performance Guarantee 10%', unit: 'งาน', matPrice: 25000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-1104', catId: 11, name: 'ค่า Insurance (CAR / TPL)', brand: 'ทิพยประกันภัย', spec: 'วงเงินคุ้มครอง 15 ล้าน', unit: 'งาน', matPrice: 22000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-1105', catId: 11, name: 'ค่า Insurance (CAR / TPL)', brand: 'กรุงเทพประกันภัย', spec: 'คุ้มครองงานก่อสร้างและบุคคลที่สาม', unit: 'งาน', matPrice: 24000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },
  { id: 'cd-1106', catId: 11, name: 'ค่า Contingency (งบสำรองฉุกเฉิน)', brand: 'Project Reserve', spec: '5% ของโครงการ', unit: 'งาน', matPrice: 50000, laborPrice: 0, matMarkupPct: 10, laborMarkupPct: 15 },
];
