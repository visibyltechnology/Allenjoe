import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import { ProductCard, SkeletonCard } from '../components/ProductCard';
import useAuthStore from '../store/useAuthStore';
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
    }
];

export default function Home() {
    const navigate = useNavigate();
    const { user } = useAuthStore();
    
    // Carousel State
    const [currentSlide, setCurrentSlide] = useState(0);
    const [bestSelling, setBestSelling] = useState([]);
    const [featLoading, setFeatLoading] = useState(true);

    // Data Fetching (fallback for now since categories changed)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setFeatLoading(true);
                const qRecent = query(collection(db, "products"), limit(4));
                const snapRecent = await getDocs(qRecent);
                let products = snapRecent.docs.map(d => ({ id: d.id, ...d.data() }));
                setBestSelling(products);
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
                <section className="hero" style={{ overflow: 'hidden' }}>
                    {HERO_SLIDES.map((slide, index) => (
                        <div 
                            key={slide.id}
                            className="hero-slide-bg"
                            style={{
                                position: 'absolute', inset: 0,
                                background: `url(${slide.bg}) center/cover no-repeat`,
                                opacity: index === currentSlide ? 0.35 : 0,
                                transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)',
                                transition: 'opacity 1s ease-in-out, transform 3s ease-out',
                                zIndex: 0
                            }}
                        >
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050505, transparent 50%, #050505)' }}></div>
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #050505, transparent 80%)' }}></div>
                        </div>
                    ))}
                    <div className="hero-bg">
                        <div className="orb orb-1"></div>
                        <div className="orb orb-2"></div>
                        <div className="scanline"></div>
                    </div>

                    <div className="container relative z-10" style={{ minHeight: '600px', display: 'flex', alignItems: 'center' }}>
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
                                <h1 className="hero-glow-text" style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', lineHeight: 1.1, marginBottom: '1.5rem', fontWeight: 900, whiteSpace: 'pre-line' }}>
                                    {slide.title1}<span className="gradient-text">{slide.titleGradient1}</span>{slide.title2}<span className="gradient-text">{slide.titleGradient2}</span>{slide.title3}
                                </h1>
                                <p style={{ fontSize: '1.1rem', color: '#a0a0b0', maxWidth: '600px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>{slide.desc}</p>
                                <div className="hero-btns" style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                                    <Link to="/products" className="btn btn-primary pulse-ring-btn" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '12px' }}>Build Your Array</Link>
                                    <a href="#integration" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>Explore The Tech</a>
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
                <section className="stats-banner relative z-20" style={{ marginTop: '-60px' }}>
                    <div className="container">
                        <div className="stats-grid glass-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(26,26,26,0.5)', padding: '1px', borderRadius: '24px' }}>
                            <div className="stat-card reveal-up active" style={{ background: '#0a0a0c', borderRadius: '23px 0 0 23px' }}>
                                <div className="icon-wrapper"><i className="fas fa-server"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>15,400+</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 700 }}>Systems Deployed</p>
                            </div>
                            <div className="stat-card reveal-up active" style={{ transitionDelay: '0.1s', background: '#0a0a0c' }}>
                                <div className="icon-wrapper"><i className="fas fa-bolt"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>99.9%</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 700 }}>Uptime Reliability</p>
                            </div>
                            <div className="stat-card reveal-up active" style={{ transitionDelay: '0.2s', background: '#0a0a0c' }}>
                                <div className="icon-wrapper"><i className="fas fa-eye"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>24/7</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 700 }}>AI Surveillance</p>
                            </div>
                            <div className="stat-card reveal-up active" style={{ transitionDelay: '0.3s', background: '#0a0a0c', borderRadius: '0 23px 23px 0' }}>
                                <div className="icon-wrapper"><i className="fas fa-shield-alt"></i></div>
                                <h3 className="counter gradient-text" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.5rem' }}>10 Yrs</h3>
                                <p style={{ color: '#777', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', fontWeight: 700 }}>Hardware Warranty</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* INTEGRATION HUB */}
                <section id="integration" className="integration section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div className="container">
                        <div className="section-header reveal-up active" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}>
                            <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: 900 }}>INTELLIGENT <span className="gradient-text">INTEGRATION HUB</span></h2>
                            <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>Our proprietary central routing module guarantees your security array remains active even during total grid collapse, drawing intelligently from hybrid inverter reserves.</p>
                        </div>

                        <div className="node-map-container reveal-fade active">
                            {/* Animated SVG Connections */}
                            <svg className="energy-flow-svg">
                                <path className="flow-line" d="M 250,150 C 350,150 400,250 500,250" />
                                <path className="flow-particle" d="M 250,150 C 350,150 400,250 500,250" />
                                
                                <path className="flow-line" d="M 750,150 C 650,150 600,250 500,250" />
                                <path className="flow-particle" d="M 750,150 C 650,150 600,250 500,250" style={{ animationDelay: '1s' }} />
                                
                                <path className="flow-line" d="M 500,250 L 500,400" />
                                <path className="flow-particle" d="M 500,250 L 500,400" style={{ animationDelay: '0.5s' }} />
                            </svg>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', position: 'relative', zIndex: 10 }}>
                                <div className="node glass-panel reveal-up active">
                                    <div className="node-icon-ring"><i className="fas fa-solar-panel"></i></div>
                                    <h4 style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>AllenJoe Pro Inverter</h4>
                                    <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem' }}>Uninterruptible hybrid power supply with rapid millisecond grid-fail switchover.</p>
                                </div>
                                <div className="node glass-panel reveal-up active" style={{ transitionDelay: '0.2s' }}>
                                    <div className="node-icon-ring"><i className="fas fa-video"></i></div>
                                    <h4 style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', marginBottom: '0.5rem' }}>4K AI Security Array</h4>
                                    <p style={{ textAlign: 'center', color: '#777', fontSize: '0.9rem' }}>Smart motion tracking cameras powered directly via Hub PoE connection.</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', position: 'relative', zIndex: 10 }}>
                                <div className="node glass-panel reveal-up active" style={{ transitionDelay: '0.4s', textAlign: 'center', border: '1px solid #f58220', boxShadow: '0 0 40px rgba(245,130,32,0.2)' }}>
                                    <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem', textShadow: '0 0 20px #f58220' }}>⚡</span>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#f58220', letterSpacing: '2px' }}>CORE HUB</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AUTOMATION & SCALING (Reference Flowchart) */}
                <section id="automation" className="automation section-padding" style={{ background: '#050506' }}>
                    <div className="container">
                        <div className="section-header reveal-up active" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem' }}>
                            <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: 900 }}>AUTOMATION & <span className="gradient-text">SCALING</span></h2>
                            <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#a0a0b0' }}>Design complex logical rules based on energy availability and security triggers.</p>
                        </div>

                        <div className="flowchart-container reveal-up active">
                            <svg className="flow-svg-paths">
                                <path className="flowchart-path glow" d="M 30% 50% L 45% 35% L 60% 50%" />
                                <path className="flowchart-path" d="M 30% 50% L 45% 65% L 60% 50%" />
                                <path className="flowchart-path glow" d="M 60% 50% L 75% 30%" />
                                <path className="flowchart-path" d="M 60% 50% L 75% 70%" />
                            </svg>

                            <div className="flow-node" style={{ left: '15%', top: '40%' }}>
                                <div className="flow-node-icon"><i className="fas fa-solar-panel"></i></div>
                                <div className="flow-node-text" style={{ color: '#fff', fontWeight: 700, marginBottom: '0.2rem' }}>If Solar &gt; 50%</div>
                                <div className="flow-node-text">Battery State: Charging</div>
                            </div>

                            <div className="flow-node" style={{ left: '42%', top: '40%', border: '1px solid #f58220', boxShadow: '0 0 20px rgba(245,130,32,0.2)' }}>
                                <div className="flow-node-icon" style={{ background: '#f58220', color: '#000' }}><i className="fas fa-brain"></i></div>
                                <div className="flow-node-text" style={{ color: '#fff', fontWeight: 700, marginBottom: '0.2rem' }}>AllenJoe Core Hub</div>
                                <div className="flow-node-text">Intelligent Routing Module</div>
                            </div>

                            <div className="flow-node" style={{ left: '70%', top: '20%' }}>
                                <div className="flow-node-icon"><i className="fas fa-video"></i></div>
                                <div className="flow-node-text" style={{ color: '#fff', fontWeight: 700, marginBottom: '0.2rem' }}>Activate AI Tracking</div>
                                <div className="flow-node-text">Increase frame rate & resolution</div>
                            </div>

                            <div className="flow-node" style={{ left: '70%', top: '65%' }}>
                                <div className="flow-node-icon"><i className="fas fa-plug"></i></div>
                                <div className="flow-node-text" style={{ color: '#fff', fontWeight: 700, marginBottom: '0.2rem' }}>Smart Load Shedding</div>
                                <div className="flow-node-text">Disable non-critical power</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ADVANCED SHOP */}
                <section id="products" className="products section-padding" style={{ background: '#0a0a0c' }}>
                    <div className="container">
                        <div className="section-header flex-between reveal-up active" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                            <div>
                                <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 900 }}>Advanced <span className="gradient-text">Shop</span></h2>
                                <p className="section-subtitle" style={{ fontSize: '1.1rem', color: '#a0a0b0', marginTop: '0.5rem' }}>Explore our catalog of premium solar and security products.</p>
                            </div>
                            <Link to="/products" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                View All <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>

                        {/* Horizontal scroll wrapper */}
                        <div className="home-products-scroll-track">
                            {/* Inverter Card */}
                            <div className="ref-product-card reveal-up active">
                                <div className="ref-product-img-wrapper">
                                    <img src="/images/prod_inverter_1785371316978.png" alt="Pro Hybrid Inverter" className="ref-product-img" />
                                </div>
                                <div className="ref-product-content">
                                    <h3 className="ref-product-title">ALLENJOE Pro Hybrid Inverter</h3>
                                    <p className="ref-product-desc">Seamless integration with battery banks. Rapid millisecond grid-fail switchover.</p>
                                    <div className="ref-product-specs">
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-bolt"></i>
                                            <span className="ref-spec-value">10kW</span>
                                            <span className="ref-spec-label">Output</span>
                                        </div>
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-battery-full"></i>
                                            <span className="ref-spec-value">48V</span>
                                            <span className="ref-spec-label">Battery</span>
                                        </div>
                                    </div>
                                    <div className="ref-product-actions">
                                        <button className="ref-btn-outline" onClick={() => navigate('/products?cat=Inverters')}>View Tech Specs</button>
                                        <button className="ref-btn-solid" onClick={() => navigate('/products?cat=Inverters')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>

                            {/* Solar Panel Card */}
                            <div className="ref-product-card reveal-up active" style={{ transitionDelay: '0.1s' }}>
                                <div className="ref-product-img-wrapper">
                                    <img src="/images/prod_solar_panel_1785371325929.png" alt="Pro Solar Array" className="ref-product-img" />
                                </div>
                                <div className="ref-product-content">
                                    <h3 className="ref-product-title">ALLENJOE Pro Solar Array</h3>
                                    <p className="ref-product-desc">High-efficiency monocrystalline cells designed for maximum yield in low-light.</p>
                                    <div className="ref-product-specs">
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-sun"></i>
                                            <span className="ref-spec-value">400W</span>
                                            <span className="ref-spec-label">Power</span>
                                        </div>
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-percentage"></i>
                                            <span className="ref-spec-value">22%</span>
                                            <span className="ref-spec-label">Efficiency</span>
                                        </div>
                                    </div>
                                    <div className="ref-product-actions">
                                        <button className="ref-btn-outline" onClick={() => navigate('/products?cat=Solar Panels')}>View Tech Specs</button>
                                        <button className="ref-btn-solid" onClick={() => navigate('/products?cat=Solar Panels')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>

                            {/* CCTV Card */}
                            <div className="ref-product-card reveal-up active" style={{ transitionDelay: '0.2s' }}>
                                <div className="ref-product-img-wrapper">
                                    <img src="/images/prod_cctv_1785371335915.png" alt="4K AI Security Camera" className="ref-product-img" />
                                </div>
                                <div className="ref-product-content">
                                    <h3 className="ref-product-title">ALLENJOE 4K AI Camera</h3>
                                    <p className="ref-product-desc">Real-time human detection and color night vision powered by AllenJoe AI.</p>
                                    <div className="ref-product-specs">
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-video"></i>
                                            <span className="ref-spec-value">4K UHD</span>
                                            <span className="ref-spec-label">Resolution</span>
                                        </div>
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-eye"></i>
                                            <span className="ref-spec-value">360&deg;</span>
                                            <span className="ref-spec-label">Coverage</span>
                                        </div>
                                    </div>
                                    <div className="ref-product-actions">
                                        <button className="ref-btn-outline" onClick={() => navigate('/products?cat=CCTV')}>View Tech Specs</button>
                                        <button className="ref-btn-solid" onClick={() => navigate('/products?cat=CCTV')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>

                            {/* Batteries Card */}
                            <div className="ref-product-card reveal-up active" style={{ transitionDelay: '0.3s' }}>
                                <div className="ref-product-img-wrapper" style={{ background: '#0a0a0c' }}>
                                    <i className="fas fa-battery-full" style={{ fontSize: '5rem', color: '#f58220', opacity: 0.7 }}></i>
                                </div>
                                <div className="ref-product-content">
                                    <h3 className="ref-product-title">ALLENJOE Lithium Battery Bank</h3>
                                    <p className="ref-product-desc">Scalable lithium storage for total grid independence. Deep-cycle, long lifespan.</p>
                                    <div className="ref-product-specs">
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-bolt"></i>
                                            <span className="ref-spec-value">5kWh</span>
                                            <span className="ref-spec-label">Capacity</span>
                                        </div>
                                        <div className="ref-spec-badge">
                                            <i className="fas fa-recycle"></i>
                                            <span className="ref-spec-value">6000+</span>
                                            <span className="ref-spec-label">Cycles</span>
                                        </div>
                                    </div>
                                    <div className="ref-product-actions">
                                        <button className="ref-btn-outline" onClick={() => navigate('/products?cat=Batteries')}>View Tech Specs</button>
                                        <button className="ref-btn-solid" onClick={() => navigate('/products?cat=Batteries')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ADVANCED SHOP */}
                <section id="shop" className="shop section-padding">
                    <div className="container">
                        <div className="section-header reveal active" style={{ textAlign: 'center' }}>
                            <h2 className="section-title">ADVANCED <span className="gradient-text">HARDWARE</span> SHOP</h2>
                            <p className="section-subtitle">Select individual components or purchase pre-configured bundles for maximum savings.</p>
                        </div>

                        <div className="filters reveal active">
                            <button className="filter-btn active">All Hardware</button>
                            <button className="filter-btn" onClick={() => navigate('/products?cat=Inverters')}>Inverters</button>
                            <button className="filter-btn" onClick={() => navigate('/products?cat=Solar Panels')}>Solar Arrays</button>
                            <button className="filter-btn" onClick={() => navigate('/products?cat=CCTV')}>CCTV Cameras</button>
                        </div>

                        {/* Horizontal scroll wrapper */}
                        <div className="home-products-scroll-track">
                            {/* Static Mock Item 1 */}
                            <div className="product-card reveal active">
                                <div className="product-badge">BEST SELLER</div>
                                <div className="product-img-wrapper" onClick={() => navigate('/products?cat=Inverters')}>
                                    <img src="/images/hybrid_inverter.png" alt="Inverter" className="product-img" />
                                </div>
                                <div className="product-content">
                                    <div className="product-rating">★★★★★ (124)</div>
                                    <h3 className="product-title">Pro Hybrid Inverter X1</h3>
                                    <p className="product-desc">Seamless grid-tie and off-grid capabilities with intelligent battery management.</p>
                                    <div className="product-specs">
                                        <div className="spec-item"><span className="spec-label">Output</span><span className="spec-value">10kW</span></div>
                                        <div className="spec-item"><span className="spec-label">Phase</span><span className="spec-value">3-Phase</span></div>
                                        <div className="spec-item"><span className="spec-label">Battery</span><span className="spec-value">48V</span></div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=Inverters')}>Tech Specs</button>
                                        <button className="btn btn-primary" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=Inverters')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>

                            {/* Static Mock Item 2 */}
                            <div className="product-card reveal active" style={{ transitionDelay: '0.1s' }}>
                                <div className="product-img-wrapper" onClick={() => navigate('/products?cat=Solar Panels')}>
                                    <img src="https://placehold.co/600x500/222/f58220?text=Mono+Solar+Panel" alt="Solar Panel" className="product-img" />
                                </div>
                                <div className="product-content">
                                    <div className="product-rating">★★★★★ (89)</div>
                                    <h3 className="product-title">Monocrystalline Array</h3>
                                    <p className="product-desc">Tier 1 solar panels engineered for extreme weather and low-light yields.</p>
                                    <div className="product-specs">
                                        <div className="spec-item"><span className="spec-label">Power</span><span className="spec-value">550W</span></div>
                                        <div className="spec-item"><span className="spec-label">Eff.</span><span className="spec-value">21.5%</span></div>
                                        <div className="spec-item"><span className="spec-label">Warr.</span><span className="spec-value">25 Yr</span></div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=Solar Panels')}>Tech Specs</button>
                                        <button className="btn btn-primary" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=Solar Panels')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>

                            {/* Static Mock Item 3 */}
                            <div className="product-card reveal active" style={{ transitionDelay: '0.2s' }}>
                                <div className="product-badge" style={{ background: '#e74c3c' }}>NEW ARRIVAL</div>
                                <div className="product-img-wrapper" onClick={() => navigate('/products?cat=CCTV')}>
                                    <img src="/images/hero_cctv.png" alt="CCTV Camera" className="product-img" />
                                </div>
                                <div className="product-content">
                                    <div className="product-rating">★★★★★ (42)</div>
                                    <h3 className="product-title">4K AI PTZ Security Cam</h3>
                                    <p className="product-desc">PoE enabled smart dome camera with 360° rotation and auto-human tracking.</p>
                                    <div className="product-specs">
                                        <div className="spec-item"><span className="spec-label">Res</span><span className="spec-value">4K UHD</span></div>
                                        <div className="spec-item"><span className="spec-label">Lens</span><span className="spec-value">Optical 4x</span></div>
                                        <div className="spec-item"><span className="spec-label">Vision</span><span className="spec-value">Color Night</span></div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=CCTV')}>Tech Specs</button>
                                        <button className="btn btn-primary" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=CCTV')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>

                            {/* Static Mock Item 4 – Batteries */}
                            <div className="product-card reveal active" style={{ transitionDelay: '0.3s' }}>
                                <div className="product-img-wrapper" onClick={() => navigate('/products?cat=Batteries')}>
                                    <img src="https://placehold.co/600x500/222/f58220?text=Lithium+Battery" alt="Battery" className="product-img" />
                                </div>
                                <div className="product-content">
                                    <div className="product-rating">★★★★★ (67)</div>
                                    <h3 className="product-title">Lithium Battery Bank</h3>
                                    <p className="product-desc">Scalable deep-cycle lithium storage for complete off-grid independence.</p>
                                    <div className="product-specs">
                                        <div className="spec-item"><span className="spec-label">Cap.</span><span className="spec-value">5kWh</span></div>
                                        <div className="spec-item"><span className="spec-label">Cycles</span><span className="spec-value">6000+</span></div>
                                        <div className="spec-item"><span className="spec-label">Volt</span><span className="spec-value">48V</span></div>
                                    </div>
                                    <div className="product-actions">
                                        <button className="btn btn-outline" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=Batteries')}>Tech Specs</button>
                                        <button className="btn btn-primary" style={{ padding: '0.6rem', fontSize: '0.8rem' }} onClick={() => navigate('/products?cat=Batteries')}>Add to Bundle</button>
                                    </div>
                                </div>
                            </div>
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
