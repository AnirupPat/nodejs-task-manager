const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')
// we do this schema to hash the password   
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        //required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Incorrect email address !')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('password cant contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number !')
                // for complex validations, use npm i validator
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function() {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'secretkey')

    user.tokens = user.tokens.concat({ token })
    await user.save() // to save the token
    return token
}

userSchema.virtual('tasks', {
    ref: 'Tasks',
    localField: '_id',
    foreignField: 'owner'
})

// userSchema.methods.getPublicProfile = function() {
//     const user = this
//     const userObj = user.toObject()

//     delete userObj.password
//     delete userObj.tokens

//     return userObj
// }

// we can use the toJSON function to get this at a higher level.. without changing
// the routes

userSchema.methods.toJSON = function() {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if(!user) {
        throw new Error('Unable to log in')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Unable to log in')
    }

    return user
}

// this has to be a standard function not an arrow function
// as arrow function dont bind this
userSchema.pre('save', async function(next) {
    const user = this

    console.log('Just before saving !')
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
    // its very important that next gets called, otherwise we can never save the user
})

userSchema.pre('remove', async function(next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User