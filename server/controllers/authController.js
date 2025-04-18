const User = require('../models/user.js')
const {hashPassword, comparePassword} = require('../helpers/auth.js')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
    res.json('test is working')
}

//Register Endpoint
const registerUser= async (req, res) => {
    try {
        const {name, userName, email, password} = req.body;
        //Checks if name was entered
        if(!name){
            return res.json({
                error:'Name is required'
            })
        };

        //Check for Username
        const existUser = await User.findOne({userName});
        if(existUser){
            return res.json({
                error:'Username is taken or userName must be 5 characters long'
            })
        };

        //Checking Password
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            })
        };

        //Check Email
        const existEmail = await User.findOne({email});
        if(existEmail){
            return res.json({
                error:'Email is taken'
            })
        };

        //Hash Password, hashing the password
        const hashedPassword= await hashPassword(password)

        //User in DB
        const user = await User.create({
            name, 
            userName, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)

    } catch (error) {
        console.log(error)
    }
};

//Login Endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found!'
            })
        }

        //Check Pass Match
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err,token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            } )
        }
        if(!match){
            res.json({
                error: "Password doesn't match!"
            })
        }
    } catch (error) {
        console.log(error)
        
    }
}

//GetProfile
const getProfile = (req, res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    }else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}