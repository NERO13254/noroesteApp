const db = require("../../db/dbRed");


const answers = {
    readworkshopcodeTdm : (data)=>{
        return db.allAnsWer(`SELECT workshop, workshopcode FROM tdm WHERE id='${data}'`);
    },
    readLastThreeHundredCilinders : (data)=>{
        return db.allAnsWer(`SELECT id , omologation , serialnumber , insideid, finished FROM cilindersaved WHERE workshopcode = '${data}' ORDER BY id DESC LIMIT 300 `);
    },
    readDataWafers : (data)=>{
        return db.allAnsWer(`
        SELECT 
        id,domain , oldOblea ,
        typeOperationGeneral_B,
        typeOperationGeneral_C,
        typeOperationGeneral_M,
        typeOperationGeneral_R,
        typeOperationGeneral_D
        FROM wafersdata
        WHERE workshopcode='${data}'
        `);
    },
    readCilinderSearched : (omologation)=>{
        return db.allAnsWer(`SELECT id , omologation , serialnumber , insideid, finished FROM cilindersaved WHERE serialnumber = '${omologation}' `);
    }
}

module.exports = {
    answers
}