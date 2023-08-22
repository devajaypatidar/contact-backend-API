 // @desc register a user
// @routes POST /api/users/register
// @access public
const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler(async (req, res) => {
    res.json({message: 'register'})
});

const loginUser = asyncHandler(async (req, res) => {
    res.json({message: 'login'})
});

const currentUser = asyncHandler(async (req, res) => {
    res.json({message: 'current'})
})


module.exports = {registerUser,loginUser,currentUser};