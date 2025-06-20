// Question
// Asked in Thoughtspot, Multiplier
// Level ->> Medium


// Solution

//  In interview don't handle all data type in one shot, you can start with
//  string number object array then go for handling circular depedency

//  handle null properly, beacause typeof null === object

function jsonStringify(value) {
  if (value === null) return 'null';

  if (typeof value === 'string') {
    return `"${value}"`;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    const elements = value.map(el => jsonStringify(el) || 'null');
    return `[${elements.join(',')}]`;
  }

  if (typeof value === 'object') {
    const entries = [];
    for (let key in value) {
      if (value.hasOwnProperty(key)) {
        const val = jsonStringify(value[key]);
        if (val !== undefined) {
          entries.push(`"${key}":${val}`);
        }
      }
    }
    return `{${entries.join(',')}}`;
  }

  // undefined, functions, and symbols are ignored (like JSON.stringify)
  return undefined;
}



function jsonStringifyy(value) {}


const input = {
  name: "Neha",
  age: 34,
  active: true,
  tags: ["js", "react", null, undefined],
  profile: {
    github: "neha-dev",
    twitter: undefined,
    getName: function () { return this.name; },
    symbolProp: Symbol("hidden"),
  },
  createdAt: new Date("2025-05-21T10:30:00Z"),
  notes: null,
  scores: [1, 2, 3, { math: 95, sci: undefined }],
  emptyObj: {},
  emptyArr: [],
  address: {
    city: "Bangalore",
    zip: 560001,
    nested: {
      lat: 12.9716,
      long: 77.5946,
      extra: {
        info: "complex",
        deepNull: null
      }
    }
  }
};

const native = JSON.stringify(input);
const custom = jsonStringifyy(input);

console.log("✅ Native JSON.stringify:\n", native);
console.log("🔧 Custom jsonStringify:\n", custom);
console.log("✅ Match:", native === custom);


