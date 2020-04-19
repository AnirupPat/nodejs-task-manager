// Load in mongoose and task model
// Remove a given task by id
// Get and print the total number of incomplete tasks

require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('5e9bd8653df7574894e2fd76').then((res) => {
    console.log(res)
    return Task.countDocuments({ completed: true })
}).then((res) => {
    console.log(res)
}).catch((e) => {
    console.log(e)
})

// async await is a small set of tool that makes work with promises easier
