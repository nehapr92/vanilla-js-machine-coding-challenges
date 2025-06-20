
class MyPromise {
  constructor(executor) {
    // 🧺 Queue to store `.then()` callbacks
    this.queue = [];

    // ❌ Error and 🔚 finally handlers
    this.errorHandler = () => {};
    this.finallyHandler = () => {};

    // 🚀 Immediately execute the passed-in function
    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (err) {
      this.reject(err); // 💥 Catch synchronous errors
    }
  }

  // ✅ When promise is fulfilled, call all queued `.then()` handlers
  resolve(value) {
    this.queue.forEach((cb) => cb(value));
    this.finallyHandler(); // 🚪 Run the `.finally()` callback
  }

  // ❌ If error occurs, call `.catch()` handler
  reject(error) {
    this.errorHandler(error);
    this.finallyHandler(); // 🚪 Still run `.finally()` callback
  }

  // ➕ Chainable `.then()` method
  then(cb) {
    this.queue.push(cb); // 📌 Store callback for later
    return this; // 🔁 Enable chaining
  }

  // 🛑 Register error handler
  catch(cb) {
    this.errorHandler = cb;
    return this; // 🔁 Enable chaining
  }

  // 🔚 Register cleanup/final handler
  finally(cb) {
    this.finallyHandler = cb;
    return this; // 🔁 Enable chaining
  }
}