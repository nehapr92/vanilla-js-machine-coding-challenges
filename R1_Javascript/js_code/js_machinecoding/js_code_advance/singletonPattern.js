const Singleton = (function() {
  let instance; 

  function init() {
    console.log("Singleton instance created!");
    // Initialize any properties or methods here if needed
  }

  return function() { // Returned function acts as the constructor
    if (!instance) {
      instance = {}; // Create the singleton object
      init();             // Call initialization only once
    }
    return instance; 
  };
})();

// Accessing and using the singleton:
const firstInstance = Singleton(); 
const secondInstance = Singleton(); 

console.log(firstInstance === secondInstance); // Output: true (They both reference the same object)
