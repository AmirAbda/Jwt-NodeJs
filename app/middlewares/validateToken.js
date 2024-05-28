const jwt = require("jsonwebtoken");

require("dotenv").config();


async function validateToken(req, res , next){
    const authorizationHeader = req.headers.authorizationHeader;
    let result ;
    if(!authorizationHeader)
        return res.status(401).json({
            error: true,
            message: "Acess token is missing "
        })
}