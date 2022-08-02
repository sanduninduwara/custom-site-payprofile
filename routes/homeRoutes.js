const express = require('express')
const router = express.Router()
const {
    billingShipping
} = require('../controllers/homeController')

const { protect } = require('../middleware/authMiddleware')


router.get('/', (req, res)=>{ 
    res.render('Home') 

}) 
router.post('/', billingShipping)
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)




module.exports = router





