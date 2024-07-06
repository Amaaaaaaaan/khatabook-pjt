const express = require ("express");
const router = express.Router();
const {createHisaabController,
    hisaabpageController,
    showhisaabController,
    deleteController,
    editController,
    passcodeController,
    verifyController
} = require("../controllers/hisaabController");


const {
     isloggedin,
     redirectifloggedin 
 } = require("../middlewares/auth-middleware");

router.get("/create",isloggedin,hisaabpageController);
router.get("/view/:id",isloggedin,showhisaabController);
router.post("/create",isloggedin,createHisaabController);
router.get("/passcode/:id",isloggedin,passcodeController);
router.post("/view/:id",isloggedin,verifyController);
router.get("/delete/:id", deleteController);
router.get("/edit/:id",isloggedin,editController);




module.exports = router;