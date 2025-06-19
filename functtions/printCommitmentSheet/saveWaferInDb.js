const { searchWafer } = require("./answers");

async function saveWaferInDb(toExport) {
    let waferNumber  =  "";
    let whereContent =  "";
    let answerContent=  "";

    let idCil = localStorage.getItem("idCilinderSaved");

    // si es una oblea para exportar , completa las variables para que la oblea se pueda exportar
    let dataValue    = "";
    let keyValue     = "";
    if(toExport=='toExport'){
        dataValue = ",exportado";
        keyValue =",'0'";
    }
    // obtiene todos los valores de la oblea
    let getDataStorage = Array.from(document.querySelectorAll("input"));
    
    // corrobora si es que existe la oblea en db
    let oldWaferNumberExist = document.getElementById("wafer").value;
    let waferExist = await searchWafer(oldWaferNumberExist);
    
    if( waferExist.length >= 1){
        // actualiza la oblea existente
        let dataContent = "";
        getDataStorage.forEach(element => {
            if(element.value.length>0 || element.getAttribute("type")=="checkbox"){
                if(element.getAttribute("type")!="checkbox"){
                    dataContent += `${element.id!= "wafer"?element.id: "oldOblea" }='${element.value}',`;
                    waferNumber = element.id!= "wafer"?waferNumber: element.value;
                }else if(element.checked){
                    dataContent += `${element.id}='X',`;
                }else{
                    dataContent += `${element.id}=${null},`; 
                }
            }
        });
        let domain = document.getElementById("domain").value.trim();
        let dniUser = document.getElementById("dniUser").value.trim();
        if(oldWaferNumberExist=="NO"){
            whereContent = `domain='${domain}' AND dni='${dniUser}'`;
        }else{
            whereContent = `domain='${domain}' AND dni='${dniUser}' AND oldOblea='${waferNumber}'`;
        }
        

        answerContent = `UPDATE wafersdata SET dni='${dniUser}',${dataContent.slice(0,-1)} , id_cilindersaved='${idCil}' WHERE ${whereContent}`;
        
    }else{
        // inserta la oblea en db
        let tablesDb = "";
        let valuesDb = "";
        getDataStorage.forEach(element => {
            if(element.value.length>0 || element.checked){
                if(element.getAttribute("type")!="checkbox"){
                    tablesDb += `${element.id!= "wafer"?element.id: "oldOblea" },`;
                    valuesDb += `'${element.value}',`;
                }else if(element.checked){
                    tablesDb += element.id+",";
                    valuesDb += ` 'X',`;
                }
            }
        });

        answerContent= `INSERT INTO wafersdata (dni,${tablesDb.slice(0,-1)+dataValue},id_cilindersaved)VALUES('${document.getElementById("dniUser").value.trim()}',${valuesDb.slice(0,-1)+keyValue},'${idCil}')`;
    }  
   
    console.log(answerContent);
    await runAnswer(answerContent);
}

module.exports = {
    saveWaferInDb
}