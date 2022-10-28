const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");


// REGISTER
router.post('/register', async (req, res) => {
    console.log("registrando...");
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json(error);
    }

});


// LOGGIN
router.post('/loggin', async (req, res) => {

    try {
        const user = await User.findOne({ username: req.body.username});
        !user && res.status(401).json('Wrong credentials');
        // DESENCRYPTING PASSWORD TO COMPARE WITH THE ONE FROM USER
        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        // IF REQUEST USER PASSORD IS THE SAME AS THE USER PASSWORD DB
        OriginalPassword !== req.body.password && 
        res.status(401).json('Wrong credentials');
        
        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin,   
            }, 
            process.env.JWT_SEC,
            {expiresIn: "3d"}
            );
            
        const { password, ...others } = user._doc;
        // SENDING AN OBJECT WITH USER DB PROPERTIES
        res.status(200).json({...others, accessToken});
    } catch (error) {
        res.status(500).json(error);
    }

});


// LOGGIN GET PRUEBA DE GOTA FRONTEND / BACKEND
router.get('/loggin', async (req, res) => {
        res.status(200).json("SI PASO LA PRUEBA PERRO!");
});


module.exports = router;

