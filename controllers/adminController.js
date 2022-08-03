

const getPage=(req, res)=>{

    const user = {
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
    }
    
    res.render('Admin',{user:user})


    
}



module.exports = {

    getPage,
}