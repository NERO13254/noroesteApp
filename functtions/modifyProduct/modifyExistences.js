const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");

async function modifyExistencesFunction() {
    // obtiene todos los valores
    let AllPuts = document.querySelectorAll(".numberDataContent input");

    // genera la consulta update con los datos del cilindro 
    let dataAnswer ='';
    let totalExistences = 0;
    AllPuts.forEach(element=>{
        dataAnswer+= `${element.name} ='${element.value}',`;
        totalExistences+= parseInt(element.value) ? parseInt(element.value) : 0;
    });
    let insideid = document.getElementById("insideid").value;
    await answers.updateExistences(dataAnswer.slice(0,-1) , insideid);

    // actualiza el input de existencias totales
    document.getElementById("existence").value = totalExistences;
    document.getElementById("poductsBilledSection").style.display='none';

    succesAlert("Exito" ,
        "Existencias actualizadas con exito" , 
        1 , ["cancelProcess"] , ["Aceptar"] , 
        document.getElementById("reportStatusContent")
    ) 
}

module.exports = {
    modifyExistencesFunction
}