import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import OrderConfirmation from './pages/OrderConfirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminOrders from './pages/AdminOrders';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-brand-white text-brand-charcoal">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
