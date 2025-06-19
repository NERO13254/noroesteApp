const db = require("../../db/dbRed");

const answers = {
    createProvince: (data)=>{
        return db.runAnswer(`INSERT INTO provincia (name)VALUES('${data}')`);
    } , 
    readAllProvinces : ()=>{
        return db.allAnsWer(`SELECT * FROM provincia WHERE 1 ORDER BY id DESC`);
    },
    readDuplicateProvince : (data)=>{
        return db.allAnsWer(`SELECT name FROM provincia WHERE name='${data}'`);
    },
    updateProvince : (data , id)=>{
        return db.allAnsWer(`UPDATE provincia SET name='${data}' WHERE id='${id}'`);
    },
    deleteProvince : (id)=>{
        return db.allAnsWer(`DELETE FROM provincia WHERE id='${id}' `);
    }
}

module.exports = {
    answers
}