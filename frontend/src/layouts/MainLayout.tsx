import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-royal-dark text-white">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};
