function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;

  // Handle circular references
  if (hash.has(obj)) return hash.get(obj);

  let clone;

  if (obj instanceof Date) {
    clone = new Date(obj);
  } else if (obj instanceof Array) {
    clone = [];
    hash.set(obj, clone);
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i], hash);
    }
  } else if (obj instanceof Object) {
    clone = {};
    hash.set(obj, clone);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = deepClone(obj[key], hash);
      }
    }
  } else {
    clone = obj;
  }

  return clone;
}


function deepClonee(){}


const original = {
  name: "Neha",
  age: 34,
  meta: {
    birth: new Date("1990-07-12"),
    skills: ["JS", "React"],
  },
  scores: [10, 20, { subject: "Math", score: 100 }],
};

const clone = deepClone(original);

console.log("✅ Value equal:", JSON.stringify(original) === JSON.stringify(clone)); // true
console.log("🧠 Reference different:", original !== clone);

