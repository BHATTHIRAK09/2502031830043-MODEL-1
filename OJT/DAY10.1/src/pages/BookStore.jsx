import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';

const SAMPLE_BOOKS = [
  { id: 1, title: "Eloquent JavaScript", author: "Marijn Haverbeke", price: 29.99, category: "Tech" },
  { id: 2, title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", price: 45.00, category: "Tech" },
  { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", price: 14.99, category: "Fiction" },
  { id: 4, title: "Atomic Habits", author: "James Clear", price: 21.99, category: "Self-Help" },
];

const BookStore = () => {
  const [books, setBooks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    // Simulating an incoming data stream or API call response
    setBooks(SAMPLE_BOOKS);
  }, []);

  const filteredBooks = activeFilter === 'All' 
    ? books 
    : books.filter(b => b.category === activeFilter);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Explore Books</h1>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
          {['All', 'Tech', 'Fiction', 'Self-Help'].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeFilter === cat ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookStore;