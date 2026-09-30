// ============================================================
// ÜBERSETZUNGEN
// ============================================================
const TRANSLATIONS = {
  de: {
    heroTitle: '🖨️ 3D-Druck aus Pregartsdorf',
    heroSub: 'Handgefertigte 3D-Drucke · Druckzeit 1–7 Stunden · Versand in ganz Europa',
    search: '🔍 Produkte suchen...',
    allCategories: 'Alle Kategorien',
    sortNew: '🆕 Neueste',
    sortPriceAsc: '💶 Preis aufsteigend',
    sortPriceDesc: '💶 Preis absteigend',
    sortTimeAsc: '⏱️ Kürzeste Druckzeit',
    sortTimeDesc: '⏱️ Längste Druckzeit',
    cart: 'Warenkorb',
    cartEmpty: 'Dein Warenkorb ist leer',
    subtotal: 'Zwischensumme',
    shipping: 'Versand',
    total: 'Gesamt',
    checkout: 'Zur Kasse',
    addToCart: 'In den Warenkorb',
    druckzeit: 'Druckzeit',
    price: 'Preis',
    material: 'Material',
    color: 'Farbe',
    category: 'Kategorie',
    description: 'Beschreibung',
    uploadTitle: '📤 Eigenes 3D-Modell hochladen',
    uploadSub: 'Lade deine STL, OBJ oder 3MF Datei hoch (max. 50 MB)',
    file: 'Deine Datei',
    message: 'Nachricht / Wünsche',
    contact: 'Kontakt (E-Mail oder Telefon)',
    uploadBtn: '📤 Hochladen & anfragen',
    ordersTitle: '📦 Meine Bestellungen',
    orderNumber: 'Bestellnummer',
    orderLookup: '🔍 Suchen',
    infoTitle: 'ℹ️ Info & Versand',
    payTitle: '💳 Bezahlung',
    payText: 'Nach der Bestellung bekommst du meine IBAN. Bitte überweise den Betrag innerhalb von 3 Tagen.',
    iban: 'IBAN',
    bic: 'BIC',
    owner: 'Inhaber',
    shipTitle: '🚚 Versand (Europa)',
    printTime: '⏱️ Druckzeit',
    contactTitle: '📧 Kontakt',
    checkoutTitle: '💳 Bestellung abschließen',
    yourData: 'Deine Daten',
    name: 'Name',
    email: 'E-Mail',
    phone: 'Telefon',
    address: 'Straße & Hausnummer',
    zip: 'PLZ',
    city: 'Stadt',
    country: 'Land',
    orderSummary: 'Bestellübersicht',
    confirmOrder: '✅ Bestellung abschicken',
    thankYou: '🎉 Danke für deine Bestellung!',
    orderConfirmed: 'Bestellung bestätigt!',
    payInstructions: 'Bitte überweise den Betrag auf folgendes Konto:',
    afterPayment: 'Nach Zahlungseingang wird deine Bestellung gedruckt und versandt.',
    close: 'Schließen',
    productAdded: 'Zum Warenkorb hinzugefügt',
    orderSent: 'Bestellung erfolgreich abgeschickt!',
    errorOrder: 'Fehler beim Senden der Bestellung',
    errorUpload: 'Fehler beim Upload',
    uploadOk: 'Upload erfolgreich! Ich melde mich bald.',
    orderNotFound: 'Bestellung nicht gefunden',
    druckzeitLabel: 'Druckzeit'
  },
  en: {
    heroTitle: '🖨️ 3D Printing from Pregartsdorf',
    heroSub: 'Handcrafted 3D prints · Print time 1–7 hours · Shipping all over Europe',
    search: '🔍 Search products...',
    allCategories: 'All categories',
    sortNew: '🆕 Newest',
    sortPriceAsc: '💶 Price ascending',
    sortPriceDesc: '💶 Price descending',
    sortTimeAsc: '⏱️ Shortest print time',
    sortTimeDesc: '⏱️ Longest print time',
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    total: 'Total',
    checkout: 'Checkout',
    addToCart: 'Add to cart',
    druckzeit: 'Print time',
    price: 'Price',
    material: 'Material',
    color: 'Color',
    category: 'Category',
    description: 'Description',
    uploadTitle: '📤 Upload your own 3D model',
    uploadSub: 'Upload your STL, OBJ or 3MF file (max. 50 MB)',
    file: 'Your file',
    message: 'Message / Wishes',
    contact: 'Contact (email or phone)',
    uploadBtn: '📤 Upload & request',
    ordersTitle: '📦 My orders',
    orderNumber: 'Order number',
    orderLookup: '🔍 Search',
    infoTitle: 'ℹ️ Info & Shipping',
    payTitle: '💳 Payment',
    payText: 'After ordering you get my IBAN. Please transfer within 3 days.',
    iban: 'IBAN',
    bic: 'BIC',
    owner: 'Owner',
    shipTitle: '🚚 Shipping (Europe)',
    printTime: '⏱️ Print time',
    contactTitle: '📧 Contact',
    checkoutTitle: '💳 Complete order',
    yourData: 'Your data',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    address: 'Street & number',
    zip: 'ZIP',
    city: 'City',
    country: 'Country',
    orderSummary: 'Order summary',
    confirmOrder: '✅ Place order',
    thankYou: '🎉 Thank you for your order!',
    orderConfirmed: 'Order confirmed!',
    payInstructions: 'Please transfer the amount to:',
    afterPayment: 'After payment I will print and ship your order.',
    close: 'Close',
    productAdded: 'Added to cart',
    orderSent: 'Order sent successfully!',
    errorOrder: 'Error sending order',
    errorUpload: 'Upload error',
    uploadOk: 'Upload successful! I will contact you soon.',
    orderNotFound: 'Order not found',
    druckzeitLabel: 'Print time'
  },
  fr: {
    heroTitle: '🖨️ Impression 3D de Pregartsdorf',
    heroSub: 'Impressions 3D artisanales · Temps 1–7 heures · Livraison en Europe',
    search: '🔍 Rechercher...',
    allCategories: 'Toutes catégories',
    cart: 'Panier',
    cartEmpty: 'Votre panier est vide',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    total: 'Total',
    checkout: 'Commander',
    addToCart: 'Ajouter au panier',
    druckzeit: 'Temps d\'impression',
    price: 'Prix',
    material: 'Matériau',
    color: 'Couleur',
    category: 'Catégorie',
    description: 'Description',
    uploadTitle: '📤 Télécharger votre modèle 3D',
    ordersTitle: '📦 Mes commandes',
    infoTitle: 'ℹ️ Info & Livraison',
    close: 'Fermer',
    productAdded: 'Ajouté au panier'
  },
  it: {
    heroTitle: '🖨️ Stampa 3D da Pregartsdorf',
    heroSub: 'Stampe 3D artigianali · Tempo 1–7 ore · Spedizione in Europa',
    search: '🔍 Cerca...',
    allCategories: 'Tutte le categorie',
    cart: 'Carrello',
    cartEmpty: 'Il carrello è vuoto',
    subtotal: 'Subtotale',
    shipping: 'Spedizione',
    total: 'Totale',
    checkout: 'Ordina',
    addToCart: 'Aggiungi al carrello',
    druckzeit: 'Tempo di stampa',
    price: 'Prezzo',
    material: 'Materiale',
    color: 'Colore',
    category: 'Categoria',
    description: 'Descrizione',
    close: 'Chiudi',
    productAdded: 'Aggiunto al carrello'
  },
  es: {
    heroTitle: '🖨️ Impresión 3D desde Pregartsdorf',
    heroSub: 'Impresiones 3D artesanales · Tiempo 1–7 horas · Envío a toda Europa',
    search: '🔍 Buscar...',
    allCategories: 'Todas las categorías',
    cart: 'Carrito',
    cartEmpty: 'Tu carrito está vacío',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    total: 'Total',
    checkout: 'Pedir',
    addToCart: 'Añadir al carrito',
    druckzeit: 'Tiempo de impresión',
    price: 'Precio',
    material: 'Material',
    color: 'Color',
    category: 'Categoría',
    description: 'Descripción',
    close: 'Cerrar',
    productAdded: 'Añadido al carrito'
  },
  pt: {
    heroTitle: '🖨️ Impressão 3D de Pregartsdorf',
    heroSub: 'Impressões 3D artesanais · Tempo 1–7 horas · Envio para toda a Europa',
    search: '🔍 Procurar...',
    allCategories: 'Todas categorias',
    cart: 'Carrinho',
    cartEmpty: 'O carrinho está vazio',
    subtotal: 'Subtotal',
    shipping: 'Envio',
    total: 'Total',
    checkout: 'Finalizar',
    addToCart: 'Adicionar',
    close: 'Fechar',
    productAdded: 'Adicionado ao carrinho'
  },
  nl: {
    heroTitle: '🖨️ 3D-printen uit Pregartsdorf',
    heroSub: 'Handgemaakte 3D-prints · 1–7 uur · Verzending door heel Europa',
    search: '🔍 Zoeken...',
    allCategories: 'Alle categorieën',
    cart: 'Winkelwagen',
    cartEmpty: 'Je winkelwagen is leeg',
    subtotal: 'Subtotaal',
    shipping: 'Verzending',
    total: 'Totaal',
    checkout: 'Afrekenen',
    addToCart: 'Toevoegen',
    close: 'Sluiten',
    productAdded: 'Toegevoegd'
  },
  pl: {
    heroTitle: '🖨️ Druk 3D z Pregartsdorf',
    heroSub: 'Ręcznie robione wydruki 3D · Czas 1–7 godzin · Wysyłka do całej Europy',
    search: '🔍 Szukaj...',
    allCategories: 'Wszystkie kategorie',
    cart: 'Koszyk',
    cartEmpty: 'Koszyk jest pusty',
    subtotal: 'Suma częściowa',
    shipping: 'Wysyłka',
    total: 'Razem',
    checkout: 'Zamów',
    addToCart: 'Dodaj',
    close: 'Zamknij',
    productAdded: 'Dodano do koszyka'
  }
};

