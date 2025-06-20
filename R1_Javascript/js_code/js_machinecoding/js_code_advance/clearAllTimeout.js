/**
 * cancel all timer from window.setTimeout
 */
function clearAllTimeout() {
    window.__timeOuts.forEach(id => clearTimeout(id))
  }
  
  window.__timeOuts = [];
  const timeoutFn = window.setTimeout;
  
  window.setTimeout = (...args) => {
  
    const id = timeoutFn(...args);
    window.__timeOuts.push(id);
  
    return id;
  }