// =============================================
// Al Khail CRM - All Dummy Data
// =============================================

/** TechKhwa Solutions — vendor / integrator (proposal footer) */
export const companyInfo = {
  legalName: 'TechKhwa Solutions (Private) Limited',
  shortName: 'TechKhwa Solutions',
  website: 'https://techkhwasolutions.com',
  websiteAlt: 'https://techkhwa.com',
  phone: '+92 370 5495430',
  email: 'contact@techkhwasolutions.com',
  address: {
    line1: 'Office # 405, Rafay\'s Height Plaza, Abdara Road',
    line2: 'University Town, Peshawar',
    postal: '25000',
    region: 'Khyber Pakhtunkhwa',
    country: 'Pakistan',
  },
  client: 'Al Khail Real Estate',
  proposalDate: 'May 12, 2026',
  stack: {
    backend: 'Node.js + Express.js',
    database: 'MongoDB + Mongoose',
    realtime: 'Socket.io',
    queue: 'BullMQ + Redis',
    ai: 'OpenAI Whisper + GPT-4o (RAG)',
    frontend: 'React / React Native',
  },
}

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
  {
    id: 'c7', leadId: 'l8', leadName: 'Li Wei', channel: 'whatsapp',
    lastMessage: 'Can we schedule a virtual tour this week?', time: '10:30', unread: 1,
    status: 'active', agentId: 'a2', agentName: 'Omar Farooq',
    messages: [
      { id: 'm1', from: 'lead', text: 'Hello! I am interested in the Emirates Hills villa for AED 7M.', time: '09:50', type: 'text' },
      { id: 'm2', from: 'agent', text: 'Hi Li Wei! Great choice — it is a stunning property. Are you looking to invest or for personal use?', time: '09:52', type: 'text' },
      { id: 'm3', from: 'lead', text: 'Investment primarily. What is the expected rental yield?', time: '10:05', type: 'text' },
      { id: 'm4', from: 'agent', text: 'Emirates Hills typically yields 5–7% gross annually. I can share a full ROI report.', time: '10:08', type: 'text' },
      { id: 'm5', from: 'lead', text: 'Please do. Can we schedule a virtual tour this week?', time: '10:30', type: 'text' },
    ]
  },
  {
    id: 'c8', leadId: 'l2', leadName: 'Priya Sharma', channel: 'whatsapp',
    lastMessage: 'Saturday 11 AM works perfectly, thank you!', time: '15:10', unread: 0,
    status: 'active', agentId: 'a3', agentName: 'Fatima Zahra',
    messages: [
      { id: 'm1', from: 'lead', text: 'Hi Fatima, I was referred to you for JVC 2BR listings.', time: '14:30', type: 'text' },
      { id: 'm2', from: 'agent', text: 'Hi Priya! Wonderful, I have 3 great options in JVC under 1.2M. Let me share details.', time: '14:32', type: 'text' },
      { id: 'm3', from: 'agent', text: '', time: '14:33', type: 'document', fileName: 'JVC_2BR_Options.pdf', fileSize: '1.8 MB' },
      { id: 'm4', from: 'lead', text: 'These look great! Can I visit one this weekend?', time: '15:00', type: 'text' },
      { id: 'm5', from: 'agent', text: 'Absolutely! Saturday 11 AM at the JVC show unit — I will send you the address.', time: '15:08', type: 'text' },
      { id: 'm6', from: 'lead', text: 'Saturday 11 AM works perfectly, thank you!', time: '15:10', type: 'text' },
    ]
  },
  {
    id: 'c9', leadId: 'l7', leadName: 'Carlos Mendez', channel: 'whatsapp',
    lastMessage: 'Looking forward to the site visit on Saturday!', time: '08:55', unread: 0,
    status: 'active', agentId: 'a5', agentName: 'Nour Al Rashid',
    messages: [
      { id: 'm1', from: 'lead', text: 'Hello, I want to know more about the Meydan 4BR project.', time: '08:00', type: 'text' },
      { id: 'm2', from: 'agent', text: 'Hi Carlos! The Meydan 4BR is priced at AED 2M with a 20/80 payment plan. Very competitive for the area.', time: '08:05', type: 'text' },
      { id: 'm3', from: 'lead', text: 'What is the handover timeline?', time: '08:20', type: 'text' },
      { id: 'm4', from: 'agent', text: 'Expected Q2 2027. The project is 45% complete. Shall I book a site visit?', time: '08:30', type: 'text' },
      { id: 'm5', from: 'lead', text: 'Yes please — this Saturday if possible.', time: '08:50', type: 'text' },
      { id: 'm6', from: 'agent', text: 'Done! Saturday 10 AM at Meydan Avenue Gate 3. See you then!', time: '08:53', type: 'text' },
      { id: 'm7', from: 'lead', text: 'Looking forward to the site visit on Saturday!', time: '08:55', type: 'text' },
    ]
  },
  {
    id: 'c10', leadId: 'l5', leadName: 'Raj Patel', channel: 'whatsapp',
    lastMessage: 'Send me the payment schedule please.', time: '16:45', unread: 2,
    status: 'active', agentId: 'a6', agentName: 'Hassan Mahmoud',
    messages: [
      { id: 'm1', from: 'lead', text: 'Hi, I am looking at the Business Bay 3BR listing.', time: '16:00', type: 'text' },
      { id: 'm2', from: 'agent', text: 'Hi Raj! Yes, AED 1.8M for a stunning city-view 3BR. Flexible payment options available.', time: '16:05', type: 'text' },
      { id: 'm3', from: 'lead', text: 'Is there a post-handover plan?', time: '16:20', type: 'text' },
      { id: 'm4', from: 'agent', text: 'Yes! 20/80 with 60% post-handover over 2 years. Very investor-friendly.', time: '16:25', type: 'text' },
      { id: 'm5', from: 'lead', text: 'Interesting. Send me the payment schedule please.', time: '16:45', type: 'text' },
    ]
  },
  {
    id: 'c11', leadId: 'l1', leadName: 'Mohammed Al Zayed', channel: 'whatsapp',
    lastMessage: 'Can Sara call me tomorrow at 10?', time: '13:40', unread: 1,
    status: 'active', agentId: 'a1', agentName: 'Sara Khalid',
    messages: [
      { id: 'm1', from: 'lead', text: 'Sara, I reviewed the brochure you sent. Very impressed!', time: '13:00', type: 'text' },
      { id: 'm2', from: 'agent', text: 'That is wonderful Mohammed! The 18th floor unit with the Burj view is truly special.', time: '13:05', type: 'text' },
      { id: 'm3', from: 'lead', text: 'I want to move forward. What is the next step?', time: '13:20', type: 'text' },
      { id: 'm4', from: 'agent', text: 'Next step is a reservation form and AED 50K token payment to secure the unit. Shall I prepare the paperwork?', time: '13:30', type: 'text' },
      { id: 'm5', from: 'lead', text: 'Can Sara call me tomorrow at 10?', time: '13:40', type: 'text' },
    ]
  },
];

