const { collectWaferDataClient, getDataCilinderFromCilinderSaved, collectAllDataFromWafer, answers } = require("./answers");
const { collectDataWafer } = require("./collectDataWafer");
const { collectPairCilinders } = require("./collectPairCilinders");

async function insertDataWaferInHtml() {
    let domainContent = "";
    let dniContent = "";

    let getData = "";
    // en caso de que se haya seleccionado un  cilindro de "cilindros guardados"
    if(localStorage.getItem("idCilinderSaved")){

        // corrobora si existe el id del cilindro en la base de las obleas
        let dataFromWafer = await answers.readRelacionatedWafer(localStorage.getItem("idCilinderSaved"));
        
        // si se seleccionó  un  cilindro carga los datos de este
        let dataCil = await answers.readCilinderData(localStorage.getItem("idCilinderSaved"));

        getData = dataFromWafer.length>0 ? dataFromWafer : dataCil;

        dataCilinder.push(dataCil[0]["domain"] , dataCil[0]["dni"]);
        domainContent = dataCil[0]["domain"];
        dniContent = dataCil[0]["dni"];
        

        // obtiene los cilindros pares
        await collectPairCilinders(dataCil[0]["dni"] ,dataCil[0]["workshopcode"]  , dataCil[0]["checkeddata"] );
    
    
    }else if(localStorage.getItem("idWaferSaved")){
        // si se seleccionó una oblea
        getData= await  collectAllDataFromWafer(localStorage.getItem("idWaferSaved").slice(1))
    }   

    // en caso de que se encuentren datos los inserta en el HTML
    if(getData.length>0){
        // recorre e inserta los datos en el HTML
        await collectDataWafer(getData);
    }
}

module.exports = {
    insertDataWaferInHtml
}