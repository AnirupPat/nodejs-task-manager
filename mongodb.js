// CRUD - Create Read Update Delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// // its gonna give us the function necessary to connect 
// // to the db so that we can perform the basic crud operations 
// const ObjectID = mongodb.ObjectID

// we can destructure the above 
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'
const id = new ObjectID()
console.log(id) // in string 
console.log(id.getTimestamp())

console.log(id.id) // in binary
console.log(id.id.length) // 12

console.log(id.toHexString()) // in string
console.log(id.toHexString().length) // 24

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to d/b')
    }
    console.log('Conected successfully !')

    // manipulating the name of the DB
    const db = client.db(databaseName)

    // // creating a new connection.. and insert one document 
    // db.collection('users').insertOne({
    //     name: 'Anirup with ID',
    //     age: 28,
    //     _id: id // we dont need to add this _id as its an extra code
    //     // and let mongoDB do that piece 
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // -------new set of code----------

    // db.collection('users').insertMany([
    //     {
    //         name: 'Sharan',
    //         age: 28
    //     },
    //     {
    //         name: 'Sangram',
    //         age: 27
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert to user')
    //     }

    //     console.log(result.ops)
    // })

    // ------- new set of code----------

    // Insert 3 tasks into a new tasks collection
    // Use insertMany to insert three documents
    // description(string), completed(boolean)
    // Set up the callback to handle the error

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Excercise',
    //         completed: true
    //     },
    //     {
    //         description: 'Enterpreunal Work',
    //         completed: true
    //     },
    //     {
    //         description: 'Nodejs Tutorial',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to write to task collection !')
    //     }

    //     console.log(result.ops)
    // })

    // ------- new set of code----------
    // // findOne will fetch always one document.. 
    // // if there are more than one document, then it will return the first one
    // db.collection('users').findOne({ name: 'Anirup' }, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch !')
    //     }

    //     console.log(user)
    // })

    // ------- new set of code----------

    // // searching for a document and not finding it is not an error
    // // its null
    // db.collection('users').findOne({ name: 'Anirup', age: 1 }, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch !')
    //     }

    //     console.log(user)
    // })

    // // ------- new set of code----------
    // // this will return null as GUID that we are passing is in string format 
    // db.collection('users').findOne({ _id: "5e9a6435223503391210e1bb" }, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch !')
    //     }

    //     console.log(user)
    // })

    // ------- new set of code----------
    // // this will return null as GUID that we are passing is in string format 
    // db.collection('users').findOne({ _id: new ObjectID("5e9a6435223503391210e1bb") }, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch !')
    //     }

    //     console.log(user)
    // })

    // ------- new set of code----------
    // // find doesnt have calback function
    // db.collection('users').find({ age: 28 }).toArray((error, users) => {
    //     if(error) {
    //         return console.log('Unable to find !')
    //     }

    //     console.log(users)
    // })

    // db.collection('users').find({ age: 28 }).count((error, count) => {
    //     if(error) {
    //         return console.log('Unable to find !')
    //     }

    //     console.log(count)
    // })

    // ------- new set of code----------
    // // Use find and findOne with tasks collections
    // // Use findOne to fetch the last task by its id( print doc in console )
    // // Use find to fetch all tasks that are not completed

    // db.collection('tasks').findOne({ _id: new ObjectID("5e9a6ce9d6c00d3a470b813d") }, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if(error) {
    //         return console.log('Unable to fetch from tasks collection!')
    //     }

    //     console.log(tasks)
    // })

    // -------new set of code--------
    // const updatePromise = db.collection('tasks').updateOne(
    //     { 
    //     _id: new ObjectID("5e9a6ce9d6c00d3a470b813f") 
    //     }, 
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // )

    // updatePromise.then((result) => {
    //     console.log('Result is:', result)
    // }).catch((error) => {
    //     console.log('Error occurred :', error)
    // })

    // ------ another way of writting promises with out constants
    // db.collection('tasks').updateOne(
    //     { 
    //     _id: new ObjectID("5e9a6ce9d6c00d3a470b813f") 
    //     }, 
    //     {
    //         $set: {
    //             completed: true
    //         }
    //     }
    // ).then((result) => {
    //     console.log('Result is:', result)
    // }).catch((error) => {
    //     console.log('Error occurred :', error)
    // })

    // -------new set of code--------

    // db.collection('users').updateOne(
    //     { 
    //     _id: new ObjectID("5e9a6435223503391210e1bb") 
    //     }, 
    //     {
    //         $inc: {
    //             age: 1 // to increment the age by one, using inc operator
    //         }
    //     }
    // ).then((result) => {
    //     console.log('Result is:', result)
    // }).catch((error) => {
    //     console.log('Error occurred :', error)
    // })

    // -------new set of code--------

    // // Use updateMany by viewing documentry
    // // set up the call with the query and updates
    // // use promise method to set up success/error handlers

    // db.collection('tasks').updateMany(
    //     { completed: true },
    //     {
    //         $set: {
    //             completed: false
    //         }
    //     }
    // ).then((result) => {
    //     console.log('Success:', result)
    // }).catch((error) => {
    //     console.log('Error:', error)
    // })

    // -------new set of code--------

    db.collection('users').deleteMany({
        age: 27
    }).then((result) => {
        console.log('Success:', result)
    }).catch((error) => {
        console.log('Error:', error)
    })

    // Same is with the case of deleteOne.. 

})

// After running this open Robo 3T and refresh it to find a new 
// DB named task-manager and open collection and
// right click on users and select view documents 

// In SQL, the Ids that are generated by the servers and follow an incremental 
// integar pattern
// like 1,2,3.... 
// but in MongoDB, the Ids are known as GUID (Globally Unique Inentifiers)
// they are designed to be unique using an algorithm whitout needing 
// the server to determine whats the next id is to be 
// which allows to scale well in a distributed system
// servers doesnt generate ID, but we use mongoDB library to generate the GUIDs
// with mongoDB and GUIDs, there is no chance of ID collision with multiple
// DB servers

// How object IDs are stored
// in Binary format 
// we can check with console.log(new ObjectID().id)
// the length is 12 
// we can convert it into string 
// new ObjectID().toHexString()
// the length is 24


// Promises are enhanced call back calls, making it easier for asynchronous code
// check for 8-promises.js in playground app
