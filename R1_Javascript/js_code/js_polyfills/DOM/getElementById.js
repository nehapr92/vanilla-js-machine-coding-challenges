Element.prototype.getElementByIdPolyfill = function(id) {
    // Input validation
    if (typeof id !== 'string') {
        throw new TypeError('ID must be a string');
    }

    // Base case: check if current element matches
    if (this.id === id) {
        return this;
    }
    
    // Recursive case: check all child elements
    // Using for...of for better performance with NodeList/HTMLCollection
    for (let child of this.children) {
        const found = child.getElementByIdPolyfill(id);
        // Return immediately if element is found in this branch
        if (found) {
            return found;
        }
    }
    
    // Return null if no element is found
    return null;
};