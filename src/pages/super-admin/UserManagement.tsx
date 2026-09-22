import { useState } from 'react'

type Role = 'Candidate' | 'Mentor'

interface User {
  id: string
  name: string
  email: string
  role: Role
  cohorts: string[]
}

const COHORTS = ['Cohort A', 'Cohort B', 'Cohort C', 'Cohort D']

const SAMPLE_USERS: User[] = [
  { id: '1', name: 'Thabo Molefe', email: 'thabo.molefe@capaciti.org.za', role: 'Candidate', cohorts: ['Cohort A'] },
  { id: '2', name: 'Ayanda Nkosi', email: 'ayanda.nkosi@capaciti.org.za', role: 'Candidate', cohorts: ['Cohort A'] },
  { id: '3', name: 'Lerato Sithole', email: 'lerato.sithole@capaciti.org.za', role: 'Candidate', cohorts: ['Cohort B'] },
  { id: '4', name: 'Sipho Dlamini', email: 'sipho.dlamini@capaciti.org.za', role: 'Candidate', cohorts: ['Cohort C'] },
  { id: '5', name: 'Naledi Dlamini', email: 'naledi.dlamini@capaciti.org.za', role: 'Mentor', cohorts: ['Cohort A', 'Cohort B'] },
  { id: '6', name: 'Kagiso Mokoena', email: 'kagiso.mokoena@capaciti.org.za', role: 'Mentor', cohorts: ['Cohort C', 'Cohort D'] },
  { id: '7', name: 'Zanele Khumalo', email: 'zanele.khumalo@capaciti.org.za', role: 'Candidate', cohorts: ['Cohort D'] },
  { id: '8', name: 'Thandeka Mahlangu', email: 'thandeka.mahlangu@capaciti.org.za', role: 'Mentor', cohorts: ['Cohort A'] },
]

