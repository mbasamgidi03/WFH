import { useState } from 'react'
import { ChevronRight, ChevronDown, Clock, Paperclip } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge'
import { candidateReports } from '../../data'
import type { Report } from '../../types'

type ReportType = 'lateness' | 'absence'

export default function CandidateReports() {
  const [activeForm, setActiveForm] = useState<ReportType | null>(null)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [reports, setReports] = useState(candidateReports)
  const [form, setForm] = useState({ reason: '', supportingInfo: '' })

  const today = '19 September 2026'
  const todayReport = reports.find(r => r.date === today)
  const previousReports = reports.filter(r => r.date !== today)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.reason) return
    const newReport: Report = {
      id: `r-new-${Date.now()}`,
      type: activeForm!,
      reason: form.reason,
      supportingInfo: form.supportingInfo || undefined,
      time: new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' }),
      date: today,
    }
    setReports(r => [newReport, ...r])
    setForm({ reason: '', supportingInfo: '' })
    setActiveForm(null)
  }

  return (
    <div className="resp-page">
      <div className="max-w-2xl">
        <h1 className="text-xl font-800 text-gray-900 mb-8" style={{ fontWeight: 800 }}>Reports</h1>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            className="card p-5 text-left flex items-start gap-4 transition-all hover:shadow-md cursor-pointer"
            style={{ border: activeForm === 'lateness' ? '2px solid #6115D0' : undefined }}
            onClick={() => setActiveForm(t => t === 'lateness' ? null : 'lateness')}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: '#FEF3C7' }}>
              🕐
            </div>
            <div>
              <p className="font-700 text-gray-900 text-sm" style={{ fontWeight: 700 }}>Report Lateness</p>
              <p className="text-xs text-gray-400 mt-0.5">Let your mentor know you'll be late</p>
            </div>
          </button>

          <button
            className="card p-5 text-left flex items-start gap-4 transition-all hover:shadow-md cursor-pointer"
            style={{ border: activeForm === 'absence' ? '2px solid #E05A3A' : undefined }}
            onClick={() => setActiveForm(t => t === 'absence' ? null : 'absence')}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: '#FDEEE9' }}>
              🏥
            </div>
            <div>
              <p className="font-700 text-gray-900 text-sm" style={{ fontWeight: 700 }}>Report Absence</p>
              <p className="text-xs text-gray-400 mt-0.5">Notify your mentor you won't be in</p>
            </div>
          </button>
        </div>

        {/* Form */}
        {activeForm && (
          <div className="card p-6 mb-6">
            <h2 className="font-700 text-gray-900 text-base mb-5" style={{ fontWeight: 700 }}>
              {activeForm === 'lateness' ? 'Report Lateness' : 'Report Absence'}
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="form-label">Message / Reason <span style={{ color: '#E05A3A' }}>*</span></label>
                <textarea
                  className="form-input"
                  placeholder={activeForm === 'lateness'
                    ? 'Explain why you will be late today…'
                    : 'Explain why you will be absent today…'
                  }
                  value={form.reason}
                  onChange={e => setForm(f => ({ ...f, reason: e.target.value }))}
                  required
                  rows={3}
                />
              </div>
              {activeForm === 'absence' && (
                <div>
                  <label className="form-label">Supporting Information <span className="text-gray-400 font-400" style={{ fontWeight: 400 }}>(optional)</span></label>
                  <textarea
                    className="form-input"
                    placeholder="e.g. medical certificate reference…"
                    value={form.supportingInfo}
                    onChange={e => setForm(f => ({ ...f, supportingInfo: e.target.value }))}
                    rows={2}
                  />
                </div>
              )}
              <p className="text-xs text-gray-400">Date and time will be recorded automatically.</p>
              <div className="flex gap-3 mt-1">
                <button
                  type="submit"
                  className={activeForm === 'absence' ? 'btn-coral' : 'btn-primary'}
                >
                  Submit Report
                </button>
                <button type="button" className="btn-secondary" onClick={() => setActiveForm(null)}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Today's Report */}
        <div className="mb-6">
          <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>Today's Report</p>
          {todayReport ? (
            <ReportCard report={todayReport} />
          ) : (
            <div className="card p-5 text-center">
              <p className="text-sm text-gray-400">No report submitted today.</p>
            </div>
          )}
        </div>

        {/* Previous Reports */}
        <div>
          <button className="collapse-btn mb-3" onClick={() => setHistoryOpen(o => !o)}>
            {historyOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            Previous Reports ({previousReports.length})
          </button>
          {historyOpen && (
            <div className="flex flex-col gap-3">
              {previousReports.map(r => <ReportCard key={r.id} report={r} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ReportCard({ report }: { report: Report }) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <StatusBadge status={report.type} />
            <div className="flex items-center gap-1.5 text-gray-400">
              <Clock size={12} />
              <span className="text-xs">{report.date} at {report.time}</span>
            </div>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{report.reason}</p>
          {report.supportingInfo && (
            <div className="flex items-center gap-1.5 mt-2">
              <Paperclip size={13} style={{ color: '#6115D0' }} />
              <span className="text-sm" style={{ color: '#6115D0' }}>{report.supportingInfo}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
