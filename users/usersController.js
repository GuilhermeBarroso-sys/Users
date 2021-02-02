const express = require("express");
const router = express.Router();

router.get("/login",(req,res) => {
    res.render("login/signUp");
})
router.get("/signIn",(req,res) => {
    res.render("login/signIn"); // cadastrar
})

module.exports = router;