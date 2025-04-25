class WebSocketService {
  constructor() {
    this.callbacks = new Set();
    this.interval = null;
  }

  connect() {
    if (this.interval) return;

    this.interval = setInterval(() => {
      this.generatePriceUpdates();
    }, 1500); 
  }

  disconnect() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  onMessage(callback) {
    this.callbacks.add(callback);
    return () => this.callbacks.delete(callback);
  }

  generatePriceUpdates() {
    const updates = {};
    const cryptoIds = [1, 2, 3, 4, 5];
    
    cryptoIds.forEach(id => {
      const priceChange = (Math.random() * 4 - 2) / 100;
      const volumeChange = (Math.random() * 10 - 5) / 100;
      
      updates[id] = {
        priceChange,
        volumeChange,
        timestamp: Date.now()
      };
    });
    this.callbacks.forEach(callback => callback(updates));
  }
}

export const websocketService = new WebSocketService(); 