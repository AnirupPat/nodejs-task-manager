const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.get('/test', (req, res) => {
    res.send('This is a test route !')
})

// here we are trying to separate the user routes
// have done it for one , but the remaining ones are still there in index.js 
// so as to get clarity of whats happenning 

router.get('/users', async (req, res) => {
    try {
        const user = await User.find({})
        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }
    // this is old code where we are not using async/await
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.post('/users', async (req, res) => {
    // this console will give in the terminal the req body that we pass from postman
    console.log(req.body)

    const user = new User(req.body)
    // this is the code using async/await
    try {
        await user.save()
        res.send(user)
    } catch(error) {
        res.status(400).send(error)

    }
    // this is old code where we are not using async/await
    // user.save().then(() => {
    //     res.send(user)
    // }).catch((error) => {
    //     res.status(400).send(error)
    //     // https://httpstatuses.com/ to get the status codes
    // })
})

router.get('/users/:id', async (req, res) => {
    console.log(req.params)
    const _id = req.params.id

    // In Mongoose we dont need to convert the string id into object id
    // as in the case of MongoDB
    // but thats not the reason why we use Mongoose 
    // it creats the model to structure the data

    try {
        const user = await User.findById(_id)
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }

    // this is old code where we are not using async/await
    // User.findById(_id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})

router.patch('/users/:id', async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedObjects = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedObjects.includes(update))

    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) {
            return res.status(404).send()
        }

        res.send(user)
    }   catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router