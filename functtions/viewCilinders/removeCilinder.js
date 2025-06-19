const {reportStatus} = require ("../reportStatus");
const { answers } = require("./answers");

async function removeCilinder() {
    let id = document.getElementById("id").value;

    // lanza un aviso que se está por eliminar el cilindro
    reportStatus(
        "Aviso" ,
        "Estás por remover un cilindro" ,
        "Si remueves el cilindro , se prederán todos sus datos y no se podrá utilizar nuevamente",
        2 ,  ["cancelar" , "remover"] , ["canelProcess" , "procedeToDeleteCilnder"] ,
        document.getElementById("reportStatus")
    );

    // al presionar remover en la alerta , remueve el cilindro de db , de la lista general
    //  y cierra las ventanas emergentes
    document.getElementById("procedeToDeleteCilnder").addEventListener("click" , async()=>{
        await answers.delteCilinder(id);
        cilnderSelected.remove();
        document.getElementById("reportStatus").innerHTML='';
        document.getElementById("specificDataCilinder").style.display='none';
    });
}

module.exports = {
    removeCilinder
}