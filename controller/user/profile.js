const User = require('../../model/user')

exports.getUserProfile = async (req, res) => {
    const email = req.user.email
    try {
        const user = await User.findOne({ email },{password:0})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:'Somthing went wrong'})
    }
}
 
exports.updateUserProfile = async (req, res) => {
    const { email, name } = req.body
    if(!email || !name){
        res.status(400).json({message:'Fields conot be empty'})
        return
    }
    const id=req.user.id
    try {
        const updatedUser=await User.updateOne({_id:id},{name,email})
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'somthing went wrong'})
    }
}

exports.updateUserProfilePicture = async (req, res) => {
    const id=req.user.id
    if (!req.file || !req.file.filename) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    //image url
    const image ='http://localhost:3001/uploads/'+req.file.filename
    try {
       
        const updatedImage=await User.findByIdAndUpdate(id,{image},{new:true}) 
        res.status(200).json(updatedImage)

    } catch (error) {
        console.log('error',error);
        res.status(500).json({message:'somthing went wrong'})
    }
}