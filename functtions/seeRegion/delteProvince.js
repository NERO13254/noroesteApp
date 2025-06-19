const { reportStatus } = require("../reportStatus");
const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");

async function delteProvince(targetContent) {
    let id = document.getElementById("idProvince").textContent;
    await answers.deleteProvince(id);
    reportStatus("Aviso" , "¿Desea eliminar la provincia?" ,
    "Estás por eliminar la provincia , si prosigues los datos no se podrán recuperar" , 2 , 
    ["Cancelar" , "Eliminar"] , ["canelProcess" , "procedeToDeleteData"] , document.getElementById("reportStatus"));

    document.getElementById("procedeToDeleteData").addEventListener("click" , ()=>{
        document.getElementById("reportStatus").innerHTML='';
        document.getElementById("modifySecttion").style.display='none';
        targetContent.parentNode.remove();
    })
    
}

module.exports = {
    delteProvince
}