// ============================================================
// VERSANDKOSTEN (nach Land)
// ============================================================
const SHIPPING_COSTS = {
  AT: 4.90, DE: 6.90,
  FR: 9.90, IT: 9.90, ES: 9.90, NL: 9.90, BE: 9.90, PL: 9.90,
  CZ: 9.90, SK: 9.90, HU: 9.90, SI: 9.90, HR: 9.90, RO: 9.90, BG: 9.90,
  GR: 9.90, PT: 9.90, IE: 9.90, DK: 9.90, SE: 9.90, FI: 9.90, EE: 9.90,
  LV: 9.90, LT: 9.90, LU: 9.90, MT: 9.90, CY: 9.90,
  CH: 14.90, GB: 14.90, NO: 14.90, IS: 14.90, LI: 14.90, MC: 14.90,
  AD: 14.90, SM: 14.90, VA: 14.90
};

const COUNTRY_NAMES = {
  AT: '🇦🇹 Österreich', DE: '🇩🇪 Deutschland',
  FR: '🇫🇷 Frankreich', IT: '🇮🇹 Italien', ES: '🇪🇸 Spanien',
  NL: '🇳🇱 Niederlande', BE: '🇧🇪 Belgien', PL: '🇵🇱 Polen',
  CZ: '🇨🇿 Tschechien', SK: '🇸🇰 Slowakei', HU: '🇭🇺 Ungarn',
  SI: '🇸🇮 Slowenien', HR: '🇭🇷 Kroatien', RO: '🇷🇴 Rumänien',
  BG: '🇧🇬 Bulgarien', GR: '🇬🇷 Griechenland', PT: '🇵🇹 Portugal',
  IE: '🇮🇪 Irland', DK: '🇩🇰 Dänemark', SE: '🇸🇪 Schweden',
  FI: '🇫🇮 Finnland', EE: '🇪🇪 Estland', LV: '🇱🇻 Lettland',
  LT: '🇱🇹 Litauen', LU: '🇱🇺 Luxemburg', MT: '🇲🇹 Malta', CY: '🇨🇾 Zypern',
  CH: '🇨🇭 Schweiz', GB: '🇬🇧 Großbritannien', NO: '🇳🇴 Norwegen',
  IS: '🇮🇸 Island', LI: '🇱🇮 Liechtenstein', MC: '🇲🇨 Monaco'
};

