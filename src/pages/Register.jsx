import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, UserPlus, Zap } from 'lucide-react';
import Footer from '../components/Footer';
import LegalModal from '../components/LegalModal';

function Field({ icon, label, type = 'text', placeholder, disabled }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 7 }}>{label}</label>
      <div style={{ position: 'relative' }}>
        <i className={`fas ${icon}`} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#333', fontSize: '0.8rem' }} />
        <input
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          style={{ width: '100%', background: '#0a0a0c', border: '1px solid #1c1c1e', color: '#444', borderRadius: 12, padding: '0.8rem 1rem 0.8rem 2.6rem', fontSize: '0.85rem', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'not-allowed', boxSizing: 'border-box' }}
        />
      </div>
    </div>
  );
}

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [activeLegal, setActiveLegal] = useState(null);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050506', position: 'relative', overflow: 'hidden' }}>
      {/* Background glows */}
      <div style={{ position: 'fixed', top: '-15%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-20%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,130,32,0.04) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 520 }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <Link to="/" style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, #f58220, #c46516)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 32px rgba(245,130,32,0.4)' }}>
                <i className="fas fa-bolt" style={{ color: '#000', fontSize: '1.4rem' }} />
              </div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.1em', lineHeight: 1 }}>
                <span style={{ color: '#fff' }}>ALLEN</span><span style={{ color: '#f58220' }}>JOE</span>
              </div>
            </Link>
          </div>

          {/* Card */}
          <div style={{ background: 'rgba(12,12,15,0.96)', border: '1px solid rgba(245,130,32,0.12)', borderRadius: 24, overflow: 'hidden', backdropFilter: 'blur(20px)', boxShadow: '0 30px 80px rgba(0,0,0,0.7)' }}>
            <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #f58220, transparent)' }} />

            {/* Header */}
            <div style={{ padding: '1.75rem 2rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.2)', color: '#f58220', padding: '4px 14px', borderRadius: 99, fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
                <Zap size={10} /> New Account
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.75rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 4px' }}>
                Create Account
              </h1>
              <p style={{ color: '#555', fontSize: '0.8rem' }}>Join ALLENJOE — Solar & CCTV Automation Experts</p>
            </div>

            {/* Body */}
            <div style={{ padding: '1.75rem 2rem' }}>
              {/* Maintenance banner */}
              <div style={{ background: 'rgba(245,130,32,0.07)', border: '1px solid rgba(245,130,32,0.18)', borderRadius: 12, padding: '0.85rem 1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <i className="fas fa-tools" style={{ color: '#f58220', fontSize: '0.85rem', marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#f58220', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>Registration Temporarily Offline</div>
                  <div style={{ fontSize: '0.75rem', color: '#666', lineHeight: 1.5 }}>Account creation is paused. Contact us on WhatsApp to place an order.</div>
                </div>
              </div>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field icon="fa-user" label="First Name" placeholder="John" disabled />
                  <Field icon="fa-user" label="Last Name" placeholder="Doe" disabled />
                </div>

                <Field icon="fa-phone" label="Phone Number" placeholder="+234 800 000 0000" disabled />
                <Field icon="fa-envelope" label="Email Address" type="email" placeholder="you@example.com" disabled />

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 800, color: '#555', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 7 }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <i className="fas fa-lock" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#333', fontSize: '0.8rem' }} />
                    <input type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" disabled style={{ width: '100%', background: '#0a0a0c', border: '1px solid #1c1c1e', color: '#444', borderRadius: 12, padding: '0.8rem 3rem 0.8rem 2.6rem', fontSize: '0.85rem', outline: 'none', fontFamily: 'Inter, sans-serif', cursor: 'not-allowed', boxSizing: 'border-box' }} />
                    <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#333', display: 'flex', alignItems: 'center' }}>
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <Field icon="fa-lock" label="Confirm Password" type="password" placeholder="Repeat your password" disabled />

                {/* Legal Checkboxes — visual only */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 4 }}>
                  {[
                    { key: 'terms', label: 'Terms of Service', icon: 'fa-file-contract', type: 'terms' },
                    { key: 'privacy', label: 'Privacy Policy', icon: 'fa-shield-alt', type: 'privacy' },
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, border: '1px solid #2a2a2a', background: '#111', flexShrink: 0 }} />
                      <span style={{ fontSize: '0.78rem', color: '#555' }}>
                        I agree to the{' '}
                        <button type="button" onClick={() => setActiveLegal(item.type)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f58220', fontWeight: 700, fontSize: 'inherit', padding: 0, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                          {item.label}
                        </button>
                      </span>
                    </div>
                  ))}
                </div>

                {/* Submit */}
                <button
                  type="button"
                  disabled
                  style={{ width: '100%', background: '#0d0d0f', border: '1px solid #1e1e20', color: '#333', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.95rem', borderRadius: 12, cursor: 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}
                >
                  <UserPlus size={15} /> Registration Temporarily Disabled
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.04)', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: '#555' }}>
                  Already have an account?{' '}
                  <Link to="/login" style={{ color: '#f58220', fontWeight: 700, textDecoration: 'none' }}>Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {activeLegal && (
        <LegalModal
          type={activeLegal}
          onClose={() => setActiveLegal(null)}
          onAccept={() => {}}
        />
      )}

      <Footer />
    </main>
  );
}
