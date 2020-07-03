const loggingMiddleware = (req, res, next) => {
    const baseUrl = req.url.replace('https://nikita-task-manager.herokuapp.com/', '')
    console.log(`${req.method}  ${baseUrl}`)
    next()
}

module.exports = loggingMiddleware