/* ============================================
   app.js — R2 NUSANTARA · TOBACCO EMPIRE
   Fitur & data 100% dipertahankan.
   ============================================ */
(function () {
'use strict';

/* ============ 0. CUSTOM SVG LINE ICONS (stroke 1.5, rounded) ============ */
var ICONS = {
  bag:'<path d="M6 8h12l1 12a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  heart:'<path d="M12 20s-7-4.5-9-9c-1.2-2.8.6-6 3.7-6 2 0 3.5 1.2 4.3 2.6h2c.8-1.4 2.3-2.6 4.3-2.6 3.1 0 4.9 3.2 3.7 6-2 4.5-9 9-9 9Z" transform="translate(-1.5 0) scale(1.05)"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  check:'<path d="m4.5 12.5 5 5L19.5 7"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  trash:'<path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M6.5 7l1 13h9l1-13"/>',
  eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  'arrow-r':'<path d="M4 12h16m0 0-6-6m6 6-6 6"/>',
  'arrow-l':'<path d="M20 12H4m0 0 6-6m-6 6 6 6"/>',
  'arrow-up':'<path d="M12 20V4m0 0-6 6m6-6 6 6"/>',
  wa:'<path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 20.5l4.3-1.1A8.5 8.5 0 1 0 12 3.5Z"/><path d="M9 9.5c.4 2.6 2.9 5.1 5.5 5.5l1-1.6-2.1-1-.9.7c-.8-.4-1.8-1.4-2.2-2.2l.7-.9-1-2.1L9 9.5Z"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  pin:'<path d="M12 21s-6.5-5.5-6.5-10.5a6.5 6.5 0 0 1 13 0C18.5 15.5 12 21 12 21Z"/><circle cx="12" cy="10.5" r="2.2"/>',
  truck:'<path d="M2.5 6.5h11v10h-11zM13.5 10h4l3 3v3.5h-7"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/>',
  shield:'<path d="M12 3 4.5 6v5.5c0 4.6 3.2 7.6 7.5 9.5 4.3-1.9 7.5-4.9 7.5-9.5V6L12 3Z"/><path d="m9 11.5 2.2 2.2L15.5 9.5"/>',
  camera:'<path d="M3 8a1.5 1.5 0 0 1 1.5-1.5H7l1.5-2h7L17 6.5h2.5A1.5 1.5 0 0 1 21 8v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17V8Z"/><circle cx="12" cy="12.5" r="3.5"/>',
  gift:'<path d="M4 11h16v9H4zM4 11V8h16v3M12 8v12"/><path d="M12 8c-1.8 0-4.5-.7-4.5-2.5S9.8 3 12 8c2.2-5 4.5-2.7 4.5-2.5S13.8 8 12 8Z"/>',
  chev:'<path d="m6 9 6 6 6-6"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5m14 0h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/>',
  moon:'<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>',
  menu:'<path d="M4 7h16M4 12h16M4 17h10"/>',
  info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.2"/>',
  lock:'<rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/>',
  box:'<path d="M3.5 7.5 12 3l8.5 4.5v9L12 21l-8.5-4.5v-9Z"/><path d="M3.5 7.5 12 12l8.5-4.5M12 12v9"/>',
  grid:'<rect x="4" y="4" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1"/>',
  rows:'<path d="M4 6h16M4 12h16M4 18h16"/>',
  fire:'<path d="M12 21c-3.9 0-6.5-2.5-6.5-6 0-2.6 1.6-4.6 3-6.2.5 1 1.1 1.7 2 2.2-.3-2.7.7-5.6 3-7.5-.2 2 .4 3.4 1.6 4.8 1.3 1.5 3.4 3 3.4 6.2 0 3.5-2.6 6.5-6.5 6.5Z"/>',
  seal:'<circle cx="12" cy="12" r="7.5"/><path d="m9.2 12.2 2 2 3.6-4"/>',
  pen:'<path d="m14.5 5.5 4 4L8 20l-4.7.7L4 16 14.5 5.5Z"/><path d="m12.5 7.5 4 4"/>',
  sort:'<path d="M8 4v16m0 0-3.5-3.5M8 20l3.5-3.5M16 20V4m0 0-3.5 3.5M16 4l3.5 3.5"/>',
  warn:'<path d="M12 4 2.8 19.5h18.4L12 4Z"/><path d="M12 10v4M12 17v.2"/>'
};
function svgIcon(name, cls) {
  var p = ICONS[name] || ICONS.info;
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"' + (cls ? ' class="' + cls + '"' : '') + '>' + p + '</svg>';
}
window.svgIcon = svgIcon;
function injectIcons(root) {
  (root || document).querySelectorAll('[data-icon]').forEach(function (el) { el.innerHTML = svgIcon(el.getAttribute('data-icon')); });
}

/* ============ 1. DARK MODE ============ */
window.toggleDarkMode = function () {
  document.documentElement.classList.toggle('dark');
  var isDark = document.documentElement.classList.contains('dark');
  try { localStorage.setItem('r2_dark_mode', isDark); } catch (e) {}
  var icon = document.getElementById('darkModeIcon');
  if (icon) { icon.setAttribute('data-icon', isDark ? 'sun' : 'moon'); icon.innerHTML = svgIcon(isDark ? 'sun' : 'moon'); }
};

/* ============ 2. SMART CONTEXT + CHATBOT ============ */
window.R2Context = {
  init: function () {
    this.device = /Mobile|Android|iP(hone|od|ad)/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
    this.language = navigator.language || 'id-ID';
    this.isReturning = !!localStorage.getItem('r2_visited');
    localStorage.setItem('r2_visited', 'true');
  },
  getCartSummary: function () {
    if (!window.__cart) return 'Keranjang Kosong';
    return window.__cart.reduce(function (s, i) { return s + i.qty; }, 0) + ' Slop';
  }
};
window.R2Context.init();
window.chtlConfig = { chatbotId: "4136889914" };
window.addEventListener('load', function () {
  setTimeout(function () {
    var s = document.createElement('script');
    s.async = true; s.dataset.id = "4136889914"; s.id = "chtl-script";
    s.type = "text/javascript"; s.src = "https://chatling.ai/js/embed.js";
    document.body.appendChild(s);
  }, 3000);
});

/* ============ 3. STATE ============ */
var cart = [], wishlist = [];
try { cart = JSON.parse(localStorage.getItem('r2_cart')) || []; } catch (e) { cart = []; }
try { wishlist = JSON.parse(localStorage.getItem('r2_wishlist')) || []; } catch (e) { wishlist = []; }
window.__cart = cart;
var activeCatalog = 'r2', currentPage = 1, itemsPerPage = 12;
var activeFilter = 'all', activeSort = 'name-asc', searchTerm = '', viewMode = 'grid';

/* ============ 4. UTILITIES ============ */
function formatRupiah(n) { return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n); }
function formatID(n) { return new Intl.NumberFormat('id-ID').format(n); } // pemisah ribuan titik
function getR2Tier(p) { if (p <= 76000) return 'hemat'; if (p >= 90000) return 'premium'; return 'populer'; }
function getCartQty(id) { var i = cart.find(function (x) { return x.id === id; }); return i ? i.qty : 0; }
function isWishlisted(id) { return wishlist.indexOf(id) > -1; }
function escapeHtml(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
function saveCart() { try { localStorage.setItem('r2_cart', JSON.stringify(cart)); } catch (e) {} }
function saveWishlist() { try { localStorage.setItem('r2_wishlist', JSON.stringify(wishlist)); } catch (e) {} }
function showToast(m, type) {
  type = type || 'success';
  var c = document.getElementById('toast-container'); if (!c) return;
  var to = document.createElement('div');
  var ic = type === 'error' ? 'warn' : type === 'info' ? 'info' : 'check';
  to.className = 'toast';
  to.innerHTML = '<span class="t-ico">' + svgIcon(ic) + '</span><span>' + m + '</span>';
  c.appendChild(to);
  setTimeout(function () { to.classList.add('show'); }, 10);
  setTimeout(function () { to.classList.remove('show'); setTimeout(function () { to.remove(); }, 450); }, 2600);
}

/* ============ 5. ANIMASI TEKS ============ */
var SCRAMBLE_CHARS = '█▓▒░<>#/01RXZK+';
function scrambleIn(el) {
  var original = el.getAttribute('data-scramble-text') || el.textContent;
  var iterations = 0, frame = 0;
  var iv = setInterval(function () {
    el.textContent = original.split('').map(function (ch, idx) {
      if (ch === ' ') return ' ';
      if (idx < iterations) return ch;
      return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }).join('');
    frame++; if (frame % 2 === 0) iterations++;
    if (iterations > original.length) { clearInterval(iv); el.textContent = original; }
  }, 28);
}
function startWordRotator(el, words) {
  var idx = 0;
  setInterval(function () {
    el.classList.add('rotator-out');
    setTimeout(function () {
      idx = (idx + 1) % words.length;
      el.textContent = words[idx];
      el.classList.remove('rotator-out');
      el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
    }, 300);
  }, 2600);
}
function initTextAnimations() {
  document.querySelectorAll('[data-scramble]').forEach(function (el) { el.setAttribute('data-scramble-text', el.textContent.trim()); });
  var scObs = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { scrambleIn(en.target); scObs.unobserve(en.target); } }); }, { threshold: 0.5 });
  document.querySelectorAll('[data-scramble]').forEach(function (el) { scObs.observe(el); });
  var rot = document.getElementById('heroRotator');
  if (rot) startWordRotator(rot, (rot.getAttribute('data-words') || 'Penuhi').split('|'));
}
function animateCounter(el) {
  var target = parseInt(el.getAttribute('data-count-to'), 10); if (isNaN(target)) return;
  var suffix = el.getAttribute('data-count-suffix') || '', duration = 1500, start = null;
  function step(ts) {
    if (!start) start = ts;
    var p = Math.min((ts - start) / duration, 1), eased = 1 - Math.pow(1 - p, 3);
    el.textContent = formatID(Math.floor(eased * target)) + suffix;
    if (p < 1) requestAnimationFrame(step); else el.textContent = formatID(target) + suffix;
  }
  requestAnimationFrame(step);
}

