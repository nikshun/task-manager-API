const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

router.post('/users' , async (req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({token,user})
    } catch{
        res.status(400).send()
    }
})

router.post('/users/login', async(req,res) =>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            if (token.token == req.token) {
                return false
            } else {
                return true
            }
        })
        await req.user.save()

        res.send(req.user.tokens)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/users/logoutall', auth, async (req, res) => {
    try
    {
        req.user.tokens = []

        await req.user.save()
        res.send(req.user.tokens)
    }catch(e){
        res.status(500).send(e)
    }
})

router.get('/users/me', auth, async (req, res) => {   
    try{
        res.status(200).send(req.user)
    }catch{
        res.status(500).send()
    }
})

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.status(200).send(user)
    } catch {
        res.status(500).send()
    }

})

router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: "Unknown updates: " + updates.join(', ')})
    }
    try {

        // const user = await User.findById(req.params.id)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()

        // if (!user) {
        //     return res.status(404).send()
        // }

        res.send(req.user)
    } catch {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async(req,res) =>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch  {
        res.status(500).send()
    }
})

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Upload an image please'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const  buffer = await sharp(req.file.buffer).resize({ width:250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer 
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error:error.message}) 
})

router.delete('/users/me/avatar', auth, async(req,res) => {
    try {
        req.user.avatar = undefined
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})


module.exports = router