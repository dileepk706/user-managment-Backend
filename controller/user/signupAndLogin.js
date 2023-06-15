const User = require('../../model/user')
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY;

exports.signup = async (req, res) => {

    try {
        const { email, password, name } = req.body
        if (!email || !password || !name) {
            res.status(400).json({ message: 'All field is required' })
            return
        }

        //find users if already exist
        const isExist = await User.findOne({ email })
        if (isExist) {
            res.status(400).json({ message: 'email has already taken' })
            return
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //creating new user
        const user = new User({
            email,
            password: hashedPassword,
            name
        })
        const d = await user.save()
        res.status(201).json({ messaage: 'User created successfully', })

    } catch (error) {
        console.log(error);
        res.status(500).json({ messaage: 'somthing went wrong' })
    }
}

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
        //Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'The password you entered is incorrect.' })
            return
        }
        // Generate a JWT token
        const token = jwt.sign({ user }, secret,{expiresIn:'1h'});
        const account={name:user.name,email:user.email,image:user.image}
        res.status(200).json({ message: 'successfully logged in',token,account})

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'somthing went wrong' })
    }

}