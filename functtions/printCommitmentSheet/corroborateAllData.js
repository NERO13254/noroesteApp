const { answers } = require("./answers");

async function corroborateAllData(firstData) {
    // obtiene todos los campos del regulador
    let regulator = Array.from(document.querySelectorAll(".regulatorData .inputsContent .regulatorInputContent input"));

    // obtiene el tipo de tramite
    let transactType = document.getElementById("typeOperationRegulator").value.toUpperCase();
    
    // si no existen valores dentro de codigo y serie actual busca la primera que se encuentre
    let dataRegulator = document.getElementById("reguatorCode").parentNode;
    if(dataRegulator.children[1].value.length<=0 && dataRegulator.children[2].value.length<=0){
        let dataContainer = "";
        regulator.forEach(element=>{
            if(element.value.length>0){
                dataContainer = element.parentNode;
            }
        });
        dataRegulator = dataContainer;
    }
    // almacena los datos del regulador en un objeto
    let objData = {
        [dataRegulator.children[1].name.split("_")[0]]:dataRegulator.children[1].value.toUpperCase(),
        [dataRegulator.children[2].name.split("_")[0]]:dataRegulator.children[2].value.toUpperCase(),
        "typeOperationRegulator" : transactType,
        "dateMontage": document.getElementById("chekeddate").value,
        "dateHabilitation": document.getElementById("chekeddate").value
    }

    let keysAnswer='', valuesAnswer='';

    let keys = Object.keys(objData);
    for (let i = 0; i < keys.length; i++) {
        console.log(i)
        const element = keys[i];
        keysAnswer+=element+",";
        valuesAnswer += `'${objData[element]}',`;
    }
    // obtiene los valores para la oblea general
    let keysGeneral="" , valuesGeneral="" ;
    let keysObj = Object.keys(firstData);
    for (let i = 0; i < keysObj.length; i++) {
        const element = keysObj[i];
        keysGeneral   += keysObj[i]+",";
        valuesGeneral += `'${firstData[element]}',`;
    }


    // crea la oblea general
    answers.createWafer("workshopcode , oldWafer,"+keysGeneral.slice(0,-1) , `'${document.getElementById("workshopcode").value}','${document.getElementById("wafer").value}',${valuesGeneral.slice(0,-1)}`);
    
    // obteine el codigo interno general (numero correlativo que siguen las obleas exportadas)
    let insideid = await answers.ReadWafer();
    insideid = insideid.length>0 ? parseInt(insideid[0]["id"]) : 1;
    firstData["insideid"]=insideid;


    // crea los datos del regulador
    answers.createWaferDetailed("insideid,"+keysAnswer.slice(0,-1),`'${insideid}',`+valuesAnswer.slice(0,-1));
}


module.exports = {
    corroborateAllData
}