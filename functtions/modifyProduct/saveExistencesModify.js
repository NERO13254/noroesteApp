const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");

async function saveExistencesModify(params) {
    // obtiene el numero y para que factura va (facurado o no)
    let getData = document.querySelectorAll(".numberContent");

    // recorre todos los campos y actualiza las existencias del producto
    let getKeysAndValues ='';
    getData.forEach(element => {
        getKeysAndValues += `${element.name}='${element.value}',`;
    });
    await answers.updateExistences(getKeysAndValues.slice(0,-1),insideid.value);

    succesAlert("Exito" , "Se actualizaron las existencias correctamente" , 1 , ["cancelProcess"] , ["Aceptar"],
    document.getElementById("reportStatusContent"))
}

module.exports = {
    saveExistencesModify
}