import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProductListPage from './pages/products/ProductListPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import OrderConfirmationPage from './pages/checkout/OrderConfirmationPage';
import OrdersPage from './pages/dashboard/OrdersPage';
import OrderDetailPage from './pages/dashboard/OrderDetailPage';
import AdminOrdersPage from './pages/admin/AdminOrdersPage';
import AdminOrderDetailPage from './pages/admin/AdminOrderDetailPage';
import LogisticsOrdersPage from './pages/logistics/LogisticsOrdersPage';
import LogisticsUpdatePage from './pages/logistics/LogisticsUpdatePage';


function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {/* Public Pages */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductListPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/checkout/confirmation" element={<OrderConfirmationPage />} />
                  
                  {/* Auth Pages */}
                  <Route path="/auth/login" element={<LoginPage />} />
                  <Route path="/auth/register" element={<RegisterPage />} />

                  {/* User Dashboard */}
                  <Route path="/dashboard" element={<OrdersPage />} />
                  <Route path="/dashboard/orders/:id" element={<OrderDetailPage />} />

                  {/* Admin Dashboard */}
                  <Route path="/admin" element={<AdminOrdersPage />} />
                  <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />

                  {/* Logistics Dashboard */}
                  <Route path="/logistics" element={<LogisticsOrdersPage />} />
                  <Route path="/logistics/orders/:id" element={<LogisticsUpdatePage />} />
                  
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;