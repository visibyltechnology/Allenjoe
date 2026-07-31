import { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import useAuthStore from './store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';
import ReturnToTopButton from './components/ReturnToTopButton';
import './index.css';

// Lazy load pages for performance
const Home          = lazy(() => import('./pages/Home'));
const Shop          = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Login         = lazy(() => import('./pages/Login'));
const Register      = lazy(() => import('./pages/Register'));
import VerifyOTP from './pages/VerifyOTP';
const ForgotPassword= lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Profile       = lazy(() => import('./pages/Profile'));
const Cart          = lazy(() => import('./pages/Cart'));
const Notifications = lazy(() => import('./pages/Notifications'));
const DeliveryPortal= lazy(() => import('./pages/DeliveryPortal'));
const Terms          = lazy(() => import('./pages/Terms'));
const PrivacyPolicy  = lazy(() => import('./pages/PrivacyPolicy'));

const AdminLayout      = lazy(() => import('./pages/Admin/AdminLayout'));
const ProductManager   = lazy(() => import('./pages/Admin/ProductManager'));
const CategoryManager  = lazy(() => import('./pages/Admin/CategoryManager'));
const BrandManager     = lazy(() => import('./pages/Admin/BrandManager'));
const ProductForm      = lazy(() => import('./pages/Admin/ProductForm'));
const AdminOrders      = lazy(() => import('./pages/Admin/AdminOrders'));
const AdminUsers       = lazy(() => import('./pages/Admin/AdminUsers'));
const SiteSettings     = lazy(() => import('./pages/Admin/SiteSettings'));

/* ─── Page-level Suspense mini-loader ─── */
const Loader = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '60vh',
    gap: '16px',
    background: '#050505',
  }}>
    <style>{`
      @keyframes ntSpin   { to { transform: rotate(360deg); } }
      @keyframes ntFadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      .nt-ring {
        width: 44px; height: 44px;
        border: 3px solid rgba(245, 130, 32, 0.2);
        border-top-color: #f58220;
        border-radius: 50%;
        animation: ntSpin 0.8s cubic-bezier(0.4,0,0.6,1) infinite;
      }
      .nt-loader-text { animation: ntFadeUp 0.5s ease forwards; }
    `}</style>
    <div className="nt-ring"></div>
    <div className="nt-loader-text" style={{ textAlign: 'center', lineHeight: 1 }}>
      <span style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: '1.2rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        background: 'linear-gradient(135deg, #f58220 30%, #fff 70%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        textTransform: 'uppercase',
      }}>ALLENJOE</span>
      <span style={{ color: '#8a8a8a', fontSize: '0.65rem', letterSpacing: '0.3em', display: 'block', marginTop: 4, textTransform: 'uppercase' }}>Automation</span>
    </div>
  </div>
);

