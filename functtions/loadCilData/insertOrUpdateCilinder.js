const { updateOrInsertCilinder } = require("./answers");
const { collectOrtherData } = require("./collectOrtherData");
const { generateValuesForCil } = require("./generateValuesForCil");

async function insertOrUpdateCilinder(typeOperation) {
    // obtiene los datos del usuario y los transforma en JSON
    let getUserData = JSON.parse(localStorage.getItem("getDataUser"));
    let getKeysUser = Object.keys(getUserData);

    let keysAnswers     = "";
    let valuesAnswers   = "";
    let dataUpdate      = "";
    let getDataCilinder = Array.from(document.querySelectorAll(".dataCil"));
    getDataCilinder.forEach(element => {
        let typeData = element.getAttribute("name").split("_");
        if(typeData.length==1){
            let valueContent = element.tagName == "INPUT" ? element.value : element.textContent;
            // si es un insert divide los datos entre key y values sino lo hace todo en una
            if(typeOperation=="insert"){
                // corrige los campos de db que no son compatibles 
                keysAnswers = keysAnswers =="names" ? "nameandsurname" : keysAnswers;
                keysAnswers = keysAnswers =="location" ? "country" : keysAnswers;
                valuesAnswers+= `'${valueContent}',`;
            }else{
                dataUpdate+=`${element.getAttribute("name")}='${valueContent}',`;
            }
            
        }
    });
    // genera los valores aleatorios del cilindro
    generateValuesForCil(typeOperation);

    for (let i = 0; i < getKeysUser.length; i++) {
        if(getKeysUser[i] != "locationUser" ||getKeysUser[i]!="existences"){
            let keyContent =String(getKeysUser[i]).toLowerCase();
            if(getKeysUser[i] == "locationUser" || getKeysUser[i]=="existences"){
                
            }else{
                keyContent = keyContent == "direcion"? "direccion": keyContent;
                if(typeOperation=="insert"){
                    if(keyContent =="names"){
                        getKeysOfTheValuesForCil+=  "nameandsurname, "
                    }else if(keyContent =="location"){
                        getKeysOfTheValuesForCil+=  "country, "
                    }else{
                        getKeysOfTheValuesForCil+= keyContent+" ,"
                    }

                    
                    getValuesOfCil+= `'${getUserData[getKeysUser[i]]}',`;
                }else{
                    // corrige los campos de db que no son compatibles 
                    keyContent = keyContent =="names" ? "nameandsurname" : keyContent;
                    keyContent = keyContent =="location" ? "country" : keyContent;
                    dataUpdate+= `${keyContent}='${getUserData[getKeysUser[i]]}',`;
                }
            }
        }
    }

    let ortherData = await collectOrtherData();

    if(typeOperation=="update"){
        ortherData= ortherData.slice(0,-2);
    }

    ortherData.forEach(element=>{
        if(typeOperation=="insert"){
            getKeysOfTheValuesForCil+=`${element.split(":")[0]},`;
            getValuesOfCil+=`${element.split(":")[1]},`;
        }else{
            dataUpdate+=`${element.split(":")[0]}=${element.split(":")[1]},`;
        }
    });
    if(typeOperation=="insert"){
        completeAnswer = `INSERT INTO cilindersaved(${keysAnswers+getKeysOfTheValuesForCil.slice(0,-1)})
        VALUES(${valuesAnswers+getValuesOfCil.slice(0,-1)})`;
    }else{
        let idContent = localStorage.getItem("idCilinderSaved");

        if(idContent.slice(-1)=="_"){
            idContent = idContent.slice(0,-1)
            dataUpdate+= completeValuesOfCil;
        }
        completeAnswer = `UPDATE cilindersaved SET ${dataUpdate.slice(0,-1)} WHERE id='${idContent}'`;
    }

    console.log(completeAnswer);
    
    await updateOrInsertCilinder(completeAnswer);
}

module.exports = {
    insertOrUpdateCilinder
}