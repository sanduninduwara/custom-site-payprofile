var Publishable_Key = 'pk_test_51LRTd2G9NamjyI6ZnZRqVwsEqx68I8eHRTI3nccori6yCvjnSZL9UneoMuNU4BrNbNkv0JsktxNFIO7YOafPcEvQ004gX1vTQl'


const billingShipping=(req, res)=>{
    const {hidden,inputAddress} = req.body
    console.log(hidden,inputAddress);
    
    if (!hidden || !inputAddress){
        res.status(400)
        throw new Error('fill all fields')
    }

    res.render('Pay',{ key: Publishable_Key , amount:"8000"})


    
}



module.exports = {

    billingShipping,
}