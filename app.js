// ============================================
// CIGARETTE TOBACCO SHOP v5.0
// Complete Application with Thumbnail Generator
// ============================================

// ============================================
// PROFESSIONAL THUMBNAIL GENERATOR SYSTEM
// ============================================

const BRAND_GRADIENTS = {
    'Marlboro': { from: '#DC2626', to: '#991B1B', accent: '#FCA5A5', icon: 'fa-fire' },
    'Djarum': { from: '#1E3A8A', to: '#1E40AF', accent: '#93C5FD', icon: 'fa-star' },
    'Gudang Garam': { from: '#B91C1C', to: '#7F1D1D', accent: '#FCA5A5', icon: 'fa-crown' },
    'Sampoerna': { from: '#059669', to: '#047857', accent: '#6EE7B7', icon: 'fa-leaf' },
    'Bentoel': { from: '#7C3AED', to: '#6D28D9', accent: '#C4B5FD', icon: 'fa-gem' },
    'Wismilak': { from: '#EA580C', to: '#C2410C', accent: '#FDBA74', icon: 'fa-bolt' },
    'L.A.': { from: '#0891B2', to: '#0E7490', accent: '#67E8F9', icon: 'fa-snowflake' },
    'Star': { from: '#EAB308', to: '#CA8A04', accent: '#FDE047', icon: 'fa-star' },
    'Dji Sam Soe': { from: '#B45309', to: '#92400E', accent: '#FCD34D', icon: 'fa-mug-hot' },
    'Magna': { from: '#4F46E5', to: '#4338CA', accent: '#A5B4FC', icon: 'fa-shield-alt' },
    'Default': { from: '#0F3D6E', to: '#0A2A50', accent: '#60A5FA', icon: 'fa-box' }
};

const CATEGORY_ICONS = {
    'R2': 'fa-box-open',
    'Resmi': 'fa-certificate',
    'Premium': 'fa-gem',
    'Default': 'fa-box'
};

