import { useState } from 'react'
import type { SuperAdminPage } from '../types'
import capacitiLogo from '../assets/capaciti-logo-official.png'

interface Props {
  activePage: SuperAdminPage
  onNavigate: (p: SuperAdminPage) => void
  onLogout: () => void
}

const navLinks: { id: SuperAdminPage; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'user-management', label: 'User Management' },
 
  { id: 'system-activity', label: 'System Activity' },
]

export default function SuperAdminNav({ activePage, onNavigate, onLogout }: Props) {
  const [notifOpen, setNotifOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavigate = (id: SuperAdminPage) => {
    onNavigate(id)
    setMobileMenuOpen(false)
  }

  return (
    <div style={{ position: 'relative', zIndex: 30, flexShrink: 0 }}>
      <header
        className="flex items-center justify-between h-16 relative"
        style={{ background: '#1D2951', borderBottom: '1px solid rgba(255,255,255,0.07)', paddingLeft: 24, paddingRight: 24 }}
      >
        {/* Logo + desktop nav links */}
        <div className="flex items-center gap-6">
          <img
            src={capacitiLogo}
            alt="CAPACITI"
            style={{
              height: 36,
              width: 'auto',
              objectFit: 'contain',
              filter: 'invert(1) hue-rotate(180deg)',
              mixBlendMode: 'screen',
              flexShrink: 0,
            }}
          />

          {/* Desktop nav */}
          <nav className="admin-nav-links-desktop" style={{ gap: 0 }}>
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNavigate(link.id)}
                style={{
                  position: 'relative',
                  padding: '0 14px',
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '0.875rem',
                  fontWeight: activePage === link.id ? 600 : 500,
                  color: activePage === link.id ? '#fff' : '#B8C4E0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'color 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (activePage !== link.id) (e.currentTarget as HTMLButtonElement).style.color = '#fff'
                }}
                onMouseLeave={e => {
                  if (activePage !== link.id) (e.currentTarget as HTMLButtonElement).style.color = '#B8C4E0'
                }}
              >
                {link.label}
                {activePage === link.id && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 14,
                      right: 14,
                      height: 3,
                      borderRadius: '3px 3px 0 0',
                      background: '#6115D0',
                    }}
                  />
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="admin-hamburger"
            onClick={() => setMobileMenuOpen(v => !v)}
            aria-label="Open navigation"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen
                ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                : <><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></>
              }
            </svg>
          </button>

          {/* Notification bell */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setNotifOpen(v => !v); setAccountOpen(false) }}
              style={{
                width: 38, height: 38, borderRadius: '10px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#B8C4E0', position: 'relative',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span style={{ position: 'absolute', top: 7, right: 7, width: 8, height: 8, borderRadius: '50%', background: '#E05A3A', border: '1.5px solid #1D2951' }} />
            </button>

            {notifOpen && (
              <div className="card" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 300, maxWidth: 'calc(100vw - 32px)', zIndex: 50, padding: '12px 0' }}>
                <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#374151', padding: '0 16px 10px' }}>System Alerts</p>
                {['Unusual login detected for user Sipho M.', 'Failed login attempts threshold exceeded.', 'New user registration pending approval.'].map((text, i) => (
                  <div key={i} style={{ padding: '10px 16px', borderTop: '1px solid #F3F4F6', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#E05A3A', flexShrink: 0, marginTop: 4 }} />
                    <p style={{ fontSize: '0.8125rem', color: '#374151', lineHeight: 1.4 }}>{text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Account — hide label on mobile */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setAccountOpen(v => !v); setNotifOpen(false) }}
              style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 10px 6px 6px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer' }}
            >
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#6115D0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                SA
              </div>
              <span className="hidden sm:inline" style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#fff' }}>Super Admin</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#B8C4E0" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {accountOpen && (
              <div className="card" style={{ position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: 180, zIndex: 50, padding: '4px 0' }}>
                <button
                  onClick={onLogout}
                  style={{ width: '100%', textAlign: 'left', padding: '10px 16px', fontSize: '0.875rem', color: '#E05A3A', fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Outside-click handler for dropdowns */}
        {(notifOpen || accountOpen) && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => { setNotifOpen(false); setAccountOpen(false) }} />
        )}
      </header>

      {/* Mobile nav dropdown */}
      <div className={`admin-mobile-menu${mobileMenuOpen ? ' admin-menu-open' : ''}`}>
        {navLinks.map(link => (
          <button
            key={link.id}
            onClick={() => handleNavigate(link.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '13px 24px',
              fontSize: '0.9375rem',
              fontWeight: activePage === link.id ? 600 : 400,
              color: activePage === link.id ? '#fff' : '#B8C4E0',
              background: activePage === link.id ? 'rgba(97,21,208,0.25)' : 'none',
              border: 'none',
              borderLeft: activePage === link.id ? '3px solid #6115D0' : '3px solid transparent',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            {link.label}
          </button>
        ))}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '8px 0 4px' }}>
          <button
            onClick={() => { onLogout(); setMobileMenuOpen(false) }}
            style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '13px 24px', fontSize: '0.9375rem', color: '#E05A3A', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log out
          </button>
        </div>
      </div>

      {/* Backdrop to close mobile menu */}
      {mobileMenuOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 30 }} onClick={() => setMobileMenuOpen(false)} />
      )}
    </div>
  )
}
