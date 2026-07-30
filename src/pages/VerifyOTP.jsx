import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { sendRegistrationOTPEmail } from '../utils/email';
import toast from 'react-hot-toast';
import Footer from '../components/Footer';

export default function VerifyOTP() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const navigate = useNavigate();

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(null);
  const intervalRef = useRef(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const startTimer = useCallback((expiresAtMs) => {
    stopTimer();
    const tick = () => {
      const diff = expiresAtMs - Date.now();
      if (diff <= 0) { setTimeLeft(0); stopTimer(); }
      else { setTimeLeft(Math.floor(diff / 1000)); }
    };
    tick();
    intervalRef.current = setInterval(tick, 1000);
  }, [stopTimer]);

  useEffect(() => {
    const dataStr = sessionStorage.getItem('pendingRegistration');
    const otpExpStr = sessionStorage.getItem('otpExpiresAt');
    if (!email || !dataStr || !otpExpStr) {
      toast.error('Session expired or invalid. Please register again.');
      navigate('/register');
      return;
    }
    const expiresAt = new Date(otpExpStr).getTime();
    startTimer(expiresAt);
    setIsPageLoading(false);
    return stopTimer;
  }, [email, navigate, startTimer, stopTimer]);

  const formatTime = (seconds) => {
    if (seconds === null) return '--:--';
    if (seconds === 0) return 'Expired';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextSibling && element.value) element.nextSibling.focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && e.target.previousSibling) e.target.previousSibling.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, 6);
    if (!pastedData) return;
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) { if (i < 6) newOtp[i] = pastedData[i]; }
    setOtp(newOtp);
    setTimeout(() => {
      const inputs = document.querySelectorAll('.otp-input');
      const nextIndex = Math.min(pastedData.length, 5);
      if (inputs[nextIndex]) inputs[nextIndex].focus();
    }, 0);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length !== 6) { setError('Please enter the 6-digit code.'); toast.error('Please enter the 6-digit code.'); return; }
    if (timeLeft === 0) { setError('OTP has expired. Please request a new one.'); toast.error('OTP has expired.'); return; }
    setLoading(true);
    setError('');
    try {
      const storedOTP = sessionStorage.getItem('registrationOTP');
      const dataStr = sessionStorage.getItem('pendingRegistration');
      if (!storedOTP || !dataStr) throw new Error('Session expired. Please register again.');
      if (enteredCode !== storedOTP) { setError('Invalid OTP code.'); toast.error('Invalid OTP code.'); setLoading(false); return; }
      const pendingData = JSON.parse(dataStr);
      let user;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, pendingData.email, pendingData.password);
        user = userCredential.user;
      } catch (authErr) {
        if (authErr.code === 'auth/email-already-in-use') {
          try {
            const { signInWithEmailAndPassword } = await import('firebase/auth');
            const userCredential = await signInWithEmailAndPassword(auth, pendingData.email, pendingData.password);
            user = userCredential.user;
          } catch (signInErr) {
            if (signInErr.code === 'auth/invalid-credential' || signInErr.code === 'auth/wrong-password') {
              throw new Error('An account with this email already exists. Please log in or reset your password.');
            }
            throw signInErr;
          }
        } else { throw authErr; }
      }
      if (db) {
        await setDoc(doc(db, 'users', user.uid), {
          firstName: pendingData.firstName, lastName: pendingData.lastName, phone: pendingData.phone,
          email: pendingData.email, isAdmin: false, isEmailVerified: true, createdAt: new Date().toISOString()
        }, { merge: true });
      }
      sessionStorage.removeItem('pendingRegistration');
      sessionStorage.removeItem('registrationOTP');
      sessionStorage.removeItem('otpExpiresAt');
      toast.success('Account successfully created and verified!');
      window.location.href = '/';
    } catch (err) {
      console.error(err);
      let errorMsg = err.message || 'Failed to verify OTP. Please try again.';
      if (err.message?.includes('Firebase:')) errorMsg = err.message.replace(/Firebase:\s*(.*?)\s*\(auth.*\)./, '$1');
      setError(errorMsg);
      toast.error(errorMsg);
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      const dataStr = sessionStorage.getItem('pendingRegistration');
      if (!dataStr) { setError('Session expired. Please register again.'); toast.error('Session expired.'); navigate('/register'); return; }
      const pendingData = JSON.parse(dataStr);
      const newOtpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const newExpiresAt = new Date(Date.now() + 15 * 60 * 1000);
      sessionStorage.setItem('registrationOTP', newOtpCode);
      sessionStorage.setItem('otpExpiresAt', newExpiresAt.toISOString());
      try {
        const sent = await sendRegistrationOTPEmail(email, pendingData.firstName || 'Customer', newOtpCode);
        if (sent !== false) { toast.success('A new OTP has been sent to your email.'); }
        else { throw new Error('Email sending returned false'); }
      } catch (emailErr) { console.error(emailErr); toast.error('Failed to send OTP email.'); }
      setOtp(['', '', '', '', '', '']);
      startTimer(newExpiresAt.getTime());
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to resend OTP. Please try again later.');
      toast.error('Failed to resend OTP.');
    } finally { setResending(false); }
  };

  const isExpired = timeLeft === 0;
  const timerColor = isExpired ? '#ef4444' : (timeLeft !== null && timeLeft < 60) ? '#f59e0b' : '#f58220';

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050506', position: 'relative', overflow: 'hidden' }}>
      {/* BG glows */}
      <div style={{ position: 'fixed', top: '-10%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(245,130,32,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5rem 1rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ width: '100%', maxWidth: 460 }}>

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
            <div style={{ padding: '1.75rem 2rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                <i className="fas fa-envelope-open-text" style={{ color: '#f58220', fontSize: '1.4rem' }} />
              </div>
              <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.7rem', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 6px' }}>
                Verify Email
              </h1>
              <p style={{ color: '#666', fontSize: '0.8rem', lineHeight: 1.6 }}>
                We sent a 6-digit code to<br />
                <strong style={{ color: '#f58220' }}>{email}</strong>
              </p>
            </div>

            {/* Body */}
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', padding: '0.75rem 1rem', borderRadius: 10, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: '0.8rem', fontWeight: 500 }}>
                  <i className="fas fa-exclamation-circle" /> {error}
                </div>
              )}

              {/* Timer */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: '1.75rem', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.6rem', fontWeight: 900, color: timerColor, letterSpacing: '0.1em', transition: 'color 0.3s' }}>
                <i className={`fas fa-${isExpired ? 'times-circle' : 'clock'}`} style={{ fontSize: '1rem' }} />
                {isPageLoading ? '--:--' : formatTime(timeLeft)}
              </div>

              <form onSubmit={verifyOTP}>
                {/* OTP Input Boxes */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: '1.75rem' }}>
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={data}
                      onChange={e => handleChange(e.target, index)}
                      onKeyDown={e => handleKeyDown(e, index)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      onFocus={e => e.target.select()}
                      disabled={isPageLoading}
                      className="otp-input"
                      style={{
                        width: 50, height: 60, textAlign: 'center',
                        fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 900,
                        color: data ? '#f58220' : '#fff',
                        background: data ? 'rgba(245,130,32,0.08)' : '#0a0a0c',
                        border: `2px solid ${data ? '#f58220' : '#1e1e20'}`,
                        borderRadius: 14, outline: 'none', transition: 'all 0.2s',
                        boxShadow: data ? '0 0 16px rgba(245,130,32,0.15)' : 'none',
                        opacity: isPageLoading ? 0.4 : 1,
                      }}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || isPageLoading || isExpired}
                  style={{
                    width: '100%',
                    background: (loading || isPageLoading || isExpired) ? '#111' : 'linear-gradient(135deg, #f58220, #c46516)',
                    color: (loading || isPageLoading || isExpired) ? '#444' : '#000',
                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 900, fontSize: '0.85rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase', border: 'none', borderRadius: 14,
                    padding: '1rem', cursor: (loading || isPageLoading || isExpired) ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: (loading || isPageLoading || isExpired) ? 'none' : '0 8px 24px rgba(245,130,32,0.35)',
                    transition: 'all 0.3s',
                  }}
                >
                  {loading
                    ? <><i className="fas fa-spinner fa-spin" /> Verifying...</>
                    : <><i className="fas fa-check-circle" /> Verify Code</>
                  }
                </button>
              </form>

              <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '0.8rem', color: '#555' }}>
                  Didn't receive the code?{' '}
                  <button
                    onClick={handleResend}
                    disabled={resending || isPageLoading}
                    style={{ color: '#f58220', fontWeight: 700, background: 'none', border: 'none', cursor: (resending || isPageLoading) ? 'not-allowed' : 'pointer', fontSize: 'inherit', opacity: (resending || isPageLoading) ? 0.4 : 1, textDecoration: 'underline', textUnderlineOffset: 3, transition: 'color 0.2s' }}
                  >
                    {resending ? 'Sending...' : 'Resend Code'}
                  </button>
                </p>
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
                  <Link to="/register" style={{ fontSize: '0.75rem', color: '#444', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <i className="fas fa-arrow-left" style={{ fontSize: '0.65rem' }} /> Back to Register
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: 6 }}>
            <i className="fas fa-shield-alt" style={{ color: '#f58220', fontSize: '0.75rem' }} />
            <span style={{ fontSize: '0.65rem', color: '#444', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Secure Email Verification</span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