function generateProductThumbnail(product) {
    const brand = product.brand || 'Default';
    const category = product.category || 'Default';
    const brandColors = BRAND_GRADIENTS[brand] || BRAND_GRADIENTS['Default'];
    const categoryDisplay = category.toUpperCase();
    const brandDisplay = brand.length > 12 ? brand.substring(0, 12) + '...' : brand;
    
    const patternSeed = brand.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const circle1X = 20 + (patternSeed % 30);
    const circle1Y = 30 + ((patternSeed * 3) % 40);
    const circle2X = 60 + ((patternSeed * 7) % 30);
    const circle2Y = 50 + ((patternSeed * 11) % 40);
    
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
            <defs>
                <linearGradient id="bg-${brand}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:${brandColors.from};stop-opacity:1" />
                    <stop offset="100%" style="stop-color:${brandColors.to};stop-opacity:1" />
                </linearGradient>
                <linearGradient id="shine-${brand}" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:white;stop-opacity:0.3" />
                    <stop offset="50%" style="stop-color:white;stop-opacity:0.1" />
                    <stop offset="100%" style="stop-color:white;stop-opacity:0" />
                </linearGradient>
                <filter id="noise-${brand}">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
                    <feColorMatrix type="saturate" values="0"/>
                </filter>
                <filter id="shadow-${brand}" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                    <feOffset dx="0" dy="4" result="offsetblur"/>
                    <feComponentTransfer><feFuncA type="linear" slope="0.3"/></feComponentTransfer>
                    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
            </defs>
            <rect width="200" height="200" fill="url(#bg-${brand})"/>
            <circle cx="${circle1X}" cy="${circle1Y}" r="60" fill="${brandColors.accent}" opacity="0.15"/>
            <circle cx="${circle2X}" cy="${circle2Y}" r="50" fill="white" opacity="0.1"/>
            <circle cx="150" cy="50" r="40" fill="${brandColors.accent}" opacity="0.2"/>
            <rect width="200" height="200" filter="url(#noise-${brand})" opacity="0.08"/>
            <polygon points="0,0 100,0 0,100" fill="url(#shine-${brand})" opacity="0.5"/>
            <rect x="130" y="12" width="60" height="24" rx="12" fill="white" opacity="0.95"/>
            <text x="160" y="28" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="${brandColors.from}" text-anchor="middle">${categoryDisplay}</text>
            <g transform="translate(100, 85)" filter="url(#shadow-${brand})">
                <circle cx="0" cy="0" r="35" fill="white" opacity="0.95"/>
                <text x="0" y="8" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${brandColors.from}" text-anchor="middle">${brandDisplay.charAt(0)}</text>
            </g>
            <rect x="20" y="140" width="160" height="40" rx="8" fill="white" opacity="0.95"/>
            <text x="100" y="158" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="${brandColors.from}" text-anchor="middle">${brandDisplay}</text>
            <text x="100" y="172" font-family="Arial, sans-serif" font-size="9" fill="#64748B" text-anchor="middle">PREMIUM QUALITY</text>
            <circle cx="30" cy="30" r="3" fill="white" opacity="0.4"/>
            <circle cx="40" cy="25" r="2" fill="white" opacity="0.3"/>
            <circle cx="170" cy="170" r="3" fill="white" opacity="0.4"/>
            <circle cx="160" cy="175" r="2" fill="white" opacity="0.3"/>
        </svg>
    `;
    
    return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

function getProductImage(product) {
    if (product.image && product.image.startsWith('assets/')) {
        return product.image;
    }
    return generateProductThumbnail(product);
}

function preloadThumbnails(products) {
    products.slice(0, 12).forEach(product => {
        const img = new Image();
        img.src = getProductImage(product);
    });
}

// ============================================
// GLOBAL STATE
// ============================================

let cart = [];
let wishlist = [];
let recentlyViewed = [];
let currentPage = 1;
const itemsPerPage = 12;
let currentFilter = { category: '', search: '', sort: 'name' };
let testimonialState = { currentIndex: 0, autoPlayInterval: null };

const defaultTestimonials = [
    { name: 'Budi Santoso', location: 'Surabaya, Jawa Timur', rating: 5, text: 'Pelayanan sangat profesional dan responsif. Barang original semua, packing rapi dan aman. Pengiriman cepat ke Surabaya, hanya 2 hari sudah sampai. Recommended seller!' },
    { name: 'Ahmad Fauzi', location: 'Malang, Jawa Timur', rating: 5, text: 'Sudah langganan 2 tahun lebih, tidak pernah kecewa. Harga grosir terbaik di Malang, stok lengkap, dan yang paling penting selalu original. Terima kasih!' },
    { name: 'Dedi Kurniawan', location: 'Jakarta Pusat', rating: 5, text: 'Stok sangat lengkap, lebih dari 200 merek tersedia. Admin sangat membantu dan ramah. Sistem bayar setelah resi keluar bikin tenang. Highly recommended!' },
    { name: 'Rudi Setiawan', location: 'Bandung, Jawa Barat', rating: 5, text: 'Website-nya user friendly, mudah cari produk yang diinginkan. Fitur wishlist dan cart sangat membantu. Proses checkout via WhatsApp cepat dan mudah.' },
    { name: 'Wawan Hermawan', location: 'Semarang, Jawa Tengah', rating: 5, text: 'Gratis ongkir untuk minimal 1 bal sangat membantu. Packaging aman, tidak ada yang penyok. Harga kompetitif, kualitas terjamin. Pasti order lagi!' },
    { name: 'Eko Prasetyo', location: 'Yogyakarta', rating: 5, text: 'Sebagai reseller, saya sangat puas dengan layanan ini. Konsisten, reliable, dan harganya selalu kompetitif. Partner bisnis yang tepat!' }
];

function loadTestimonials() {
    const saved = localStorage.getItem('userReviews');
    const userReviews = saved ? JSON.parse(saved) : [];
    return [...defaultTestimonials, ...userReviews];
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen')?.classList.add('hidden');
    }, 1200);
    
    loadFromStorage();
    initHeader();
    initSearch();
    initFilters();
    renderProductGrid();
    renderEditorsPick();
    updateCartUI();
    updateWishlistUI();
    initFAQ();
    initBackToTop();
    initNewsletter();
    initCookieBanner();
    initMobileNav();
    initTestimonialSlider();
    initReviewForm();
    checkDeepLink();
    preloadThumbnails(products);
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').catch(console.error);
    }
});

// ============================================
// HEADER
// ============================================

function initHeader() {
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
        header?.classList.toggle('scrolled', window.scrollY > 80);
    });
    document.getElementById('cartBtn')?.addEventListener('click', openCart);
    document.getElementById('wishlistBtn')?.addEventListener('click', openWishlist);
}

// ============================================
// SEARCH
// ============================================

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    searchInput?.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 2) { searchResults?.classList.add('hidden'); return; }
        
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query) ||
            p.brand?.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (filtered.length > 0 && searchResults) {
            searchResults.innerHTML = filtered.map(product => {
                const productImage = getProductImage(product);
                return `
                    <div class="search-result-item" onclick="selectSearchResult('${product.id}')">
                        <div class="flex items-center gap-3">
                            <img src="${productImage}" alt="${product.name}" class="w-10 h-10 object-cover rounded-lg">
                            <div class="flex-1 min-w-0">
                                <p class="font-semibold text-primary text-xs truncate">${product.name}</p>
                                <p class="text-[10px] text-secondary">${product.category}</p>
                            </div>
                            <span class="text-gold font-bold text-xs font-mono">Rp ${formatPrice(getWholesalePrice(product))}</span>
                        </div>
                    </div>
                `;
            }).join('');
            searchResults.classList.remove('hidden');
        } else {
            searchResults?.classList.add('hidden');
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#searchInput') && !e.target.closest('#searchResults')) {
            searchResults?.classList.add('hidden');
        }
    });
}

function selectSearchResult(productId) {
    openQuickView(productId);
    document.getElementById('searchResults')?.classList.add('hidden');
    document.getElementById('searchInput').value = '';
}

// ============================================
// FILTERS
// ============================================

function initFilters() {
    document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
        currentFilter.category = e.target.value;
        currentPage = 1;
        renderProductGrid();
    });
    document.getElementById('sortFilter')?.addEventListener('change', (e) => {
        currentFilter.sort = e.target.value;
        renderProductGrid();
    });
}

function filterByCategory(category) {
    document.getElementById('categoryFilter').value = category;
    currentFilter.category = category;
    currentPage = 1;
    renderProductGrid();
    document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
}

function resetFilters() {
    currentFilter = { category: '', search: '', sort: 'name' };
    currentPage = 1;
    document.getElementById('categoryFilter').value = '';
    document.getElementById('sortFilter').value = 'name';
    document.getElementById('searchInput').value = '';
    renderProductGrid();
}

// ============================================
// PRODUCT GRID
// ============================================

function renderProductGrid() {
    const grid = document.getElementById('productGrid');
    const noResults = document.getElementById('noResults');
    const pagination = document.getElementById('pagination');
    
    let filtered = [...products];
    if (currentFilter.category) filtered = filtered.filter(p => p.category === currentFilter.category);
    if (currentFilter.search) filtered = filtered.filter(p => p.name.toLowerCase().includes(currentFilter.search.toLowerCase()));
    
    switch (currentFilter.sort) {
        case 'price-asc': filtered.sort((a, b) => getWholesalePrice(a) - getWholesalePrice(b)); break;
        case 'price-desc': filtered.sort((a, b) => getWholesalePrice(b) - getWholesalePrice(a)); break;
        default: filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(start, start + itemsPerPage);
    
    if (paginated.length === 0) {
        grid.innerHTML = '';
        grid.classList.add('hidden');
        noResults?.classList.remove('hidden');
        pagination.innerHTML = '';
        return;
    }
    
    noResults?.classList.add('hidden');
    grid.classList.remove('hidden');
    grid.innerHTML = paginated.map(product => buildProductCardHTML(product)).join('');
    
    if (totalPages > 1) {
        let paginationHTML = '';
        if (currentPage > 1) paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage - 1})"><i class="fas fa-chevron-left"></i></button>`;
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
                paginationHTML += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
            } else if (i === currentPage - 2 || i === currentPage + 2) {
                paginationHTML += `<span class="px-2 text-secondary text-xs">...</span>`;
            }
        }
        if (currentPage < totalPages) paginationHTML += `<button class="pagination-btn" onclick="changePage(${currentPage + 1})"><i class="fas fa-chevron-right"></i></button>`;
        pagination.innerHTML = paginationHTML;
    } else {
        pagination.innerHTML = '';
    }
}

