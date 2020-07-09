const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Task = require('../models/task')

const auth = async(req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        user.tasks = await Task.find({ owner: decoded._id })

        if (!user) {
            throw new Error()
        }

        req.user = user
        req.user.token = token

        next()

    } catch (e) {
        // Authentication error
        res.status(401).render('auth')
    }
}

module.exports = auth