export const callLogs = [
  { id: 'cl1', lead: 'Mohammed Al Zayed', phone: '+971556789012', agent: 'Sara Khalid',     direction: 'inbound',  duration: '8m 45s',   time: '2026-05-14 09:15', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '101', aiHandled: false },
  { id: 'cl2', lead: 'Li Wei',            phone: '+971558765432', agent: 'Omar Farooq',     direction: 'inbound',  duration: '14m 32s',  time: '2026-05-14 11:15', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '102', aiHandled: true  },
  { id: 'cl3', lead: 'James Thornton',    phone: '+971559876543', agent: 'Fatima Zahra',    direction: 'outbound', duration: 'No answer', time: '2026-05-14 11:00', status: 'missed',    hasRecording: false, hasTranscript: false, ext: '103', aiHandled: false },
  { id: 'cl4', lead: 'Raj Patel',         phone: '+971557654321', agent: 'Hassan Mahmoud',  direction: 'inbound',  duration: '5m 12s',   time: '2026-05-13 16:20', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '106', aiHandled: true  },
  { id: 'cl5', lead: 'Aisha Karimi',      phone: '+971552468135', agent: 'Sara Khalid',     direction: 'outbound', duration: '12m 08s',  time: '2026-05-13 10:30', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '101', aiHandled: false },
  { id: 'cl6', lead: 'Priya Sharma',      phone: '+971554321098', agent: 'Omar Farooq',     direction: 'outbound', duration: 'Voicemail', time: '2026-05-13 09:00', status: 'voicemail', hasRecording: true,  hasTranscript: false, ext: '102', aiHandled: true  },
  { id: 'cl7', lead: 'Carlos Mendez',     phone: '+971551234567', agent: 'Nour Al Rashid',  direction: 'inbound',  duration: '3m 58s',   time: '2026-05-12 13:15', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '105', aiHandled: false },
  { id: 'cl8', lead: 'Elena Petrov',      phone: '+971553456789', agent: 'Fatima Zahra',    direction: 'outbound', duration: '9m 20s',   time: '2026-05-12 11:45', status: 'answered',  hasRecording: true,  hasTranscript: true,  ext: '103', aiHandled: true  },
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

// ---- AI RAG Knowledge Base ----

export const knowledgeBaseDocuments = [
  {
    id: 'kb1', title: 'Downtown Dubai 3BR — Full Brochure', type: 'property', propertyId: 'p1',
    size: '2.4 MB', pages: 12, status: 'indexed', chunks: 48,
    lastUpdated: '2026-05-10', uploadedBy: 'Ahmed Al Mansouri',
    topics: ['Pricing', 'Payment Plan', 'Floor Plans', 'Handover Date', 'Burj View'],
  },
  {
    id: 'kb2', title: 'JVC 2BR — Floor Plans & Pricing Sheet', type: 'property', propertyId: 'p2',
    size: '1.8 MB', pages: 8, status: 'indexed', chunks: 32,
    lastUpdated: '2026-05-08', uploadedBy: 'Fatima Zahra',
    topics: ['Pricing', 'Floor Plans', 'Amenities', 'Community Map'],
  },
  {
    id: 'kb3', title: 'Palm Villa 5BR — Complete Sales Package', type: 'property', propertyId: 'p3',
    size: '5.1 MB', pages: 24, status: 'indexed', chunks: 96,
    lastUpdated: '2026-05-12', uploadedBy: 'Ahmed Al Mansouri',
    topics: ['Pricing', 'Service Charges', 'Sea View', 'Ready Unit', 'Title Deed'],
  },
  {
    id: 'kb4', title: 'DIFC Penthouse 4BR — Investment Guide', type: 'property', propertyId: 'p4',
    size: '3.3 MB', pages: 16, status: 'indexed', chunks: 64,
    lastUpdated: '2026-05-11', uploadedBy: 'Ahmed Al Mansouri',
    topics: ['Pricing', 'ROI Analysis', 'Payment Plan', 'City View', 'Premium Finish'],
  },
  {
    id: 'kb5', title: 'Al Khail Real Estate — General FAQ', type: 'faq', propertyId: null,
    size: '0.2 MB', pages: 4, status: 'indexed', chunks: 28,
    lastUpdated: '2026-05-01', uploadedBy: 'Ahmed Al Mansouri',
    topics: ['Office Hours', 'Contact Info', 'Mortgage', 'Foreign Ownership', 'Viewing Process'],
  },
  {
    id: 'kb6', title: 'Payment Plans & DLD Registration Fees', type: 'policy', propertyId: null,
    size: '0.4 MB', pages: 6, status: 'indexed', chunks: 36,
    lastUpdated: '2026-05-05', uploadedBy: 'Fatima Zahra',
    topics: ['40/60 Plan', 'Post-Handover', 'DLD 4%', 'Agency Fee', 'Oqood'],
  },
  {
    id: 'kb7', title: 'Service Charges Comparison — All Units', type: 'pricing', propertyId: null,
    size: '0.1 MB', pages: 2, status: 'indexed', chunks: 12,
    lastUpdated: '2026-05-09', uploadedBy: 'Ahmed Al Mansouri',
    topics: ['Service Charge Per SQFT', 'Annual Fees', 'RERA Rates'],
  },
  {
    id: 'kb8', title: 'Dubai Property Market Report Q1 2026', type: 'report', propertyId: null,
    size: '4.2 MB', pages: 32, status: 'processing', chunks: 0,
    lastUpdated: '2026-05-14', uploadedBy: 'Ahmed Al Mansouri',
    topics: [],
  },
];

export const aiSessionStats = {
  totalToday: 42,
  handedOff: 8,
  resolved: 34,
  avgSessionLength: '6m 14s',
  topicAccuracy: 94.2,
  totalChunks: 316,
  documentsIndexed: 7,
  avgResponseMs: 1240,
};

export const aiRecentSessions = [
  {
    id: 'as1', lead: 'Aisha Karimi', channel: 'whatsapp', date: '2026-05-14',
    start: '10:10', end: '10:46', messages: 5, outcome: 'handoff', ragSources: ['kb3', 'kb5'],
    summary: 'Palm Villa inquiry — service charge question escalated to human.',
    chatLog: [
      { speaker: 'Lead', text: 'Hi, I am interested in the Palm Villa 5BR. Can you tell me about the annual service charge?', time: '10:10' },
      { speaker: 'AI',   text: 'Hello! The Palm Villa 5BR is priced at AED 5M with a private pool and premium finishes. Could you share your purchase timeline?', time: '10:12' },
      { speaker: 'Lead', text: 'ASAP. What is the exact annual service charge figure?', time: '10:15' },
      { speaker: 'AI',   text: 'I have full specs and payment plans available, however the exact service charge figure is not in my knowledge base right now. I will connect you with a specialist who can provide this immediately.', time: '10:44' },
      { speaker: 'Lead', text: 'Okay, please do.', time: '10:46' },
    ],
  },
  {
    id: 'as2', lead: 'New Lead', channel: 'whatsapp', date: '2026-05-14',
    start: '09:50', end: '10:02', messages: 4, outcome: 'resolved', ragSources: ['kb1'],
    summary: 'General Downtown 3BR availability — brochure sent via RAG.',
    chatLog: [
      { speaker: 'Lead', text: 'Hello, do you have any 3BR units available in Downtown Dubai?', time: '09:50' },
      { speaker: 'AI',   text: 'Yes! We have two 3BR units available — 14th floor at AED 2.2M and 18th floor with Burj Khalifa view at AED 2.45M. Shall I send the brochure?', time: '09:52' },
      { speaker: 'Lead', text: 'Yes, please send the brochure for the 18th floor unit.', time: '09:58' },
      { speaker: 'AI',   text: 'Brochure sent! It includes floor plans, 40/60 payment plan, and Q4 2027 handover date. Anything else you would like to know?', time: '10:02' },
    ],
  },
  {
    id: 'as3', lead: 'Mohammed Al Zayed', channel: 'call', date: '2026-05-14',
    start: '09:15', end: '09:28', messages: 6, outcome: 'handoff', ragSources: ['kb1', 'kb6', 'kb5'],
    summary: 'Budget AED 2.5M confirmed — booked Sara for follow-up.',
    chatLog: [
      { speaker: 'Lead', text: 'Hi, I am calling about your Downtown listings.', time: '09:15' },
      { speaker: 'AI',   text: 'Good morning! Thank you for calling Al Khail Real Estate. I am the AI assistant. How can I help you today?', time: '09:15' },
      { speaker: 'Lead', text: 'I want to know about 3BR units. My budget is around AED 2.5 million.', time: '09:18' },
      { speaker: 'AI',   text: 'Excellent! At AED 2.5M you have great options in Downtown — we have a 3BR on the 18th floor at AED 2.45M with 40/60 plan and Q4 2027 handover. Shall I book you with our specialist Sara Khalid?', time: '09:20' },
      { speaker: 'Lead', text: 'Yes, please connect me with Sara.', time: '09:25' },
      { speaker: 'AI',   text: 'Sara will call you back within the hour. Your reference is MOH-001. Thank you Mohammed!', time: '09:28' },
    ],
  },
  {
    id: 'as4', lead: 'Anonymous', channel: 'whatsapp', date: '2026-05-14',
    start: '08:45', end: '08:51', messages: 3, outcome: 'resolved', ragSources: ['kb5'],
    summary: 'Office hours question — FAQ resolved instantly.',
    chatLog: [
      { speaker: 'Lead', text: 'What are your office hours?', time: '08:45' },
      { speaker: 'AI',   text: 'Our office is open Sunday–Thursday 9:00 AM–6:00 PM and Saturday 10:00 AM–2:00 PM GST. Closed Fridays. You can reach us 24/7 via WhatsApp for property inquiries!', time: '08:46' },
      { speaker: 'Lead', text: 'Thank you!', time: '08:51' },
    ],
  },
  {
    id: 'as5', lead: 'Carlos Mendez', channel: 'call', date: '2026-05-14',
    start: '08:30', end: '08:52', messages: 7, outcome: 'handoff', ragSources: ['kb5', 'kb6'],
    summary: 'Meydan 4BR inquiry — site visit request escalated to human.',
    chatLog: [
      { speaker: 'Lead', text: 'Good morning. I am interested in a 4BR in Meydan.', time: '08:30' },
      { speaker: 'AI',   text: 'Good morning! We have an excellent 4BR villa in Meydan at AED 2M — private garden, close to the racetrack. Would you like full specs?', time: '08:32' },
      { speaker: 'Lead', text: 'Yes, and can I schedule a site visit this week?', time: '08:40' },
      { speaker: 'AI',   text: 'I can share all property details now. For scheduling on-site visits, I will need to connect you with an agent who handles viewings directly.', time: '08:45' },
      { speaker: 'Lead', text: 'I need to visit before end of week.', time: '08:48' },
      { speaker: 'AI',   text: 'Understood — escalating to our team now. An agent will call you within 30 minutes to confirm your viewing slot.', time: '08:50' },
      { speaker: 'Lead', text: 'Perfect, thank you.', time: '08:52' },
    ],
  },
  {
    id: 'as6', lead: 'New Lead', channel: 'whatsapp', date: '2026-05-14',
    start: '07:55', end: '08:03', messages: 4, outcome: 'resolved', ragSources: ['kb6'],
    summary: 'Payment plan structure explained — 40/60 plan details provided.',
    chatLog: [
      { speaker: 'Lead', text: 'What payment plans do you offer?', time: '07:55' },
      { speaker: 'AI',   text: 'We offer flexible developer plans! Most popular is the 40/60 plan — 40% during construction, 60% on handover. Some projects offer 20/80. Which project are you interested in?', time: '07:57' },
      { speaker: 'Lead', text: 'The Business Bay 3BR.', time: '08:00' },
      { speaker: 'AI',   text: 'Business Bay 3BR at AED 1.8M has a 20/80 plan — AED 360K on booking, AED 1.44M on handover Q3 2027. DLD fees: 4% = AED 72,000. Shall I send the full breakdown?', time: '08:03' },
    ],
  },
  {
    id: 'as7', lead: 'Unknown', channel: 'sms', date: '2026-05-14',
    start: '07:30', end: '07:33', messages: 2, outcome: 'resolved', ragSources: ['kb5'],
    summary: 'Foreign ownership eligibility question — answered from FAQ.',
    chatLog: [
      { speaker: 'Lead', text: 'Can foreigners buy property in Dubai?', time: '07:30' },
      { speaker: 'AI',   text: 'Yes! Dubai allows 100% foreign ownership in designated freehold areas including Downtown Dubai, Business Bay, Dubai Marina, JVC and more. No nationality restrictions. DLD registration fees apply (4%). Interested in available properties?', time: '07:33' },
    ],
  },
  {
    id: 'as8', lead: 'Raj Patel', channel: 'sms', date: '2026-05-13',
    start: '16:00', end: '16:18', messages: 4, outcome: 'resolved', ragSources: ['kb6'],
    summary: 'Business Bay payment schedule requested — full breakdown sent via SMS.',
    chatLog: [
      { speaker: 'Lead', text: 'Hi can you tell me the DLD fees for Business Bay 3BR?', time: '16:00' },
      { speaker: 'AI',   text: 'Hi Raj! DLD fees for the Business Bay 3BR at AED 1.8M are 4% = AED 72,000. One-time government registration fee paid on transfer.', time: '16:03' },
      { speaker: 'Lead', text: 'What about the payment plan?', time: '16:10' },
      { speaker: 'AI',   text: '20/80 plan: AED 360,000 on booking (20%), then AED 1,440,000 on handover Q3 2027 (80%). No instalments during construction — very investor-friendly!', time: '16:18' },
    ],
  },
  {
    id: 'as9', lead: 'Li Wei', channel: 'whatsapp', date: '2026-05-13',
    start: '14:00', end: '14:22', messages: 5, outcome: 'handoff', ragSources: ['kb3', 'kb5'],
    summary: 'Emirates Hills villa investment inquiry — ROI query escalated to agent.',
    chatLog: [
      { speaker: 'Lead', text: 'Hello, I am interested in the Emirates Hills villa at AED 7M as an investment. What is the rental yield?', time: '14:00' },
      { speaker: 'AI',   text: 'Good afternoon! Emirates Hills delivers 5–7% gross rental yield annually — among the highest in Dubai. 6BR villa, private pool, golf course views. Shall I send the investment report?', time: '14:03' },
      { speaker: 'Lead', text: 'Yes please. Also who should I speak to for detailed ROI projections?', time: '14:08' },
      { speaker: 'AI',   text: 'Sending the report now. For detailed projections I will connect you with Omar Farooq, our senior investment specialist.', time: '14:15' },
      { speaker: 'Lead', text: 'Great, thank you.', time: '14:22' },
    ],
  },
  {
    id: 'as10', lead: 'Elena Petrov', channel: 'call', date: '2026-05-13',
    start: '09:00', end: '09:12', messages: 4, outcome: 'resolved', ragSources: ['kb1'],
    summary: 'DIFC penthouse call — payment plan and specifications provided from RAG.',
    chatLog: [
      { speaker: 'Lead', text: 'Hi, I am calling about the DIFC penthouse.', time: '09:00' },
      { speaker: 'AI',   text: 'Good morning! Our DIFC Penthouse is a 4BR on the 42nd floor at AED 8.2M — panoramic city views. What would you like to know?', time: '09:01' },
      { speaker: 'Lead', text: 'What are the finish specifications?', time: '09:05' },
      { speaker: 'AI',   text: 'Italian marble flooring, Gaggenau appliances, smart home automation, and floor-to-ceiling glazing. Handover Q2 2027 with a 30/70 developer plan. I can email you the full spec sheet — what is your address?', time: '09:10' },
      { speaker: 'Lead', text: 'e.petrov@eu.com. Thank you!', time: '09:12' },
    ],
  },
];

export const aiHandoffQueue = [
  {
    id: 'hq1', leadId: 'l4', leadName: 'Aisha Karimi',
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    channel: 'whatsapp', aiStarted: '10:10', handoffAt: '10:46',
    assignedTo: null, priority: 'high',
    aiSummary: 'Lead is interested in Palm Jumeirah 4–5BR villas. Budget confirmed at AED 5M. She asked for the annual service charge on the Palm Villa unit — the AI did not have this specific figure in the knowledge base and escalated. Lead sentiment is positive and purchase intent is HIGH.',
    qualifiedFields: { budget: 'AED 5M', interest: 'Palm Villa 4–5BR', timeline: 'ASAP', source: 'WhatsApp' },
    pendingQuestion: 'What is the annual service charge on the Palm Villa?',
    ragSourcesUsed: ['kb3', 'kb5'],
    suggestedAgent: 'a1',
  },
  {
    id: 'hq2', leadId: 'l7', leadName: 'Carlos Mendez',
    photo: 'https://randomuser.me/api/portraits/men/64.jpg',
    channel: 'sms', aiStarted: '08:30', handoffAt: '08:52',
    assignedTo: null, priority: 'medium',
    aiSummary: 'Lead inquired about 4BR units in Meydan. Budget AED 2M. Has been browsing online listings and reached out via SMS. Requested to schedule an on-site visit — AI cannot book visits and escalated. Moderate purchase intent.',
    qualifiedFields: { budget: 'AED 2M', interest: 'Meydan 4BR', timeline: 'This month', source: 'SMS' },
    pendingQuestion: 'Can I schedule a site visit this week?',
    ragSourcesUsed: ['kb5', 'kb6'],
    suggestedAgent: 'a5',
  },
];

export const emailAccounts = [
  { id: 'ea1', label: 'info@alkhailre.ae',    provider: 'Gmail',   status: 'connected', unread: 12, total: 184, lastSync: '1 min ago'  },
  { id: 'ea2', label: 'sales@alkhailre.ae',   provider: 'Outlook', status: 'connected', unread: 5,  total: 97,  lastSync: '3 min ago'  },
  { id: 'ea3', label: 'support@alkhailre.ae', provider: 'Gmail',   status: 'connected', unread: 3,  total: 61,  lastSync: 'Just now'   },
  { id: 'ea4', label: 'noreply@alkhailre.ae', provider: 'SMTP',    status: 'send-only', unread: 0,  total: 0,   lastSync: '10 min ago' },
]

export const emailThreads = [
  {
    id: 'et1', leadName: 'Elena Petrov', leadPhoto: 'https://randomuser.me/api/portraits/women/79.jpg',
    email: 'e.petrov@eu.com', account: 'sales@alkhailre.ae', agentName: 'Fatima Zahra',
    subject: 'DIFC Penthouse Inquiry', time: '08:15', unread: 1, starred: true,
    messages: [
      { id: 'em1', from: 'lead', fromName: 'Elena Petrov', time: '2026-05-13 09:00', subject: 'DIFC Penthouse Inquiry', body: 'Dear Team,\n\nI am interested in DIFC penthouses. Please send details on available units, pricing, and payment plans.\n\nBest regards,\nElena Petrov' },
      { id: 'em2', from: 'agent', fromName: 'Fatima Zahra', time: '2026-05-13 10:30', subject: 'Re: DIFC Penthouse Inquiry', body: 'Dear Elena,\n\nThank you for your interest in our DIFC penthouses. I am attaching our latest penthouse brochure which includes pricing for our 4BR unit at AED 8.2M on the 42nd floor with panoramic city views.\n\nBest regards,\nFatima Zahra\nAl Khail Real Estate' },
      { id: 'em3', from: 'lead', fromName: 'Elena Petrov', time: '2026-05-14 08:15', subject: 'Re: DIFC Penthouse Inquiry', body: 'Dear Fatima,\n\nThank you for the brochure. I have a few questions about the payment plan and the finish specifications. Could we schedule a call this week?\n\nBest,\nElena' },
    ],
  },
  {
    id: 'et2', leadName: 'James Thornton', leadPhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
    email: 'j.thornton@corp.ae', account: 'info@alkhailre.ae', agentName: 'Fatima Zahra',
    subject: 'Dubai Marina 1BR — Availability Check', time: '11:42', unread: 2, starred: false,
    messages: [
      { id: 'em1', from: 'lead', fromName: 'James Thornton', time: '2026-05-14 11:00', subject: 'Dubai Marina 1BR — Availability Check', body: 'Hello,\n\nI came across your listing for a 1BR in Dubai Marina at AED 800K. Is this still available? What is included in the service charge?\n\nRegards,\nJames Thornton' },
      { id: 'em2', from: 'lead', fromName: 'James Thornton', time: '2026-05-14 11:42', subject: 'Dubai Marina 1BR — Availability Check', body: 'Just following up on my email below. Please do let me know as I have a few other properties I am comparing.\n\nJames' },
    ],
  },
  {
    id: 'et3', leadName: 'Li Wei', leadPhoto: 'https://randomuser.me/api/portraits/women/9.jpg',
    email: 'l.wei@sino.hk', account: 'sales@alkhailre.ae', agentName: 'Omar Farooq',
    subject: 'Emirates Hills Villa — Investment Enquiry', time: '09:05', unread: 0, starred: true,
    messages: [
      { id: 'em1', from: 'lead', fromName: 'Li Wei', time: '2026-05-13 14:00', subject: 'Emirates Hills Villa — Investment Enquiry', body: 'Good afternoon,\n\nI am a property investor based in Hong Kong. I am looking at the Emirates Hills villa listed at AED 7M. Can you share the ROI projections and rental yield history for this area?\n\nBest,\nLi Wei' },
      { id: 'em2', from: 'agent', fromName: 'Omar Farooq', time: '2026-05-13 15:30', subject: 'Re: Emirates Hills Villa — Investment Enquiry', body: 'Dear Li Wei,\n\nThank you for reaching out. Emirates Hills consistently delivers 5–7% gross rental yield. I have attached a full investment report and the villa title deed summary for your review.\n\nWarm regards,\nOmar Farooq\nAl Khail Real Estate' },
      { id: 'em3', from: 'lead', fromName: 'Li Wei', time: '2026-05-14 09:05', subject: 'Re: Emirates Hills Villa — Investment Enquiry', body: 'Thank you Omar. The report looks very promising. Can you arrange a virtual tour? I will be visiting Dubai in June and would like to schedule a physical viewing too.\n\nBest,\nLi Wei' },
    ],
  },
  {
    id: 'et4', leadName: 'Raj Patel', leadPhoto: 'https://randomuser.me/api/portraits/men/55.jpg',
    email: 'raj.p@biz.com', account: 'info@alkhailre.ae', agentName: 'Hassan Mahmoud',
    subject: 'Business Bay 3BR — Payment Plan Query', time: 'Yesterday', unread: 0, starred: false,
    messages: [
      { id: 'em1', from: 'lead', fromName: 'Raj Patel', time: '2026-05-13 16:00', subject: 'Business Bay 3BR — Payment Plan Query', body: 'Hi,\n\nI spoke with Hassan earlier today regarding the Business Bay 3BR. He mentioned a 20/80 plan. Could you please email me the full payment schedule and DLD fee breakdown?\n\nThanks,\nRaj' },
      { id: 'em2', from: 'agent', fromName: 'Hassan Mahmoud', time: '2026-05-13 16:45', subject: 'Re: Business Bay 3BR — Payment Plan Query', body: 'Hi Raj,\n\nPlease find attached the full payment schedule:\n- 20% on booking\n- 60% during construction (quarterly)\n- 20% on handover (Q3 2027)\n- DLD fee: 4% of AED 1.8M = AED 72,000\n\nLet me know if you need anything else!\n\nHassan Mahmoud' },
    ],
  },
  {
    id: 'et5', leadName: 'Carlos Mendez', leadPhoto: 'https://randomuser.me/api/portraits/men/64.jpg',
    email: 'carlos@global.io', account: 'sales@alkhailre.ae', agentName: 'Nour Al Rashid',
    subject: 'Meydan 4BR — Site Visit Request', time: 'Yesterday', unread: 0, starred: false,
    messages: [
      { id: 'em1', from: 'lead', fromName: 'Carlos Mendez', time: '2026-05-13 09:20', subject: 'Meydan 4BR — Site Visit Request', body: 'Hello,\n\nFollowing up on our WhatsApp conversation. I would like to schedule a site visit to the Meydan 4BR this weekend if possible.\n\nCarlos Mendez' },
      { id: 'em2', from: 'agent', fromName: 'Nour Al Rashid', time: '2026-05-13 10:00', subject: 'Re: Meydan 4BR — Site Visit Request', body: 'Hi Carlos,\n\nAbsolutely! Saturday 17 May at 11:00 AM works perfectly. Our site office is located at Meydan Avenue, Gate 3. I will send you a calendar invite now.\n\nSee you then!\nNour Al Rashid' },
    ],
  },
]

export const sampleRagResponse = {
  query: 'What is the payment plan for Downtown Dubai 3BR?',
  answer: 'The Downtown Dubai 3BR unit is available on a 40/60 payment plan. You pay 40% during construction and the remaining 60% on handover, which is scheduled for Q4 2027. The unit is currently 65% complete. The listed price is AED 2.45 million. DLD registration fees of 4% apply separately.',
  sources: [
    { docId: 'kb1', title: 'Downtown Dubai 3BR — Full Brochure', excerpt: '40/60 payment plan · Handover Q4 2027 · 65% construction complete', relevance: 0.97 },
    { docId: 'kb6', title: 'Payment Plans & DLD Registration Fees', excerpt: 'DLD fee 4% of property value, payable at time of sale', relevance: 0.88 },
  ],
  confidence: 0.95,
  responseMs: 1180,
};
