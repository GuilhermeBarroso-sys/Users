const sequelize = require("sequelize");
const conn = require("../database/database");
const Plan = conn.define('plan',{
    name: {
        type: sequelize.STRING,
        
    },
    support: {
        type: sequelize.BOOLEAN,
        
    },
    price: {
        type: sequelize.DOUBLE
    },
    benefits: {
        type: sequelize.BOOLEAN,
        
    },
    duration: {
        type: sequelize.INTEGER,
        
    },
    album: {
        type: sequelize.BOOLEAN,
        
    },
    descont: {
        type: sequelize.BOOLEAN,
        
    },
    ilimitedContent: {
        type: sequelize.BOOLEAN,
        
    },
    maxContent: {
        type: sequelize.INTEGER,
        
    }
})
/*
Plan.create({
    name: "Simples",
    support: 1,
    benefits: 1,
    price: 25.00,
    duration: 60,
    album: 0,
    descont: 0,
    ilimitedContent: 0,
    maxContent: 3
});
Plan.create({
    name: "Avançado",
    support: 1,
    benefits: 1,
    price: 50.00,
    duration: 180,
    album: 1,
    descont: 1,
    ilimitedContent: 0,
    maxContent: 6
});
Plan.create({
    name: "Profissional",
    support: 1,
    benefits: 1,
    price: 80.00,
    duration: 365,
    album: 1,
    descont: 1,
    ilimitedContent: 1,
    maxContent: 999
});
*/
Plan.sync({force: false});

module.exports = Plan;