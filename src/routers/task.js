const express = require('express')
const router = new express.Router()
const Task = require('../models/task')

router.post('/tasks', async (req, res) => {
    console.log(req.body)
    try {
        const task = await new Task(req.body)
        await task.save()
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

router.get('/tasks', async (req, res) => {
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

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
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


router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router