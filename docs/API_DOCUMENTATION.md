# Royal Feast - RESTful API Documentation

Base URL: `http://localhost:5000/api`

---

## 1. System & Health

- `GET /health`
  - Returns service status, system uptime, and API version.
  - Response:
    ```json
    {
      "success": true,
      "message": "Royal Feast API operational",
      "timestamp": "2026-11-23T22:00:00.000Z",
      "environment": "development"
    }
    ```

---

## 2. Authentication & Users (`/api/auth`)

- `POST /api/auth/register` - Create customer account
- `POST /api/auth/login` - Authenticate customer or administrator
- `GET /api/auth/profile` - Retrieve current session profile
- `PUT /api/auth/profile` - Update customer details

---

## 3. Menu & Categories (`/api/menu`)

- `GET /api/menu/categories` - List all public categories
- `GET /api/menu/items` - List menu items (supports query filters: `category`, `search`, `isVeg`, `isBestseller`)
- `GET /api/menu/items/:id` - Detailed view of specific menu item
- `POST /api/admin/menu/items` - [Admin] Create menu item
- `PUT /api/admin/menu/items/:id` - [Admin] Update item details/price/availability
- `DELETE /api/admin/menu/items/:id` - [Admin] Remove menu item

---

## 4. Reservations (`/api/reservations`)

- `GET /api/reservations/availability` - Query available table slots for date & headcount
- `POST /api/reservations/book` - Submit table reservation
- `GET /api/reservations/my-bookings` - Customer reservation history
- `PATCH /api/admin/reservations/:id/status` - [Admin] Update reservation state (Confirm, Cancel, Complete)

---

## 5. Orders & Cart (`/api/orders`)

- `GET /api/cart` - Retrieve current shopping cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:id` - Update quantity
- `DELETE /api/cart/items/:id` - Remove item
- `POST /api/orders/checkout` - Initialize order and payment intent
- `POST /api/orders/verify-payment` - Cryptographically verify payment signature
- `GET /api/orders/:id/track` - Real-time tracking of order lifecycle
- `GET /api/admin/orders` - [Admin] Paginated and filtered order management

---

## 6. Reviews & Feedback (`/api/reviews`)

- `GET /api/reviews` - Fetch verified customer reviews
- `POST /api/reviews` - Submit review
- `PATCH /api/admin/reviews/:id/moderate` - [Admin] Approve or hide review
