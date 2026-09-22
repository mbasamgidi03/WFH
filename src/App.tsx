import { useState, useEffect } from 'react'
import type { Portal, CandidatePage, MentorPage, SuperAdminPage, Notification } from './types'
import { candidateNotifications, mentorNotifications } from './data'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CheckInPopup from './components/CheckInPopup'
import SuperAdminNav from './components/SuperAdminNav'
import LoginPage from './pages/LoginPage'
import capacitiLogoImg from './assets/capaciti-logo-official.png'

// Candidate pages
import CandidateDashboard from './pages/candidate/Dashboard'
import CandidateWFHRequests from './pages/candidate/WFHRequests'
import CandidateTicketLogs from './pages/candidate/TicketLogs'
import CandidateReports from './pages/candidate/Reports'
import CandidateScorecards from './pages/candidate/Scorecards'

// Mentor pages
import MentorDashboard from './pages/mentor/Dashboard'
import MentorWFHRequests from './pages/mentor/WFHRequests'
import MentorWFHAttendance from './pages/mentor/WFHAttendance'
import MentorTicketLogs from './pages/mentor/TicketLogs'
import MentorStatusUpdates from './pages/mentor/StatusUpdates'

// Super Admin pages
import SuperAdminDashboard from './pages/super-admin/Dashboard'
import UserManagement from './pages/super-admin/UserManagement'
import AccessConfiguration from './pages/super-admin/AccessConfiguration'
import SystemActivity from './pages/super-admin/SystemActivity'

type AppScreen = 'login' | 'portal-select' | 'app'

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login')
  const [portal, setPortal] = useState<Portal | null>(null)
  const [candidatePage, setCandidatePage] = useState<CandidatePage>('dashboard')
  const [mentorPage, setMentorPage] = useState<MentorPage>('dashboard')
  const [adminPage, setAdminPage] = useState<SuperAdminPage>('dashboard')
  const [cNotifs, setCNotifs] = useState<Notification[]>(candidateNotifications)
  const [mNotifs, setMNotifs] = useState<Notification[]>(mentorNotifications)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  useEffect(() => {
    if (portal !== 'candidate') return
    const t = setTimeout(() => setShowCheckIn(true), 8000)
    return () => clearTimeout(t)
  }, [portal])

  const handleLogout = () => {
    setPortal(null)
    setCandidatePage('dashboard')
    setMentorPage('dashboard')
    setAdminPage('dashboard')
    setMobileNavOpen(false)
    setScreen('login')
  }

  if (screen === 'login') {
    return <LoginPage onLogin={() => setScreen('portal-select')} />
  }

  if (screen === 'portal-select' || !portal) {
    return (
      <PortalSelector
        onSelect={p => {
          setPortal(p)
          setScreen('app')
        }}
      />
    )
  }

  if (portal === 'super-admin') {
    return (
      <div className="flex flex-col h-screen overflow-hidden">
        <SuperAdminNav
          activePage={adminPage}
          onNavigate={setAdminPage}
          onLogout={handleLogout}
        />
        <main style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {adminPage === 'dashboard' && <SuperAdminDashboard />}
          {adminPage === 'user-management' && <UserManagement />}
          {adminPage === 'access-configuration' && <AccessConfiguration />}
          {adminPage === 'system-activity' && <SystemActivity />}
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {portal === 'candidate' ? (
        <>
          <Sidebar
            portal="candidate"
            activePage={candidatePage}
            onNavigate={p => { setCandidatePage(p); setMobileNavOpen(false) }}
            onLogout={handleLogout}
            mobileOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />
          <div className="flex flex-col flex-1 min-w-0">
            <Header
              name="Thabo Molefe"
              role="Candidate"
              initials="TM"
              notifications={cNotifs}
              onMarkRead={id => setCNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))}
              onLogout={handleLogout}
              onMenuOpen={() => setMobileNavOpen(true)}
            />
            <main className="flex-1 overflow-hidden flex">
              {candidatePage === 'dashboard' && <CandidateDashboard />}
              {candidatePage === 'wfh-requests' && <CandidateWFHRequests />}
              {candidatePage === 'ticket-logs' && <CandidateTicketLogs />}
              {candidatePage === 'reports' && <CandidateReports />}
              {candidatePage === 'scorecards' && <CandidateScorecards />}
            </main>
          </div>
          {showCheckIn && <CheckInPopup onConfirm={() => setShowCheckIn(false)} />}
        </>
      ) : (
        <>
          <Sidebar
            portal="mentor"
            activePage={mentorPage}
            onNavigate={p => { setMentorPage(p); setMobileNavOpen(false) }}
            onLogout={handleLogout}
            mobileOpen={mobileNavOpen}
            onClose={() => setMobileNavOpen(false)}
          />
          <div className="flex flex-col flex-1 min-w-0">
            <Header
              name="Naledi Dlamini"
              role="Mentor"
              initials="ND"
              notifications={mNotifs}
              onMarkRead={id => setMNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))}
              onLogout={handleLogout}
              onMenuOpen={() => setMobileNavOpen(true)}
            />
            <main className="flex-1 overflow-hidden flex">
              {mentorPage === 'dashboard' && <MentorDashboard />}
              {mentorPage === 'wfh-requests' && <MentorWFHRequests />}
              {mentorPage === 'wfh-attendance' && <MentorWFHAttendance />}
              {mentorPage === 'ticket-logs' && <MentorTicketLogs />}
              {mentorPage === 'status-updates' && <MentorStatusUpdates />}
            </main>
          </div>
        </>
      )}
    </div>
  )
}

