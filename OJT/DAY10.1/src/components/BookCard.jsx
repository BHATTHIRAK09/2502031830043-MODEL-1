import React from 'react';
import { useCart } from '../context/CartContext';

const formatINR = (amount) =>
  amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

const BookCard = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md">
      <div>
        <div className="w-full h-48 bg-slate-100 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium">
          Cover Art Placeholder
        </div>
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-slate-500 mt-1 mb-4">{book.author}</p>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-xl font-extrabold text-slate-900">{formatINR(book.price)}</span>
        <button 
          onClick={() => addToCart(book)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BookCard;