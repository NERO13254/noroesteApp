const db = require("../../db/dbRed");

const answers = {
    createCtaCte : (keys, values)=>{
        return db.runAnswer(`INSERT INTO cuentascorrientes (${keys})VALUES(${values})`);
    } , 
    readallCtaCtes : ()=>{
        return db.allAnsWer(`SELECT id , name , iva , cuit FROM cuentascorrientes WHERE 1 ORDER BY id DESC`);
    },
    readAllDataFromOnlyCtaCte : (id)=>{
        return db.allAnsWer(`SELECT * FROM cuentascorrientes WHERE id='${id}'`);
    },
    updateCtaCte : (data , id) =>{
        return db.runAnswer(`UPDATE cuentascorrientes SET ${data} WHERE id='${id}'`);
    },
    deleteCtaCte : (id) =>{
        return db.runAnswer(`DELETE FROM cuentascorrientes WHERE id ='${id}' `);
    },
    deletePayOrDebit : (id)=>{
        return db.runAnswer(`DELETE FROM payordebit WHERE owner='${id}'`)
    }
} 

module.exports = {
    answers
}