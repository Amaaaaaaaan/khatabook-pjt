const jwt = require("jsonwebtoken");

const userModel = require("../models/user-model");

module.exports.isloggedin = async function(req,res,next){
    if(req.cookies.token){
     try{
        let result = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findById(result.id);
        req.user = user;
        next();
     }
     catch (err){
         return res.redirect("/");
     }
    }
    else{
        return res.redirect("/");
    }
}

module.exports.redirectifloggedin = function(req,res,next){
    if(req.cookies.token){
       try{
        let result = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        res.redirect("/profile");
       }
       catch (err){
           return next();
       }
    }
    next();
}