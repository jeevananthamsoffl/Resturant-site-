import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { AdminLayout } from '../layouts/AdminLayout';

// Customer Pages
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { MenuPage } from '../pages/MenuPage';
import { GalleryPage } from '../pages/GalleryPage';
import { ReservationsPage } from '../pages/ReservationsPage';
import { ContactPage } from '../pages/ContactPage';
import { AccountPage } from '../pages/AccountPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { OrderTrackingPage } from '../pages/OrderTrackingPage';
import { TrackSearchPage } from '../pages/TrackSearchPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';

// Admin Console Pages (Phase 5)
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminMenuPage } from '../pages/admin/AdminMenuPage';
import { AdminCategoriesPage } from '../pages/admin/AdminCategoriesPage';
import { AdminOrdersPage } from '../pages/admin/AdminOrdersPage';
import { AdminReservationsPage } from '../pages/admin/AdminReservationsPage';
import { AdminStaffPage } from '../pages/admin/AdminStaffPage';
import { AdminCouponsPage } from '../pages/admin/AdminCouponsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Customer Facing Web Platform */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="menu" element={<MenuPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="reservations" element={<ReservationsPage />} />
        <Route path="reservation" element={<ReservationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="account" element={<AccountPage />} />

        {/* Ordering, Cart & Live Tracking */}
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="orders/:orderNumber/track" element={<OrderTrackingPage />} />
        <Route path="track-order" element={<TrackSearchPage />} />

        {/* 404 Fallback */}
        <Route
          path="*"
          element={
            <PlaceholderPage
              title="404 — Page Not Found"
              subtitle="The requested culinary destination does not exist. Please navigate back to our homepage."
              phase="Status 404"
            />
          }
        />
      </Route>

      {/* Admin Management System (Phase 5) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="menu" element={<AdminMenuPage />} />
        <Route path="categories" element={<AdminCategoriesPage />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="reservations" element={<AdminReservationsPage />} />
        <Route path="staff" element={<AdminStaffPage />} />
        <Route path="coupons" element={<AdminCouponsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};
