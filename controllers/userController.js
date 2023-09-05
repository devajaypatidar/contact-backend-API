const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
 // @desc register a user
// @routes POST /api/users/register
// @access public


const registerUser = asyncHandler(async (req, res) => {
const {username,email,password} = req.body;


    if(!username || !email || !password){
        res.status(400);
        throw new Error('All field are mandatory');

    };
    const userAvailable = await User.findOne({email: email}); 
    if(userAvailable){
        res.status(400);
        throw new Error('User is already present');
    }


    //hash Passwaord

    const hashedPassword = await bcrypt.hash(password,10);
    console.log("this is a hashed password"+hashedPassword);
    const newUser = await User.create({
        username: username,
        password: hashedPassword,
        email: email,
    })

    console.log("new user created"+newUser);
    if(newUser){
        res.status(201).json({_id: newUser.id,email: newUser.email});
    }else{
        res.status(400);
        throw new Error('user Data is not valid');
    }
    


    res.json({message: 'register'})
});

const loginUser = asyncHandler(async (req, res) => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('All Fields are mandatory');

    }

    const user = await User.findOne({email});
    // compare password with hash Password
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id: user.id
            },

        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"1m"}
        );

        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or Passsword is not vallid");
    }

    res.json({message: 'login'})
});


// private route 
const currentUser = asyncHandler(async (req, res) => {
    res.json({message: 'current'})
})


module.exports = {registerUser,loginUser,currentUser};