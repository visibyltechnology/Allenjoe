import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const SECTIONS = [
  {
    number: '01',
    icon: 'fa-user-shield',
    title: 'Eligibility & Account Security',
    content: 'By using this Site, you represent that you are at least 18 years of age or accessing the Site under the supervision of a parent or legal guardian. You are responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information.',
  },
  {
    number: '02',
    icon: 'fa-tag',
    title: 'Product Information and Pricing',
    content: 'We strive to be as accurate as possible with product descriptions, technical specifications, and images. Neotech Gadgets does not warrant that product descriptions are 100% accurate. In the event of a pricing error, we reserve the right to refuse or cancel orders and will issue a full refund if payment was processed. All products are subject to availability.',
  },
  {
    number: '03',
    icon: 'fa-credit-card',
    title: 'Payments and Billing',
    content: 'All payments are securely processed through Klump BNPL or verified via direct bank transfer. We accept installment payments and direct account transfers. By submitting an order, you authorize ALLENJOE to process your designated payment method for the full order amount.',
  },
  {
    number: '04',
    icon: 'fa-truck',
    title: 'Shipping, Delivery & Risk of Loss',
    content: 'Delivery dates given at checkout are estimates only and cannot be guaranteed. ALLENJOE is not liable for delays caused by local dispatch services or factors beyond our control. Risk of loss and title for items pass to you upon our delivery to the courier/logistics partner.',
  },
  {
    number: '05',
    icon: 'fa-exclamation-triangle',
    title: 'Strict No-Return & No-Refund Policy',
    highlight: true,
    content: 'ALL SALES ARE FINAL. We enforce a strict No-Return and No-Refund policy once an item has been purchased and successfully dispatched or delivered. Customers are strongly advised to inspect their electronics thoroughly at the point of delivery before signing off with the courier. For any technical faults discovered after delivery, contact the manufacturer\'s authorized service center under their warranty terms.',
  },
  {
    number: '06',
    icon: 'fa-copyright',
    title: 'Intellectual Property',
    content: 'All content on this Site — including text, graphics, logos, images, and software — is the property of ALLENJOE or its content suppliers and is protected by Nigerian and international copyright, trademark, and intellectual property laws.',
  },
  {
    number: '07',
    icon: 'fa-balance-scale',
    title: 'Limitation of Liability',
    content: 'To the maximum extent permitted by applicable Nigerian law, ALLENJOE shall not be liable for any indirect, incidental, special, consequential, or punitive damages including loss of profits, data, product failure, electrical surges, battery degradation, or personal injury resulting from the use or misuse of electronics purchased through the Site. Our total liability shall not exceed the amount paid for the specific product in question.',
  },
  {
    number: '08',
    icon: 'fa-ban',
    title: 'User Conduct & Prohibited Uses',
    content: 'You agree not to use the Site for any unlawful purpose, to infringe upon our intellectual property rights, to upload viruses or malicious code, or to engage in fraudulent chargeback schemes.',
  },
  {
    number: '09',
    icon: 'fa-gavel',
    title: 'Governing Law',
    content: 'These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any legal actions must be brought before courts of competent jurisdiction in Nigeria.',
  },
  {
    number: '10',
    icon: 'fa-sync-alt',
    title: 'Changes to These Terms',
    content: 'ALLENJOE reserves the right to update or modify these Terms at any time without prior notice. Your continued use of the Site following any changes constitutes your acceptance of the new Terms.',
  },
];

export default function Terms() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050506' }}>
      {/* BG accent */}
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
            <i className="fas fa-file-contract" /> Legal Document
          </div>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.04em', lineHeight: 1.1, marginBottom: 10 }}>
            Terms &amp; <span style={{ color: '#f58220' }}>Conditions</span>
          </h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: 600 }}>
              <i className="fas fa-calendar-alt" style={{ marginRight: 5 }} />Last Updated: May 28, 2026
            </span>
            <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#f59e0b', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', padding: '4px 10px', borderRadius: 99, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              <i className="fas fa-exclamation-triangle" style={{ marginRight: 4 }} />Informational Only — Not Legal Advice
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', borderLeft: '4px solid #f59e0b', borderRadius: '0 12px 12px 0', padding: '1rem 1.25rem', marginBottom: '2rem' }}>
          <p style={{ fontSize: '0.8rem', color: '#a0946f', lineHeight: 1.7, fontWeight: 500 }}>
            <strong style={{ color: '#f59e0b' }}>Disclaimer:</strong> This document is tailored to Nigerian consumer and cyber laws for informational purposes and does not constitute formal legal advice. E-commerce in Nigeria is governed by the <strong>FCCPC</strong> and <strong>NITDA</strong>.
          </p>
        </div>

        {/* Intro */}
        <div style={{ background: 'rgba(15,15,18,0.8)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
          <p style={{ fontSize: '0.85rem', color: '#888', lineHeight: 1.8, fontWeight: 500 }}>
            Welcome to <strong style={{ color: '#f58220' }}>ALLENJOE!</strong> These Terms and Conditions govern your use of our website and the purchase of any products from us. By accessing the Site or purchasing a product, you agree to be bound by these Terms.
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {SECTIONS.map(section => (
            <div
              key={section.number}
              style={{
                background: section.highlight ? 'rgba(239,68,68,0.06)' : 'rgba(15,15,18,0.8)',
                border: `1px solid ${section.highlight ? 'rgba(239,68,68,0.25)' : 'rgba(255,255,255,0.06)'}`,
                borderLeft: `4px solid ${section.highlight ? '#ef4444' : '#f58220'}`,
                borderRadius: '0 16px 16px 0',
                overflow: 'hidden',
              }}
            >
              {/* Section header */}
              <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 12, borderBottom: `1px solid ${section.highlight ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.04)'}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: section.highlight ? 'rgba(239,68,68,0.15)' : 'rgba(245,130,32,0.1)', border: `1px solid ${section.highlight ? 'rgba(239,68,68,0.3)' : 'rgba(245,130,32,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className={`fas ${section.icon}`} style={{ color: section.highlight ? '#ef4444' : '#f58220', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.55rem', fontWeight: 800, color: '#444', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 2 }}>Section {section.number}</div>
                  <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: section.highlight ? '#f87171' : '#e0e0e0', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>{section.title}</h2>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: '1rem 1.25rem 1.25rem' }}>
                <p style={{ fontSize: '0.82rem', color: section.highlight ? '#c0a0a0' : '#777', lineHeight: 1.8, fontWeight: 500, margin: 0 }}>{section.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div style={{ marginTop: '1.5rem', background: 'rgba(245,130,32,0.06)', border: '1px solid rgba(245,130,32,0.15)', borderRadius: 16, padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 800, color: '#f58220', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 12 }}>
            <i className="fas fa-headset" style={{ marginRight: 8 }} />Contact Us
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
            End of Terms & Conditions — Last Updated May 28, 2026
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
