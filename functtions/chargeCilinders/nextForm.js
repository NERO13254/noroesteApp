const { ipcRenderer } = require("electron");
const { searchClientInDbClients, updateClientDataFunc , insertClientData, getLastCevigas } = require("./answers");

async function nextForm(){

    let getDniRepeated = await searchClientInDbClients(document.getElementById("dni").value);
    // obtiene todos los inputs
    let getAllInputs = Array.from(document.querySelectorAll(".dataClient"));
    let updateValuesAnswer = "";
    let keysValuesInsert =  "";
    let valuesInsert ="";
    let dataObj = {}
    // recorre todos los inputs 
    getAllInputs.forEach(element=>{
        updateValuesAnswer += `${element.id}='${element.value}', `;
        keysValuesInsert+=`${element.id},`;
        valuesInsert+=  `'${element.value}',`;

        dataObj[element.id]=element.value
    })

    // si no existe el dni que se insertó en el input , inserta los datos recopilados , sino los actualiza
    console.log(getDniRepeated )
    if(getDniRepeated.length > 0){
        await updateClientDataFunc(updateValuesAnswer.slice(0,-2) , document.getElementById("dni").value);
    }else{
        let lastCevigas = getLastCevigas.length>0 ? parseInt(await getLastCevigas[0]["idcevigas"])+1 : 1;
        let interNext =  getLastCevigas.length>0 ? parseInt(await getLastCevigas[0]["idinter"])+1 : 1;
        await insertClientData(keysValuesInsert+"idcevigas,idinter" , valuesInsert+ `${lastCevigas},${interNext}` );
    }


    localStorage.setItem("getDataUser" , JSON.stringify(dataObj));
}

module.exports = {
    nextForm
}