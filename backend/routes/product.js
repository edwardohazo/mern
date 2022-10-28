const router = require('express').Router();
const Product = require('../models/Product');
const CryptoJS = require("crypto-js");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin }  = require('./verifyToken');


// CREATE
router.post('/', verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product({
        title: req.body.title,
        desc: req.body.desc,
        img:  req.body.img,
        categories: req.body.categories,
        price: req.body.price
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch(err) {
        res.status(500).json(err);
    }
});


// UPDATE PRODUCT
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json("Product has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  
    try {
      const product = await Product.findById(req.params.id);
      console.log(product);

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//GET ALL PRODUCTS
router.get("/", async (req, res) => {

    const qNew = req.query.new;

    const qCategory = req.query.category;

    try {
      let products;

      if (qNew) {
        products = await Product.find().sort({createdAt: -1}).limit(3);
        console.log(products);
      } else if (qCategory){
        products = await Product.find({
            categories: {
                $in: [qCategory]
            }
        });
      }

      console.log("dentro de product");
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });


module.exports = router;