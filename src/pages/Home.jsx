import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import { ProductCard, SkeletonCard } from '../components/ProductCard';
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import toast from 'react-hot-toast';
import './../home.css';
import './../ref.css';

const HERO_SLIDES = [
    {
        id: 1,
        badge: 'ALLENJOE: YOUR WORLD, POWERED AND PROTECTED',
        title1: 'INTEGRATED ',
        titleGradient1: 'SOLAR',
        title2: ' & \n',
        titleGradient2: 'SECURITY',
        title3: ' AUTOMATION',
        desc: 'Power your independence and protect your perimeter. The AllenJoe ecosystem seamlessly scales your energy matrix while keeping an AI-powered eye on your most valuable assets, 24/7.',
        bg: '/images/hero_split_bg_1785371298644.png'
    },
    {
        id: 2,
        badge: 'AI TRACKING • ACTIVE',
        title1: 'NEXT-GEN ',
        titleGradient1: 'AI CCTV',
        title2: ' & \n',
        titleGradient2: 'PERIMETER',
        title3: ' DEFENSE',
        desc: 'Smart motion tracking cameras powered directly via PoE. Ensure your compound is protected with 4K UHD color night vision and real-time human detection algorithms.',
        bg: '/images/hero_cctv.png'
    },
    {
        id: 3,
        badge: 'POWER HUB • UNINTERRUPTIBLE',
        title1: 'REVOLUTIONARY ',
        titleGradient1: 'HYBRID',
        title2: ' & \n',
        titleGradient2: 'STORAGE',
        title3: ' SOLUTIONS',
        desc: 'Uninterruptible power supply with rapid millisecond grid-fail switchover. Store excess solar yield in scalable lithium banks for absolute grid independence.',
        bg: '/images/hybrid_inverter.png'
    },
    {
        id: 4,
        badge: 'SOLAR ARRAYS • MAX YIELD',
        title1: 'HIGH-EFFICIENCY ',
        titleGradient1: 'SOLAR',
        title2: ' & \n',
        titleGradient2: 'PANELS',
        title3: ' ARRAY',
        desc: 'Maximize your energy yield with Tier 1 monocrystalline bi-facial solar panels. Engineered for extreme weather and decades of clean power generation.',
        bg: '/images/hero_solar_array_1785368220386.png'
    },
    {
        id: 5,
        badge: 'AUTOMATION • SMART CONTROL',
        title1: 'CENTRALIZED ',
        titleGradient1: 'LOGIC',
        title2: ' & \n',
        titleGradient2: 'CONTROL',
        title3: ' HUB',
        desc: 'Bring your entire home or facility under one intelligent dashboard. Monitor energy usage, control security feeds, and automate your lifestyle.',
        bg: '/images/logic_engine_1785370644286.png'
    }
];

import { DEMO_PRODUCTS } from '../utils/demoProducts';

