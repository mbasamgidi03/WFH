import React, { useState } from 'react'

interface ActivityRecord {
  id: string
  activity: string
  user: string
  role: 'Candidate' | 'Mentor' | 'Super Admin'
  dateTime: string
  details: string
}

const SAMPLE_ACTIVITY: ActivityRecord[] = [
  { id: '1', activity: 'User account created', user: 'Sipho Dlamini', role: 'Candidate', dateTime: '21 Sep 2026, 09:14', details: 'New candidate account created for Cohort C by Super Admin.' },
  { id: '2', activity: 'WFH request approved', user: 'Thabo Molefe', role: 'Candidate', dateTime: '21 Sep 2026, 08:47', details: 'WFH request for 21 Sep 2026 approved by Mentor Naledi Dlamini.' },
  { id: '3', activity: 'User logged in', user: 'Naledi Dlamini', role: 'Mentor', dateTime: '21 Sep 2026, 08:32', details: 'Successful login from IP 196.22.31.14.' },
  { id: '4', activity: 'Ticket log submitted', user: 'Ayanda Nkosi', role: 'Candidate', dateTime: '21 Sep 2026, 08:15', details: 'Ticket "CSS Grid Layout Challenge" submitted with evidence link.' },
  { id: '5', activity: 'User logged in', user: 'Thabo Molefe', role: 'Candidate', dateTime: '21 Sep 2026, 08:02', details: 'Successful login from IP 196.22.31.12.' },
  { id: '6', activity: 'WFH request approved', user: 'Lerato Sithole', role: 'Candidate', dateTime: '20 Sep 2026, 16:38', details: 'WFH request for 20 Sep 2026 approved by Mentor Kagiso Mokoena.' },
  { id: '7', activity: 'User account deleted', user: 'Former User', role: 'Candidate', dateTime: '20 Sep 2026, 14:05', details: 'User account removed from the system by Super Admin.' },
  { id: '8', activity: 'User logged in', user: 'Kagiso Mokoena', role: 'Mentor', dateTime: '20 Sep 2026, 09:00', details: 'Successful login from IP 196.22.31.20.' },
]

const ACTIVITY_TYPES = [
  'All Activity',
  'User account created',
  'User logged in',
  'WFH request approved',
  'User account deleted',
  'Ticket log submitted',
]

export default function SystemActivity() {
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All Activity')
  const [dateFilter, setDateFilter] = useState('')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filtered = SAMPLE_ACTIVITY.filter(r => {
    const matchSearch = search === '' || r.activity.toLowerCase().includes(search.toLowerCase()) || r.user.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All Activity' || r.activity === typeFilter
    const matchDate = dateFilter === '' || r.dateTime.startsWith(dateFilter)
    return matchSearch && matchType && matchDate
  })

  return (
    <div className="resp-page">
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D2951', marginBottom: 6 }}>
        System Activity
      </h1>
      <p style={{ fontSize: '0.9375rem', color: '#6B7280', marginBottom: 32 }}>
        View activity across the CAPACITI system.
      </p>

      {/* Filters */}
      <div className="filter-row" style={{ gap: 12 }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="form-input"
            style={{ paddingLeft: 32 }}
            placeholder="Search activity…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-input"
          style={{ width: 220 }}
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
        >
          {ACTIVITY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input
          className="form-input"
          type="date"
          style={{ width: 170, color: dateFilter ? '#111827' : '#9CA3AF' }}
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        />
      </div>

      {/* Activity table */}
      <div className="card table-scroll">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
              {['Activity', 'User', 'Role', 'Date & Time', ''].map(h => (
                <th key={h} style={{
                  padding: '12px 24px', textAlign: 'left',
                  fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF',
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                  background: '#FAFAFA',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(record => (
              <React.Fragment key={record.id}>
                <tr
                  style={{
                    borderBottom: expandedId === record.id ? 'none' : '1px solid #F9FAFB',
                    cursor: 'pointer',
                    transition: 'background 0.12s',
                  }}
                  onClick={() => setExpandedId(prev => prev === record.id ? null : record.id)}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFAFA')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '14px 24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <ActivityDot activity={record.activity} />
                      <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1D2951' }}>{record.activity}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: '0.875rem', color: '#374151', fontWeight: 500 }}>{record.user}</td>
                  <td style={{ padding: '14px 24px' }}>
                    <span className="badge" style={{
                      background: record.role === 'Mentor' ? '#F0F4FF' : record.role === 'Super Admin' ? '#EDE8FB' : '#F3F4F6',
                      color: record.role === 'Mentor' ? '#3B5BDB' : record.role === 'Super Admin' ? '#6115D0' : '#6B7280',
                    }}>
                      {record.role}
                    </span>
                  </td>
                  <td style={{ padding: '14px 24px', fontSize: '0.8125rem', color: '#9CA3AF' }}>{record.dateTime}</td>
                  <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                    <svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                      style={{ transform: expandedId === record.id ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </td>
                </tr>
                {expandedId === record.id && (
                  <tr style={{ borderBottom: '1px solid #F9FAFB' }}>
                    <td colSpan={5} style={{ padding: '0 24px 16px 58px' }}>
                      <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.6, background: '#F9FAFB', padding: '12px 16px', borderRadius: 8 }}>
                        {record.details}
                      </p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '40px 24px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>
                  No activity records match the selected filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ActivityDot({ activity }: { activity: string }) {
  let color = '#9CA3AF'
  if (activity.includes('created')) color = '#059669'
  else if (activity.includes('deleted')) color = '#E05A3A'
  else if (activity.includes('approved')) color = '#6115D0'
  else if (activity.includes('logged in')) color = '#3B5BDB'

  return (
    <span style={{
      width: 8, height: 8, borderRadius: '50%',
      background: color, flexShrink: 0, display: 'inline-block',
    }} />
  )
}
