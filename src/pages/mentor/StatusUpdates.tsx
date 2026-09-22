import { useState } from 'react'
import { Search, ChevronRight, X, Clock } from 'lucide-react'
import { candidates, candidateStatusChecks, cohorts } from '../../data'
import type { Candidate } from '../../types'

export default function MentorStatusUpdates() {
  const [selectedCohort, setSelectedCohort] = useState(cohorts[0])
  const [selectedDate, setSelectedDate] = useState('2026-09-19')
  const [search, setSearch] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const wfhCandidates = candidates.filter(c => {
    const cohortMatch = selectedCohort === 'All' || c.cohort === selectedCohort
    const wfhMatch = c.wfhStatus === 'approved'
    const searchMatch = !search || c.name.toLowerCase().includes(search.toLowerCase())
    return cohortMatch && wfhMatch && searchMatch
  })

  return (
    <div className="flex-1 overflow-hidden flex" style={{ background: '#F8F9FC' }}>
      <div className="resp-page" style={{ overflowX: 'hidden' }}>
        <div className="max-w-2xl">
          <div className="mb-6">
            <h1 className="text-xl font-800 text-gray-900" style={{ fontWeight: 800 }}>Status Updates</h1>
            <p className="text-sm text-gray-400 mt-0.5">Random check-in responses from WFH candidates</p>
          </div>

          {/* Controls */}
          <div className="filter-row">
            <div style={{ minWidth: 140 }}>
              <label className="form-label">Cohort</label>
              <select className="form-input" value={selectedCohort} onChange={e => setSelectedCohort(e.target.value)}>
                {cohorts.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ minWidth: 140 }}>
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} />
            </div>
            <div style={{ flex: 1, minWidth: 160 }}>
              <label className="form-label">Search candidate</label>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: 34 }}
                  placeholder="Name…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Candidate List */}
          <div className="card overflow-hidden">
            {wfhCandidates.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No approved WFH candidates for this date.</div>
            ) : (
              wfhCandidates.map((c, i) => {
                const checks = candidateStatusChecks[c.id] ?? []
                const allResponded = checks.every(ch => !!ch.respondedTime)
                const anyMissed = checks.some(ch => !ch.respondedTime)
                const isSelected = selectedCandidate?.id === c.id
                return (
                  <button
                    key={c.id}
                    className={`candidate-row w-full ${isSelected ? 'active' : ''}`}
                    style={i === 0 ? { borderTop: 'none' } : {}}
                    onClick={() => setSelectedCandidate(s => s?.id === c.id ? null : c)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-700 text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6115D0,#8B45FF)', fontWeight: 700 }}>
                        {c.initials}
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-600 text-gray-900 block" style={{ fontWeight: 600 }}>{c.name}</span>
                        <span className="text-xs text-gray-400">{checks.length} check{checks.length !== 1 ? 's' : ''} sent</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: anyMissed ? '#E05A3A' : '#10B981' }}
                      />
                      <ChevronRight size={15} className="text-gray-300" />
                    </div>
                  </button>
                )
              })
            )}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {selectedCandidate && (
        <>
          <div className="drawer-overlay" onClick={() => setSelectedCandidate(null)} />
          <aside className="drawer">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <div>
                <h2 className="font-700 text-gray-900" style={{ fontWeight: 700 }}>{selectedCandidate.name}</h2>
                <p className="text-xs text-gray-400">{selectedCandidate.cohort} · WFH · {selectedDate}</p>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {(() => {
                const checks = candidateStatusChecks[selectedCandidate.id] ?? []
                return (
                  <div className="flex flex-col gap-5">
                    {checks.map(check => (
                      <div
                        key={check.label}
                        className="rounded-xl p-4"
                        style={{ background: '#F9FAFB', border: '1px solid #F3F4F6' }}
                      >
                        <p className="text-xs font-700 uppercase tracking-widest mb-3" style={{ fontWeight: 700, letterSpacing: '0.12em', color: '#1D2951' }}>
                          {check.label}
                        </p>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2.5">
                            <Clock size={14} className="text-gray-400 flex-shrink-0" />
                            <div>
                              <span className="text-xs text-gray-400 block">Random check sent</span>
                              <span className="text-sm font-600 text-gray-800" style={{ fontWeight: 600 }}>{check.sentTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                              style={{ background: check.respondedTime ? '#10B981' : '#F3F4F6', border: check.respondedTime ? 'none' : '1.5px solid #D1D5DB' }}
                            />
                            <div>
                              <span className="text-xs text-gray-400 block">Candidate responded</span>
                              <span className="text-sm font-600" style={{ fontWeight: 600, color: check.respondedTime ? '#065F46' : '#9CA3AF' }}>
                                {check.respondedTime ?? '—'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {checks.length === 0 && (
                      <p className="text-sm text-gray-400 text-center py-6">No checks sent yet.</p>
                    )}
                  </div>
                )
              })()}
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
