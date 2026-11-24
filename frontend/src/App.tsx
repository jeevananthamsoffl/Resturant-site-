import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ScrollToTop } from './components/common/ScrollToTop';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
