const express=require('express')
const router=express.Router()
const {signup,login}=require('../controller/user/signupAndLogin')
const { verifyToken, verifyTokenApi } = require('../middleware/jwtAuthentication')
const { getUserProfile,updateUserProfile,updateUserProfilePicture } = require('../controller/user/profile');
const upload = require('../middleware/multer');
 
router.post('/api/signup',signup)
router.post('/api/login',login)
router.get('/api/profile',verifyToken,getUserProfile)
router.post('/api/profile')
router.put('/api/profile',verifyToken,updateUserProfile)
router.patch('/api/profilepicture',verifyToken,upload.single('image'),updateUserProfilePicture)
router.get('/api/verify',verifyTokenApi)

module.exports=router