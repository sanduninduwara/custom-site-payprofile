const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/userModel')
const Pay = require('../models/payedModel')

const maxAge = 3 * 24 * 60 * 60;

// @desc    Register a new user
// @route   /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email,uid, password ,password2} = req.body
    var msg;

    // Validation
    if (!name || !email || !password || !uid) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    // Find if user already exists
    const uidexist = await User.findOne({ uid })

    //find user has purchesed item
    const secretcode = await Pay.findOne({ uid })

    if(!secretcode){
      
        msg="secretcode not in purched item list!!"
        res.render('Register',{msg:msg}) 
        return
        // res.status(400)
        // throw new Error('email not in purched item list')
    }


    if (password !== password2) {
        msg="passwords are not mached!!"
        res.render('Register',{msg:msg})
        // res.status(400)
        // throw new Error('passwords are not mached')
    }

    if (uidexist) {

        msg="secretcode already used!!"
        res.render('Register',{msg:msg}) 
        return
      
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // // Create user
    const user = await User.create({
        name,
        email,
        uid,
        password: hashedPassword,
    })

    if (user) {
        // res.status(201).json({
        //     _id: user._id,
        //     name: user.name,
        //     email: user.email,
        //     token: generateToken(user._id),
        // })

        res.redirect('/users/login');
        return;
    } else {
        res.status(400)
        throw new error('Invalid user data')
    }
})

// @desc    Login a user
// @route   /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
   
    const { email,uid, password } = req.body

    const user = await User.findOne({ uid })
    

    if(!user || user.email !==email){
        res.render('Login',{msg:'Invalid credentials'})
    }

    // Check user and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
        const jwttoken=generateToken(user._id)
        res.cookie('jwt', jwttoken, { httpOnly: true, maxAge: maxAge * 1000 });
        res.redirect('/users/profile/'+user.name);

    } else {
        // res.status(401)
        // throw new Error('Invalid credentials')
        res.render('Login',{msg:'Invalid credentials'})

    }
})

const logout = asyncHandler(async (req, res) => {
    
    
    res.cookie('jwt','',{maxAge:1})
    res.redirect('/users/login');
})

// @desc    Get current user
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    res.render('Profile',{user:user})
})

// Generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge,
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    logout,
}