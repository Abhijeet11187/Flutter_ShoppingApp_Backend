const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = require('../Schema/user');
const Admin=require('../Schema/admin');
const random = require('random');


var OTP;

// Forget Password

exports.forget = (req, res, next) => {
    var transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'lokhandeabhijeet11187@gmail.com',
            pass:'Abhi@11187'
        }
    });
  
    User.findOne({ email: req.body.email }).exec().then((result) => {
        
        console.log(result.email);
       OTP=random.int(min=1111, max=9999);
        console.log(OTP)
        var mailOptions={
            from:'lokhandeabhijeet11187@gmail.com',
            to:result.email,
            subject:'Your One Time Password is',
            text:'OTP '+OTP
            
        };
        transporter.sendMail(mailOptions,function(error,info){
            if(error){
                console.log(error); 
            }
            else{
                console.log('email send');
            }
        })
        res.status(200).json({ OTP: OTP });
    }).catch((error)=>{
        res.status(400).json({error:error})
    })


}


// Signup



exports.signUp = (req, res, next) => {
    console.log('req.body.profiePic');



    User.find({ email: req.body.email }).exec().then(result => {
        console.log("I n the post")
        if (result.length >= 1) {
            res.status(401).json({ message: 'already exist' })
        }
        else {

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                mobileNo: req.body.mobileNo,
                password: req.body.password,
                username: req.body.username,
                state: req.body.state,
                city: req.body.city,
                pinCode: req.body.pinCode,
                address: req.body.address
                // profiePic: (req.file ? req.file.path : "uploads/default.jpg")

            });
            user.save().then(result => {
                res.status(201).json({
                    Message: 'user created successfully',
                    user: result.email,
                    id: result._id

                });
            }).catch(err => {
                res.status(500).json({ error: err });
            });

        }

    })



}


//Login

exports.login = (req, res, next) => {

    User.findOne({ username: req.body.username }).exec()
        .then((result) => {
            if (result.password === req.body.password) {
                res.status(201).json(result)
            }

        })
        .catch(err => {
            res.status(500).json({ error: err });
        });

}


exports.admin=(req,res,next)=>{
    console.log("I n the admin")
    console.log(req.body);

Admin.findOne({username:req.body.username}).exec().then(
    (result)=>{
        console.log(result);
        console.log(result.password);

        console.log(req.body.password);
        if(result.password == req.body.password){
            console.log('in');
            res.status(201).json(result)
        }
    }).catch(err =>{
        console.log('out');
         res.status(500).json({error:err});
    });
}

exports.adminRegister=(req,res,next)=>{


    Admin.find({ username: req.body.username }).exec().then(result => {
        console.log("I n the post")
        if (result.length >= 1) {
            res.status(401).json({ message: 'already exist' })
        }
        else {

            const admin = new Admin({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: req.body.password,
            });
            admin.save().then(result => {
                res.status(201).json({
                    Message: 'Admin created successfully',
                    username: result.username,
                    id: result._id

                });
            }).catch(err => {
                res.status(500).json({ error: err });
            });

        }

    })


}