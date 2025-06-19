const db = require("../../db/dbRed");



const answers = {
    beggin : ()=>{
       return db.runAnswer("BEGIN TRANSACTION");
    } ,
    commit : ()=>{
       return db.runAnswer("COMMIT");
    },
    createPay : (data)=>{
        return db.runAnswer(`INSERT INTO payordebit (date,obs,debit,pay,total,owner,ordernum)VALUES(${data})`);
    },
    collectDataVoucher : (id)=>{
        return db.allAnsWer(`SELECT * FROM remitos WHERE insideid='${id}'`);
    },
    collectSerials : (insideid , nameProd)=>{
        return db.allAnsWer(`SELECT serial FROM serials WHERE name='${insideid}' OR name ='${nameProd}' `);
    },
    updateContentVoucher:(content,discount, insideid)=>{
        return db.runAnswer(`UPDATE remitos SET content='${content}', discount='${discount}' WHERE insideid='${insideid}'`)
    },
    collectLastestVouchers : (owner , id)=>{
        return db.allAnsWer(`SELECT id,total FROM payordebit WHERE owner='${owner}' AND id>'${id}'`);
    },
    collectPreviousVoucher: (owner , id)=>{
        return db.allAnsWer(`SELECT total FROM payordebit WHERE owner='${owner}' AND id<'${id}' ORDER BY id DESC LIMIT 1 `);
    },
    readPreiousVouchers : (id, owner)=>{
        return db.allAnsWer(`SELECT id,pay,debit FROM payordebit WHERE owner='${owner}' AND id>'${id}' `);
    },
    readDataClient : (idCtaCte)=>{
        return db.allAnsWer(`SELECT * FROM cuentascorrientes WHERE id = '${idCtaCte}' `);
    },
    readAllCtaCtes : ()=>{
        return db.allAnsWer(`SELECT name,valorph, id FROM cuentascorrientes WHERE 1`);
    },
    readAllDataFinalConsumer : ()=>{
        return db.allAnsWer(`SELECT insideid , content , date FROM remitos WHERE owner = '000' ORDER BY id DESC`);
    },
    readAllVouchers :(id)=>{
        return db.allAnsWer(`SELECT id , date , obs, debit , pay , total FROM payordebit WHERE owner = '${id}' ORDER BY id DESC`)
    },
    readOnlyVoucher : (id)=>{
        return db.allAnsWer(`SELECT id , owner FROM remitos WHERE insideid = '${id}'`);
    },
    readValueDiscunt : (id)=>{
        return db.allAnsWer(`SELECT valuediscount FROM discount WHERE idctacte ='${idCtaCte}'`);
    },
    readLikeProduct : (nameProduct)=>{
        return db.allAnsWer(`SELECT insideid,name,brand,finalvalue,serial FROM products WHERE name LIKE '%'|| '${nameProduct}' || '%' `)
    },
    updateVoucher : (total,pay,debit,obs,id,owner)=>{
        return db.runAnswer(`UPDATE payordebit SET total='${total}' , pay='${pay}',debit='${debit}' , obs='${obs}', owner='${owner}' WHERE id='${id}'`);
    },
    updatePreviousVouchers : (total , id) =>{
        return db.runAnswer(`UPDATE payordebit SET total='${total}' WHERE id='${id}'`);
    } ,
    updateOwnerPh : (paydate,omologation,serial,namectacte)=>{
       return db.runAnswer(`UPDATE cilindersaved SET paydate='${paydate}' WHERE omologation='${omologation}' AND serialnumber='${serial}' AND paydate='${namectacte}' `)
    }
}

module.exports = {
    answers
}