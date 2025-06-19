const generateValuesForCil = require("./generateValuesForCil");
async function updateCilinderData(row){
    console.log("pedro");
    function createStringUpdate(ammount , name , nameDb){
        let completeString = "";
        for (let i = 1; i <= ammount; i++) {
            let getStorageData = localStorage.getItem(i+name);
            completeString+= `,${nameDb+i}='${getStorageData}'`;
        }
        return completeString;
    }

    let dataUser = "";
    // verifica de donde vienen los datos del usuario y los almacena en una variable
    if(localStorage.getItem("dataUser")){
        dataUser = JSON.parse(localStorage.getItem("dataUser"));
    }else{
        dataUser = JSON.parse(localStorage.getItem("getDataUser"));
    }
    // también obtiene los valores del cilindro guardado y corrobora que esten completos corroborandolo con el "_"
    let cilindersaved = localStorage.getItem("idCilinderSaved");
    if(cilindersaved.slice(-1)=="_"){
        cilindersaved=cilindersaved.slice(0,-1);
    }
    let geDiametros = createStringUpdate(8 , "espesor" , "diametro");
    let getFondo    = createStringUpdate(6 , "under" , "fondo");
    let getOjuva    = createStringUpdate(6 , "ojive" , "ojiva");
    let getDiams    = createStringUpdate(6 , "diamVal" , "diam");

    // genera la temperatura del agua y obtiene algunos valores del html (vol masa , exp max , total exp)
    var watertemp       = Math.floor(Math.random()*8)+ 21;
    let maxexpansion    = document.getElementById("maxExpansion");
    let totalExpansion  = document.getElementById("totalExpansion");
    let rules           = document.getElementById("rules");
    let coeficent       = document.getElementById("coeficent");
    var pec             = document.getElementById("pec");

    let updateCil = `
    UPDATE cilindersaved SET
    omologation= '${codeO.value}' ,
    datefab='${dateFab.value}',
    lastcrpc='${lastCrpc.value}',
    coeficent = '${coeficent.textContent}',
    pec = '${pec.value}',
    diametronominal='${maxexpansion.textContent}',
    serialnumber='${serialNumber.value}',
    taramedido='${tara.value}',
    taraestimado='${tara.value}',
    volmedido='${vol.value}',
    volestimado='${vol.value}',
    brand='${bandCilinder.value}',
    capacity='${capacity.value}',
    country='${dataUser["country"]}',
    cp='${dataUser["cp"]}',
    direccion='${dataUser["direcion"]}',
    dni='${dataUser["dni"]}',
    domain='${dataUser["domain"]}',
    nameandsurname='${dataUser["nameAndSurname"]}'
    ${geDiametros}
    ${getFondo}
    ${getOjuva}
    ${getDiams},
    expansiontotal='${maxexpansion.textContent}',
    expansionpermanente='${totalExpansion.textContent}',
    material = '${localStorage.getItem("material")}',
    watertemperature = '${watertemp}',
    rulefab = '${rules.textContent}',
    finished = 'SI'
    WHERE
    serialnumber='${row[0]["serialnumber"]}' AND omologation='${row[0]["omologation"]}' AND id='${cilindersaved}'
    `;


    await runAnswer(updateCil);
    // genera los valores aleatorios
    await generateValuesForCil.generateValuesForCil();


    return new Promise((resolve, reject) => {
        console.log("esto se resuelve antes");
        resolve();
    })
}
module.exports= {
    updateCilinderData
}