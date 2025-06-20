// HTML:
// <ul id="item-list">
//   <li>Item 1</li>
//   <li>Item 2</li>
// </ul>

const itemList = document.getElementById('item-list');

itemList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    console.log(`Clicked on ${event.target.textContent}`);
  }
});
