import { useState, useEffect } from 'react';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import Footer from '../components/Footer';
import { listenToCategories, DEFAULT_CATEGORIES } from '../utils/categoryService';
import { listenToBrands, DEFAULT_BRANDS } from '../utils/brandService';
import { ProductCard, SkeletonCard } from '../components/ProductCard';

// Map URL paths to categories
function pathToCategory(pathname) {
    if (pathname.includes('inverters')) return 'Inverters';
    if (pathname.includes('panels'))    return 'Solar Panels';
    if (pathname.includes('batteries')) return 'Batteries';
    if (pathname.includes('cctv'))      return 'CCTV';
    return null;
}

// Fallback product data for demo/no-firebase state
const DEMO_PRODUCTS = [
    {
        id: 'd1', name: 'Pro Hybrid Inverter X1 10kW', price: 850000, category: 'Inverters',
        brand: 'Deye', inventory_status: 'in_stock', items_left: 5, unlimited_stock: false,
        is_hidden: false, averageRating: 4.9, reviewCount: 124,
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
        description: 'Seamless grid-tie and off-grid hybrid inverter with 48V battery support and 3-phase output.',
        tag: 'best-seller',
    },
    {
        id: 'd2', name: 'Monocrystalline Solar Panel 550W', price: 180000, category: 'Solar Panels',
        brand: 'Jinko', inventory_status: 'in_stock', items_left: 50, unlimited_stock: false,
        is_hidden: false, averageRating: 4.8, reviewCount: 89,
        img: '/images/solar_panel.png',
        description: 'Tier 1 monocrystalline solar panel with 21.5% efficiency and 25-year performance warranty.',
    },
    {
        id: 'd3', name: '4K AI PTZ Security Camera', price: 95000, category: 'CCTV',
        brand: 'Hikvision', inventory_status: 'in_stock', items_left: 20, unlimited_stock: false,
        is_hidden: false, averageRating: 4.7, reviewCount: 42,
        img: '/images/hero_cctv.png',
        description: '360° PTZ dome camera with color night vision, PoE support, and AI motion tracking.',
        tag: 'new',
    },
    {
        id: 'd4', name: 'LiFePO4 Battery 200Ah 48V', price: 620000, category: 'Batteries',
        brand: 'Pylontech', inventory_status: 'in_stock', items_left: 8, unlimited_stock: false,
        is_hidden: false, averageRating: 5, reviewCount: 67,
        img: '/images/battery.png',
        description: 'Stackable lithium iron phosphate battery with 10-year cycle warranty and BMS protection.',
    },
    {
        id: 'd5', name: 'Growatt 5kW MPPT Inverter', price: 480000, category: 'Inverters',
        brand: 'Growatt', inventory_status: 'in_stock', items_left: 12, unlimited_stock: false,
        is_hidden: false, averageRating: 4.6, reviewCount: 55,
        img: '/images/hybrid_inverter.png',
        description: 'Single-phase solar inverter with built-in MPPT charger and WiFi monitoring.',
    },
    {
        id: 'd6', name: '16-Channel NVR Security Kit', price: 320000, category: 'CCTV',
        brand: 'Dahua', inventory_status: 'in_stock', items_left: 6, unlimited_stock: false,
        is_hidden: false, averageRating: 4.5, reviewCount: 38,
        img: '/images/control_room.png',
        description: '16-channel network video recorder with 4TB HDD, remote viewing, and AI analytics.',
    },
    {
        id: 'd7', name: '400W Flexible Solar Panel', price: 95000, category: 'Solar Panels',
        brand: 'Canadian Solar', inventory_status: 'in_stock', items_left: 30, unlimited_stock: false,
        is_hidden: false, averageRating: 4.7, reviewCount: 28,
        img: '/images/solar_panel.png',
        description: 'Lightweight flexible monocrystalline panel, ideal for curved surfaces and mobile setups.',
    },
    {
        id: 'd8', name: 'Smart Automation Control Hub', price: 75000, category: 'Automation Kits',
        brand: 'Allenjoe', inventory_status: 'in_stock', items_left: 15, unlimited_stock: false,
        is_hidden: false, averageRating: 4.9, reviewCount: 18,
        img: '/images/hero_solar.png',
        description: 'Central logic hub integrating solar, battery, and CCTV systems with remote mobile control.',
        tag: 'new',
    },
    {
        id: 'd9', name: '100A MPPT Solar Charge Controller', price: 120000, category: 'Accessories',
        brand: 'Victron', inventory_status: 'in_stock', items_left: 25, unlimited_stock: false,
        is_hidden: false, averageRating: 4.8, reviewCount: 45,
        img: '/images/battery_pack_shop_1785368571149.png',
        description: 'High-efficiency MPPT charge controller with Bluetooth monitoring.',
    },
    {
        id: 'd10', name: 'Dome CCTV Camera 1080p', price: 45000, category: 'CCTV',
        brand: 'Dahua', inventory_status: 'in_stock', items_left: 12, unlimited_stock: false,
        is_hidden: false, averageRating: 4.2, reviewCount: 15,
        img: '/images/control_room_1785368251776.png',
        description: 'Indoor dome camera with night vision and motion detection.',
    },
    {
        id: 'd11', name: 'Solar Panel Mounting Kit', price: 35000, category: 'Accessories',
        brand: 'Generic', inventory_status: 'in_stock', items_left: 40, unlimited_stock: false,
        is_hidden: false, averageRating: 4.5, reviewCount: 88,
        img: '/images/solar_panel_shop_1785368560963.png',
        description: 'Universal aluminum mounting brackets for pitched roofs.',
    },
    {
        id: 'd12', name: '5kVA Pure Sine Wave Inverter', price: 350000, category: 'Inverters',
        brand: 'Luminous', inventory_status: 'in_stock', items_left: 9, unlimited_stock: false,
        is_hidden: false, averageRating: 4.6, reviewCount: 76,
        img: '/images/hybrid_inverter_1785368241772.png',
        description: 'Reliable 5kVA inverter for home appliances and office equipment.',
    },
    {
        id: 'd13', name: '12V 200Ah Gel Battery', price: 210000, category: 'Batteries',
        brand: 'Tubular', inventory_status: 'in_stock', items_left: 20, unlimited_stock: false,
        is_hidden: false, averageRating: 4.4, reviewCount: 34,
        img: '/images/battery.png',
        description: 'Deep cycle gel battery designed for solar applications.',
    },
    {
        id: 'd14', name: 'Bi-facial Solar Panel 600W', price: 220000, category: 'Solar Panels',
        brand: 'Trina Solar', inventory_status: 'in_stock', items_left: 35, unlimited_stock: false,
        is_hidden: false, averageRating: 4.9, reviewCount: 112,
        img: '/images/prod_solar_panel_1785371325929.png',
        description: 'High-yield bi-facial panel capturing sunlight from both sides.',
        tag: 'hot',
    },
    {
        id: 'd15', name: 'Bullet AI Camera with Spotlight', price: 110000, category: 'CCTV',
        brand: 'Hikvision', inventory_status: 'in_stock', items_left: 18, unlimited_stock: false,
        is_hidden: false, averageRating: 4.7, reviewCount: 52,
        img: '/images/prod_cctv_1785371335915.png',
        description: 'Outdoor bullet camera featuring AI detection and active spotlight deterrence.',
    },
    {
        id: 'd16', name: 'Smart Home Energy Monitor', price: 55000, category: 'Accessories',
        brand: 'Allenjoe', inventory_status: 'in_stock', items_left: 50, unlimited_stock: false,
        is_hidden: false, averageRating: 4.8, reviewCount: 95,
        img: '/images/integration_hub_1785370635759.png',
        description: 'Real-time energy consumption monitor with mobile app integration.',
        tag: 'new',
    }
];

