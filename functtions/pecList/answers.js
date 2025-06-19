const db = require("../../db/dbRed");

const answers = {
    createPec : (pec)=>{
        return db.runAnswer(`INSERT INTO pecs (pec)VALUES('${pec}')`);
    },
    readAllPecs : ()=>{
        return db.allAnsWer("SELECT * FROM pecs WHERE 1 ORDER BY id DESC ");
    },
    readLastPec:()=>{
        return db.allAnsWer("SELECT id FROM pecs WHERE 1 ORDER BY id DESC LIMIT 1");
    },
    deletePec : (id)=>{
        return db.runAnswer(`DELETE FROM pecs WHERE id='${id}'`);
    }
}

module.exports = {
    answers
}