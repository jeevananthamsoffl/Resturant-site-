const http = require('http');
const app = require('./dist/app.js').default;

const server = http.createServer(app);
const PORT = 5089;

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
  console.log(`\n👑 --- ROYAL FEAST PHASE 4 CART, CHECKOUT & RESERVATIONS TEST --- 👑`);
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
    // 1. Validate Coupon ROYAL20 on ₹1500 subtotal
    const couponValid = await makeRequest('POST', '/api/coupons/validate', {
      code: 'ROYAL20',
      subtotal: 1500,
    });
    assert(
      couponValid.status === 200 && couponValid.data.data.discount === 300,
      'POST /api/coupons/validate applied ROYAL20 and computed 20% discount (₹300)'
    );

    // 2. Reject Invalid Coupon
    const couponInvalid = await makeRequest('POST', '/api/coupons/validate', {
      code: 'FAKECODE',
      subtotal: 1500,
    });
    assert(
      couponInvalid.status === 400 && !couponInvalid.data.success,
      'POST /api/coupons/validate correctly rejected invalid coupon'
    );

    // 3. Table Reservation Booking
    const reservationRes = await makeRequest('POST', '/api/reservations', {
      guestName: 'Lady Catherine Spencer',
      guestEmail: 'catherine@royalfeast.com',
      guestPhone: '+91 98765 22222',
      reservationDate: '2026-12-15',
      reservationTime: '20:15',
      guestCount: 4,
      seatingArea: 'The Royal Starlight Terrace',
      specialRequests: 'Window view, sommelier pairing preference',
    });
    assert(
      reservationRes.status === 201 && reservationRes.data.data.reservationCode.startsWith('RF-RES-'),
      `POST /api/reservations confirmed booking (${reservationRes.data?.data?.reservationCode})`
    );
    const reservationCode = reservationRes.data.data.reservationCode;

    // 4. Retrieve Reservation by Code
    const getRes = await makeRequest('GET', `/api/reservations/${reservationCode}`);
    assert(
      getRes.status === 200 && getRes.data.data.guestName === 'Lady Catherine Spencer',
      'GET /api/reservations/:code retrieved valid reservation receipt'
    );

    // 5. Place Checkout Order with Price Snapshotting & Razorpay Setup
    const checkoutRes = await makeRequest('POST', '/api/orders/checkout', {
      customerName: 'Count Alexander Wright',
      customerEmail: 'alexander@royalfeast.com',
      customerPhone: '+91 98765 33333',
      orderType: 'DELIVERY',
      address: {
        street: '12 Kensington Embassy Avenue',
        city: 'Delhi',
        state: 'Delhi NCR',
        postalCode: '110003',
      },
      items: [
        {
          menuItemId: 'starter-1',
          name: 'Truffle & Wild Mushroom Arancini',
          price: 650,
          quantity: 2,
        },
        {
          menuItemId: 'main-2',
          name: 'Pan-Seared Chilean Sea Bass',
          price: 1550,
          quantity: 1,
        },
      ],
      couponCode: 'ROYAL20',
      paymentMethod: 'ONLINE_RAZORPAY',
      notes: 'Please include warm bread basket',
    });

    assert(
      checkoutRes.status === 201 && checkoutRes.data.data.orderNumber.startsWith('RF-ORD-'),
      `POST /api/orders/checkout placed order (${checkoutRes.data?.data?.orderNumber})`
    );
    const orderData = checkoutRes.data.data;
    const orderNumber = orderData.orderNumber;

    // Verify accurate financials:
    // Subtotal: 650*2 + 1550 = 2850
    // Discount: 20% of 2850 is 570, but maxDiscount is 500 -> 500
    // Net: 2350
    // Tax (5%): 118
    // Delivery (Subtotal >= 999): 0
    // Total: 2350 + 118 = 2468
    assert(
      orderData.subtotal === 2850 && orderData.discountAmount === 500 && orderData.totalAmount === 2468,
      `Order financial integrity verified: Subtotal ₹${orderData.subtotal}, Discount ₹${orderData.discountAmount}, Grand Total ₹${orderData.totalAmount}`
    );

    // 6. Verify Payment Signature
    const paymentVerify = await makeRequest('POST', '/api/orders/verify-payment', {
      orderNumber,
      razorpayOrderId: orderData.razorpayOrderId || 'order_demo_123',
      razorpayPaymentId: 'pay_demo_987654',
      razorpaySignature: 'demo_sig_verified_hash',
    });
    assert(
      paymentVerify.status === 200 && paymentVerify.data.data.status === 'CONFIRMED',
      'POST /api/orders/verify-payment verified transaction and transitioned order to CONFIRMED'
    );

    // 7. Live Order Tracking Lookup
    const trackOrderRes = await makeRequest('GET', `/api/orders/${orderNumber}/track`);
    assert(
      trackOrderRes.status === 200 &&
        trackOrderRes.data.data.paymentStatus === 'PAID' &&
        trackOrderRes.data.data.items.length === 2,
      `GET /api/orders/:orderNumber/track confirmed order ${orderNumber} with live status & snapshot line items`
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
