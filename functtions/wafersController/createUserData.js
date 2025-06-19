const fs = require("fs");

async function createUserData(obj , route , firstData) {
    
    let numberDni = String(firstData["workshopCuit"]).split("-")[1];

    let workshopCode = firstData["workshopcodeWafer"]

    let txt = `${firstData["pec"]};${firstData["workshopCuit"]};${firstData["id"]};${workshopCode};DNI;${numberDni};`;

    let objKeys = Object.keys(obj).slice(2);

    //inserta los valores en el txt
    objKeys.forEach(element => {
        txt+= `${obj[element]};`;
    });


    // inserta una A; por si hay otro dato
    txt+="A;\n";
   
    try {
        fs.appendFileSync(route , txt , "utf-8");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    createUserData
}