/* ─── Full-page splash screen (auth init) ─── */
const SplashScreen = () => {
  const [bootText, setBootText] = useState("INITIALIZING AI CORE...");

  useEffect(() => {
    const sequence = [
      { text: "ESTABLISHING SECURE CONNECTION...", time: 600 },
      { text: "SYNCING SOLAR INVERTERS...", time: 1400 },
      { text: "CALIBRATING CCTV ALGORITHMS...", time: 2200 },
      { text: "ALLENJOE SYSTEM ONLINE", time: 3000 }
    ];
    
    const timeouts = sequence.map(seq => setTimeout(() => setBootText(seq.text), seq.time));
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#050506',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes drawHex {
          0% { stroke-dashoffset: 1000; opacity: 0; }
          50% { opacity: 1; }
          100% { stroke-dashoffset: 0; opacity: 1; }
        }
        @keyframes pulseGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(245, 130, 32, 0.2)); }
          50% { filter: drop-shadow(0 0 25px rgba(245, 130, 32, 0.8)); }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hex-loader {
          width: 120px;
          height: 120px;
          animation: pulseGlow 2s infinite;
          position: relative;
        }
        .hex-svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }
        .hex-path {
          fill: none;
          stroke: #f58220;
          stroke-width: 4;
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: drawHex 2.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .hex-inner-circle {
          fill: rgba(245, 130, 32, 0.1);
          animation: pulseGlow 1.5s infinite;
        }
        .boot-text-container {
          margin-top: 2rem;
          font-family: 'Space Grotesk', monospace;
          color: #f58220;
          font-size: 0.9rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          position: relative;
          text-align: center;
        }
        .cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background-color: #f58220;
          margin-left: 5px;
          vertical-align: middle;
          animation: blink 0.8s infinite;
        }
        .loading-bar-container {
          width: 250px;
          height: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin-top: 1.5rem;
          position: relative;
          overflow: hidden;
        }
        .loading-bar {
          height: 100%;
          background: #f58220;
          width: 0%;
          transition: width 0.8s ease-in-out;
        }
        .ambient-glow {
          position: absolute;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(245,130,32,0.1) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
      `}</style>

      <div className="ambient-glow" />

      <div className="hex-loader">
        <svg className="hex-svg" viewBox="0 0 100 100">
          <polygon className="hex-path" points="50,5 90,25 90,75 50,95 10,75 10,25" />
          <circle className="hex-inner-circle" cx="50" cy="50" r="15" />
        </svg>
      </div>

      <div className="boot-text-container">
        {bootText}<span className="cursor" />
      </div>

      <div className="loading-bar-container">
        <div 
          className="loading-bar" 
          style={{ width: bootText === "ALLENJOE SYSTEM ONLINE" ? '100%' : bootText.includes("CCTV") ? '75%' : bootText.includes("SOLAR") ? '50%' : '25%' }}
        />
      </div>

    </div>
  );
};

function App() {
  const { user, isAdmin, init, loading } = useAuthStore();

  useEffect(() => { init(); }, [init]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <ScrollToTop />
      <ReturnToTopButton />
      <Navbar />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#111',
            color: '#fff',
            border: '1px solid #222',
            borderRadius: '10px',
            fontSize: '0.875rem',
            fontFamily: 'Montserrat, sans-serif',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          },
          success: { iconTheme: { primary: '#f58220', secondary: '#fff' } },
          error:   { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      {/* Page content */}
      <main style={{ minHeight: '100vh' }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/products"       element={<Shop />} />
            <Route path="/products/:id"   element={<ProductDetail />} />
            <Route path="/shop"           element={<Shop />} />

            {/* Solar & CCTV category routes */}
            <Route path="/inverters"      element={<Shop />} />
            <Route path="/panels"         element={<Shop />} />
            <Route path="/batteries"      element={<Shop />} />
            <Route path="/cctv"           element={<Shop />} />
            <Route path="/accessories"    element={<Shop />} />

            <Route path="/login"          element={<Login />} />
            <Route path="/register"       element={<Register />} />
            <Route path="/verify-otp"     element={<VerifyOTP />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password"  element={<ResetPassword />} />
            <Route path="/profile"        element={user ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/cart"           element={<Cart />} />
            <Route path="/notifications"  element={user ? <Notifications /> : <Navigate to="/login" />} />
            <Route path="/delivery"       element={<DeliveryPortal />} />
            <Route path="/terms"          element={<Terms />} />
            <Route path="/privacy"        element={<PrivacyPolicy />} />

            <Route path="/admin" element={user && isAdmin ? <AdminLayout /> : <Navigate to="/" />}>
              <Route index              element={<ProductManager />} />
              <Route path="categories"  element={<CategoryManager />} />
              <Route path="brands"      element={<BrandManager />} />
              <Route path="new"         element={<ProductForm />} />
              <Route path="edit/:id"    element={<ProductForm />} />
              <Route path="orders"      element={<AdminOrders />} />
              <Route path="users"       element={<AdminUsers />} />
              <Route path="settings"    element={<SiteSettings />} />
            </Route>
          </Routes>
        </Suspense>
      </main>
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '24px',
          zIndex: 9000,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.45)',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'scale(1.12)';
          e.currentTarget.style.boxShadow = '0 6px 28px rgba(37,211,102,0.65)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(37,211,102,0.45)';
        }}
      >
        {/* Pulse ring */}
        <span style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid rgba(37,211,102,0.6)',
          animation: 'wa-pulse 2s ease-out infinite',
        }} />
        <style>{`
          @keyframes wa-pulse {
            0%   { transform: scale(1);   opacity: 0.8; }
            70%  { transform: scale(1.5); opacity: 0; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
        <i className="fab fa-whatsapp" style={{ fontSize: '1.75rem', color: '#fff', lineHeight: 1 }}></i>
      </a>
    </Router>
  );
}

export default App;
