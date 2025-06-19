const { answers } = require("./answers");
const {succesAlert}= require("../succesAlert");
async function removePec(params) {
    let pecId = params.id;
    console.log(pecId);
    await answers.deletePec(pecId);
    params.parentNode.remove();
    succesAlert("Exito" , "El pec "+ params.parentNode.children[0].textContent +" fue eliminado exitosamente" , 1 , ["cancelProcess"] , ["Aceptar"] , document.getElementById("reportStatus"))
}

module.exports = {
    removePec
}