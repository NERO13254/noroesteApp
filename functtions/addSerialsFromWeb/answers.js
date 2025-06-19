const db = require("../../db/dbRed");

const answers = {
    begginSentence : ()=>{
        return db.runAnswer("BEGIN TRANSACTION");
    },
    commitSentence : ()=>{
        return db.runAnswer("COMMIT");
    },
    CreateSerial : (name , serial )=>{
       return db.runAnswer(`INSERT INTO serials (name , serial )VALUES('${name}','${serial}')`);
    }
}

module.exports = {
    answers
}