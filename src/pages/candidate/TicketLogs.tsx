import { useState } from 'react'
import {
  Plus,
  Paperclip,
  ChevronRight,
  ChevronDown,
  Clock,
} from 'lucide-react'
import { candidateTicketLogs } from '../../data'
import type { TicketLog } from '../../types'

export default function CandidateTicketLogs() {
  const [showForm, setShowForm] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const [form, setForm] = useState({
    title: '',
    description: '',
    evidence: '',
  })

  const [logs, setLogs] = useState(candidateTicketLogs)

  const today = '19 September 2026'

  const todayLogs = logs.filter(
    log => log.date === today
  )

  const previousLogs = logs.filter(
    log => log.date !== today
  )

  const groupedPrevious = previousLogs.reduce<
    Record<string, TicketLog[]>
  >((acc, log) => {
    if (!acc[log.date]) {
      acc[log.date] = []
    }

    acc[log.date].push(log)

    return acc
  }, {})

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    if (
      !form.title ||
      !form.description ||
      !form.evidence
    ) {
      return
    }

    const newLog: TicketLog = {
      id: `tl-new-${Date.now()}`,
      title: form.title,
      description: form.description,
      evidence: form.evidence,
      time: new Date().toLocaleTimeString(
        'en-ZA',
        {
          hour: '2-digit',
          minute: '2-digit',
        }
      ),
      date: today,
    }

    setLogs(currentLogs => [
      newLog,
      ...currentLogs,
    ])

    setForm({
      title: '',
      description: '',
      evidence: '',
    })

    setShowForm(false)
  }

  return (
    <div className="resp-page">
      <div className="max-w-2xl">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="text-xl font-800 text-gray-900"
              style={{ fontWeight: 800 }}
            >
              Daily Logs
            </h1>

            <p className="text-sm text-gray-400 mt-0.5">
              Record your daily work and learning activities.
            </p>
          </div>

          {!showForm && (
            <button
              className="btn-primary"
              onClick={() =>
                setShowForm(true)
              }
            >
              <Plus size={16} />
              New Log
            </button>
          )}
        </div>

        {/* New Daily Log Form */}
        {showForm && (
          <div className="card p-6 mb-6">
            <h2
              className="font-700 text-gray-900 text-base mb-5"
              style={{
                fontWeight: 700,
              }}
            >
              New Daily Log
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >

              {/* Title */}
              <div>
                <label className="form-label">
                  Title{' '}
                  <span
                    style={{
                      color: '#E05A3A',
                    }}
                  >
                    *
                  </span>
                </label>

                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Coursera – Software Development Module 1"
                  value={form.title}
                  onChange={e =>
                    setForm(current => ({
                      ...current,
                      title:
                        e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="form-label">
                  Description{' '}
                  <span
                    style={{
                      color: '#E05A3A',
                    }}
                  >
                    *
                  </span>
                </label>

                <textarea
                  className="form-input"
                  placeholder="Describe the work or learning you completed…"
                  value={
                    form.description
                  }
                  onChange={e =>
                    setForm(current => ({
                      ...current,
                      description:
                        e.target.value,
                    }))
                  }
                  required
                  rows={3}
                />
              </div>

              {/* Supporting Evidence */}
              <div>
                <label className="form-label">
                  Supporting Evidence{' '}
                  <span
                    style={{
                      color: '#E05A3A',
                    }}
                  >
                    *
                  </span>
                </label>

                <input
                  type="text"
                  className="form-input"
                  placeholder="Filename or reference, e.g. certificate.png"
                  value={
                    form.evidence
                  }
                  onChange={e =>
                    setForm(current => ({
                      ...current,
                      evidence:
                        e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 mt-1">
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Submit Log
                </button>

                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Today's Logs */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <p
              className="text-xs font-600 text-gray-400 uppercase tracking-widest"
              style={{
                fontWeight: 600,
                letterSpacing:
                  '0.1em',
              }}
            >
              Today —{' '}
              {todayLogs.length}{' '}
              {todayLogs.length === 1
                ? 'log'
                : 'logs'}
            </p>
          </div>

          {todayLogs.length ===
          0 ? (
            <div className="card p-8 text-center">
              <p className="text-gray-400 text-sm">
                No daily logs
                submitted today yet.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {todayLogs.map(log => (
                <LogCard
                  key={log.id}
                  log={log}
                />
              ))}
            </div>
          )}
        </div>

        {/* Previous Daily Logs */}
        <div>
          <button
            className="collapse-btn mb-3"
            onClick={() =>
              setShowAll(
                current => !current
              )
            }
          >
            {showAll ? (
              <ChevronDown
                size={16}
              />
            ) : (
              <ChevronRight
                size={16}
              />
            )}

            View All Daily Logs
          </button>

          {showAll &&
            Object.entries(
              groupedPrevious
            ).map(
              ([
                date,
                dateLogs,
              ]) => (
                <div
                  key={date}
                  className="mb-5"
                >
                  <p
                    className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3"
                    style={{
                      fontWeight:
                        600,
                      letterSpacing:
                        '0.1em',
                    }}
                  >
                    {date} —{' '}
                    {
                      dateLogs.length
                    }{' '}
                    {dateLogs.length ===
                    1
                      ? 'log'
                      : 'logs'}
                  </p>

                  <div className="flex flex-col gap-3">
                    {dateLogs.map(
                      log => (
                        <LogCard
                          key={
                            log.id
                          }
                          log={
                            log
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              )
            )}
        </div>

      </div>
    </div>
  )
}

function LogCard({
  log,
}: {
  log: TicketLog
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">

        <div className="flex-1 min-w-0">

          {/* Time */}
          <div className="flex items-center gap-2 mb-1">
            <Clock
              size={13}
              className="text-gray-400 flex-shrink-0"
            />

            <span className="text-xs text-gray-400">
              {log.time}
            </span>
          </div>

          {/* Log Title */}
          <p
            className="font-600 text-gray-900 text-sm mb-1.5"
            style={{
              fontWeight: 600,
            }}
          >
            {log.title}
          </p>

          {/* Log Description */}
          <p className="text-sm text-gray-500 leading-relaxed">
            {log.description}
          </p>

          {/* Evidence */}
          <div className="flex items-center gap-1.5 mt-3">
            <Paperclip
              size={13}
              style={{
                color:
                  '#6115D0',
                flexShrink: 0,
              }}
            />

            <button
              className="text-sm font-500"
              style={{
                color:
                  '#6115D0',
                background:
                  'none',
                border:
                  'none',
                cursor:
                  'pointer',
                padding: 0,
                fontWeight:
                  500,
              }}
            >
              {log.evidence}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}