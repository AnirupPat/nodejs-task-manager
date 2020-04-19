const express = require('express')
require('./db/mongoose') // to connect to mongoose 
const User = require('./models/user')
const Task = require('./models/task')

const app = express()
const port = process.env.PORT || 3000

// this is to grab the incomming data
app.use(express.json())

app.post('/users', (req, res) => {
    // this console will give in the terminal the req body that we pass from postman
    console.log(req.body)

    const user = new User(req.body)
    user.save().then(() => {
        res.send(user)
    }).catch((error) => {
        res.status(400).send(error)
        // https://httpstatuses.com/ to get the status codes
    })
})

// after this go to postman, create a new collection and add a request to the 
// collection and with post give url as localhost:3000/users and run it to 
// see "tetsing !"

// Set up the task create end point 
// Create a separate file for the task model
// Test the endpoint from postman with good and bad data

app.post('/tasks', (req, res) => {
    console.log(req.body)

    const task = new Task(req.body)
    task.save().then(() => {
        res.status(201).send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/users', (req, res) => {
    User.find({}).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

app.get('/users/:id', (req, res) => {
    console.log(req.params)
    const _id = req.params.id

    // In Mongoose we dont need to convert the string id into object id
    // as in the case of MongoDB
    // but thats not the reason why we use Mongoose 
    // it creats the model to structure the data
    User.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send(e)
    })
})

// Set up the Tasks reading endpoints
// Create an endpoint for fetching all tasks
// Create an endpoint for fetching a task by its id

app.get('/tasks', (req, res) => {
    Task.find({}).then((user) => {
        res.send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.get('/tasks/:id', (req, res) => {
    console.log(req.params)
    const _id  = req.params.id
    Task.findById(_id).then((task) => {
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

app.listen(port, () => {
    console.log('Server is up on port', + port)
})