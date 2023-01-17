const express = require('express')
require('dotenv').config()
require('./models/db')
const userRouter = require('./routes/user')

const app = express()

const User = require('./models/user')

app.use(express.json()) 
app.use(userRouter)

app.get('/', (req, res) =>{
    res.send('<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</h1>')
})

app.listen(8000, () => {
    console.log("port is listening")
})

