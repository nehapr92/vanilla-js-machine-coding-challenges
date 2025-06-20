
const flattenObject = (obj, prefix = "", result = {}) => {
    // Iterate over the keys of the object
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const newKey = prefix ? `${prefix}_${key}` : key;
        if (Array.isArray(obj[key])) {
          // Handle arrays first, flatten each element with index
          obj[key].forEach((item, index) => {
            flattenObject(item, `${newKey}_${index}`, result);
          });
        } else if (typeof obj[key] === "object" && obj[key] !== null) {
          // Recursively flatten nested objects
          flattenObject(obj[key], newKey, result);
        } else {
          // Assign primitive values or `null` directly to the result
          result[newKey] = obj[key];
        }
      }
    }
    return result;
  };

  const flattenObjectt = () => {
  }
  console.log(flattenObject({user}))
  
  