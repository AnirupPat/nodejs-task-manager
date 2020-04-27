const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

// here we are trying to separate the user routes
// have done it for one , but the remaining ones are still there in index.js 
// so as to get clarity of whats happenning 

router.get('/users/me', auth ,async (req, res) => {
   res.send(req.user)
    // this is old code where we are not using async/await
    // User.find({}).then((user) => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send(e)
    // })
})


// Have sign up send back auth token
// Generate a token for the saved user
// Send back both user and token
router.post('/users', async (req, res) => {
    // this console will give in the terminal the req body that we pass from postman
    console.log(req.body)

    const user = new User(req.body)
    // this is the code using async/await
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.send({ user, token })
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

router.patch('/users/me', auth, async(req, res) => {
    const updates = Object.keys(req.body)
    const allowedObjects = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedObjects.includes(update))

    if(!isValidOperation) {
        res.status(400).send({error: 'Invalid updates'})
    }

    try {
        // the findByIdAndUpdate function by passes Mongoose. It performs
        // a direct operation on the database
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()

        if(!req.user) {
            return res.status(404).send()
        }
        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user) {
        //     return res.status(404).send()
        // }

        // this is pf mongoose 
        await req.user.remove()

        res.send(res.user)
    }   catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async(req, res) => {
    try {
        // this function is defined as a part of schema
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        // res.send({ user: user.getPublicProfile(), token })
        // there is another way to do the same.. so commenting the above line
        res.send({ user, token })
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async(req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()
        res.send()
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(400).send()
    }
})

module.exports = router