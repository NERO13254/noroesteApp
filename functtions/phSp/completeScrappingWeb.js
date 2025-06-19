async function completeScrappingWeb(data) {

    console.log(data)

    // convierte los datos recibidos en un array
    arrData = String(data).replace(/ /g , "").split(",");

    // completa el numero de serie y codigo de homologado
    omologation.value   = arrData[0];
    serialnumber.value  = arrData[1];

    // completa el mes y año de fabricación
    let dateFabContent  = arrData[3].split("/");
    dateFab.value       = dateFabContent[0];
    dateFabYear.value   = dateFabContent[1];

    // completa el mes y año de ultima revision
    let lastCrpcDate    = arrData[5].split("/");
    lastCrpc.value      = lastCrpcDate[0];
    lastCrpcYear.value  = lastCrpcDate[1];
    domain.value        = arrData[8];  
}

module.exports = {
    completeScrappingWeb
}