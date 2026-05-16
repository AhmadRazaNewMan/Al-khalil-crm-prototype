// =============================================
// Al Khail CRM - All Dummy Data
// =============================================

export const currentUser = {
  id: 'admin-1',
  name: 'Ahmed Al Mansouri',
  role: 'Admin',
  avatar: 'AA',
  photo: 'https://randomuser.me/api/portraits/men/41.jpg',
  email: 'ahmed@alkhailre.ae',
  status: 'online',
};

export const agents = [
  { id: 'a1', name: 'Sara Khalid',      avatar: 'SK', photo: 'https://randomuser.me/api/portraits/women/44.jpg', role: 'Agent',      status: 'online',  activeChats: 4, calls: 12, conversion: 68, ext: '101', wa: '+971501234567' },
  { id: 'a2', name: 'Omar Farooq',      avatar: 'OF', photo: 'https://randomuser.me/api/portraits/men/32.jpg',   role: 'Agent',      status: 'busy',    activeChats: 2, calls: 8,  conversion: 55, ext: '102', wa: '+971501234568' },
  { id: 'a3', name: 'Fatima Zahra',     avatar: 'FZ', photo: 'https://randomuser.me/api/portraits/women/68.jpg', role: 'Supervisor', status: 'online',  activeChats: 6, calls: 19, conversion: 74, ext: '103', wa: '+971501234569' },
  { id: 'a4', name: 'Khalid Ibrahim',   avatar: 'KI', photo: 'https://randomuser.me/api/portraits/men/45.jpg',   role: 'Agent',      status: 'offline', activeChats: 0, calls: 5,  conversion: 42, ext: '104', wa: '+971501234570' },
  { id: 'a5', name: 'Nour Al Rashid',   avatar: 'NR', photo: 'https://randomuser.me/api/portraits/women/12.jpg', role: 'Agent',      status: 'away',    activeChats: 1, calls: 3,  conversion: 61, ext: '105', wa: '+971501234571' },
  { id: 'a6', name: 'Hassan Mahmoud',   avatar: 'HM', photo: 'https://randomuser.me/api/portraits/men/78.jpg',   role: 'Agent',      status: 'online',  activeChats: 3, calls: 15, conversion: 70, ext: '106', wa: '+971501234572' },
];

export const leads = [
  { id: 'l1', name: 'Mohammed Al Zayed', photo: 'https://randomuser.me/api/portraits/men/91.jpg',   phone: '+971556789012', email: 'mzayed@gmail.com',   source: 'WhatsApp', status: 'Hot',  budget: 'AED 2.5M', interest: '3BR Downtown',         assigned: 'a1', createdAt: '2026-05-10', lastContact: '2026-05-14 09:30' },
  { id: 'l2', name: 'Priya Sharma',      photo: 'https://randomuser.me/api/portraits/women/56.jpg', phone: '+971554321098', email: 'priya.s@email.com',  source: 'Call',     status: 'Warm', budget: 'AED 1.2M', interest: '2BR JVC',              assigned: 'a2', createdAt: '2026-05-09', lastContact: '2026-05-13 14:15' },
  { id: 'l3', name: 'James Thornton',    photo: 'https://randomuser.me/api/portraits/men/22.jpg',   phone: '+971559876543', email: 'j.thornton@corp.ae', source: 'SMS',      status: 'Cold', budget: 'AED 800K', interest: '1BR Dubai Marina',      assigned: 'a3', createdAt: '2026-05-08', lastContact: '2026-05-12 11:00' },
  { id: 'l4', name: 'Aisha Karimi',      photo: 'https://randomuser.me/api/portraits/women/33.jpg', phone: '+971552468135', email: 'aisha.k@me.com',     source: 'WhatsApp', status: 'Hot',  budget: 'AED 5M',   interest: 'Villa Palm',           assigned: 'a1', createdAt: '2026-05-11', lastContact: '2026-05-14 10:45' },
  { id: 'l5', name: 'Raj Patel',         photo: 'https://randomuser.me/api/portraits/men/55.jpg',   phone: '+971557654321', email: 'raj.p@biz.com',      source: 'Call',     status: 'Warm', budget: 'AED 1.8M', interest: '3BR Business Bay',     assigned: 'a6', createdAt: '2026-05-07', lastContact: '2026-05-13 16:30' },
  { id: 'l6', name: 'Elena Petrov',      photo: 'https://randomuser.me/api/portraits/women/79.jpg', phone: '+971553456789', email: 'e.petrov@eu.com',    source: 'Email',    status: 'New',  budget: 'AED 3.2M', interest: 'Penthouse DIFC',       assigned: 'a3', createdAt: '2026-05-12', lastContact: '2026-05-14 08:15' },
  { id: 'l7', name: 'Carlos Mendez',     photo: 'https://randomuser.me/api/portraits/men/64.jpg',   phone: '+971551234567', email: 'carlos@global.io',   source: 'WhatsApp', status: 'Warm', budget: 'AED 2M',   interest: '4BR Meydan',           assigned: 'a5', createdAt: '2026-05-06', lastContact: '2026-05-11 13:20' },
  { id: 'l8', name: 'Li Wei',            photo: 'https://randomuser.me/api/portraits/women/9.jpg',  phone: '+971558765432', email: 'l.wei@sino.hk',      source: 'Call',     status: 'Hot',  budget: 'AED 7M',   interest: 'Villa Emirates Hills', assigned: 'a2', createdAt: '2026-05-13', lastContact: '2026-05-14 11:30' },
];

