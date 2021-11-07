const user = require('../models/user');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

const registerUser = async (req,res)=>{
    const {name, email, password, batch} = req.body;

    const userExistance = await User.findOne({email})

    if(userExistance)
    {
        return res.status(400).json({
            error:"Email already exists"
        })
    }

    const user = await User.create({
        name,
        email,
        password,
        batch
    })

    if(user)
    {
        return res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            batch:user.batch,
            token:generateToken(user._id)
        })
    }
    else
    {
        return res.status(400).json({
            error:"Something went wrong"
        })
    }
}

const authenticateUser = async (req,res)=>{
    const {email,password} = req.body;
    
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password)))
    {
        return res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            batch:user.batch,
            token:generateToken(user._id)
        })
    }
    else
    {
        return res.status(400).json({
            error:"Invalid credentials"
        })
    }
}

module.exports = {registerUser,authenticateUser};