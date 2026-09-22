export default function AccessConfiguration() {
  return (
    <div className="resp-page">
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D2951', marginBottom: 6 }}>
        Access & Configuration
      </h1>
      <p style={{ fontSize: '0.9375rem', color: '#6B7280', marginBottom: 48 }}>
        Manage system-wide access and configuration.
      </p>

      <div className="card" style={{ padding: '40px 36px', maxWidth: 520, textAlign: 'center' }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: '#F5F2FE',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6115D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
          </svg>
        </div>
        <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#1D2951', marginBottom: 8 }}>
          Configuration coming soon
        </p>
        <p style={{ fontSize: '0.875rem', color: '#9CA3AF', lineHeight: 1.6 }}>
          System-wide access and configuration settings have not yet been defined.<br />
          This section will be populated once requirements are confirmed.
        </p>
      </div>
    </div>
  )
}
