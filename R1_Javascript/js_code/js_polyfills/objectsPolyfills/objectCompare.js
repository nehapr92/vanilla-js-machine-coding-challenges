function compareObjects(obj1, obj2 ) {
	const difference = {};
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);

  const compareKeys = (key, obj1, obj2, parent) => {
    if (!(key in obj1)) {
      // Key added in obj2
      parent[key] = { to: obj2[key], from: "EMPTY" };
    } else if (!(key in obj2)) {
      // Key removed from obj1
      parent[key] = { from: obj1[key], to: "EMPTY" };
    } else if (typeof obj1[key] === 'object' && obj1[key] !== null &&
      typeof obj2[key] === 'object' && obj2[key] !== null) {
      // Recurse if both values are objects
      parent[key] = compareObjects(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
      parent[key] = { from: obj1[key], to: obj2[key] };
    }
  };
  keys.forEach(key => compareKeys(key, obj1, obj2, difference));

  return difference;
}

const diff = compareObjects(doc1, doc2)