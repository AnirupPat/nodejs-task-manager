const express = require('express')
require('./db/mongoose') // to connect to mongoose 
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

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

const bcrypt = require('bcryptjs')
const myFunction = async () => {
    const password = 'Anirup'
    const hashedPassword = await bcrypt.hash(password, 8)

    // these bcrypt algorithms are one way, it cant be reversed

    console.log(password)
    console.log(hashedPassword)

    const isMatch = await bcrypt.compare('Anirup', hashedPassword) // this will return true
    console.log(isMatch)
}

myFunction()