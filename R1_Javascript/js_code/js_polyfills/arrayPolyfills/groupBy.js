function groupBy(array, keyFn) {
    const result = {};
  
    for (const item of array) {
      const key = keyFn(item);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(item);
    }
  
    return result;
}



Array.prototype.groupBy = function(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    const result = {};

    for (let i = 0; i < this.length; i++) {
      const key = callback(this[i], i, this);
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(this[i]);
    }

    return result;
};


const data = ['one', 'two', 'three', 'four'];
const grouped = data.groupBy(str => str.length);
// Output: { 3: ['one', 'two'], 5: ['three'], 4: ['four'] }
console.log(grouped);

