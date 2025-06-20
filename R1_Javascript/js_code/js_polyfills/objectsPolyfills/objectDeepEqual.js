function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (
    obj1 == null ||
    typeof obj1 !== 'object' ||
    obj2 == null ||
    typeof obj2 !== 'object'
  )
    return false;

  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}

// Example usage
const object1 = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001',
  },
};

const object2 = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    zip: '10001',
  },
};

console.log(deepEqual(object1, object2)); // true

  
function deepEqual(a, b) {
  // Same reference or primitive
  if (a === b) return true;

  // Handle null or different types
  if (a == null || b == null || typeof a !== "object" || typeof b !== "object") {
    return false;
  }

  // Arrays
  if (Array.isArray(a) !== Array.isArray(b)) return false;

  // Get keys
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // Different number of keys
  if (keysA.length !== keysB.length) return false;

  // Recursively compare all keys
  for (let key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}


  function deepEquall(){}