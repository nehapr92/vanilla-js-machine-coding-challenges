function deepMerge(target, source) {
    if (typeof target !== 'object' || target === null) return source;
    if (typeof source !== 'object' || source === null) return source;
  
    const result = Array.isArray(target) ? [...target] : { ...target };
  
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        const targetVal = result[key];
        const sourceVal = source[key];
  
        if (Array.isArray(targetVal) && Array.isArray(sourceVal)) {
          result[key] = [...targetVal, ...sourceVal];
        } else if (
          typeof targetVal === 'object' &&
          typeof sourceVal === 'object' &&
          targetVal !== null &&
          sourceVal !== null
        ) {
          result[key] = deepMerge(targetVal, sourceVal);
        } else {
          result[key] = sourceVal;
        }
      }
    }
  
    return result;
  }

  
  


function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      Object.assign(source[key], deepMerge(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}

const obj1 = { a: 1, b: { x: 10, y: 20 } };
const obj2 = { b: { y: 30, z: 40 }, c: 3 };

const mergedObj = deepMerge(obj1, obj2);

console.log(mergedObj); // Output: { a: 1, b: { x: 10, y: 30, z: 40 }, c: 3 }


  function deepMerge() {}