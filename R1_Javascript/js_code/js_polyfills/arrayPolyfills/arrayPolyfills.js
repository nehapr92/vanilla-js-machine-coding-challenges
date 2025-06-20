Array.prototype.myForEach = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};



Array.prototype.myMap = function(callback) {
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
  
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
  };
  

Array.prototype.myFilter = function(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
  

Array.prototype.myReduce = function(callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  let accumulator = initialValue;
  0

  for (let i = 0; i < this.length; i++) {
      accumulator = accumulator?callback(accumulator, this[i], i, this):this[0];
  }
  return accumulator;
};
  

Array.prototype.myEvery = function(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};


Array.prototype.mySome = function(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

Array.prototype.myAt = function(index) {
  const len = this.length;
  const i = index < 0 ? len + index : index;

  return (i >= 0 && i < len) ? this[i] : undefined;
};



  
  //Practise

  Array.prototype.myForEach = function (callback) {

  };

  Array.prototype.myMapp = (cb) => {
    let result = [];

    for (let i =0; i<this.length; i++){
      result[i] = cb(this[i], i, this);
    }

    return result;
    
  }

  Array.prototype.myFilterr = function(cb) {
    if (typeof cb !== 'function') {
      throw new Error(cb + ' is not a function');
    }

    let result = [];

    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        result.push(this[i]);
      }
    }

    return result;
  };

  Array.prototype.myReducee = (cb, initialvalue) => {
    if(typeof cb != 'function'){
      throw new Error(cb + 'is not a function');
    }

    let accumulator = initialvalue;
    for(let i =0; i<this.length; i++){
      accumulator = accumulator? cb(accumulator, this[i], i, this): this[0];
    }
    return accumulator;

  }

  Array.prototype.myEveryy = (cb) => {

    if(typeof cb != 'function'){
      throw new Error(cb + 'is not a function');
    }

    for(let i =0; i<this.length; i++){
      if(!cb(this[i], i , this))
      {
        return false;
      }
    }
    return true;
  }


Array.prototype.mySome = function(cb) {
    if (typeof cb != 'function')
    {
      throw new Error(cb + "is not a function")
    }

    for(let i =0; i<this.length; i++){
      if(cb(this[i], i , this))
      {
        return true;
      }
    }
    return false;

  };
  
  Array.prototype.myAt = function(index) {

    let newIndex = index >= 0 ? index : this.length+index;
    let result = newIndex >=0 && newIndex < this.length ? this[newIndex]:undefined

    return result;
  };

  const arr = [1, 2, 3, 4, 5];
  
  // Using myMap
  const doubled = arr.myMapp(x => x * 2);
  console.log(doubled); // [2, 4, 6, 8, 10]
  
  // Using myFilter
  const evenNumbers = arr.myFilterr(x => x % 2 === 0);
  console.log(evenNumbers); // [2, 4]
  
  // Using myReduce
  const sum = arr.myReducee((acc, curr) => acc + curr, 0);
  console.log(sum); // 15
  
  // Using myEvery
  const allPositive = arr.myEveryy(x => x > 0);
  console.log(allPositive); // true
  


  // Alternate Approach where we pass additional args 