const express = require('express')
require('./db/mongoose') // to connect to mongoose 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

// without middleware: new request -> run route handler
// with middleware: new request -> do something -> run route handler

// app.use((req, res, next) => {
//     if(req.method === 'GET') {
//         res.send('Get services are disabled !')
//     } else {
//         next()
//     }
// })

// Set up middleware for mantainence mode
// Register a new middleware function
// Send back a mantainence message with a 503 status code

// app.use((req, res, next) => {
//     res.status(503).send('Site is under mantainence !')
// })

// this is to grab the incomming data
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


// after this go to postman, create a new collection and add a request to the 
// collection and with post give url as localhost:3000/users and run it to 
// see "tetsing !"

// Set up the task create end point 
// Create a separate file for the task model
// Test the endpoint from postman with good and bad data


app.listen(port, () => {
    console.log('Server is up on port', + port)
})

// npm i bcryptjs@2.4.3;2

// just an example
// const bcrypt = require('bcryptjs')
// const myFunction = async () => {
//     const password = 'Anirup'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     // these bcrypt algorithms are one way, it cant be reversed

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Anirup', hashedPassword) // this will return true
//     console.log(isMatch)
// }

// myFunction()

// const jwt = require('jsonwebtoken')

// const myFunction = async() => {
//     const token = jwt.sign({ _id: 'token123' }, 'secretkey', { expiresIn: '7 days' })
//     console.log(token)
//     // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0b2tlbjEyMyIsImlhdCI6MTU4NzQzOTYxM30.rhO1OSXX_PIfNdl_9xgtl4QzrMhoZh4iU4CYTljxalI

//     const data = jwt.verify(token, 'secretkey')
//     console.log(data) // { _id: 'token123', iat: 1587439651 }
// }


// myFunction()

// const pet = {
//     name: 'Hal'
// }

// console.log(pet)

// pet.toJSON = function() {
//     console.log(this)
//     return {}
// }
// console.log(JSON.stringify(pet))

// Before stringify is called toJSON is called to return its value
// try to retun this and try to return {} ( in toJSON ) to see the difference 

// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('5ea678ff5ed30504e1c199a2')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById('5ea678375ed30504e1c1999f')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()