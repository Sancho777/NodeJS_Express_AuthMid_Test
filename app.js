const express = require('express')
const helmet = require('helmet')

require('dotenv').config()
require('./db/DB')
const userRouter = require('./routes/user')
const dataRouter = require('./routes/data')

const app = express()

const User = require('./db/models/user')

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );

    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET',
        );
        return res.status(200).end();
    } else {
        next();
    }
});


app.use('/user', userRouter)
app.use('/data', dataRouter)
app.use((req, res, next) => {
    res.status(404).send({ error: 'Rota inválida' })
    next();
})

app.listen(8000, () => {
    console.log("port is listening")
})