export const conversations = [
  {
    id: 'c1', leadId: 'l1', leadName: 'Mohammed Al Zayed', channel: 'whatsapp',
    lastMessage: 'I am interested in the Downtown 3BR you mentioned.', time: '09:30', unread: 2,
    status: 'active', agentId: 'a1', agentName: 'Sara Khalid',
    messages: [
      { id: 'm1', from: 'lead', text: 'Hi, I saw your listing for Downtown.', time: '09:10', type: 'text' },
      { id: 'm2', from: 'agent', text: 'Hello Mohammed! Yes, we have beautiful 3BR units available. Budget range?', time: '09:12', type: 'text' },
      { id: 'm3', from: 'lead', text: 'Around 2.5M AED. What floor plans do you have?', time: '09:20', type: 'text' },
      { id: 'm4', from: 'agent', text: 'Perfect! Let me send you the brochure.', time: '09:22', type: 'text' },
      { id: 'm5', from: 'agent', text: '', time: '09:23', type: 'document', fileName: 'Downtown_3BR_Brochure.pdf', fileSize: '2.4 MB' },
      { id: 'm6', from: 'lead', text: 'I am interested in the Downtown 3BR you mentioned.', time: '09:30', type: 'text' },
    ]
  },
  {
    id: 'c2', leadId: 'l8', leadName: 'Li Wei', channel: 'call',
    lastMessage: 'Call ended · 14m 32s', time: '11:30', unread: 0,
    status: 'missed', agentId: 'a2', agentName: 'Omar Farooq',
    messages: [
      { id: 'm1', from: 'system', text: 'Inbound call from +971558765432', time: '11:15', type: 'call', duration: '14m 32s', recording: true },
      { id: 'm2', from: 'agent', text: 'Follow-up scheduled for tomorrow 10 AM.', time: '11:32', type: 'note', isInternal: true },
    ]
  },
  {
    id: 'c3', leadId: 'l2', leadName: 'Priya Sharma', channel: 'sms',
    lastMessage: 'Can I visit the JVC property this weekend?', time: '14:15', unread: 1,
    status: 'active', agentId: 'a2', agentName: 'Omar Farooq',
    messages: [
      { id: 'm1', from: 'lead', text: 'Hello, I got your number from a friend.', time: '13:50', type: 'text' },
      { id: 'm2', from: 'agent', text: 'Hi Priya! Welcome to Al Khail Real Estate. How can I help?', time: '13:55', type: 'text' },
      { id: 'm3', from: 'lead', text: 'I am looking for a 2BR in JVC under 1.2M.', time: '14:00', type: 'text' },
      { id: 'm4', from: 'agent', text: 'Great news! We have 3 units matching that. Let me share details.', time: '14:05', type: 'text' },
      { id: 'm5', from: 'lead', text: 'Can I visit the JVC property this weekend?', time: '14:15', type: 'text' },
    ]
  },
  {
    id: 'c4', leadId: 'l4', leadName: 'Aisha Karimi', channel: 'whatsapp',
    lastMessage: 'What is the service charge on the Palm Villa?', time: '10:45', unread: 3,
    status: 'ai', agentId: null, agentName: 'AI Agent',
    messages: [
      { id: 'm1', from: 'lead', text: 'Good morning! Interested in Palm Jumeirah villas.', time: '10:10', type: 'text' },
      { id: 'm2', from: 'ai', text: 'Good morning Aisha! I am the Al Khail AI assistant. Palm Jumeirah villas start from AED 4.5M. What size are you looking for?', time: '10:11', type: 'text' },
      { id: 'm3', from: 'lead', text: 'Budget around 5M. 4BR or 5BR.', time: '10:20', type: 'text' },
      { id: 'm4', from: 'ai', text: 'Excellent budget! We have 2 stunning villas available. Shall I send the details?', time: '10:21', type: 'text' },
      { id: 'm5', from: 'lead', text: 'What\'s the service charge on the Palm Villa?', time: '10:45', type: 'text' },
    ]
  },
  {
    id: 'c5', leadId: 'l6', leadName: 'Elena Petrov', channel: 'email',
    lastMessage: 'Thank you for the brochure. I have a few questions.', time: '08:15', unread: 1,
    status: 'active', agentId: 'a3', agentName: 'Fatima Zahra',
    messages: [
      { id: 'm1', from: 'lead', text: 'Dear Team, I am interested in DIFC penthouses. Please send details.', time: '2026-05-13 09:00', type: 'email', subject: 'DIFC Penthouse Inquiry' },
      { id: 'm2', from: 'agent', text: 'Dear Elena, Thank you for your interest. I am attaching our latest penthouse brochure. Best regards, Fatima', time: '2026-05-13 10:30', type: 'email', subject: 'Re: DIFC Penthouse Inquiry' },
      { id: 'm3', from: 'lead', text: 'Thank you for the brochure. I have a few questions about the payment plan.', time: '2026-05-14 08:15', type: 'email', subject: 'Re: DIFC Penthouse Inquiry' },
    ]
  },
  {
    id: 'c6', leadId: 'l3', leadName: 'James Thornton', channel: 'call',
    lastMessage: 'Outbound call · No answer', time: '11:00', unread: 0,
    status: 'closed', agentId: 'a3', agentName: 'Fatima Zahra',
    messages: [
      { id: 'm1', from: 'system', text: 'Outbound call to +971559876543', time: '11:00', type: 'call', duration: 'No answer', recording: false },
    ]
  },
];

