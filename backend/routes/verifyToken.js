const jwt = require("jsonwebtoken");
const User = require('../models/User');

// VERIFY IF TOKEN ALREADY EXIST ON JWT
const verifyToken =  (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        // IF TOKEN IS CORRECT USER WILL BE THE OBJECT CREATED WITH JWT SIGN METHOD
        jwt.verify(token, process.env.JWT_SEC, (err, user) => {
            if (err) res.status(403).json("You are not authenticated!");
            // ASIGN JWT USER CREATED TO REQ
            req.user = user;
            next(); 
        });
    } else {
        return res.status(401).json("You are not authenticated!");
    }
};

// FUNCTION FOR USER AND ADMIN
const verifyTokenAndAuthorization = (req, res, next) => {
        verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next();
            } else {
                res.status(403).json("Youre not allowed to do that!");
            }
        }
    );
}

// FUNCTION FOR ADMIN
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        console.log(req);
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403).json("Youre not allowed to do that!");
        }
    }
);
}


module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin  };