function changePage(page) {
    currentPage = page;
    renderProductGrid();
    document.getElementById('katalog').scrollIntoView({ behavior: 'smooth' });
}

function buildProductCardHTML(product) {
    const wholesalePrice = getWholesalePrice(product);
    const retailPrice = getRetailPrice(product);
    const discount = Math.round(((retailPrice - wholesalePrice) / retailPrice) * 100);
    const badge = getProductBadge(product);
    const rating = getProductRating(product);
    const inWishlist = wishlist.includes(product.id);
    const productImage = getProductImage(product);
    
    return `
        <div class="mp-card" data-product-id="${product.id}">
            <div class="mp-card-image">
                ${badge}
                <button class="mp-card-wishlist ${inWishlist ? 'active' : ''}" onclick="toggleWishlist('${product.id}', event)">
                    <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <img src="${productImage}" alt="${product.name}" loading="lazy" class="mp-card-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCBmaWxsPSIjZjNmNGY2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIvPjwvc3ZnPg=='">
            </div>
            <div class="mp-card-content">
                <div class="mp-card-category">${product.category}</div>
                <h3 class="mp-card-title">${product.name}</h3>
                <div class="mp-card-rating">
                    ${buildStarRating(rating)}
                    <span>(${rating})</span>
                </div>
                <div class="mp-card-price">
                    <div class="mp-card-price-retail">Rp ${formatPrice(retailPrice)}</div>
                    <div class="mp-card-price-wholesale">
                        Rp ${formatPrice(wholesalePrice)}
                        <span class="mp-card-price-badge">-${discount}%</span>
                    </div>
                </div>
                <div class="mp-card-actions">
                    <button class="mp-card-add-to-cart" onclick="addToCart('${product.id}')">
                        <i class="fas fa-plus"></i> Keranjang
                    </button>
                    <button class="mp-card-quick-view" onclick="openQuickView('${product.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function buildStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let html = '';
    for (let i = 0; i < fullStars; i++) html += '<i class="fas fa-star"></i>';
    if (hasHalfStar) html += '<i class="fas fa-star-half-alt"></i>';
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) html += '<i class="far fa-star"></i>';
    return html;
}

function getProductBadge(product) {
    if (product.badge === 'hot') return '<span class="mp-card-badge hot"><i class="fas fa-fire"></i> Terlaris</span>';
    if (product.badge === 'vip') return '<span class="mp-card-badge vip"><i class="fas fa-crown"></i> VIP</span>';
    if (product.badge === 'new') return '<span class="mp-card-badge new"><i class="fas fa-bolt"></i> Baru</span>';
    return '';
}

function getProductRating(product) { return product.rating || (Math.random() * 1.5 + 3.5).toFixed(1); }
function getWholesalePrice(product) { return product.price?.wholesale || 0; }
function getRetailPrice(product) { return product.price?.retail || Math.round(getWholesalePrice(product) * 1.15); }

// ============================================
// EDITORS PICK
// ============================================

function renderEditorsPick() {
    const container = document.getElementById('editorsPick');
    const featured = products.filter(p => p.isFeatured).slice(0, 3);
    container.innerHTML = featured.map(product => {
        const productImage = getProductImage(product);
        return `
            <div class="mp-card cursor-pointer" onclick="openQuickView('${product.id}')">
                <div class="mp-card-image">
                    <img src="${productImage}" alt="${product.name}" loading="lazy" class="mp-card-img" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCBmaWxsPSIjZjNmNGY2IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIvPjwvc3ZnPg=='">
                </div>
                <div class="mp-card-content">
                    <h3 class="font-semibold text-primary mb-1 text-sm">${product.name}</h3>
                    <p class="text-gold font-bold font-mono text-sm">Rp ${formatPrice(getWholesalePrice(product))}</p>
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// QUICK VIEW
// ============================================

function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    trackRecentlyViewed(productId);
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    const wholesalePrice = getWholesalePrice(product);
    const retailPrice = getRetailPrice(product);
    const discount = Math.round(((retailPrice - wholesalePrice) / retailPrice) * 100);
    const inWishlist = wishlist.includes(product.id);
    const productImage = getProductImage(product);
    
    content.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            <div class="aspect-square rounded-xl overflow-hidden bg-surface relative group">
                <img src="${productImage}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCBmaWxsPSIjZjNmNGY2IiB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIvPjwvc3ZnPg=='">
                <div class="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-search-plus text-primary text-sm"></i>
                </div>
            </div>
            <div>
                <div class="flex items-start justify-between mb-3">
                    <div>
                        <span class="text-xs text-secondary uppercase font-semibold">${product.category}</span>
                        <h2 class="text-xl font-display text-primary mt-0.5">${product.name}</h2>
                    </div>
                    <button class="w-9 h-9 rounded-lg ${inWishlist ? 'bg-gold text-white' : 'bg-surface text-primary'} hover:scale-110 transition-transform" onclick="toggleWishlist('${product.id}')">
                        <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                </div>
                <div class="flex items-center gap-2 mb-3">
                    ${buildStarRating(getProductRating(product))}
                    <span class="text-secondary text-xs">(${getProductRating(product)})</span>
                </div>
                <div class="mb-4">
                    <p class="text-secondary line-through text-xs mb-1 font-mono">Rp ${formatPrice(retailPrice)}</p>
                    <div class="flex items-center gap-2">
                        <span class="text-2xl font-bold text-primary font-mono">Rp ${formatPrice(wholesalePrice)}</span>
                        <span class="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">-${discount}%</span>
                    </div>
                </div>
                <p class="text-secondary text-xs mb-4 leading-relaxed">${product.description || 'Produk original dari distributor resmi. Kualitas terjamin 100%.'}</p>
                <div class="flex gap-2">
                    <button onclick="addToCart('${product.id}'); closeQuickView();" class="flex-1 py-2.5 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-lg transition-all shadow-md text-sm">
                        <i class="fas fa-shopping-cart mr-1"></i>Tambah
                    </button>
                    <button onclick="shareProduct('${product.id}')" class="px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all">
                        <i class="fab fa-whatsapp"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    const url = new URL(window.location);
    url.searchParams.set('p', productId);
    window.history.pushState({}, '', url);
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
    const url = new URL(window.location);
    url.searchParams.delete('p');
    window.history.pushState({}, '', url);
}

