require('./db/mongoose')
const path = require('path')
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const homeRouter = require('./routers/home')
const port = process.env.PORT
const loggingMiddleware = require('./middleware/log')
const viewsPath = path.join(__dirname, '../templates')

const app  = express()
app.set('view engine', 'hbs')
app.set('views', viewsPath)


app.use(loggingMiddleware)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.use(homeRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

