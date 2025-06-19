const { printCilInHtml } = require("./printCilInHtml");

async function chargeCilindersOfLastestDays(data) {
    let dataContent = "";
    if(data.value){
        dataContent = data.value
    }else{
        dataContent = data
    }
    let getAllCils = await allAnswer(`SELECT pec , workshopcode ,nameandsurname , idtype ,dni, direccion , country  , provincia , cp, domain, omologation,serialnumber, datefab ,status, material,taramedido, insideid, certificatenumber, capacity FROM cilindersaved WHERE chekeddate='${dataContent}' AND finished='SI' ORDER BY certificatenumber DESC`);
    getAllCils.forEach(element => {
        printCilInHtml(element , document.getElementById("cilindersList"));
    });
    
}
module.exports = {
    chargeCilindersOfLastestDays
}