// ============================================================
// STATE
// ============================================================
let products = [];
let info = {};
let cart = JSON.parse(localStorage.getItem('kris_prints_cart') || '[]');
let currentLang = localStorage.getItem('kris_prints_lang') || 'de';
let currentCategory = '';
let currentSort = 'new';
let currentSearch = '';

const $ = (id) => document.getElementById(id);

// ============================================================
// HILFSFUNKTIONEN
// ============================================================
function t(key) {
  return TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.de[key] || key;
}

function saveCart() {
  localStorage.setItem('kris_prints_cart', JSON.stringify(cart));
}

function formatPrice(n) {
  return n.toFixed(2).replace('.', ',') + ' €';
}

function showToast(msg, type = '') {
  const t = document.createElement('div');
  t.className = 'toast show ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 400);
  }, 2600);
}

// ============================================================
// SPRACHE
// ============================================================
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kris_prints_lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  renderProducts();
}

function applyTranslations() {
  $('hero-title').textContent = t('heroTitle');
  $('hero-sub').textContent = t('heroSub');
  $('search').placeholder = t('search');
  $('tab-custom').textContent = '📤 ' + (t('uploadTitle').replace('📤 ', ''));
  $('tab-orders').textContent = t('ordersTitle');
  $('tab-info').textContent = t('infoTitle');
  // Filter-Sort Optionen neu übersetzen
  const sortSel = $('filter-sort');
  sortSel.options[0].text = t('sortNew');
  sortSel.options[1].text = t('sortPriceAsc');
  sortSel.options[2].text = t('sortPriceDesc');
  sortSel.options[3].text = t('sortTimeAsc');
  sortSel.options[4].text = t('sortTimeDesc');
  // Warenkorb-UI
  document.querySelector('.cart-header h2').textContent = '🛒 ' + t('cart');
  document.querySelector('.checkout-btn').textContent = t('checkout');
  document.querySelector('.cart-total-row:nth-child(1) span').textContent = t('subtotal') + ':';
  document.querySelector('.cart-total-row:nth-child(2) span').textContent = t('shipping') + ':';
  document.querySelector('.cart-total-row.big span').textContent = t('total') + ':';
  // Kategorie-Filter
  const catSel = $('filter-category');
  catSel.options[0].text = t('allCategories');
}

