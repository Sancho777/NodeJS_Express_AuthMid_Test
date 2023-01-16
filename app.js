const express = require('express')
require('dotenv').config()
require('./models/db')
const userRouter = require('./routes/user')

const app = express()

const User = require('./models/user')

// app.use((req, res, next) =>{
//     req.on('data', (chunk) => {
//         const data = JSON.parse(chunk)
//         req.body = data
//         next()
//     })
// })

app.use(express.json()) //middleware
app.use(userRouter)

app.get('/test', (req, res) => {
    res.send('Hello World')
})



app.get('/', (req, res) =>{
    res.send('<h1>Hello World!</h1>')
})

app.listen(8000, () => {
    console.log("port is listening")
})

