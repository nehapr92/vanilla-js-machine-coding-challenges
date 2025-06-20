function getElementsByTagNamePolyfill(tagName) {
    const result = [];
    const allElements = document.querySelectorAll('*');
  
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      if (el.tagName.toLowerCase() === tagName.toLowerCase()) {
        result.push(el);
      }
    }
  
    return result;
  }
  