/* ============ 6. AGE GATE ============ */
function initAgeGate() {
  var gate = document.getElementById('ageGate'); if (!gate) return;
  var ok = false;
  try { ok = localStorage.getItem('r2_age_ok') === '1'; } catch (e) {}
  if (ok) return;
  gate.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  var yes = document.getElementById('ageYes'), no = document.getElementById('ageNo');
  function close() {
    gate.classList.add('gate-out');
    setTimeout(function () { gate.classList.add('hidden'); document.body.style.overflow = ''; }, 800);
  }
  if (yes) yes.addEventListener('click', function () { try { localStorage.setItem('r2_age_ok', '1'); } catch (e) {} close(); });
  if (no) no.addEventListener('click', function () { window.location.href = 'https://www.google.com'; });
}

/* ============ 7. CUSTOM CURSOR + MAGNETIC ============ */
function initCursor() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.documentElement.classList.add('has-cursor');
  var dot = document.getElementById('cursorDot'), ring = document.getElementById('cursorRing');
  var mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; dot.style.left = mx + 'px'; dot.style.top = my + 'px'; });
  (function loop() {
    rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(loop);
  })();
  document.addEventListener('mouseover', function (e) {
    if (e.target.closest('a,button,input,select,textarea,[data-cursor]')) ring.classList.add('is-hover');
  });
  document.addEventListener('mouseout', function (e) {
    if (e.target.closest('a,button,input,select,textarea,[data-cursor]')) ring.classList.remove('is-hover');
  });
}
function initMagnetic() {
  if (!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  document.querySelectorAll('.magnetic').forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      var dx = (e.clientX - r.left - r.width / 2) * 0.22;
      var dy = (e.clientY - r.top - r.height / 2) * 0.22;
      el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    });
    el.addEventListener('mouseleave', function () { el.style.transform = ''; });
  });
}

/* ============ 8. SMOKE PARALLAX (rAF) ============ */
function initHeroParallax() {
  var vis = document.querySelector('[data-parallax]'), layers = document.querySelectorAll('.smoke-layer');
  if (!vis) return;
  var tx = 0, ty = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', function (e) {
    tx = (e.clientX / window.innerWidth - 0.5); ty = (e.clientY / window.innerHeight - 0.5);
  });
  (function loop() {
    cx += (tx - cx) * 0.045; cy += (ty - cy) * 0.045;
    vis.style.transform = 'translate(' + (cx * 26) + 'px,' + (cy * 18) + 'px)';
    layers.forEach(function (l) {
      var d = parseFloat(l.getAttribute('data-depth') || '20');
      l.style.marginLeft = (cx * d) + 'px';
    });
    requestAnimationFrame(loop);
  })();
}

/* ============ 9. SCROLL REVEAL — staggered, once:false, offset ~120 ============ */
function initReveal() {
  document.querySelectorAll('[data-reveal-stagger]').forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.setAttribute('data-reveal', '');
      child.setAttribute('data-delay', (i * 0.1).toFixed(2));
    });
  });
  var els = document.querySelectorAll('[data-reveal]');
  els.forEach(function (el) {
    var d = parseFloat(el.getAttribute('data-delay') || '0');
    el.style.transitionDelay = d + 's';
  });
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) en.target.classList.add('revealed');
      else if (en.boundingClientRect.top > 0) en.target.classList.remove('revealed'); // once:false
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -120px 0px' });
  els.forEach(function (el) { obs.observe(el); });
}

/* ============ 10. MOBILE MENU ============ */
window.toggleMobileMenu = function () {
  var m = document.getElementById('mobileMenu'), ic = document.getElementById('mobileMenuIcon');
  if (!m) return;
  m.classList.toggle('hidden');
  if (ic) { var open = !m.classList.contains('hidden'); ic.innerHTML = svgIcon(open ? 'x' : 'menu'); }
};
function closeMobileMenu() {
  var m = document.getElementById('mobileMenu'), ic = document.getElementById('mobileMenuIcon');
  if (m) m.classList.add('hidden');
  if (ic) ic.innerHTML = svgIcon('menu');
}

