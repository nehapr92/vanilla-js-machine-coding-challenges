


const flattenIterative = (arr) => {
  const stack = [...arr]; // clone input array
  const result = [];

  while (stack.length) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      stack.push(...item); // flatten one level and push back to stack
    } else {
      result.push(item);
    }
  }

  return result.reverse(); // reverse at end to maintain original order
};


const flattenRecursive = (arr) => {
  if (!Array.isArray(arr)) {
      throw new Error("Input must be an array");
  }
  const result = [];
  for (const ele of arr) {
      if (Array.isArray(ele)) {
          result.push(...flattenRecursive(ele)); 
      } else {
          result.push(ele);
      }
  }
  return result;
};


const flattenRecursiveWithDepth = (arr, depth) => {
    if (!Array.isArray(arr)) {
      throw new TypeError("The first argument must be an array.");
    }
  
    let result = [];
  
    if (depth === 0) return arr;
  
    for (let ele of arr) {
      if (Array.isArray(ele) && depth > 0) {
        result.push(...flattenRecursiveWithDepth(ele, depth - 1));
      } else {
        result.push(ele);
      }
    }
  
    return result;
  };
  
const flattenRecursiveandReduce = (arr) => {

    return arr.reduce((acc, curr) => {
        if (Array.isArray(curr)) {
            // If current element is an array, recursively flatten it
            acc.push(...curr.flattenRecursiveandReduce());
        } else {
            // If it's a primitive value, add directly to accumulator
            acc.push(curr);
        }
        return acc;
    }, []);
}

// Custom recursive array flattener
function flattenArray(arr) {
  return arr.reduce(
    (acc, val) =>
      Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val),
    [],
  );
}






const result = flattenRecursiveWithDepthh(
              [[[[[0]]], [1]], [[[2], [3]]], [[4], [5]]], 1
  );
console.log(result);