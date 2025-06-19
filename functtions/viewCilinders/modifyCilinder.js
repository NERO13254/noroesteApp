const { answers } = require("./answers");
const {succesAlert} = require("../succesAlert");

async function modifyCilinder() {

    // recorre todos los valores del cilindro y genera la consulta
    let allPuts = Array.from(document.querySelectorAll("#inputContent input")).slice(2);
    let idVal = document.getElementById("id").value;
    let answerContent = "";

    allPuts.forEach(element=>{
        answerContent+= `${element.id}='${element.value}',`;
    });

    // cuando el cilindro se actualiza lanza una alerta de exito
    await answers.updateCilinder(answerContent.slice(0,-1) , idVal )
    succesAlert("Exito" , "Cilindro modificado con exito" , 1 , ["cancelProcess"] , ["Aceptar"] , document.getElementById("succesAlert"))

    // asigna los valores nuevos al input de la lista principal
    cilnderSelected.children[1].textContent =  allPuts[0].value
    cilnderSelected.children[2].textContent =  allPuts[1].value
    cilnderSelected.children[3].textContent =  allPuts[2].value
}

module.exports = {
    modifyCilinder
}