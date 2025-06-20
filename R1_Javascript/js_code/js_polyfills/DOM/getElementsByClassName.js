function getElementsByClassNamePolyfill(className) {
  if (!className || typeof className !== 'string') return [];

  const elements = Array.from(document.querySelectorAll('*'));
  const result = [];

  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];
    
    // Using .classList if available
    if (el.classList && el.classList.contains(className)) {
      result.push(el);
    }
  }

  return result;
}


Element.prototype.getElementsByClassNamePolyfill = function(className) {
    // Input validation
    if (typeof className !== 'string') {
        throw new TypeError('Class name must be a string');
    }

    // Array to store all matching elements
    const results = [];
    
    /**
     * Helper function to check if an element has a specific class
     * Handles multiple classes correctly by splitting class string
     * 
     * @param {Element} element - DOM element to check
     * @param {string} cls - Class name to look for
     * @returns {boolean} - True if element has the class
     */
    const hasClass = (element, cls) => {
        // Split className string and check if any class matches
        return element.className?.split(' ')
            .some(c => c === cls);
    };
    
    /**
     * Recursive function to search through DOM tree
     * Collects all elements with matching class name
     * 
     * @param {Element} element - Current DOM element being checked
     */
    const searchDOM = (element) => {
        // Check if current element has the class
        if (hasClass(element, className)) {
            results.push(element);
        }
        
        // Recursively search all child elements
        for (let child of element.children) {
            searchDOM(child);
        }
    };
    
    // Start the search from the current element
    searchDOM(this);
    return results;
};
