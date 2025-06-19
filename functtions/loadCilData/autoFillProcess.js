const {saveChangesOfCilinder} = require("./saveChangesOfCilinder.js");

async function autoFillProcess(codeCilinderMatched) {
    // corrobora los datos del cilindro , si estan bien se setea true a codeCilinderMatched 
   
   console.log(codeCilinderMatched)
    return
    if(codeCilinderMatched){
        await saveChangesOfCilinder(codeCilinderMatched);
        localStorage.setItem("cilinderInfo" , `${codeO.value},${document.getElementById("serialNumber").value}`)
        window.close();
    }else{
        // despliega una alerta la cual indica que no se encontró el cilindro
        reportStatus.reportStatus("Error","Codigo Inexistente","El codigo que desdea agregar no se encuentra dentro de los cilindros guardados ¿Desea agregar el cilindro a la lista de cilindros?", 2 , ["Cancelar" , "Agregar"], ["canelProcess" , "addCilinderToSavedCilinders"] , document.getElementById("reportStatusContent"));
        // si se presiona "agregar" se abre la seccion de cilindros para agregar el cilindro que no existe
        document.getElementById("addCilinderToSavedCilinders").addEventListener("click" , ()=>{
            ipcRenderer.send("evenNewCil");
        });
        // si se presiona cancelar setea true al buscador de cilindros para que lo guarde por mas q no exista
        document.getElementById("canelProcess").addEventListener("click" , ()=>{
            codeCilinderMatched= true;
        })
    }
}

module.exports = {
    autoFillProcess
}