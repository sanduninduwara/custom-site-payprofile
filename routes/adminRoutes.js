const express = require('express')
const router = express.Router()
const {
   
    getPage,
   
} = require('../controllers/adminController')

const { requireAuth ,checkUser } = require('../middleware/authMiddleware')



// router.get('/profile', requireAuth,checkUser, (req, res)=>{ 
//     res.render('Profile') 

// }) 

router.get('/:username',checkUser, getPage)





module.exports = router

