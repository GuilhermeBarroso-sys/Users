const sequelize = require("sequelize");
const conn = require("../database/database");
const Plan = conn.define('plan',{
    name: {
        type: sequelize.STRING,
        
    },
    support: {
        type: sequelize.BOOLEAN,
        
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

Plan.sync({force: false});

module.exports = Plan;