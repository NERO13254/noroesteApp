const db             = require("../../db/dbRed");

const answers = {
    CreateTdm : (keys, values) =>{
        return db.allAnsWer(`INSERT INTO tdm (${keys})VALUES(${values})`);
    },
    CreateWorkShopCode :(keys , values)=>{
        return db.runAnswer(`INSERT INTO workshopcodes (${keys})VALUES(${values})`);
    },
    CreatePec: async(pec)=>{
        await db.runAnswer(`INSERT INTO pecs (pec)VALUES(${pec})`);
        return db.allAnsWer(`SELECT id FROM pecs WHERE 1 ORDER BY id DESC LIMIT 1` ); 
    },
    ReadLastId: ()=>{
        return db.allAnsWer("SELECT id FROM tdm WHERE 1 ORDER BY id DESC LIMIT 1");
    },
    ReadPec : (pec)=>{
        return db.allAnsWer(`SELECT id FROM pecs WHERE pec='${pec}' LIMIT 1 `);
    }
}

module.exports = {
    answers
}