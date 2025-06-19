const db = require("../../db/dbRed");

const answers = {
    createSerial : (name , serial)=>{
        return db.runAnswer(`INSERT INTO serials (name , serial)VALUES('${name}', '${serial}')`);
    },
    createPayOrDebitRegister : (values)=>{
        return db.runAnswer(`INSERT INTO payordebit (date,obs,debit,pay,total,owner)VALUES(${values})`)
    },
    createVoucherRegister : (values)=>{
        return db.runAnswer(`INSERT INTO remitos (insideid,content,owner,discount,date)VALUES(${values})`)
    },
    createMerchSold : (data)=>{
        return db.runAnswer(`INSERT INTO merchsold (vouchernum,insideid,value,ammount,serialnumber)VALUES(${data})`);
    },
    readInsideIdVoucher:()=>{
        return db.allAnsWer(`SELECT insideid FROM remitos WHERE 1 ORDER BY id DESC LIMIT 1`);
    },
    readAllExistences : (insideid)=>{
        return db.allAnsWer(`SELECT  existence , billed FROM products WHERE insideid='${insideid}' `);
    },
    readNameCtaCte : (id)=>{
        return db.allAnsWer(`SELECT name FROM cuentascorrientes WHERE id = ${id}`);
    },
    readLastIdFromVouchers :()=>{
        return db.allAnsWer(`SELECT id FROM remitos WHERE 1 ORDER BY id DESC LIMIT 1`);
    },
    readLastVoucherCtaCte : (owner)=>{
        return db.allAnsWer(`SELECT  total FROM payordebit WHERE owner ='${owner}' ORDER BY id DESC LIMIT 1`);
    },
    readAllProducts : ()=>{
        return db.allAnsWer(`SELECT * FROM products WHERE 1`)
    },
    readSerials : (name , insideid)=>{
        return db.allAnsWer(`SELECT  id,serial FROM serials WHERE name = '${name}' OR name='${insideid}' `)
    },
    readAllKits : ()=>{
        return db.allAnsWer(`SELECT * FROM kit WHERE 1 `);
    },
    readCompsedSerial : (like)=>{
        return db.allAnsWer(`SELECT insideid FROM products WHERE ${like} LIKE '%' || insideid || '%'  `);
    },
    updateExistences : (billed , existence,insideid)=>{
        return db.runAnswer(`UPDATE products SET billed = '${billed}' , existence='${existence}' WHERE insideid='${insideid}'`)
    },
    deleteSerial : (serial , insideid)=>{
        
        console.log(`DELETE FROM serials WHERE serial ='${serial}' AND name ='${insideid}' OR serial ='${serial}'`)
        return db.runAnswer(`DELETE FROM serials WHERE serial ='${serial}' AND name ='${insideid}' OR serial ='${serial}'`);
    }
}

module.exports = {
    answers
}