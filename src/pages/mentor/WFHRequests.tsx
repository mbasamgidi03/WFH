import { useState } from 'react'
import { ChevronRight, ChevronDown, X, Calendar, User, Paperclip } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import { mentorWFHRequests } from '../../data'
import type { WFHRequest } from '../../types'

export default function MentorWFHRequests() {
  const [requests, setRequests] = useState(mentorWFHRequests)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [declineMode, setDeclineMode] = useState(false)
  const [declineReason, setDeclineReason] = useState('')
  const [confirmApprove, setConfirmApprove] = useState(false)

  const pending = requests.filter(r => r.status === 'Pending')
  const previous = requests.filter(r => r.status !== 'Pending')
  const selected = requests.find(r => r.id === selectedId) ?? null

  const handleApprove = () => {
    if (!selectedId) return
    setRequests(rs => rs.map(r => r.id === selectedId ? { ...r, status: 'Approved' } : r))
    setSelectedId(null)
    setConfirmApprove(false)
  }

  const handleDecline = () => {
    if (!selectedId || !declineReason.trim()) return
    setRequests(rs => rs.map(r => r.id === selectedId ? { ...r, status: 'Declined', mentorReason: declineReason } : r))
    setSelectedId(null)
    setDeclineMode(false)
    setDeclineReason('')
  }

  const closeDrawer = () => {
    setSelectedId(null)
    setDeclineMode(false)
    setDeclineReason('')
    setConfirmApprove(false)
  }

  return (
    <div className="flex-1 overflow-hidden flex" style={{ background: '#F8F9FC' }}>
      <div className="resp-page" style={{ overflowX: 'hidden' }}>
        <div className="max-w-2xl">
          <h1 className="text-xl font-800 text-gray-900 mb-8" style={{ fontWeight: 800 }}>Work From Home Requests</h1>

          {/* Pending */}
          <div className="mb-6">
            <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
              Pending Requests ({pending.length})
            </p>
            {pending.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-sm text-gray-400">No pending requests.</p>
              </div>
            ) : (
              <div className="card overflow-hidden">
                {pending.map((req, i) => (
                  <button
                    key={req.id}
                    className={`w-full text-left flex items-center justify-between px-5 py-4 transition-colors hover:bg-purple-50 ${selectedId === req.id ? 'bg-purple-50' : ''} ${i !== 0 ? 'border-t border-gray-100' : ''}`}
                    style={selectedId === req.id ? { borderLeft: '3px solid #6115D0' } : {}}
                    onClick={() => { setSelectedId(req.id); setDeclineMode(false); setConfirmApprove(false) }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-700 text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6115D0,#8B45FF)', fontWeight: 700 }}>
                        {req.candidateName?.split(' ').map(n => n[0]).join('') ?? '?'}
                      </div>
                      <div>
                        <p className="text-sm font-600 text-gray-900" style={{ fontWeight: 600 }}>{req.candidateName}</p>
                        <p className="text-xs text-gray-400">{req.cohort}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="text-sm text-gray-700">{req.date}</p>
                        <p className="text-xs text-gray-400">Submitted {req.submittedDate}</p>
                      </div>
                      <StatusBadge status={req.status} />
                      <ChevronRight size={16} className="text-gray-300" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Previous */}
          <div>
            <button className="collapse-btn mb-3" onClick={() => setHistoryOpen(o => !o)}>
              {historyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              Previous Requests ({previous.length})
            </button>
            {historyOpen && (
              <div className="card overflow-hidden">
                {previous.map((req, i) => (
                  <div key={req.id} className={`flex items-center justify-between px-5 py-4 ${i !== 0 ? 'border-t border-gray-100' : ''}`}>
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-700 text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6115D0,#8B45FF)', fontWeight: 700 }}>
                        {req.candidateName?.split(' ').map(n => n[0]).join('') ?? '?'}
                      </div>
                      <div>
                        <p className="text-sm font-600 text-gray-900" style={{ fontWeight: 600 }}>{req.candidateName}</p>
                        <p className="text-xs text-gray-400">{req.cohort}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-right">
                      <p className="text-sm text-gray-500">{req.date}</p>
                      <StatusBadge status={req.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <>
          <div className="drawer-overlay" onClick={closeDrawer} />
          <aside className="drawer">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
              <h2 className="font-700 text-gray-900" style={{ fontWeight: 700 }}>WFH Request</h2>
              <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {/* Candidate */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-700 text-white" style={{ background: 'linear-gradient(135deg,#6115D0,#8B45FF)', fontWeight: 700 }}>
                  {selected.candidateName?.split(' ').map(n => n[0]).join('') ?? '?'}
                </div>
                <div>
                  <p className="font-700 text-gray-900" style={{ fontWeight: 700 }}>{selected.candidateName}</p>
                  <p className="text-sm text-gray-400">{selected.cohort}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <InfoRow icon={<Calendar size={15} className="text-gray-400" />} label="Requested date" value={selected.date} />
                <InfoRow icon={<Calendar size={15} className="text-gray-400" />} label="Submitted" value={selected.submittedDate} />
                <div>
                  <p className="text-xs font-600 text-gray-400 mb-1" style={{ fontWeight: 600 }}>Reason</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{selected.reason}</p>
                </div>
                {selected.supportingInfo && (
                  <div>
                    <p className="text-xs font-600 text-gray-400 mb-1" style={{ fontWeight: 600 }}>Supporting information</p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: '#6115D0' }}>
                      <Paperclip size={13} />
                      {selected.supportingInfo}
                    </div>
                  </div>
                )}
              </div>

              {/* Action area */}
              {selected.status === 'Pending' && !declineMode && !confirmApprove && (
                <div className="mt-8 flex gap-3">
                  <button className="btn-primary flex-1" onClick={() => setConfirmApprove(true)}>Approve</button>
                  <button className="btn-coral flex-1" onClick={() => setDeclineMode(true)}>Decline</button>
                </div>
              )}

              {selected.status === 'Pending' && confirmApprove && (
                <div className="mt-8 p-4 rounded-xl" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                  <p className="text-sm font-600 text-gray-900 mb-3" style={{ fontWeight: 600 }}>Confirm approval</p>
                  <p className="text-sm text-gray-500 mb-4">Approve WFH for {selected.candidateName} on {selected.date}?</p>
                  <div className="flex gap-3">
                    <button className="btn-primary" onClick={handleApprove}>Confirm Approve</button>
                    <button className="btn-secondary" onClick={() => setConfirmApprove(false)}>Cancel</button>
                  </div>
                </div>
              )}

              {selected.status === 'Pending' && declineMode && (
                <div className="mt-8">
                  <label className="form-label">Reason for declining <span style={{ color: '#E05A3A' }}>*</span></label>
                  <textarea
                    className="form-input mb-4"
                    placeholder="The candidate will be able to see this reason…"
                    rows={3}
                    value={declineReason}
                    onChange={e => setDeclineReason(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <button className="btn-coral" onClick={handleDecline} disabled={!declineReason.trim()}>Confirm Decline</button>
                    <button className="btn-secondary" onClick={() => setDeclineMode(false)}>Cancel</button>
                  </div>
                </div>
              )}

              {selected.status !== 'Pending' && (
                <div className="mt-6">
                  <StatusBadge status={selected.status} />
                  {selected.mentorReason && (
                    <div className="mt-3 p-3 rounded-xl text-sm text-gray-600" style={{ background: '#FEE2E2' }}>
                      <span className="font-600 block mb-0.5" style={{ fontWeight: 600 }}>Reason given to candidate:</span>
                      {selected.mentorReason}
                    </div>
                  )}
                </div>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-600 text-gray-400 mb-1" style={{ fontWeight: 600 }}>{label}</p>
      <div className="flex items-center gap-2 text-sm text-gray-700">
        {icon}
        {value}
      </div>
    </div>
  )
}
