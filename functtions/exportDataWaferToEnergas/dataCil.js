const fs                    = require("fs");
async function dateCil(firstPart ,element , ubicationTxt){
    let cilText             = "";
    // obtiene la fecha de vencimiento del cilindro
    let expirationDate      = element["firstDateClient"].split("/");
    expirationDate          = `${expirationDate[0]}/${expirationDate[1]}/${parseInt(expirationDate[2])+5}`;
    // hace un for para recorrer los 4 cilindros de la fila devuelta por db, si hay valores null los filtra
    for (let i = 0; i < 4; i++) {
        // recorre cada cilindro y si es vacio lo remplaza con -
        let codeCil     = element["codeCil"+i] || "-";
        let serialCil   = element["serialCil"+i]||"-";
        let operationCil= element["typeOperationCil"+i] || "-";
        let capacityCil = "-";
        let monthFab    = element["monthFabCil"+i] || "-";
        let yearFab     = element["yearFabCil"+i]|| "-";
        let qualificationMonth  = element["monthQualification"+i]|| "-";
        let qualificationYear   = element["yearQualification"+i]|| "-";
        // corrobora que haya un coigo de cilindro para buscar su capacidad y la asigna en una variable
        if(codeCil != "-"){
            capacityCil = await allAnswer(`SELECT capacity FROM typecilinders WHERE code LIKE '%'||'${codeCil}' || '%' LIMIT 1`);
            capacityCil = capacityCil[0]["capacity"];
        }
        // si existen los datos crea la cadena y la inserta en ciltext(una variable)
        if(codeCil != "-" && serialCil!="-" && operationCil!="-"){
            cilText= `${codeCil};${serialCil};${operationCil};${capacityCil};${monthFab}${yearFab};${qualificationMonth};${qualificationYear};${expirationDate};A;NumCertificado;${element["firstDateClient"]};A;`;
            // corrobora si la variable tiene texto y la inserta en el txt
            if(cilText.length!=0){
                cilText = firstPart+cilText+"\n";
                // escribe cada cilindro en el txt
                fs.appendFileSync(ubicationTxt , cilText , (err)=>{
                    if(err){
                        console.log(err.message);
                    }
                });
            }  
        }
    }
}
module.exports = {
    dateCil
}