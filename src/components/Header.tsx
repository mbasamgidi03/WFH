import { useState } from 'react'
import { Bell, X, LogOut, Menu } from 'lucide-react'
import type { Notification } from '../types'

interface HeaderProps {
  name: string
  role: string
  initials: string
  notifications: Notification[]
  onMarkRead: (id: string) => void
  onLogout: () => void
  onMenuOpen?: () => void
}

export default function Header({ name, role, initials, notifications, onMarkRead, onLogout, onMenuOpen }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const unread = notifications.filter(n => !n.read).length

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 gap-3 relative flex-shrink-0">
      {/* Hamburger — shown on mobile via CSS class */}
      <button className="nav-hamburger" onClick={onMenuOpen} aria-label="Open navigation">
        <Menu size={20} />
      </button>
      {/* Right side items */}
      <div className="flex items-center gap-4 ml-auto">

      {/* Notification Bell */}
      <div className="relative">
        <button
          onClick={() => setOpen(o => !o)}
          className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-500" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-coral text-white text-[10px] font-bold flex items-center justify-center leading-none" style={{ backgroundColor: '#E05A3A' }}>
              {unread}
            </span>
          )}
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-11 w-80 card z-40 overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(29,41,81,0.12)', maxWidth: 'calc(100vw - 24px)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-700 text-gray-900" style={{ fontWeight: 700 }}>Notifications</span>
                <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X size={15} />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">No notifications</p>
                ) : (
                  notifications.map(n => (
                    <div
                      key={n.id}
                      className="flex gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => onMarkRead(n.id)}
                    >
                      <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.read ? '#E5E7EB' : '#6115D0' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 leading-snug" style={{ fontWeight: n.read ? 400 : 500 }}>{n.text}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-gray-100" />

      {/* User info */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-600 text-gray-900 leading-tight" style={{ fontWeight: 600 }}>{name}</p>
          <p className="text-xs text-gray-400">{role}</p>
        </div>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-700 flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #6115D0, #7B35E8)', fontWeight: 700 }}
        >
          {initials}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={onLogout}
        className="btn-ghost text-gray-400 hover:text-gray-700 px-2"
        title="Switch portal"
      >
        <LogOut size={16} />
      </button>

      </div>{/* end right side */}
    </header>
  )
}
