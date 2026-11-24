# Royal Feast - PostgreSQL Database Design (Prisma ORM)

This document specifies the relational schema and architectural design for the **ROYAL FEAST** platform.

---

## 1. Schema Overview

The database design adheres to 3NF normalization rules while snapshotting critical commercial data (e.g., historical item prices on ordered line items) to guarantee financial auditability and data integrity.

### Core Domain Entities

1. **Identity & Access Management (RBAC)**
   - `User`: Customers, Managers, Receptionists, Kitchen Staff, Super Admins.
   - `Role`: Granular roles (`SUPER_ADMIN`, `MANAGER`, `KITCHEN_STAFF`, `RECEPTIONIST`, `CUSTOMER`).
   - `Address`: Customer delivery and billing addresses.
   - `AuditLog`: Administrative traceability.

2. **Catalog & Menu Architecture**
   - `Category`: Categories (Starters, Soups, Main Course, Indian Cuisine, Continental, Desserts, Beverages) with ordering hierarchy.
   - `MenuItem`: Food items with pricing, dietary labels (Veg/Non-Veg), bestseller flag, preparation time, availability status.
   - `MenuItemImage`: High-resolution gallery photographs.

3. **Ordering & Checkout Engine**
   - `Cart` & `CartItem`: Persistent shopping session per customer.
   - `Order`: Order headers tracking status, fulfillment method (`DELIVERY` vs `TAKEAWAY` vs `DINE_IN`), delivery fee, taxes, discount, final amount.
   - `OrderItem`: Line items with price snapshots and item specifications.
   - `Payment`: Transaction receipts, payment gateway IDs, status (`PENDING`, `SUCCESS`, `FAILED`, `REFUNDED`).

4. **Table Reservation System**
   - `RestaurantTable`: Physical dining tables, capacity, area/zone (Main Hall, Terrace, VIP Lounge).
   - `Reservation`: Booking slots, guest headcount, contact details, status (`PENDING`, `CONFIRMED`, `CANCELLED`, `COMPLETED`), special requests.

5. **Customer Engagement & Marketing**
   - `Review`: Verified customer ratings (1-5 stars), textual review, admin moderation status (`APPROVED`, `PENDING`, `REJECTED`).
   - `Coupon` & `CouponUsage`: Promotional codes, minimum spend thresholds, fixed/percentage discounts, validity periods, redemption limits.
   - `Gallery`: Curated restaurant photography categorized by ambiance, food, events, and kitchen.
   - `RestaurantSetting`: Global metadata, business hours, tax rates, delivery radii, branding.

---

## 2. Relational Entity Diagram

```text
+----------------+       1:N       +-------------------+
|    Category    | <-------------> |     MenuItem      |
+----------------+                 +-------------------+
                                             | 1:N
                                             v
                                   +-------------------+
                                   |   MenuItemImage   |
                                   +-------------------+
                                             ^
                                             | N:1
+----------------+       1:N       +-------------------+
|     Order      | <-------------> |     OrderItem     |
+----------------+                 +-------------------+
       | 1:1
       v
+----------------+
|    Payment     |
+----------------+

+----------------+       1:N       +-------------------+
|     User       | <-------------> |   Reservation     |
+----------------+                 +-------------------+
       | 1:N                                 | N:1
       v                                     v
+----------------+                 +-------------------+
|     Review     |                 |  RestaurantTable  |
+----------------+                 +-------------------+
```

---

## 3. Financial Integrity & Price Snapshotting

When an order is created, the system copies the current `MenuItem.price` directly into `OrderItem.price`. This prevents historical accounting discrepancy if restaurant management updates menu prices in the future.
