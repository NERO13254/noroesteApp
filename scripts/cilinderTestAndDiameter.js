const {ipcRenderer}         = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const { getDataCilinder, updateCilinderData } = require("../functtions/cilTestAndDiametter/answers");
var backTo                  = document.getElementById("backTo");
var saveAndExit             = document.getElementById("saveAndExit");

window.onload = async()=>{
    // obtiene el id del cilindro
    let storageDatContent = localStorage.getItem("idCilinderSaved");
    // corrobora si el cilindro está incompleto o no para obtener el valor de id limpio
    let idCil =  storageDatContent.slice(-1)=="_" ? storageDatContent.slice(0,-1) :storageDatContent;
    //obtiene todos los datos del cilindro 
    let dataCilinder = await getDataCilinder(idCil);



    //si el cilindro a seleccionar ya está cargado y finalizado
    //completa los campos del html con los datos de la consulta
    let getAllDiams = Array.from(document.querySelectorAll(".dataGeted"));
    getAllDiams.forEach((element) => {
        let dataContent = dataCilinder[0][element.id]!="null" ? dataCilinder[0][element.id] : 0;
        element.value = dataContent ;
    });
    

    // actualiza los datos del cilindro 
    saveAndExit.addEventListener("click" , async()=>{
        let getAllDiams = Array.from(document.querySelectorAll(".dataGeted"));
        let answerDataContent = "";
        getAllDiams.forEach(element => {
            answerDataContent+= `${element.id} = '${element.value}',`;
        });
        // se actualiza el cilindro
        await updateCilinderData(answerDataContent.slice(0,-1),idCil);
        
        localStorage.removeItem("getDataUser");
        ipcRenderer.send("seeSavedCilinders");
        window.close();
    });

    // boton para volver atras
    backTo.addEventListener("click", ()=>{
        ipcRenderer.send("backToLoadCilinderData" , "back");
        window.close();
    });
}