function shareProduct(productId) {
    const product = products.find(p => p.id === productId);
    const url = `${window.location.origin}${window.location.pathname}?p=${productId}`;
    const message = `Check out ${product.name} - Rp ${formatPrice(getWholesalePrice(product))}! ${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
}

function checkDeepLink() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('p');
    if (productId) setTimeout(() => openQuickView(productId), 900);
}

// ============================================
// CART
// ============================================

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) existingItem.quantity += quantity;
    else cart.push({ id: productId, name: product.name, price: getWholesalePrice(product), image: getProductImage(product), quantity });
    saveToStorage();
    updateCartUI();
    showToast(`${product.name} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveToStorage();
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveToStorage();
        updateCartUI();
    }
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = ['cartBadge', 'mobileCartBadge', 'mobileBottomCartBadge'];
    badges.forEach(id => {
        const badge = document.getElementById(id);
        if (badge) {
            if (totalItems > 0) { badge.classList.remove('hidden'); badge.textContent = totalItems; }
            else badge.classList.add('hidden');
        }
    });
}

function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const content = document.getElementById('cartContent');
    const itemsContainer = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        itemsContainer.innerHTML = `
            <div class="text-center py-10">
                <i class="fas fa-shopping-cart text-5xl text-muted/30 mb-3"></i>
                <p class="text-secondary text-sm">Keranjang Anda kosong</p>
                <button onclick="closeCart(); document.getElementById('katalog').scrollIntoView({behavior: 'smooth'})" class="mt-3 px-5 py-2 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-lg text-sm">Belanja Sekarang</button>
            </div>
        `;
    } else {
        itemsContainer.innerHTML = cart.map(item => `
            <div class="flex gap-3 mb-3 p-3 bg-surface rounded-lg">
                <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3QgZmlsbD0iI2YzZjRmNiIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0Ii8+PC9zdmc+'">
                <div class="flex-1">
                    <h4 class="font-semibold text-primary text-sm mb-1">${item.name}</h4>
                    <p class="text-gold font-bold font-mono text-sm mb-2">Rp ${formatPrice(item.price)}</p>
                    <div class="flex items-center gap-2">
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity - 1})" class="w-7 h-7 rounded-md bg-white border border-border hover:bg-gray-100 flex items-center justify-center"><i class="fas fa-minus text-[10px]"></i></button>
                        <span class="font-semibold text-primary text-sm w-6 text-center">${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', ${item.quantity + 1})" class="w-7 h-7 rounded-md bg-white border border-border hover:bg-gray-100 flex items-center justify-center"><i class="fas fa-plus text-[10px]"></i></button>
                        <button onclick="removeFromCart('${item.id}')" class="ml-auto text-red-500 hover:text-red-600"><i class="fas fa-trash text-xs"></i></button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `Rp ${formatPrice(total)}`;
    sidebar.classList.remove('hidden');
    setTimeout(() => content.classList.remove('translate-x-full'), 10);
}

function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const content = document.getElementById('cartContent');
    content.classList.add('translate-x-full');
    setTimeout(() => sidebar.classList.add('hidden'), 300);
}

// ============================================
// WISHLIST
// ============================================

function toggleWishlist(productId, event) {
    if (event) event.stopPropagation();
    const index = wishlist.indexOf(productId);
    const product = products.find(p => p.id === productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast(`${product.name} dihapus dari wishlist`, 'success');
    } else {
        wishlist.push(productId);
        showToast(`${product.name} ditambahkan ke wishlist`, 'success');
    }
    saveToStorage();
    updateWishlistUI();
    renderProductGrid();
}

function updateWishlistUI() {
    const badges = ['wishlistBadge', 'mobileWishlistBadge', 'mobileBottomWishlistBadge'];
    badges.forEach(id => {
        const badge = document.getElementById(id);
        if (badge) {
            if (wishlist.length > 0) { badge.classList.remove('hidden'); badge.textContent = wishlist.length; }
            else badge.classList.add('hidden');
        }
    });
}

function openWishlist() {
    const sidebar = document.getElementById('wishlistSidebar');
    const content = document.getElementById('wishlistContent');
    const itemsContainer = document.getElementById('wishlistItems');
    
    if (wishlist.length === 0) {
        itemsContainer.innerHTML = `
            <div class="text-center py-10">
                <i class="far fa-heart text-5xl text-muted/30 mb-3"></i>
                <p class="text-secondary text-sm">Wishlist Anda kosong</p>
                <button onclick="closeWishlist(); document.getElementById('katalog').scrollIntoView({behavior: 'smooth'})" class="mt-3 px-5 py-2 bg-gradient-to-r from-gold to-gold-light text-white font-semibold rounded-lg text-sm">Jelajahi Produk</button>
            </div>
        `;
    } else {
        itemsContainer.innerHTML = wishlist.map(id => {
            const product = products.find(p => p.id === id);
            if (!product) return '';
            return `
                <div class="flex gap-3 mb-3 p-3 bg-surface rounded-lg">
                    <img src="${getProductImage(product)}" alt="${product.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-semibold text-primary text-sm mb-1">${product.name}</h4>
                        <p class="text-gold font-bold font-mono text-sm mb-2">Rp ${formatPrice(getWholesalePrice(product))}</p>
                        <div class="flex gap-2">
                            <button onclick="addToCart('${product.id}'); closeWishlist();" class="flex-1 py-1.5 bg-gradient-to-r from-gold to-gold-light text-white text-xs font-semibold rounded-md"><i class="fas fa-shopping-cart mr-1"></i>Tambah</button>
                            <button onclick="toggleWishlist('${product.id}')" class="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-md"><i class="fas fa-trash text-xs"></i></button>
                        </div>
                    </div>
                </div>
            `;
        }).filter(Boolean).join('');
    }
    
    sidebar.classList.remove('hidden');
    setTimeout(() => content.classList.remove('translate-x-full'), 10);
}

function closeWishlist() {
    const sidebar = document.getElementById('wishlistSidebar');
    const content = document.getElementById('wishlistContent');
    content.classList.add('translate-x-full');
    setTimeout(() => sidebar.classList.add('hidden'), 300);
}

// ============================================
// CHECKOUT
// ============================================

function openCheckout() {
    closeCart();
    const modal = document.getElementById('checkoutModal');
    const content = modal.querySelector('div[class*="transform"]');
    const itemsContainer = document.getElementById('checkoutItems');
    const totalElement = document.getElementById('checkoutTotal');
    
    if (cart.length === 0) { showToast('Keranjang kosong!', 'warning'); return; }
    
    itemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center py-2 border-b border-border">
            <div>
                <p class="font-semibold text-primary text-sm">${item.name}</p>
                <p class="text-xs text-secondary">Qty: ${item.quantity}</p>
            </div>
            <span class="text-gold font-bold font-mono text-sm">Rp ${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalElement.textContent = `Rp ${formatPrice(total)}`;
    
    modal.classList.remove('hidden');
    setTimeout(() => { content.classList.remove('scale-95', 'opacity-0'); content.classList.add('scale-100', 'opacity-100'); }, 10);
}

function closeCheckout() {
    const modal = document.getElementById('checkoutModal');
    const content = modal.querySelector('div[class*="transform"]');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('checkoutName').value;
    const phone = document.getElementById('checkoutPhone').value;
    const address = document.getElementById('checkoutAddress').value;
    const notes = document.getElementById('checkoutNotes').value;
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let message = `*PESANAN BARU - CIGARETTE TOBACCO SHOP*\n\n*Data Pembeli:*\nNama: ${name}\nWhatsApp: ${phone}\nAlamat: ${address}\n\n*Detail Pesanan:*\n`;
    cart.forEach(item => { message += `- ${item.name}\n  Qty: ${item.quantity} x Rp ${formatPrice(item.price)}\n  Subtotal: Rp ${formatPrice(item.price * item.quantity)}\n\n`; });
    message += `*Total: Rp ${formatPrice(total)}*\n\n`;
    if (notes) message += `Catatan: ${notes}\n\n`;
    message += `Terima kasih!`;
    
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(message)}`, '_blank');
    closeCheckout();
    cart = [];
    saveToStorage();
    updateCartUI();
    showToast('Pesanan berhasil dikirim!', 'success');
});

