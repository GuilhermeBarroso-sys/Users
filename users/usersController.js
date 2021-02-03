const express = require("express");
const router = express.Router();
const User = require("./User");
const Plan = require("../plan/Plan");
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
                        password: hash,
                        isAdm: false
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
                if(user.isAdm) {
                    req.session.admin = {
                        id: user.id,
                        name: user.name
                    }
                    User.findAll({
                        where: {
                            isAdm: 0
                        },
                        include: [{model: Plan }]
                    }).then(users => {
                        res.render("admin/users/index", {user: user, users: users});
                    })
                    
                }
                else {
                    req.session.user = {
                        id: user.id,
                        name: user.name
                    }
                    res.render("loginIndex", {user:user});
                }
                
                
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
/* -Admin Routers */
router.get("/admin/users/edit/:id",(req,res) => {
    var id = req.params.id;
    if(id != undefined) {
        if(isNaN(id)) {
            res.redirect("/admin/index");
        }
        User.findByPk(id).then(user => {
            if(user != undefined) {
                res.render("admin/users/edit", {user: user});
            }
            else {
                res.redirect("admin/users/index")
            }
        })
    }

})
router.post("/users/update", (req,res) => {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var money = req.body.money;
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, salt);
    User.update({
        name: name,
        money: money,
        email: email,
        password: hash,
    },
    {where: {id: id}}).then(() => {
        res.redirect("/authenticate");
    })
})
router.post("/users/delete", (req,res) => {
    var id = req.body.id;
    User.destroy({where: {id: id}}).then(() => {
        res.redirect("/authenticate");
    })
})
module.exports = router;