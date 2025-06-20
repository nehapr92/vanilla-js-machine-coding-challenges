
function createDomElementsFromObject(inputNode) {
    // Base case: if the node is a string, return a text node
    if (typeof inputNode === 'string') {
        return document.createTextNode(inputNode);
    }

    // Create an element of the specified type
    const element = document.createElement(inputNode.type);

    // Set properties (attributes) if any exist
    if (inputNode.props) {
        for (const [key, value] of Object.entries(inputNode.props)) {
            if (key === 'children') continue; // Skip children, handled below
            element.setAttribute(key, value);
        }
    }

    // Recursively create child elements
    if (inputNode.children) {
        inputNode.children.forEach(child => {
            const childElement = createDomElementsFromObject(child);
            element.appendChild(childElement);
        });
    }

    return element;
}

// Example usage
const domInput = {
    type: 'div',
    props: { id: 'hello' },
    children: [
        { type: 'h1', children: ['HELLO'] }
    ]
};

// Generate the DOM element
const actualDomElement = createDomElementsFromObject(domInput);
console.log("actualDomElement", actualDomElement);
// Append to the document body for demonstration
document.body.appendChild(actualDomElement);

/* Log output:
"actualDomElement" <div id="hello"><h1>HELLO</h1></div>
*/