
function debounce(fn, delay) {
  // This will store the timeout ID between calls
  let timeoutId;

  // Return a new debounced function
  return function (...args) {
    // Clear the previous timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    timeoutId = setTimeout(() => {
      fn.apply(this, args); // Ensure correct `this` and pass all arguments
    }, delay);
  };
}
