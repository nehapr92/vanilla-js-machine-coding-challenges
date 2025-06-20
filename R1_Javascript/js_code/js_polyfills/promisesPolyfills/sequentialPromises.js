// Question 
// Asked in Sumologic, forward network
// Level -> Easy

// How would you implement a function to execute an array of asynchronous tasks
// sequentially, collecting both resolved values and errors?


const createAsyncTask = () => {
    const randomVal = Math.floor(Math.random() *10)
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            if(randomVal > 5) {
                resolve(randomVal)
            }else{
                reject(randomVal)
            }
        },randomVal*100)
    })
}

const tasks = [
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask,
    createAsyncTask
]



//Solution

// Approach 1
const taskRunner = async(tasks, cb) => {
    const result = [];
    const error = [];
    for(let task of tasks) {
        try{
		        // wait until promise to resolved
            const successTask = await task() 
            result.push(successTask)
        } catch(e) {
            error.push(e)
        }
    }
    cb(result, error)
}



taskRunner(tasks, (result, err) => console.log(result, err))
