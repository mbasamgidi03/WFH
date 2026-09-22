import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Download } from 'lucide-react'
import { candidates, cohorts } from '../../data'

type AttendanceCategory = 'office' | 'wfh' | 'absent'

interface DayAttendance {
  day: string
  office: number
  wfh: number
  absent: number
}

interface AttendanceRecord {
  signInTime?: string
  workLocation?: 'Office' | 'Work From Home'
  location?: string
}

const weeklyAttendance: Record<string, DayAttendance[]> = {
  'Demand Academy 1': [
    { day: 'Monday',    office: 13, wfh: 5, absent: 2 },
    { day: 'Tuesday',   office: 15, wfh: 4, absent: 1 },
    { day: 'Wednesday', office: 12, wfh: 6, absent: 2 },
    { day: 'Thursday',  office: 14, wfh: 4, absent: 2 },
    { day: 'Friday',    office: 11, wfh: 6, absent: 3 },
  ],
  'Demand Academy 2': [
    { day: 'Monday',    office: 14, wfh: 4, absent: 2 },
    { day: 'Tuesday',   office: 16, wfh: 3, absent: 1 },
    { day: 'Wednesday', office: 13, wfh: 5, absent: 2 },
    { day: 'Thursday',  office: 15, wfh: 4, absent: 1 },
    { day: 'Friday',    office: 12, wfh: 5, absent: 3 },
  ],
  'Software Dev Cohort A': [
    { day: 'Monday',    office: 12, wfh: 6, absent: 2 },
    { day: 'Tuesday',   office: 14, wfh: 4, absent: 2 },
    { day: 'Wednesday', office: 11, wfh: 7, absent: 2 },
    { day: 'Thursday',  office: 13, wfh: 5, absent: 2 },
    { day: 'Friday',    office: 10, wfh: 7, absent: 3 },
  ],
}

const categoryStyles: Record<AttendanceCategory, { label: string; color: string }> = {
  office: { label: 'Office', color: '#1D2951' },
  wfh:    { label: 'Work From Home', color: '#6115D0' },
  absent: { label: 'Absent', color: '#E05A3A' },
}

const locations = [
  'Salt River, Cape Town',
  'Khayelitsha, Cape Town',
  'Woodstock, Cape Town',
  'Observatory, Cape Town',
  'Bellville, Cape Town',
]

