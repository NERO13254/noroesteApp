const { ipcRenderer } = require("electron");
const dbRed                         = require("../db/dbRed");
const db                            = dbRed.getDb(__dirname);
const inputsCollecteds              = document.getElementById("inputsCollecteds");
const loadDynamicCilWaferPh         = require("../functtions/waferDataPh/loadDynamicCilWaferPh");
const addNewCilinder                = document.getElementById("addNewCilinder");
const saveWafer                     = document.getElementById("saveWafer");
const saveWaferProcess              = require("../functtions/waferDataPh/saveWaferProcess");
const collectAndSaveData            = require("../functtions/newWafer/collectAndSaveData");
const updateCilinderSavedWafer      = require("../functtions/waferDataPh/updateCilinderSavedWafer");
const autoCompleteCarData           = require("../functtions/waferDataPh/autoCompleteCarData");
const addSimpleCilinder             = document.getElementById("addSimpleCilinder");
const modificationOperationCheckBox = document.getElementById("typeM");    

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        });
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        });
    })
}
// al ser seleccionado el elemento radio se muestra el html de nuevo regulador
modificationOperationCheckBox.addEventListener("change" , ()=>{
    document.getElementById("regulatorReplace").classList.toggle("gridBox");
});
modificationOperationCheckBox.addEventListener("blur" , ()=>{
    document.getElementById("regulatorReplace").classList.toggle("gridBox");
});

window.onload = async()=>{
    // obtiene los nombres de los datos del usuario de cilindersaved y los resultados los alacena en un array
    let getKeys = '';
    const getColumns = await allAnswer("PRAGMA table_info(cilindersaved)");
    for (let i = 50; i <= 58; i++) {
        if(i==57){
        }else{
            const element = getColumns[i]["name"];
            getKeys+= `${element},`;
        }
    }
    // se elimina la ultima "," del array y se hace la consulta para obtener los datos de las columnas
    getKeys = getKeys.slice(0 , -1);
    let getValuesAnswer = await allAnswer(`SELECT ${getKeys} FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1`);
    // crea un div que coniene los datos del usuario y un array que contiene el titulo de cada dato y se añade
    let createTitle = ["Localidad" , "Cp" , "Calle" , "Tipo" , "Dni" , "Dominio", "Nombre y Apellido" , "Provincia"];
    for (let i = 0; i < Object.keys(getValuesAnswer[0]).length; i++) {
        let keysDbUser    = Object.keys(getValuesAnswer[0])
        let valueDbUser   = getValuesAnswer[0][`${keysDbUser[i]}`];
        let div = document.createElement("div");
        div.className='userDataContainer';
        div.innerHTML = `
        <strong class='labelContent'>${createTitle[i]}</strong>
        <input type='text' id='dataUserSaved' name='${keysDbUser[i]}' value ='${valueDbUser}'>
        `;
        inputsCollecteds.append(div);
    }

    // al presionar enter sobre modelo de auto se autocompleta la marca
    document.getElementsByName("modelCar")[0].addEventListener("keyup" , (e)=>{
        if(e.key == "Enter"){
            autoCompleteCarData.autoCompleteCarData(e);
        }
    });

    // carga de manera dinamica los cilindros 
    await loadDynamicCilWaferPh.loadDynamicCilWaferPh();

    // añadir cilindro nuevo desempeñar funcion
    addNewCilinder.addEventListener("click" , ()=>{
        localStorage.setItem("addNewCilinderToActuallyWafer", "addCil");
        ipcRenderer.send("submiBtnForCilUser");
    });

    let countCils = 0;
    addSimpleCilinder.addEventListener("click" , async()=>{
        countCils++;
        await loadDynamicCilWaferPh.loadDynamicCilWaferPh(countCils);
        let getVals = document.querySelectorAll("#cilinderContentData")[countCils].querySelectorAll("input");
        for (let i = 0; i < getVals.length; i++) {
            const element = getVals[i];
            element.value = ""
        }
    });
    // si recibe el ipc actualiza la lista de cilindros y le añade el ultimo cilindro cargado a la lista
    ipcRenderer.on("reloadCilinderList" , async(event , data)=>{
        countCils++;
        console.log(countCils);
        console.log( document.querySelectorAll("#cilinderContentData"));
        await loadDynamicCilWaferPh.loadDynamicCilWaferPh(countCils);
    });
    // funcion al darle click guadar 
    saveWafer.addEventListener("click" , async()=>{
       await saveWaferProcess.saveWaferProcess(countCils);
       await updateCilinderSavedWafer.updateCilinderSavedWafer();
       localStorage.setItem("payOblea" , document.getElementsByName("oldOblea")[0].value);
       ipcRenderer.send("payCilinder");
       window.close();
    });
}