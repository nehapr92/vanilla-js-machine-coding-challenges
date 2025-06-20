if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function(callback, thisArg) {
      if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
      }
  
      const result = [];
  
      for (let i = 0; i < this.length; i++) {
        if (i in this) {
          const mapped = callback.call(thisArg, this[i], i, this);
  
          if (Array.isArray(mapped)) {
            for (let j = 0; j < mapped.length; j++) {
              result.push(mapped[j]);
            }
          } else {
            result.push(mapped);
          }
        }
      }
  
      return result;
    };
  }
  