function getAttendanceRecord(candidateId: string, selectedDate: string): AttendanceRecord {
  if (selectedDate === '2026-09-19') {
    const pinnedRecords: Record<string, AttendanceRecord> = {
      'c-1': { signInTime: '08:52', workLocation: 'Office',        location: 'Salt River, Cape Town' },
      'c-2': { signInTime: '09:03', workLocation: 'Work From Home', location: 'Khayelitsha, Cape Town' },
      'c-3': {},
      'c-4': { signInTime: '08:40', workLocation: 'Office',        location: 'Woodstock, Cape Town' },
      'c-5': { signInTime: '08:58', workLocation: 'Office',        location: 'Salt River, Cape Town' },
      'c-6': { signInTime: '08:45', workLocation: 'Work From Home', location: 'Bellville, Cape Town' },
      'c-7': {},
    }
    if (candidateId in pinnedRecords) return pinnedRecords[candidateId]
  }

  const candidateNumber = Number(candidateId.split('-')[1])
  const dateNumber = Number(selectedDate.slice(-2))
  if ((candidateNumber + dateNumber) % 4 === 0) return {}

  const minute = 40 + ((candidateNumber * 7 + dateNumber) % 25)
  return {
    signInTime:   `08:${String(minute).padStart(2, '0')}`,
    workLocation: (candidateNumber + dateNumber) % 3 === 0 ? 'Work From Home' : 'Office',
    location:     locations[(candidateNumber + dateNumber) % locations.length],
  }
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-ZA', {
    day: '2-digit', month: 'short', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`))
}

export default function MentorWFHAttendance() {
  const [selectedCohort, setSelectedCohort] = useState(cohorts[0])
  const [selectedDate, setSelectedDate] = useState('2026-09-19')
  const [registerOpen, setRegisterOpen] = useState(false)

  const cohortCandidates = candidates.filter(c => c.cohort === selectedCohort)
  const chartData = weeklyAttendance[selectedCohort] ?? []
  const chartMax = Math.max(1, ...chartData.flatMap(day => [day.office, day.wfh, day.absent]))

  const [animatedHeights, setAnimatedHeights] = useState<Record<string, Record<AttendanceCategory, number>>>({})

  useEffect(() => {
    const real: Record<string, Record<AttendanceCategory, number>> = {}
    for (const day of chartData) {
      real[day.day] = { office: day.office, wfh: day.wfh, absent: day.absent }
    }

    // On first page load, start from zero so the bars rise into view.
    if (Object.keys(animatedHeights).length === 0) {
      const zeros: Record<string, Record<AttendanceCategory, number>> = {}
      for (const day of chartData) {
        zeros[day.day] = { office: 0, wfh: 0, absent: 0 }
      }

      setAnimatedHeights(zeros)

      const raf = requestAnimationFrame(() => {
        setAnimatedHeights(real)
      })

      return () => cancelAnimationFrame(raf)
    }

    // On cohort change, transition directly from the old heights to the new heights.
    setAnimatedHeights(real)
  }, [selectedCohort])

  const attendanceRows = cohortCandidates.map(candidate => ({
    candidate,
    attendance: getAttendanceRecord(candidate.id, selectedDate),
  }))

  const handleDownload = () => {
    const rows = [
      ['Candidate', 'Date', 'Sign-in Time', 'Work Location', 'Location'],
      ...attendanceRows.map(({ candidate, attendance }) => [
        candidate.name,
        formatDate(selectedDate),
        attendance.signInTime  ?? '—',
        attendance.workLocation ?? '—',
        attendance.location    ?? '—',
      ]),
    ]
    const csv = rows
      .map(row => row.map(value => `"${value.replace(/"/g, '""')}"`).join(','))
      .join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `attendance-register-${selectedCohort.replace(/\s/g, '-')}-${selectedDate}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="resp-page">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-xl text-gray-900" style={{ fontWeight: 800 }}>Candidate Attendance</h1>
          <p className="text-sm text-gray-400 mt-0.5">View candidate attendance for the selected cohort.</p>
        </div>

        <div className="mb-6" style={{ maxWidth: 320 }}>
          <label className="form-label">Cohort</label>
          <select
            className="form-input"
            value={selectedCohort}
            onChange={e => setSelectedCohort(e.target.value)}
          >
            {cohorts.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        {/* Weekly grouped attendance chart */}
        <section className="card p-5 sm:p-6 mb-6">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
            <div>
              <h2 className="text-base text-gray-900" style={{ fontWeight: 700 }}>Weekly Cohort Attendance</h2>
              <p className="text-sm text-gray-400 mt-0.5">14–18 September 2026</p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Attendance categories">
              {(Object.keys(categoryStyles) as AttendanceCategory[]).map(category => (
                <div key={category} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ background: categoryStyles[category].color }} />
                  {categoryStyles[category].label}
                </div>
              ))}
            </div>
          </div>

          <div className="flex">
            <div className="h-52 flex flex-col justify-between pr-3 pb-7 text-[10px] text-gray-400 text-right" aria-hidden="true">
              {Array.from({ length: chartMax + 1 }, (_, i) => chartMax - i).map(value => (
                <span key={value}>{value}</span>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className="h-52 flex items-end border-b border-l border-gray-200"
                style={{
                  backgroundImage: `repeating-linear-gradient(to bottom, #F3F4F6 0, #F3F4F6 1px, transparent 1px, transparent ${100 / chartMax}%)`,
                }}
                aria-label={`Grouped bar chart for ${selectedCohort}`}
              >
                {chartData.map(day => (
                  <div key={day.day} className="flex-1 h-full flex flex-col justify-end min-w-0">
                    <div className="flex-1 flex items-end justify-center gap-1 sm:gap-2 px-1 sm:px-3">
                      {(Object.keys(categoryStyles) as AttendanceCategory[]).map(category => {
                        const animValue = animatedHeights[day.day]?.[category] ?? 0
                        return (
                          <div
                            key={category}
                            className="w-full max-w-5 rounded-t-sm"
                            style={{
                              height: `${(animValue / chartMax) * 100}%`,
                              minHeight: animValue ? 4 : 0,
                              background: categoryStyles[category].color,
                              transition: 'height 900ms cubic-bezier(0.0, 0.0, 0.2, 1)',
                            }}
                            title={`${day.day} — ${categoryStyles[category].label}: ${day[category]}`}
                          />
                        )
                      })}
                    </div>
                    <span className="h-7 flex items-end justify-center pb-0.5 text-[9px] sm:text-[11px] text-gray-500 whitespace-nowrap">
                      {day.day}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2 text-center">Weekday</p>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-[-14px]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Candidates
          </p>
        </section>

        {/* Progressively disclosed attendance register */}
        <section>
          <button
            className="collapse-btn"
            onClick={() => setRegisterOpen(open => !open)}
            aria-expanded={registerOpen}
          >
            {registerOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            View Attendance Register
          </button>

          {registerOpen && (
            <div className="mt-4">
              <div className="filter-row items-end">
                <div style={{ flex: 1, minWidth: 180, maxWidth: 320 }}>
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-input"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                  />
                </div>
                <button className="btn-secondary" onClick={handleDownload}>
                  <Download size={15} />
                  Download Register
                </button>
              </div>

              <div className="card overflow-hidden table-scroll">
                <table className="w-full" style={{ minWidth: 760 }}>
                  <thead>
                    <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                      {['Candidate', 'Date', 'Sign-in Time', 'Work Location', 'Location'].map(column => (
                        <th key={column} className="text-left px-5 py-3 text-xs text-gray-400 uppercase tracking-wide" style={{ fontWeight: 600, letterSpacing: '0.07em' }}>
                          {column}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRows.map(({ candidate, attendance }, i) => (
                      <tr key={candidate.id} style={{ borderTop: i === 0 ? 'none' : '1px solid #F3F4F6' }}>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6115D0,#8B45FF)', fontWeight: 700 }}>
                              {candidate.initials}
                            </div>
                            <span className="text-sm text-gray-900 whitespace-nowrap" style={{ fontWeight: 500 }}>{candidate.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{formatDate(selectedDate)}</td>
                        <td className="px-5 py-4 text-sm text-gray-500">{attendance.signInTime ?? '—'}</td>
                        <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{attendance.workLocation ?? '—'}</td>
                        <td className="px-5 py-4 text-sm text-gray-500 whitespace-nowrap">{attendance.location ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
