const mongoose = require('mongoose')

const payedSchema = mongoose.Schema(
    {
        
        email: {
            type: String,
            required: [true, 'Please add an email'],
           
        },
        addresses: {
            type: String,
            required: [true, 'Please add a address'],
        },
        uid: {
            type: String,
            required: [true, 'Please add an uid'],
            unique: true,
        },
        
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Payed', payedSchema)