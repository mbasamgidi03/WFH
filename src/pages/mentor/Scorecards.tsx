import { useState } from 'react'
import { Search, X, Star } from 'lucide-react'

type ScoreArea = {
  score: number
  comment: string
}

type CandidateScorecard = {
  id: number
  name: string
  initials: string
  cohort: string
  group: string
  attendance: ScoreArea
  communication: ScoreArea
  accountability: ScoreArea
  creativity: ScoreArea
  projectDelivery: ScoreArea
  techSkills: ScoreArea
}

const candidates: CandidateScorecard[] = [
  {
    id: 1,
    name: 'Lerato Mokoena',
    initials: 'LM',
    cohort: 'Software Development Cohort A',
    group: 'Group 1 – Innovators',
    attendance: {
      score: 5,
      comment: 'Consistently attends sessions and arrives on time.',
    },
    communication: {
      score: 4,
      comment: 'Communicates clearly and contributes during discussions.',
    },
    accountability: {
      score: 5,
      comment: 'Takes responsibility for tasks and meets deadlines.',
    },
    creativity: {
      score: 4,
      comment: 'Shows initiative and contributes useful ideas.',
    },
    projectDelivery: {
      score: 3,
      comment: 'Good progress, but delivery can be more consistent.',
    },
    techSkills: {
      score: 4,
      comment: 'Demonstrates good technical understanding.',
    },
  },
  {
    id: 2,
    name: 'Ayanda Ndlovu',
    initials: 'AN',
    cohort: 'Software Development Cohort A',
    group: 'Group 1 – Innovators',
    attendance: {
      score: 4,
      comment: 'Maintains good attendance overall.',
    },
    communication: {
      score: 4,
      comment: 'Communicates effectively with the team.',
    },
    accountability: {
      score: 5,
      comment: 'Dependable and takes ownership of assigned work.',
    },
    creativity: {
      score: 5,
      comment: 'Frequently introduces creative solutions.',
    },
    projectDelivery: {
      score: 4,
      comment: 'Delivers project tasks to a good standard.',
    },
    techSkills: {
      score: 4,
      comment: 'Shows strong progress in technical skills.',
    },
  },
  {
    id: 3,
    name: 'Kabelo Molefe',
    initials: 'KM',
    cohort: 'Software Development Cohort A',
    group: 'Group 2 – Code Crew',
    attendance: {
      score: 5,
      comment: 'Excellent attendance.',
    },
    communication: {
      score: 3,
      comment: 'Should participate more actively in team discussions.',
    },
    accountability: {
      score: 4,
      comment: 'Completes assigned responsibilities reliably.',
    },
    creativity: {
      score: 4,
      comment: 'Contributes useful ideas during project work.',
    },
    projectDelivery: {
      score: 4,
      comment: 'Consistently completes project tasks.',
    },
    techSkills: {
      score: 5,
      comment: 'Demonstrates strong technical ability.',
    },
  },
  {
    id: 4,
    name: 'Zinhle Dlamini',
    initials: 'ZD',
    cohort: 'Software Development Cohort B',
    group: 'Group 3 – Tech Minds',
    attendance: {
      score: 4,
      comment: 'Good attendance with minor room for improvement.',
    },
    communication: {
      score: 5,
      comment: 'Excellent communicator and active team contributor.',
    },
    accountability: {
      score: 4,
      comment: 'Takes responsibility for assigned work.',
    },
    creativity: {
      score: 5,
      comment: 'Shows excellent creativity and ownership.',
    },
    projectDelivery: {
      score: 5,
      comment: 'Delivers high-quality work consistently.',
    },
    techSkills: {
      score: 4,
      comment: 'Strong technical foundation and continues to improve.',
    },
  },
  {
    id: 5,
    name: 'Thando Maseko',
    initials: 'TM',
    cohort: 'Software Development Cohort B',
    group: 'Group 3 – Tech Minds',
    attendance: {
      score: 5,
      comment: 'Excellent attendance and punctuality.',
    },
    communication: {
      score: 4,
      comment: 'Communicates well with team members.',
    },
    accountability: {
      score: 4,
      comment: 'Shows good responsibility for assigned tasks.',
    },
    creativity: {
      score: 3,
      comment: 'Can take more initiative when developing solutions.',
    },
    projectDelivery: {
      score: 4,
      comment: 'Produces consistent project work.',
    },
    techSkills: {
      score: 4,
      comment: 'Shows good technical knowledge.',
    },
  },
]

const getOverall = (candidate: CandidateScorecard) => {
  const total =
    candidate.attendance.score +
    candidate.communication.score +
    candidate.accountability.score +
    candidate.creativity.score +
    candidate.projectDelivery.score +
    candidate.techSkills.score

  return Math.round((total / 30) * 100)
}

