import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';
import NotificationBell from './NotificationBell';

export default function Navbar() {
    const [search, setSearch] = useState('');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [tickerText, setTickerText] = useState('Premium Solar Inverters · CCTV Cameras · Lithium Batteries · Smart Automation — Nationwide Delivery');
    const [scrolled, setScrolled] = useState(false);
    const { user, isAdmin, logout } = useAuthStore();
    const items = useCartStore((s) => s.items);
    const cartCount = items.reduce((t, i) => t + (i.quantity || 1), 0);
    const navigate = useNavigate();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    // Scroll shadow with glassmorphism transition
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const docRef = doc(db, 'settings', 'site_settings');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().tickerMessages) {
                    setTickerText(docSnap.data().tickerMessages.join('     ·     '));
                }
            } catch (error) {
                console.error("Error fetching ticker settings:", error);
            }
        };
        fetchSettings();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/products?search=${encodeURIComponent(search.trim())}`);
            setSearch('');
            setMobileMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        toast.success('Signed out successfully');
        setMobileMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* TOP ANNOUNCEMENT BANNER */}
            <div className="ticker-bar hidden md:flex" role="marquee" aria-label="Promotions">
                <div className="ticker-track">
                    <span className="ticker-item">{tickerText}</span>
                    <span className="ticker-item">{tickerText}</span>
                    <span className="ticker-item">{tickerText}</span>
                </div>
            </div>

            {/* PRIMARY NAVBAR */}
            <nav 
                className="navbar" 
                role="navigation" 
                style={scrolled ? { background: 'rgba(11,11,14,0.96)', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' } : {}}
            >
                <div className="container nav-inner">
                    {/* Brand */}
                    <Link to="/" className="brand" style={{ flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none', gap: 0 }} aria-label="Allenjoe Home">
                        <div className="logo-title" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', fontWeight: 900, color: '#f58220', letterSpacing: '2px', lineHeight: 1 }}>
                            ALLEN<span>JOE</span>
                            <style>{`
                                .logo-title span { position: relative; display: inline-block; }
                                .logo-title span::after { content: ''; position: absolute; width: 110%; height: 2px; background: #f58220; bottom: 4px; left: -5%; transform: rotate(-15deg); }
                            `}</style>
                        </div>
                        <span className="logo-sub" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '0.65rem', color: '#fff', letterSpacing: '4px', marginTop: '5px', textTransform: 'uppercase' }}>
                            Automation
                        </span>
                    </Link>

                    {/* Menu */}
                    <ul className="nav-menu" role="list">
                        <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
                        <li><Link to="/products?cat=Inverters" className={location.search.includes('Inverters') ? 'active' : ''}>Inverters</Link></li>
                        <li><Link to="/products?cat=Solar Panels" className={location.search.includes('Panels') ? 'active' : ''}>Solar Panels</Link></li>
                        <li><Link to="/products?cat=Batteries" className={location.search.includes('Batteries') ? 'active' : ''}>Batteries</Link></li>
                        <li><Link to="/products?cat=CCTV" className={location.search.includes('CCTV') ? 'active' : ''}>CCTV</Link></li>
                        <li><Link to="/products" className={isActive('/products') && !location.search ? 'active' : ''}>Shop All</Link></li>
                    </ul>

                    {/* Right Actions */}
                    <div className="nav-right">
                        <form onSubmit={handleSearch} className="search-pill">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input 
                                type="search" 
                                placeholder="Search products…" 
                                aria-label="Search products"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>

                        {user ? (
                            <div className="hidden sm:flex items-center gap-2">
                                {isAdmin && (
                                    <Link to="/admin" className="nav-icon-btn text-brandRed" aria-label="Admin Panel" title="Admin Panel">
                                        <i className="fa-solid fa-cog"></i>
                                    </Link>
                                )}
                                <Link to="/profile" className="nav-icon-btn" aria-label="Account" title="My Profile">
                                    <i className="fa-solid fa-user"></i>
                                </Link>
                                <button onClick={handleLogout} className="nav-icon-btn text-brandRed hover:text-red-500" aria-label="Logout" title="Logout">
                                    <i className="fa-solid fa-sign-out-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="nav-icon-btn hidden sm:flex" aria-label="Login">
                                <i className="fa-solid fa-user"></i>
                            </Link>
                        )}

                        <div className="hidden sm:block">
                            <NotificationBell userId={user?.uid} isMobile={false} />
                        </div>

                        <Link to="/cart" className="nav-icon-btn" aria-label="Cart">
                            <i className="fa-solid fa-cart-shopping"></i>
                            {cartCount > 0 && <span className="badge">{cartCount}</span>}
                        </Link>

                        <Link to="/products" className="nav-shop-btn">
                            <i className="fa-solid fa-bag-shopping"></i> Shop Now
                        </Link>

                        {/* Mobile Menu Toggle — always visible, hidden on desktop via CSS */}
                        <button 
                            className="nav-icon-btn nav-mobile-toggle"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle mobile menu"
                        >
                            <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
                        </button>
                    </div>
                </div>

                {/* MOBILE NAVIGATION DRAWER */}
                <div 
                    className={`fixed inset-0 z-[2000] transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    {/* Drawer */}
                    <div 
                        className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-[#0a0a0a] border-l border-[#1a1a1a] p-6 shadow-2xl overflow-y-auto transition-transform duration-300 ease-out flex flex-col ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-tech text-xl font-bold text-white tracking-widest">MENU</span>
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#141414] text-gray-400 hover:text-white border border-[#222]"
                            >
                                <i className="fa-solid fa-xmark text-lg"></i>
                            </button>
                        </div>

                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="relative mb-6">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search products..."
                                className="w-full bg-[#141414] text-white pl-11 pr-4 py-3.5 rounded-xl text-sm border border-[#222] focus:border-[#f58220] outline-none font-medium transition-all"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                        </form>

                        <div className="space-y-2 mb-6">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3 px-1">Navigation</p>
                            <Link to="/" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${isActive('/') ? 'bg-[#1a1a1a] text-[#f58220] border border-[#333]' : 'text-gray-300 hover:text-white hover:bg-[#141414]'}`}>
                                <i className="fas fa-home w-5 text-center"></i> Home
                            </Link>
                            <Link to="/products" className={`flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${isActive('/products') && !location.search ? 'bg-[#1a1a1a] text-[#f58220] border border-[#333]' : 'text-gray-300 hover:text-white hover:bg-[#141414]'}`}>
                                <i className="fas fa-store w-5 text-center"></i> Shop All
                            </Link>
                        </div>

                        <div className="mb-6">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3 px-1">Categories</p>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: 'Inverters', to: '/products?cat=Inverters', icon: 'fa-bolt' },
                                    { label: 'Panels', to: '/products?cat=Solar Panels', icon: 'fa-solar-panel' },
                                    { label: 'Batteries', to: '/products?cat=Batteries', icon: 'fa-battery-full' },
                                    { label: 'CCTV', to: '/products?cat=CCTV', icon: 'fa-video' },
                                ].map(l => (
                                    <Link key={l.to} to={l.to} className="flex flex-col items-center justify-center gap-2 bg-[#141414] border border-[#222] rounded-xl p-4 text-gray-400 hover:text-white hover:border-[#f58220] transition-all">
                                        <i className={`fa-solid ${l.icon} text-xl text-[#f58220]`}></i>
                                        <span className="text-[11px] font-bold uppercase tracking-widest">{l.label}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-[#1a1a1a] space-y-2">
                            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-3 px-1">Account</p>
                            {user ? (
                                <>
                                    <Link to="/profile" className="flex items-center gap-4 px-4 py-3.5 text-gray-300 hover:text-white rounded-xl hover:bg-[#141414] text-sm font-bold transition-all">
                                        <i className="fas fa-user w-5 text-center text-gray-500"></i> My Profile
                                    </Link>
                                    <Link to="/cart" className="flex items-center justify-between px-4 py-3.5 text-gray-300 hover:text-white rounded-xl hover:bg-[#141414] text-sm font-bold transition-all">
                                        <div className="flex items-center gap-4">
                                            <i className="fas fa-bag-shopping w-5 text-center text-gray-500"></i> Cart
                                        </div>
                                        {cartCount > 0 && <span className="bg-[#f58220] text-black px-2 py-0.5 rounded-full text-[10px]">{cartCount}</span>}
                                    </Link>
                                    <div className="px-2 py-2">
                                        <NotificationBell userId={user.uid} isMobile={true} />
                                    </div>
                                    {isAdmin && (
                                        <Link to="/admin" className="flex items-center gap-4 px-4 py-3.5 text-[#f58220] font-black rounded-xl bg-[rgba(245,130,32,0.08)] border border-[rgba(245,130,32,0.2)] text-sm transition-all mt-2">
                                            <i className="fas fa-cog w-5 text-center"></i> Admin Panel
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-4 w-full text-left px-4 py-3.5 text-red-500 font-bold hover:text-red-400 rounded-xl hover:bg-red-950/20 text-sm transition-all mt-2"
                                    >
                                        <i className="fas fa-sign-out-alt w-5 text-center"></i> Logout
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-3 mt-2">
                                    <Link to="/login" className="flex items-center justify-center py-3.5 font-black rounded-xl text-black text-xs uppercase tracking-wider bg-brandOrange hover:bg-brandOrange/90 transition-colors shadow-[0_4px_12px_rgba(245,130,32,0.25)]">
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="flex items-center justify-center py-3.5 font-bold rounded-xl bg-[#141414] border border-[#2A2A30] text-gray-300 text-xs uppercase tracking-wider hover:bg-[#1a1a1a]">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
