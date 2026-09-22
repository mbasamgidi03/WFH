import type { WFHRequest, TicketLog, Report, Notification, Candidate, StatusCheck } from './types'

export const candidateNotifications: Notification[] = [
  { id: '1', text: 'Your WFH request for 22 Sep has been approved.', time: '09:15', read: false },
  { id: '2', text: 'Reminder: Submit your ticket log before 17:00.', time: '08:00', read: false },
  { id: '3', text: 'Your absence report for 18 Sep has been received.', time: 'Yesterday', read: true },
]

export const mentorNotifications: Notification[] = [
  { id: '1', text: 'Mbasa Mgidi submitted a WFH request for 23 Sep.', time: '10:02', read: false },
  { id: '2', text: 'Lungelo Dlamini submitted a WFH request for 24 Sep.', time: '09:30', read: false },
  { id: '3', text: 'Sipho Nkosi submitted 4 ticket logs today.', time: '08:47', read: true },
]

export const candidateWFHRequests: WFHRequest[] = [
  {
    id: 'wfh-1',
    date: '23 September 2026',
    submittedDate: '19 September 2026',
    status: 'Pending',
    reason: 'Ongoing home internet issues — fibre technician scheduled for that morning.',
    supportingInfo: 'ISP ticket ref #TKT-20260918',
  },
  {
    id: 'wfh-2',
    date: '22 September 2026',
    submittedDate: '17 September 2026',
    status: 'Approved',
    reason: 'Medical appointment in the morning, prefer to WFH for the remainder of the day.',
  },
  {
    id: 'wfh-3',
    date: '10 September 2026',
    submittedDate: '8 September 2026',
    status: 'Declined',
    reason: 'Need to attend a family matter at home.',
    mentorReason: 'Insufficient advance notice. Please submit WFH requests at least 48 hours before the requested date.',
  },
]

export const candidateTicketLogs: TicketLog[] = [
  {
    id: 'tl-1',
    title: 'Coursera – Software Development Module 1',
    description: 'Completed Module 1 of the Software Development course and passed the final assessment with 94%.',
    evidence: 'module-1-certificate.png',
    time: '09:15',
    date: '19 September 2026',
  },
  {
    id: 'tl-2',
    title: 'Java Practice – Inheritance Exercise',
    description: 'Completed the Java inheritance exercise set from the Demand Academy curriculum. Practiced method overriding and polymorphism.',
    evidence: 'java-exercise.png',
    time: '11:30',
    date: '19 September 2026',
  },
  {
    id: 'tl-3',
    title: 'Group Project Research',
    description: 'Conducted user requirement research with the team for the capstone project. Compiled findings into a shared document.',
    evidence: 'research-notes.pdf',
    time: '09:10',
    date: '18 September 2026',
  },
  {
    id: 'tl-4',
    title: 'Portfolio Update',
    description: 'Updated the Projects section of my portfolio site with the capstone project description and screenshots.',
    evidence: 'portfolio-update.png',
    time: '15:45',
    date: '18 September 2026',
  },
]

export const candidateReports: Report[] = [
  {
    id: 'r-1',
    type: 'lateness',
    reason: 'Public transport delays due to load shedding. The train schedule was disrupted.',
    time: '08:47',
    date: '19 September 2026',
  },
  {
    id: 'r-2',
    type: 'absence',
    reason: 'Ill with flu symptoms — visited a clinic and resting at home.',
    supportingInfo: 'medical-certificate.pdf',
    time: '08:05',
    date: '15 September 2026',
  },
  {
    id: 'r-3',
    type: 'absence',
    reason: 'Family bereavement. Will return on 9 September.',
    time: '07:55',
    date: '8 September 2026',
  },
]

export const cohorts = ['Demand Academy 1', 'Demand Academy 2', 'Software Dev Cohort A']

export const candidates: Candidate[] = [
  // Demand Academy 1 (20 candidates)
  { id: 'c-1',  name: 'Mbasa Mgidi',          initials: 'MM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'approved', registered: true,  registrationTime: '08:52' },
  { id: 'c-2',  name: 'Lungelo Dlamini',       initials: 'LD', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'approved', registered: true,  registrationTime: '09:03' },
  { id: 'c-3',  name: 'Sipho Nkosi',           initials: 'SN', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'approved', registered: false },
  { id: 'c-8',  name: 'Nomvula Hadebe',        initials: 'NH', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:44' },
  { id: 'c-9',  name: 'Bongani Mahlangu',      initials: 'BM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'approved', registered: true,  registrationTime: '08:59' },
  { id: 'c-10', name: 'Zanele Mthembu',        initials: 'ZM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:37' },
  { id: 'c-11', name: 'Lwazi Cele',            initials: 'LC', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '09:01' },
  { id: 'c-12', name: 'Thandeka Ntuli',        initials: 'TN', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:50' },
  { id: 'c-13', name: 'Siyanda Mkhize',        initials: 'SM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'approved', registered: true,  registrationTime: '09:10' },
  { id: 'c-14', name: 'Nokwanda Vilakazi',     initials: 'NV', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: false },
  { id: 'c-15', name: 'Melusi Buthelezi',      initials: 'MB', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:42' },
  { id: 'c-16', name: 'Ayanda Shabalala',      initials: 'AS', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:55' },
  { id: 'c-17', name: 'Gugulethu Mthethwa',   initials: 'GM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:48' },
  { id: 'c-18', name: 'Nhlanhla Zwane',        initials: 'NZ', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:33' },
  { id: 'c-19', name: 'Simphiwe Ngubane',      initials: 'SN', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '09:06' },
  { id: 'c-20', name: 'Thandolwethu Msweli',  initials: 'TM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: false },
  { id: 'c-21', name: 'Lungisa Qunta',         initials: 'LQ', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:40' },
  { id: 'c-22', name: 'Khanyisile Mhlongo',   initials: 'KM', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'approved', registered: true,  registrationTime: '09:02' },
  { id: 'c-23', name: 'Sandile Khumalo',       initials: 'SK', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:38' },
  { id: 'c-24', name: 'Phumzile Ngema',        initials: 'PN', cohort: 'Demand Academy 1', cohortCode: 'DA1', wfhStatus: 'office',   registered: true,  registrationTime: '08:51' },

  // Demand Academy 2 (20 candidates)
  { id: 'c-4',  name: 'Amahle Zulu',           initials: 'AZ', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'approved', registered: true,  registrationTime: '08:40' },
  { id: 'c-5',  name: 'Thabo Molefe',          initials: 'TM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:58' },
  { id: 'c-25', name: 'Dineo Motsepe',         initials: 'DM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:47' },
  { id: 'c-26', name: 'Lerato Mokoena',        initials: 'LM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'approved', registered: true,  registrationTime: '09:05' },
  { id: 'c-27', name: 'Tebogo Nkosi',          initials: 'TN', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:35' },
  { id: 'c-28', name: 'Keamogetswe Sithole',  initials: 'KS', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:53' },
  { id: 'c-29', name: 'Palesa Dlamini',        initials: 'PD', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'approved', registered: true,  registrationTime: '09:08' },
  { id: 'c-30', name: 'Tshepo Molefe',         initials: 'TM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: false },
  { id: 'c-31', name: 'Boitumelo Mahlangu',   initials: 'BM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:41' },
  { id: 'c-32', name: 'Mpho Radebe',           initials: 'MR', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:57' },
  { id: 'c-33', name: 'Refilwe Nkosi',         initials: 'RN', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'approved', registered: true,  registrationTime: '09:00' },
  { id: 'c-34', name: 'Tumelo Mokoena',        initials: 'TM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:44' },
  { id: 'c-35', name: 'Nthabiseng Vilakazi',  initials: 'NV', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:36' },
  { id: 'c-36', name: 'Sello Morena',          initials: 'SM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:49' },
  { id: 'c-37', name: 'Kgomotso Leburu',       initials: 'KL', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: false },
  { id: 'c-38', name: 'Lesego Tlhapi',         initials: 'LT', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '09:04' },
  { id: 'c-39', name: 'Amogelang Modise',      initials: 'AM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'approved', registered: true,  registrationTime: '08:43' },
  { id: 'c-40', name: 'Dikgang Serumula',      initials: 'DS', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:56' },
  { id: 'c-41', name: 'Masego Phiri',          initials: 'MP', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:39' },
  { id: 'c-42', name: 'Bonolo Makgoba',        initials: 'BM', cohort: 'Demand Academy 2', cohortCode: 'DA2', wfhStatus: 'office',   registered: true,  registrationTime: '08:54' },

  // Software Dev Cohort A (20 candidates)
  { id: 'c-6',  name: 'Nandi Khumalo',         initials: 'NK', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'approved', registered: true,  registrationTime: '08:45' },
  { id: 'c-7',  name: 'Karabo Sithole',        initials: 'KS', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'approved', registered: false },
  { id: 'c-43', name: 'Rethabile Mohlomi',     initials: 'RM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:50' },
  { id: 'c-44', name: 'Thandiswa Mgcina',      initials: 'TM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'approved', registered: true,  registrationTime: '09:07' },
  { id: 'c-45', name: 'Andile Majozi',         initials: 'AM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:38' },
  { id: 'c-46', name: 'Nokubonga Mthethwa',   initials: 'NM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:55' },
  { id: 'c-47', name: 'Sifiso Hadebe',         initials: 'SH', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:42' },
  { id: 'c-48', name: 'Yolanda Mnguni',        initials: 'YM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'approved', registered: true,  registrationTime: '09:01' },
  { id: 'c-49', name: 'Xolisile Ndlovu',       initials: 'XN', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:48' },
  { id: 'c-50', name: 'Nokukhanya Cele',       initials: 'NC', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: false },
  { id: 'c-51', name: 'Mxolisi Mthembu',       initials: 'MM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:36' },
  { id: 'c-52', name: 'Duduzile Ntanzi',       initials: 'DN', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:52' },
  { id: 'c-53', name: 'Thamsanqa Khoza',       initials: 'TK', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'approved', registered: true,  registrationTime: '09:04' },
  { id: 'c-54', name: 'Sithembile Buthelezi', initials: 'SB', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:40' },
  { id: 'c-55', name: 'Zwelakhe Ntuli',        initials: 'ZN', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:57' },
  { id: 'c-56', name: 'Nokuthula Mchunu',      initials: 'NM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:44' },
  { id: 'c-57', name: 'Siphamandla Luthuli',  initials: 'SL', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:33' },
  { id: 'c-58', name: 'Nobuhle Dlamini',       initials: 'ND', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'approved', registered: true,  registrationTime: '09:09' },
  { id: 'c-59', name: 'Langelihle Majola',     initials: 'LM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:46' },
  { id: 'c-60', name: 'Thobile Mkhize',        initials: 'TM', cohort: 'Software Dev Cohort A', cohortCode: 'SDA', wfhStatus: 'office',   registered: true,  registrationTime: '08:53' },
]

export const mentorWFHRequests: WFHRequest[] = [
  {
    id: 'mwfh-1',
    candidateName: 'Mbasa Mgidi',
    cohort: 'Demand Academy 1',
    date: '23 September 2026',
    submittedDate: '19 September 2026',
    status: 'Pending',
    reason: 'Ongoing home internet issues — fibre technician scheduled for that morning.',
    supportingInfo: 'ISP ticket ref #TKT-20260918',
  },
  {
    id: 'mwfh-2',
    candidateName: 'Lungelo Dlamini',
    cohort: 'Demand Academy 1',
    date: '24 September 2026',
    submittedDate: '19 September 2026',
    status: 'Pending',
    reason: "Doctor's appointment in the morning. Will be online from 10:00.",
  },
  {
    id: 'mwfh-3',
    candidateName: 'Nandi Khumalo',
    cohort: 'Software Dev Cohort A',
    date: '25 September 2026',
    submittedDate: '18 September 2026',
    status: 'Pending',
    reason: 'Home repairs scheduled — plumber visiting in the morning.',
  },
  {
    id: 'mwfh-4',
    candidateName: 'Amahle Zulu',
    cohort: 'Demand Academy 2',
    date: '22 September 2026',
    submittedDate: '17 September 2026',
    status: 'Approved',
    reason: 'Medical appointment.',
  },
  {
    id: 'mwfh-5',
    candidateName: 'Sipho Nkosi',
    cohort: 'Demand Academy 1',
    date: '18 September 2026',
    submittedDate: '16 September 2026',
    status: 'Declined',
    reason: 'Need to work from home due to load shedding.',
    mentorReason: 'Please use the office during scheduled load shedding. The campus has backup power.',
  },
]

export const candidateTicketLogsByPerson: Record<string, TicketLog[]> = {
  'c-1': [
    { id: 'tl-c1-1', title: 'Coursera – Software Development Module 1', description: 'Completed Module 1 and passed the assessment.', evidence: 'module-1-certificate.png', time: '09:15', date: '19 September 2026' },
    { id: 'tl-c1-2', title: 'Java Practice – Inheritance Exercise', description: 'Completed the Java inheritance exercise set. Practiced method overriding and polymorphism.', evidence: 'java-exercise.png', time: '11:30', date: '19 September 2026' },
    { id: 'tl-c1-3', title: 'Group Project Research', description: 'Conducted user requirement research with the team for the capstone project.', evidence: 'research-notes.pdf', time: '14:20', date: '19 September 2026' },
    { id: 'tl-c1-4', title: 'Portfolio Update', description: 'Updated the Projects section of the portfolio site with the capstone project.', evidence: 'portfolio-update.png', time: '16:05', date: '19 September 2026' },
  ],
  'c-2': [
    { id: 'tl-c2-1', title: 'Coursera – Data Analysis Module 3', description: 'Completed the data analysis module covering pandas and data cleaning.', evidence: 'da-module3.png', time: '09:45', date: '19 September 2026' },
    { id: 'tl-c2-2', title: 'SQL Practice – Joins and Aggregations', description: 'Worked through the SQL joins exercise and submitted via GitHub.', evidence: 'sql-exercise.png', time: '13:20', date: '19 September 2026' },
  ],
  'c-3': [
    { id: 'tl-c3-1', title: 'React Fundamentals – Components', description: 'Studied React component patterns and completed the tutorial exercises.', evidence: 'react-notes.pdf', time: '10:15', date: '19 September 2026' },
  ],
  'c-6': [
    { id: 'tl-c6-1', title: 'Git Branching Workshop', description: 'Completed the Git branching workshop and practised feature branch workflows.', evidence: 'git-workshop.png', time: '09:30', date: '19 September 2026' },
    { id: 'tl-c6-2', title: 'API Design – REST Principles', description: 'Read and summarised REST API design principles from the provided reading list.', evidence: 'api-notes.pdf', time: '11:00', date: '19 September 2026' },
    { id: 'tl-c6-3', title: 'Group Project – Sprint Planning', description: 'Participated in the sprint planning session and updated the project board.', evidence: 'sprint-board.png', time: '14:00', date: '19 September 2026' },
  ],
  'c-7': [],
}

export const candidateStatusChecks: Record<string, StatusCheck[]> = {
  'c-1': [
    { label: 'Before Lunch', sentTime: '09:42', respondedTime: '09:44' },
    { label: 'After Lunch', sentTime: '13:38', respondedTime: '13:40' },
  ],
  'c-2': [
    { label: 'Before Lunch', sentTime: '09:42', respondedTime: '09:47' },
    { label: 'After Lunch', sentTime: '13:38', respondedTime: undefined },
  ],
  'c-3': [
    { label: 'Before Lunch', sentTime: '09:42', respondedTime: '09:50' },
    { label: 'After Lunch', sentTime: '13:38', respondedTime: '13:45' },
  ],
  'c-6': [
    { label: 'Before Lunch', sentTime: '09:42', respondedTime: undefined },
    { label: 'After Lunch', sentTime: '13:38', respondedTime: '13:44' },
  ],
  'c-7': [
    { label: 'Before Lunch', sentTime: '09:42', respondedTime: '09:43' },
    { label: 'After Lunch', sentTime: '13:38', respondedTime: '13:41' },
  ],
}
