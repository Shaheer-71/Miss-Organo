import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminLoginPage from './pages/admin/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import AdminProductsPage from './pages/admin/ProductsPage';
import AdminOrdersPage from './pages/admin/OrdersPage';
import useAuthStore from './store/authStore';
import ScrollToTop from './components/common/ScrollToTop';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/admin/login', { state: { from: location } });
    }
  }, [isAuthenticated, user, isLoading, navigate, location]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
};

const CustomerRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // Redirect admin users to dashboard
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const isAdmin = isAuthenticated && user?.role === 'admin';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-accent-50 flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  // If user is admin, only show admin routes
  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <Routes>
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard\" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="orders" element={<AdminOrdersPage />} />
          </Route>
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="*" element={<Navigate to="/admin/dashboard\" replace />} />
        </Routes>
      </>
    );
  }

  // Regular user routes
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/home"
          element={
            <CustomerRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <HomePage />
                </main>
                <Footer />
              </>
            </CustomerRoute>
          }
        />
        <Route
          path="/"
          element={
            <CustomerRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <ProductsPage />
                </main>
                <Footer />
              </>
            </CustomerRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <CustomerRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <ProductDetailPage />
                </main>
                <Footer />
              </>
            </CustomerRoute>
          }
        />
        <Route
          path="/about"
          element={
            <CustomerRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <AboutPage />
                </main>
                <Footer />
              </>
            </CustomerRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <CustomerRoute>
              <>
                <Header />
                <main className="flex-grow">
                  <ContactPage />
                </main>
                <Footer />
              </>
            </CustomerRoute>
          }
        />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/\" replace />} />
      </Routes>
    </>
  );
}

export default App;