const CustomCheckbox = ({ checked }) => (
    <div style={{
        width: 18, height: 18,
        border: checked ? 'none' : '1.5px solid #333',
        borderRadius: 4,
        background: checked ? '#f58220' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.2s',
    }}>
        {checked && <i className="fas fa-check" style={{ color: '#000', fontSize: '0.6rem' }}></i>}
    </div>
);

const CAT_ICONS = {
    'Inverters':       'fa-bolt',
    'Solar Panels':    'fa-solar-panel',
    'Batteries':       'fa-battery-full',
    'CCTV':            'fa-video',
    'Accessories':     'fa-plug',
    'Automation Kits': 'fa-microchip',
    'All':             'fa-th-large',
};

export default function Shop() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
    const [brands, setBrands] = useState(DEFAULT_BRANDS);
    const [activeCategories, setActiveCategories] = useState([]);
    const [activeBrands, setActiveBrands] = useState([]);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('Popularity');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const unsubscribe = listenToCategories((cats) => {
            setCategories(cats.length > 0 ? cats : DEFAULT_CATEGORIES);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const unsubscribe = listenToBrands((brandList) => {
            setBrands(brandList.length > 0 ? brandList : DEFAULT_BRANDS);
        });
        return () => unsubscribe();
    }, []);

    const ensureInventoryFields = (product) => ({
        ...product,
        inventory_status: product.inventory_status || 'in_stock',
        items_left: product.items_left !== undefined ? product.items_left : 5,
        unlimited_stock: product.unlimited_stock || false,
        is_hidden: product.is_hidden || false
    });

    useEffect(() => {
        setLoading(true);
        const unsubscribe = onSnapshot(collection(db, 'products'), (snap) => {
            let items = snap.docs.map(d => ensureInventoryFields({ id: d.id, ...d.data() })).filter(p => !p.is_hidden);
            if (items.length === 0) {
                items = DEMO_PRODUCTS;
            }
            setProducts(items);
            setLoading(false);
        }, (error) => {
            console.error('Error fetching products:', error);
            setProducts(DEMO_PRODUCTS);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const cat = searchParams.get('cat') || pathToCategory(location.pathname);
        if (cat) {
            const match = categories.find(c => c.name.toLowerCase() === cat.toLowerCase())?.name;
            if (match) setActiveCategories([match]);
            setSearch('');
            setActiveBrands([]);
        }
        const searchQ = searchParams.get('search');
        if (searchQ) {
            setSearch(searchQ);
            setActiveCategories([]);
            setActiveBrands([]);
        }
    }, [location.search, location.pathname, searchParams, categories]);

    useEffect(() => { setCurrentPage(1); }, [search, activeCategories, activeBrands]);

    const filtered = products.filter(p => {
        const matchCat = activeCategories.length === 0 || activeCategories.includes(p.category);
        const matchBrand = activeBrands.length === 0 || activeBrands.includes(p.brand);
        const searchTerms = search.toLowerCase().trim().split(/\s+/).filter(Boolean);
        const searchableText = `${p.name || ''} ${p.brand || ''} ${p.category || ''} ${p.tag || ''} ${p.description || ''}`.toLowerCase();
        const matchSearch = searchTerms.length === 0 || searchTerms.every(term => searchableText.includes(term));
        return matchCat && matchBrand && matchSearch;
    });

    const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
            case 'Price: Low to High':  return (Number(a.price) || 0) - (Number(b.price) || 0);
            case 'Price: High to Low':  return (Number(b.price) || 0) - (Number(a.price) || 0);
            case 'Newest Arrivals':     return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
            case 'Popularity': default: return (b.averageRating || 0) - (a.averageRating || 0);
        }
    });

    const itemsPerPage = 12;
    const indexOfLastItem  = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems     = sorted.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages       = Math.ceil(sorted.length / itemsPerPage);

    const pageTitle = search
        ? `Search: "${search}"`
        : activeCategories.length === 0
            ? 'All Systems'
            : activeCategories.join(', ');

    return (
        <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* ── Page Header ── */}
            <div style={{
                background: 'linear-gradient(135deg, #0a0a0a 0%, #050505 100%)',
                borderBottom: '1px solid rgba(245,130,32,0.15)',
                padding: '110px 0 2.5rem',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* orange glow top-left */}
                <div style={{ position: 'absolute', top: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(245,130,32,0.06)', filter: 'blur(60px)', pointerEvents: 'none' }} />

                <div style={{ maxWidth: '82rem', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            {/* breadcrumb */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, fontSize: '0.75rem', color: '#8a8a8a' }}>
                                <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#f58220' }}>Home</span>
                                <span>/</span>
                                <span style={{ color: '#fff' }}>{pageTitle}</span>
                            </div>

                            <div style={{
                                display: 'inline-flex', alignItems: 'center', gap: 6,
                                background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.3)',
                                color: '#f58220', padding: '5px 14px', borderRadius: 99,
                                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                                textTransform: 'uppercase', fontFamily: 'Space Grotesk, sans-serif', marginBottom: '0.9rem',
                            }}>
                                <i className="fa-solid fa-bolt"></i> Premium Hardware Catalog
                            </div>
                            <h1 style={{
                                fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
                                fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: 1.1,
                            }}>
                                {pageTitle}
                            </h1>
                            <p style={{ color: '#8a8a8a', fontSize: '0.85rem', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <i className="fas fa-shield-halved" style={{ color: '#f58220' }}></i>
                                Genuine Hardware &bull; Installation Support &bull; 10-Year Warranty
                            </p>
                        </div>

                        {/* Search bar */}
                        <div style={{ position: 'relative', width: '100%', maxWidth: 380 }}>
                            <i className="fas fa-search" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#555' }}></i>
                            <input
                                type="text"
                                placeholder="Search inverters, cameras, panels..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{
                                    width: '100%', background: '#0a0a0a', border: '1px solid #222',
                                    color: '#fff', borderRadius: 12, padding: '0.9rem 1rem 0.9rem 2.8rem',
                                    fontSize: '0.85rem', outline: 'none', transition: 'all 0.2s',
                                    fontFamily: 'Montserrat, sans-serif',
                                }}
                                onFocus={e => e.target.style.borderColor = '#f58220'}
                                onBlur={e => e.target.style.borderColor = '#222'}
                            />
                        </div>
                    </div>

                    {/* Category quick-filters */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: '1.5rem' }}>
                        {DEFAULT_CATEGORIES.map(cat => {
                            const isActive = cat.name === 'All'
                                ? activeCategories.length === 0
                                : activeCategories.includes(cat.name);
                            return (
                                <button
                                    key={cat.name}
                                    onClick={() => {
                                        if (cat.name === 'All') { setActiveCategories([]); }
                                        else {
                                            setActiveCategories(prev =>
                                                prev.includes(cat.name) ? prev.filter(c => c !== cat.name) : [cat.name]
                                            );
                                        }
                                        setCurrentPage(1);
                                    }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 7,
                                        padding: '0.5rem 1rem', borderRadius: 99, cursor: 'pointer',
                                        fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.75rem', fontWeight: 700,
                                        letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.25s',
                                        background: isActive ? '#f58220' : '#0a0a0a',
                                        color: isActive ? '#000' : '#8a8a8a',
                                        border: isActive ? '1px solid #f58220' : '1px solid #222',
                                        boxShadow: isActive ? '0 0 16px rgba(245,130,32,0.3)' : 'none',
                                    }}
                                >
                                    <i className={`fa-solid ${CAT_ICONS[cat.name] || 'fa-circle'}`} style={{ fontSize: '0.7rem' }}></i>
                                    {cat.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Main Content Layout ── */}
            <div className="flex flex-col md:flex-row w-full max-w-[82rem] mx-auto px-4 md:px-6 py-8 gap-8 flex-1">

                {/* Sidebar Filters */}
                <aside className="w-full md:w-[240px] flex-shrink-0">
                    <div style={{
                        background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 16,
                        overflow: 'hidden', position: 'sticky', top: 100,
                    }}>
                        {/* Brands */}
                        <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.75rem', color: '#fff', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                                Brands
                            </span>
                            <i className="fas fa-tag" style={{ color: '#f58220', fontSize: '0.75rem' }}></i>
                        </div>
                        <div style={{ padding: '0.75rem', maxHeight: 280, overflowY: 'auto' }}>
                            {/* All brands option */}
                            <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem 0.5rem', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                <input type="checkbox" style={{ display: 'none' }}
                                    checked={activeBrands.length === 0}
                                    onChange={() => { setActiveBrands([]); setCurrentPage(1); }}
                                />
                                <CustomCheckbox checked={activeBrands.length === 0} />
                                <span style={{ fontSize: '0.82rem', color: activeBrands.length === 0 ? '#fff' : '#8a8a8a', fontWeight: 500 }}>All Brands</span>
                            </label>
                            {brands.map(brand => (
                                <label key={brand.id || brand.name}
                                    style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0.5rem 0.5rem', cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#141414'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                    <input type="checkbox" style={{ display: 'none' }}
                                        checked={activeBrands.includes(brand.name)}
                                        onChange={(e) => {
                                            if (e.target.checked) setActiveBrands(prev => [...prev, brand.name]);
                                            else setActiveBrands(prev => prev.filter(b => b !== brand.name));
                                            setCurrentPage(1);
                                        }}
                                    />
                                    <CustomCheckbox checked={activeBrands.includes(brand.name)} />
                                    <span style={{ fontSize: '0.82rem', color: activeBrands.includes(brand.name) ? '#fff' : '#8a8a8a', fontWeight: 500 }}>{brand.name}</span>
                                </label>
                            ))}
                        </div>

                        {/* Clear button */}
                        {(activeBrands.length > 0 || activeCategories.length > 0 || search) && (
                            <div style={{ padding: '0.75rem', borderTop: '1px solid #1a1a1a' }}>
                                <button
                                    onClick={() => { setSearch(''); setActiveCategories([]); setActiveBrands([]); }}
                                    style={{
                                        width: '100%', background: 'rgba(245,130,32,0.1)', border: '1px solid rgba(245,130,32,0.3)',
                                        color: '#f58220', borderRadius: 8, padding: '0.6rem',
                                        fontSize: '0.7rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif',
                                        letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
                                        transition: 'all 0.2s',
                                    }}
                                    onMouseEnter={e => { e.currentTarget.style.background = '#f58220'; e.currentTarget.style.color = '#000'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(245,130,32,0.1)'; e.currentTarget.style.color = '#f58220'; }}
                                >
                                    <i className="fas fa-times-circle" style={{ marginRight: 6 }}></i>
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* ── Main Product Grid ── */}
                <div style={{ flex: 1, minWidth: 0 }}>
                    {/* Sort / results bar */}
                    <div style={{
                        background: '#0a0a0a', border: '1px solid #1a1a1a', borderRadius: 12,
                        padding: '0.9rem 1.25rem', display: 'flex', flexWrap: 'wrap',
                        alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem',
                    }}>
                        <p style={{ color: '#8a8a8a', fontSize: '0.82rem', fontWeight: 500 }}>
                            Showing{' '}
                            <span style={{ color: '#fff', fontWeight: 700 }}>
                                {sorted.length > 0 ? indexOfFirstItem + 1 : 0}–{Math.min(indexOfLastItem, sorted.length)}
                            </span>
                            {' '}of{' '}
                            <span style={{ color: '#f58220', fontWeight: 700 }}>{sorted.length}</span> items
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#141414', border: '1px solid #222', borderRadius: 10, padding: '0.4rem 1rem' }}>
                            <span style={{ fontSize: '0.68rem', color: '#555', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Sort:</span>
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                                style={{ background: 'transparent', color: '#fff', border: 'none', outline: 'none', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}
                            >
                                <option style={{ background: '#141414' }}>Popularity</option>
                                <option style={{ background: '#141414' }}>Newest Arrivals</option>
                                <option style={{ background: '#141414' }}>Price: Low to High</option>
                                <option style={{ background: '#141414' }}>Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="products-grid">
                            {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div style={{
                            background: '#0a0a0a', border: '1px solid #1a1a1a',
                            borderRadius: 20, padding: '4rem 2rem', textAlign: 'center',
                        }}>
                            <div style={{ width: 64, height: 64, background: '#141414', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                                <i className="fas fa-search" style={{ color: '#555', fontSize: '1.5rem' }}></i>
                            </div>
                            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
                                No products found
                            </h3>
                            <p style={{ color: '#8a8a8a', fontSize: '0.85rem', maxWidth: 320, margin: '0 auto 2rem' }}>
                                We couldn't find items matching your criteria. Try adjusting your filters.
                            </p>
                            <button
                                onClick={() => { setSearch(''); setActiveCategories([]); setActiveBrands([]); }}
                                style={{
                                    background: 'linear-gradient(135deg,#f58220,#c46516)', color: '#000',
                                    border: 'none', borderRadius: 10, padding: '0.85rem 2rem',
                                    fontSize: '0.75rem', fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif',
                                    letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {currentItems.map(p => (
                                <ProductCard
                                    key={p.id}
                                    product={p}
                                    onClick={() => navigate(`/products/${p.id}`)}
                                />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' }}>
                            <button
                                disabled={currentPage === 1}
                                onClick={() => { setCurrentPage(prev => prev - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                    background: currentPage === 1 ? '#0a0a0a' : 'rgba(245,130,32,0.1)',
                                    color: currentPage === 1 ? '#555' : '#f58220',
                                    border: `1px solid ${currentPage === 1 ? '#1a1a1a' : 'rgba(245,130,32,0.3)'}`,
                                    borderRadius: 10, padding: '0.75rem 1.5rem',
                                    fontSize: '0.75rem', fontWeight: 700,
                                    fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.15em',
                                    textTransform: 'uppercase', cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <i className="fas fa-chevron-left"></i> Prev
                            </button>
                            <span style={{ fontSize: '0.82rem', color: '#8a8a8a', fontWeight: 600 }}>
                                Page <span style={{ color: '#fff' }}>{currentPage}</span> of {totalPages}
                            </span>
                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => { setCurrentPage(prev => prev + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                style={{
                                    background: currentPage === totalPages ? '#0a0a0a' : 'rgba(245,130,32,0.1)',
                                    color: currentPage === totalPages ? '#555' : '#f58220',
                                    border: `1px solid ${currentPage === totalPages ? '#1a1a1a' : 'rgba(245,130,32,0.3)'}`,
                                    borderRadius: 10, padding: '0.75rem 1.5rem',
                                    fontSize: '0.75rem', fontWeight: 700,
                                    fontFamily: 'Space Grotesk, sans-serif', letterSpacing: '0.15em',
                                    textTransform: 'uppercase', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                    transition: 'all 0.2s',
                                }}
                            >
                                Next <i className="fas fa-chevron-right"></i>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