export default function Home() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();
    
    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bestSelling, setBestSelling] = useState([]);
    const [secondGrid, setSecondGrid] = useState([]);
    const [featLoading, setFeatLoading] = useState(true);
    const productScrollRef = useRef(null);

    // Auto-scroll products track
    useEffect(() => {
        // Slide show stopped as requested
    }, []);

    // Auto-rotate Hero Carousel
    useEffect(() => {
        // Auto-rotation stopped as requested
        // const timer = setInterval(() => {
        //     setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
        // }, 6000);
        // return () => clearInterval(timer);
    }, []);

    // Data Fetching (fallback for now since categories changed)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setFeatLoading(true);
                if (!db) {
                    setBestSelling(DEMO_PRODUCTS.slice(0, 4));
                    setSecondGrid(DEMO_PRODUCTS.slice(4, 8));
                    return;
                }
                const qRecent = query(collection(db, "products"), limit(8));
                const snapRecent = await getDocs(qRecent);
                let products = snapRecent.docs.map(d => ({ id: d.id, ...d.data() }));
                setBestSelling(products.slice(0, 4));
                setSecondGrid(products.slice(4, 8));
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setFeatLoading(false);
            }
        };
        fetchData();
        
        // Scroll Reveal logic
        const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
        const revealOnScroll = () => {
            for (let i = 0; i < reveals.length; i++) {
                const windowHeight = window.innerHeight;
                const elementTop = reveals[i].getBoundingClientRect().top;
                const elementVisible = 100;
                if (elementTop < windowHeight - elementVisible) {
                    reveals[i].classList.add('active');
                }
            }
        };
        window.addEventListener('scroll', revealOnScroll);
        revealOnScroll(); // Initial check
        return () => window.removeEventListener('scroll', revealOnScroll);
    }, []);

    return (
        <div className="home-page-wrapper">
            <main>
                {/* HERO SECTION WITH CAROUSEL */}
                <section className="hero" style={{ overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: '110px', paddingBottom: '80px' }}>
                    {HERO_SLIDES.map((slide, index) => (
                        <div 
                            key={slide.id}
                            className="hero-slide-bg"
                            style={{
                                position: 'absolute', inset: 0,
                                background: `url('${slide.bg}') center/cover no-repeat`,
                                opacity: index === currentSlide ? 0.85 : 0,
                                transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
                                transition: 'opacity 1s ease-in-out, transform 3s ease-out',
                                zIndex: 0
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505, transparent 70%)' }}></div>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.7), transparent 100%)' }}></div>
                        </div>
                    ))}
                    <div className="hero-bg">
                        <div className="orb orb-1"></div>
                        <div className="orb orb-2"></div>
                        <div className="scanline"></div>
                    </div>

                    <div className="container relative z-10 w-full" style={{ display: 'flex', alignItems: 'center' }}>
                        {HERO_SLIDES.map((slide, index) => (
                            <div 
                                key={slide.id}
                                className={`hero-content ${index === currentSlide ? 'active' : ''}`}
                                style={{ 
                                    maxWidth: '800px', margin: '0 auto', textAlign: 'center', 
                                    position: index === currentSlide ? 'relative' : 'absolute',
                                    opacity: index === currentSlide ? 1 : 0,
                                    transform: index === currentSlide ? 'translateY(0)' : 'translateY(20px)',
                                    pointerEvents: index === currentSlide ? 'auto' : 'none',
                                    transition: 'opacity 0.8s ease, transform 0.8s ease',
                                    left: 0, right: 0
                                }}
                            >
                                <div className="hero-badge" style={{ display: 'inline-block', marginBottom: '1.5rem', background: 'rgba(245,130,32,0.1)', border: '1px solid #f58220', color: '#f58220', padding: '6px 16px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>
                                    <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#f58220', borderRadius: '50%', marginRight: '8px', animation: 'pulse 2s infinite' }}></span>
                                    {slide.badge}
                                </div>
                                <h1 className="hero-glow-text" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem, 8vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 900, whiteSpace: 'pre-line' }}>
                                    {slide.title1}<span className="gradient-text">{slide.titleGradient1}</span>{slide.title2}<span className="gradient-text">{slide.titleGradient2}</span>{slide.title3}
                                </h1>
                                <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#a0a0b0', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6, padding: '0 1rem' }}>{slide.desc}</p>
                                <div className="hero-btns" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', padding: '0 1rem' }}>
                                    <Link to="/products" className="btn btn-primary pulse-ring-btn w-full sm:w-auto text-center" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '12px' }}>Build Your Array</Link>
                                    <a href="#integration" className="btn btn-outline w-full sm:w-auto text-center" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>Explore The Tech</a>
                                </div>
                            </div>
                        ))}
                        
                        {/* Carousel Indicators */}
                        <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 20 }}>
                            {HERO_SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    style={{
                                        width: index === currentSlide ? '24px' : '8px',
                                        height: '8px',
                                        borderRadius: '4px',
                                        background: index === currentSlide ? '#f58220' : 'rgba(255,255,255,0.2)',
                                        border: 'none', cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ADVANCED STATS BANNER */}
                <section className="stats-banner relative z-20" style={{ marginTop: '-40px' }}>
                    <div className="container">
                        <div className="stats-grid glass-panel grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a]/50 p-px rounded-3xl overflow-hidden shadow-2xl">
                            <div className="stat-card reveal-up active flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0c] cursor-pointer hover:bg-[#111] transition-all" onClick={() => navigate('/products?cat=Inverters')}>
                                <div className="icon-wrapper mb-3 text-[#f58220] text-2xl"><i className="fas fa-plug"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, marginBottom: '0.25rem' }}>INVERTERS</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.65rem', fontWeight: 700 }}>Power Systems</p>
                            </div>
                            <div className="stat-card reveal-up active flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0c] cursor-pointer hover:bg-[#111] transition-all" style={{ transitionDelay: '0.1s' }} onClick={() => navigate('/products?cat=Solar Panels')}>
                                <div className="icon-wrapper mb-3 text-[#f58220] text-2xl"><i className="fas fa-solar-panel"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, marginBottom: '0.25rem' }}>SOLAR PANELS</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.65rem', fontWeight: 700 }}>Energy Capture</p>
                            </div>
                            <div className="stat-card reveal-up active flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0c] cursor-pointer hover:bg-[#111] transition-all" style={{ transitionDelay: '0.2s' }} onClick={() => navigate('/products?cat=Batteries')}>
                                <div className="icon-wrapper mb-3 text-[#f58220] text-2xl"><i className="fas fa-car-battery"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, marginBottom: '0.25rem' }}>BATTERIES</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.65rem', fontWeight: 700 }}>Energy Storage</p>
                            </div>
                            <div className="stat-card reveal-up active flex flex-col items-center justify-center p-6 text-center bg-[#0a0a0c] cursor-pointer hover:bg-[#111] transition-all" style={{ transitionDelay: '0.3s' }} onClick={() => navigate('/products?cat=CCTV')}>
                                <div className="icon-wrapper mb-3 text-[#f58220] text-2xl"><i className="fas fa-video"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', fontWeight: 900, marginBottom: '0.25rem' }}>CCTV</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.65rem', fontWeight: 700 }}>Smart Security</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ADVANCED SHOP — both grids side by side */}
                <section id="products" className="products section-padding" style={{ background: '#0a0a0c' }}>
                    <div className="container">
                        <div className="section-header flex-between reveal-up active flex-wrap gap-4" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
                            <div className="w-full sm:w-auto">
                                <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 6vw, 2.5rem)', fontWeight: 900 }}>ADVANCED <span className="gradient-text">HARDWARE SHOP</span></h2>
                                <p className="section-subtitle" style={{ fontSize: 'clamp(0.9rem, 3vw, 1.1rem)', color: '#a0a0b0', marginTop: '0.5rem' }}>Select individual components or purchase pre-configured bundles for maximum savings.</p>
                            </div>
                            <Link to="/products" className="btn btn-outline whitespace-nowrap" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                View All <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>

                        {/* Two grids side by side */}
                        <div className="home-dual-grid">

                            {/* Grid 1 */}
                            <div className="home-products-scroll-track" ref={productScrollRef}>
                                {featLoading ? (
                                    [1, 2].map(i => <SkeletonCard key={i} />)
                                ) : (
                                    bestSelling.map(product => (
                                        <div key={product.id} className="home-product-wrapper reveal-up active">
                                            <ProductCard
                                                product={product}
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                onAddToCart={(prod) => {
                                                    addToCart({ ...prod, quantity: 1 });
                                                    toast.success(`${prod.name.substring(0, 30)}... added to cart!`, {
                                                        icon: '🛒',
                                                        style: { background: '#0a0a0a', color: '#fff', border: '1px solid #f58220' }
                                                    });
                                                }}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Grid 2 */}
                            <div className="home-products-scroll-track">
                                {featLoading ? (
                                    [1, 2].map(i => <SkeletonCard key={`sk2-${i}`} />)
                                ) : secondGrid.length > 0 ? (
                                    secondGrid.map(product => (
                                        <div key={product.id} className="home-product-wrapper reveal-up active">
                                            <ProductCard
                                                product={product}
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                onAddToCart={(prod) => {
                                                    addToCart({ ...prod, quantity: 1 });
                                                    toast.success(`${prod.name.substring(0, 30)}... added to cart!`, {
                                                        icon: '🛒',
                                                        style: { background: '#0a0a0a', color: '#fff', border: '1px solid #f58220' }
                                                    });
                                                }}
                                            />
                                        </div>
                                    ))
                                ) : (
                                    bestSelling.map(product => (
                                        <div key={`g2-${product.id}`} className="home-product-wrapper reveal-up active">
                                            <ProductCard
                                                product={product}
                                                onClick={() => navigate(`/products/${product.id}`)}
                                                onAddToCart={(prod) => {
                                                    addToCart({ ...prod, quantity: 1 });
                                                    toast.success(`${prod.name.substring(0, 30)}... added to cart!`, {
                                                        icon: '🛒',
                                                        style: { background: '#0a0a0a', color: '#fff', border: '1px solid #f58220' }
                                                    });
                                                }}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>

                        </div>
                    </div>
                </section>

                {/* INTELLIGENT INTEGRATION HUB — redesigned */}
                <section id="integration" className="integration section-padding" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(180deg, #050506 0%, #0a0a10 100%)' }}>
                    <div className="container">
                        <div className="section-header reveal-up active" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem' }}>
                            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(245,130,32,0.08)', border: '1px solid rgba(245,130,32,0.3)', borderRadius: '50px', padding: '5px 14px', marginBottom: '1rem' }}>
                                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#f58220', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
                                <span style={{ fontSize: '0.7rem', color: '#f58220', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>LIVE ECOSYSTEM</span>
                            </div>
                            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900 }}>INTELLIGENT <span className="gradient-text">INTEGRATION HUB</span></h2>
                            <p className="section-subtitle" style={{ fontSize: '1rem', color: '#a0a0b0', marginTop: '0.75rem' }}>Our central routing module keeps security active even during total grid collapse, drawing intelligently from hybrid inverter reserves.</p>
                        </div>

                        {/* 3-column hub layout */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
                            {/* Inverter Card */}
                            <div className="glass-panel reveal-up active" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(245,130,32,0.12) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(30%, -30%)' }}></div>
                                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    <i className="fas fa-solar-panel" style={{ fontSize: '1.4rem', color: '#f58220' }}></i>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#f58220', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>POWER</div>
                                <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>AllenJoe Pro Inverter</h4>
                                <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.65 }}>Uninterruptible hybrid power supply with rapid millisecond grid-fail switchover.</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                                    <span style={{ background: 'rgba(245,130,32,0.1)', color: '#f58220', padding: '3px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 }}>10kW Output</span>
                                    <span style={{ background: 'rgba(245,130,32,0.1)', color: '#f58220', padding: '3px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 }}>48V Battery</span>
                                </div>
                            </div>

                            {/* Core Hub Card — centre, highlighted */}
                            <div className="glass-panel reveal-up active" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid #f58220', position: 'relative', overflow: 'hidden', background: 'rgba(245,130,32,0.04)', boxShadow: '0 0 50px rgba(245,130,32,0.12)', transitionDelay: '0.15s' }}>
                                <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(245,130,32,0.06) 0%, transparent 70%)' }}></div>
                                <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
                                    <div style={{ width: 70, height: 70, borderRadius: '18px', background: 'linear-gradient(135deg, #f58220, #c46516)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 8px 30px rgba(245,130,32,0.4)' }}>
                                        <span style={{ fontSize: '2rem', lineHeight: 1 }}>⚡</span>
                                    </div>
                                    <div style={{ fontSize: '0.65rem', color: '#f58220', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>CORE ENGINE</div>
                                    <h3 style={{ color: '#f58220', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '3px', marginBottom: '0.75rem' }}>CORE HUB</h3>
                                    <p style={{ color: '#a0a0b0', fontSize: '0.85rem', lineHeight: 1.6 }}>Intelligent Routing Module — the brain connecting power and security across your entire installation.</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '1.5rem' }}>
                                        <div style={{ background: 'rgba(245,130,32,0.08)', borderRadius: '10px', padding: '0.6rem', textAlign: 'center' }}>
                                            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f58220' }}>99.9%</div>
                                            <div style={{ fontSize: '0.6rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Uptime</div>
                                        </div>
                                        <div style={{ background: 'rgba(245,130,32,0.08)', borderRadius: '10px', padding: '0.6rem', textAlign: 'center' }}>
                                            <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f58220' }}>24/7</div>
                                            <div style={{ fontSize: '0.6rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>Active</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* CCTV Card */}
                            <div className="glass-panel reveal-up active" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)', position: 'relative', overflow: 'hidden', transitionDelay: '0.3s' }}>
                                <div style={{ position: 'absolute', top: 0, left: 0, width: 120, height: 120, background: 'radial-gradient(circle, rgba(245,130,32,0.12) 0%, transparent 70%)', borderRadius: '50%', transform: 'translate(-30%, -30%)' }}></div>
                                <div style={{ width: 52, height: 52, borderRadius: '14px', background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                                    <i className="fas fa-video" style={{ fontSize: '1.4rem', color: '#f58220' }}></i>
                                </div>
                                <div style={{ fontSize: '0.65rem', color: '#f58220', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>SECURITY</div>
                                <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.75rem', lineHeight: 1.3 }}>4K AI Security Array</h4>
                                <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.65 }}>Smart motion tracking cameras powered directly via Hub PoE connection — online even during outages.</p>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
                                    <span style={{ background: 'rgba(245,130,32,0.1)', color: '#f58220', padding: '3px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 }}>4K UHD</span>
                                    <span style={{ background: 'rgba(245,130,32,0.1)', color: '#f58220', padding: '3px 10px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 700 }}>AI Tracking</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* AUTOMATION & SCALING — redesigned as step-flow */}
                <section id="automation" className="automation section-padding" style={{ background: '#050506' }}>
                    <div className="container">
                        <div className="section-header reveal-up active" style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 3.5rem' }}>
                            <h2 className="section-title" style={{ fontSize: 'clamp(1.8rem, 6vw, 3rem)', fontWeight: 900 }}>AUTOMATION & <span className="gradient-text">SCALING</span></h2>
                            <p className="section-subtitle" style={{ fontSize: '1rem', color: '#a0a0b0', marginTop: '0.75rem' }}>Design complex logical rules based on energy availability and security triggers.</p>
                        </div>

                        {/* Step-flow cards — 4 cards with connectors */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', position: 'relative' }}>

                            {/* Connector line (desktop only) */}
                            <div className="desktop-only" style={{ position: 'absolute', top: '50%', left: '12.5%', right: '12.5%', height: '2px', background: 'linear-gradient(90deg, transparent, #f58220, #f58220, transparent)', transform: 'translateY(-50%)', zIndex: 0, opacity: 0.35 }}></div>

                            {[{
                                step: '01', icon: 'fa-sun', title: 'Solar Input', label: 'Condition', desc: 'If Solar > 50%', sub: 'Battery State: Charging', color: '#f58220'
                            }, {
                                step: '02', icon: 'fa-brain', title: 'AllenJoe Core Hub', label: 'Processing', desc: 'Intelligent Routing', sub: 'Module Analysis', color: '#f58220', highlight: true
                            }, {
                                step: '03', icon: 'fa-video', title: 'AI Tracking', label: 'Output A', desc: 'Activate AI Tracking', sub: 'Increase frame rate & resolution', color: '#f58220'
                            }, {
                                step: '04', icon: 'fa-plug', title: 'Load Control', label: 'Output B', desc: 'Smart Load Shedding', sub: 'Disable non-critical power', color: '#f58220'
                            }].map((item, i) => (
                                <div key={i} style={{ position: 'relative', zIndex: 1, padding: '0 0.75rem 1.5rem' }}>
                                    <div className="glass-panel" style={{
                                        padding: '1.75rem 1.5rem',
                                        borderRadius: '18px',
                                        border: item.highlight ? '1px solid #f58220' : '1px solid rgba(255,255,255,0.06)',
                                        background: item.highlight ? 'rgba(245,130,32,0.04)' : 'transparent',
                                        boxShadow: item.highlight ? '0 0 40px rgba(245,130,32,0.12)' : 'none',
                                        height: '100%'
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                                            <div style={{ width: 46, height: 46, borderRadius: '12px', background: item.highlight ? 'linear-gradient(135deg,#f58220,#c46516)' : 'rgba(245,130,32,0.1)', border: item.highlight ? 'none' : '1px solid rgba(245,130,32,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: item.highlight ? '0 6px 20px rgba(245,130,32,0.35)' : 'none' }}>
                                                <i className={`fas ${item.icon}`} style={{ fontSize: '1.1rem', color: item.highlight ? '#000' : '#f58220' }}></i>
                                            </div>
                                            <span style={{ fontSize: '0.65rem', color: 'rgba(245,130,32,0.5)', fontWeight: 900, letterSpacing: '2px' }}>STEP {item.step}</span>
                                        </div>
                                        <div style={{ fontSize: '0.62rem', color: '#f58220', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{item.label}</div>
                                        <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 800, marginBottom: '0.5rem', lineHeight: 1.3 }}>{item.title}</h4>
                                        <div style={{ color: item.highlight ? '#f58220' : '#ccc', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.25rem' }}>{item.desc}</div>
                                        <div style={{ color: '#666', fontSize: '0.78rem' }}>{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>



                {/* TESTIMONIALS */}
                <section className="testimonials section-padding">
                    <div className="container">
                        <div className="section-header reveal active" style={{ textAlign: 'center' }}>
                            <h2 className="section-title">CLIENT <span className="gradient-text">FEEDBACK</span></h2>
                            <p className="section-subtitle">What our commercial and residential partners say about our deployments.</p>
                        </div>
                        <div className="testimonial-grid reveal active">
                            <div className="testimo-card">
                                <div className="stars">★★★★★</div>
                                <p className="testimo-text">"Since installing the Allenjoe 3-Phase Hybrid System, our factory hasn't experienced a single minute of downtime. The transition during grid failures is completely seamless."</p>
                                <div className="client-info">
                                    <div className="client-avatar" style={{ backgroundImage: 'url(https://ui-avatars.com/api/?name=John+D&background=f58220&color=fff)', backgroundSize: 'cover' }}></div>
                                    <div>
                                        <div className="client-name">John D.</div>
                                        <div className="client-role">Operations Manager</div>
                                    </div>
                                </div>
                            </div>
                            <div className="testimo-card">
                                <div className="stars">★★★★★</div>
                                <p className="testimo-text">"The AI Security Array is incredible. I can monitor my entire estate from my phone, and the PoE integration with the central hub means cameras stay on even during outages."</p>
                                <div className="client-info">
                                    <div className="client-avatar" style={{ backgroundImage: 'url(https://ui-avatars.com/api/?name=Sarah+A&background=f58220&color=fff)', backgroundSize: 'cover' }}></div>
                                    <div>
                                        <div className="client-name">Sarah A.</div>
                                        <div className="client-role">Homeowner</div>
                                    </div>
                                </div>
                            </div>
                            <div className="testimo-card">
                                <div className="stars">★★★★★</div>
                                <p className="testimo-text">"Professional installation team and top-tier hardware. The automation rules we set up have cut our monthly energy costs by over 70%."</p>
                                <div className="client-info">
                                    <div className="client-avatar" style={{ backgroundImage: 'url(https://ui-avatars.com/api/?name=Michael+R&background=f58220&color=fff)', backgroundSize: 'cover' }}></div>
                                    <div>
                                        <div className="client-name">Michael R.</div>
                                        <div className="client-role">Business Owner</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CASE STUDIES / GALLERY */}
                <section className="case-studies section-padding" style={{ paddingTop: 0 }}>
                    <div className="container">
                        <div className="section-header reveal active" style={{ textAlign: 'center' }}>
                            <h2 className="section-title">DEPLOYMENT <span className="gradient-text">GALLERY</span></h2>
                            <p className="section-subtitle">Real-world applications of AllenJoe integrated systems.</p>
                        </div>
                        <div className="gallery-grid reveal active">
                            <div className="gallery-item">
                                <img src="/images/hero_solar.png" alt="Commercial" />
                                <div className="gallery-overlay">
                                    <h4>Commercial Grid</h4>
                                    <p>50kW Installation</p>
                                </div>
                            </div>
                            <div className="gallery-item">
                                <img src="https://placehold.co/600x400/222/f58220?text=Residential+Security" alt="Residential" />
                                <div className="gallery-overlay">
                                    <h4>Smart Home</h4>
                                    <p>Full Perimeter Security</p>
                                </div>
                            </div>
                            <div className="gallery-item">
                                <img src="https://placehold.co/600x400/222/f58220?text=Industrial+Inverters" alt="Industrial" />
                                <div className="gallery-overlay">
                                    <h4>Factory Backup</h4>
                                    <p>3-Phase Hybrid System</p>
                                </div>
                            </div>
                            <div className="gallery-item">
                                <img src="/images/control_room.png" alt="Control Room" />
                                <div className="gallery-overlay">
                                    <h4>Command Center</h4>
                                    <p>AI Surveillance Desk</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
