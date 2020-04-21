const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
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
    }
})

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

const User = mongoose.model('User', userSchema)

module.exports = User