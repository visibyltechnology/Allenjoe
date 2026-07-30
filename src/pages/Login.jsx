import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Zap, Shield } from 'lucide-react';
import Footer from '../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050506', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow orbs */}
      <div style={{ position: 'fixed', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.05) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 460 }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <Link to="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'linear-gradient(135deg, #f58220, #c46516)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 40px rgba(245,130,32,0.4)' }}>
                <i className="fas fa-bolt" style={{ color: '#000', fontSize: '1.6rem' }} />
              </div>
              <div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 900, letterSpacing: '0.1em', lineHeight: 1 }}>
                  <span style={{ color: '#fff' }}>ALLEN</span><span style={{ color: '#f58220' }}>JOE</span>
                </div>
                <div style={{ fontSize: '0.55rem', color: '#555', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: 4 }}>Solar & CCTV Automation</div>
              </div>
            </Link>
          </div>

          {/* Card */}
          <div style={{ background: 'rgba(15,15,18,0.95)', border: '1px solid rgba(245,130,32,0.15)', borderRadius: 24, overflow: 'hidden', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(0,0,0,0.6)' }}>
            {/* Orange top line */}
            <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #f58220, transparent)' }} />

            {/* Header */}
            <div style={{ padding: '2rem 2rem 1.5rem', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.25)', color: '#f58220', padding: '4px 14px', borderRadius: 99, fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>
                <Zap size={10} /> Member Portal
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.9rem', fontWeight: 900, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', margin: 0 }}>
                Welcome Back
              </h1>
              <p style={{ color: '#555', fontSize: '0.82rem', marginTop: 6 }}>Sign in to access your ALLENJOE account</p>
            </div>

            {/* Body */}
            <div style={{ padding: '2rem' }}>
              {/* Maintenance Notice */}
              <div style={{ background: 'rgba(245,130,32,0.08)', border: '1px solid rgba(245,130,32,0.2)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="fas fa-tools" style={{ color: '#f58220', fontSize: '0.85rem', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f58220', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Authentication Temporarily Offline</div>
                  <div style={{ fontSize: '0.75rem', color: '#777', lineHeight: 1.5 }}>Login is disabled during this phase. Please contact us via WhatsApp for support.</div>
                </div>
              </div>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 7 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <i className="fas fa-envelope" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444', fontSize: '0.8rem' }} />
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled
                      style={{ width: '100%', background: '#0a0a0c', border: '1px solid #222', color: '#555', borderRadius: 12, padding: '0.85rem 1rem 0.85rem 2.6rem', fontSize: '0.875rem', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'not-allowed', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                    <label style={{ fontSize: '0.62rem', fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Password</label>
                    <span style={{ fontSize: '0.72rem', color: '#444', fontWeight: 600 }}>Forgot Password?</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <i className="fas fa-lock" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#444', fontSize: '0.8rem' }} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled
                      style={{ width: '100%', background: '#0a0a0c', border: '1px solid #222', color: '#555', borderRadius: 12, padding: '0.85rem 3rem 0.85rem 2.6rem', fontSize: '0.875rem', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'not-allowed', boxSizing: 'border-box' }}
                    />
                    <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#444', display: 'flex', alignItems: 'center' }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Submit — Disabled */}
                <button
                  type="button"
                  disabled
                  style={{ width: '100%', background: '#111', border: '1px solid #222', color: '#444', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.95rem', borderRadius: 12, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}
                >
                  <LogIn size={15} /> Login Temporarily Disabled
                </button>
              </form>

              {/* Footer links */}
              <div style={{ marginTop: '1.75rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                <p style={{ color: '#555', fontSize: '0.82rem' }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: '#f58220', fontWeight: 700, textDecoration: 'none' }}>
                    Create Account
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
            {[{ icon: 'fa-shield-alt', text: 'Secure Login' }, { icon: 'fa-lock', text: 'SSL Encrypted' }].map(b => (
              <div key={b.icon} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.65rem', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                <i className={`fas ${b.icon}`} style={{ color: '#f58220' }} />{b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
