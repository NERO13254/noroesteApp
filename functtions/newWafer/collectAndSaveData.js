const { ipcRenderer } = require("electron");

async function collectAndSaveData(insertOrUpdate , oldOblea ){
    // si se encontró un cliente previo , se actualizan sus datos
    if(numberClientSearched==1){
        let generateAnswer = "";
        let inputsOfClient = Array.from(document.getElementsByClassName("personData")[0].querySelectorAll("input"));
        inputsOfClient.forEach(element => {
            generateAnswer += element.className.length>0 ? `${element.className}='${element.value}',`: "";
        });
        await runAnswer(`UPDATE clients SET ${generateAnswer.slice(0,-1)} WHERE dni = '${dni.value}' `);
    }

    let cilinderCount = 0;
    let objContent = [];
    // obtiene todos los inputs y los almacena en objContent
    let inputData = document.querySelectorAll("#inputData");
    for (let i = 0; i < inputData.length; i++) {
        const element = inputData[i];
        let getName = element.name;
        let createObj = { [getName] : `${element.value}`}
        objContent.push(createObj);
    }
    // obtiene el primer checkbox seleccionado dentro del div
    await collectDataCheckBox("#inyeccionContainer");
    await collectDataCheckBox("#contentInputs");
    // corrobora si hay cilindros y obtiene los inputs seleccionados de cada hilera de inputs
    let ammountCilinders = document.querySelectorAll(".cilinderInputContent").length;
    if(ammountCilinders>0){
        for (let i = 0; i < ammountCilinders; i++) {
            await collectDataCheckBox("#newOrOldCilContent"+i);
        }
    }


    // a base del objeto los inserta a los datos dinamicamente en la db
    let keysContent     = "";
    let valuesContent   = "";
    let updateData      = "";
    for (let i = 0; i < objContent.length; i++) {
        const element = objContent[i];
        let getKeys = Object.keys(element)[0];
        if(insertOrUpdate == "update"){
            updateData+= `'${getKeys}'= '${element[`${getKeys}`]}',`;
        }else{
            keysContent += `'${getKeys}',`;
            valuesContent += `'${element[`${getKeys}`]}',`;
            localStorage.removeItem("idWaferSaved");
        }
    }
    // selecciona todos los innputs estilo checkbox
    async function collectDataCheckBox(searchCheckBoxInputContent){
        return new Promise((resolve, reject) => {
            let getInputsChekeds = '';
            if(searchCheckBoxInputContent){
                let getContainers = document.querySelector(`${searchCheckBoxInputContent}`);
                if(getContainers){
                    getInputsChekeds= getContainers.querySelector('input[type="checkbox"]:checked');
                    checkContent = {[getInputsChekeds.name] : getInputsChekeds.value}
                    objContent.push(checkContent);
                }
            resolve();
        }});
    }
 
    // corrobora si se actualiza la oblea o se inserta una nueva oblea
    if(insertOrUpdate == "update"){
        let answerUpdate=`UPDATE waferdatasaved SET ${updateData.slice(0, -1)} WHERE oldOblea='${oldOblea}' `;
        console.log(answerUpdate)
        await runAnswer(answerUpdate);
        
        return new Promise((resolve, reject) => {
            localStorage.removeItem("idWaferSaved");
            window.close();
            resolve();
        })
    }else{
        // corrobora que no haya un numero de oblea anterior ya existente , y lo inserta si no encuentra dato
        let searchWafer = `SELECT oldOblea FROM waferdatasaved WHERE oldOblea='${document.getElementById("oldObleaContent").children[1].value}' `;
        const getDataDb = await allAnswer(searchWafer);
        if(getDataDb.length==0){
            let answerInsert = `INSERT INTO waferdatasaved (${ keysContent.slice(0 , -1)})VALUES(${valuesContent.slice(0, -1)})`;
            console.log(answerInsert);
            await runAnswer(answerInsert);
            localStorage.setItem("payOblea" , document.getElementById("oldObleaContent").children[1].value);
            ipcRenderer.send("payCilinder");
            return new Promise((resolve, reject) => {
                localStorage.removeItem("idWaferSaved");
                window.close();
                resolve();
            })
        }
        else{
            reportStatus.reportStatus("Error de Ingreso" , "Datos Duplicados" , "El numero de oblea anterior que intenta guardar ya están almacenados. No se permiten duplicados. Por favor, verifique e intente con datos diferentes." , 1 , ["Aceptar"]  , ["canelProcess"] , reportStatusContent);
        }
    }
}
module.exports = {
    collectAndSaveData
}