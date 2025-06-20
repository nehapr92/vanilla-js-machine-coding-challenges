function memoize(fn) {
    const cache = new Map();
  
    return function (...args) {
      const key = JSON.stringify(args); // safe for primitives & arrays
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn.apply(this, args);
      cache.set(key, result);
      return result;
    };
  }
  


  const memoization = (fn) => {
    const cache = new Map();
  
    // Serialize arguments to create a unique key
    const serialize = (value) => {
      if (typeof value === "object" && value !== null) {
        // Normalize the object by sorting its keys
        const sortedKeys = Object.keys(value).sort();
        return `{${sortedKeys.map((key) => `"${key}":${JSON.stringify(value[key])}`).join(",")}}`;
      }
      return JSON.stringify(value); // Handle numbers, strings, etc.
    };
  
    return function (...args) {
      const cacheKey = args.map(serialize).join("|");
  
      if (cache.has(cacheKey)) {
        return cache.get(cacheKey);
      }
  
      const result = fn.apply(this, args);
      cache.set(cacheKey, result);
      return result;
    };
  };


  function memoize(func) {
    const cache = new Map();



    return function (...args) {
        const cacheKey = args.map( arg =>
        {
            if(typeof arg === 'object' && obj !== null){
                return JSON.stringify(Object.entries(arg).sort())
            }
            return JSON.stringify(arg)
        }).join('|');
        if (cache.has(cacheKey)) {
            return cache.get(cacheKey);
        }

        const result = func(...args);
        cache.set(cacheKey, result);
        return result;
    };
}
module.exports = memoize;



function memoize(fn)
{
    const cache = new Map();

    const serialize = (value) => {

        if (value === null) return 'null'
        if (typeof value === 'function') return value.toString();
        if (typeof value !== 'object') return JSON.stringify(value)

        if (Array.isArray(value)) {
            return `[${value.map(serialize).join(',')}]`;
        }

        const sortedKeys = Object.keys(value).sort();
        const objStr = sortedKeys.map(key => `"${key}":${serialize(value[key])}`).join(',')
        return `{${objStr}}`;
        
    }

    return function (...args) {
        const cacheKey = args.map(serialize).join('|')
        if (cache.has(cacheKey))
        {
            return cache.get(cacheKey)
        }

        const result = fn(...args)
        cache.set(cacheKey, result)
        return result 
    }

}

module.exports = memoize;