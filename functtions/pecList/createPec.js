const { succesAlert } = require("../succesAlert");
const { addPecToHtml } = require("./addPecToHtml");
const { answers } = require("./answers");

async function createPec() {
    let numberPec = document.getElementById("pecNumberUser").value;
    await answers.createPec(numberPec);

    let lastPec = await answers.readLastPec();

    succesAlert("Exito" , "Pec Creado con exito" , 1 , ["cancelProcess"] , ["Aceptar"] , document.getElementById("reportStatus"))
   
    addPecToHtml({"pec":numberPec, "id":lastPec[0]["id"]} , document.getElementById("defaultPecList"));
}

module.exports= {
    createPec
}