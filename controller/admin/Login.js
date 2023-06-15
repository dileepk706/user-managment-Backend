const User=require('../../model/user')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY_ADMIN;

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            res.status(400).json({ message: 'All field is required' })
            return
        }
        //find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        //check is admin?
        if(user.isAdmin !==true){
            res.status(401).json({message:'You are not authorized'})
            return
        }
        //Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'The password you entered is incorrect.' })
            return
        }
        // Generate a JWT token
        const token = jwt.sign({ user }, secret,{expiresIn:'1h'});
        const isAdmin=user.isAdmin
        res.status(200).json({ message: 'successfully logged in',token,isAdmin})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'somthing went wrong' })
    }

}