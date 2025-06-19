const { answers } = require("./answers");
const dbRed =  require("../../db/dbRed");
const db = dbRed.getDb(__dirname);
const {succesAlert} = require("../succesAlert");
const { createTxtFunc } = require("./createTxtFunc");
const { createUserData } = require("./createUserData");

async function collectAllData(obj , route, waferSaved) {
    for (let i = 0; i < obj.length; i++) {
        const element = obj[i];
        await createTxtFunc(element, route , waferSaved);
    }
}

async function exportWafersTxt(waferNoExported) {
    db.run("BEGIN TRANSACTION");

    // recolecta los datos necesarios para exportar la oblea
    for (let i = 0; i < waferNoExported.length; i++) {
        const waferSaved = waferNoExported[i];
        const insideid = waferSaved["id"];

        // obtiene los datos del regulador y los añade al  txt correspondiente
        let waferSavedDetailed = await answers.collectWaferSavedDetailed(insideid);
        await collectAllData(waferSavedDetailed,"C:\\Users\\Usuario\\Desktop\\electron\\2\\obleas\\regulador.TXT",waferSaved);
        
        // obtiene los datos del cilindro y los añade al  txt correspondiente
        let waferSavedDetailedCilinder = await answers.collectwaferSavedDetailedCilinder(insideid);
        await collectAllData(waferSavedDetailedCilinder,"C:\\Users\\Usuario\\Desktop\\electron\\2\\obleas\\cilindro.txt",waferSaved);

        // obtiene los datos de la valvula y los añade al  txt correspondiente 
        let waferSavedDetailedValve = await answers.collectWaferSavedDetailedValve(insideid);
        await collectAllData(waferSavedDetailedValve,"C:\\Users\\Usuario\\Desktop\\electron\\2\\obleas\\valvula.TXT",waferSaved);

        // obtiene los datos del usuario y los añade al  txt correspondiente
        let waferSavedDetailedUser = await answers.collectWaferSavedDetailedUser(insideid);
        for (let i = 0; i < waferSavedDetailedUser.length; i++) {
            const element = waferSavedDetailedUser[i];
            await createUserData(
                element , 
                "C:\\Users\\Usuario\\Desktop\\electron\\2\\obleas\\usuario.TXT",
                waferSaved 
            )
        }

        // actualiza el registro general para marcarlo como exportado
        await answers.UpdateWaferGeneral(insideid);
    }
    db.run("COMMIT");

    succesAlert("Exito",`Se exportaron ${waferNoExported.length} Obleas` , 1 ,["cancelProcess"] ,["Aceptar"], document.getElementById("reportStatus"));
}
module.exports = {
    exportWafersTxt
}