const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
    logout,
} = require('../controllers/userController')

const { requireAuth ,checkUser } = require('../middleware/authMiddleware')

router.get('/login', (req, res)=>{ 
    res.render('Login',{msg:''}) 

}) 
router.get('/register', (req, res)=>{ 
    res.render('Register',{msg:""}) 

}) 

// router.get('/profile', requireAuth,checkUser, (req, res)=>{ 
//     res.render('Profile') 

// }) 

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile/:username',checkUser, getMe)

router.get('/logout', logout)




module.exports = router

