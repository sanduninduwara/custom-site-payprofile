var Secret_Key = process.env.PAY_SECRET
const stripe = require('stripe')(Secret_Key) 
const Pay = require('../models/payedModel')
const asyncHandler = require('express-async-handler')
var uniqid = require('uniqid');



const  payfee= asyncHandler(async(req, res)=>{
    const {amount,inputAddress} = req.body
    var uid=uniqid();
    console.log(amount,inputAddress);
    
   
        // Moreover you can take more details from user 
        // like Address, Name, etc from form 
    
        // console.log(req.body.test)
        const email= req.body.stripeEmail;
        stripe.customers.create({ 
            email: req.body.stripeEmail, 
            source: req.body.stripeToken, 
            name: 'Gautam Sharma', 
            address: { 
                line1: 'TC 9/4 Old MES colony', 
                postal_code: '110092', 
                city: 'New Delhi', 
                state: 'Delhi', 
                country: 'India', 
            } 
        }) 

        

        .then((customer) => { 
    
            return stripe.charges.create({ 
                amount: amount,	 // Charing Rs 25 
                description: 'Web Development Product', 
                currency: 'USD', 
                customer: customer.id 
            }); 
        }) 
        .then(
            Pay.create({
            email: req.body.stripeEmail,
            addresses: inputAddress,
            uid:uid

            })
            )
             
        .then((charge) => { 
            // const payeduser = await Pay.create({
           
            //     email,
            //     addresses: JSON.stringify(addresses)
            // })
            console.log(uid)
          
            res.render('Register',{msg:"payment Successfull! your secret code is: "+uid}) 

        }) 
        .catch((err) => { 
            res.send(err)	 // If some error occurs 
        }); 
   
    
})



module.exports = {

    payfee,
}