// ============================================
// FAQ
// ============================================

function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        question?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => { i.classList.remove('active'); i.querySelector('.faq-answer').style.maxHeight = '0'; });
            if (!isActive) { item.classList.add('active'); answer.style.maxHeight = answer.scrollHeight + 'px'; }
        });
    });
}

// ============================================
// BACK TO TOP
// ============================================

function initBackToTop() {
    const button = document.getElementById('backToTop');
    window.addEventListener('scroll', () => button?.classList.toggle('visible', window.scrollY > 400));
    button?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ============================================
// NEWSLETTER
// ============================================

function initNewsletter() {
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Terima kasih telah berlangganan!', 'success');
        e.target.reset();
    });
}

// ============================================
// COOKIE BANNER
// ============================================

function initCookieBanner() {
    setTimeout(() => {
        if (!localStorage.getItem('cookiesAccepted')) document.getElementById('cookieBanner')?.classList.remove('hidden');
    }, 1200);
}
function acceptCookies() { localStorage.setItem('cookiesAccepted', 'true'); document.getElementById('cookieBanner')?.classList.add('hidden'); }
function rejectCookies() { localStorage.setItem('cookiesAccepted', 'false'); document.getElementById('cookieBanner')?.classList.add('hidden'); }

// ============================================
// LEGAL MODAL
// ============================================