export default function MentorScorecards() {
  const [selectedCohort, setSelectedCohort] = useState('All Cohorts')
  const [selectedGroup, setSelectedGroup] = useState('All Groups')
  const [search, setSearch] = useState('')
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateScorecard | null>(null)

  const cohorts = [...new Set(candidates.map(candidate => candidate.cohort))]

  const groups = [
    ...new Set(
      candidates
        .filter(
          candidate =>
            selectedCohort === 'All Cohorts' ||
            candidate.cohort === selectedCohort
        )
        .map(candidate => candidate.group)
    ),
  ]

  const filteredCandidates = candidates.filter(candidate => {
    const matchesCohort =
      selectedCohort === 'All Cohorts' ||
      candidate.cohort === selectedCohort

    const matchesGroup =
      selectedGroup === 'All Groups' ||
      candidate.group === selectedGroup

    const matchesSearch = candidate.name
      .toLowerCase()
      .includes(search.toLowerCase())

    return matchesCohort && matchesGroup && matchesSearch
  })

  const scoreRows = selectedCandidate
    ? [
        ['Attendance', selectedCandidate.attendance],
        ['Communication', selectedCandidate.communication],
        ['Accountability', selectedCandidate.accountability],
        ['Creativity & Ownership', selectedCandidate.creativity],
        ['Project Delivery', selectedCandidate.projectDelivery],
        ['Tech Skills', selectedCandidate.techSkills],
      ] as [string, ScoreArea][]
    : []

  return (
    <div className="resp-page">
      <div className="w-full">
        {/* Heading */}
        <div className="mb-6">
          <h1
            className="text-xl text-gray-900"
            style={{ fontWeight: 800 }}
          >
            Candidate Scorecards
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            View and assess candidate performance by cohort and group
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div>
            <label className="form-label">Cohort</label>
            <select
              className="form-input"
              value={selectedCohort}
              onChange={e => {
                setSelectedCohort(e.target.value)
                setSelectedGroup('All Groups')
              }}
            >
              <option>All Cohorts</option>

              {cohorts.map(cohort => (
                <option key={cohort}>{cohort}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Group</label>
            <select
              className="form-input"
              value={selectedGroup}
              onChange={e => setSelectedGroup(e.target.value)}
            >
              <option>All Groups</option>

              {groups.map(group => (
                <option key={group}>{group}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Search candidate</label>

            <div className="relative">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: 34 }}
                placeholder="Name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Scorecard Table */}
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                <th className="px-4 py-4">CANDIDATE</th>
                <th className="px-4 py-4">GROUP</th>
                <th className="px-4 py-4 text-center">ATTENDANCE</th>
                <th className="px-4 py-4 text-center">COMMUNICATION</th>
                <th className="px-4 py-4 text-center">ACCOUNTABILITY</th>
                <th className="px-4 py-4 text-center">
                  CREATIVITY & OWNERSHIP
                </th>
                <th className="px-4 py-4 text-center">PROJECT DELIVERY</th>
                <th className="px-4 py-4 text-center">TECH SKILLS</th>
                <th className="px-4 py-4 text-center">OVERALL</th>
              </tr>
            </thead>

            <tbody>
              {filteredCandidates.map(candidate => (
                <tr
                  key={candidate.id}
                  className="border-b border-gray-100 cursor-pointer"
                  onClick={() => setSelectedCandidate(candidate)}
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs text-white"
                        style={{
                          background: '#6115D0',
                          fontWeight: 700,
                        }}
                      >
                        {candidate.initials}
                      </div>

                      <span style={{ fontWeight: 600 }}>
                        {candidate.name}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-gray-500">
                    {candidate.group}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {candidate.attendance.score}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {candidate.communication.score}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {candidate.accountability.score}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {candidate.creativity.score}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {candidate.projectDelivery.score}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {candidate.techSkills.score}
                  </td>

                  <td
                    className="px-4 py-4 text-center"
                    style={{ fontWeight: 800, color: '#6115D0' }}
                  >
                    {getOverall(candidate)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCandidates.length === 0 && (
            <div className="p-10 text-center text-sm text-gray-400">
              No candidates found.
            </div>
          )}
        </div>
      </div>

      {/* Drawer backdrop */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setSelectedCandidate(null)}
        />
      )}

      {/* Candidate drawer */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-50 shadow-xl transition-transform duration-300 ${
          selectedCandidate ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          width: 'min(430px, 100vw)',
        }}
      >
        {selectedCandidate && (
          <div className="h-full overflow-y-auto">
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2
                    className="text-lg text-gray-900"
                    style={{ fontWeight: 800 }}
                  >
                    {selectedCandidate.name}
                  </h2>

                  <p className="text-xs text-gray-400 mt-1">
                    {selectedCandidate.cohort}
                  </p>

                  <p className="text-xs text-gray-400">
                    {selectedCandidate.group}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedCandidate(null)}
                  className="p-1 text-gray-400"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Overall */}
            <div className="p-6 border-b border-gray-100">
              <div
                className="rounded-xl p-4 flex items-center justify-between"
                style={{ background: '#F5F2FE' }}
              >
                <div className="flex items-center gap-3">
                  <Star size={20} style={{ color: '#6115D0' }} />

                  <span
                    className="text-sm text-gray-700"
                    style={{ fontWeight: 600 }}
                  >
                    Overall Score
                  </span>
                </div>

                <span
                  className="text-xl"
                  style={{
                    color: '#6115D0',
                    fontWeight: 800,
                  }}
                >
                  {getOverall(selectedCandidate)}%
                </span>
              </div>
            </div>

            {/* Scores + comments */}
            <div className="p-6">
              <h3
                className="text-sm text-gray-900 mb-4"
                style={{ fontWeight: 700 }}
              >
                Performance Assessment
              </h3>

              <div className="flex flex-col gap-4">
                {scoreRows.map(([label, area]) => (
                  <div
                    key={label}
                    className="border border-gray-100 rounded-xl p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p
                        className="text-sm text-gray-800"
                        style={{ fontWeight: 700 }}
                      >
                        {label}
                      </p>

                      <span
                        className="text-sm"
                        style={{
                          color: '#6115D0',
                          fontWeight: 800,
                        }}
                      >
                        {area.score} / 5
                      </span>
                    </div>

                    <p className="text-xs text-gray-400 mb-1">
                      Mentor comment
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {area.comment}
                    </p>
                  </div>
                ))}
              </div>

              <button
                className="btn-primary w-full mt-6"
                type="button"
              >
                Edit Scorecard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}