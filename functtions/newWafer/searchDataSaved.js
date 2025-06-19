const { dynamicCilinders } = require("./dynamicCilinders");

async function searchDataSaved(data){
    // obtiene todos los valores de la oblea guardada que coincida el numero de oblea anterior con el ingresado
    let answerContent   = `SELECT * FROM waferdatasaved WHERE oldOblea='${data}'`;
    // realiza la consulta
    const getDataSaved  = await allAnswer(answerContent);
    // obtiene las keys del objeto de la cosulta
    const getKeys = Object.keys(getDataSaved[0]);
    // hace un bucle for para obtener los inputs , corroborando que see encuentren disponibles y los rellena
    for (let i = 0; i < getKeys.length; i++) {
        const element = getKeys[i];
        if(document.querySelector(`[name="${element}"]`) && getDataSaved[0][`${element}`] != null){
            document.querySelector(`[name="${element}"]`).value = getDataSaved[0][`${element}`];
        }
    }
    // chekea los inputs si es inyeccion o no
    if(parseInt(getDataSaved[0]["inyeccion"])>=1){
        document.getElementById("inyeccionYes").checked=true;
    }else{
        document.getElementById("inyeccionNo").checked=true;
    }

    // chekea el tipo de operacion con el cual se marcó
    document.getElementById("type"+getDataSaved[0]["typeOperationGeneral"]).checked= true


    // obtiene el numero de cuantos cilindros se cargaron en la oblea (2)
    let getAmmountCilinders = 0;
    for (let i = parseInt(getKeys.length) -5; i < getKeys.length-1; i++) {
        if(getDataSaved[0][`${getKeys[i]}`]!=null){
            getAmmountCilinders++
        }
    }
    // crea los campos de los cilindros
    await dynamicCilinders(getAmmountCilinders);
    // rellena los camos de los cilindros
    let cilinderInputContent = document.querySelectorAll(".cilinderInputContent");
    // recorre todos los campos encontrados
    for (let i = 0; i < cilinderInputContent.length; i++) {
        const element = cilinderInputContent[i];
        // obtiene todos los inputs de cada campo
        let getInputs =  element.querySelectorAll("input");
        // recorre los inputs obteniendo sus nombres y inserta los datos tipo texto
        for (let i = 0; i < getInputs.length; i++) {
            const element = getInputs[i];
            // si no es checkbox simplemente le añade el nombre sino corrobora que sea nuevo o usado y marca input
            if(element.type != 'checkbox'){
                element.value = getDataSaved[0][`${element.name}`];
            }else{
                if(parseInt(getDataSaved[0][`${element.name}`])>=1){
                    let getInput = document.getElementById(`${element.name}new`);
                    getInput.checked = true
                }else{
                    let getInput = document.getElementById(`${element.name}old`);
                    getInput.checked = true
                }
            }
        }
    }

    console.log(getAmmountCilinders)
    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    searchDataSaved
}