const { answers } = require("./answers");
const {succesAlert} = require("../succesAlert");
async function updateCtaCteData() {

    // recolecta todos los datos de la cuenta corriente
    let data = "";
    document.querySelectorAll("#sectionModify input").forEach(element=>{
        data += `${element.id}='${element.value}',`;
    });

    // actualiza la cuenta corriente seleccionada 
    await answers.updateCtaCte(data.slice(0,-1) , document.getElementById("id").textContent);

    succesAlert("Exito","Registro actualizado con éxito" , 1 , ["cancelProcess"] , ["Aceptar"] , document.getElementById("reportStatus"))
}


module.exports = {
    updateCtaCteData
}