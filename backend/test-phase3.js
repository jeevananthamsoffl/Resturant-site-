const http = require('http');
const app = require('./dist/app.js').default;

const server = http.createServer(app);
const PORT = 5088;

function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = http.request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path,
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(payload && { 'Content-Length': Buffer.byteLength(payload) }),
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(raw) });
          } catch {
            resolve({ status: res.statusCode, raw });
          }
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

server.listen(PORT, '127.0.0.1', async () => {
  console.log(`\n👑 --- ROYAL FEAST PHASE 3 API TEST SUITE --- 👑`);
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health check
    const health = await makeRequest('GET', '/api/health');
    assert(health.status === 200 && health.data.success, 'GET /api/health returned 200 OK');

    // 2. Register customer
    const regRes = await makeRequest('POST', '/api/auth/register', {
      name: 'Princess Isabella',
      email: `isabella_${Date.now()}@royalfeast.com`,
      password: 'RoyalPassword#123',
      phone: '+91 99999 88888',
    });
    assert(regRes.status === 201 && regRes.data.data.token, 'POST /api/auth/register created user & returned JWT');
    const customerToken = regRes.data.data.token;

    // 3. Login Super Admin
    const adminLogin = await makeRequest('POST', '/api/auth/login', {
      email: 'admin@royalfeast.com',
      password: 'RoyalAdmin#2026',
    });
    assert(
      adminLogin.status === 200 && adminLogin.data.data.user.role === 'SUPER_ADMIN',
      'POST /api/auth/login authenticated SUPER_ADMIN'
    );
    const adminToken = adminLogin.data.data.token;

    // 4. Authenticated profile check
    const profile = await makeRequest('GET', '/api/auth/profile', null, customerToken);
    assert(
      profile.status === 200 && profile.data.data.name === 'Princess Isabella',
      'GET /api/auth/profile verified customer JWT session'
    );

    // 5. Get categories
    const categories = await makeRequest('GET', '/api/categories');
    assert(
      categories.status === 200 && Array.isArray(categories.data.data) && categories.data.data.length >= 7,
      `GET /api/categories returned ${categories.data.data.length} categories`
    );

    // 6. Get menu items with search and category filtering
    const menu = await makeRequest('GET', '/api/menu?category=starters');
    assert(
      menu.status === 200 && menu.data.data.length > 0,
      `GET /api/menu?category=starters returned ${menu.data.data.length} starter dishes`
    );

    // 7. Admin creates new delicacy
    const newDish = await makeRequest(
      'POST',
      '/api/menu',
      {
        categoryId: 'cat-main-course',
        name: 'Wagyu A5 Imperial Tournedos Rossini',
        description: 'Tenderloin of Miyazaki A5 Wagyu topped with pan-seared foie gras and shaved Alba white truffles.',
        price: 2400,
        ingredients: 'A5 Wagyu, Foie Gras, White Truffle, Madeira Jus',
        isVegetarian: false,
        isBestseller: true,
        prepTimeMinutes: 30,
      },
      adminToken
    );
    assert(newDish.status === 201 && newDish.data.data.name.includes('Wagyu'), 'POST /api/menu created dish as SUPER_ADMIN');

    // 8. RBAC security check: Customer attempts to create dish -> must be rejected 403 Forbidden!
    const forbiddenAttempt = await makeRequest(
      'POST',
      '/api/menu',
      {
        categoryId: 'cat-desserts',
        name: 'Hacked Delicacy',
        description: 'Unauthorized creation attempt',
        price: 100,
      },
      customerToken
    );
    assert(
      forbiddenAttempt.status === 403,
      'POST /api/menu rejected customer role with 403 Forbidden (RBAC enforced)'
    );

    console.log(`\n===============================================`);
    console.log(`Results: ${passed} Passed, ${failed} Failed`);
    console.log(`===============================================\n`);
  } catch (err) {
    console.error('Test Suite Error:', err);
  } finally {
    server.close();
  }
});
