const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");

async function updateProvince(targetContent) {
    let name = document.getElementById("name").value.toUpperCase();
    let id = document.getElementById("idProvince").textContent;

    targetContent.parentNode.children[0].textContent = name;

    await answers.updateProvince(name , id);

    document.getElementById("modifySecttion").style.display='none';


    succesAlert("Exito" , "Provincia Actualizado" , 1 , ["cancelProcess"] , ["Aceptar"] , 
    document.getElementById("reportStatus") )

}

module.exports = {
    updateProvince
}