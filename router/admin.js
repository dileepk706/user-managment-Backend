const express=require('express')
const router=express.Router()
const { verifyToken, isAdmin } = require('../middleware/adminJwtAuthentication')
const {login}=require('../controller/admin/Login')
const { getAllUsers,searchUser,deleteUser } = require('../controller/admin/userManagement')
 
router.post('/api/login',login)
router.get('/',verifyToken,getAllUsers)
router.get('/api/search',verifyToken,searchUser)
router.delete('/api/deleteuser/:id',verifyToken,deleteUser)
router.get('/api/verify',isAdmin)

module.exports=router