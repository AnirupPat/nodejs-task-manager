const mongoose = require('mongoose')

// task-manager-api is a new db that we are creating with mongoose
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

// Add a password field 
// Set up the field as required
// Ensure the length is more than 6
// Trim the password
// Ensure that password doesnt contain "password"



// const me = new User({
//     name: '  Anirup',
//     email: 'anirup049@gmail.com  ',
//     password: 'phone123'
// })

// // to save the model instanse and this returns a promise
// me.save().then(() => {
//     // we would see a new field _v denoting the version
//     console.log(me)
// }).catch((error) => {
//     console.log('Error !', error)
// })

// ---------Creation of a new model-----------
// Create a model for tasks
// Define a model with description and completed fields
// Create a new instanse of the model
// Save the model to the database

// Add validation and sanitization to tasks
// Trim the description and make it required
// Make completed optional and defsult it to false





