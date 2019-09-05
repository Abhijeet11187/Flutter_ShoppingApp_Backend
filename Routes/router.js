const express = require('express');
const router= express.Router();
const userController=require('../Controllers/user');
const postController=require('../Controllers/post');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
       
       
        cb(null,'./upload/');
 
    },
    filename:function(req,file,cb){
        var extension = file.mimetype;
        console.log('in name change'+extension);
    extension = extension.substring(extension.indexOf("/")+1, extension.length);
    console.log('in name change'+file.originalname); 
    var filename = file.originalname + '-' + Date.now() + "."+'png';
    console.log('in name change',filename);
    cb(null, filename);
            }   
});

const upload = multer({storage:storage});




router.post('/admin/register',userController.adminRegister)
router.post('/admin',userController.admin)
router.post('/signup',userController.signUp)
router.post('/login',userController.login)
router.post('/forget',userController.forget)

router.post('/maleProduct',upload.single('profPic'),postController.postMale)
router.post('/femaleProduct',upload.single('profPic'),postController.postFemale)
router.post('/kidsProduct',upload.single('profPic'),postController.postKid)

router.get('/maleProduct',postController.getMale)
router.get('/femaleProduct',postController.getFemale)
router.get('/kidsProduct',postController.getKid)


router.post('/postOrder',postController.postOrder)
router.get('/getOrder/:id',postController.showOrders)
router.delete('/deleteOrder/:id',postController.deleteOrder)
router.post('/confirmOrder/:id',postController.confirmOrder)
router.get('/getpendingOrders',postController.pendingOrders)
router.post('/confirmByAdmin/:id',postController.confirmOrderAdmin)


module.exports = router;