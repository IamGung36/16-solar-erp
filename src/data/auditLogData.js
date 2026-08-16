export const initialAuditLogs = [
  {
    id: 'log-001',
    timestamp: '16/08/2026 02:45:10',
    user: 'admin (ผู้ดูแลระบบ)',
    action: 'UPDATE_MARKUP',
    itemName: 'การตั้งค่า % Markup รวม',
    oldValue: 'Material: 10%, Labor: 10%',
    newValue: 'Material: 10%, Labor: 15%',
  },
  {
    id: 'log-002',
    timestamp: '16/08/2026 02:30:15',
    user: 'admin (ผู้ดูแลระบบ)',
    action: 'UPDATE_PRICE',
    itemName: 'PV module (JA Solar JAM66BV)',
    oldValue: 'ค่าวัสดุ: 4,000 ฿',
    newValue: 'ค่าวัสดุ: 4,200 ฿',
  },
  {
    id: 'log-003',
    timestamp: '16/08/2026 01:50:00',
    user: 'คุณสมชาย (BD Engineer)',
    action: 'CREATE_ITEM',
    itemName: 'Inverter (Sungrow SG350HX)',
    oldValue: '-',
    newValue: 'ค่าวัสดุ: 240,000 ฿, ค่าแรง: 12,000 ฿',
  },
];