export const callLogs = [
  { id: 'cl1', lead: 'Mohammed Al Zayed', phone: '+971556789012', agent: 'Sara Khalid', direction: 'inbound',  duration: '8m 45s', time: '2026-05-14 09:15', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '101' },
  { id: 'cl2', lead: 'Li Wei',            phone: '+971558765432', agent: 'Omar Farooq', direction: 'inbound',  duration: '14m 32s',time: '2026-05-14 11:15', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '102' },
  { id: 'cl3', lead: 'James Thornton',    phone: '+971559876543', agent: 'Fatima Zahra',direction: 'outbound', duration: 'No answer',time: '2026-05-14 11:00',status: 'missed',    hasRecording: false, hasTranscript: false, ext: '103' },
  { id: 'cl4', lead: 'Raj Patel',         phone: '+971557654321', agent: 'Hassan Mahmoud',direction:'inbound', duration: '5m 12s', time: '2026-05-13 16:20', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '106' },
  { id: 'cl5', lead: 'Aisha Karimi',      phone: '+971552468135', agent: 'Sara Khalid', direction: 'outbound', duration: '12m 08s',time: '2026-05-13 10:30', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '101' },
  { id: 'cl6', lead: 'Priya Sharma',      phone: '+971554321098', agent: 'Omar Farooq', direction: 'outbound', duration: 'Voicemail',time: '2026-05-13 09:00',status: 'voicemail', hasRecording: true,  hasTranscript: false, ext: '102' },
  { id: 'cl7', lead: 'Carlos Mendez',     phone: '+971551234567', agent: 'Nour Al Rashid',direction:'inbound', duration: '3m 58s', time: '2026-05-12 13:15', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '105' },
  { id: 'cl8', lead: 'Elena Petrov',      phone: '+971553456789', agent: 'Fatima Zahra',direction: 'outbound', duration: '9m 20s', time: '2026-05-12 11:45', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '103' },
];

