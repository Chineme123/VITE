const User = require('../model/usersSchema')
require('dotenv').config()

exports.createUser = async (req, res) => {
    try {

        let userExist = await User.findOne({email: req.body.email})
        
        if(userExist) {
            return res.json({
                message: 'Error',
                Response: 'User already exist'
            })
        }else {
            let {names, email, country} = req.body
        let newUser = new User({
            names, email, country
        })
        
        let data = await newUser.save()
        return res.json({
            message: 'success',
            userData: 'data'
        })
    }
} catch(err) {
    console.log(err)
   return res.status(500).send({
        msg: err.message,
        status: 500
    })
}
}

exports.getAllUser = async (req, res) => {
    let getUser = await User.find({})
    return res.json({
        message: "Success!",
        response: getUsers
    })
}

exports.getSingleUser = async (req, res) => {
    let getUsers = await User.findOne({"_id": req.params.id})
    return res.json({
        message: "Success!",
        response: getUsers
    })
}

exports.updateUserById = async (req, res) => {
    try {
        let {names, email, country} = req.body
        let updated = await User.findByIdAndUpdate(req.params.id, {names, email, country}, {new: true})
        return res.json({
            message: "Success!",
            response: updated
        })
    } catch (err) { 
        return res.json({
            message: err.message,
            response: "Fail to update"
        })
    }
}

exports.deleteUser = async (req, res) => {
    try{
        let deleteuser = await User.findByIdAndDelete({_id: req.params.id})
        return res.json({
            message: "Success",
            response: this.deleteUser
        })
    } catch (err) {
        
    }
}