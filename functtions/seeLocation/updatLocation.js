const { answers } = require("./answers");
const { succesAlert } = require("../succesAlert");

async function updatLocation(divSelected) {
    let id      = document.getElementById("idLocation").textContent;
    let name    = document.getElementById("name").value;
    let cp      = document.getElementById("cp").value;

    let answer = `name='${name}',cp='${cp}'`;

    await answers.updateLocation(answer , id);

    document.getElementsByClassName("settingsLocationContent")[0].style.display='none';

    divSelected.children[0].textContent = name;
    divSelected.children[1].textContent = cp;

    succesAlert("Exito" , 
    "Localidad actuaizada con exito" , 1 , 
    ["cancelProcess"] , ["Aceptar"] , 
    document.getElementById("reportStatus"));

}

module.exports = {
    updatLocation
}