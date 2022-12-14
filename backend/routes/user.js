const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }  = require('./verifyToken');


// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });


//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(req.body);

      const { password, ...others } = user._doc;
      // SENDING AN OBJECT WITH USER DB PROPERTIES
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    console.log(1);

    const query = req.query.new;

    try {
      const users = query ? await User.find().sort({_id: -1}).limit(4) : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 2));
    
    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            { $project: { month: { $month: "$createdAt" } } },
            { $group: { _id: "$month", total: { $sum: 1 } } },
        ]);
        // RETURNS AN OBJECT WITH MONTH NUMBER AND USERS CREATED PER MONTH
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
  });


module.exports = router;


