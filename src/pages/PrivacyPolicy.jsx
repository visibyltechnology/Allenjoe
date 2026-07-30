import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const DATA_ITEMS = [
  { icon: 'fa-user', label: 'Identity Data', desc: 'First name, last name' },
  { icon: 'fa-envelope', label: 'Contact Data', desc: 'Email address, phone number' },
  { icon: 'fa-map-marker-alt', label: 'Delivery Data', desc: 'Delivery address, state, LGA, landmark' },
  { icon: 'fa-credit-card', label: 'Payment Data', desc: 'Processed securely — we never store card details' },
  { icon: 'fa-mouse-pointer', label: 'Technical Data', desc: 'IP address, browser type, and device data' },
  { icon: 'fa-shopping-cart', label: 'Transaction Data', desc: 'Product purchases and payment records' },
];

const USE_ITEMS = [
  'Process and fulfill your orders and payments.',
  'Communicate with you about order status and delivery updates.',
  'Send OTP verification codes during account creation.',
  'Improve our website and personalize your shopping experience.',
  'Comply with legal obligations under Nigerian law.',
  'Detect and prevent fraudulent transactions.',
];

const SHARE_ITEMS = [
  'Klump BNPL — to securely process installment payments.',
  'Logistics and courier partners — to fulfill your delivery.',
  'WhatsApp Business (Meta) — for order and OTP notifications.',
  'Firebase (Google) — for secure data storage and authentication.',
  'Law enforcement or regulatory bodies (FCCPC, NITDA) — if required by law.',
];

const NDPR_RIGHTS = [
  'Request access to the personal data we hold about you.',
  'Request correction of inaccurate or incomplete data.',
  'Request erasure of your personal data (subject to legal retention requirements).',
  'Object to or restrict how we process your data.',
  'Lodge a complaint with NITDA if you believe your data rights have been violated.',
];

const SECTIONS = [
  {
    number: '01', icon: 'fa-database', title: 'Information We Collect',
    body: (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {DATA_ITEMS.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(245,130,32,0.05)', border: '1px solid rgba(245,130,32,0.1)', borderRadius: 10, padding: '0.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(245,130,32,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <i className={`fas ${item.icon}`} style={{ color: '#f58220', fontSize: '0.75rem' }} />
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#f58220', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: '#777' }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: '02', icon: 'fa-cogs', title: 'How We Use Your Information',
    body: (
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
        {USE_ITEMS.map((item, i) => (
          <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: '#777' }}>
            <i className="fas fa-check-circle" style={{ color: '#4ade80', marginTop: 2, flexShrink: 0 }} />{item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    number: '03', icon: 'fa-share-alt', title: 'Sharing Your Information',
    body: (
      <>
        <p style={{ fontSize: '0.82rem', color: '#777', marginBottom: '0.75rem' }}>We do <strong style={{ color: '#ef4444' }}>not sell</strong> your personal data to third parties. We may share your information with:</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
          {SHARE_ITEMS.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: '#777' }}>
              <i className="fas fa-angle-right" style={{ color: '#f58220', marginTop: 2, flexShrink: 0 }} />{item}
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    number: '04', icon: 'fa-lock', title: 'Data Security',
    body: <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.8 }}>We implement appropriate technical and organisational security measures to protect your personal data. Your account password is hashed and never stored in plain text. Payment data is processed through Klump's PCI-DSS compliant infrastructure — ALLENJOE does not store your card details on our servers.</p>,
  },
  {
    number: '05', icon: 'fa-user-shield', title: 'Your Rights Under Nigerian Law (NDPR)',
    body: (
      <>
        <p style={{ fontSize: '0.82rem', color: '#777', marginBottom: '0.75rem' }}>Under the Nigeria Data Protection Regulation (NDPR), you have the right to:</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: 0, padding: 0, listStyle: 'none' }}>
          {NDPR_RIGHTS.map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: '#777' }}>
              <i className="fas fa-check-circle" style={{ color: '#60a5fa', marginTop: 2, flexShrink: 0 }} />{item}
            </li>
          ))}
        </ul>
        <p style={{ fontSize: '0.82rem', color: '#777', marginTop: '0.75rem' }}>
          To exercise any of these rights, message us on <a href="https://wa.me/c/2348171172822" target="_blank" rel="noreferrer" style={{ color: '#4ade80', fontWeight: 700 }}>WhatsApp: 08171172822</a>.
        </p>
      </>
    ),
  },
  {
    number: '06', icon: 'fa-cookie', title: 'Cookies',
    body: <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.8 }}>Our website may use session-based storage and local storage (not traditional cookies) to maintain your shopping cart and login state. We do not use tracking cookies for advertising purposes.</p>,
  },
  {
    number: '07', icon: 'fa-child', title: "Children's Privacy",
    body: <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.8 }}>Our Site is not directed at children under 18. We do not knowingly collect personal information from minors. If you believe a child has provided us with personal data, please contact us immediately so we can delete it.</p>,
  },
  {
    number: '08', icon: 'fa-sync-alt', title: 'Changes to This Policy',
    body: <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.8 }}>We may update this Privacy Policy from time to time. The "Last Updated" date at the top of this page reflects the most recent revision. Continued use of the Site after any changes signifies your acceptance of the updated policy.</p>,
  },
];

