const loggingMiddleware = (req, res, next) => {
    const baseUrl = req.url.replace('http://localhost:3000', '')
    console.log(`${req.method}  ${baseUrl}`)
    next()
}

module.exports = loggingMiddleware