export const sampleTranscript = [
  { speaker: 'Agent',  text: 'Good morning, this is Sara from Al Khail Real Estate. May I speak with Mohammed?' },
  { speaker: 'Lead',   text: 'Yes, speaking. Hello Sara.' },
  { speaker: 'Agent',  text: 'Hello Mohammed! Thank you for your interest in our Downtown listings. I wanted to discuss the 3-bedroom unit you were looking at.' },
  { speaker: 'Lead',   text: 'Yes of course. I am very interested. What is the exact price?' },
  { speaker: 'Agent',  text: 'The unit is listed at AED 2.45 million. It is on the 18th floor with a stunning Burj Khalifa view.' },
  { speaker: 'Lead',   text: 'That sounds wonderful. Is there a payment plan available?' },
  { speaker: 'Agent',  text: 'Absolutely! We have a 40/60 payment plan with the developer. 40% during construction, 60% on handover.' },
  { speaker: 'Lead',   text: 'When is the handover date?' },
  { speaker: 'Agent',  text: 'Q4 2027. The project is currently 65% complete.' },
  { speaker: 'Lead',   text: 'Good. Can I schedule a visit to the showroom?' },
];

export const whatsappSessions = [
  { id: 'ws1', agentId: 'a1', agentName: 'Sara Khalid',     number: '+971501234567', status: 'connected',     messages: 28, lastSync: '2 min ago',   battery: 85 },
  { id: 'ws2', agentId: 'a2', agentName: 'Omar Farooq',     number: '+971501234568', status: 'connected',     messages: 14, lastSync: '5 min ago',   battery: 62 },
  { id: 'ws3', agentId: 'a3', agentName: 'Fatima Zahra',    number: '+971501234569', status: 'connected',     messages: 41, lastSync: 'Just now',     battery: 94 },
  { id: 'ws4', agentId: 'a4', agentName: 'Khalid Ibrahim',  number: '+971501234570', status: 'disconnected',  messages: 0,  lastSync: '3 hrs ago',    battery: 12 },
  { id: 'ws5', agentId: 'a5', agentName: 'Nour Al Rashid',  number: '+971501234571', status: 'connecting',    messages: 7,  lastSync: '1 min ago',    battery: 78 },
  { id: 'ws6', agentId: 'a6', agentName: 'Hassan Mahmoud',  number: '+971501234572', status: 'connected',     messages: 19, lastSync: '8 min ago',   battery: 55 },
];

export const dashboardStats = {
  totalLeads: 247,
  activeConversations: 18,
  callsToday: 64,
  conversionRate: 34,
  aiHandled: 42,
  avgResponseTime: '4m 12s',
  missedCalls: 7,
  openTickets: 23,
};

export const channelVolume = [
  { channel: 'WhatsApp', count: 89 },
  { channel: 'Calls',    count: 64 },
  { channel: 'SMS',      count: 47 },
  { channel: 'Email',    count: 31 },
];

export const recentActivity = [
  { id: 1, type: 'call',     text: 'Li Wei called — 14m 32s',             time: '11:30', agent: 'Omar Farooq',   icon: 'phone' },
  { id: 2, type: 'whatsapp', text: 'New WhatsApp from Aisha Karimi',       time: '10:45', agent: 'AI Agent',       icon: 'message' },
  { id: 3, type: 'sms',      text: 'SMS reply from Priya Sharma',          time: '14:15', agent: 'Omar Farooq',   icon: 'sms' },
  { id: 4, type: 'ai',       text: 'AI handed off to Sara (Mohammed)',     time: '09:28', agent: 'AI → Sara',      icon: 'ai' },
  { id: 5, type: 'call',     text: 'Missed call — James Thornton',         time: '11:00', agent: 'Fatima Zahra',  icon: 'phone' },
  { id: 6, type: 'email',    text: 'New email from Elena Petrov',          time: '08:15', agent: 'Fatima Zahra',  icon: 'email' },
];

export const properties = [
  { id: 'p1', name: 'Downtown Dubai 3BR',  price: 'AED 2.45M', floor: '18th', view: 'Burj Khalifa', handover: 'Q4 2027', progress: 65 },
  { id: 'p2', name: 'JVC 2BR Apartment',   price: 'AED 1.15M', floor: '7th',  view: 'Pool',         handover: 'Q2 2026', progress: 90 },
  { id: 'p3', name: 'Palm Villa 5BR',       price: 'AED 12.5M', floor: 'G+1',  view: 'Sea',          handover: 'Ready',   progress: 100 },
  { id: 'p4', name: 'DIFC Penthouse 4BR',  price: 'AED 8.2M',  floor: '42nd', view: 'City',         handover: 'Q1 2028', progress: 40 },
];