export default function PrivacyPolicy() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050506' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 300, background: 'linear-gradient(180deg, rgba(245,130,32,0.04) 0%, transparent 100%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ flex: 1, maxWidth: '56rem', margin: '0 auto', width: '100%', padding: '6rem 1rem 3rem', position: 'relative', zIndex: 1 }}>

        {/* Breadcrumb */}
        <div style={{ marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.7rem', fontWeight: 700, color: '#555', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <i className="fas fa-chevron-left" style={{ fontSize: '0.6rem' }} /> Home
          </Link>
        </div>

        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(245,130,32,0.08)', border: '1px solid rgba(245,130,32,0.2)', color: '#f58220', padding: '5px 14px', borderRadius: 99, fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 14 }}>
            <i className="fas fa-shield-alt" /> Legal Document
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 10 }}>
            Privacy <span style={{ color: '#f58220' }}>Policy</span>
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: 600 }}>
              <i className="fas fa-calendar-alt" style={{ marginRight: 5 }} />Last Updated: May 28, 2026
            </span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: 4 }} />Informational Only
            </span>
          </div>
        </div>

        {/* Intro */}
        <div style={{ background: 'rgba(15,15,18,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '4px solid #f58220', borderRadius: '0 16px 16px 0', padding: '1.25rem 1.5rem', marginBottom: '1.75rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8, fontWeight: 500 }}>
            <strong style={{ color: '#f58220' }}>ALLENJOE</strong> is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website. This policy is aligned with the <strong style={{ color: '#e0e0e0' }}>Nigeria Data Protection Regulation (NDPR)</strong> issued by NITDA.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {SECTIONS.map(section => (
            <div
              key={section.number}
              style={{ background: 'rgba(15,15,18,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderLeft: '4px solid #f58220', borderRadius: '0 16px 16px 0' }}
            >
              <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`fas ${section.icon}`} style={{ color: '#f58220', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.55rem', fontWeight: 800, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 2 }}>Section {section.number}</div>
                  <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: '#e0e0e0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{section.title}</h2>
                </div>
              </div>
              <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                {section.body}
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ marginTop: '1.5rem', background: 'rgba(245,130,32,0.06)', border: '1px solid rgba(245,130,32,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: '#f58220', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            <i className="fas fa-headset" style={{ marginRight: 8 }} />Data Protection Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://wa.me/c/2348171172822" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.82rem', color: '#4ade80', textDecoration: 'none', fontWeight: 600 }}>
              <i className="fab fa-whatsapp" /> WhatsApp: 08135933346
            </a>
            <p style={{ fontSize: '0.82rem', color: '#666', margin: 0 }}>
              <i className="fas fa-map-marker-alt" style={{ color: '#f58220', marginRight: 8 }} />
              C38 Robinson Pz deco road Warri, Delta State
            </p>
          </div>
        </div>

        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.65rem', color: '#333', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            End of Privacy Policy — Last Updated May 28, 2026
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
