export default function CandidateScorecards() {
  return (
    <div className="resp-page flex items-start justify-start">
      <div className="max-w-lg w-full">
        <h1 className="text-xl font-800 text-gray-900 mb-2" style={{ fontWeight: 800 }}>Scorecards</h1>
        <p className="text-sm text-gray-400 mb-8">Your performance assessments</p>
        <div className="card p-10 text-center">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#F5F2FE' }}>
            <span className="text-2xl">⭐</span>
          </div>
          <p className="font-600 text-gray-700 mb-1" style={{ fontWeight: 600 }}>Coming soon</p>
          <p className="text-sm text-gray-400">Scorecards are being finalised. Check back shortly.</p>
        </div>
      </div>
    </div>
  )
}
