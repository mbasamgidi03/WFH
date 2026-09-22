export default function SuperAdminDashboard() {
  const today = new Date().toLocaleDateString('en-ZA', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const cards = [
    { label: 'Total Users', value: '128', sub: 'System users', icon: UsersIcon, accent: '#EDE8FB', iconColor: '#6115D0' },
    { label: 'Candidates', value: '96', sub: 'Registered candidates', icon: CandidateIcon, accent: '#EDE8FB', iconColor: '#6115D0' },
    { label: 'Mentors', value: '32', sub: 'Registered mentors', icon: MentorIcon, accent: '#F0F4FF', iconColor: '#3B5BDB' },
    { label: 'System Alerts', value: '3', sub: 'Alerts requiring attention', icon: AlertIcon, accent: '#FDEEE9', iconColor: '#E05A3A' },
  ]

  return (
    <div className="resp-page">
      <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginBottom: 8 }}>{today}</p>
      <h1 style={{ fontSize: '1.625rem', fontWeight: 700, color: '#1D2951', marginBottom: 6 }}>
        Good morning, Admin. 👋🏽
      </h1>
      <p style={{ fontSize: '0.9375rem', color: '#6B7280', marginBottom: 48 }}>
        Here's an overview of the CAPACITI system.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 20, maxWidth: 680 }}>
        {cards.map(card => (
          <div key={card.label} className="card" style={{ padding: '28px 28px 24px' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: card.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 18,
            }}>
              <card.icon color={card.iconColor} />
            </div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#6B7280', marginBottom: 6 }}>
              {card.label}
            </p>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1D2951', lineHeight: 1, marginBottom: 4 }}>
              {card.value}
            </p>
            <p style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function UsersIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function CandidateIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8m-4-4v4" />
    </svg>
  )
}

function MentorIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  )
}

function AlertIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}
