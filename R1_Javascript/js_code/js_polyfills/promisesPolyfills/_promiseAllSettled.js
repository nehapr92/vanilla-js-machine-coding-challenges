
function myPromiseAllSettled(taskList) {

  
    return new Promise((resolve) => {

      if (taskList.length === 0) return resolve([]);

      const result = new Array(taskList.length);
      let completed = 0;

      for (let i = 0; i < taskList.length; i++) {
        Promise.resolve(taskList[i])
          .then((value) => {
            result[i] = { status: "fulfilled", value };
          })
          .catch((reason) => {
            result[i] = { status: "rejected", reason };
          })
          .finally(() => {
            completed++;
            if (completed === taskList.length) {
              resolve(result); // Resolve when all promises settle
            }
          });
      }
    });
  }
    