

function retryPromise(fn, retries = 3, delay = 1000) {
    // return promise
    return new Promise((resolve, reject) => {
      const attempt = (n) => {
        fn()
          .then(resolve)
          .catch((error) => {
            if (n <= 1) {
              reject(error); // If no retries left, reject the promise
            } else {
              setTimeout(() => {
                attempt(n - 1); // Retry the function after a delay
              }, delay);
            }
          });
      };
      attempt(retries); // Start the first attempt with the given retries
    });
  }

  async function fetchWithAutoRetry(fetcher, maximumRetryCount) {
    // write your solution below
    try {
      const response = await fetcher();
      return response;
    } catch (error) {
      if (maximumRetryCount === 0) {
        throw new Error(error.message);
      }
  
      return fetchWithAutoRetry(fetcher, maximumRetryCount - 1)
    }
  }