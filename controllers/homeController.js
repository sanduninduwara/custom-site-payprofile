var Publishable_Key =  process.env.PAY_PUBLIC


const billingShipping=(req, res)=>{
    const {hidden,inputAddress} = req.body
    console.log(hidden,inputAddress);
    
    if (!hidden || !inputAddress){
        res.status(400)
        throw new Error('fill all fields')
    }

    res.render('Pay',{ key: Publishable_Key , amount:hidden})


    
}



module.exports = {

    billingShipping,
}