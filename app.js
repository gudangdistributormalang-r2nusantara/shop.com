/* ==========================================================
   app.js — R2 Nusantara · Desain WooCommerce/Shopify
   Katalog 2 kolom mobile, 3 tablet, 4 desktop
   Ikon Lucide (fallback emoji)
   ========================================================== */
'use strict';

console.log('🚀 R2 Nusantara · WooCommerce/Shopify Design');

const { useState, useEffect, useMemo, useCallback, useContext, createContext } = React;

// ===== UTILITY =====
function formatRupiah(n) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);
}

function getCartTotal(items) {
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

function getCartQty(items) {
    return items.reduce((sum, i) => sum + i.qty, 0);
}

function getStockLabel(stock) {
    if (stock <= 0) return { label: 'Habis', className: 'badge-soldout' };
    if (stock < 10) return { label: `Sisa ${stock}`, className: 'bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full' };
    return null;
}

// ===== TOAST =====
let toastContainer = null;
function showToast(message, type = 'info') {
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'fixed top-20 right-4 z-[60] space-y-2 w-[calc(100%-2rem)] max-w-xs pointer-events-none';
        document.body.appendChild(toastContainer);
    }
    const el = document.createElement('div');
    const bg = type === 'success' ? 'bg-brand-black' : type === 'error' ? 'bg-brand-error' : 'bg-brand-gray';
    el.className = `toast-enter pointer-events-auto px-5 py-3 rounded-xl text-white text-sm font-medium shadow-soft flex items-center gap-3 ${bg}`;
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
    el.innerHTML = `<span class="text-lg">${icon}</span><span>${message}</span>`;
    document.body.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateX(24px)';
        el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
    }, 2800);
}

// ===== CONTEXT =====
const CartContext = createContext();
const WishlistContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        try { return JSON.parse(localStorage.getItem('r2_cart')) || []; } catch { return []; }
    });
    useEffect(() => { localStorage.setItem('r2_cart', JSON.stringify(cart)); }, [cart]);

    const addToCart = (product, qty = 1) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === product.id);
            if (existing) {
                return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + qty } : i);
            }
            return [...prev, { id: product.id, name: product.name, price: product.price, qty }];
        });
        showToast('Ditambahkan ke keranjang', 'success');
    };

    const updateQty = (id, delta) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === id);
            if (!existing) return prev;
            const newQty = Math.max(1, existing.qty + delta);
            return prev.map(i => i.id === id ? { ...i, qty: newQty } : i);
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, clearCart, cartTotal: getCartTotal(cart), cartQty: getCartQty(cart) }}>
            {children}
        </CartContext.Provider>
    );
}

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        try { return JSON.parse(localStorage.getItem('r2_wishlist')) || []; } catch { return []; }
    });
    useEffect(() => { localStorage.setItem('r2_wishlist', JSON.stringify(wishlist)); }, [wishlist]);

    const toggleWishlist = (productId) => {
        setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
    };

    const isWishlisted = (productId) => wishlist.includes(productId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
            {children}
        </WishlistContext.Provider>
    );
}

function useCart() { return useContext(CartContext); }
function useWishlist() { return useContext(WishlistContext); }

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const els = document.querySelectorAll('.scroll-reveal');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => obs.observe(el));
}

// ============================================================
// ===== KOMPONEN =====
// ============================================================

function Icon({ name, size = 24, className = '' }) {
    const iconMap = {
        'shopping-cart': '🛒', 'search': '🔍', 'x': '✕', 'chevron-right': '→',
        'chevron-left': '←', 'star': '⭐', 'shield-check': '🛡️', 'truck': '🚚',
        'credit-card': '💳', 'check-circle': '✅', 'smartphone': '📱',
        'cpu': '⚡', 'camera': '📷', 'battery': '🔋', 'info': 'ℹ️',
        'menu': '☰', 'home': '🏠', 'package': '📦', 'phone': '📞', 'plus': '➕',
        'minus': '➖', 'heart': '❤️', 'heart-outline': '🤍'
    };
    const content = iconMap[name] || '•';
    return <span className={`inline-block ${className}`} style={{ fontSize: size }}>{content}</span>;
}

