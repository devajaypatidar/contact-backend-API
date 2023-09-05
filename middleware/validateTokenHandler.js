const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  
  let authHeader = req.headers.authorization || req.headers.Authorization;
  
  if (authHeader && authHeader.startsWith("Bearer")){
  token = authHeader.split(" ")[1];
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
        console.log("jwt is not verified ")
      res.status(401);
      throw new Error("User is not Authorized");
    }

    console.log(decoded);
  })
  console.log("end ");
}else{
    res.status(401);
    console.log("Token not verified");
    throw new Error("Token not verified")
}

});

module.exports = validateToken;
