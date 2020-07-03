const express = require('express')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const loggingMiddleware = require('./middleware/log')
require('./db/mongoose')

const app  = express()
const port = process.env.PORT

app.use(loggingMiddleware)
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log("Server is up on port " + port)
})

