const express = require('express')
require('./db/mongoose') // to connect to mongoose 
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')

const app = express()
const port = process.env.PORT || 3000

// this is to grab the incomming data
app.use(express.json())
app.use(userRouter)




// after this go to postman, create a new collection and add a request to the 
// collection and with post give url as localhost:3000/users and run it to 
// see "tetsing !"

// Set up the task create end point 
// Create a separate file for the task model
// Test the endpoint from postman with good and bad data

app.post('/tasks', async (req, res) => {
    console.log(req.body)
    const task = new Task(req.body)
    try {
        const task = await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})





// Set up the Tasks reading endpoints
// Create an endpoint for fetching all tasks
// Create an endpoint for fetching a task by its id

app.get('/tasks', async (req, res) => {
    try {
        const task = await Task.find({})
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }

    // Task.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

app.get('/tasks/:id', async (req, res) => {
    console.log(req.params)
    const _id  = req.params.id
    try {
        const task = await Task.findById(_id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }
    
    // Task.findById(_id).then((task) => {
    //     if(!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})



// Allow for tasks update
// Set up the route handler
// Send error if unknown updates
// Attempt to updates the task
// - Handle task not found
// - Handle validation error
// - Handle success

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedObjects = ["completed", "description"]
    const isValidOperation = updates.every((update) => allowedObjects.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates !' })
    }
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send()
    }
})


app.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send()
    }
})

app.listen(port, () => {
    console.log('Server is up on port', + port)
})