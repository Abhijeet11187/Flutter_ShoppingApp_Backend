const mongoose = require('mongoose');

const shoppingOrder = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // productName: String,
    pricePaid: String,
    totalItems: String,
    status: String,
    productCategory: String,
    productName:String,


    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShoppingUser' },
});



module.exports = mongoose.model('ShoppingOrder', shoppingOrder);