// ============================================================
// PRODUKTE LADEN
// ============================================================
async function loadProducts() {
  try {
    const res = await fetch('/api/products');
    products = await res.json();
    renderProducts();
    buildCategoryFilter();
  } catch (e) {
    console.error('Produkte:', e);
    showToast('Fehler beim Laden der Produkte', 'err');
  }
}

async function loadInfo() {
  try {
    const res = await fetch('/api/info');
    info = await res.json();
    $('info-iban').textContent = info.iban || 'AT00 0000 0000 0000 0000';
    $('info-bic').textContent = info.bic || 'XXXXATWW';
    $('info-owner').textContent = info.owner || 'Kris Oberreiter';
    $('info-email').textContent = info.email || 'kris@example.com';
  } catch (e) {
    console.error('Info:', e);
  }
}

// ============================================================
// KATEGORIEN
// ============================================================
function buildCategoryFilter() {
  const cats = [...new Set(products.map(p => p.category).filter(Boolean))].sort();
  const sel = $('filter-category');
  sel.innerHTML = '<option value="">' + t('allCategories') + '</option>';
  cats.forEach(c => {
    const o = document.createElement('option');
    o.value = c;
    o.textContent = c;
    sel.appendChild(o);
  });
}

// ============================================================
// PRODUKTE RENDERN
// ============================================================
function renderProducts() {
  let list = [...products];

  if (currentCategory) list = list.filter(p => p.category === currentCategory);

  if (currentSearch) {
    const q = currentSearch.toLowerCase();
    list = list.filter(p =>
      (p.name || '').toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q)
    );
  }

  list.sort((a, b) => {
    switch (currentSort) {
      case 'price-asc': return (a.price || 0) - (b.price || 0);
      case 'price-desc': return (b.price || 0) - (a.price || 0);
      case 'time-asc': return (a.printTime || 0) - (b.printTime || 0);
      case 'time-desc': return (b.printTime || 0) - (a.printTime || 0);
      default: return (b.createdAt || 0) - (a.createdAt || 0);
    }
  });

  const grid = $('products-grid');
  grid.innerHTML = '';

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--text-dim)">
        <div style="font-size:4rem;margin-bottom:16px;opacity:.5">🖨️</div>
        <h3 style="color:#fff;margin-bottom:8px">Keine Produkte gefunden</h3>
        <p>Versuch es mit anderen Filtern.</p>
      </div>
    `;
    return;
  }

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        ${p.image ? `<img src="${p.image}" alt="${p.name}" onerror="this.parentElement.innerHTML='${p.emoji || '🖨️'}'">` : (p.emoji || '🖨️')}
        <div class="product-time-badge">⏱️ ${p.printTime || 1} h</div>
      </div>
      <div class="product-body">
        ${p.category ? `<div class="product-category">${p.category}</div>` : ''}
        <div class="product-title">${escapeHtml(p.name)}</div>
        <div class="product-desc">${escapeHtml(p.description || '')}</div>
        <div class="product-footer">
          <div class="product-price">${formatPrice(p.price || 0)}</div>
          <button class="add-cart-btn" title="In den Warenkorb">+</button>
        </div>
      </div>
    `;
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-cart-btn')) return;
      openProductDetail(p);
    });
    card.querySelector('.add-cart-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(p);
    });
    grid.appendChild(card);
  });
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ============================================================
// WARENKORB
// ============================================================
function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      emoji: product.emoji,
      image: product.image,
      printTime: product.printTime,
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  showToast('✅ ' + t('productAdded'), 'ok');
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else { saveCart(); updateCartUI(); }
}

