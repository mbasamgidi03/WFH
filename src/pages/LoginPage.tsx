import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import capacitiLogo from '../assets/capaciti-logo-official.png'

interface LoginPageProps {
  onLogin: () => void
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin()
    }, 900)
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: '#F3F2FC' }}
    >
      {/* Corner ring decorations */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', top: -40, left: -40, pointerEvents: 'none' }}
        width="280" height="280" viewBox="0 0 280 280" fill="none"
      >
        <circle cx="60" cy="60" r="160" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.14" fill="none" />
        <circle cx="60" cy="60" r="120" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.1" fill="none" />
        <circle cx="60" cy="60" r="82" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.07" fill="none" />
      </svg>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', top: 40, right: -60, pointerEvents: 'none' }}
        width="220" height="280" viewBox="0 0 220 280" fill="none"
      >
        <circle cx="180" cy="80" r="150" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.12" fill="none" />
        <circle cx="180" cy="80" r="110" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.09" fill="none" />
      </svg>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', bottom: -40, right: -40, pointerEvents: 'none' }}
        width="260" height="260" viewBox="0 0 260 260" fill="none"
      >
        <circle cx="200" cy="200" r="150" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.13" fill="none" />
        <circle cx="200" cy="200" r="110" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.09" fill="none" />
        <circle cx="200" cy="200" r="72" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.06" fill="none" />
      </svg>
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', bottom: -20, left: -40, pointerEvents: 'none' }}
        width="200" height="200" viewBox="0 0 200 200" fill="none"
      >
        <circle cx="40" cy="180" r="130" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.1" fill="none" />
        <circle cx="40" cy="180" r="90" stroke="#6115D0" strokeWidth="1.5" strokeOpacity="0.07" fill="none" />
      </svg>

      {/* Logo — prominent, natural colours, sized to be a clear branding centrepiece */}
      <div style={{ position: 'relative', zIndex: 1, marginBottom: 36 }}>
        <img
          src={capacitiLogo}
          alt="CAPACITI — A Division of UVU Africa"
          style={{
            height: 100,
            width: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      {/* Card */}
      <div
        className="w-full"
        style={{
          maxWidth: 480,
          background: '#fff',
          borderRadius: 20,
          padding: '40px 44px 36px',
          boxShadow: '0 4px 32px rgba(29,41,81,0.09), 0 1px 4px rgba(29,41,81,0.05)',
          position: 'relative',
          zIndex: 1,
          margin: '0 16px',
        }}
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-800 text-gray-900 mb-1.5" style={{ fontWeight: 800, color: '#1a1a2e' }}>
            Welcome back
          </h1>
          <p className="text-sm text-gray-400">Sign in to your CAPACITI account.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div>
            <label className="form-label">Email address</label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: 40 }}
                placeholder="name@capaciti.org.za"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="form-label">Password</label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-input"
                style={{ paddingLeft: 40, paddingRight: 40 }}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(s => !s)}
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-purple-600"
                style={{ accentColor: '#6115D0' }}
              />
              <span className="text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              className="text-sm font-500"
              style={{ color: '#6115D0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 font-700 text-white rounded-xl py-3.5 mt-1 transition-all"
            style={{
              background: loading ? '#8B45FF' : '#6115D0',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '0.9375rem',
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span
                  className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin inline-block"
                  style={{ borderTopColor: 'transparent' }}
                />
                Signing in…
              </span>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-7 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-400">
            Having trouble signing in?{' '}
            <button
              type="button"
              className="font-500"
              style={{ color: '#6115D0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
            >
              Contact your administrator.
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
