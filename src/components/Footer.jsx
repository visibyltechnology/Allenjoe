import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const WHATSAPP_LINK = 'https://wa.me/c/2348171172822';

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setIsSubscribed(true);
            setTimeout(() => { setIsSubscribed(false); setEmail(''); }, 4000);
        }
    };

    return (
        <footer
            className="mt-auto"
            style={{
                background: '#020202',
                borderTop: '1px solid rgba(245, 130, 32, 0.2)',
                fontFamily: 'Montserrat, sans-serif',
                position: 'relative',
            }}
        >
            {/* ── Newsletter Strip ── */}
            <div
                style={{
                    background: 'linear-gradient(135deg, rgba(245, 130, 32, 0.05) 0%, rgba(5,5,5,1) 50%, rgba(245, 130, 32, 0.05) 100%)',
                    borderBottom: '1px solid #1C1C24',
                    padding: '4rem 0',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245, 130, 32, 0.08)_0%,transparent_70%)] pointer-events-none"></div>

                <div className="max-w-[82rem] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
                    <div className="text-center lg:text-left">
                        <span
                            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg mb-4"
                            style={{
                                background: 'rgba(245, 130, 32, 0.1)',
                                border: '1px solid rgba(245, 130, 32, 0.25)',
                                color: '#f58220',
                                fontFamily: 'Space Grotesk, sans-serif',
                            }}
                        >
                            <i className="fa-solid fa-bolt text-[9px]"></i> Networked Power & Security
                        </span>
                        <h3
                            style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                                fontWeight: 800,
                                color: '#fff',
                                letterSpacing: '0.04em',
                                lineHeight: 1.1,
                                textTransform: 'uppercase',
                            }}
                        >
                            Stay Protected.{' '}
                            <span style={{ background: 'linear-gradient(135deg,#f58220,#fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', textShadow: '0 0 30px rgba(245, 130, 32, 0.4)' }}>
                                Upgrade Smart.
                            </span>
                        </h3>
                        <p style={{ color: '#8a8a8a', fontSize: '0.9rem', marginTop: '0.75rem', maxWidth: '32rem', lineHeight: 1.6 }}>
                            Join our newsletter for exclusive drops on the latest Inverters, Solar Tech, and AI Security Arrays.
                        </p>
                    </div>
                    <form
                        onSubmit={handleSubscribe}
                        className="flex flex-col sm:flex-row w-full lg:w-auto rounded-2xl overflow-hidden shadow-2xl transition-all duration-300"
                        style={{ border: '1px solid #222', background: '#0a0a0a', boxShadow: '0 12px 40px rgba(0,0,0,0.6)' }}
                    >
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address..."
                            style={{
                                flex: 1,
                                background: 'transparent',
                                border: 'none',
                                outline: 'none',
                                padding: '1.25rem 1.5rem',
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                            }}
                            className="placeholder-gray-500"
                        />
                        <button
                            type="submit"
                            className="px-8 font-black text-[0.8rem] uppercase tracking-[0.15em] flex-shrink-0 flex items-center justify-center min-w-[140px] text-white py-4 sm:py-0"
                            style={{
                                background: isSubscribed
                                    ? 'linear-gradient(135deg,#22c55e,#16a34a)'
                                    : 'linear-gradient(135deg,#f58220,#c46516)',
                                fontFamily: 'Space Grotesk, sans-serif',
                                transition: 'all 0.3s',
                            }}
                        >
                            {isSubscribed ? (
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i>Done!
                                </span>
                            ) : 'Subscribe'}
                        </button>
                    </form>
                </div>
            </div>

            {/* ── Main Footer Layout ── */}
            <div className="max-w-[82rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Meta Column */}
                    <div className="lg:col-span-4">
                        <Link to="/" className="inline-block group mb-6" style={{ textDecoration: 'none' }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: 'linear-gradient(135deg,#f58220,#c46516)',
                                        border: '1.5px solid rgba(255,255,255,0.1)',
                                        boxShadow: '0 0 20px rgba(245, 130, 32, 0.4)',
                                    }}
                                >
                                    <i className="fa-solid fa-solar-panel text-white text-[1.2rem]"></i>
                                </div>
                                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.8rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>
                                    <span style={{ color: '#fff' }}>ALLEN</span>
                                    <span style={{ color: '#f58220' }}>JOE</span>
                                    <div style={{ fontSize: '0.55rem', color: '#8a8a8a', letterSpacing: '0.4em', textTransform: 'uppercase', marginTop: 4, fontWeight: 800 }}>Automation</div>
                                </div>
                            </div>
                        </Link>
                        <p style={{ color: '#8a8a8a', fontSize: '0.85rem', lineHeight: 1.8, maxWidth: '22rem', marginBottom: '1.75rem' }}>
                            Professional Solar Inverters and CCTV Automation. Nationwide delivery, seamless integration, and advanced tech solutions for your home or business.
                        </p>

                        {/* Social Bar */}
                        <div className="flex items-center gap-3">
                            {[
                                { icon: 'fa-whatsapp', href: WHATSAPP_LINK, fab: true },
                                { icon: 'fa-twitter', href: '#', fab: true },
                                { icon: 'fa-instagram', href: '#', fab: true },
                                { icon: 'fa-tiktok', href: '#', fab: true }
                            ].map((s, idx) => (
                                <a
                                    key={idx}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        width: 42, height: 42,
                                        background: '#0a0a0a',
                                        border: '1px solid #222',
                                        borderRadius: 12,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#8a8a8a',
                                        fontSize: '1rem',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.background = 'linear-gradient(135deg,#f58220,#c46516)';
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.color = '#fff';
                                        e.currentTarget.style.transform = 'translateY(-4px) rotate(5deg)';
                                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(245, 130, 32, 0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.background = '#0a0a0a';
                                        e.currentTarget.style.borderColor = '#222';
                                        e.currentTarget.style.color = '#8a8a8a';
                                        e.currentTarget.style.transform = 'translateY(0) rotate(0deg)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <i className={`${s.fab ? 'fab' : 'fas'} ${s.icon}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 md:pl-4">
                        <h4 style={{
                            color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em',
                            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                            <span style={{ width: 4, height: 16, background: 'linear-gradient(to bottom, #f58220, #c46516)', borderRadius: 99, display: 'inline-block' }}></span>
                            Store
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { label: 'All Systems', to: '/products' },
                                { label: 'Inverters', to: '/products?cat=Inverters' },
                                { label: 'Solar Panels', to: '/products?cat=Solar Panels' },
                                { label: 'Batteries', to: '/products?cat=Batteries' },
                                { label: 'CCTV Cameras', to: '/products?cat=CCTV' },
                            ].map((l, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={l.to}
                                        className="group"
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 8,
                                            color: '#8a8a8a', fontSize: '0.85rem', fontWeight: 500,
                                            textDecoration: 'none', transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.color = '#8a8a8a'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                    >
                                        <i className="fas fa-angle-right" style={{ color: '#f58220', fontSize: '0.65rem' }}></i>
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="lg:col-span-2">
                        <h4 style={{
                            color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em',
                            marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: 10,
                        }}>
                            <span style={{ width: 4, height: 16, background: 'linear-gradient(to bottom, #f58220, #c46516)', borderRadius: 99, display: 'inline-block' }}></span>
                            Support
                        </h4>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            {[
                                { label: 'My Account', to: '/profile' },
                                { label: 'Track Delivery', to: '/delivery' },
                                { label: 'Warranty Claims', href: 'https://wa.me/2348135933346?text=Warranty' },
                                { label: 'Privacy Policy', to: '/privacy' },
                                { label: 'Terms & Conditions', to: '/terms' },
                            ].map((l, idx) => (
                                <li key={idx}>
                                    {l.href ? (
                                        <a
                                            href={l.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group"
                                            style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8a8a8a', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = '#8a8a8a'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                        >
                                            <i className="fas fa-angle-right" style={{ color: '#f58220', fontSize: '0.65rem' }}></i>
                                            {l.label}
                                        </a>
                                    ) : (
                                        <Link
                                            to={l.to}
                                            className="group"
                                            style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8a8a8a', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none', transition: 'all 0.2s' }}
                                            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                                            onMouseLeave={e => { e.currentTarget.style.color = '#8a8a8a'; e.currentTarget.style.transform = 'translateX(0)'; }}
                                        >
                                            <i className="fas fa-angle-right" style={{ color: '#f58220', fontSize: '0.65rem' }}></i>
                                            {l.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Location Card */}
                    <div
                        className="lg:col-span-4 self-start relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#f58220]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                        <div
                            style={{
                                background: 'linear-gradient(145deg, #141414, #0a0a0a)',
                                border: '1px solid #222',
                                borderRadius: 20,
                                padding: '1.75rem',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            <h4 style={{
                                color: '#fff', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800,
                                fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em',
                                marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <span style={{ width: 4, height: 16, background: 'linear-gradient(to bottom, #f58220, #c46516)', borderRadius: 99, display: 'inline-block' }}></span>
                                    Experience Center
                                </span>
                                <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e', animation: 'pulse 2s infinite' }}></span>
                            </h4>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                                    <div style={{ width: 38, height: 38, background: '#0a0a0a', border: '1px solid #222', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fas fa-map-marker-alt" style={{ color: '#f58220', fontSize: '0.8rem' }}></i>
                                    </div>
                                    <p style={{ color: '#8a8a8a', fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 500 }}>
                                        C38 Robinson Plaza, Deco Road, Warri, Delta State
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <div style={{ width: 38, height: 38, background: '#0a0a0a', border: '1px solid #222', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                        <i className="fa-solid fa-phone" style={{ color: '#fff', fontSize: '0.8rem' }}></i>
                                    </div>
                                    <div>
                                        <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>08135933346</div>
                                        <div style={{ color: '#8a8a8a', fontSize: '0.75rem', marginTop: 2 }}>General Enquiries</div>
                                    </div>
                                </div>

                                <a
                                    href={WHATSAPP_LINK}
                                    target="_blank"
                                    rel="noreferrer"
                                    style={{
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                                        background: 'linear-gradient(135deg,#16a34a,#15803d)',
                                        color: '#fff', fontSize: '0.8rem', fontWeight: 800,
                                        textTransform: 'uppercase', letterSpacing: '0.1em', fontFamily: 'Space Grotesk, sans-serif',
                                        padding: '1rem',
                                        borderRadius: 14, textDecoration: 'none',
                                        transition: 'all 0.3s ease',
                                        marginTop: 8,
                                        boxShadow: '0 8px 20px rgba(22,163,74,0.2)',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(22,163,74,0.35)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(22,163,74,0.2)'; }}
                                >
                                    <i className="fab fa-whatsapp text-lg"></i>
                                    Chat Us on WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Category Cloud ── */}
                <div style={{ borderTop: '1px solid #222', paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
                    <div style={{ fontSize: '0.65rem', color: '#8a8a8a', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.25em', marginBottom: '1.25rem' }}>
                        Popular Categories
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {[
                            'Inverters', 'Solar Panels', 'Batteries',
                            'CCTV Cameras', 'Automation Kits'
                        ].map((cat, idx) => (
                            <Link
                                key={idx}
                                to={`/products?cat=${encodeURIComponent(cat)}`}
                                style={{
                                    fontSize: '0.75rem', fontWeight: 600,
                                    color: '#8a8a8a',
                                    background: '#0a0a0a',
                                    border: '1px solid #222',
                                    borderRadius: 12, padding: '0.6rem 1.25rem',
                                    textDecoration: 'none',
                                    transition: 'all 0.25s ease',
                                    letterSpacing: '0.04em',
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = 'rgba(245, 130, 32, 0.1)';
                                    e.currentTarget.style.borderColor = 'rgba(245, 130, 32, 0.4)';
                                    e.currentTarget.style.color = '#fff';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = '#0a0a0a';
                                    e.currentTarget.style.borderColor = '#222';
                                    e.currentTarget.style.color = '#8a8a8a';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                {cat}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* ── Bottom Bar ── */}
                <div style={{ borderTop: '1px solid #222', paddingTop: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '0.8rem', color: '#8a8a8a', fontWeight: 500, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                        <span>© {year}{' '}
                        <span style={{ color: '#fff', fontWeight: 700 }}>Allenjoe Limited</span>.
                        All Rights Reserved.</span>
                        <span style={{ color: '#444' }}>|</span>
                        <Link to="/privacy" style={{ color: '#8a8a8a', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#8a8a8a'}>Privacy Policy</Link>
                        <span style={{ color: '#444' }}>|</span>
                        <Link to="/terms" style={{ color: '#8a8a8a', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#fff'} onMouseLeave={e => e.currentTarget.style.color = '#8a8a8a'}>Terms of Service</Link>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0a0a0a', border: '1px solid #222', borderRadius: 10, padding: '0.5rem 1rem' }}>
                            <i className="fa-solid fa-shield-halved" style={{ color: '#f58220', fontSize: '0.8rem' }}></i>
                            <span style={{ color: '#8a8a8a', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Secured Payment</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#0a0a0a', border: '1px solid #222', borderRadius: 10, padding: '0.5rem 1rem' }}>
                            <div style={{ display: 'flex', gap: 1, height: 14, width: 20, borderRadius: 3, overflow: 'hidden' }}>
                                <div style={{ background: '#15803d', flex: 1 }}></div>
                                <div style={{ background: '#fff', flex: 1 }}></div>
                                <div style={{ background: '#15803d', flex: 1 }}></div>
                            </div>
                            <span style={{ color: '#8a8a8a', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.12em' }}>Registered Business</span>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.6rem', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#444' }}>
                    PREMIUM SYSTEMS <span style={{ color: '#f58220', margin: '0 8px' }}>|</span> NATIONWIDE DELIVERY
                </div>
            </div>
        </footer>
    );
}