function cartSubtotal() {
  return cart.reduce((s, i) => s + (i.price * i.qty), 0);
}

function updateCartUI() {
  const badge = $('cart-badge');
  const count = cart.reduce((s, i) => s + i.qty, 0);
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';

  const items = $('cart-items');
  if (cart.length === 0) {
    items.innerHTML = `
      <div class="cart-empty">
        <div class="big">🛒</div>
        <p>${t('cartEmpty')}</p>
      </div>
    `;
  } else {
    items.innerHTML = cart.map(i => `
      <div class="cart-item">
        <div class="cart-item-img">${i.image ? `<img src="${i.image}" onerror="this.parentElement.innerHTML='${i.emoji||'🖨️'}'">` : (i.emoji || '🖨️')}</div>
        <div class="cart-item-info">
          <div class="cart-item-title">${escapeHtml(i.name)}</div>
          <div class="cart-item-price">${formatPrice(i.price)}</div>
          <div class="cart-item-qty">
            <button onclick="updateQty('${i.id}', -1)">−</button>
            <span>${i.qty}</span>
            <button onclick="updateQty('${i.id}', 1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart('${i.id}')">✕</button>
      </div>
    `).join('');
  }

  const sub = cartSubtotal();
  const ship = calcShipping();
  $('cart-subtotal').textContent = formatPrice(sub);
  $('cart-shipping').textContent = cart.length > 0 ? formatPrice(ship) : '—';
  $('cart-total').textContent = formatPrice(sub + (cart.length > 0 ? ship : 0));
}

function calcShipping(country = 'AT') {
  return SHIPPING_COSTS[country] || 9.90;
}

// ============================================================
// PRODUKT-DETAIL
// ============================================================
function openProductDetail(p) {
  const modal = $('modal');
  $('modal-content').innerHTML = `
    <div class="detail-header">
      <div class="detail-image">
        ${p.image ? `<img src="${p.image}" onerror="this.parentElement.innerHTML='${p.emoji || '🖨️'}'">` : (p.emoji || '🖨️')}
      </div>
      <div class="detail-info">
        <h2>${escapeHtml(p.name)}</h2>
        <div class="detail-price">${formatPrice(p.price || 0)}</div>
        <div class="detail-meta">
          <span class="meta-chip">⏱️ ${p.printTime || 1} h ${t('druckzeit')}</span>
          ${p.material ? `<span class="meta-chip">🧱 ${escapeHtml(p.material)}</span>` : ''}
          ${p.color ? `<span class="meta-chip">🎨 ${escapeHtml(p.color)}</span>` : ''}
          ${p.category ? `<span class="meta-chip">📁 ${escapeHtml(p.category)}</span>` : ''}
        </div>
      </div>
    </div>

    ${p.description ? `
      <div class="detail-section">
        <h3>📝 ${t('description')}</h3>
        <p>${escapeHtml(p.description)}</p>
      </div>
    ` : ''}

    <div style="display:flex;gap:10px;margin-top:20px">
      <button class="btn secondary" onclick="closeModal()">${t('close')}</button>
      <button class="btn" style="flex:1" onclick='addToCartAndClose(${JSON.stringify(p).replace(/'/g, "&#39;")})'>🛒 ${t('addToCart')}</button>
    </div>
  `;
  modal.classList.add('open');
}

