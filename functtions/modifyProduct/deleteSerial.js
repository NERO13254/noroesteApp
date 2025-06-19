const { answers } = require("./answers");

async function deleteSerial(data) {
    // obtiene los datos del producto y la serie que se quiere eliminar
    let getNumberSerial = data.parentNode.children[0].textContent;
    let getNameProduct = document.getElementById("name").value.toUpperCase().trim();
    let getIdProduct = document.getElementById("insideid").value.toUpperCase().trim();
    // elimina la serie
    await answers.deleteSerial(getNameProduct , getIdProduct , getNumberSerial);
    // elimina la serie de la lista
    data.parentNode.remove();
}

module.exports = {
    deleteSerial
}