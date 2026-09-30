// ============================================================
// KONFIG
// ============================================================
const $ = (id) => document.getElementById(id);
let adminToken = localStorage.getItem('kris_admin_token') || '';
let products = [];
let settings = null;

// ============================================================
// LOGIN
// ============================================================
$('login-btn').addEventListener('click', tryLogin);
$('admin-password').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryLogin();
});

async function tryLogin() {
  const password = $('admin-password').value;
  if (!password) return;
  try {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.erfolg) {
      adminToken = data.token;
      localStorage.setItem('kris_admin_token', adminToken);
      showAdminPanel();
    } else {
      $('login-error').textContent = '❌ ' + (data.error || 'Falsches Passwort');
      $('admin-password').value = '';
    }
  } catch (e) {
    $('login-error').textContent = '❌ Fehler beim Login';
  }
}

function showAdminPanel() {
  $('login-screen').style.display = 'none';
  $('admin-panel').classList.add('active');
  loadProducts();
  loadOrders();
  loadSettings();
}

$('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('kris_admin_token');
  adminToken = '';
  location.reload();
});

if (adminToken) {
  fetch('/api/admin/orders', { headers: { 'x-admin-token': adminToken } })
    .then(r => { if (r.ok) showAdminPanel(); else { localStorage.removeItem('kris_admin_token'); adminToken = ''; } })
    .catch(() => {});
}

function escapeHtml(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ============================================================
// PRODUKTE
// ============================================================
async function loadProducts() {
  const res = await fetch('/api/products');
  products = await res.json();
  renderProducts();
}

function renderProducts() {
  const list = $('admin-products');
  if (products.length === 0) {
    list.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:40px">Noch keine Produkte.</p>';
    return;
  }
  list.innerHTML = products.map(p => `
    <div class="product-admin-item">
      <div class="pai-img">
        ${p.image ? `<img src="${p.image}" onerror="this.parentElement.innerHTML='${p.emoji || '🖨️'}'">` : (p.emoji || '🖨️')}
      </div>
      <div class="pai-info">
        <div class="pai-name">${escapeHtml(p.name)}</div>
        <div class="pai-meta">
          ${(p.price || 0).toFixed(2)} € · ⏱️ ${p.printTime || 1}h · ${escapeHtml(p.category || '')}
        </div>
      </div>
      <div class="pai-actions">
        <button onclick="editProduct('${p.id}')">✏️</button>
        <button class="del" onclick="deleteProduct('${p.id}')">🗑️</button>
      </div>
    </div>
  `).join('');
}

$('add-product-btn').addEventListener('click', () => openProductModal(null));

function editProduct(id) {
  const p = products.find(x => x.id === id);
  if (p) openProductModal(p);
}

function openProductModal(product) {
  const isNew = !product;
  const p = product || {};

  $('modal-content').innerHTML = `
    <button class="close-btn" onclick="closeModal()" style="position:absolute;top:16px;right:16px">✕</button>
    <h2>${isNew ? '➕ Neues Produkt' : '✏️ Produkt bearbeiten'}</h2>
    <form id="product-form">
      <div class="form-group">
        <label>Name *</label>
        <input type="text" id="pf-name" value="${escapeHtml(p.name || '')}" required>
      </div>
      <div class="form-group">
        <label>Emoji (Fallback)</label>
        <input type="text" id="pf-emoji" value="${escapeHtml(p.emoji || '🖨️')}" maxlength="4">
      </div>
      <div class="form-group">
        <label>Produktbild</label>
        <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
          <input type="text" id="pf-image" value="${escapeHtml(p.image || '')}" placeholder="images/... oder https://..." style="flex:1">
          <button type="button" class="btn secondary" id="upload-btn" style="white-space:nowrap;padding:12px 14px">📷 Upload</button>
        </div>
        <input type="file" id="image-file" accept="image/*" style="display:none">
        <div id="image-preview" style="margin-top:8px;text-align:center">
          ${p.image ? `<img src="${p.image}" style="max-width:180px;max-height:180px;border-radius:12px;border:1px solid var(--border)" onerror="this.style.display='none'">` : ''}
        </div>
      </div>
      <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group">
          <label>Preis (€) *</label>
          <input type="number" id="pf-price" value="${p.price || 0}" step="0.01" required>
        </div>
        <div class="form-group">
          <label>Druckzeit (h, 1-7) *</label>
          <input type="number" id="pf-time" value="${p.printTime || 1}" min="1" max="7" required>
        </div>
      </div>
      <div class="form-row" style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div class="form-group">
          <label>Kategorie</label>
          <input type="text" id="pf-category" value="${escapeHtml(p.category || '')}" placeholder="🎨 Deko">
        </div>
        <div class="form-group">
          <label>Material</label>
          <input type="text" id="pf-material" value="${escapeHtml(p.material || 'PLA')}">
        </div>
      </div>
      <div class="form-group">
        <label>Farbe</label>
        <input type="text" id="pf-color" value="${escapeHtml(p.color || '')}">
      </div>
      <div class="form-group">
        <label>Beschreibung</label>
        <textarea id="pf-description" rows="3">${escapeHtml(p.description || '')}</textarea>
      </div>
      <div style="display:flex;gap:10px;margin-top:20px">
        <button type="button" class="btn secondary" onclick="closeModal()">Abbrechen</button>
        <button type="submit" class="btn" style="flex:1">💾 Speichern</button>
      </div>
    </form>
  `;
  $('modal').classList.add('open');

  // Upload-Knopf verbinden
  const uploadBtn = $('upload-btn');
  const fileInput = $('image-file');
  if (uploadBtn && fileInput) {
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', async () => {
      const file = fileInput.files[0];
      if (!file) return;
      uploadBtn.textContent = '⏳ Lädt...';
      uploadBtn.disabled = true;
      const fd = new FormData();
      fd.append('image', file);
      try {
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: { 'x-admin-token': adminToken },
          body: fd
        });
        const data = await res.json();
        if (data.erfolg) {
          $('pf-image').value = data.path;
          $('image-preview').innerHTML = `<img src="${data.path}" style="max-width:180px;max-height:180px;border-radius:12px;border:1px solid var(--border)">`;
          uploadBtn.textContent = '✅ Fertig';
          setTimeout(() => { uploadBtn.textContent = '📷 Upload'; uploadBtn.disabled = false; }, 1500);
        } else {
          alert('❌ Upload fehlgeschlagen: ' + (data.error || 'Unbekannt'));
          uploadBtn.textContent = '📷 Upload';
          uploadBtn.disabled = false;
        }
      } catch (err) {
        alert('❌ Fehler: ' + err.message);
        uploadBtn.textContent = '📷 Upload';
        uploadBtn.disabled = false;
      }
    });
  }

  $('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: $('pf-name').value,
      emoji: $('pf-emoji').value,
      image: $('pf-image').value,
      price: parseFloat($('pf-price').value),
      printTime: parseInt($('pf-time').value),
      category: $('pf-category').value,
      material: $('pf-material').value,
      color: $('pf-color').value,
      description: $('pf-description').value
    };
    const url = isNew ? '/api/admin/products' : `/api/admin/products/${p.id}`;
    const method = isNew ? 'POST' : 'PUT';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    if (result.erfolg) {
      closeModal();
      loadProducts();
      alert(isNew ? '✅ Produkt hinzugefügt!' : '✅ Produkt gespeichert!');
    } else {
      alert('❌ Fehler beim Speichern');
    }
  });
}

