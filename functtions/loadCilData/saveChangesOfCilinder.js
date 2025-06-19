const { sentenceInsert } = require("./sentenceInsert");
const { ipcRenderer } = require("electron");

async function saveChangesOfCilinder() {

    let typeOperation   =autoFillbtn.textContent;
    let answerContent   = "";
    let completeAnswer  = "";
    let sendRenderer    = "";
    let dateFab=`${document.getElementById("dateFab").value}/${document.getElementById("dateFabYear").value}`; 
    let lastCrpc = `${document.getElementById("lastCrpc").value}/${document.getElementById("lastCrpcYear").value}`;

    if(typeOperation == "Guardar"){
        // inserta el cilindro en db
        await sentenceInsert("insert");
        sendRenderer = "payCilinder";
    }else{
        // si no está idCilinderSaved es un cilindro condenado
        if(!localStorage.getItem("idCilinderSaved")){
            // inserta el cilindro condenado en db
            await sentenceInsert("insert");
            sendRenderer = "sentenceWindow";
        }else{
            // actualiza los datos del cilindro y del usuario
            idCilinder = localStorage.getItem("idCilinderSaved").slice(-1)=="_" ? localStorage.getItem("idCilinderSaved").slice(0,-1) : localStorage.getItem("idCilinderSaved");
            answerContent+= `datefab='${dateFab}',`;
            answerContent+=`lastcrpc='${lastCrpc}',`;

            if(localStorage.getItem("idCilinderSaved").slice(-1)=="_"){
                await   sentenceInsert("update");
            }else{
                await  sentenceInsert("update");
            }
            sendRenderer = 'backtoTestAndDiameter';
        }
    }

    //envia el renderer para abrir la ventana siguiente
    ipcRenderer.send(sendRenderer);
}
module.exports = {
    saveChangesOfCilinder
}