const express = require("express");
const router = express.Router();
const User = require("./User");
const Plan = require("../plan/Plan");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth")
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
                        money: 0.00,
                        planId: 2,    
                        password: hash,
                        isAdm: false
                    }).then(() => {
                        res.redirect("/login");
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        })
})
router.get("/home", (req,res) => {
    User.findOne({
        where: {id: req.session.user.id},
        include: [{model: Plan }]
    }).then(user => {
            
                res.render("loginIndex", {user:user});
            
            
       
    })
    
})
router.post("/authenticate", (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email},
        include: [{model: Plan }]
    }).then(user => {
        if(user != undefined) {
            var truePassword = bcrypt.compareSync(password, user.password);
            if(truePassword) {
                    req.session.user = {
                        id: user.id,
                        name: user.name
                    }
                   
                    res.redirect("/home");
                
                
                
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
router.get("/admLogin", (req,res) => {
    res.render("admin/users/admLogin");
})
router.post("/adminAuthenticate", (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({
        where: {email: email}
    }).then(admin => {
        if(admin != undefined) {
            var truePassword = bcrypt.compareSync(password, admin.password);
            if(truePassword && admin.isAdm) {
                    req.session.admin = {
                        id: admin.id,
                        name: admin.name
                    }
                    res.redirect("/admin");
                
                
                
            }
            else {
                res.redirect("/admLogin");
            }
        }
        else {
            res.redirect("/admLogin");
        }
    })
})
router.get("/admin/users/createUser", (req,res) => {
    Plan.findAll().then(plans => {
        res.render("admin/users/new", {plans: plans});
    })

    
}) 
/*if(user.isAdm) {
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
    
}*/
router.get("/admin", adminAuth,(req,res) => {
    User.findAll({            
        include: [{model: Plan }]
    }).then(users => {
        res.render("admin/users/index", {users: users});
    })
})
router.get("/admin/users/edit/:id", adminAuth,(req,res) => {
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
router.get("/logout", (req,res) => {
    req.session.user = undefined;
    res.redirect("/");
})
router.post("/users/update", adminAuth,(req,res) => {
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var money = req.body.money;
    var planId = req.body.planId;
    var isAdm = req.body.isAdm;
    var password = req.body.password;
    var hash = bcrypt.hashSync(password, salt);
    User.update({
        name: name,
        money: money,
        email: email,
        password: hash,
        planId: planId,
        isAdm: isAdm
    },
    {where: {id: id}}).then(() => {
        res.redirect("/admin");
    })
})
router.post("/users/delete", adminAuth, (req,res) => {
    var id = req.body.id;
    User.destroy({where: {id: id}}).then(() => {
        res.redirect("/admin");
    })
})

router.post("/users/save", adminAuth, (req,res ) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var money = req.body.money;
    var planId = req.body.planId;
    var isAdm = req.body.isAdm;
    User.findOne({where: {email: email}}).
    then(user => {
        if(user == undefined) {
            var hash = bcrypt.hashSync(password, salt);
            if(name != undefined  && email != undefined && password != undefined) {
                User.create({
                    name: name,
                    email: email,
                    password: hash,
                    money: money,
                    planId: planId,
                    isAdm: isAdm
                }).then(() => {
                    res.redirect("/admin");
                })
            }
        }
        else {
            res.redirect("/admin/users/createUser");
        }
    })
})
module.exports = router;