async function deleteProduct(id) {
  if (!confirm('Produkt wirklich löschen?')) return;
  const res = await fetch(`/api/admin/products/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-token': adminToken }
  });
  if (res.ok) { loadProducts(); alert('🗑️ Gelöscht'); }
}

function closeModal() { $('modal').classList.remove('open'); }

// ============================================================
// BESTELLUNGEN
// ============================================================
async function loadOrders() {
  const res = await fetch('/api/admin/orders', { headers: { 'x-admin-token': adminToken } });
  if (!res.ok) return;
  const orders = await res.json();
  orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const list = $('admin-orders');
  if (orders.length === 0) {
    list.innerHTML = '<p style="color:var(--text-dim);text-align:center;padding:40px">Noch keine Bestellungen.</p>';
    return;
  }
  const statusClass = { 'neu': 'status-neu', 'bezahlt': 'status-bezahlt', 'gedruckt': 'status-gedruckt', 'versendet': 'status-versendet' };
  list.innerHTML = orders.map(o => `
    <div class="order-card">
      <h3>
        ${o.id}
        <span class="status-badge ${statusClass[o.status] || 'status-neu'}">${o.status || 'neu'}</span>
      </h3>
      <div class="meta">
        📅 ${new Date(o.createdAt).toLocaleString('de-DE')}<br>
        👤 <b>${escapeHtml(o.customer?.name || '?')}</b> · ${escapeHtml(o.customer?.email || '')}<br>
        📍 ${escapeHtml(o.customer?.address || '')}, ${escapeHtml(o.customer?.zip || '')} ${escapeHtml(o.customer?.city || '')}, ${o.customer?.country || ''}<br>
        💰 <b style="color:var(--accent-2)">${(o.total || 0).toFixed(2)} €</b>
      </div>
      <div style="margin-top:10px;font-size:.85rem">
        ${(o.items || []).map(i => `• ${i.qty}× ${escapeHtml(i.name)} – ${(i.price * i.qty).toFixed(2)} €`).join('<br>')}
      </div>
      <div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap">
        <button onclick="setOrderStatus('${o.id}','bezahlt')" style="padding:6px 12px;border-radius:8px;border:1px solid var(--gold);background:transparent;color:var(--gold);cursor:pointer;font-family:inherit">💰 Bezahlt</button>
        <button onclick="setOrderStatus('${o.id}','gedruckt')" style="padding:6px 12px;border-radius:8px;border:1px solid var(--blue);background:transparent;color:var(--blue);cursor:pointer;font-family:inherit">🖨️ Gedruckt</button>
        <button onclick="setOrderStatus('${o.id}','versendet')" style="padding:6px 12px;border-radius:8px;border:1px solid var(--green);background:transparent;color:var(--green);cursor:pointer;font-family:inherit">📦 Versendet</button>
      </div>
    </div>
  `).join('');
}

async function setOrderStatus(id, status) {
  const res = await fetch(`/api/admin/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
    body: JSON.stringify({ status })
  });
  if (res.ok) loadOrders();
}

