const {reportStatus} = require("../reportStatus");
const { answers } = require("./answers");

async function deleteLocation(divSelected) {
    let id = document.getElementById("idLocation").textContent;

    reportStatus("Aviso","Estás po eliminar una localidad" ,
    "si eliminas una localidad esta no podrá ser recuperada ¿desea eliminarla de todos modos?" , 2 ,
    ["Cancelar" , "Eliminar"],["canelProcess" , "procedeToDeleteLocation"] ,
    document.getElementById("reportStatus"))
    
    // si se presiona eliminar , se borra de db
    document.getElementById("procedeToDeleteLocation").addEventListener("click" , async()=>{
        await answers.deleteLocation(id);
        document.getElementById("reportStatus").innerHTML='';
        document.getElementsByClassName("settingsLocationContent")[0].style.display='none';
        divSelected.remove();
    })
}

module.exports = {
    deleteLocation
}