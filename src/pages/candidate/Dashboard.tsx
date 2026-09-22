import { useState } from 'react'
import { ClipboardList, Home, Flag, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import RingDecoration from '../../components/RingDecoration'

export default function CandidateDashboard() {
  const [registered, setRegistered] = useState(false)
  const registrationTime = '08:47'

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="resp-page relative">
      <RingDecoration />

      {/* Greeting */}
      <div className="mb-8">
        <p className="text-sm text-gray-400 font-500 mb-1" style={{ fontWeight: 500 }}>Friday, 19 September 2026</p>
        <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>
          {greeting}, Thabo. 👋🏽
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Card 1: Attendance */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-1" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                Today's Attendance
              </p>
              {registered ? (
                <>
                  <div className="flex items-center gap-2 mt-2">
                    <CheckCircle2 size={20} style={{ color: '#10B981' }} />
                    <span className="text-lg font-700 text-gray-900" style={{ fontWeight: 700 }}>Registered</span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <Clock size={13} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Signed in at {registrationTime}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 mt-2">
                    <AlertCircle size={20} className="text-gray-400" />
                    <span className="text-lg font-700 text-gray-400" style={{ fontWeight: 700 }}>Not Registered</span>
                  </div>
                  <button
                    className="btn-primary mt-4"
                    style={{ fontSize: '0.8125rem', padding: '8px 16px' }}
                    onClick={() => setRegistered(true)}
                  >
                    Sign Register
                  </button>
                </>
              )}
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F3F4F6' }}>
              <CheckCircle2 size={20} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Card 2: WFH Status */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-1" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                WFH Status
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Home size={20} style={{ color: '#6115D0' }} />
                <span className="text-lg font-700 text-gray-900" style={{ fontWeight: 700 }}>Office Day</span>
              </div>
              <p className="text-sm text-gray-400 mt-1.5">No approved WFH for today</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#F5F2FE' }}>
              <Home size={20} style={{ color: '#6115D0' }} />
            </div>
          </div>
        </div>

        {/* Card 3: Ticket Logs */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-1" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                Today's Ticket Logs
              </p>
              <div className="flex items-end gap-1.5 mt-2">
                <span className="text-3xl font-800 text-gray-900" style={{ fontWeight: 800 }}>2</span>
                <span className="text-sm text-gray-400 mb-1">logs submitted</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EDE8FB' }}>
              <ClipboardList size={20} style={{ color: '#6115D0' }} />
            </div>
          </div>
        </div>

        {/* Card 4: Reports */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-1" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                Reports
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Flag size={20} style={{ color: '#E05A3A' }} />
                <span className="text-lg font-700 text-gray-900" style={{ fontWeight: 700 }}>Lateness Reported</span>
              </div>
              <p className="text-sm text-gray-400 mt-1.5">Submitted at 08:47</p>
            </div>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#FDEEE9' }}>
              <Flag size={20} style={{ color: '#E05A3A' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
