const { reportStatus } = require("../reportStatus");
const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");
const { insertPecInList } = require("./insertPecInList");

async function addSerial(target) {

    function pecExist(){
        reportStatus(
        "Error" ,
        "PEC En Lista" , 
        "El PEC que intenta agregar ya se encuentra en la lista de guardados" , 
        1 , 
        ["Aceptar"] , 
        ["canelProcess"] , 
        document.getElementById("alertContainer"));
    }

    let pecList = document.getElementById("resultsPecContent");
    let data = target.parentNode.children[0].textContent;
    let corroborate = false;

    // corrobora que el pec no se encuentre en la lista
    document.querySelectorAll(".onlyPecContent").forEach(element=>{
        element.children[0].textContent == data ? corroborate=true : "";
    });

    // obtiene el id del pec anterior 
    let idPec = await answers.readLastIdPec();
    idPec = (idPec.length>0 && idPec[0]["id"]) ? parseInt(idPec[0]["id"])+1 : 50;

    // añade el pec a la lista y la oculta sino , lanza una alerta que el pec ya está en lista
    !corroborate ? (insertPecInList({"id":idPec,"pec":data}), pecList.style.display='none' ): pecExist();

    // añade la relación al tdm
    await answers.createPec(`${idPec},'${localStorage.getItem("idTdm")}', '${target.parentNode.children[0].className}' `);
    succesAlert(
    "Exito" , "Pec añadido a la lista con exito", 
    1, ["cancelProcess"], ["Aceptar"],  
    document.getElementById("alertContainer"))
}

module.exports = {
    addSerial
}