// ============================================================
// SETTINGS
// ============================================================
async function loadSettings() {
  const res = await fetch('/api/settings');
  settings = await res.json();
  fillSettings();
}

function fillSettings() {
  if (!settings) return;
  if ($('s-shop-name')) $('s-shop-name').value = settings.shop?.name || '';
  if ($('s-logo-emoji')) $('s-logo-emoji').value = settings.shop?.logoEmoji || '🖨️';
  if ($('s-iban')) $('s-iban').value = settings.shop?.iban || '';
  if ($('s-bic')) $('s-bic').value = settings.shop?.bic || '';
  if ($('s-owner')) $('s-owner').value = settings.shop?.owner || '';
  if ($('s-email')) $('s-email').value = settings.shop?.email || '';
  if ($('s-accent')) $('s-accent').value = settings.design?.accent || '#ff6b35';
  if ($('s-accent2')) $('s-accent2').value = settings.design?.accent2 || '#ffa94d';
  if ($('s-bg')) $('s-bg').value = settings.design?.bg || '#0a0a14';
  if ($('s-bgCard')) $('s-bgCard').value = settings.design?.bgCard || '#1a1a2a';
  if ($('s-hero-title')) $('s-hero-title').value = settings.texts?.heroTitle || '';
  if ($('s-hero-sub')) $('s-hero-sub').value = settings.texts?.heroSub || '';
  if ($('s-badge1')) $('s-badge1').value = settings.texts?.badge1 || '';
  if ($('s-badge2')) $('s-badge2').value = settings.texts?.badge2 || '';
  if ($('s-badge3')) $('s-badge3').value = settings.texts?.badge3 || '';

  const shipEditor = $('shipping-editor');
  if (shipEditor && settings.shipping) {
    shipEditor.innerHTML = '';
    Object.keys(settings.shipping).sort().forEach(code => {
      const div = document.createElement('div');
      div.innerHTML = `
        <label style="font-size:.75rem;font-weight:800;color:var(--text-dim);display:block;margin-bottom:4px">${code}</label>
        <input type="number" step="0.10" value="${settings.shipping[code]}" data-ship-code="${code}"
          style="width:100%;padding:8px 12px;background:var(--bg-2);border:2px solid var(--border);border-radius:8px;color:#fff;font-family:inherit">
      `;
      shipEditor.appendChild(div);
    });
  }
}

document.querySelectorAll('[data-stab]').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('[data-stab]').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.settings-tab').forEach(t => t.style.display = 'none');
    btn.classList.add('active');
    $('stab-' + btn.dataset.stab).style.display = 'block';
  });
});

if ($('save-settings-btn')) {
  $('save-settings-btn').addEventListener('click', async () => {
    const newSettings = {
      shop: {
        name: $('s-shop-name')?.value || '',
        logoEmoji: $('s-logo-emoji')?.value || '',
        iban: $('s-iban')?.value || '',
        bic: $('s-bic')?.value || '',
        owner: $('s-owner')?.value || '',
        email: $('s-email')?.value || ''
      },
      shipping: { ...(settings?.shipping || {}) },
      design: {
        accent: $('s-accent')?.value || '#ff6b35',
        accent2: $('s-accent2')?.value || '#ffa94d',
        bg: $('s-bg')?.value || '#0a0a14',
        bgCard: $('s-bgCard')?.value || '#1a1a2a'
      },
      texts: {
        heroTitle: $('s-hero-title')?.value || '',
        heroSub: $('s-hero-sub')?.value || '',
        badge1: $('s-badge1')?.value || '',
        badge2: $('s-badge2')?.value || '',
        badge3: $('s-badge3')?.value || ''
      }
    };
    document.querySelectorAll('[data-ship-code]').forEach(inp => {
      newSettings.shipping[inp.dataset.shipCode] = parseFloat(inp.value) || 0;
    });
    const res = await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': adminToken },
      body: JSON.stringify(newSettings)
    });
    if (res.ok) {
      settings = newSettings;
      if ($('settings-saved')) {
        $('settings-saved').textContent = '✅ Einstellungen gespeichert!';
        setTimeout(() => $('settings-saved').textContent = '', 3000);
      }
    }
  });
}

$('modal').addEventListener('click', (e) => {
  if (e.target === $('modal')) closeModal();
});