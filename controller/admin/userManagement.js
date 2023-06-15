const User=require('../../model/user')

exports.getAllUsers=async(req,res)=>{

    try {
        const users=await User.find({ isAdmin: false})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:'somthing went wrong',error})
    }
}

exports.deleteUser=async(req,res)=>{

    const {id}=req.params
    try {
         const user=await User.deleteOne({_id:id})
         if(user){
            res.status(200).json({message:'user deleted'})
            return
         }else{
            res.status(401).json({message:'user not found'})
         }
         
    } catch (error) {
        res.status(500).json({message:'somthing went wrong',error})
    }
}


exports.updateUser=async(req,res)=>{

    try {
         
    } catch (error) {
        res.status(500).json({message:'somthing went wrong',error})
    }
}


exports.searchUser=async(req,res)=>{
    let searchQuery=req.query.q
    try {
        const users = await User.find({ name: { $regex: searchQuery, $options: 'i' },isAdmin:false });
        if(!users){
            res.status(401).json({message:'No resault'})
        }
        res.json(users)

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'somthing went wrong',error})
    }
}