import { useState } from 'react'
import { Search, ChevronRight, X, Paperclip, Clock } from 'lucide-react'
import { candidates, candidateTicketLogsByPerson, cohorts } from '../../data'
import type { Candidate, TicketLog } from '../../types'

export default function MentorTicketLogs() {
  const [selectedCohort, setSelectedCohort] = useState(cohorts[0])
  const [selectedDate, setSelectedDate] = useState('2026-09-19')
  const [search, setSearch] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)

  const filtered = candidates.filter(c => {
    const cohortMatch = selectedCohort === 'All' || c.cohort === selectedCohort
    const searchMatch = !search || c.name.toLowerCase().includes(search.toLowerCase())
    return cohortMatch && searchMatch
  })

  const getLogs = (c: Candidate): TicketLog[] => candidateTicketLogsByPerson[c.id] ?? []

  return (
    <div className="flex-1 overflow-hidden flex" style={{ background: '#F8F9FC' }}>
      <div className="resp-page" style={{ overflowX: 'hidden' }}>
        <div className="max-w-2xl">
          <h1 className="text-xl font-800 text-gray-900 mb-6" style={{ fontWeight: 800 }}>Ticket Logs</h1>

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
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No candidates found.</div>
            ) : (
              filtered.map((c, i) => {
                const logs = getLogs(c)
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
                      <span className="text-sm font-600 text-gray-900" style={{ fontWeight: 600 }}>{c.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {logs.length === 0 ? '0 logs' : `${logs.length} ${logs.length === 1 ? 'log' : 'logs'}`}
                      </span>
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
                <p className="text-xs text-gray-400">{selectedCandidate.cohort} · {selectedDate}</p>
              </div>
              <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {(() => {
                const logs = getLogs(selectedCandidate)
                return (
                  <>
                    <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-4" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                      Today's Work — {logs.length} {logs.length === 1 ? 'Log' : 'Logs'}
                    </p>
                    {logs.length === 0 ? (
                      <div className="py-10 text-center text-sm text-gray-400">No logs submitted for this date.</div>
                    ) : (
                      <div className="flex flex-col gap-4">
                        {logs.map(log => (
                          <div key={log.id} className="pb-4 border-b border-gray-100 last:border-none">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <Clock size={12} className="text-gray-400" />
                              <span className="text-xs text-gray-400">{log.time}</span>
                            </div>
                            <p className="text-sm font-600 text-gray-900 mb-1" style={{ fontWeight: 600 }}>{log.title}</p>
                            <p className="text-sm text-gray-500 leading-relaxed mb-2">{log.description}</p>
                            <div className="flex items-center gap-1.5">
                              <Paperclip size={12} style={{ color: '#6115D0' }} />
                              <button className="text-xs font-500" style={{ color: '#6115D0', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 500 }}>
                                {log.evidence}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )
              })()}
            </div>
          </aside>
        </>
      )}
    </div>
  )
}
