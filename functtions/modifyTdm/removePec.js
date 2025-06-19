const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");

async function removePec(target) {
    let idPec = target.parentNode.children[0].className;
    await answers.deleteRelacionatedPec(idPec);

    target.parentNode.remove();
    succesAlert("Exito" , "Pec removido con exito" , 1, ["cancelProcess"] , ["Aceptar"] , document.getElementById("alertContainer"))

}

module.exports = {
    removePec
}