function openLegalModal(type) {
    const modal = document.getElementById('legalModal');
    const content = document.getElementById('legalContent');
    const contentMap = {
        terms: { title: 'Syarat & Ketentuan', content: '<p class="text-sm text-secondary leading-relaxed">Selamat datang di Cigarette Tobacco Shop. Dengan menggunakan website ini, Anda setuju untuk terikat dengan syarat dan ketentuan yang berlaku.</p>' },
        privacy: { title: 'Kebijakan Privasi', content: '<p class="text-sm text-secondary leading-relaxed">Kami menghormati privasi Anda dan berkomitmen untuk melindungi data pribadi yang Anda berikan.</p>' },
        cookie: { title: 'Kebijakan Cookie', content: '<p class="text-sm text-secondary leading-relaxed">Website ini menggunakan cookie untuk meningkatkan pengalaman browsing Anda.</p>' }
    };
    const data = contentMap[type];
    if (!data) return;
    content.innerHTML = `<div class="flex items-center justify-between mb-4"><h2 class="text-xl font-display text-primary">${data.title}</h2><button onclick="closeLegalModal()" class="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"><i class="fas fa-times text-primary text-sm"></i></button></div>${data.content}`;
    modal.classList.remove('hidden');
    setTimeout(() => { content.classList.remove('scale-95', 'opacity-0'); content.classList.add('scale-100', 'opacity-100'); }, 10);
}
function closeLegalModal() {
    const modal = document.getElementById('legalModal');
    const content = document.getElementById('legalContent');
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check', error: 'fa-times', warning: 'fa-exclamation' };
    const titles = { success: 'Berhasil', error: 'Error', warning: 'Peringatan' };
    toast.innerHTML = `
        <div class="toast-icon"><i class="fas ${icons[type]}"></i></div>
        <div class="toast-content">
            <div class="toast-title">${titles[type]}</div>
            <div class="toast-message">${message}</div>
        </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ============================================
// MOBILE NAV
// ============================================

function initMobileNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });
    document.getElementById('mobileBottomCart')?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });
    document.getElementById('mobileBottomWishlist')?.addEventListener('click', (e) => { e.preventDefault(); openWishlist(); });
}

// ============================================
// STORAGE
// ============================================

function saveToStorage() {
    localStorage.setItem('r2_cart', JSON.stringify(cart));
    localStorage.setItem('r2_wishlist', JSON.stringify(wishlist));
    localStorage.setItem('r2_recentlyViewed', JSON.stringify(recentlyViewed));
}
function loadFromStorage() {
    try {
        const savedCart = localStorage.getItem('r2_cart');
        const savedWishlist = localStorage.getItem('r2_wishlist');
        const savedRecentlyViewed = localStorage.getItem('r2_recentlyViewed');
        if (savedCart) cart = JSON.parse(savedCart);
        if (savedWishlist) wishlist = JSON.parse(savedWishlist);
        if (savedRecentlyViewed) recentlyViewed = JSON.parse(savedRecentlyViewed);
    } catch (e) { console.error('Error loading from storage:', e); }
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================

function initTestimonialSlider() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const reviewCountEl = document.getElementById('reviewCount');
    
    if (!track) return;
    
    const testimonials = loadTestimonials();
    if (reviewCountEl) reviewCountEl.textContent = testimonials.length;
    
    track.innerHTML = testimonials.map(t => {
        const initials = t.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        const stars = Array(5).fill(0).map((_, i) => `<i class="${i < t.rating ? 'fas' : 'far'} fa-star"></i>`).join('');
        return `
            <div class="testimonial-slide">
                <div class="testimonial-card">
                    <div class="testimonial-stars">${stars}</div>
                    <p class="testimonial-text">"${t.text}"</p>
                    <div class="testimonial-author">
                        <div class="testimonial-avatar">${initials}</div>
                        <div class="testimonial-author-info">
                            <h4>${t.name}</h4>
                            <p>${t.location}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    const slides = track.querySelectorAll('.testimonial-slide');
    
    if (dotsContainer) {
        dotsContainer.innerHTML = slides.length > 0 ? Array.from(slides).map((_, i) => `<div class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`).join('') : '';
    }
    
    function getVisibleSlides() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    function updateSlider() {
        const slideWidth = slides[0]?.offsetWidth || 0;
        const offset = testimonialState.currentIndex * slideWidth;
        track.style.transform = `translateX(-${offset}px)`;
        document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === testimonialState.currentIndex);
        });
    }
    
    function nextSlide() {
        const maxIndex = Math.max(0, slides.length - getVisibleSlides());
        testimonialState.currentIndex = testimonialState.currentIndex >= maxIndex ? 0 : testimonialState.currentIndex + 1;
        updateSlider();
    }
    
    function prevSlide() {
        const maxIndex = Math.max(0, slides.length - getVisibleSlides());
        testimonialState.currentIndex = testimonialState.currentIndex <= 0 ? maxIndex : testimonialState.currentIndex - 1;
        updateSlider();
    }
    
    function startAutoPlay() { testimonialState.autoPlayInterval = setInterval(nextSlide, 4000); }
    function stopAutoPlay() { clearInterval(testimonialState.autoPlayInterval); }
    
    nextBtn?.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
    prevBtn?.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });
    document.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
        dot.addEventListener('click', () => { stopAutoPlay(); testimonialState.currentIndex = index; updateSlider(); startAutoPlay(); });
    });
    
    let touchStartX = 0;
    track.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; stopAutoPlay(); }, { passive: true });
    track.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) { if (diff > 0) nextSlide(); else prevSlide(); }
        startAutoPlay();
    });
    
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    window.addEventListener('resize', () => { testimonialState.currentIndex = 0; updateSlider(); });
    
    updateSlider();
    startAutoPlay();
}

