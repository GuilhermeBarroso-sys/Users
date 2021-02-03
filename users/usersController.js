const express = require("express");
const router = express.Router();
const User = require("./User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
router.get("/login",(req,res) => {
    res.render("login/signUp");
})
router.get("/signIn",(req,res) => {
    res.render("login/signIn"); // cadastrar
})

router.post("/create",(req,res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    User.findOne({
        where: {email: email}
        }).then( user => {
            if(user == undefined) {
                var hash = bcrypt.hashSync(password, salt);
                if(name != undefined && email != undefined && password != undefined) {
                    User.create({
                        name: name,
                        email: email,
                        password: hash
                    }).then(() => {
                        res.redirect("/");
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        })
})

router.post("/authenticate", (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(user => {
        if(user != undefined) {
            var truePassword = bcrypt.compareSync(password, user.password);
            if(truePassword) {
                req.session.user = {
                    id: user.id,
                    name: user.name
                }
                res.render("loginIndex", {user:user});
            }
            else {
                res.redirect("/login");
            }
        }
        else {
            res.redirect("/login");
        }
    })
})
module.exports = router;