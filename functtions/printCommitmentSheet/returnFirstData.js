const { answers } = require("./answers");

async function returnFirstData() {
    // 0  codigo de pec
    let pec = document.getElementById("pec").value;

    // 1 cuit del taller
    let workshopcode = document.getElementById("workshopcode").value.trim();
    let workshopCuit = await answers.workshopCuit(workshopcode);
    workshopCuit = workshopCuit[0]["cuit"];

    // 3  codigo del taller de las obleas 
    let workshopcodeWafer = "NORO08885";

    // 4 dominio 
    let domain = document.getElementById("domain").value.toUpperCase().trim();

    // 5 tipo de vehiculo
    let typeVehicle = "";
    document.querySelectorAll(".optionsSectionContent input[type='checkbox']").forEach((element,index)=>{
        if(element.checked==true){
            typeVehicle= index+1;
        }
    })

    return obj = {
        pec : pec,
        workshopCuit : workshopCuit,
        workshopcodeWafer: workshopcodeWafer,
        domain : domain,
        typeVehicle : typeVehicle
    }
}

module.exports = {
    returnFirstData
}