const db = require("../../db/dbRed");

const answer = {
    readAllProducts : ()=>{
        return db.allAnsWer(`SELECT * FROM products WHERE 1 ORDER BY name ASC`);
    },
    updateWebProduct : (data,insideid)=>{
        return db.runAnswer(`UPDATE products SET web='${data}' WHERE insideid='${insideid}'`);
    }
}


module.exports = {
    answer
}