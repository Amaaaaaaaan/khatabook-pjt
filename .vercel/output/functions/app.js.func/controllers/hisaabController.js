const userModel = require("../models/user-model");
const hisaabModel = require("../models/hisaab");

module.exports.createHisaabController = async function(req,res){
    let {title,description,encrypted,shareable,passcode,editpermissions} = req.body;

   encrypted = encrypted=== "on" ?true : false;
   shareable = shareable=== "on" ?true : false;
   editpermissions = editpermissions=== "on" ?true : false;

  try{
    let hisaabcreated = await hisaabModel.create({
        title,
        description,
        encrypted,
        shareable,
        passcode,
        editpermissions,
        user: req.user._id
    });

    let user = await userModel.findById(req.user.id);
   user.hisaabs.push(hisaabcreated._id);
   await user.save();
  }
  catch(err){
res.send(err.message)
  }

   res.redirect("/profile");
}

module.exports.hisaabpageController = async function(req,res){
    res.render("create");
}


module.exports.readhisaabController = async function(req,res){
    let hisaab = await hisaabModel.findOne({_id:req.params.id})
    .populate("user");
    if(hisaab.encrypted){
        return res.render("passcode",{hisaab})
    }else{
   return res.render("hisaab", {hisaab});
}
}

module.exports.verifyhisaabController = async function(req,res){
    let hisaab = await hisaabModel.findOne({_id:req.params.id})
    .populate("user");
    if(hisaab.passcode == req.body.passcode){
     res.redirect(`/hisaab/${req.params.id}`);
    }
    else{
     res.send("Invalid passcode")
    }
 }


 module.exports.readVerifiedhisaabController = async function(req,res){
    let hisaab = await hisaabModel.findOne({_id:req.params.id})
    .populate("user");
   
   return res.render("hisaab", {hisaab});
}

module.exports.deleteController = async function(req, res) {
     let deleted = await hisaabModel.findOneAndDelete({_id:req.params.id});
        res.redirect("/profile");    
};




module.exports.editController = async function(req,res){
    let update = await hisaabModel.findOne({_id:req.params.id});
    res.render("edit", {update});   
}



module.exports.updateHisaabController = async function(req, res) {
    let { id } = req.params; 
    let { title, description, shareable, passcode, editpermissions } = req.body;

    
    shareable = shareable === "on" ? true : false;
    editpermissions = editpermissions === "on" ? true : false;

    try {
        let updatedHisaab = await hisaabModel.findOneAndUpdate(
            { _id: id, user: req.user._id }, 
            {
                title,
                description,    
                shareable,
                passcode,
                editpermissions
            },
            { new: true } // Return the updated document
        );

        if (!updatedHisaab) {
            return res.status(404).send('Hisaab not found');
        }

        res.redirect("/profile");
    } catch (err) {
        res.status(500).send(err.message);
    }
};
