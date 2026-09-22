interface CheckInPopupProps {
  onConfirm: () => void
}

export default function CheckInPopup({ onConfirm }: CheckInPopupProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
      <div
        className="card p-5 pointer-events-auto"
        style={{
          width: 'min(288px, calc(100vw - 32px))',
          boxShadow: '0 8px 32px rgba(29,41,81,0.16)',
          animation: 'slideUp 0.3s ease-out',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">👋🏽</span>
          <p className="font-700 text-gray-900 text-sm" style={{ fontWeight: 700 }}>Quick check-in</p>
        </div>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed">
          Still powering through? Please confirm that you're active and working.
        </p>
        <button className="btn-primary w-full justify-center" onClick={onConfirm}>
          I'm active
        </button>
      </div>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
