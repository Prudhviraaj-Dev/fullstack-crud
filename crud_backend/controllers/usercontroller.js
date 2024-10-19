const User = require('../models/User')

const createuser = async (req, res) => {
    try{
        const {name, email,phonenumber } = req.body

        const user = new User ({
            name,
            email,
            phonenumber
        })
        await user.save()
        res.status(201).json(user)
    }catch(error){
        console.log("there is an error", error)
        res.status(500).json({message: 'server error'})
    }
}

const getUser = async (req, res) =>{
    try{
        const users = await User.find()
        res.status(200).json(users)

    }catch(error){
        console.log("there is an error", error)
        res.status(500).json({message: 'server error'})
    }
}

const deleteUser = async (req, res) =>{
    try{
        const deleteuser = await User.findByIdAndDelete(req.params.id)
        res.status(204).send

    }catch(error){
        console.log("there is an error", error)
        res.status(500).json({message: 'server error'})
    }
}
const editUser = async (req, res) =>{
    try{
        const {name, email,phonenumber,password,confirmpassword } = req.body

        const myUser = await User.findByIdAndUpdate(req.params.id,{name, email,phonenumber,password,confirmpassword })

        if(!myUser){
            res.status(404).json({message: "record not found"})
        }
        res.status(200).json(myUser)

    }catch(error){
        console.log("there is an error", error)
        res.status(500).json({message: 'server error'})
    }
}

module.exports = { createuser, getUser,deleteUser,editUser }