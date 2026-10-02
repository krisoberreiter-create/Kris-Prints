const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// ============================================================
// DATENBANK VERBINDUNG
// ============================================================
const sql = neon(process.env.DATABASE_URL);

// Tabellen anlegen (falls nicht vorhanden)
async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        emoji TEXT,
        image TEXT,
        price NUMERIC,
        print_time INTEGER,
        category TEXT,
        material TEXT,
        color TEXT,
        description TEXT,
        created_at BIGINT
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        status TEXT DEFAULT 'neu',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value JSONB NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS customs (
        id TEXT PRIMARY KEY,
        data JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ Datenbank initialisiert');
  } catch (e) {
    console.error('❌ DB Init Fehler:', e.message);
  }
}

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
        if (response.error) console.error('❌ Resend Fehler:', response.error.message);
        else console.log('✅ E-Mail via Resend gesendet');
      }).catch(err => console.error('❌ Resend:', err.message));
    } catch (e) {
      console.error('❌ Resend Setup:', e.message);
    }
  }
}

// ============================================================
// PRODUKTE
// ============================================================
app.get('/api/products', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    const products = rows.map(r => ({
      id: r.id,
      name: r.name,
      emoji: r.emoji,
      image: r.image,
      price: parseFloat(r.price),
      printTime: r.print_time,
      category: r.category,
      material: r.material,
      color: r.color,
      description: r.description,
      createdAt: parseInt(r.created_at)
    }));
    res.json(products);
  } catch (e) {
    console.error('Produkte laden:', e.message);
    res.json([]);
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const rows = await sql`SELECT * FROM products WHERE id = ${req.params.id}`;
    if (rows.length === 0) return res.status(404).json({ error: 'Nicht gefunden' });
    const r = rows[0];
    res.json({
      id: r.id, name: r.name, emoji: r.emoji, image: r.image,
      price: parseFloat(r.price), printTime: r.print_time,
      category: r.category, material: r.material, color: r.color,
      description: r.description, createdAt: parseInt(r.created_at)
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// ============================================================
// BESTELLUNGEN
// ============================================================
app.post('/api/orders', async (req, res) => {
  try {
    const order = {
      id: 'ORD-' + Date.now().toString(36).toUpperCase(),
      ...req.body,
      status: 'neu',
      createdAt: new Date().toISOString()
    };
    await sql`INSERT INTO orders (id, data, status) VALUES (${order.id}, ${JSON.stringify(order)}, ${order.status})`;
    console.log('🛒 Bestellung:', order.id, '-', order.customer?.name, '-', order.total + ' EUR');
    sendOrderEmail(order);
    res.json({ erfolg: true, orderId: order.id });
  } catch (e) {
    console.error('Bestellung Fehler:', e.message);
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const rows = await sql`SELECT data, status FROM orders ORDER BY created_at DESC`;
    const orders = rows.map(r => ({ ...r.data, status: r.status }));
    res.json(orders);
  } catch (e) {
    res.json([]);
  }
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
    res.status(401).json({ erfolg: false, error: 'Falsches Passwort' });
  }
});

// ============================================================
// ADMIN: PRODUKTE
// ============================================================
app.post('/api/admin/products', checkAuth, async (req, res) => {
  try {
    const p = req.body;
    const id = 'p' + Date.now().toString(36);
    await sql`
      INSERT INTO products (id, name, emoji, image, price, print_time, category, material, color, description, created_at)
      VALUES (${id}, ${p.name}, ${p.emoji}, ${p.image}, ${p.price}, ${p.printTime}, ${p.category}, ${p.material}, ${p.color}, ${p.description}, ${Date.now()})
    `;
    console.log('➕ Produkt hinzugefügt:', p.name);
    res.json({ erfolg: true, product: { id, ...p } });
  } catch (e) {
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

app.put('/api/admin/products/:id', checkAuth, async (req, res) => {
  try {
    const p = req.body;
    await sql`
      UPDATE products SET
        name = ${p.name}, emoji = ${p.emoji}, image = ${p.image},
        price = ${p.price}, print_time = ${p.printTime},
        category = ${p.category}, material = ${p.material},
        color = ${p.color}, description = ${p.description}
      WHERE id = ${req.params.id}
    `;
    console.log('✏️ Produkt bearbeitet:', p.name);
    res.json({ erfolg: true });
  } catch (e) {
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

app.delete('/api/admin/products/:id', checkAuth, async (req, res) => {
  try {
    await sql`DELETE FROM products WHERE id = ${req.params.id}`;
    console.log('🗑️ Produkt gelöscht:', req.params.id);
    res.json({ erfolg: true });
  } catch (e) {
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

// ============================================================
// ADMIN: BESTELLUNGEN
// ============================================================
app.get('/api/admin/orders', checkAuth, async (req, res) => {
  try {
    const rows = await sql`SELECT data, status FROM orders ORDER BY created_at DESC`;
    const orders = rows.map(r => ({ ...r.data, status: r.status }));
    res.json(orders);
  } catch (e) {
    res.json([]);
  }
});

app.put('/api/admin/orders/:id', checkAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const rows = await sql`SELECT data FROM orders WHERE id = ${req.params.id}`;
    if (rows.length === 0) return res.status(404).json({ erfolg: false });
    const data = rows[0].data;
    data.status = status;
    await sql`UPDATE orders SET data = ${JSON.stringify(data)}, status = ${status} WHERE id = ${req.params.id}`;
    console.log('📝 Bestellstatus:', req.params.id, '→', status);
    res.json({ erfolg: true });
  } catch (e) {
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

// ============================================================
// ADMIN: BILD-UPLOAD
// ============================================================
const IMAGES_DIR = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

// Bilder direkt in Datenbank (keine lokale Speicherung mehr)
const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(file.originalname);
    cb(ok ? null : new Error('Nur Bilder'), ok);
  }
});

  app.post('/api/admin/upload-image', checkAuth, imageUpload.single('image'), async (req, res) => {
  if (!req.file) return res.status(400).json({ erfolg: false, error: 'Keine Datei' });
  try {
    // Base64 aus Buffer
    const base64 = req.file.buffer.toString('base64');
    const mime = req.file.mimetype;
    const dataUrl = `data:${mime};base64,${base64}`;
    
    // In DB speichern mit eindeutigem Key
    const id = 'img_' + Date.now().toString(36) + Math.random().toString(36).slice(2,7);
    await sql`CREATE TABLE IF NOT EXISTS images (id TEXT PRIMARY KEY, data TEXT NOT NULL, created_at TIMESTAMP DEFAULT NOW())`;
    await sql`INSERT INTO images (id, data) VALUES (${id}, ${dataUrl})`;
    
    console.log('🖼️  Bild in DB gespeichert:', id, '-', (req.file.size/1024).toFixed(0) + ' KB');
    res.json({ erfolg: true, path: '/api/images/' + id, url: '/api/images/' + id });
  } catch (e) {
    console.error('❌ Bild-Upload Fehler:', e.message);
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

// Bilder aus DB ausliefern
app.get('/api/images/:id', async (req, res) => {
  try {
    const rows = await sql`SELECT data FROM images WHERE id = ${req.params.id}`;
    if (rows.length === 0) return res.status(404).send('Nicht gefunden');
    const dataUrl = rows[0].data;
    const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
    if (!match) return res.status(500).send('Ungültiges Format');
    const mime = match[1];
    const buffer = Buffer.from(match[2], 'base64');
    res.set('Content-Type', mime);
    res.set('Cache-Control', 'public, max-age=31536000');
    res.send(buffer);
  } catch (e) {
    res.status(500).send('Fehler');
  }
});
  if (!req.file) return res.status(400).json({ erfolg: false, error: 'Keine Datei' });
  const relPath = 'images/' + req.file.filename;
  console.log('🖼️  Bild hochgeladen:', relPath);
  res.json({ erfolg: true, path: relPath, url: '/' + relPath });
});

// ============================================================
// SETTINGS
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

app.get('/api/settings', async (req, res) => {
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = 'main'`;
    if (rows.length === 0) {
      await sql`INSERT INTO settings (key, value) VALUES ('main', ${JSON.stringify(DEFAULT_SETTINGS)})`;
      return res.json(DEFAULT_SETTINGS);
    }
    res.json(rows[0].value);
  } catch (e) {
    res.json(DEFAULT_SETTINGS);
  }
});

app.post('/api/admin/settings', checkAuth, async (req, res) => {
  try {
    await sql`
      INSERT INTO settings (key, value) VALUES ('main', ${JSON.stringify(req.body)})
      ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(req.body)}
    `;
    console.log('✏️ Settings aktualisiert');
    res.json({ erfolg: true });
  } catch (e) {
    res.status(500).json({ erfolg: false, error: e.message });
  }
});

app.get('/api/info', async (req, res) => {
  try {
    const rows = await sql`SELECT value FROM settings WHERE key = 'main'`;
    const s = rows.length > 0 ? rows[0].value : DEFAULT_SETTINGS;
    res.json(s.shop);
  } catch (e) {
    res.json(DEFAULT_SETTINGS.shop);
  }
});

// ============================================================
// CUSTOM UPLOAD
// ============================================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + '-' + file.originalname);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

app.post('/api/custom-upload', upload.single('model'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Keine Datei' });
  try {
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
    await sql`INSERT INTO customs (id, data) VALUES (${custom.id}, ${JSON.stringify(custom)})`;
    console.log('📤 Custom Upload:', custom.id);
    res.json({ erfolg: true, id: custom.id });
  } catch (e) {
    res.status(500).json({ erfolg: false, error: e.message });
  }
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
initDB().then(() => {
  app.listen(PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════');
    console.log("🖨️  Kris's Prints läuft auf Port " + PORT);
    console.log('🌐 http://localhost:' + PORT);
    console.log('📧 Mail-Provider: ' + MAIL_PROVIDER);
    console.log('💾 Datenbank: Neon PostgreSQL');
    console.log('═══════════════════════════════════════');
    console.log('');
  });
});
