const express = require("express");
const router = express.Router();
const User = require("../users/User");
const Plan = require("./Plan");

router.post("/buy",(req,res) => {
    var userId = req.body.userId;
    var id = req.body.id;
    var money = req.body.money;
    Plan.findOne({where:{
        id: id
    }}).then(plan => {
        if(money < plan.price) {
            res.send("Sem dinheiro!");
        }
        money-=plan.price;
        User.update({
            planId: id,
            money: money
        },{where: {id: userId}}).then(() => {
            res.redirect("/home");
        })
    })
})

module.exports = router;