// ============================================
// ADD REVIEW
// ============================================

function openReviewModal() {
    const modal = document.getElementById('reviewModal');
    modal.classList.remove('hidden');
    setTimeout(() => {
        const content = modal.querySelector('div[class*="transform"]');
        content?.classList.remove('scale-95', 'opacity-0');
        content?.classList.add('scale-100', 'opacity-100');
    }, 10);
}

function closeReviewModal() {
    const modal = document.getElementById('reviewModal');
    const content = modal.querySelector('div[class*="transform"]');
    content?.classList.remove('scale-100', 'opacity-100');
    content?.classList.add('scale-95', 'opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 300);
}

function initReviewForm() {
    const form = document.getElementById('reviewForm');
    const starBtns = document.querySelectorAll('.star-btn');
    const ratingInput = document.getElementById('reviewRating');
    
    starBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const rating = parseInt(btn.dataset.rating);
            ratingInput.value = rating;
            starBtns.forEach((b, i) => {
                const icon = b.querySelector('i');
                if (i < rating) { icon.className = 'fas fa-star'; b.classList.add('text-gold'); b.classList.remove('text-gray-300'); }
                else { icon.className = 'far fa-star'; b.classList.remove('text-gold'); b.classList.add('text-gray-300'); }
            });
        });
    });
    
    starBtns.forEach((b, i) => {
        const icon = b.querySelector('i');
        icon.className = 'fas fa-star';
        b.classList.add('text-gold');
        b.classList.remove('text-gray-300');
    });
    
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('reviewName').value.trim();
        const location = document.getElementById('reviewLocation').value.trim();
        const rating = parseInt(document.getElementById('reviewRating').value);
        const text = document.getElementById('reviewText').value.trim();
        
        if (!name || !location || !text) { showToast('Mohon lengkapi semua field', 'warning'); return; }
        
        const newReview = { name, location, rating, text, date: new Date().toISOString() };
        const saved = localStorage.getItem('userReviews');
        const userReviews = saved ? JSON.parse(saved) : [];
        userReviews.push(newReview);
        localStorage.setItem('userReviews', JSON.stringify(userReviews));
        
        form.reset();
        document.getElementById('reviewRating').value = 5;
        starBtns.forEach((b, i) => {
            const icon = b.querySelector('i');
            icon.className = 'fas fa-star';
            b.classList.add('text-gold');
        });
        
        closeReviewModal();
        showToast('Ulasan Anda berhasil ditambahkan! Terima kasih.', 'success');
        setTimeout(() => initTestimonialSlider(), 500);
    });
}

// ============================================
// UTILITY
// ============================================

function formatPrice(price) { return new Intl.NumberFormat('id-ID').format(price); }
function trackRecentlyViewed(productId) {
    recentlyViewed = recentlyViewed.filter(id => id !== productId);
    recentlyViewed.unshift(productId);
    recentlyViewed = recentlyViewed.slice(0, 10);
    saveToStorage();
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { closeQuickView(); closeCart(); closeWishlist(); closeCheckout(); closeLegalModal(); closeReviewModal(); }
});