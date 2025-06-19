const db = require("../../db/dbRed");

const answers = {
    beggin : ()=>{
        return db.runAnswer("BEGIN TRANSACTION");
    } , 
    commit : ()=>{
        return db.runAnswer("COMMIT");
    },
    createSerial :(name, serial)=>{
        return db.runAnswer(`INSERT INTO serials (name ,serial)VALUES('${name}' , '${serial}') `)
    },
    updateExistences : (data , insideid) =>{
        return db.runAnswer(`UPDATE products SET ${data} WHERE insideid='${insideid}'`);
    },
    readDataProduct : (data)=>{
        return db.allAnsWer(`SELECT * FROM products WHERE insideid = '${data}' OR id='${data}'`)
    },
    readSerialsProduct : (name,code)=>{
        return db.allAnsWer(`SELECT serial FROM serials WHERE name = '${name}' OR name='${code}' ORDER BY serial ASC `);
    },
    deleteProduct : (getInsideIdStorage)=>{
        return db.runAnswer(`DELETE FROM products WHERE insideid='${getInsideIdStorage}'`)
    },
    deleteSerial : (name,insideid,serial)=>{
        let serialContent = serial ? `serial='${serial}' AND` : "";
        return db.runAnswer(`DELETE FROM serials WHERE ${serialContent} name='${name}' OR  ${serialContent} name='${insideid}'`);
    }
}


module.exports = {
    answers
}