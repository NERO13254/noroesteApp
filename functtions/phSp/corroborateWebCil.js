const { reportStatus } = require("../reportStatus");
const { iprcRenderer, ipcRenderer } = require("electron");

async function corroborateWebCil() {
    let omologation = document.getElementById("omologation").value.toUpperCase().trim();
    let serialNumber = document.getElementById("serialnumber").value;
    let brand = document.getElementById("brand").textContent.trim().toUpperCase();

    if(omologation.length>0 && serialNumber.length>0 && brand.length>0){
        try {

            // envia los datos a la funcion que scrappea la web (loginIndex.js)
            ipcRenderer.send("corroborateWebCilinder",[omologation, serialNumber , brand]);
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error inesperado al corroborar los datos en la web ");
        }
    }else{
        reportStatus("Aviso" , "Debe completar los campos requeridos" , "Debe completar el campo de homologación , número de serie y marca del cilindro para corroborar los datos en la web." , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
    }
}

module.exports = {
    corroborateWebCil
}