import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 100,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCryptos(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        setLoading(false);
        console.error('API Error:', err);
      }
    };

    fetchCryptos();
  }, []);

  
  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-lg">
        Loading cryptocurrencies...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-bold text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green font-sans bg-black">
    
      <nav className="bg-gradient-to-r from-red-700 to-blue-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
      
          <div className="flex justify-center items-center  text-white text-2xl   font-bold tracking-wider mb-1 ">
            COINSPOT
          </div>

         

          
          <button className="text-white md:hidden focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </nav>


      <div className="container mx-auto p-4 mt-8"> 
        <h1 className="text-4xl font-bold text-center mb-8 text-white">Cryptocurrency Market Cap</h1>


        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by coin name or symbol..."
            className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-amber-400 text-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {filteredCryptos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="bg-white rounded-lg shadow-md p-5 flex flex-col items-start hover:shadow-lg transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={crypto.image}
                    alt={crypto.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <h2 className="text-xl font-semibold text-gray-900">
                    {crypto.name}{' '}
                    <span className="text-gray-500 text-sm font-normal">
                      ({crypto.symbol.toUpperCase()})
                    </span>
                  </h2>
                </div>
                <div className="text-left w-full">
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Current Price:</span> $
                    {crypto.current_price.toLocaleString()}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Market Cap:</span> $
                    {crypto.market_cap.toLocaleString()}
                  </p>
                  <p
                    className={`font-bold mt-2 ${
                      crypto.price_change_percentage_24h >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    24h Change: {crypto.price_change_percentage_24h?.toFixed(2)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 text-lg mt-10">
            No cryptocurrencies found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}

export default App;