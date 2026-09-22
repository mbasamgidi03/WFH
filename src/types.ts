export type Portal = 'candidate' | 'mentor' | 'super-admin'

export type CandidatePage =
  | 'dashboard'
  | 'wfh-requests'
  | 'ticket-logs'
  | 'reports'
  | 'scorecards'

export type MentorPage =
  | 'dashboard'
  | 'wfh-requests'
  | 'wfh-attendance'
  | 'ticket-logs'
  | 'scorecards'
  | 'status-updates'

export type SuperAdminPage =
  | 'dashboard'
  | 'user-management'
  | 'access-configuration'
  | 'system-activity'

export type WFHStatus = 'Pending' | 'Approved' | 'Declined'

export interface WFHRequest {
  id: string
  candidateId?: string
  candidateName?: string
  cohort?: string
  date: string
  submittedDate: string
  status: WFHStatus
  reason: string
  supportingInfo?: string
  mentorReason?: string
}

export interface TicketLog {
  id: string
  title: string
  description: string
  evidence: string
  time: string
  date: string
}

export interface Report {
  id: string
  type: 'lateness' | 'absence'
  reason: string
  supportingInfo?: string
  time: string
  date: string
}

export interface Notification {
  id: string
  text: string
  time: string
  read: boolean
}

export interface Candidate {
  id: string
  name: string
  initials: string
  cohort: string
  cohortCode: string
  wfhStatus: 'approved' | 'office'
  registrationTime?: string
  registered: boolean
}

export interface StatusCheck {
  label: 'Before Lunch' | 'After Lunch'
  sentTime: string
  respondedTime?: string
}