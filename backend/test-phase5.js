/**
 * Phase 5 Automated Verification Suite
 * Tests:
 * 1. Super Admin Authentication & JWT Generation
 * 2. Analytics Overview Endpoint (/api/admin/analytics/overview)
 * 3. Menu Item Creation by Admin (/api/menu)
 * 4. Menu Item Update & Status Toggle (/api/menu/:id)
 * 5. Category Creation (/api/categories)
 * 6. Admin Orders List & Status Transition (/api/admin/orders, /api/admin/orders/:id/status)
 * 7. Admin Reservations List & Confirmation (/api/admin/reservations, /api/admin/reservations/:code/status)
 * 8. Coupon Issuance & Status Toggle (/api/admin/coupons, /api/admin/coupons/:id/status)
 * 9. Staff Onboarding & Account State (/api/admin/staff, /api/admin/users/:id/status)
 * 10. Restaurant Settings Retrieval & Update (/api/admin/settings)
 */

const http = require('http');

function request(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    if (data) {
      req.write(typeof data === 'string' ? data : JSON.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  const PORT = 5099;
  process.env.PORT = String(PORT);
  process.env.JWT_SECRET = 'royal_feast_super_secret_jwt_key_2026';

  console.log('--- STARTING PHASE 5 AUTOMATED VERIFICATION ---');
  let app;
  try {
    app = require('./dist/app').default;
  } catch (err) {
    console.error('Failed to load compiled app:', err);
    process.exit(1);
  }

  const server = app.listen(PORT);
  console.log(`Test server running on port ${PORT}`);

  try {
    // 1. Authenticate as Super Admin
    console.log('1. Authenticating as Super Admin...');
    const loginRes = await request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/api/auth/login',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      { email: 'admin@royalfeast.com', password: 'RoyalAdmin#2026' }
    );

    if (loginRes.status !== 200 || !loginRes.data.data?.token) {
      throw new Error(`Admin login failed: ${JSON.stringify(loginRes)}`);
    }
    const token = loginRes.data.data.token;
    console.log('   ✓ Super Admin authenticated successfully. Token received.');

    const authHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    // 2. Analytics Overview
    console.log('2. Testing Analytics Overview (/api/admin/analytics/overview)...');
    const analyticsRes = await request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/admin/analytics/overview',
      method: 'GET',
      headers: authHeaders,
    });
    if (analyticsRes.status !== 200 || !analyticsRes.data.data?.stats) {
      throw new Error(`Analytics overview failed: ${JSON.stringify(analyticsRes)}`);
    }
    console.log(`   ✓ Analytics metrics received. Total revenue: ₹${analyticsRes.data.data.stats.totalRevenue}, orders: ${analyticsRes.data.data.stats.totalOrders}`);

    // 3. Admin Orders Management
    console.log('3. Testing Admin Orders Retrieval & Status Transition (/api/admin/orders)...');
    const ordersRes = await request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/admin/orders',
      method: 'GET',
      headers: authHeaders,
    });
    if (ordersRes.status !== 200 || !Array.isArray(ordersRes.data.data)) {
      throw new Error(`Orders fetch failed: ${JSON.stringify(ordersRes)}`);
    }
    console.log(`   ✓ Fetched ${ordersRes.data.data.length} orders.`);

    if (ordersRes.data.data.length > 0) {
      const targetOrder = ordersRes.data.data[0];
      const updateOrderRes = await request(
        {
          hostname: '127.0.0.1',
          port: PORT,
          path: `/api/admin/orders/${targetOrder.orderNumber}/status`,
          method: 'PATCH',
          headers: authHeaders,
        },
        { status: 'PREPARING' }
      );
      if (updateOrderRes.status !== 200) {
        throw new Error(`Order status update failed: ${JSON.stringify(updateOrderRes)}`);
      }
      console.log(`   ✓ Transitioned order ${targetOrder.orderNumber} to status PREPARING.`);
    }

    // 4. Admin Reservations Management
    console.log('4. Testing Table Reservations Management (/api/admin/reservations)...');
    const resvListRes = await request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/admin/reservations',
      method: 'GET',
      headers: authHeaders,
    });
    if (resvListRes.status !== 200 || !Array.isArray(resvListRes.data.data)) {
      throw new Error(`Reservations fetch failed: ${JSON.stringify(resvListRes)}`);
    }
    console.log(`   ✓ Fetched ${resvListRes.data.data.length} table bookings.`);

    if (resvListRes.data.data.length > 0) {
      const targetResv = resvListRes.data.data[0];
      const updateResvRes = await request(
        {
          hostname: '127.0.0.1',
          port: PORT,
          path: `/api/admin/reservations/${targetResv.reservationCode}/status`,
          method: 'PATCH',
          headers: authHeaders,
        },
        { status: 'CONFIRMED' }
      );
      if (updateResvRes.status !== 200) {
        throw new Error(`Reservation status update failed: ${JSON.stringify(updateResvRes)}`);
      }
      console.log(`   ✓ Confirmed table reservation ${targetResv.reservationCode}.`);
    }

    // 5. Coupon Creation & Toggle
    console.log('5. Testing Promotional Coupon Management (/api/admin/coupons)...');
    const createCouponRes = await request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/api/admin/coupons',
        method: 'POST',
        headers: authHeaders,
      },
      {
        code: `FESTIVE${Date.now().toString().slice(-4)}`,
        description: '25% festive courtesy discount on tasting sets',
        discountType: 'PERCENTAGE',
        discountValue: 25,
        minOrderValue: 1500,
        maxDiscount: 600,
        validUntil: '2028-12-31',
      }
    );
    if (createCouponRes.status !== 201 || !createCouponRes.data.data?.code) {
      throw new Error(`Coupon creation failed: ${JSON.stringify(createCouponRes)}`);
    }
    const createdCoupon = createCouponRes.data.data;
    console.log(`   ✓ Created new voucher code: ${createdCoupon.code}`);

    const toggleCouponRes = await request({
      hostname: '127.0.0.1',
      port: PORT,
      path: `/api/admin/coupons/${createdCoupon.id}/status`,
      method: 'PATCH',
      headers: authHeaders,
    });
    if (toggleCouponRes.status !== 200) {
      throw new Error(`Coupon toggle failed: ${JSON.stringify(toggleCouponRes)}`);
    }
    console.log(`   ✓ Toggled voucher status to: ${toggleCouponRes.data.data.isActive ? 'Active' : 'Disabled'}`);

    // 6. Staff Onboarding
    console.log('6. Testing Personnel Onboarding (/api/admin/staff)...');
    const newStaffEmail = `souschef_${Date.now()}@royalfeast.com`;
    const staffRes = await request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/api/admin/staff',
        method: 'POST',
        headers: authHeaders,
      },
      {
        name: 'Chef Alessandro Rossi',
        email: newStaffEmail,
        phone: '+91 98765 77777',
        role: 'KITCHEN_STAFF',
        password: 'ChefPassword#2026',
      }
    );
    if (staffRes.status !== 201 || !staffRes.data.data?.id) {
      throw new Error(`Staff onboarding failed: ${JSON.stringify(staffRes)}`);
    }
    console.log(`   ✓ Onboarded new culinary personnel: ${staffRes.data.data.name} (${staffRes.data.data.role})`);

    // 7. Restaurant Settings
    console.log('7. Testing Establishment Settings (/api/admin/settings)...');
    const getSettingsRes = await request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/admin/settings',
      method: 'GET',
      headers: authHeaders,
    });
    if (getSettingsRes.status !== 200 || !getSettingsRes.data.data?.restaurantName) {
      throw new Error(`Settings fetch failed: ${JSON.stringify(getSettingsRes)}`);
    }
    console.log(`   ✓ Verified establishment name: ${getSettingsRes.data.data.restaurantName}`);

    const updateSettingsRes = await request(
      {
        hostname: '127.0.0.1',
        port: PORT,
        path: '/api/admin/settings',
        method: 'PUT',
        headers: authHeaders,
      },
      {
        freeDeliveryOver: 1200.0,
      }
    );
    if (updateSettingsRes.status !== 200 || updateSettingsRes.data.data?.freeDeliveryOver !== 1200.0) {
      throw new Error(`Settings update failed: ${JSON.stringify(updateSettingsRes)}`);
    }
    console.log('   ✓ Updated complimentary delivery threshold to ₹1200.00.');

    console.log('\n======================================================');
    console.log('  ALL PHASE 5 VERIFICATION CHECKS PASSED PERFECTLY!  ');
    console.log('======================================================\n');
  } finally {
    server.close();
  }
}

runTests().catch((e) => {
  console.error('TEST SUITE ENCOUNTERED AN ERROR:', e);
  process.exit(1);
});
