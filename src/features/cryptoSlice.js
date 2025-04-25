import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cryptoData: [
    {
      id: 1,
      name: "Bitcoin",
      symbol: "BTC",
      price: 93759.48,
      change1h: 0.43,
      change24h: 0.93,
      change7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      volumeCrypto: "467.81K BTC",
      circulatingSupply: "19.85M BTC",
     
    },
    {
      id: 2,
      name: "Ethereum",
      symbol: "ETH",
      price: 1802.46,
      change1h: 0.60,
      change24h: 3.21,
      change7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      volumeCrypto: "13.05M ETH",
      circulatingSupply: "120.71M ETH",
    
    },
    {
      id: 3,
      name: "Tether",
      symbol: "USDT",
      price: 1.00,
      change1h: 0.00,
      change24h: 0.00,
      change7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      volumeCrypto: "92.25B USDT",
      circulatingSupply: "145.27B USDT",
    
    },
    {
      id: 4,
      name: "XRP",
      symbol: "XRP",
      price: 2.22,
      change1h: 0.46,
      change24h: 0.54,
      change7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      volumeCrypto: "2.30B XRP",
      circulatingSupply: "58.39B XRP",
    
    },
    {
      id: 5,
      name: "BNB",
      symbol: "BNB",
      price: 606.65,
      change1h: 0.09,
      change24h: -1.20,
      change7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      volumeCrypto: "3.08M BNB",
      circulatingSupply: "140.89M BNB",
    
    }
  ],
  favorites: [], // Array of crypto IDs that are favorited
  showOnlyFavorites: false // Toggle to show only favorite cryptos
};

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updateCryptoData: (state, action) => {
      const updates = action.payload;
      state.cryptoData = state.cryptoData.map(crypto => {
        const update = updates[crypto.id];
        if (!update) return crypto;

        const newPrice = crypto.price * (1 + update.priceChange);
        const newVolume = crypto.volume24h * (1 + update.volumeChange);

        return {
          ...crypto,
          price: newPrice,
          change1h: crypto.change1h + (update.priceChange * 100),
          change24h: crypto.change24h + (update.priceChange * 50),
          volume24h: newVolume,
          volumeCrypto: `${(newVolume / newPrice).toFixed(2)} ${crypto.symbol}`,
        };
      });
    },
    toggleFavorite: (state, action) => {
      const cryptoId = action.payload;
      if (state.favorites.includes(cryptoId)) {
        // Remove from favorites if already favorited
        state.favorites = state.favorites.filter(id => id !== cryptoId);
      } else {
        // Add to favorites if not already favorited
        state.favorites.push(cryptoId);
      }
    },
    toggleShowOnlyFavorites: (state) => {
      state.showOnlyFavorites = !state.showOnlyFavorites;
    }
  },
});

export const { updateCryptoData, toggleFavorite, toggleShowOnlyFavorites } = cryptoSlice.actions;
export default cryptoSlice.reducer; 