const { JsonWebTokenError } = require('jsonwebtoken');
const userModel = require('../models/user-model');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const hisaabModel = require("../models/hisaab");

const upload = require('../config/multer-config');
module.exports.homepageController = function(req,res){
    res.render("index", {loggedin: false}); 
}


module.exports.registerpageController = function(req,res){
    res.render("register", {loggedin: false});
}

module.exports.registerController = async function(req, res) {
    let { name, username, email, password } = req.body;
    try {
        let user = await userModel.findOne({ email });
        if (user) return res.send("You already have an account, please login");

        let salt = await bcrypt.genSalt(10);
        let hashed = await bcrypt.hash(password, salt);

        // Handle file upload
        let imageUrl = '';
        if (req.file) {
            imageUrl = req.file.buffer.toString('base64'); // Example: store as base64 string
        }

        user = await userModel.create({
            name,
            username,
            email,
            password: hashed,
            image: imageUrl, // Save the image URL if uploaded
        });

        let token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);
        res.cookie("token", token);
        res.redirect("/profile");
        console.log(user.image)
    } catch (err) {
        res.send(err.message);
    }
}

module.exports.loginController = async function(req, res){
    let {email,password} = req.body;
    try{
        let user = await userModel.findOne({email}).select("+password");
        if(!user)
            return res.send("user not found");

        let result = await bcrypt.compare(password, user.password);
        if(!result)
            return res.send("incorrect password");
        let token = jwt.sign({id:user._id, email:user._email}, process.env.JWT_KEY)
        res.cookie("token", token);
       res.redirect("/profile");
}
    catch(err){
        res.send(err.message);
    }
}

module.exports.logoutController = function(req,res){
    res.cookie("token","");
    res.redirect("/");
}

module.exports.profileController = async function(req, res){
  let byDate = Number(req.query.byDate);
  let {startDate,endDate} = req.query;

  byDate = byDate ? byDate :-1;
  startDate = startDate? startDate : new Date ("1970-01-01");
  endDate = endDate? endDate : new Date();


    let user = await userModel.findOne({email:req.user.email})
    .populate({
        path:"hisaabs",
        match : {createdAt :{ $gte : new Date(startDate),  $lte : new Date(endDate)  }},
        options:{sort:{createdAt:byDate}},
  } );
    res.render("profile",{user});
}
