/**
 * @param {(...args) => void} func
 * @returns {(...args) => Promise<any}
 */
function promisify(func) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        const callback = (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data)
          }
        }
        func.call(this, ...args, callback);
      })
    }
  
  }