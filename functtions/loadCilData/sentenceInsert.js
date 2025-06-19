
const { getCorrelativeNumbers, searchLikedCilinder } = require("./answers");
const { generateValuesForCil } = require("./generateValuesForCil");
// funcion que inserta el cilindro en db o lo actualiza 
async function sentenceInsert(typeOperation) {
    // genera un nuevo objeto de tipo fecha
    let newDate = new Date();

    // obtiene todos los datos del html sobre el cilindro
    let getDataCilinder = Array.from(document.querySelectorAll(".dataCil"));

    // recorre todos los resultados e inserta los valores en las variables "valuesAnswers" , "keysAnswers" 
    getDataCilinder.forEach(element => {
        let typeData = element.getAttribute("name").split("_");
        if(typeData.length==1){
            let valueContent = element.tagName == "INPUT" ? element.value : element.textContent;
            // si es un insert divide los datos entre key y values sino lo hace todo en una
            if(typeOperation=="insert"){
                keysAnswers += element.getAttribute("name")+",";
                valuesAnswers+= `'${valueContent}',`;
            }else{
                dataUpdate+=`${element.getAttribute("name")}='${valueContent}',`;
            }
        }
    }); 


    // genera los valores aleatorios del cilindro y  los inserta en  "getKeysOfTheValuesForCil" y "getValuesOfCil" 
    await generateValuesForCil(typeOperation );
   

    // obtiene los datos  del cliente proventientes del localStorage
    let getUserData = JSON.parse(localStorage.getItem("getDataUser"));

    // obtiene las claves del objeto que contiene los datos del cliente ("name" ,"province" , etc . . .)
    let getKeysUser = Object.keys(getUserData);
    getKeysUser =  Object.entries(getKeysUser);
    

    // recorre los datos obtenidos y los inserta en "getKeysOfTheValuesForCil" y "getValuesOfCil"
    for (let i = 0; i < getKeysUser.length; i++) {
        // evita que continuen los procesos , datos que no  son requeridos
        
        // transforma el valor en un string en minuscula
        let keyContent =String(getKeysUser[i][1]).toLowerCase();
        

        // si la  sentencia es insert divide las keys de los valores en una variable distinta
        if(typeOperation=="insert"){
            getKeysOfTheValuesForCil+=`${keyContent},`; 
            getValuesOfCil+= `'${getUserData[getKeysUser[i][1]]}',`;
        }
        else{
            if(keyContent != "locationuser"){
            // en caso de que sea  update inserta keys y valores en una misma fila
            dataUpdate+= `${keyContent}='${getUserData[getKeysUser[i][1]]}',`;
            }else if(keyContent != "existences" || keyContent != "locationuser" ){
                dataUpdate+= `${keyContent}='${getUserData[getKeysUser[i][1]]}',`;
            }

        }
    
    }

    // obtine el material del cilindro
    let getMaterial = await searchLikedCilinder(codeO.value.toUpperCase().trim());
    // obtiene los valores correlativos de numero de certificado y num interno
    let getNums     = await getCorrelativeNumbers();
    // evalua si se encuentran datos , de ser el caso los inserta en la variable, sino inserta 1
    let certficateContent   =getNums.length>0 ? parseInt(getNums[0]["certificatenumber"]): 1;
    let insideIdContent     =getNums.length>0 ? parseInt(getNums[0]["insideid"]) : 1 ;
    // evalua si se encntró el material sino lo establece en "NE"
    getMaterial = getMaterial.length>0 ? getMaterial[0]["material"] : "NE"

    // carga otros datos necesarios para guardar el cilindro en un array
    let ortherData = [`
    watertemperature:'${Math.floor(Math.random() * (27 - 21 + 1)) + 21}'`,
    `datefab:'${document.getElementById("dateFab").value}/${dateFabYear.value}'`,
    `lastcrpc: '${document.getElementById("lastCrpc").value}/${lastCrpcYear.value}'`,
    `pec:'${document.getElementById("pec").value}'`,
    `workshopcode:'${localStorage.getItem("idWorkShop")}'`,
    `volestimado:'${document.getElementById("vol").value}'`,
    `taraestimado:'${document.getElementById("tara").value}'`,
    "wafer:'NO'",
    "finished:'SI'",
    `material:'${getMaterial}'`,
    `chekeddate:'${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}'`,
    `certificatenumber:${certficateContent+1}`,
    `insideid:${insideIdContent+1}`
    ];


    // en caso de ser una actualización deja de lado los valores correlativos de certificado y num interno
    if(typeOperation=="update"){
        ortherData= ortherData.slice(0,-2);
    }
    // recorre el array creado e inserta los valores en las variables correspondientes
    ortherData.forEach(element=>{
        if(typeOperation=="insert"){
            getKeysOfTheValuesForCil+=`${element.split(":")[0]},`;
            getValuesOfCil+=`${element.split(":")[1]},`;
        }else{
            dataUpdate+=`${element.split(":")[0]}=${element.split(":")[1]},`;
        }
    });


    // junta los valores del cilndro y del usuario
    getKeysOfTheValuesForCil=getKeysOfTheValuesForCil+keysAnswers.slice(0,-1)
    getValuesOfCil=getValuesOfCil+valuesAnswers.slice(0,-1);

    if(typeOperation=="insert"){
        completeAnswer = `INSERT INTO cilindersaved(${getKeysOfTheValuesForCil})
        VALUES(${getValuesOfCil})`;
    }else{

        let idContent = localStorage.getItem("idCilinderSaved");

        if(idContent.slice(-1)=="_"){
            idContent = idContent.slice(0,-1);
       
            dataUpdate+= completeValuesOfCil;
        }
        completeAnswer = `UPDATE cilindersaved SET ${dataUpdate.slice(0,-1)} WHERE id='${idContent}'`;
    }

    // ejecuta la consulta insert o update el caso correspondiente
    console.log(completeAnswer);
    await runAnswer(completeAnswer);
}

module.exports =  {
    sentenceInsert
}