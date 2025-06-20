function getElementsByNamePolyfill(name) {
    const result = [];
    const allElements = document.querySelectorAll('*');
  
    for (let i = 0; i < allElements.length; i++) {
      const el = allElements[i];
      if (el.getAttribute('name') === name) {
        result.push(el);
      }
    }
  
    return result;
  }

  /*
  <input type="text" name="email" />
<input type="text" name="username" />

<script>
  const inputs = getElementsByNamePolyfill('email');
  console.log(inputs); // Logs the input with name="email"
</script>
*/
  