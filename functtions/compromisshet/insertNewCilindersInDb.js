const { getMaterialOfCilinder, getCorrelativeNumbers, insertNewCilinder } = require("./answers");

async function insertNewCilInDb(cilDataObj, ammountCertificateNumber,clientDataCollected, dateNow) {
    let keysCilsFinish= "";
    let valuesCilinders="";
    // obtiene el ultimo  numero de interno y  certificado de cilindersaved
    let getCodesCils=  await getCorrelativeNumbers();
    let insideid= getCodesCils.length>0 ? parseInt(getCodesCils[0]["insideid"])+1 : 1;
    let certificatenumber =  getCodesCils.length>0 ? parseInt(getCodesCils[0]["certificatenumber"])+1 : 1;
    
    // crea un array para almacenar el codigo de cilindro
    let getCodeCilinders = [];
    let filteredCils = cilDataObj.filter(txt=>txt.split(":")[0].slice(-1)==ammountCertificateNumber);

    
    // recorre el array que contiene los datos del cilindro
    filteredCils.forEach(element => {
        // divide cada elemento para separar las keys de los valores
        let parts = element.split(":");
        // si la key es "omologation" entonces inserta el valor en un array particular
        if(parts[0].slice(0,-1) == "omologation"){
            getCodeCilinders.push(parts[1]);
        }
        // inserta las keys y valores del cilindro en un string particular
        keysCilsFinish+= parts[0].slice(0,-1)+",";
        valuesCilinders+= `'${parts[1]}',`;
    });

    // obtiene el material y si no lo encuentra setea NE
    let getMaterial = await getMaterialOfCilinder(getCodeCilinders[0].toUpperCase());
    let materialContent = getMaterial.length>0 ? getMaterial[0]["material"] :"NE";

    // a las keys del cilindro le suma las keys del cliente  
    keysCilsFinish += clientDataCollected[0];
    // a los valores del cilindro le suma los datos del cliente
    valuesCilinders+=clientDataCollected[1]


    // le suma otros valores a las keys
    keysCilsFinish += "material,chekeddate,certificatenumber,insideid,workshopcode,finished,wafer";
    // suma los datos de los otros valores
    valuesCilinders+=`'${materialContent}','${dateNow}', '${certificatenumber}','${insideid}','${localStorage.getItem("idWorkShop")}','NO','${document.getElementById("wafer").value}'  `;

    // inserta el cilindro en db
    await insertNewCilinder(keysCilsFinish,valuesCilinders);
}

module.exports = {
    insertNewCilInDb
}