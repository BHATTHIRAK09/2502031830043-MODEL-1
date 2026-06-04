import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import BookStore from './pages/BookStore';
import Checkout from './pages/Checkout';

// Mini inner component to display a live nav badge item counter
const NavigationBar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-tight text-indigo-600">
          Bhatt<span className="text-slate-800">Books</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
            Shop Store
          </Link>
          <Link to="/checkout" className="relative text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5">
            Cart
            {cartCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-slate-50/50 text-slate-600 font-sans antialiased">
          <NavigationBar />
          <main className="max-w-6xl mx-auto px-4 py-10">
            <Routes>
              <Route path="/" element={<BookStore />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;