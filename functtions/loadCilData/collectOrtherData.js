const { searchLikedCilinder, getCorrelativeNumbers } = require("./answers");

async function collectOrtherData(){
    // obtiene los ultimos numeros de certificado y codigo interno guardados en DB
    let getNums     = await getCorrelativeNumbers();
    // obtiene el material del cillindro de DB
    let getMaterial = await searchLikedCilinder(codeO.value.toUpperCase());
    // obtiene los datos de fabricacion y el ultimo crpc
    let dateFab=`${document.getElementById("dateFab").value}/${document.getElementById("dateFabYear").value}`; 
    let lastCrpc = `${document.getElementById("lastCrpc").value}/${document.getElementById("lastCrpcYear").value}`;
    // obtiene un valor aleatorio entre 27 y 21 siendo esta la temeratura del agua
    const waterTemp = Math.floor(Math.random() * (27 - 21 + 1)) + 21;
    // establece la fecha de hoy
    let newDate = new Date();
    let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    return [
        `watertemperature:'${waterTemp}'`,
        `datefab:'${dateFab}'`,
        `lastcrpc: '${lastCrpc}'`,
        `workshopcode:'${localStorage.getItem("idWorkShop")}'`,
        `volestimado:'${vol.value}'`,
        `taraestimado:'${tara.value}'`,
        "wafer:'NO'",
        "finished:'SI'",
        `material:'${getMaterial.length>0 ? [0]["material"] : "NE"}'`,
        `chekeddate:'${dateNow}'`,
        `certificatenumber:${parseInt(getNums[0]["certificatenumber"])+1}`,
        `insideid:${parseInt(getNums[0]["insideid"])+1}`
    ];
}

module.exports = {
    collectOrtherData
}