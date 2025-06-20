
function myPromiseAll(taskList) {
  
    return new Promise((resolve, reject) => {
      if (taskList.length === 0) return resolve([]);

      const result = new Array(taskList.length);
      let completed = 0;

      for (let i = 0; i < taskList.length; i++) {
        Promise.resolve(taskList[i]) // Important*
          .then((data) => {
            result[i] = data; // Ensure result is stored in the correct order
            completed++;
  
            if (completed === taskList.length) {
              resolve(result);
            }
          })
          .catch((error) => {
            reject(error); // Reject immediately if any promise fails
          });
      }
    });
  }