class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Move the accessed key to the end (most recently used)
    const value = this.cache.get(key);
    this.cache.delete(key);
    
    this.cache.set(key, value);  // Insert at the end

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key); // Remove old position
    } else if (this.cache.size >= this.capacity) {
      // Remove the least recently used item (first key)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    this.cache.set(key, value); // Insert at the end
  }
}
