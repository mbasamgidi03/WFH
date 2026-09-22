import {
  LayoutDashboard,
  Home,
  ClipboardList,
  Flag,
  Star,
  Users,
  CheckSquare,
  LogOut,
} from 'lucide-react'

import type { CandidatePage, MentorPage } from '../types'
import capacitiLogo from '../assets/capaciti-logo-official.png'

interface CandidateSidebarProps {
  portal: 'candidate'
  activePage: CandidatePage
  onNavigate: (page: CandidatePage) => void
  onLogout: () => void
  mobileOpen?: boolean
  onClose?: () => void
}

interface MentorSidebarProps {
  portal: 'mentor'
  activePage: MentorPage
  onNavigate: (page: MentorPage) => void
  onLogout: () => void
  mobileOpen?: boolean
  onClose?: () => void
}

type SidebarProps = CandidateSidebarProps | MentorSidebarProps

const candidateNav = [
  {
    page: 'dashboard' as CandidatePage,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    page: 'wfh-requests' as CandidatePage,
    label: 'WFH Requests',
    icon: Home,
  },
  {
    page: 'ticket-logs' as CandidatePage,
    label: 'Daily Logs',
    icon: ClipboardList,
  },
  {
    page: 'reports' as CandidatePage,
    label: 'Reports',
    icon: Flag,
  },
  {
    page: 'scorecards' as CandidatePage,
    label: 'Scorecards',
    icon: Star,
  },
]

const mentorNav = [
  {
    page: 'dashboard' as MentorPage,
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    page: 'wfh-requests' as MentorPage,
    label: 'WFH Requests',
    icon: Home,
  },
  {
    page: 'wfh-attendance' as MentorPage,
    label: 'Candidate Attendance',
    icon: Users,
  },
  {
    page: 'ticket-logs' as MentorPage,
    label: 'Candidate Daily Logs',
    icon: ClipboardList,
  },
  {
    page: 'scorecards' as MentorPage,
    label: 'Scorecards',
    icon: Star,
  },
  {
    page: 'status-updates' as MentorPage,
    label: 'Status Updates',
    icon: CheckSquare,
  },
]

export default function Sidebar(props: SidebarProps) {
  const nav =
    props.portal === 'candidate'
      ? candidateNav
      : mentorNav

  const { mobileOpen = false, onClose } = props

  const handleNavigate = (page: string) => {
    ;(props.onNavigate as (p: string) => void)(page)
    onClose?.()
  }

  const handleLogout = () => {
    props.onLogout()
    onClose?.()
  }

  const content = (
    <>
      {/* Logo row */}
      <div
        style={{
          padding: '20px 20px 16px',
          flexShrink: 0,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <img
          src={capacitiLogo}
          alt="CAPACITI — A Division of UVU Africa"
          style={{
            height: 36,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
            filter: 'invert(1) hue-rotate(180deg)',
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5">
        {nav.map(({ page, label, icon: Icon }) => {
          const isActive = props.activePage === page

          return (
            <button
              key={page}
              className={`sidebar-nav-item w-full text-left ${
                isActive ? 'active' : ''
              }`}
              onClick={() => handleNavigate(page)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>

      {/* Logout */}
      <div
        className="px-3 py-4 border-t"
        style={{
          borderColor: 'rgba(255,255,255,0.06)',
        }}
      >
        <button
          className="sidebar-nav-item w-full text-left"
          onClick={handleLogout}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Backdrop — mobile only, closes on tap outside */}
      <div
        className={`sidebar-backdrop${
          mobileOpen ? ' backdrop-show' : ''
        }`}
        onClick={onClose}
      />

      {/* Sidebar panel */}
      <aside
        className={`sidebar-root${
          mobileOpen ? ' sidebar-open' : ''
        }`}
      >
        {content}
      </aside>
    </>
  )
}