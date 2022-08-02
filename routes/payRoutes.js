const express = require('express')
const router = express.Router()
const {
    payfee
} = require('../controllers/payController')

const { protect } = require('../middleware/authMiddleware')



router.post('/', payfee)
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)




module.exports = router





