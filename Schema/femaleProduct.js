const mongoose=require('mongoose');

const femaleProductSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    productName:String,
    productDescription:String,
    productPrice:String,
    productCategory:String,
    profPic:String,
    itemsRemaing:String

    
});



module.exports=mongoose.model('ProductFemale',femaleProductSchema);