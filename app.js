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

const test = async (email, password) => {
    const user = await User.findOne({email: email})
    const result = await user.comparePassword(password)
    console.log(result)
}
test('pamy3@email.com', 'admin123')


app.get('/', (req, res) =>{
    res.send('<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</h1>')
})

app.listen(8000, () => {
    console.log("port is listening")
})

