import React from 'react';
import { useCart } from '../context/CartContext';

const formatINR = (amount) =>
  amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

const Checkout = () => {
  const { cart, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
        <h2 className="text-xl font-bold text-slate-700">Your cart is currently empty</h2>
        <p className="text-slate-400 mt-1">Head back to the storefront to add some reading material.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Review Order</h2>
      <div className="divide-y divide-slate-100">
        {cart.map(item => (
          <div key={item.id} className="py-4 flex justify-between items-center">
            <div>
              <h4 className="font-semibold text-slate-800">{item.title}</h4>
              <p className="text-sm text-slate-500">Qty: {item.quantity} × {formatINR(item.price)}</p>
            </div>
            <span className="font-bold text-slate-900">{formatINR(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 mt-6 pt-6 flex justify-between items-center">
        <span className="text-lg font-bold text-slate-700">Total Amount:</span>
        <span className="text-2xl font-black text-indigo-600">{formatINR(cartTotal)}</span>
      </div>
      <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl mt-6 transition-colors shadow-sm">
        Place Order Securely
      </button>
    </div>
  );
};

export default Checkout;