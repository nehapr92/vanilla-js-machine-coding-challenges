function myPromiseAny(taskList) {

  
    return new Promise((resolve, reject) => {
      if (taskList.length === 0) {
        reject(new AggregateError([], "All promises were rejected")); 
        // Reject immediately if input is empty
      }

      let rejectionCount = 0;
      const errors = [];
  
      for (let i = 0; i < taskList.length; i++) {
        Promise.resolve(taskList[i])
          .then(resolve) // Resolve as soon as any promise is fulfilled
          .catch((error) => {
            errors[i] = error;
            rejectionCount++;
  
            if (rejectionCount === taskList.length) {
              reject(new AggregateError(errors, "All promises were rejected")); // Reject if all promises are rejected
            }
          });
      }
    });
  }

  
  