function deepOmit(obj, keysToOmit) {
  if (Array.isArray(obj)) {
    return obj.map(item => deepOmit(item, keysToOmit));
  }

  if (obj !== null && typeof obj === "object") {
    const result = {};
    for (let key in obj) {
      if (!keysToOmit.includes(key)) {
        result[key] = deepOmit(obj[key], keysToOmit);
      }
    }
    return result;
  }

  return obj; // primitive value
}
