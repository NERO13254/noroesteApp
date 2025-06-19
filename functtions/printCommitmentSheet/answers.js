const db = require("../../db/dbRed");

async function collectDataClient(params) {
    try {
        return db.allAnsWer(`SELECT* FROM clients WHERE dni='${params}' ORDER BY id DESC LIMIT 1 `);
    } catch (error) {
        console.log(error);
    }
}
async function getWorkShopCode(id){
    try {
        return db.allAnsWer(`SELECT workshopcode FROM tdm WHERE id ='${id}' `);
    } catch (error) {
        console.log(error);
    }
}

async function searchWafer(data){
    try {
        return db.allAnsWer(`SELECT id FROM  wafersdata WHERE oldOblea='${data}'`);
    } catch (error) {
        console.log(error);
    }
}
async function collectAllDataFromWafer(params) {
    try {
        return db.allAnsWer(`SELECT * FROM wafersdata WHERE id='${params}'`);
    } catch (error) {
        console.log(error);
    }
}

const answers ={
    workshopCuit : (workshopcode)=>{
        return db.allAnsWer(`SELECT cuit FROM tdm WHERE workshopcode='${workshopcode}'`);
    },
    createWafer : (keys , values)=>{
        return db.runAnswer(`INSERT INTO waferSaved (${keys})VALUES(${values})`);
    },
    createWaferDetailed : (keys , values)=>{
        return db.runAnswer(`INSERT INTO waferSavedDetailed (${keys})VALUES(${values})`);
    },
    CreateCilinder : (keys , values)=>{
        return db.runAnswer(`INSERT INTO waferSavedDetailedCilinder (${keys})VALUES(${values})`);
    },
    CreateValve : (keys , values)=>{
        return db.runAnswer(`INSERT INTO waferSavedDetailedValve (${keys})VALUES(${values})`);
    },
    CreateUser : (keys, values)=>{
        return db.runAnswer(`INSERT INTO waferSavedDetailedUser (${keys})VALUES(${values})`);
    },
    ReadWafer : ()=>{
        return db.allAnsWer("SELECT id FROM waferSaved WHERE 1 ORDER BY id DESC LIMIT 1");
    },
    ReadCertificateNumber : ()=>{
        return db.allAnsWer("SELECT certificatenumber FROM correlativeNumbersRegulator WHERE 1");
    },
    ReadWaferSaved : (oldWafer)=>{
        return db.allAnsWer( `SELECT * FROM waferSaved WHERE oldWafer='${oldWafer}'`);
    },
    ReadCertificateNumber: (insideId)=>{
        return db.allAnsWer(`SELECT certificatenumber FROM waferSavedDetailedCilinder WHERE insideid='${insideId}'`);
    },
    readRelacionatedWafer : (idCilinder)=>{
        return db.allAnsWer(`SELECT * FROM wafersdata WHERE id_cilindersaved='${idCilinder}'`);
    },
    readCilinderData : (id)=>{
        return db.allAnsWer(`SELECT * FROM cilindersaved WHERE id='${id}'`);
    },
    UpdateOmologation : (valuesData)=>{
        return db.allAnsWer(`UPDATE correlativeNumbersRegulator SET certificatenumber='${valuesData}' `);
    },
    UpdateWaferSaved : (data,id)=>{
        return db.allAnsWer(`UPDATE waferSaved SET ${data}  WHERE id='${id}'`)
    },
    UpdateRegulator : (data , insideid)=>{
        return db.runAnswer(`UPDATE waferSavedDetailed SET ${data} WHERE insideid='${insideid}'`);
    },
    UpdateCilinder : (data , insideid , serialnumber)=>{
        return db.runAnswer(`UPDATE waferSavedDetailedCilinder SET ${data} WHERE insideid='${insideid}' AND serialnumber='${serialnumber}'`)
    },
    UpdateClient : (data , insideid)=>{
        return db.runAnswer(`UPDATE waferSavedDetailedUser SET ${data} WHERE insideid='${insideid}'`);
    },
    UpdateValve : (data , insideid , serialnumber)=>{
        return db.runAnswer(`UPDATE waferSavedDetailedValve SET ${data} WHERE insideid='${insideid}' AND serialValve='${serialnumber}'`);
    },
    DeleteCilinder : (insideid, serial)=>{
        return db.runAnswer(`DELETE FROM waferSavedDetailedCilinder WHERE insideid='${insideid}' AND serialnumber='${serial}' `);
    },
    DeleteValve : (insideid , serial)=>{
        return db.runAnswer(`DELETE FROM waferSavedDetailedValve WHERE insideid='${insideid}' AND serialValve='${serial}'`);
    }
}


module.exports = {
    collectDataClient,
    getWorkShopCode,
    searchWafer,
    collectAllDataFromWafer,
    answers
}