function PortalSelector({ onSelect }: { onSelect: (p: Portal) => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F3F2FC' }}>
      {/* Decorative rings */}
      <div aria-hidden="true" style={{ position: 'fixed', top: -80, left: -80, width: 360, height: 360, pointerEvents: 'none' }}>
        <svg width="360" height="360" viewBox="0 0 360 360" fill="none">
          <circle cx="100" cy="100" r="160" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.1" fill="none" />
          <circle cx="100" cy="100" r="120" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.08" fill="none" />
        </svg>
      </div>
      <div aria-hidden="true" style={{ position: 'fixed', bottom: -60, right: -60, width: 320, height: 320, pointerEvents: 'none' }}>
        <svg width="320" height="320" viewBox="0 0 320 320" fill="none">
          <circle cx="220" cy="220" r="140" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.12" fill="none" />
          <circle cx="220" cy="220" r="100" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.09" fill="none" />
          <circle cx="220" cy="220" r="65" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.06" fill="none" />
        </svg>
      </div>

      <div className="text-center px-4" style={{ position: 'relative', zIndex: 1 }}>
        {/* Logo */}
        <div className="flex items-center justify-center mb-10">
          <img
            src={capacitiLogoImg}
            alt="CAPACITI — A Division of UVU Africa"
            style={{ height: 68, width: 'auto', objectFit: 'contain', maxWidth: '80vw' }}
          />
        </div>

        <h1 className="text-xl font-700 text-gray-900 mb-2" style={{ fontWeight: 700 }}>Select your portal</h1>
        <p className="text-sm text-gray-400 mb-10">Choose the interface you'd like to access</p>

        <div className="flex flex-wrap gap-5 justify-center">
          <button
            className="card p-8 w-52 text-center hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onSelect('candidate')}
            style={{ border: '1.5px solid #E8EAF0' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform" style={{ background: '#EDE8FB' }}>
              <span className="text-2xl">🧑🏽‍💻</span>
            </div>
            <p className="font-700 text-gray-900 mb-1" style={{ fontWeight: 700 }}>Candidate</p>
            <p className="text-xs text-gray-400">Submit logs, request WFH, view reports</p>
          </button>

          <button
            className="card p-8 w-52 text-center hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onSelect('mentor')}
            style={{ border: '1.5px solid #E8EAF0' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform" style={{ background: '#FDEEE9' }}>
              <span className="text-2xl">👩🏽‍🏫</span>
            </div>
            <p className="font-700 text-gray-900 mb-1" style={{ fontWeight: 700 }}>Mentor</p>
            <p className="text-xs text-gray-400">Review requests, monitor attendance, view logs</p>
          </button>

          <button
            className="card p-8 w-52 text-center hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onSelect('super-admin')}
            style={{ border: '1.5px solid #E8EAF0' }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform" style={{ background: '#1D2951' }}>
              <span className="text-2xl">🛡️</span>
            </div>
            <p className="font-700 text-gray-900 mb-1" style={{ fontWeight: 700 }}>Super Admin</p>
            <p className="text-xs text-gray-400">Manage users, access, and system activity</p>
          </button>
        </div>
      </div>
    </div>
  )
}
