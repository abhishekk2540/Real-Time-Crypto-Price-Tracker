/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { websocketService } from '../services/websocketService';
import { updateCryptoData, toggleShowOnlyFavorites } from '../features/cryptoSlice';
import { selectFilteredCryptos, selectMarketStats, selectShowOnlyFavorites } from '../features/cryptoSelectors';
import CryptoTableRow from './CryptoTableRow';

const CryptoTable = () => {
  const dispatch = useDispatch();
  const cryptos = useSelector(selectFilteredCryptos);
  const marketStats = useSelector(selectMarketStats);
  const showOnlyFavorites = useSelector(selectShowOnlyFavorites);

  useEffect(() => {
   
    websocketService.connect();

  
    const unsubscribe = websocketService.onMessage((updates) => {
      dispatch(updateCryptoData(updates));
    });
    return () => {
      websocketService.disconnect();
      unsubscribe();
    };
  }, [dispatch]);

  const formatPrice = (price) => {
    return price < 1 ? `$${price.toFixed(4)}` : `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatMarketCap = (marketCap) => {
    return `$${(marketCap).toLocaleString('en-US')}`;
  };

  const formatPercentage = (value) => {
    const isPositive = value > 0;
    return (
      <span className={`flex items-center ${isPositive ? 'text-green-500' : value < 0 ? 'text-red-500' : 'text-gray-500'}`}>
        {isPositive ? '▲' : value < 0 ? '▼' : ''}
        {isPositive ? '+' : ''}{value.toFixed(2)}%
      </span>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
   
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">Total Market Cap</h3>
          <p className="text-xl font-semibold">${marketStats.totalMarketCap.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">24h Volume</h3>
          <p className="text-xl font-semibold">${marketStats.totalVolume24h.toLocaleString()}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm text-gray-500 mb-2">BTC Dominance</h3>
          <p className="text-xl font-semibold">
            {marketStats.dominanceByMarketCap.find(c => c.symbol === 'BTC')?.dominance}%
          </p>
        </div>
      </div>

    
      <div className="mb-4 flex justify-between items-center">
        <button
          onClick={() => dispatch(toggleShowOnlyFavorites())}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            showOnlyFavorites
              ? 'bg-yellow-400 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <span className="mr-2">★</span>
          {showOnlyFavorites ? 'Show All' : 'Show Favorites'}
        </button>
      </div>

  
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-sm text-left text-gray-500">
              <th className="py-3 px-4 font-medium">#</th>
              <th className="py-3 px-4 font-medium">Name</th>
              <th className="py-3 px-4 font-medium text-right">Price</th>
              <th className="py-3 px-4 font-medium text-right">1h %</th>
              <th className="py-3 px-4 font-medium text-right">24h %</th>
              <th className="py-3 px-4 font-medium text-right">7d %</th>
              <th className="py-3 px-4 font-medium text-right">Market Cap</th>
              <th className="py-3 px-4 font-medium text-right">Volume(24h)</th>
              <th className="py-3 px-4 font-medium text-right">Circulating Supply</th>
              <th className="py-3 px-4 font-medium text-right">Last 7 Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cryptos.map((crypto) => (
              <CryptoTableRow key={crypto.id} cryptoId={crypto.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CryptoTable; 