// ---- HEADER ----
function Header({ cartQty, onCartToggle, searchQuery, onSearchChange, onCategoryChange, activeCategory }) {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    return (
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center gap-2 cursor-pointer group" onClick={() => { onCategoryChange('R2'); }}>
                        <div className="bg-black text-white p-2 rounded-xl group-hover:scale-105 transition-transform">
                            <Icon name="smartphone" size={24} />
                        </div>
                        <span className="font-extrabold text-2xl tracking-tight text-gray-900">
                            R2<span className="text-gray-400">Nusantara</span>
                        </span>
                    </div>
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                        <input
                            type="text"
                            placeholder="Cari produk R2, Resmi..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                        />
                        <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 text-gray-600 hover:text-black" onClick={() => setIsSearchOpen(true)}>
                            <Icon name="search" size={24} />
                        </button>
                        <button
                            onClick={onCartToggle}
                            className="relative p-2 text-gray-800 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                        >
                            <Icon name="shopping-cart" size={24} />
                            {cartQty > 0 && (
                                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white shadow-lg animate-bounce-short">
                                    {cartQty > 99 ? '99+' : cartQty}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            {isSearchOpen && (
                <div className="md:hidden fixed inset-0 bg-white z-50 p-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            placeholder="Cari produk..."
                            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none focus:border-black"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            autoFocus
                        />
                        <button onClick={() => setIsSearchOpen(false)} className="p-2">
                            <Icon name="x" size={24} />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

// ---- HERO ----
function Hero() {
    const slides = [
        { title: 'Distributor Rokok Grosir Premium', desc: '233+ merek ready stock · Gratis Ongkir 1 Bal', bg: 'assets/logo/hero-bg.jpg' },
        { title: 'Bayar Setelah Resi', desc: 'Transaksi aman dengan sistem escrow untuk 500+ mitra toko.', bg: 'assets/logo/hero-bg.jpg' },
    ];
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section className="relative bg-black text-white overflow-hidden rounded-b-[3rem] mx-2 sm:mx-4 mt-2">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-black z-0"></div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 sm:py-24 lg:flex lg:items-center lg:justify-between">
                <div className="lg:w-1/2">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-xs font-semibold tracking-wider text-gray-300 uppercase mb-4">
                        {slides[current].title}
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                        Rokok Grosir <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">
                            Harga Pabrik
                        </span>
                    </h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-md font-light leading-relaxed">
                        {slides[current].desc}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a href="#produk" className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2">
                            Lihat Katalog <Icon name="chevron-right" size={18} />
                        </a>
                        <a href="https://wa.me/6285715905079" target="_blank" rel="noopener" className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                            <Icon name="phone" size={18} /> Tanya Admin
                        </a>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-gray-400">
                        <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>500+ Mitra Toko</span>
                        <span className="flex items-center gap-2"><Icon name="truck" size={18} /> Gratis Ongkir 1 Bal</span>
                        <span className="flex items-center gap-2"><Icon name="shield-check" size={18} /> Bayar Setelah Resi</span>
                    </div>
                </div>
                <div className="mt-12 lg:mt-0 lg:w-1/2 relative flex justify-center">
                    <div className="absolute w-72 h-72 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                    <img
                        src="assets/logo/logo.png"
                        alt="R2 Nusantara"
                        className="relative z-10 w-[200px] rounded-3xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-700 ease-out"
                        style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
                    />
                </div>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, i) => <span key={i} className={`w-2 h-2 rounded-full transition-colors ${i === current ? 'bg-white' : 'bg-white/30'}`} />)}
            </div>
        </section>
    );
}

// ---- FILTER BRAND (Chip) ----
function BrandFilter({ activeBrand, onBrandChange, categories }) {
    return (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map(brand => (
                <button
                    key={brand}
                    onClick={() => onBrandChange(brand)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                        activeBrand === brand
                            ? 'bg-black text-white shadow-md'
                            : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-900'
                    }`}
                >
                    {brand}
                </button>
            ))}
        </div>
    );
}

// ---- PRODUCT CARD (Gaya WooCommerce/Shopify) ----
function ProductCard({ product, onQuickView, onAddToCart, onToggleWishlist, isWishlisted }) {
    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;
    const stockLabel = getStockLabel(product.stock);

    return (
        <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative scroll-reveal hover:border-gray-400">
            {/* Badge */}
            {product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {product.badge}
                </div>
            )}
            {product.discount > 0 && !product.badge && (
                <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                    -{product.discount}%
                </div>
            )}

            {/* Image */}
            <div
                className="aspect-square bg-gray-50 relative overflow-hidden cursor-pointer"
                onClick={() => onQuickView(product)}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    onError={e => e.target.src = 'https://via.placeholder.com/400x400?text=R2'}
                />
                {/* Wishlist button */}
                <button
                    onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
                    className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
                >
                    <span className={`text-lg ${isWishlisted ? 'text-red-500' : 'text-gray-400'}`}>
                        {isWishlisted ? '❤️' : '🤍'}
                    </span>
                </button>
                {/* Quick view overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        Lihat Detail
                    </span>
                </div>
                {/* Stock label */}
                {stockLabel && (
                    <span className={`absolute bottom-3 left-3 ${stockLabel.className}`}>
                        {stockLabel.label}
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-1">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{product.category}</p>
                    <div className="flex items-center gap-0.5 text-yellow-400 text-xs">
                        <Icon name="star" size={12} className="fill-current" />
                        <span className="font-bold text-gray-700 text-xs">{product.rating}</span>
                    </div>
                </div>
                <h3
                    className="text-sm font-semibold text-gray-900 cursor-pointer hover:text-blue-600 transition-colors line-clamp-2 leading-tight"
                    onClick={() => onQuickView(product)}
                >
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{product.tagline}</p>

                <div className="mt-auto pt-3 flex items-end justify-between border-t border-gray-100">
                    <div>
                        {product.discount > 0 && (
                            <p className="text-xs text-gray-400 line-through mb-0.5">{formatRupiah(product.price)}</p>
                        )}
                        <p className="text-base font-extrabold text-gray-900">{formatRupiah(discountedPrice)}</p>
                    </div>
                    <button
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock <= 0}
                        className="bg-black hover:bg-gray-800 text-white p-2.5 rounded-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 text-sm font-medium"
                        aria-label="Tambah ke keranjang"
                    >
                        <Icon name="shopping-cart" size={16} />
                        <span className="hidden sm:inline">Tambah</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ---- PRODUCT GRID (2 kolom mobile, 3 tablet, 4 desktop) ----
function ProductGrid({ products, onProductClick, addToCart }) {
    const { isWishlisted, toggleWishlist } = useWishlist();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const paginated = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    useEffect(() => { setCurrentPage(1); }, [products]);

    if (products.length === 0) {
        return <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100"><Icon name="package" size={48} className="mx-auto text-gray-300 mb-4" /><h3 className="text-xl font-bold text-gray-900 mb-2">Produk Tidak Ditemukan</h3><p className="text-gray-500">Coba ubah kata kunci atau filter.</p></div>;
    }

    return (
        <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mt-6">
                {paginated.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onQuickView={onProductClick}
                        onAddToCart={addToCart}
                        onToggleWishlist={toggleWishlist}
                        isWishlisted={isWishlisted(product.id)}
                    />
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded-full disabled:opacity-30 hover:bg-gray-50 transition">←</button>
                    <span className="px-4 py-2 bg-black text-white rounded-full">{currentPage} / {totalPages}</span>
                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-full disabled:opacity-30 hover:bg-gray-50 transition">→</button>
                </div>
            )}
        </div>
    );
}

// ---- PRODUCT DETAIL (tidak berubah) ----
function ProductDetail({ product, isOpen, onClose, addToCart }) {
    const [qty, setQty] = useState(1);
    useEffect(() => { if (isOpen) setQty(1); }, [isOpen, product]);
    if (!product || !isOpen) return null;

    const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
                    <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" onError={e => e.target.src='https://via.placeholder.com/600x600?text=R2'} />
                    </div>
                    <div className="flex flex-col justify-center">
                        <button onClick={onClose} className="self-end p-2 text-gray-400 hover:text-black transition-colors">
                            <Icon name="x" size={24} />
                        </button>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg border border-yellow-100">
                                <Icon name="star" size={16} className="text-yellow-500" />
                                <span className="font-bold text-yellow-700">{product.rating}</span>
                            </div>
                            <span className="text-gray-500 text-sm">{product.reviews} Ulasan</span>
                        </div>
                        <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

                        <div className="py-4 border-y border-gray-100 mb-6">
                            {product.discount > 0 && <p className="text-gray-400 line-through mb-1">{formatRupiah(product.price)}</p>}
                            <p className="text-3xl font-extrabold text-gray-900">{formatRupiah(discountedPrice)}</p>
                            <p className="text-sm text-gray-500 mt-1">Sudah termasuk PPN. Gratis ongkir.</p>
                        </div>

                        {product.specs && (
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <div className="flex gap-2 p-3 bg-gray-50 rounded-xl">
                                    <Icon name="smartphone" size={20} className="text-gray-400" />
                                    <div><p className="text-xs font-bold text-gray-400 uppercase">Display</p><p className="text-xs font-medium">{product.specs.tar}</p></div>
                                </div>
                                <div className="flex gap-2 p-3 bg-gray-50 rounded-xl">
                                    <Icon name="cpu" size={20} className="text-gray-400" />
                                    <div><p className="text-xs font-bold text-gray-400 uppercase">Nikotin</p><p className="text-xs font-medium">{product.specs.nicotine}</p></div>
                                </div>
                                <div className="flex gap-2 p-3 bg-gray-50 rounded-xl">
                                    <Icon name="camera" size={20} className="text-gray-400" />
                                    <div><p className="text-xs font-bold text-gray-400 uppercase">Batang</p><p className="text-xs font-medium">{product.specs.sticks}</p></div>
                                </div>
                                <div className="flex gap-2 p-3 bg-gray-50 rounded-xl">
                                    <Icon name="battery" size={20} className="text-gray-400" />
                                    <div><p className="text-xs font-bold text-gray-400 uppercase">Kategori</p><p className="text-xs font-medium">{product.category}</p></div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-4">
                            <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 border rounded-full hover:bg-gray-100 transition" disabled={qty <= 1}><Icon name="minus" size={18} /></button>
                            <span className="text-xl font-bold w-8 text-center">{qty}</span>
                            <button onClick={() => setQty(qty + 1)} className="p-2 border rounded-full hover:bg-gray-100 transition"><Icon name="plus" size={18} /></button>
                        </div>
                        <button onClick={() => { addToCart(product, qty); onClose(); }} disabled={product.stock <= 0} className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                            <Icon name="shopping-cart" size={20} /> {product.stock > 0 ? 'Tambah ke Keranjang' : 'Stok Habis'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---- CART DRAWER (tidak berubah) ----
function CartDrawer({ isOpen, onClose, items, onUpdateQty, onRemove, onCheckout, total }) {
    return (
        <>
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Icon name="shopping-cart" size={20} /> Keranjang ({getCartQty(items)})
                    </h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"><Icon name="x" size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
                            <Icon name="shopping-cart" size={48} className="text-gray-200" />
                            <p>Keranjang kosong.</p>
                            <button onClick={onClose} className="mt-4 text-black font-bold border-b-2 border-black pb-1 hover:text-gray-600 transition-colors">Mulai Belanja</button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100">
                                        <img src={item.image || 'https://via.placeholder.com/80x80?text=R2'} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                                        <p className="text-sm text-gray-500 mb-2">{formatRupiah(item.price)}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                                                <button onClick={() => onUpdateQty(item.id, -1)} className="px-3 py-1 text-gray-500 hover:text-black">-</button>
                                                <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                                                <button onClick={() => onUpdateQty(item.id, 1)} className="px-3 py-1 text-gray-500 hover:text-black">+</button>
                                            </div>
                                            <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 font-medium hover:underline">Hapus</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {items.length > 0 && (
                    <div className="p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex justify-between mb-2 text-sm text-gray-600"><span>Subtotal</span><span>{formatRupiah(total)}</span></div>
                        <div className="flex justify-between mb-4 text-sm text-gray-600"><span>Pengiriman</span><span className="text-green-600 font-medium">Gratis</span></div>
                        <div className="flex justify-between mb-4 text-lg font-bold text-gray-900"><span>Total</span><span>{formatRupiah(total)}</span></div>
                        <button onClick={onCheckout} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg flex justify-between items-center px-6">
                            <span>Checkout</span> <Icon name="chevron-right" size={20} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

// ---- CHECKOUT (tidak berubah) ----
function CheckoutModal({ isOpen, onClose, onSubmit, cart, total }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', province: '' });
    const [errors, setErrors] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => { if (isOpen) setStep(1); }, [isOpen]);

    const validate = () => {
        const errs = {};
        if (!form.name.trim() || form.name.trim().length < 2) errs.name = 'Nama minimal 2 karakter';
        if (!form.phone.trim() || !/^[0-9+\s]{8,15}$/.test(form.phone.trim())) errs.phone = 'Nomor HP tidak valid';
        if (!form.address.trim() || form.address.trim().length < 10) errs.address = 'Alamat minimal 10 karakter';
        if (!form.city.trim()) errs.city = 'Kota wajib diisi';
        if (!form.province.trim()) errs.province = 'Provinsi wajib diisi';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => { if (validate()) setStep(2); };
    const handlePrev = () => setStep(1);

    const handleSubmit = () => {
        setIsProcessing(true);
        setTimeout(() => {
            onSubmit({ ...form });
            setIsProcessing(false);
            onClose();
        }, 1000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="p-6 lg:p-10">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Checkout</h2>
                        <button onClick={onClose} className="p-2 text-gray-400 hover:text-black"><Icon name="x" size={24} /></button>
                    </div>
                    <div className="flex items-center gap-4 mb-8">
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 1 ? 'bg-black text-white' : 'bg-green-500 text-white'}`}>1</span>
                        <div className={`h-1 flex-1 ${step > 1 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${step === 2 ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>2</span>
                    </div>

                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap / Toko *</label><input type="text" className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Nomor HP *</label><input type="tel" className={`form-input ${errors.phone ? 'error' : ''}`} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></div>
                            </div>
                            <div><label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap *</label><textarea rows="2" className={`form-input ${errors.address ? 'error' : ''}`} value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Kota *</label><input type="text" className={`form-input ${errors.city ? 'error' : ''}`} value={form.city} onChange={e => setForm({...form, city: e.target.value})} /></div>
                                <div><label className="block text-sm font-medium text-gray-700 mb-1">Provinsi *</label><input type="text" className={`form-input ${errors.province ? 'error' : ''}`} value={form.province} onChange={e => setForm({...form, province: e.target.value})} /></div>
                            </div>
                            {Object.keys(errors).length > 0 && <p className="text-sm text-red-500">⚠️ Mohon lengkapi data yang diperlukan.</p>}
                            <button onClick={handleNext} className="w-full bg-black text-white py-4 rounded-xl font-bold hover:bg-gray-800 transition-colors mt-4">Lanjut ke Pembayaran</button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                                <h3 className="font-bold text-gray-900">Ringkasan Pesanan</h3>
                                {cart.map(item => (
                                    <div key={item.id} className="flex justify-between text-sm"><span>{item.name} x{item.qty}</span><span>{formatRupiah(item.price * item.qty)}</span></div>
                                ))}
                                <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg"><span>Total</span><span>{formatRupiah(total)}</span></div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={handlePrev} className="flex-1 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">Kembali</button>
                                <button onClick={handleSubmit} disabled={isProcessing} className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition disabled:opacity-60 flex items-center justify-center gap-2">
                                    {isProcessing ? 'Memproses...' : <><Icon name="check-circle" size={20} /> Kirim Pesanan</>}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// ---- SUCCESS (tidak berubah) ----
function SuccessScreen({ isOpen, onClose }) {
    if (!isOpen) return null;
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 5000);
        return () => clearTimeout(timer);
    }, [isOpen, onClose]);
    return (
        <div className="fixed inset-0 z-[65] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }} onClick={onClose}>
            <div className="bg-white rounded-3xl max-w-md w-full p-10 text-center animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="w-20 h-20 mx-auto bg-green-100 text-green-500 rounded-full flex items-center justify-center">
                    <Icon name="check-circle" size={48} />
                </div>
                <h2 className="text-2xl font-extrabold mt-6">Pesanan Terkirim!</h2>
                <p className="text-gray-500 mt-2">Detail pesanan sudah diteruskan ke Admin via WhatsApp. Mohon tunggu konfirmasi.</p>
                <button onClick={onClose} className="mt-6 py-2.5 px-8 border border-black rounded-full font-medium hover:bg-black hover:text-white transition-colors">Tutup</button>
            </div>
        </div>
    );
}

// ---- FOOTER (tidak berubah) ----
function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    <div className="md:col-span-1">
                        <span className="font-extrabold text-2xl tracking-tight text-gray-900 flex items-center gap-2 mb-4">
                            <Icon name="smartphone" size={24} className="text-black" /> R2<span className="text-gray-400">Nusantara</span>
                        </span>
                        <p className="text-gray-500 text-sm leading-relaxed">Distributor rokok grosir resmi berbasis di Malang, Jawa Timur.</p>
                    </div>
                    <div><h4 className="font-bold text-gray-900 mb-4">Katalog</h4><ul className="space-y-2 text-sm text-gray-500"><li><a href="#" className="hover:text-black transition-colors">R2 Series</a></li><li><a href="#" className="hover:text-black transition-colors">Resmi Pajak</a></li><li><a href="#" className="hover:text-black transition-colors">Premium</a></li></ul></div>
                    <div><h4 className="font-bold text-gray-900 mb-4">Layanan</h4><ul className="space-y-2 text-sm text-gray-500"><li><a href="#" className="hover:text-black transition-colors">Status Pesanan</a></li><li><a href="#" className="hover:text-black transition-colors">Kebijakan Garansi</a></li><li><a href="#" className="hover:text-black transition-colors">Hubungi Kami</a></li></ul></div>
                    <div><h4 className="font-bold text-gray-900 mb-4">Kontak</h4><ul className="space-y-2 text-sm text-gray-500"><li>📞 +62 857-1590-5079</li><li>📞 +62 831-6938-6894</li><li>📍 Malang, Jawa Timur</li></ul></div>
                </div>
                <div className="border-t border-gray-100 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-400">© {new Date().getFullYear()} R2 Nusantara. All rights reserved.</p>
                    <div className="flex gap-4"><Icon name="credit-card" size={24} className="text-gray-300" /><Icon name="shield-check" size={24} className="text-gray-300" /></div>
                </div>
            </div>
        </footer>
    );
}

// ---- MOBILE BOTTOM NAV (tidak berubah) ----
function MobileBottomNav({ cartQty, onCartToggle, onWishlistToggle }) {
    return (
        <nav className="mobile-bottom-nav">
            <a href="#" className="mb-nav-item"><Icon name="home" size={20} /><span>Beranda</span></a>
            <a href="#produk" className="mb-nav-item"><Icon name="package" size={20} /><span>Katalog</span></a>
            <button onClick={onCartToggle} className="mb-nav-item relative">
                <Icon name="shopping-cart" size={20} />
                {cartQty > 0 && <span className="mb-nav-badge">{cartQty > 99 ? '99+' : cartQty}</span>}
                <span>Keranjang</span>
            </button>
            <button onClick={onWishlistToggle} className="mb-nav-item"><Icon name="heart-outline" size={20} /><span>Favorit</span></button>
            <a href="https://wa.me/6285715905079" target="_blank" rel="noopener" className="mb-nav-item"><Icon name="phone" size={20} /><span>WhatsApp</span></a>
        </nav>
    );
}

// ---- WISHLIST DRAWER (tidak berubah) ----
function WishlistDrawer({ isOpen, onClose, wishlist, products, onProductClick, addToCart }) {
    const wishlistProducts = products.filter(p => wishlist.includes(p.id));
    return (
        <>
            <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose}></div>
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/80 backdrop-blur-md">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2"><Icon name="heart" size={20} /> Favorit ({wishlist.length})</h2>
                    <button onClick={onClose} className="p-2 text-gray-400 hover:text-black hover:bg-gray-100 rounded-full transition-colors"><Icon name="x" size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                    {wishlistProducts.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 gap-4">
                            <Icon name="heart" size={48} className="text-gray-200" />
                            <p>Belum ada favorit.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {wishlistProducts.map(p => (
                                <div key={p.id} className="flex gap-4 items-center">
                                    <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded-xl border border-gray-100" />
                                    <div className="flex-1"><p className="font-bold text-sm">{p.name}</p><p className="text-sm font-bold">{formatRupiah(p.price)}</p></div>
                                    <button onClick={() => addToCart(p)} className="bg-black text-white p-2 rounded-full"><Icon name="shopping-cart" size={16} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// ============================================================
// ===== APP =====
// ============================================================
function App() {
    const { cart, addToCart, updateQty, removeFromCart, clearCart, cartTotal, cartQty } = useCart();
    const { wishlist, toggleWishlist, isWishlisted } = useWishlist();

    const [category, setCategory] = useState('R2');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [detailOpen, setDetailOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);
    const [activeBrand, setActiveBrand] = useState('Semua');

    const categories = useMemo(() => {
        const all = window.PRODUCTS || [];
        const unique = ['Semua', ...new Set(all.map(p => p.category))];
        return unique;
    }, []);

    const filteredProducts = useMemo(() => {
        let all = window.PRODUCTS || [];
        let filtered = all;
        if (activeBrand !== 'Semua') {
            filtered = filtered.filter(p => p.category === activeBrand);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || (p.tagline && p.tagline.toLowerCase().includes(q)));
        }
        return filtered;
    }, [activeBrand, searchQuery]);

    useEffect(() => {
        setTimeout(initScrollReveal, 300);
    }, [activeBrand, searchQuery, filteredProducts]);

    const toggleCart = () => {
        setCartOpen(!cartOpen);
        document.body.style.overflow = cartOpen ? '' : 'hidden';
    };
    const closeCart = () => { setCartOpen(false); document.body.style.overflow = ''; };

    const openCheckout = () => {
        if (cart.length === 0) { showToast('Keranjang kosong', 'error'); return; }
        setCheckoutOpen(true);
        document.body.style.overflow = 'hidden';
    };
    const closeCheckout = () => { setCheckoutOpen(false); document.body.style.overflow = ''; };

    const openSuccess = () => { setCheckoutOpen(false); setSuccessOpen(true); };
    const closeSuccess = () => { setSuccessOpen(false); document.body.style.overflow = ''; clearCart(); };

    const openDetail = (product) => { setSelectedProduct(product); setDetailOpen(true); document.body.style.overflow = 'hidden'; };
    const closeDetail = () => { setDetailOpen(false); document.body.style.overflow = ''; setTimeout(() => setSelectedProduct(null), 300); };

    const toggleWishlistDrawer = () => { setWishlistOpen(!wishlistOpen); document.body.style.overflow = wishlistOpen ? '' : 'hidden'; };

    const handleCheckoutSubmit = (data) => {
        const total = cartTotal;
        const items = cart.map(i => `• ${i.name} x${i.qty} — ${formatRupiah(i.price * i.qty)}`).join('\n');
        const msg = `*🛒 PESANAN BARU*\n\nNama: ${data.name}\nAlamat: ${data.address}\nKota: ${data.city}\nProvinsi: ${data.province}\n\n*Item:*\n${items}\n\nTotal: ${formatRupiah(total)}\n\nMohon konfirmasi ketersediaan. Terima kasih.`;
        const url = `https://wa.me/6285715905079?text=${encodeURIComponent(msg)}`;
        window.open(url, '_blank');
        openSuccess();
    };

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-gray-200">
            <style dangerouslySetInnerHTML={{__html: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                body { font-family: 'Inter', sans-serif; -webkit-font-smoothing: antialiased; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes scaleIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                @keyframes bounceShort { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-25%); } }
                .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                .animate-bounce-short { animation: bounceShort 0.5s ease-in-out; }
            `}} />

            <Header
                cartQty={cartQty}
                onCartToggle={toggleCart}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onCategoryChange={setCategory}
                activeCategory={category}
            />

            <main className="flex-grow">
                <Hero />
                <section id="produk" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Features Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 border-b border-gray-100 pb-12">
                        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="text-gray-900 bg-gray-100 p-3 rounded-full"><Icon name="shield-check" size={28} /></div>
                            <div><h4 className="font-bold text-gray-900">Garansi Resmi</h4><p className="text-sm text-gray-500">Produk 100% original</p></div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="text-gray-900 bg-gray-100 p-3 rounded-full"><Icon name="truck" size={28} /></div>
                            <div><h4 className="font-bold text-gray-900">Gratis Ongkir</h4><p className="text-sm text-gray-500">Minimal 1 bal seluruh Indonesia</p></div>
                        </div>
                        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="text-gray-900 bg-gray-100 p-3 rounded-full"><Icon name="credit-card" size={28} /></div>
                            <div><h4 className="font-bold text-gray-900">Bayar Setelah Resi</h4><p className="text-sm text-gray-500">Transaksi aman & terpercaya</p></div>
                        </div>
                    </div>

                    {/* Filter & Grid */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Koleksi Rokok</h2>
                        <BrandFilter activeBrand={activeBrand} onBrandChange={setActiveBrand} categories={categories} />
                    </div>

                    <ProductGrid
                        products={filteredProducts}
                        onProductClick={openDetail}
                        addToCart={addToCart}
                    />
                </section>
                <Footer />
            </main>

            <CartDrawer
                isOpen={cartOpen}
                onClose={closeCart}
                items={cart}
                onUpdateQty={updateQty}
                onRemove={removeFromCart}
                onCheckout={openCheckout}
                total={cartTotal}
            />
            <WishlistDrawer
                isOpen={wishlistOpen}
                onClose={toggleWishlistDrawer}
                wishlist={wishlist}
                products={window.PRODUCTS || []}
                onProductClick={openDetail}
                addToCart={addToCart}
            />
            {selectedProduct && (
                <ProductDetail
                    product={selectedProduct}
                    isOpen={detailOpen}
                    onClose={closeDetail}
                    addToCart={addToCart}
                />
            )}
            <CheckoutModal
                isOpen={checkoutOpen}
                onClose={closeCheckout}
                onSubmit={handleCheckoutSubmit}
                cart={cart}
                total={cartTotal}
            />
            <SuccessScreen isOpen={successOpen} onClose={closeSuccess} />
            <MobileBottomNav
                cartQty={cartQty}
                onCartToggle={toggleCart}
                onWishlistToggle={toggleWishlistDrawer}
            />
        </div>
    );
}

// ============================================================
// ===== RENDER =====
// ============================================================
const root = document.getElementById('root');
if (root) {
    try {
        ReactDOM.createRoot(root).render(
            <CartProvider>
                <WishlistProvider>
                    <App />
                </WishlistProvider>
            </CartProvider>
        );
        console.log('✅ App rendered successfully (WooCommerce/Shopify Design)');
    } catch (err) {
        console.error('❌ Render error:', err);
        root.innerHTML = `<div class="p-8 text-center text-red-600 font-bold">Error: ${err.message}</div>`;
    }
} else {
    console.error('❌ Root element not found');
}