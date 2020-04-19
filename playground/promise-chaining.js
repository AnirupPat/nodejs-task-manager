require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('5e9bb77d0a92bb447e4ef0fe', { age: 0 }).then((user) => {
    console.log(user)
    return User.countDocuments({ age: 0 })
}).then((user) => {
    console.log('Number of users:' +user)
}).catch((e) => {
    console.log(e)
})