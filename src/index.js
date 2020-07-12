require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const port = process.env.PORT
const loggingMiddleware = require('./middleware/log')

const app = express()

app.use(loggingMiddleware)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})