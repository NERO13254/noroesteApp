const { ipcRenderer } = require("electron");
let generateValuesForCil = require("./generateValuesForCil");
async function waferButton(){
    let createAnswerData = [];
    // obtiene todos los inputs 
    let getInputs       = document.querySelectorAll("input");
    let workShopCode    = localStorage.getItem("idWorkShop");
    let incrementData   = await allAnswer("SELECT certificatenumber , insideid FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1");
    let certificateNum  = parseInt(incrementData[0]["certificatenumber"])+1
    let insideidNum     = parseInt(incrementData[0]["insideid"])+1
    let material        = localStorage.getItem("material");
    let dateNow         = new Date();
    let dateNowContent  = `${dateNow.getDate()}/${dateNow.getMonth()+1}/${dateNow.getFullYear()}`
    createAnswerData.push(
        {'insideid' : insideidNum},
        {'certificatenumber' : certificateNum},
        {'watertemperature' : watertemp},
        {"material" : material},
        {"chekeddate" : dateNowContent},
        {"workshopcode" : workShopCode}
    )
    
    function addValues(ammount , nameStorage , nameDb){
        for (let i = 1; i <= ammount; i++) {
            let nameStorageContent = i+nameStorage;
            if(i+nameStorage == "diamVal"){
                nameStorageContent = nameStorage+i;
            }
            let getData = localStorage.getItem(nameStorageContent);
            createAnswerData.push({[nameDb+i] : getData});
        }
    }
    addValues(8 , "espesor" , "diametro" )
    addValues(6 , "under" , "fondo" )
    addValues(6 , "ojive" , "ojiva" )
    addValues(6 , "diamVal" , "diam")
    //recorre los inputs para obtener sus valores
    getInputs.forEach((input , index) => {
        if(index< getInputs.length-2){
            createAnswerData.push({ [input.name]: input.value });
        }
    });
    // genera los valores aleatorios para el cilindro
    generateValuesForCil.generateValuesForCil();
    // obtiene los valores de los strongs 
    let getStrongsValues = document.querySelectorAll(".dataCil");
    getStrongsValues.forEach(strong => {
        createAnswerData.push( { [strong.getAttribute("name")] : `${strong.textContent}`})  
    });

    let getClientValues = JSON.parse(localStorage.getItem("getDataUser"));
    const getValuesClient = Object.values(getClientValues);
    // Obtiene los nombres de la base de datos y los almacena en un array
    let getKeys = [];
    const getColumns = await allAnswer("PRAGMA table_info(cilindersaved)");
    for (let i = 50; i <= 58; i++) {
        if(i==57){
        }else{
            const element = getColumns[i]["name"];
            getKeys.push(element)
        }
    }
    // inserta los datos del cliente
    for (let i = 0; i < getKeys.length; i++) {
        const element = getKeys[i];
        createAnswerData.push({[element]: `${getValuesClient[i]}`})
    }
    // recorre el array de objetos para armar la consulta de insert
    const keysAnswer = createAnswerData.map(obj => Object.keys(obj)[0]).join(", ");
    const valuesAnswer  = createAnswerData.map(obj => "'"+Object.values(obj)[0]+"'").join(",");

    await runAnswer(`INSERT INTO cilindersaved (${keysAnswer})VALUES(${valuesAnswer})`);
    let saveCilData =  [codeO.value , serialNumber.value];
    localStorage.setItem("cilinderInfo",saveCilData); 
    ipcRenderer.send("payCilinder");
    localStorage.setItem("phAndOblea" , certificateNum);
    
}

module.exports = {
    waferButton
}