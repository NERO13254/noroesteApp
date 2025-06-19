const db = require("../../db/dbRed");

const answers = {
    beginTransaction: ()=>{
        return db.runAnswer("BEGIN TRANSACTION");
    },
    commit : ()=>{
        return db.runAnswer("COMMIT");
    },
    updateProduct : (data, insideid)=>{
        return db.runAnswer(`UPDATE products SET ${data} WHERE insideid='${insideid}' `);
    }
}

module.exports = {
    answers
}