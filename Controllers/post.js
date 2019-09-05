const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../Schema/user');
//const Admin=require('../Schema/admin');
const random = require('random');
const Male = require('../Schema/maleProduct');
const Female = require('../Schema/femaleProduct');
const Kid = require('../Schema/kidsproduct');
const Order = require('../Schema/shoppingOrder');

exports.postMale = (req, res, next) => {


    // male.find({ username: req.body.username }).exec().then(result => {
    //     console.log("I n the post")
    //     if (result.length >= 1) {
    //         res.status(401).json({ message: 'already exist' })
    //     }else


    const male = new Male({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory,
        profPic: req.file.path,
        itemsRemaing: req.body.itemsRemaing

    });
    male.save().then(result => {
        res.status(201).json({
            Message: 'Product posted',
            details: result,

        });
    }).catch(err => {
        res.status(500).json({ error: err });
    });

}


exports.postFemale = (req, res, next) => {


    const female = new Female({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory,
        profPic: req.file.path,
        itemsRemaing: req.body.itemsRemaing
    });
    female.save().then(result => {
        res.status(201).json({
            Message: 'Product posted',
            details: result,

        });
    }).catch(err => {
        res.status(500).json({ error: err });
    });


}

exports.postKid = (req, res, next) => {


    const kid = new Kid({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productCategory: req.body.productCategory,
        profPic: req.file.path,
        itemsRemaing: req.body.itemsRemaing
    });
    kid.save().then(result => {
        res.status(201).json({
            Message: 'Product posted',
            details: result,

        });
    }).catch(err => {
        res.status(500).json({ error: err });
    });

}


//Feching data from server

//Male
exports.getMale = (req, res, next) => {
    Male.find().exec().then(
        (result) => {
            res.status(200).json({
                message: 'Data Found',
                result: result
            })
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    });
}
//Female
exports.getFemale = (req, res, next) => {
    Female.find().exec().then(
        (result) => {
            res.status(200).json({
                message: 'Data Found',
                result: result
            })
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    });
}
//Kids
exports.getKid = (req, res, next) => {
    Kid.find().exec().then(
        (result) => {
            res.status(200).json({
                message: 'Data Found ',
                result: result
            })
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    });
}

//Order Request

exports.postOrder = (req, res, next) => {
    console.log("in the Post order");
    var itemstominus;
    var userupdate;
    //var productId;

    if (req.body.productCategory == 'male') { userupdate = Male }
    if (req.body.productCategory == 'female') { userupdate = Female }

    if (req.body.productCategory == 'kids') { userupdate = Kid }


    console.log(req.body);

    itemstominus = req.body.orderItemNumber;
    console.log(itemstominus);
    const order = new Order({
        _id: new mongoose.Types.ObjectId(),
        productName: req.body.productName,
        totalItems: req.body.totalItems,
        pricePaid: req.body.pricePaid,
        userId: req.body.userId,
        productCategory: req.body.productCategory,
        status: req.body.status,


    });
    order.save().then(result => {
        console.log("order saved")


    }).catch(err => {
        res.status(500).json({ error: err });
    });

    if (req.body.status == 'pending') {
        userupdate.findByIdAndUpdate(req.body.productId, { $set: { itemsRemaing: req.body.reminingItems } }).then((result) => {
            res.status(200).json({
                "message": "done"
            });
        });

    }

}


// Show orders

exports.showOrders = (req, res, next) => {
    var id=req.params.id;
    console.log('IN the Showorders')
    Order.find().where('status').equals('notconfirmed').where('userId').equals(id).exec().then(
        (result) => {
            res.status(200).json({
                result: result
            })
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    }
    );
}

//delete order



exports.deleteOrder = (req, res, next) => {
    var id=req.params.id;
    console.log('IN the deleteOrders')
    Order.deleteOne({_id:id}).exec().then(
        (result) => {
            res.status(200).json({
                result: result
            })
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    }
    );
}




//Pending Status

exports.confirmOrder = (req, res, next) => {
    var id=req.params.id;
    console.log('IN the ConfirmUpdate')
    Order.findByIdAndUpdate(id, { $set: { status: 'pending' } }).then((result) => {
        res.status(200).json({
            "message": "done"
        });
    });
    
}

//Get Pending Orders Admin 

exports.pendingOrders = (req, res, next) => {
  //  var id=req.params.id;
    console.log('IN the Showorders')
    Order.find().where('status').equals('pending').populate('userId').exec().then(
        (result) => {
            res.status(200).json({
                result: result
            })
        }
    ).catch(err => {
        res.status(500).json({ error: err });
    }
    );
}

//Pending


exports.confirmOrderAdmin = (req, res, next) => {
    var id=req.params.id;
    console.log('IN the ConfirmUpdate')
    Order.findByIdAndUpdate(id, { $set: { status: 'confirm' } }).then((result) => {
        res.status(200).json({
            "message": "done"
        });
    });
    
}