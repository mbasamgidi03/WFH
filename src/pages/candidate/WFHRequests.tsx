import { useState } from 'react'
import { Plus, ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import { candidateWFHRequests } from '../../data'
import type { WFHRequest } from '../../types'

export default function CandidateWFHRequests() {
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [declineReasonId, setDeclineReasonId] = useState<string | null>(null)

  const [form, setForm] = useState({ date: '', reason: '', supportingInfo: '' })

  const current = candidateWFHRequests[0]
  const previous = candidateWFHRequests.slice(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.date || !form.reason) return
    setSubmitted(true)
    setShowForm(false)
  }

  return (
    <div className="resp-page">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-800 text-gray-900" style={{ fontWeight: 800 }}>Work From Home Request</h1>
          {!showForm && (
            <button className="btn-primary" onClick={() => { setShowForm(true); setSubmitted(false) }}>
              <Plus size={16} />
              New WFH Request
            </button>
          )}
        </div>

        {/* Success state */}
        {submitted && (
          <div className="card p-6 mb-6 flex gap-4 items-start" style={{ borderLeft: '4px solid #6115D0' }}>
            <CheckCircle2 size={22} style={{ color: '#6115D0', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="font-700 text-gray-900 text-base mb-1" style={{ fontWeight: 700 }}>WFH request sent!</p>
              <p className="text-sm text-gray-500">Your request has been sent to your mentor for review. Fingers crossed 🤞🏽</p>
              <div className="mt-3">
                <StatusBadge status="Pending" />
              </div>
            </div>
          </div>
        )}

        {/* New Request Form */}
        {showForm && (
          <div className="card p-6 mb-6">
            <h2 className="font-700 text-gray-900 text-base mb-5" style={{ fontWeight: 700 }}>New WFH Request</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="form-label">Date <span style={{ color: '#E05A3A' }}>*</span></label>
                <input
                  type="date"
                  className="form-input"
                  value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="form-label">Reason <span style={{ color: '#E05A3A' }}>*</span></label>
                <textarea
                  className="form-input"
                  placeholder="Please provide a reason for your WFH request…"
                  value={form.reason}
                  onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                  required
                  rows={3}
                />
              </div>
              <div>
                <label className="form-label">Supporting Information <span className="text-gray-400 font-400" style={{ fontWeight: 400 }}>(optional)</span></label>
                <textarea
                  className="form-input"
                  placeholder="Any additional context or references…"
                  value={form.supportingInfo}
                  onChange={e => setForm(f => ({ ...f, supportingInfo: e.target.value }))}
                  rows={2}
                />
              </div>
              <div className="flex gap-3 mt-1">
                <button type="submit" className="btn-primary">Submit Request</button>
                <button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Current Request */}
        <div className="mb-6">
          <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>Current / Upcoming Request</p>
          <CurrentRequest req={current} onViewDeclineReason={setDeclineReasonId} declineReasonId={declineReasonId} />
        </div>

        {/* Previous Requests */}
        <div>
          <button className="collapse-btn mb-3" onClick={() => setHistoryOpen(o => !o)}>
            {historyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            Previous Requests ({previous.length})
          </button>

          {historyOpen && (
            <div className="flex flex-col gap-3">
              {previous.map(req => (
                <CurrentRequest key={req.id} req={req} onViewDeclineReason={setDeclineReasonId} declineReasonId={declineReasonId} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function CurrentRequest({ req, onViewDeclineReason, declineReasonId }: {
  req: WFHRequest
  onViewDeclineReason: (id: string | null) => void
  declineReasonId: string | null
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <StatusBadge status={req.status} />
          </div>
          <p className="text-sm font-600 text-gray-900 mb-1" style={{ fontWeight: 600 }}>
            📅 {req.date}
          </p>
          <p className="text-sm text-gray-500 mb-1">Submitted: {req.submittedDate}</p>
          <p className="text-sm text-gray-700 mt-3 leading-relaxed">{req.reason}</p>
          {req.supportingInfo && (
            <p className="text-xs text-gray-400 mt-1.5">Supporting info: {req.supportingInfo}</p>
          )}
          {req.status === 'Declined' && (
            <button
              className="mt-3 text-sm font-600 flex items-center gap-1.5"
              style={{ color: '#E05A3A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              onClick={() => onViewDeclineReason(declineReasonId === req.id ? null : req.id)}
            >
              {declineReasonId === req.id ? 'Hide reason' : "View mentor's reason"}
              <ChevronDown size={14} style={{ transform: declineReasonId === req.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }} />
            </button>
          )}
          {req.status === 'Declined' && declineReasonId === req.id && req.mentorReason && (
            <div className="mt-3 p-3 rounded-xl text-sm text-gray-600 leading-relaxed" style={{ background: '#FEE2E2', borderLeft: '3px solid #E05A3A' }}>
              <span className="font-600 block mb-0.5" style={{ fontWeight: 600 }}>Mentor's reason:</span>
              {req.mentorReason}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
