import { Home, Users } from 'lucide-react'
import RingDecoration from '../../components/RingDecoration'

export default function MentorDashboard() {
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="resp-page relative">
      <RingDecoration />

      <div className="mb-8">
        <p className="text-sm text-gray-400 font-500 mb-1" style={{ fontWeight: 500 }}>Friday, 19 September 2026</p>
        <h1 className="text-2xl font-800 text-gray-900" style={{ fontWeight: 800 }}>
          {greeting}, Naledi. 👋🏽
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl" style={{ position: 'relative', zIndex: 1 }}>
        {/* Pending WFH */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                Pending WFH Requests
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-800 text-gray-900" style={{ fontWeight: 800 }}>3</span>
                <span className="text-sm text-gray-400 mb-1.5">pending</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#EDE8FB' }}>
              <Home size={20} style={{ color: '#6115D0' }} />
            </div>
          </div>
        </div>

        {/* Approved WFH Today */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-600 text-gray-400 uppercase tracking-widest mb-3" style={{ fontWeight: 600, letterSpacing: '0.1em' }}>
                Approved WFH Today
              </p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-800 text-gray-900" style={{ fontWeight: 800 }}>5</span>
                <span className="text-sm text-gray-400 mb-1.5">approved</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: '#D1FAE5' }}>
              <Users size={20} style={{ color: '#065F46' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
