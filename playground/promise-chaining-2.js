// Load in mongoose and task model
// Remove a given task by id
// Get and print the total number of incomplete tasks

require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5e9bd8653df7574894e2fd76').then((res) => {
//     console.log(res)
//     return Task.countDocuments({ completed: true })
// }).then((res) => {
//     console.log(res)
// }).catch((e) => {
//     console.log(e)
// })

// async await is a small set of tool that makes work with promises easier

// Use async await 
// Create deleteTaskAndCount as an async function
// Accept id of task to remove
// Use await to delete task and count of incomplete tasks
// Return the count
// Call the function and attach then/catch to log results

const deleteTaskAndCount = async (id) => {
    const tasks = await Task.findByIdAndDelete(id)
    console.log(tasks)
    const count = await Task.countDocuments({completed: false})
    return count
}

deleteTaskAndCount('5e9bd7fee472ea488b64a62b').then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})
