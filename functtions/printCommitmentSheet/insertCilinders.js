const { answers } = require("./answers");

async function insertCilinders(firstData) {
    // evalua cuantos cilindros hay cargados
    let cilData = Array.from(document.querySelectorAll(".cilInfo .inputCilDataContent "));
    let numberCilinder =0;
    // obtiene el numero de certificado correlativo
    let certificatenumber= await answers.ReadCertificateNumber();
    certificatenumber = certificatenumber.length>0 ? parseInt(certificatenumber[0]["certificatenumber"])+1 : 1;

    for (let i = 0; i < cilData.length; i++) {
        const element = cilData[i];
        let keysData = "certificatenumber,";
        let valuesData = `'${certificatenumber+i}',`;
        

        if(element.children[0].value.length>0){
            // actualiza el codigo de omologacion
            await answers.UpdateOmologation(certificatenumber+i);
            let allPuts = Array.from(element.querySelectorAll(`input[name='cil${element.children[0].name.slice(-1)}']`))
            allPuts.forEach(dataArr=>{
                keysData +=`${dataArr.id.slice(0,-1)},`;
                valuesData+=`'${dataArr.value.toUpperCase()}',`;
            })
            await answers.CreateCilinder(`insideid,`+keysData.slice(0,-1),`'${firstData["insideid"]}',`+valuesData.slice(0,-1));
        }
    }
}

module.exports = {
    insertCilinders
}