/* ============ 11. KATALOG ============ */
function pseudoRating(id) {
  var h = 0;
  for (var i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return Math.round((4.3 + (h % 8) / 10) * 10) / 10;
}
function retailPrice(price) { return Math.ceil((price / 0.87) / 1000) * 1000; }
function renderStars(rating) {
  var full = Math.round(rating), html = '';
  for (var i = 0; i < 5; i++) html += '<svg viewBox="0 0 24 24" fill="currentColor"' + (i >= full ? ' class="dim"' : '') + '><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6z"/></svg>';
  return html;
}
function isNewProduct(id) { var n = parseInt(id.replace(/\D/g, ''), 10); return n % 11 === 0; }
function getRibbonBadge(p) {
  if (isNewProduct(p.id)) return { cls: 'new', label: 'Baru' };
  if (p.category === 'resmi') {
    if (p.segment === 'A' || p.segment === 'D') return { cls: 'vip', label: 'Premium' };
    if (p.segment === 'B') return { cls: 'hit', label: 'Best Seller' };
    return null;
  }
  var tier = getR2Tier(p.price);
  if (tier === 'premium') return { cls: 'vip', label: 'Premium' };
  if (tier === 'populer') return { cls: 'hit', label: 'Best Seller' };
  return null;
}
function hangTag(label, tone) {
  return '<span class="hang-tag hang-' + tone + '"><svg viewBox="0 0 120 40" aria-hidden="true"><path d="M8 4 H112 a6 6 0 0 1 6 6 v20 a6 6 0 0 1-6 6 H8 a6 6 0 0 1-6-6 V10 a6 6 0 0 1 6-6 Z" fill="none" stroke="currentColor"/><circle cx="16" cy="20" r="3" fill="none" stroke="currentColor"/></svg><span>' + label + '</span></span>';
}
function initialsOf(name) {
  var w = name.trim().split(/\s+/);
  return ((w[0] ? w[0][0] : '') + (w[1] ? w[1][0] : '')).toUpperCase();
}
window.switchCatalog = function (cat) {
  if (cat !== 'r2' && cat !== 'resmi') return;
  activeCatalog = cat; activeFilter = 'all'; currentPage = 1; searchTerm = '';
  var si = document.getElementById('searchInput'); if (si) si.value = '';
  document.querySelectorAll('.catalog-tab').forEach(function (t) {
    var a = t.dataset.tab === cat; t.classList.toggle('active', a); t.setAttribute('aria-selected', a ? 'true' : 'false');
  });
  updateCatalogInfoBanner(); buildFilterChips();
  var ind = document.getElementById('activeFilterIndicator'); if (ind) ind.classList.add('hidden');
  renderProductDisplay();
};
function updateCatalogInfoBanner() {
  var b = document.getElementById('catalogInfoBanner'), i = document.getElementById('catalogInfoIcon'), t = document.getElementById('catalogInfoTitle'), d = document.getElementById('catalogInfoDesc');
  if (!b) return;
  if (activeCatalog === 'r2') {
    b.classList.remove('resmi');
    if (i) i.innerHTML = svgIcon('fire');
    if (t) t.textContent = 'Katalog R2 Nusantara';
    if (d) d.textContent = '167 merek lokal pilihan dengan harga kompetitif untuk margin maksimal.';
  } else {
    b.classList.add('resmi');
    if (i) i.innerHTML = svgIcon('seal');
    if (t) t.textContent = 'Katalog Resmi — Brand Nasional & Internasional';
    if (d) d.textContent = '66 merek resmi terbagi dalam 5 segmen. Harga grosir per slop.';
  }
}
function buildFilterChips() {
  var c = document.getElementById('filterChipsContainer'); if (!c) return;
  if (activeCatalog === 'r2') {
    c.innerHTML =
      '<button onclick="applyFilter(\'all\')" id="chip-all" class="chip on">Semua</button>' +
      '<button onclick="applyFilter(\'hemat\')" id="chip-hemat" class="chip">Hemat</button>' +
      '<button onclick="applyFilter(\'populer\')" id="chip-populer" class="chip">Populer</button>' +
      '<button onclick="applyFilter(\'premium\')" id="chip-premium" class="chip">Premium</button>';
  } else {
    c.innerHTML =
      '<button onclick="applyFilter(\'all\')" id="chip-all" class="chip on">Semua</button>' +
      '<button onclick="applyFilter(\'segA\')" id="chip-segA" class="chip">Segmen A</button>' +
      '<button onclick="applyFilter(\'segB\')" id="chip-segB" class="chip">Segmen B</button>' +
      '<button onclick="applyFilter(\'segC\')" id="chip-segC" class="chip">Segmen C</button>' +
      '<button onclick="applyFilter(\'segD\')" id="chip-segD" class="chip">Segmen D</button>' +
      '<button onclick="applyFilter(\'segE\')" id="chip-segE" class="chip">Segmen E</button>';
  }
}
function getProcessedProducts() {
  var src = activeCatalog === 'r2' ? productsR2 : productsResmi, r = src.slice();
  if (searchTerm) r = r.filter(function (p) { return p.name.toLowerCase().indexOf(searchTerm) !== -1; });
  if (activeCatalog === 'r2') { if (activeFilter !== 'all') r = r.filter(function (p) { return getR2Tier(p.price) === activeFilter; }); }
  else if (activeFilter !== 'all') { var seg = activeFilter.replace('seg', ''); r = r.filter(function (p) { return p.segment === seg; }); }
  r.sort(function (a, b) {
    if (activeSort === 'price-asc') return a.price - b.price;
    if (activeSort === 'price-desc') return b.price - a.price;
    if (activeSort === 'name-desc') return b.name.localeCompare(a.name);
    return a.name.localeCompare(b.name);
  });
  return r;
}
function buildCardActions(p) {
  var q = getCartQty(p.id);
  var main = q > 0
    ? '<div class="p-stepper"><button class="p-step" onclick="window.__updateQty(\'' + p.id + '\',-1)">−</button><span class="p-qty">' + q + '</span><button class="p-step gold" onclick="window.__updateQty(\'' + p.id + '\',1)">+</button></div>'
    : '<button onclick="window.__addCart(\'' + p.id + '\')" class="p-add">' + svgIcon('bag') + ' Tambah</button>';
  return '<div class="p-actions">' + main + '<button onclick="openQuickView(\'' + p.id + '\')" class="p-eye" aria-label="Lihat Cepat">' + svgIcon('eye') + '</button></div>';
}
function buildRowActions(p) {
  var q = getCartQty(p.id);
  var main = q > 0
    ? '<div class="t-stepper"><button class="p-step" onclick="window.__updateQty(\'' + p.id + '\',-1)">−</button><span class="p-qty">' + q + '</span><button class="p-step gold" onclick="window.__updateQty(\'' + p.id + '\',1)">+</button></div>'
    : '<button onclick="window.__addCart(\'' + p.id + '\')" class="t-add" aria-label="Tambah">' + svgIcon('bag') + '</button>';
  return main + '<button onclick="openQuickView(\'' + p.id + '\')" class="t-eye" aria-label="Lihat Cepat">' + svgIcon('eye') + '</button>';
}
function buildProductCardHTML(p, idx) {
  var isResmi = p.category === 'resmi';
  var tag = isResmi ? '<span class="p-tag-mini ptag-resmi">Resmi</span>' : '<span class="p-tag-mini ptag-r2">R2</span>';
  var catLabel = isResmi ? (p.segmentName || 'Katalog Resmi') : 'Katalog R2';
  var rating = pseudoRating(p.id);
  var ribbon = getRibbonBadge(p);
  var ribbonHTML = ribbon ? hangTag(ribbon.label, ribbon.cls === 'hit' ? 'burg' : 'gold') : '';
  var wl = isWishlisted(p.id);
  var wishBtn = '<button onclick="toggleWishlistItem(\'' + p.id + '\', event)" data-wish-heart="' + p.id + '" class="p-wish' + (wl ? ' is-active' : '') + '" aria-label="Wishlist">' + svgIcon('heart') + '</button>';
  var retail = retailPrice(p.price);
  var sizeCls = ribbon ? ' p-card--lg' : '';
  if (idx === 0) sizeCls = ' p-card--xl';
  return '<div class="p-card card-enter' + (isResmi ? ' is-resmi' : '') + sizeCls + '" style="animation-delay:' + (idx * 45) + 'ms" data-pid="' + p.id + '">' +
    ribbonHTML +
    '<div class="p-media"><div class="pm-inner"><span class="pm-dust"></span><span class="p-initial">' + initialsOf(p.name) + '</span></div>' + tag + wishBtn + '</div>' +
    '<div class="p-body">' +
      '<div class="p-toprow"><span class="p-cat">' + escapeHtml(catLabel) + '</span><span class="p-id">' + p.id.toUpperCase() + '</span></div>' +
      '<h3 class="p-name">' + escapeHtml(p.name) + '</h3>' +
      '<div class="p-rating"><span class="p-stars">' + renderStars(rating) + '</span><span class="p-rnum">' + rating.toFixed(1) + '</span></div>' +
      '<div class="p-price-old">' + formatRupiah(retail) + '</div>' +
      '<div class="p-price">' + formatRupiah(p.price) + ' <small>/ SLOP</small></div>' +
      buildCardActions(p) +
    '</div></div>';
}
function buildProductRowHTML(p, idx) {
  var isResmi = p.category === 'resmi', wl = isWishlisted(p.id);
  var rating = pseudoRating(p.id), retail = retailPrice(p.price);
  var catBadge = isResmi
    ? '<span class="t-tag resmi">RESMI · SEG ' + p.segment + '</span>'
    : '<span class="t-tag">R2 · ' + getR2Tier(p.price).toUpperCase() + '</span>';
  return '<div class="t-row" style="animation-delay:' + (idx * 25) + 'ms" data-pid="' + p.id + '">' +
    '<div class="t-main"><div class="t-thumb">' + initialsOf(p.name) + '</div><div style="min-width:0">' +
      '<div class="t-name">' + escapeHtml(p.name) + '</div>' +
      '<div class="t-meta"><span class="p-stars" style="display:inline-flex;gap:1px">' + renderStars(rating) + '</span><span class="p-rnum">' + rating.toFixed(1) + '</span>' + catBadge + '</div>' +
    '</div></div>' +
    '<div class="t-price"><small>' + formatRupiah(retail) + '</small>' + formatRupiah(p.price) + '</div>' +
    '<div class="t-id">' + p.id.toUpperCase() + '</div>' +
    '<div class="t-actions">' +
      '<button onclick="toggleWishlistItem(\'' + p.id + '\', event)" data-wish-heart="' + p.id + '" class="t-wish' + (wl ? ' is-active' : '') + '" aria-label="Wishlist">' + svgIcon('heart') + '</button>' +
      buildRowActions(p) +
    '</div></div>';
}
function renderProductDisplay() {
  var processed = getProcessedProducts();
  var tp = Math.ceil(processed.length / itemsPerPage) || 1;
  if (currentPage > tp) currentPage = tp;
  var pp = processed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  var grid = document.getElementById('productGrid'), wrap = document.getElementById('productTableWrap'), body = document.getElementById('productTableBody'), none = document.getElementById('noProductFound');
  if (!pp.length) {
    if (grid) { grid.innerHTML = ''; grid.classList.add('hidden'); }
    if (body) body.innerHTML = '';
    if (wrap) wrap.classList.add('hidden');
    if (none) none.classList.remove('hidden');
    renderPagination(tp); return;
  }
  if (none) none.classList.add('hidden');
  if (viewMode === 'table') {
    if (grid) { grid.classList.add('hidden'); grid.innerHTML = ''; }
    if (wrap) wrap.classList.remove('hidden');
    if (body) body.innerHTML = pp.map(buildProductRowHTML).join('');
  } else {
    if (wrap) wrap.classList.add('hidden');
    if (grid) { grid.classList.remove('hidden'); grid.innerHTML = pp.map(buildProductCardHTML).join(''); }
  }
  renderPagination(tp); updateActiveFilterIndicator();
}
function updateActiveFilterIndicator() {
  var ind = document.getElementById('activeFilterIndicator'), txt = document.getElementById('activeFilterText');
  if (!ind || !txt) return;
  if (activeFilter === 'all') { ind.classList.add('hidden'); return; }
  ind.classList.remove('hidden');
  var L = { hemat: 'Hemat — ≤ Rp 76.000', populer: 'Populer — Rp 77.000–89.000', premium: 'Premium — ≥ Rp 90.000', segA: 'Segmen A — Kretek Filter Premium', segB: 'Segmen B — Kretek Filter Reguler', segC: 'Segmen C — Mild / Rendah Tar', segD: 'Segmen D — SPM Internasional', segE: 'Segmen E — Kretek Tangan / Legacy' };
  txt.textContent = 'Filter / ' + (L[activeFilter] || activeFilter);
}
function renderPagination(tp) {
  var c = document.getElementById('paginationContainer'); if (!c) return;
  if (tp <= 1) { c.innerHTML = ''; return; }
  var h = '';
  for (var i = 1; i <= tp; i++) h += '<button onclick="window.__goToPage(' + i + ')" class="page-btn' + (i === currentPage ? ' on' : '') + '">' + i + '</button>';
  c.innerHTML = h;
}
window.__goToPage = function (p) { currentPage = p; renderProductDisplay(); var t = document.getElementById('produk'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
window.applyFilter = function (f) {
  activeFilter = f; currentPage = 1;
  document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('on'); });
  var a = document.getElementById('chip-' + f); if (a) a.classList.add('on');
  renderProductDisplay();
};
window.applySort = function (s) { activeSort = s; currentPage = 1; renderProductDisplay(); };
window.setViewMode = function (m) {
  if (m !== 'grid' && m !== 'table') return;
  viewMode = m;
  var g = document.getElementById('viewGridBtn'), t = document.getElementById('viewTableBtn');
  if (g) g.classList.toggle('active', m === 'grid');
  if (t) t.classList.toggle('active', m === 'table');
  renderProductDisplay();
};

/* ============ 12. WISHLIST ============ */
window.toggleWishlistItem = function (id, event) {
  if (event) event.stopPropagation();
  var i = wishlist.indexOf(id);
  if (i > -1) { wishlist.splice(i, 1); showToast('Dihapus dari Wishlist', 'info'); }
  else { wishlist.push(id); showToast('Ditambahkan ke Wishlist'); }
  saveWishlist(); updateWishlistUI(); renderProductDisplay();
};
function updateWishlistUI() {
  var badge = document.getElementById('wishlistBadge');
  if (badge) { badge.innerText = wishlist.length; badge.classList.toggle('scale-0', wishlist.length === 0); }
  document.querySelectorAll('[data-wish-heart]').forEach(function (btn) {
    var id = btn.getAttribute('data-wish-heart'), on = isWishlisted(id);
    btn.classList.toggle('is-active', on);
  });
  var c = document.getElementById('wishlistItemsContainer'); if (!c) return;
  if (!wishlist.length) {
    c.innerHTML = '<div class="drawer-empty">' + svgIcon('heart') + '<p>Wishlist Kosong</p></div>';
    return;
  }
  c.innerHTML = wishlist.map(function (id) {
    var p = allProducts.find(function (x) { return x.id === id; }); if (!p) return '';
    return '<div class="cart-item">' +
      '<div class="ci-thumb">' + initialsOf(p.name) + '</div>' +
      '<div class="ci-info"><div class="ci-name">' + escapeHtml(p.name) + '</div><div class="ci-price">' + formatRupiah(p.price) + '</div></div>' +
      '<button onclick="window.__addCart(\'' + p.id + '\'); toggleWishlistItem(\'' + p.id + '\');" class="ci-act move" title="Pindah ke Keranjang">' + svgIcon('bag') + '</button>' +
      '<button onclick="toggleWishlistItem(\'' + p.id + '\')" class="ci-act del" title="Hapus">' + svgIcon('trash') + '</button>' +
    '</div>';
  }).join('');
}
window.toggleWishlistSidebar = function () {
  var o = document.getElementById('wishlistOverlay'), s = document.getElementById('wishlistSidebar');
  if (!o || !s) return;
  var open = s.classList.contains('open');
  if (!open) { o.classList.remove('hidden'); setTimeout(function () { o.classList.add('overlay-enter'); }, 10); s.classList.add('open'); document.body.style.overflow = 'hidden'; }
  else { o.classList.remove('overlay-enter'); s.classList.remove('open'); setTimeout(function () { o.classList.add('hidden'); }, 350); document.body.style.overflow = ''; }
};

/* ============ 13. QUICK VIEW ============ */
window.openQuickView = function (id) {
  var p = allProducts.find(function (x) { return x.id === id; }); if (!p) return;
  var t = document.getElementById('qvTitle'), pr = document.getElementById('qvPrice'), b = document.getElementById('qvBadge'), i = document.getElementById('qvId'), d = document.getElementById('qvDesc');
  if (t) t.textContent = p.name;
  if (pr) pr.innerHTML = formatRupiah(p.price) + '<small style="font-family:var(--sans);font-size:11px;color:var(--faint)"> /slop</small>';
  if (i) i.textContent = p.id.toUpperCase();
  if (d) d.textContent = p.category === 'resmi' ? (p.segmentName || '') : 'Katalog R2 Nusantara — harga kompetitif untuk margin maksimal.';
  if (b) {
    if (p.category === 'resmi') { b.className = 'segment-badge segment-' + p.segment; b.textContent = 'Resmi · Segmen ' + p.segment; }
    else { var tier = getR2Tier(p.price); b.className = 'segment-badge tier-' + tier; b.textContent = 'R2 · ' + tier; }
  }
  var ab = document.getElementById('qvAddToCartBtn'); if (ab) ab.onclick = function () { window.__addCart(p.id); closeQuickView(); };
  var wb = document.getElementById('qvWishlistBtn');
  if (wb) {
    var wl = isWishlisted(p.id);
    wb.classList.toggle('is-active', wl);
    wb.onclick = function () { toggleWishlistItem(p.id); wb.classList.toggle('is-active', isWishlisted(p.id)); };
  }
  var o = document.getElementById('quickViewOverlay'), m = document.getElementById('quickViewModal');
  if (o) { o.classList.remove('hidden'); setTimeout(function () { o.classList.add('overlay-enter'); }, 10); }
  if (m) setTimeout(function () { m.classList.add('modal-enter'); }, 10);
  document.body.style.overflow = 'hidden';
};
window.closeQuickView = function () {
  var o = document.getElementById('quickViewOverlay'), m = document.getElementById('quickViewModal');
  if (o) o.classList.remove('overlay-enter');
  if (m) m.classList.remove('modal-enter');
  setTimeout(function () { if (o) o.classList.add('hidden'); }, 350);
  document.body.style.overflow = '';
};

/* ============ 14. VISITOR COUNTER ============ */
function initVisitorCounter() {
  var el = document.getElementById('visitorCount'); if (!el) return;
  var count = Math.floor(Math.random() * (45 - 18 + 1)) + 18;
  el.textContent = count;
  setInterval(function () { count = Math.max(15, Math.min(60, count + Math.floor(Math.random() * 5) - 2)); el.textContent = count; }, 4000);
}

/* ============ 15. KERANJANG ============ */
window.__addCart = function (id) {
  var p = allProducts.find(function (x) { return x.id === id; }); if (!p) return;
  var ex = cart.find(function (x) { return x.id === id; });
  if (ex) ex.qty += 1; else cart.push({ id: p.id, name: p.name, price: p.price, qty: 1, category: p.category });
  saveCart(); window.__cart = cart; updateCartUI(); showToast('Berhasil ditambahkan ke pesanan');
};
window.__updateQty = function (id, ch) {
  var i = cart.find(function (x) { return x.id === id; });
  if (i) { i.qty += ch; if (i.qty < 1) cart = cart.filter(function (x) { return x.id !== id; }); }
  window.__cart = cart; saveCart(); updateCartUI();
};
function updateCartUI() {
  var t = cart.reduce(function (s, i) { return s + i.qty; }, 0);
  var tp = cart.reduce(function (s, i) { return s + i.price * i.qty; }, 0);
  var badge = document.getElementById('cartBadge');
  if (badge) { badge.innerText = t; badge.classList.toggle('scale-0', t === 0); }
  var bq = document.getElementById('bannerQty'), pf = document.getElementById('progressFill'), bt = document.getElementById('bannerTitle'), bs = document.getElementById('bannerSubtitle'), bn = document.getElementById('shippingProgressBanner');
  if (bq) bq.innerText = t;
  if (pf) pf.style.width = Math.min((t / 20) * 100, 100) + '%';
  if (t >= 20) {
    if (bt) bt.innerText = 'Target Tercapai';
    if (bs) bs.innerHTML = 'Anda mendapat <b>Gratis Ongkir</b> dari gudang.';
    if (bn) bn.classList.add('bg-emerald-600');
  } else {
    if (bt) bt.innerText = 'Target Gratis Ongkir';
    if (bs) bs.innerHTML = 'Pilih <b>' + (20 - t) + ' slop</b> lagi untuk subsidi ongkir.';
    if (bn) bn.classList.remove('bg-emerald-600');
  }
  var cc = document.getElementById('cartItemsContainer'), cs = document.getElementById('cartSummary');
  if (!cart.length) {
    if (cc) cc.innerHTML = '<div class="drawer-empty">' + svgIcon('bag') + '<p>Keranjang Kosong</p></div>';
    if (cs) cs.classList.add('hidden');
  } else {
    if (cs) cs.classList.remove('hidden');
    var ti = document.getElementById('totalItemsDisplay'), tpd = document.getElementById('totalPriceDisplay');
    if (ti) ti.innerText = t; if (tpd) tpd.innerText = formatRupiah(tp);
    if (cc) cc.innerHTML = cart.map(function (i) {
      var cb = i.category === 'resmi' ? '<span class="ci-cat resmi">RESMI</span>' : '<span class="ci-cat">R2</span>';
      return '<div class="cart-item"><div class="ci-thumb">' + initialsOf(i.name) + '</div>' +
        '<div class="ci-info"><div class="ci-name">' + escapeHtml(i.name) + ' ' + cb + '</div><div class="ci-price">' + formatRupiah(i.price) + '</div></div>' +
        '<div class="ci-stepper"><button onclick="window.__updateQty(\'' + i.id + '\',-1)">−</button><span>' + i.qty + '</span><button onclick="window.__updateQty(\'' + i.id + '\',1)">+</button></div></div>';
    }).join('');
  }
  var mp = document.getElementById('modalTotalPrice'); if (mp) mp.innerText = formatRupiah(tp);
  renderProductDisplay();
}
window.toggleCart = function () {
  var o = document.getElementById('cartOverlay'), s = document.getElementById('cartSidebar');
  if (!o || !s) return;
  var open = s.classList.contains('open');
  if (!open) { o.classList.remove('hidden'); setTimeout(function () { o.classList.add('overlay-enter'); }, 10); s.classList.add('open'); document.body.style.overflow = 'hidden'; }
  else { o.classList.remove('overlay-enter'); s.classList.remove('open'); setTimeout(function () { o.classList.add('hidden'); }, 350); document.body.style.overflow = ''; }
};

/* ============ 16. CHECKOUT ============ */
window.openCheckoutModal = function () {
  if (!cart.length) { showToast('Keranjang masih kosong', 'error'); return; }
  toggleCart();
  setTimeout(function () {
    var o = document.getElementById('checkoutModalOverlay'), m = document.getElementById('checkoutModal');
    if (o) { o.classList.remove('hidden'); setTimeout(function () { o.classList.add('overlay-enter'); }, 10); }
    if (m) setTimeout(function () { m.classList.add('modal-enter'); }, 10);
    document.body.style.overflow = 'hidden';
    updateProgressStep(1);
    setTimeout(function () { var n = document.getElementById('newCustName'); if (n) n.focus(); validateCheckoutForm(); }, 300);
  }, 350);
};
window.closeCheckoutModal = function () {
  var o = document.getElementById('checkoutModalOverlay'), m = document.getElementById('checkoutModal');
  if (o) o.classList.remove('overlay-enter');
  if (m) m.classList.remove('modal-enter');
  setTimeout(function () { if (o) o.classList.add('hidden'); }, 350);
  document.body.style.overflow = '';
};
function updateProgressStep(n) {
  var inds = [document.getElementById('step1Indicator'), document.getElementById('step2Indicator'), document.getElementById('step3Indicator')];
  var line = document.getElementById('stepProgressLine');
  inds.forEach(function (ind, idx) {
    if (!ind) return;
    ind.classList.remove('active', 'completed');
    if (idx + 1 === n) ind.classList.add('active');
    else if (idx + 1 < n) ind.classList.add('completed');
  });
  if (line) line.style.width = (n === 1 ? 0 : n === 2 ? 50 : 100) + '%';
}
function showError(f, e, msg) {
  var F = document.getElementById(f), E = document.getElementById(e);
  if (F) { F.classList.add('form-field-error'); F.classList.remove('field-valid'); }
  if (E) { if (msg) { var s = E.querySelector('span'); if (s) s.textContent = msg; } E.classList.add('show'); }
}
function clearError(f, e) {
  var F = document.getElementById(f), E = document.getElementById(e);
  if (F) { F.classList.remove('form-field-error'); F.classList.add('field-valid'); }
  if (E) E.classList.remove('show');
}
function validateCheckoutForm() {
  var ok = true;
  var n = document.getElementById('newCustName');
  if (n && n.value.trim().length >= 2) clearError('newCustName', 'newErrName');
  else { if (n && n.value.trim().length > 0) showError('newCustName', 'newErrName', 'Minimal 2 karakter'); ok = false; }
  var ph = document.getElementById('newCustPhone'), pc = ph ? ph.value.replace(/\D/g, '') : '';
  if (pc && /^8[1-9]\d{6,11}$/.test(pc)) clearError('newCustPhone', 'newErrPhone');
  else { if (pc) showError('newCustPhone', 'newErrPhone', 'Nomor tidak valid'); ok = false; }
  var al = document.getElementById('newAlamat');
  if (al && al.value.trim().length >= 20) clearError('newAlamat', 'newErrAlamat');
  else { if (al && al.value.trim().length > 0) showError('newAlamat', 'newErrAlamat', 'Minimal 20 karakter'); ok = false; }
  ['newProvinsi', 'newKota', 'newKecamatan', 'newKelurahan', 'newKodePos', 'newEkspedisi', 'newMetode', 'newAdmin'].forEach(function (id) {
    var el = document.getElementById(id); if (!el || !el.value.trim()) ok = false;
  });
  var btn = document.getElementById('finalCheckoutBtn');
  if (btn) { if (ok) btn.removeAttribute('disabled'); else btn.setAttribute('disabled', 'true'); }
  return ok;
}
window.submitOrder = function () {
  if (!validateCheckoutForm()) { showToast('Lengkapi formulir dengan benar', 'error'); return; }
  var g = function (id) { return document.getElementById(id); };
  var btn = g('finalCheckoutBtn'), btnText = g('finalBtnText'), btnIcon = g('finalBtnIcon');
  btn.classList.add('checkout-btn-loading'); btnText.textContent = 'Memproses'; btnIcon.style.display = 'none';
  setTimeout(function () {
    btn.classList.remove('checkout-btn-loading'); btn.classList.add('checkout-success');
    btnText.textContent = 'Membuka WhatsApp'; btnIcon.innerHTML = svgIcon('check'); btnIcon.style.display = '';
    var total = cart.reduce(function (s, i) { return s + i.qty; }, 0);
    var r2 = cart.filter(function (i) { return i.category === 'r2'; });
    var resmi = cart.filter(function (i) { return i.category === 'resmi'; });
    var addr = g('newAlamat').value.trim() + ' (Patokan: ' + (g('newPatokan').value.trim() || '-') + ')\nKel: ' + g('newKelurahan').value.trim() + ', Kec: ' + g('newKecamatan').value.trim() + '\n' + g('newKota').value.trim() + ', ' + g('newProvinsi').value.trim() + ' — ' + g('newKodePos').value.trim();
    var m = '*ORDER R2 NUSANTARA — ENTERPRISE*\n\n';
    m += '*Nama:* ' + g('newCustName').value.trim() + '\n';
    m += '*No. HP:* +62 ' + g('newCustPhone').value.trim() + '\n';
    m += '*Alamat Pengiriman:*\n' + addr + '\n\n';
    m += '*Ekspedisi:* ' + g('newEkspedisi').value + '\n';
    m += '*Pembayaran:* ' + g('newMetode').value + '\n\n';
    if (r2.length) { m += '*— KATALOG R2 —*\n'; r2.forEach(function (i) { m += '/ ' + i.name + ' — ' + i.qty + ' slop\n'; }); m += '\n'; }
    if (resmi.length) { m += '*— KATALOG RESMI —*\n'; resmi.forEach(function (i) { m += '/ ' + i.name + ' — ' + i.qty + ' slop\n'; }); m += '\n'; }
    m += '*Total Order:* ' + total + ' Slop\n';
    m += '*Status Ongkir:* ' + (total >= 20 ? 'Gratis Ongkir' : 'Reguler');
    setTimeout(function () {
      window.open('https://wa.me/' + g('newAdmin').value + '?text=' + encodeURIComponent(m), '_blank');
      cart = []; window.__cart = cart; saveCart(); updateCartUI(); closeCheckoutModal();
      var f = document.getElementById('checkoutFormFull'); if (f) f.reset();
      btn.classList.remove('checkout-success'); btnText.textContent = 'Konfirmasi Pesanan'; btnIcon.innerHTML = svgIcon('wa'); btnIcon.style.display = '';
      document.querySelectorAll('#checkoutFormFull .field-valid').forEach(function (el) { el.classList.remove('field-valid'); });
      validateCheckoutForm(); showToast('Pesanan berhasil dilanjutkan');
    }, 800);
  }, 1500);
};

/* ============ 17. REVIEW ============ */
window.openReviewModal = function () {
  var o = document.getElementById('reviewModalOverlay'), m = document.getElementById('reviewModal');
  if (o) { o.classList.remove('hidden'); setTimeout(function () { o.classList.add('overlay-enter'); }, 10); }
  if (m) setTimeout(function () { m.classList.add('modal-enter'); }, 10);
  document.body.style.overflow = 'hidden';
};
window.closeReviewModal = function () {
  var o = document.getElementById('reviewModalOverlay'), m = document.getElementById('reviewModal');
  if (o) o.classList.remove('overlay-enter');
  if (m) m.classList.remove('modal-enter');
  setTimeout(function () { if (o) o.classList.add('hidden'); }, 350);
  document.body.style.overflow = '';
  setTimeout(function () { var f = document.getElementById('reviewForm'); if (f) f.reset(); setRating(5); }, 300);
};
window.setRating = function (v) {
  var r = document.getElementById('reviewRating'); if (r) r.value = v;
  document.querySelectorAll('#starRatingSelector i').forEach(function (s) {
    if (parseInt(s.getAttribute('data-rating'), 10) <= v) s.classList.add('on');
    else s.classList.remove('on');
  });
};
window.submitReview = function () {
  var btn = document.getElementById('submitReviewBtn');
  var name = document.getElementById('reviewName').value, store = document.getElementById('reviewStore').value, text = document.getElementById('reviewText').value, rating = document.getElementById('reviewRating').value;
  btn.innerHTML = 'Memproses…'; btn.classList.add('opacity-80', 'pointer-events-none');
  setTimeout(function () {
    var stars = ''; for (var i = 0; i < 5; i++) stars += i < rating ? '<svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6z"/></svg>' : '<svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" style="opacity:.22"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6z"/></svg>';
    var card = document.createElement('div');
    card.className = 't-card';
    card.innerHTML = '<div class="t-quote">“</div><p>' + escapeHtml(text) + '</p>' +
      '<div class="t-person"><span class="avatar ag-1">' + escapeHtml(name.charAt(0).toUpperCase()) + '</span><div><b>' + escapeHtml(name) + '</b><small>' + escapeHtml(store || 'Mitra R2 Nusantara') + '</small></div></div>' +
      '<div class="t-foot"><span>Baru saja</span><span style="color:rgba(242,233,220,.4);font-weight:600">Pending Review</span></div>';
    var slider = document.getElementById('testimonialSlider');
    if (slider) { slider.insertBefore(card, slider.firstChild); slider.scrollTo({ left: 0, behavior: 'smooth' }); }
    showToast('Terima kasih — ulasan Anda berhasil dikirim.');
    closeReviewModal();
    btn.innerHTML = 'Kirim Ulasan'; btn.classList.remove('opacity-80', 'pointer-events-none');
  }, 1000);
};

/* ============ 18. NEWSLETTER / CLEAR SEARCH ============ */
window.handleNewsletterSubmit = function (form) {
  var input = form.querySelector('input[type="email"]');
  if (input && input.value) { showToast('Terima kasih — Anda berlangganan newsletter.'); input.value = ''; }
};
window.clearSearch = function () {
  var si = document.getElementById('searchInput'), cb = document.getElementById('clearSearchBtn'), sb = document.getElementById('searchSuggestions');
  if (si) si.value = ''; searchTerm = ''; currentPage = 1;
  if (cb) cb.classList.add('hidden');
  if (sb) sb.classList.add('hidden');
  renderProductDisplay(); if (si) si.focus();
};

/* ============ 19. INISIALISASI ============ */
document.addEventListener('DOMContentLoaded', function () {
  injectIcons();
  var loader = document.getElementById('loader');
  if (loader) { setTimeout(function () { loader.style.opacity = '0'; setTimeout(function () { loader.style.display = 'none'; }, 700); }, 600); }

  try { if (localStorage.getItem('r2_dark_mode') === 'true') document.documentElement.classList.add('dark'); } catch (e) {}
  var di = document.getElementById('darkModeIcon');
  if (di) { var dark = document.documentElement.classList.contains('dark'); di.innerHTML = svgIcon(dark ? 'sun' : 'moon'); }

  initAgeGate();
  initCursor();
  initMagnetic();
  initHeroParallax();
  initVisitorCounter();
  initTextAnimations();
  updateWishlistUI();
  buildFilterChips();
  updateCatalogInfoBanner();
  renderProductDisplay();
  updateCartUI();
  initReveal();

  var cr = document.getElementById('countR2'), cre = document.getElementById('countResmi'), tc = document.getElementById('totalBrandCount'), tr2 = document.getElementById('tabCountR2'), tre = document.getElementById('tabCountResmi');
  if (cr) cr.textContent = productsR2.length;
  if (cre) cre.textContent = productsResmi.length;
  if (tc) tc.textContent = allProducts.length;
  if (tr2) tr2.textContent = productsR2.length;
  if (tre) tre.textContent = productsResmi.length;

  // rating ringkasan testimoni
  var tss = document.getElementById('tStarsSummary');
  if (tss) { var sh = ''; for (var si2 = 0; si2 < 5; si2++) sh += '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.5 6.1 20.6l1.2-6.5L2.5 9.5l6.6-.9L12 2.6z"/></svg>'; tss.innerHTML = sh; }

  var cObs = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { animateCounter(en.target); cObs.unobserve(en.target); } }); }, { threshold: 0.5 });
  document.querySelectorAll('.stat-counter').forEach(function (el) { cObs.observe(el); });
  var cy = document.getElementById('copyrightYear'); if (cy) cy.textContent = new Date().getFullYear();

  var CIRC = 113.1;
  window.addEventListener('scroll', function () {
    var h = document.getElementById('header'), btt = document.getElementById('backToTop');
    if (h) h.classList.toggle('scrolled', window.scrollY > 40);
    if (btt) btt.classList.toggle('visible', window.scrollY > 500);
    var w = document.getElementById('scrollProgress'), c = document.getElementById('scrollCircle'), l = document.getElementById('scrollPercent');
    if (w && c && l) {
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      var pct = dh > 0 ? Math.min(Math.max(window.scrollY / dh, 0), 1) : 0;
      c.style.strokeDashoffset = CIRC * (1 - pct);
      l.textContent = Math.round(pct * 100) + '%';
      w.style.opacity = window.scrollY > 400 ? '1' : '0';
    }
  });

  // Search + suggestions
  var si = document.getElementById('searchInput'), sb = document.getElementById('searchSuggestions');
  if (si) {
    var cb = document.getElementById('clearSearchBtn'), timer;
    si.addEventListener('input', function (e) {
      if (cb) cb.classList.toggle('hidden', e.target.value.length === 0);
      clearTimeout(timer);
      var q = e.target.value.toLowerCase().trim();
      timer = setTimeout(function () {
        searchTerm = q; currentPage = 1; renderProductDisplay();
        if (!sb) return;
        if (q.length < 2) { sb.classList.add('hidden'); return; }
        var matches = allProducts.filter(function (p) { return p.name.toLowerCase().indexOf(q) !== -1; }).slice(0, 6);
        if (matches.length) {
          sb.innerHTML = matches.map(function (p) {
            var sq = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            var hl = p.name.replace(new RegExp(sq, 'gi'), function (m) { return '<span class="hl">' + m + '</span>'; });
            return '<div class="suggest-row" data-suggest-id="' + p.id + '">' + svgIcon('search') + '<div><div class="sn">' + hl + '</div><div class="sp">' + formatRupiah(p.price) + '</div></div></div>';
          }).join('');
          sb.classList.remove('hidden');
        } else sb.classList.add('hidden');
      }, 220);
    });
    if (sb) {
      sb.addEventListener('click', function (e) {
        var row = e.target.closest('[data-suggest-id]'); if (!row) return;
        var p = allProducts.find(function (x) { return x.id === row.getAttribute('data-suggest-id'); });
        if (p) { si.value = p.name; searchTerm = p.name.toLowerCase(); if (p.category !== activeCatalog) window.switchCatalog(p.category); currentPage = 1; renderProductDisplay(); }
        sb.classList.add('hidden');
      });
      document.addEventListener('click', function (e) { if (!si.contains(e.target) && !sb.contains(e.target)) sb.classList.add('hidden'); });
    }
  }

  // Checkout form wiring
  var inputs = document.querySelectorAll('#checkoutFormFull input, #checkoutFormFull textarea, #checkoutFormFull select');
  inputs.forEach(function (input, index) {
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') { e.preventDefault(); if (index < inputs.length - 1) inputs[index + 1].focus(); } });
    input.addEventListener('focus', function () { var sg = input.closest('[data-step]'); if (sg) updateProgressStep(parseInt(sg.getAttribute('data-step'), 10)); });
    input.addEventListener('input', validateCheckoutForm);
    input.addEventListener('change', validateCheckoutForm);
    input.addEventListener('blur', validateCheckoutForm);
  });
  var phone = document.getElementById('newCustPhone');
  if (phone) phone.addEventListener('input', function (e) {
    var v = e.target.value.replace(/\D/g, '');
    if (v.startsWith('62')) v = v.substring(2);
    if (v.startsWith('0')) v = v.substring(1);
    var m = v.match(/(\d{0,3})(\d{0,4})(\d{0,5})/);
    if (m) e.target.value = (!m[2] ? m[1] : m[1] + ' ' + m[2] + (m[3] ? ' ' + m[3] : '')).substring(0, 15);
    else e.target.value = v;
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var m = document.getElementById('checkoutModal'), r = document.getElementById('reviewModal'), q = document.getElementById('quickViewModal');
    if (m && m.classList.contains('modal-enter')) closeCheckoutModal();
    if (r && r.classList.contains('modal-enter')) closeReviewModal();
    if (q && q.classList.contains('modal-enter')) closeQuickView();
  });
  var mm = document.getElementById('mobileMenu');
  if (mm) mm.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMobileMenu); });

  // Testimonial slider
  var slider = document.getElementById('testimonialSlider'), prev = document.getElementById('sliderPrevBtn'), next = document.getElementById('sliderNextBtn');
  if (slider && prev && next) {
    var isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', function (e) { isDown = true; slider.style.scrollSnapType = 'none'; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
    slider.addEventListener('mouseleave', function () { isDown = false; slider.style.scrollSnapType = 'x mandatory'; });
    slider.addEventListener('mouseup', function () { isDown = false; slider.style.scrollSnapType = 'x mandatory'; });
    slider.addEventListener('mousemove', function (e) { if (!isDown) return; e.preventDefault(); var x = e.pageX - slider.offsetLeft; slider.scrollLeft = scrollLeft - (x - startX) * 2; });
    function amt() { var c = slider.querySelector('.t-card'); return c ? c.offsetWidth + 20 : 380; }
    next.addEventListener('click', function () { slider.scrollBy({ left: amt(), behavior: 'smooth' }); });
    prev.addEventListener('click', function () { slider.scrollBy({ left: -amt(), behavior: 'smooth' }); });
    var auto = setInterval(function () {
      if (!isDown) {
        if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10) slider.scrollTo({ left: 0, behavior: 'smooth' });
        else slider.scrollBy({ left: amt(), behavior: 'smooth' });
      }
    }, 4200);
    slider.addEventListener('mouseenter', function () { clearInterval(auto); });
  }
  validateCheckoutForm();
});
})();