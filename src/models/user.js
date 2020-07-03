const mongoose = require('mongoose')
const validator =  require('validator')
const bcrypt =  require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type: String,
        unique:true,
        required: true,
        trim:true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password can not include word \"password\"")
            }
        }

    },
    tokens:[{
        token:{
            type: String,
            require: true
        }
    }],
    avatar:{
        type: Buffer
    }
},{
    timestamps: true
})

userSchema.virtual('tasks', {
    ref:'Task',
    localField: '_id',
    foreignField: 'owner'
})

// Hiding the private fields from other users
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password 
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

// Generating Method for the authorization token
userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id:user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()
    
    return token
}

// Method for loging in
userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login, check your credentials')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login, check your credentials')
    }

    return user
}

// Hashing the password
userSchema.pre('save', async function(next){
    const user = this 

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    
    next()
})

// Delete User's tasks
userSchema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({ owner:user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User