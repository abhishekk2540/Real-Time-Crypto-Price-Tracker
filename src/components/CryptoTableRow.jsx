import React, { memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCryptoById, selectIsCryptoFavorited } from '../features/cryptoSelectors';
import { toggleFavorite } from '../features/cryptoSlice';
import SimpleChart from './SimpleChart';

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

const getChartColor = (change7d) => {
  return change7d >= 0 ? '#22c55e' : '#ef4444';
};

const CryptoTableRow = memo(({ cryptoId }) => {
  const dispatch = useDispatch();
  const crypto = useSelector(state => selectCryptoById(state, cryptoId));
  const isFavorited = useSelector(state => selectIsCryptoFavorited(state, cryptoId));

  if (!crypto) return null;

  return (
    <tr className="hover:bg-gray-50">
      <td className="py-4 px-4 text-gray-500">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => dispatch(toggleFavorite(cryptoId))}
            className={`transition-colors ${
              isFavorited ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
            }`}
          >
            ★
          </button>
          {crypto.id}
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <img 
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
            alt={crypto.name}
            className="w-6 h-6"
          />
          <span className="font-medium">{crypto.name}</span>
          <span className="text-gray-500 text-sm">{crypto.symbol}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-right font-medium">{formatPrice(crypto.price)}</td>
      <td className="py-4 px-4 text-right">{formatPercentage(crypto.change1h)}</td>
      <td className="py-4 px-4 text-right">{formatPercentage(crypto.change24h)}</td>
      <td className="py-4 px-4 text-right">{formatPercentage(crypto.change7d)}</td>
      <td className="py-4 px-4 text-right">{formatMarketCap(crypto.marketCap)}</td>
      <td className="py-4 px-4 text-right">
        <div>
          <div>${crypto.volume24h.toLocaleString('en-US')}</div>
          <div className="text-gray-500 text-sm">{crypto.volumeCrypto}</div>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex flex-col items-end">
          <div>{crypto.circulatingSupply}</div>
          <div className="w-24 bg-gray-200 h-1.5 rounded-full mt-1">
            <div className="bg-gray-400 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </td>
      <td className="py-4 px-4">
        <div className="h-16 w-36">
          <SimpleChart data={crypto} color={getChartColor(crypto.change7d)} />
        </div>
      </td>
    </tr>
  );
});

CryptoTableRow.displayName = 'CryptoTableRow';

export default CryptoTableRow; 