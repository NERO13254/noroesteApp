const { answers } = require("./answers");

async function loadCilinderDataSaved(id){
    let dataCil = await answers.readCil(id);

    // inserta la provincia
    let option = new Option(dataCil[0]["provincia"] , dataCil[0]["provincia"] , true, true)
    document.getElementById("provincia").append(option);

    // inserta el tipo de dni
    let optionDni = new Option(dataCil[0]["idtype"]  , dataCil[0]["idtype"] , true , true);
    document.getElementById("idtype").append(optionDni);

    // completa los campos 
    document.querySelectorAll(".dataGeted").forEach(element => {
        document.getElementById(element.id).value =  dataCil[0][element.id];
    });

    // completa el campo de bureta
    document.getElementById("bureta").append(new Option(dataCil[0]["bureta"],dataCil[0]["bureta"] , true , true))

    // completa la fecha de fabricacion
    let dateFab = dataCil[0]["datefab"].split("/");
    document.getElementById("dateFab").value = dateFab[0]
    document.getElementById("dateFabYear").value = dateFab[1]


    // completa las fechas de ultimo crpc
    let lastCrpc = dataCil[0]["lastcrpc"].split("/");
    document.getElementById("lastCrpc").value = lastCrpc[0];
    document.getElementById("lastCrpcYear").value = lastCrpc[1];

    document.querySelector(".contentTestInput #volmedido").value = dataCil[0]["volmedido"];
    document.querySelector(".contentTestInput #taramedido").value = dataCil[0]["taramedido"];
    document.querySelectorAll("#obs").forEach(data=> data.value = dataCil[0]["obs"])
    
    // completa el campo de pec
    let pec = new Option(dataCil[0]["pec"] , dataCil["pec"],true, true);
    document.getElementById("pec").append(pec);
}
module.exports = {
    loadCilinderDataSaved
}