const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.get('/login', (req, res)=>{ 
    res.render('Login') 

}) 
router.get('/register', (req, res)=>{ 
    res.render('Register') 

}) 

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router

