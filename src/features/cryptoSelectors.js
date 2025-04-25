import { createSelector } from '@reduxjs/toolkit';

// Base selector
const selectCryptoState = (state) => state.crypto;

// Select all crypto data
export const selectAllCryptos = createSelector(
  [selectCryptoState],
  (crypto) => crypto.cryptoData
);

// Select favorites
export const selectFavorites = createSelector(
  [selectCryptoState],
  (crypto) => crypto.favorites
);

// Select show only favorites flag
export const selectShowOnlyFavorites = createSelector(
  [selectCryptoState],
  (crypto) => crypto.showOnlyFavorites
);

// Select filtered cryptos (all or favorites only)
export const selectFilteredCryptos = createSelector(
  [selectAllCryptos, selectFavorites, selectShowOnlyFavorites],
  (cryptos, favorites, showOnlyFavorites) => {
    if (!showOnlyFavorites) return cryptos;
    return cryptos.filter(crypto => favorites.includes(crypto.id));
  }
);

// Select if a specific crypto is favorited
export const selectIsCryptoFavorited = createSelector(
  [selectFavorites, (_, id) => id],
  (favorites, id) => favorites.includes(id)
);

// Select crypto by ID
export const selectCryptoById = createSelector(
  [selectAllCryptos, (_, id) => id],
  (cryptos, id) => cryptos.find(crypto => crypto.id === id)
);

// Select total market cap
export const selectTotalMarketCap = createSelector(
  [selectAllCryptos],
  (cryptos) => cryptos.reduce((sum, crypto) => sum + crypto.marketCap, 0)
);

// Select price changes
export const selectPriceChanges = createSelector(
  [selectAllCryptos],
  (cryptos) => cryptos.map(crypto => ({
    id: crypto.id,
    symbol: crypto.symbol,
    change1h: crypto.change1h,
    change24h: crypto.change24h,
    change7d: crypto.change7d,
  }))
);

// Select volume statistics
export const selectVolumeStats = createSelector(
  [selectAllCryptos],
  (cryptos) => cryptos.map(crypto => ({
    id: crypto.id,
    symbol: crypto.symbol,
    volume24h: crypto.volume24h,
    volumeCrypto: crypto.volumeCrypto,
  }))
);

// Select market statistics
export const selectMarketStats = createSelector(
  [selectAllCryptos],
  (cryptos) => ({
    totalMarketCap: cryptos.reduce((sum, crypto) => sum + crypto.marketCap, 0),
    totalVolume24h: cryptos.reduce((sum, crypto) => sum + crypto.volume24h, 0),
    dominanceByMarketCap: cryptos.map(crypto => ({
      symbol: crypto.symbol,
      dominance: (crypto.marketCap / cryptos.reduce((sum, c) => sum + c.marketCap, 0) * 100).toFixed(2)
    }))
  })
); 