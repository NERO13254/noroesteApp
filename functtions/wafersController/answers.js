const dbRed =  require("../../db/dbRed");


const answers = {
    collectTablePosition : (data)=>{
        return dbRed.allAnsWer(`SELECT * FROM inputwaferposition WHERE tableName='${data}' `);
    },
    collectNoExportedWafers : ()=>{
        return dbRed.allAnsWer("SELECT * FROM wafersaved WHERE exportado='0' ");
    },
    cllectSpecificWafer : (oldWafer)=>{
        return dbRed.allAnsWer(`SELECT * FROM wafersaved WHERE oldWafer='${oldWafer}' `)
    },
    collectDataTdm : (workshopcode)=>{
        return dbRed.allAnsWer(`SELECT cuit FROM tdm WHERE workshopcode='${workshopcode}'`);
    },
    collectInsideId : ()=>{
        return dbRed.allAnsWer("SELECT insideid FROM correlativeNumbersRegulator WHERE 1 ORDER BY id DESC LIMIT 1");
    },
    collectWaferSavedDetailed : (data)=>{
        return dbRed.allAnsWer(`SELECT * FROM waferSavedDetailed WHERE insideid='${data}'`);
    },
    collectwaferSavedDetailedCilinder : (data)=>{
        return dbRed.allAnsWer(`SELECT * FROM waferSavedDetailedCilinder WHERE insideid='${data}'`);
    },
    collectWaferSavedDetailedValve : (data)=>{
        return dbRed.allAnsWer(`SELECT * FROM waferSavedDetailedValve WHERE insideid='${data}'`);
    },
    collectWaferSavedDetailedUser : (data)=>{
        return dbRed.allAnsWer(`SELECT * FROM waferSavedDetailedUser WHERE insideid='${data}'`);
    },
    collectColumntData : (data , insideid)=>{
        return dbRed.allAnsWer(`SELECT * FROM ${data} WHERE insideid ='${insideid}'`);
    },
    UpdateTablePosition: (description,value)=>{
        return dbRed.runAnswer(`UPDATE inputwaferposition SET positiondata='${value}' WHERE description='${description}' AND tableName='${sectionSelected}' `);
    },
    UpdateWaferGeneral: (id)=>{
        return dbRed.runAnswer(`UPDATE waferSaved SET exportado='1' WHERE id='${id}'`);
    },
    UpdateDate :( dateListName , dataUpdate,insideidContent)=>{
        return dbRed.runAnswer(`UPDATE ${dateListName} SET ${dataUpdate} WHERE insideid='${insideidContent}'`)
    },
    UpdateOnlyDate: (dateListName,dateUpdate,insideid , omologation)=>{
        return dbRed.runAnswer(`UPDATE ${dateListName} SET ${dateUpdate} WHERE insideid='${insideid}' AND serialnumber='${omologation}'`)
    },
    beggin : ()=>{
        return dbRed.runAnswer( "BEGIN TRANSACTION");
    },
    commit : ()=>{
        return dbRed.runAnswer("COMMIT");
    }
}

module.exports = {
    answers
}