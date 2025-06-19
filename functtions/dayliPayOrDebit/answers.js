const dbRed                 = require("../../db/dbRed");
const db                    = dbRed.getDb(__dirname);
async function allAnswer(params) {
    return new Promise((resolve, reject) => {
        db.all(params , (err , row)=>{
            if(err){
                reject(err);
            }else{
                resolve(row);
            }
        });
    })
}

async function runAnswer(params) {
    return new Promise((resolve, reject) => {
        db.run(params , (err)=>{
            if(err){
                reject(err);
            }else{
                resolve();
            }
        });
    })
}

const answersContent = {
    collectData: (params)=>{
        return allAnswer(`SELECT id, creditor , value FROM dailyPay WHERE date='${params}'`);
    },
    defaultEgress: (params)=>{
        return allAnswer(`SELECT id, creditor , value FROM dailyegress WHERE date='${params}'`);
    },
    collectAllPay : ()=>{
        return allAnswer(`SELECT id, creditor, value , date FROM dailyPay WHERE 1 `);
    },
    collectAllEgress: ()=>{
        return allAnswer(`SELECT id, creditor, value , date FROM dailyegress WHERE 1`);
    },
    insertData : (keys, values , tableName)=>{
        runAnswer(`INSERT INTO ${tableName} (${keys})VALUES(${values})`);
    },
    lastId: (table)=>{
        return allAnswer(`SELECT id FROM ${table} WHERE 1 ORDER BY ID DESC LIMIT 1`);
    },
    updateRegister : (table,data , id)=>{
       return runAnswer(`UPDATE ${table} SET ${data} WHERE id='${id}'`);
    },
    deleteRegister : (table,id)=>{
        return runAnswer(`DELETE FROM ${table} WHERE id ='${id}'`);
    }
}


module.exports = {
    answersContent
}