export default function UserManagement() {
  const [showForm, setShowForm] = useState(false)
  const [usersExpanded, setUsersExpanded] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'All' | Role>('All')
  const [cohortFilter, setCohortFilter] = useState('All')
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  // Form state
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<Role | ''>('')
  const [candidateCohort, setCandidateCohort] = useState('')
  const [mentorCohorts, setMentorCohorts] = useState<string[]>([])

  const [users, setUsers] = useState<User[]>(SAMPLE_USERS)

  const filteredUsers = users.filter(u => {
    const matchSearch = search === '' || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    const matchCohort = cohortFilter === 'All' || u.cohorts.includes(cohortFilter)
    return matchSearch && matchRole && matchCohort
  })

  const resetForm = () => {
    setFullName(''); setEmail(''); setRole(''); setCandidateCohort(''); setMentorCohorts([])
  }

  const handleCreate = () => {
    if (!fullName || !email || !role) return
    const cohorts = role === 'Candidate' ? [candidateCohort] : mentorCohorts
    const newUser: User = {
      id: String(Date.now()),
      name: fullName,
      email,
      role: role as Role,
      cohorts,
    }
    setUsers(prev => [newUser, ...prev])
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setShowForm(false)
      resetForm()
    }, 2400)
  }

  const toggleMentorCohort = (c: string) => {
    setMentorCohorts(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])
  }

  return (
    <div className="resp-page">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 36 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D2951', marginBottom: 6 }}>
            User Management
          </h1>
          <p style={{ fontSize: '0.9375rem', color: '#6B7280' }}>
            Manage system users and their access.
          </p>
        </div>
        {!showForm && (
          <button className="btn-primary" onClick={() => setShowForm(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add User
          </button>
        )}
      </div>

      {/* Add User Form */}
      {showForm && !formSubmitted && (
        <div className="card" style={{ padding: '28px 32px', marginBottom: 28, maxWidth: 520 }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D2951', marginBottom: 24 }}>Add New User</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <label className="form-label">Full Name <span style={{ color: '#E05A3A' }}>*</span></label>
              <input className="form-input" placeholder="e.g. Sipho Dlamini" value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>
            <div>
              <label className="form-label">CAPACITI Email <span style={{ color: '#E05A3A' }}>*</span></label>
              <input className="form-input" type="email" placeholder="name@capaciti.org.za" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Role <span style={{ color: '#E05A3A' }}>*</span></label>
              <select className="form-input" value={role} onChange={e => { setRole(e.target.value as Role | ''); setCandidateCohort(''); setMentorCohorts([]) }}>
                <option value="">Select a role</option>
                <option value="Candidate">Candidate</option>
                <option value="Mentor">Mentor</option>
              </select>
            </div>
            {role === 'Candidate' && (
              <div>
                <label className="form-label">Cohort <span style={{ color: '#E05A3A' }}>*</span></label>
                <select className="form-input" value={candidateCohort} onChange={e => setCandidateCohort(e.target.value)}>
                  <option value="">Select cohort</option>
                  {COHORTS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            )}
            {role === 'Mentor' && (
              <div>
                <label className="form-label">Assigned Cohort(s) <span style={{ color: '#E05A3A' }}>*</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 2 }}>
                  {COHORTS.map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleMentorCohort(c)}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontSize: '0.8125rem',
                        fontWeight: 500,
                        border: mentorCohorts.includes(c) ? '1.5px solid #6115D0' : '1.5px solid #E5E7EB',
                        background: mentorCohorts.includes(c) ? '#F5F2FE' : '#fff',
                        color: mentorCohorts.includes(c) ? '#6115D0' : '#6B7280',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
            <button className="btn-primary" onClick={handleCreate}>Create User</button>
            <button className="btn-secondary" onClick={() => { setShowForm(false); resetForm() }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Success state */}
      {formSubmitted && (
        <div className="card" style={{ padding: '20px 24px', marginBottom: 28, maxWidth: 520, display: 'flex', alignItems: 'center', gap: 12, borderLeft: '3px solid #059669' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#065F46' }}>User created successfully.</p>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginTop: 2 }}>A temporary password will be issued to the user.</p>
          </div>
        </div>
      )}

      {/* System Users collapsible */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <button
          className="collapse-btn"
          onClick={() => setUsersExpanded(v => !v)}
          style={{ width: '100%', padding: '18px 24px', borderBottom: usersExpanded ? '1px solid #F3F4F6' : 'none' }}
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: usersExpanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
          System Users ({users.length})
        </button>

        {usersExpanded && (
          <>
            {/* Filters */}
            <div className="filter-row" style={{ padding: '16px 24px', gap: 12, marginBottom: 0, borderBottom: '1px solid #F3F4F6', background: '#FAFAFA' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: 180 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>
                  <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  className="form-input"
                  style={{ paddingLeft: 32, height: 36, fontSize: '0.8125rem' }}
                  placeholder="Search users…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
              <select
                className="form-input"
                style={{ width: 140, height: 36, fontSize: '0.8125rem' }}
                value={roleFilter}
                onChange={e => setRoleFilter(e.target.value as 'All' | Role)}
              >
                <option value="All">All Roles</option>
                <option value="Candidate">Candidate</option>
                <option value="Mentor">Mentor</option>
              </select>
              <select
                className="form-input"
                style={{ width: 160, height: 36, fontSize: '0.8125rem' }}
                value={cohortFilter}
                onChange={e => setCohortFilter(e.target.value)}
              >
                <option value="All">All Cohorts</option>
                {COHORTS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Table */}
            <div className="table-scroll">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #F3F4F6' }}>
                    {['Name', 'CAPACITI Email', 'Role', 'Cohort(s)', ''].map(h => (
                      <th key={h} style={{
                        padding: '10px 24px', textAlign: 'left',
                        fontSize: '0.75rem', fontWeight: 600, color: '#9CA3AF',
                        letterSpacing: '0.04em', textTransform: 'uppercase',
                      }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                      <td style={{ padding: '14px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                            background: user.role === 'Mentor' ? '#F0F4FF' : '#EDE8FB',
                            color: user.role === 'Mentor' ? '#3B5BDB' : '#6115D0',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.75rem', fontWeight: 700,
                          }}>
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#1D2951' }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '14px 24px', fontSize: '0.875rem', color: '#6B7280' }}>{user.email}</td>
                      <td style={{ padding: '14px 24px' }}>
                        <span className="badge" style={{
                          background: user.role === 'Mentor' ? '#F0F4FF' : '#EDE8FB',
                          color: user.role === 'Mentor' ? '#3B5BDB' : '#6115D0',
                        }}>
                          {user.role}
                        </span>
                      </td>
                      <td style={{ padding: '14px 24px', fontSize: '0.8125rem', color: '#6B7280' }}>
                        {user.cohorts.join(', ') || '—'}
                      </td>
                      <td style={{ padding: '14px 24px', textAlign: 'right', position: 'relative' }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <button
                            onClick={() => setOpenMenuId(prev => prev === user.id ? null : user.id)}
                            style={{
                              width: 30, height: 30, borderRadius: 7,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              background: openMenuId === user.id ? '#F3F4F6' : 'none',
                              border: 'none', cursor: 'pointer', color: '#9CA3AF',
                              transition: 'background 0.15s',
                            }}
                          >
                            ···
                          </button>
                          {openMenuId === user.id && (
                            <>
                              <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setOpenMenuId(null)} />
                              <div className="card" style={{
                                position: 'absolute', right: 0, top: '100%', zIndex: 50,
                                width: 160, padding: '4px 0',
                              }}>
                                {['Edit User', 'Reset Password', 'Deactivate'].map((action, i) => (
                                  <button
                                    key={action}
                                    onClick={() => setOpenMenuId(null)}
                                    style={{
                                      width: '100%', textAlign: 'left',
                                      padding: '9px 16px',
                                      fontSize: '0.8125rem',
                                      color: i === 2 ? '#E05A3A' : '#374151',
                                      fontWeight: 500,
                                      background: 'none', border: 'none', cursor: 'pointer',
                                      transition: 'background 0.12s',
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.background = '#F9FAFB')}
                                    onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px 24px', textAlign: 'center', color: '#9CA3AF', fontSize: '0.875rem' }}>
                        No users match the selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
