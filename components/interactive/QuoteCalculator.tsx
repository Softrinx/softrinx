"use client";

import React, { useState } from 'react';

interface Quote {
  price: number;
  currency: string;
  details: string;
}

const QuoteCalculator = () => {
  const [quote, setQuote] = useState<Quote | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would gather form data
    const formData = { service: 'web-development', pages: 5 };
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setQuote(data.quote);
  };

  return (
    <div className="p-8 border rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Get a Quote</h2>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for quote calculation here */}
        <button
          type="submit"
          className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Calculate Quote
        </button>
      </form>
      {quote && (
        <div className="mt-8">
          <h3 className="text-xl font-bold">Your Quote:</h3>
          <p>Price: {quote.price} {quote.currency}</p>
          <p>Details: {quote.details}</p>
        </div>
      )}
    </div>
  );
};

export default QuoteCalculator;