function addToCartAndClose(p) {
  addToCart(p);
  closeModal();
}

function closeModal() {
  $('modal').classList.remove('open');
}

// ============================================================
// CHECKOUT
// ============================================================
function openCheckout() {
  if (cart.length === 0) { showToast('Warenkorb ist leer', 'err'); return; }
  const sub = cartSubtotal();

  const countryOptions = Object.entries(COUNTRY_NAMES)
    .map(([code, name]) => `<option value="${code}" ${code === 'AT' ? 'selected' : ''}>${name}</option>`)
    .join('');

  $('modal-content').innerHTML = `
    <h2>${t('checkoutTitle')}</h2>

    <div class="order-summary">
      <h3>${t('orderSummary')}</h3>
      ${cart.map(i => `
        <div class="order-line"><span>${i.qty}× ${escapeHtml(i.name)}</span><span>${formatPrice(i.price * i.qty)}</span></div>
      `).join('')}
      <div class="order-line"><span>${t('subtotal')}</span><span>${formatPrice(sub)}</span></div>
      <div class="order-line"><span>${t('shipping')}</span><span id="checkout-shipping">${formatPrice(calcShipping('AT'))}</span></div>
      <div class="order-line total"><span>${t('total')}</span><span id="checkout-total">${formatPrice(sub + calcShipping('AT'))}</span></div>
    </div>

    <form class="checkout-form" id="checkout-form">
      <div class="form-group">
        <label>${t('name')} *</label>
        <input type="text" id="co-name" required>
      </div>
      <div class="form-group">
        <label>${t('email')} *</label>
        <input type="email" id="co-email" required>
      </div>
      <div class="form-group">
        <label>${t('phone')}</label>
        <input type="tel" id="co-phone">
      </div>
      <div class="form-group">
        <label>${t('address')} *</label>
        <input type="text" id="co-address" required>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>${t('zip')} *</label>
          <input type="text" id="co-zip" required>
        </div>
        <div class="form-group">
          <label>${t('city')} *</label>
          <input type="text" id="co-city" required>
        </div>
      </div>
      <div class="form-group">
        <label>${t('country')} *</label>
        <select id="co-country" required>${countryOptions}</select>
      </div>
      <div style="display:flex;gap:10px">
        <button type="button" class="btn secondary" onclick="closeModal()">${t('close')}</button>
        <button type="submit" class="btn" style="flex:1">${t('confirmOrder')}</button>
      </div>
    </form>
  `;
  $('modal').classList.add('open');

  $('co-country').addEventListener('change', (e) => {
    const ship = calcShipping(e.target.value);
    $('checkout-shipping').textContent = formatPrice(ship);
    $('checkout-total').textContent = formatPrice(cartSubtotal() + ship);
  });

  $('checkout-form').addEventListener('submit', submitOrder);
}

async function submitOrder(e) {
  e.preventDefault();
  const country = $('co-country').value;
  const shipping = calcShipping(country);
  const subtotal = cartSubtotal();

  const order = {
    items: cart,
    subtotal: subtotal,
    shipping: shipping,
    total: subtotal + shipping,
    customer: {
      name: $('co-name').value,
      email: $('co-email').value,
      phone: $('co-phone').value,
      address: $('co-address').value,
      zip: $('co-zip').value,
      city: $('co-city').value,
      country: country
    }
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const data = await res.json();

    if (data.erfolg) {
      const orderId = data.orderId;
      cart = [];
      saveCart();
      updateCartUI();
      showThankYou(orderId, order.total);
    } else {
      showToast(t('errorOrder'), 'err');
    }
  } catch (err) {
    console.error(err);
    showToast(t('errorOrder'), 'err');
  }
}

function showThankYou(orderId, total) {
  $('modal-content').innerHTML = `
    <div style="text-align:center">
      <div style="font-size:4rem;margin-bottom:16px">🎉</div>
      <h2>${t('thankYou')}</h2>
      <p style="color:var(--text-dim);margin:16px 0">
        <strong style="color:var(--accent-2);font-size:1.3rem">${orderId}</strong>
      </p>
      <div class="order-summary" style="text-align:left">
        <h3>${t('payInstructions')}</h3>
        <div class="order-line"><span>${t('iban')}</span><strong style="color:var(--accent-2);font-family:monospace">${info.iban || '—'}</strong></div>
        <div class="order-line"><span>${t('bic')}</span><strong>${info.bic || '—'}</strong></div>
        <div class="order-line"><span>${t('owner')}</span><strong>${info.owner || '—'}</strong></div>
        <div class="order-line total"><span>${t('total')}</span><span>${formatPrice(total)}</span></div>
      </div>
      <p style="color:var(--text-dim);font-size:.9rem;line-height:1.5">${t('afterPayment')}</p>
      <button class="btn" style="margin-top:20px;width:100%" onclick="closeModal()">${t('close')}</button>
    </div>
  `;
}

// ============================================================
// CUSTOM UPLOAD
// ============================================================
async function handleCustomUpload(e) {
  e.preventDefault();
  const fileInput = $('custom-file');
  if (!fileInput.files[0]) return;

  const fd = new FormData();
  fd.append('model', fileInput.files[0]);
  fd.append('message', $('custom-message').value);
  fd.append('contact', $('custom-contact').value);

  const status = $('upload-status');
  status.textContent = '⏳ Wird hochgeladen...';
  status.className = 'upload-status';

  try {
    const res = await fetch('/api/custom-upload', { method: 'POST', body: fd });
    const data = await res.json();
    if (data.erfolg) {
      status.textContent = '✅ ' + t('uploadOk') + ' (ID: ' + data.id + ')';
      status.className = 'upload-status ok';
      $('custom-form').reset();
    } else {
      status.textContent = '❌ ' + t('errorUpload');
      status.className = 'upload-status err';
    }
  } catch (err) {
    console.error(err);
    status.textContent = '❌ ' + t('errorUpload');
    status.className = 'upload-status err';
  }
}

// ============================================================
// BESTELLUNG SUCHEN
// ============================================================
async function lookupOrder() {
  const id = $('order-lookup').value.trim();
  if (!id) return;
  const result = $('order-result');
  result.innerHTML = '⏳ Suche...';

  try {
    const res = await fetch('/api/orders');
    const orders = await res.json();
    const order = orders.find(o => o.id.toLowerCase() === id.toLowerCase());
    if (order) {
  result.innerHTML = `
    <div class="order-summary" style="margin-top:16px">
      <h3>📦 ${order.id}</h3>
      <div class="order-line"><span>Status:</span><strong style="color:var(--accent-2)">${order.status || 'neu'}</strong></div>
      <div class="order-line"><span>Datum:</span><span>${new Date(order.createdAt).toLocaleString('de-DE')}</span></div>
      <div class="order-line"><span>Gesamt:</span><strong>${formatPrice(order.total)}</strong></div>
      ${order.items.map(i => `<div class="order-line"><span>${i.qty}× ${escapeHtml(i.name)}</span><span>${formatPrice(i.price * i.qty)}</span></div>`).join('')}
    </div>
  `;
} else {
  result.innerHTML = '<p style="color:var(--red);margin-top:16px">❌ ' + t('orderNotFound') + '</p>';
}
} catch (err) {
  console.error(err);
  result.innerHTML = '<p style="color:var(--red)">❌ Fehler beim Laden</p>';
}
}

// ============================================================
// EVENT LISTENER + INIT
// ============================================================
function init() {
  const langSel = $('lang-select');
  if (langSel) {
    langSel.value = currentLang;
    langSel.addEventListener('change', (e) => setLanguage(e.target.value));
  }

  const searchInput = $('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value;
      renderProducts();
    });
  }

  const catSel = $('filter-category');
  if (catSel) {
    catSel.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      renderProducts();
    });
  }

  const sortSel = $('filter-sort');
  if (sortSel) {
    sortSel.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  const cartBtn = $('cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      $('cart-sidebar').classList.add('open');
      $('cart-overlay').classList.add('show');
    });
  }

  const cartClose = $('cart-close');
  if (cartClose) {
    cartClose.addEventListener('click', () => {
      $('cart-sidebar').classList.remove('open');
      $('cart-overlay').classList.remove('show');
    });
  }

  const cartOverlay = $('cart-overlay');
  if (cartOverlay) {
    cartOverlay.addEventListener('click', () => {
      $('cart-sidebar').classList.remove('open');
      $('cart-overlay').classList.remove('show');
    });
  }

  const checkoutBtn = $('checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      $('cart-sidebar').classList.remove('open');
      $('cart-overlay').classList.remove('show');
      openCheckout();
    });
  }

  const customForm = $('custom-form');
  if (customForm) {
    customForm.addEventListener('submit', handleCustomUpload);
  }

  const lookupBtn = $('order-lookup-btn');
  if (lookupBtn) {
    lookupBtn.addEventListener('click', lookupOrder);
  }

  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      $('view-' + tab.dataset.view).classList.add('active');
    });
  });

  const modal = $('modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  applyTranslations();
  loadProducts();
  loadInfo();
  updateCartUI();
}

