const { answers } = require("./answers");
const {reportStatus} = require("../reportStatus");
const { ipcRenderer } = require("electron");
async function searchVoucher(){
    let alertContnet = document.getElementById("alertContnet");
    // busca en la base de datos el codigo del remito y selecciona su id y  de quien es el remito   

    let voucherData = await answers.readOnlyVoucher(document.getElementById("voucherNumSearched").value);

    // corrobora que haya coincidencias con el remito sino despliega la alerta 
    if(voucherData.length==0){
        reportStatus("Sin resultados coincidentes","NO HAY RESULTADOS" , "El valor ingresado no produjo coincidencias. Por favor, intenta con otros términos o verifica la información proporcionada." ,1, ["Aceptar"] , ["canelProcess"], alertContnet);
    }else{
        alertContnet.innerHTML="";
        // encapsula id y id de ctacte y lo guada en el local storage

        console.log(voucherData)

        let getId = [voucherData[0]["id"] , voucherData[0]["owner"]];
        localStorage.setItem("insideidSavedVoucher" , getId);
        ipcRenderer.send("printVoucher");
    }
        
  
}

module.exports = {
    searchVoucher
}