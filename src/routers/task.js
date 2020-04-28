const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    console.log(req.body)
    //  const task =  new Task(req.body)
    const task = await new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try {
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

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true' ? true : false
    }

    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        // const task = await Task.findOne({ owner: req.user._id })
        // if(!task) {
        //     return res.status(404).send()
        // }
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip:  parseInt(req.query.skip),
                sort
            }
        }).execPopulate()
        res.send(req.user.tasks)
    } catch(e) {
        res.status(400).send(e)
    }

    // Task.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    console.log(req.params)
    const _id  = req.params.id
    try {
       // const task = await Task.findById(_id)
       const task = await Task.findOne({ _id, owner: req.user._id })
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

// Change how tasks are updated
// Find the task
// Alter the task properties
// Save the task

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedObjects = ["completed", "description"]
    const isValidOperation = updates.every((update) => allowedObjects.includes(update))

    if(!isValidOperation) {
        return res.status(400).send({error: 'Invalid updates !' })
    }
    try {
       // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    //    const task = await Task.findById(req.params.id)
       const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })
    
        if(!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch(e) {
        res.status(400).send()
    }
})


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
      //  const task = await Task.findByIdAndDelete(req.params.id)
      const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router