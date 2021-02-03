const express = require("express");
const session = require("express-session");
const app = express();
const conn = require("./database/database");
const User = require("./users/User");
const Plan = require("./plan/Plan");
const bodyParser = require("body-parser");
const users = require("./Users/usersController");
app.use(session({
    secret: "dolphplan"
}))
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
conn.authenticate()
.then(() => {
    console.log("Banco de dados conectado!")
}).catch((error) => {
    console.log("Erro no banco de dados! ->" + error);
}) 


app.use("/", users);
app.get("/", (req,res) => {
    
    res.render("index");
})



app.listen(8080, (error) => {
    if(error) {
        console.log(error)
    }
    else {
        console.log("Servidor iniciado!");
    }
})