const db = require("../../db/dbRed");

const answers = {
    beginTransaction : ()=>{
        return db.runAnswer("BEGIN TRANSACTION");
    },
    commit : ()=>{
        return db.runAnswer("COMMIT");
    },
    insertTdm : (key , values)=>{
        return db.runAnswer(`INSERT INTO tdm (${key})VALUES(${values})`);
    },
    insertPec : (keys, values)=>{
        return db.runAnswer(`INSERT INTO pecs (${keys})VALUES(${values})`);
    },
    createTable : (columnTypeAndName)=>{
        console.log(`CREATE TABLE tdm( ${columnTypeAndName} FOREIGN KEY (id_pec) REFERENCES pecs(id) ON DELETE CASCADE )`);
        return db.allAnsWer(`CREATE TABLE tdm( ${columnTypeAndName} FOREIGN KEY (pec) REFERENCES pecs(id) ON DELETE CASCADE )`);
    },
    ReadTdmData : ()=>{
        return db.allAnsWer("SELECT * FROM tdm WHERE 1");
    },
    DeleteTable  : ()=>{
        return db.runAnswer("DROP TABLE tdm ");
    }
}

module.exports = {
    answers
}