// Sicherheits-Timeout
setTimeout(() => {
  const l = document.getElementById('loading');
  if (l) l.classList.add('hide');
  console.log('✅ Ladeschirm-Timeout');
}, 3000);

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
// ============================================================
// SETTINGS LADEN (vom Server)
// ============================================================
async function loadInfo() {
  try {
    const res = await fetch('/api/settings');
    const s = await res.json();
    info = s;

    // Shop-Name + Logo
    const logoText = document.querySelector('.logo-text');
    if (logoText && s.shop?.name) {
      const parts = s.shop.name.split(' ');
      if (parts.length > 1) {
        logoText.innerHTML = parts[0] + ' <b>' + parts.slice(1).join(' ') + '</b>';
      } else {
        logoText.innerHTML = '<b>' + s.shop.name + '</b>';
      }
    }
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon && s.shop?.logoEmoji) logoIcon.textContent = s.shop.logoEmoji;
    if (s.shop?.name) document.title = s.shop.logoEmoji + ' ' + s.shop.name + ' · 3D-Druck Shop';

    // IBAN etc.
    const ibanEl = document.getElementById('info-iban');
    const bicEl = document.getElementById('info-bic');
    const ownerEl = document.getElementById('info-owner');
    const emailEl = document.getElementById('info-email');
    if (ibanEl) ibanEl.textContent = s.shop?.iban || '—';
    if (bicEl) bicEl.textContent = s.shop?.bic || '—';
    if (ownerEl) ownerEl.textContent = s.shop?.owner || '—';
    if (emailEl) emailEl.textContent = s.shop?.email || '—';

    // Hero-Texte
    if (s.texts?.heroTitle) {
      const ht = document.getElementById('hero-title');
      if (ht) ht.textContent = s.texts.heroTitle;
    }
    if (s.texts?.heroSub) {
      const hs = document.getElementById('hero-sub');
      if (hs) hs.textContent = s.texts.heroSub;
    }
    const badges = document.querySelectorAll('.hero-badges .badge');
    if (s.texts?.badge1 && badges[0]) badges[0].textContent = s.texts.badge1;
    if (s.texts?.badge2 && badges[1]) badges[1].textContent = s.texts.badge2;
    if (s.texts?.badge3 && badges[2]) badges[2].textContent = s.texts.badge3;

    // Design
    if (s.design?.accent) {
      document.documentElement.style.setProperty('--accent', s.design.accent);
      document.documentElement.style.setProperty('--accent-glow', s.design.accent + '66');
    }
    if (s.design?.accent2) document.documentElement.style.setProperty('--accent-2', s.design.accent2);
    if (s.design?.bg) document.documentElement.style.setProperty('--bg', s.design.bg);
    if (s.design?.bgCard) document.documentElement.style.setProperty('--card', s.design.bgCard);

    // Versandkosten dynamisch übernehmen
    if (s.shipping && typeof SHIPPING_COSTS !== 'undefined') {
      Object.assign(SHIPPING_COSTS, s.shipping);
    }

    console.log('✅ Settings geladen');
  } catch (e) {
    console.error('Settings-Fehler:', e);
  }
}
// ============================================================
// NOTFALL: Ladeschirm nach 3 Sekunden ausblenden
// ============================================================
setTimeout(function() {
  var l = document.getElementById('loading');
  if (l) {
    l.classList.add('hide');
    console.log('✅ Ladeschirm weg (Timeout)');
  }
}, 3000);