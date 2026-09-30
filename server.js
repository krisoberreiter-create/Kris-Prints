const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const DATA_DIR = path.join(__dirname, 'data');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

function readJSON(file, def) {
  const p = path.join(DATA_DIR, file);
  if (!fs.existsSync(p)) return def;
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch(e) { return def; }
}
function writeJSON(file, data) {
  const p = path.join(DATA_DIR, file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf8');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// Separater Upload für Produktbilder → public/images/
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, IMAGES_DIR),
  filename: (req, file, cb) => {
    // Name = produktname.png (URL-safe)
    const orig = file.originalname.toLowerCase().replace(/[^a-z0-9.-]/g, '-');
    const unique = Date.now().toString(36);
    const ext = path.extname(orig) || '.png';
    const base = path.basename(orig, ext).slice(0, 30);
    cb(null, base + '-' + unique + ext);
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },  // 5 MB max
  fileFilter: (req, file, cb) => {
    const ok = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file.originalname);
    cb(ok ? null : new Error('Nur Bilder erlaubt (png/jpg/gif/webp/svg)'), ok);
  }
});
// ============================================================
// KONFIGURATION
// ============================================================
const MAIL_TO = process.env.MAIL_TO || 'deine-adresse@aon.at';
const MAIL_PROVIDER = process.env.MAIL_PROVIDER || 'resend';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'geheim';

function checkAuth(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (token === ADMIN_TOKEN) return next();
  res.status(401).json({ erfolg: false, error: 'Nicht angemeldet' });
}

// ============================================================
// E-MAIL VERSAND
// ============================================================
function sendOrderEmail(order) {
  const items = order.items.map(i => `  ${i.qty}x ${i.name} - ${(i.price * i.qty).toFixed(2)} EUR`).join('\n');
  const text = `NEUE BESTELLUNG - Kris's Prints\n=====================================\n\nBestellnummer: ${order.id}\nDatum: ${new Date(order.createdAt).toLocaleString('de-DE')}\n\nPRODUKTE:\n${items}\n\nGESAMT: ${order.total.toFixed(2)} EUR\n\nKUNDE:\n${order.customer.name}\n${order.customer.email}\n${order.customer.phone || ''}\n\nLIEFERADRESSE:\n${order.customer.address}\n${order.customer.zip} ${order.customer.city}\n${order.customer.country}\n`;

  const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

  if (MAIL_PROVIDER === 'resend') {
    try {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY || '');

      resend.emails.send({
        from: `Kris's Prints <${fromEmail}>`,
        to: MAIL_TO,
        subject: `Neue Bestellung ${order.id} - ${order.total.toFixed(2)} EUR`,
        text: text
      }).then((response) => {
        if (response.error) {
          console.error('❌ Resend Fehler:', response.error.message);
        } else {
          console.log('✅ E-Mail via Resend gesendet:', response.data.id);
        }
      }).catch(err => {
        console.error('❌ Resend Fehler:', err.message);
      });
    } catch (e) {
      console.error('❌ Resend Setup-Fehler:', e.message);
    }
  } else if (MAIL_PROVIDER === 'gmail') {
    try {
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      });
      transporter.sendMail({
        from: `"Kris's Prints" <${process.env.SMTP_USER}>`,
        to: MAIL_TO,
        subject: `Neue Bestellung ${order.id} - ${order.total.toFixed(2)} EUR`,
        text: text
      }, (err) => {
        if (err) console.error('❌ Gmail Fehler:', err.message);
        else console.log('✅ E-Mail via Gmail gesendet');
      });
    } catch (e) {
      console.error('❌ Gmail Setup-Fehler:', e.message);
    }
  }
}
// ============================================================
// PRODUKTE
// ============================================================
app.get('/api/products', (req, res) => {
  res.json(readJSON('products.json', []));
});

app.get('/api/products/:id', (req, res) => {
  const p = readJSON('products.json', []).find(x => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: 'Nicht gefunden' });
  res.json(p);
});

