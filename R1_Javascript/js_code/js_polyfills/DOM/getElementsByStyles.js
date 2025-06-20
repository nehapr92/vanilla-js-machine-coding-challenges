function getElementByStyles(property, value) {
  const elements = document.querySelectorAll('*');
  const result = [];
  for (let i = 0; i < elements.length; i++) {
    const el = elements[i];

    const style = window.getComputedStyle(el);
    if(style[property] === value)
    {
      result.push(el);
    }
  }
}


// ✅ Example usage:
const flexElements = getElementByStyles('display', 'flex');
console.log(flexElements); // Elements with display: flex