// ============================================================
// BESTELLUNGEN
// ============================================================
app.post('/api/orders', (req, res) => {
  const orders = readJSON('orders.json', []);
  const order = {
    id: 'ORD-' + Date.now().toString(36).toUpperCase(),
    ...req.body,
    status: 'neu',
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  writeJSON('orders.json', orders);
  console.log('🛒 Bestellung:', order.id, '-', order.customer?.name, '-', order.total + ' EUR');
  sendOrderEmail(order);
  res.json({ erfolg: true, orderId: order.id });
});

app.get('/api/orders', (req, res) => {
  res.json(readJSON('orders.json', []));
});

// ============================================================
// CUSTOM UPLOAD
// ============================================================
app.post('/api/custom-upload', upload.single('model'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Keine Datei' });
  const customs = readJSON('customs.json', []);
  const custom = {
    id: 'CUS-' + Date.now().toString(36).toUpperCase(),
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    message: req.body.message || '',
    contact: req.body.contact || '',
    status: 'neu',
    createdAt: new Date().toISOString()
  };
  customs.push(custom);
  writeJSON('customs.json', customs);
  console.log('📤 Custom Upload:', custom.id, '-', req.file.originalname);
  res.json({ erfolg: true, id: custom.id });
});

// ============================================================
// BEWERTUNGEN
// ============================================================
app.get('/api/reviews/:productId', (req, res) => {
  const reviews = readJSON('reviews.json', []);
  res.json(reviews.filter(r => r.productId === req.params.productId));
});

app.post('/api/reviews', (req, res) => {
  const reviews = readJSON('reviews.json', []);
  reviews.push({ id: 'REV-' + Date.now().toString(36).toUpperCase(), ...req.body, createdAt: new Date().toISOString() });
  writeJSON('reviews.json', reviews);
  res.json({ erfolg: true });
});

// ============================================================
// SHOP-INFO & SETTINGS
// ============================================================
const DEFAULT_SETTINGS = {
  shop: {
    name: "Kris's Prints",
    logoEmoji: '🖨️',
    iban: 'AT00 0000 0000 0000 0000',
    bic: 'XXXXATWW',
    owner: 'Kris Oberreiter',
    email: 'kris@example.com'
  },
  shipping: {
    AT: 4.90, DE: 6.90,
    FR: 9.90, IT: 9.90, ES: 9.90, NL: 9.90, BE: 9.90, PL: 9.90,
    CZ: 9.90, SK: 9.90, HU: 9.90, SI: 9.90, HR: 9.90, RO: 9.90, BG: 9.90,
    GR: 9.90, PT: 9.90, IE: 9.90, DK: 9.90, SE: 9.90, FI: 9.90, EE: 9.90,
    LV: 9.90, LT: 9.90, LU: 9.90, MT: 9.90, CY: 9.90,
    CH: 14.90, GB: 14.90, NO: 14.90, IS: 14.90, LI: 14.90, MC: 14.90
  },
  design: {
    accent: '#ff6b35',
    accent2: '#ffa94d',
    bg: '#0a0a14',
    bgCard: '#1a1a2a'
  },
  texts: {
    heroTitle: '🖨️ 3D-Druck aus Pregartsdorf',
    heroSub: 'Handgefertigte 3D-Drucke · Druckzeit 1–7 Stunden · Versand in ganz Europa',
    badge1: '🇪🇺 EU-Versand',
    badge2: '🎨 Individuell',
    badge3: '⚡ Schnell'
  }
};

app.get('/api/settings', (req, res) => {
  res.json(readJSON('settings.json', DEFAULT_SETTINGS));
});

app.post('/api/admin/settings', checkAuth, (req, res) => {
  writeJSON('settings.json', req.body);
  console.log('✏️ Settings aktualisiert');
  res.json({ erfolg: true });
});

app.get('/api/info', (req, res) => {
  const s = readJSON('settings.json', DEFAULT_SETTINGS);
  res.json(s.shop);
});

// ============================================================
// ADMIN: LOGIN
// ============================================================
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    console.log('🔓 Admin-Login erfolgreich');
    res.json({ erfolg: true, token: ADMIN_TOKEN });
  } else {
    console.log('❌ Admin-Login fehlgeschlagen');
    res.status(401).json({ erfolg: false, error: 'Falsches Passwort' });
  }
});
// ============================================================
// ADMIN: BILD-UPLOAD
// ============================================================
app.post('/api/admin/upload-image', checkAuth, imageUpload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ erfolg: false, error: 'Keine Datei' });
  const relPath = 'images/' + req.file.filename;
  console.log('🖼️  Bild hochgeladen:', relPath);
  res.json({ erfolg: true, path: relPath, url: '/' + relPath });
});
// ============================================================
// ADMIN: PRODUKTE
// ============================================================
app.post('/api/admin/products', checkAuth, (req, res) => {
  const product = {
    id: 'p' + Date.now().toString(36),
    ...req.body,
    createdAt: Date.now()
  };
  const products = readJSON('products.json', []);
  products.push(product);
  writeJSON('products.json', products);
  console.log('➕ Produkt hinzugefügt:', product.name);
  res.json({ erfolg: true, product });
});

app.put('/api/admin/products/:id', checkAuth, (req, res) => {
  const products = readJSON('products.json', []);
  const idx = products.findIndex(p => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erfolg: false });
  products[idx] = { ...products[idx], ...req.body };
  writeJSON('products.json', products);
  console.log('✏️ Produkt bearbeitet:', products[idx].name);
  res.json({ erfolg: true, product: products[idx] });
});

app.delete('/api/admin/products/:id', checkAuth, (req, res) => {
  let products = readJSON('products.json', []);
  const before = products.length;
  products = products.filter(p => p.id !== req.params.id);
  if (products.length === before) return res.status(404).json({ erfolg: false });
  writeJSON('products.json', products);
  console.log('🗑️ Produkt gelöscht:', req.params.id);
  res.json({ erfolg: true });
});

// ============================================================
// ADMIN: BESTELLUNGEN
// ============================================================
app.get('/api/admin/orders', checkAuth, (req, res) => {
  res.json(readJSON('orders.json', []));
});

app.put('/api/admin/orders/:id', checkAuth, (req, res) => {
  const orders = readJSON('orders.json', []);
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ erfolg: false });
  orders[idx] = { ...orders[idx], ...req.body };
  writeJSON('orders.json', orders);
  res.json({ erfolg: true });
});

// ============================================================
// FALLBACK
// ============================================================
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============================================================
// START
// ============================================================
app.listen(PORT, () => {
  console.log('');
  console.log('═══════════════════════════════════════');
  console.log("🖨️  Kris's Prints läuft auf Port " + PORT);
  console.log('🌐 http://localhost:' + PORT);
  console.log('📧 Mail-Provider: ' + MAIL_PROVIDER);
  console.log('═══════════════════════════════════════');
  console.log('');
});