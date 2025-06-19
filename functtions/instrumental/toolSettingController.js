const { addToolToList } = require("./addToolToList");
const { insertNewTool, updateNewTool } = require("./answers");

async function toolSettingController(insertOrUpdate , id) {
    // obtiene todos los inputs que contienenen los datos de la herramienta
    let dataInputs = document.querySelectorAll("#settingsOfToolLoaded input");
    // genera variables que contendrán los datos de la herramienta
    let keyValues = "";
    let values = "";
    let contentAll = "";

    // crea un objeto que contendrá los datos de la herramienta para insertarlos en el HTML
    let objContent = {};
    // recoorre todos los inputs encontrados e inserta los datos en las variables generadas previamente
    dataInputs.forEach(element=>{
        keyValues+=`${element.name},`;
        values+=`'${element.value}',`;
        contentAll +=`${element.name}='${element.value}',`;

        objContent[element.name]=element.value;
    });
    // obtiene el utlimo id de la lista para añadirlo al objeto
    let getId = parseInt(document.querySelector(".toolContainer").id)+1
    objContent["id"]=getId;

    // si el parametro recibido es insert entonces realiza la consulta para insertar la herramienta en DB
    if(insertOrUpdate == "insert"){
        await insertNewTool(keyValues.slice(0,-1),values.slice(0,-1));
        addToolToList(objContent , "prepend");
    }
    // si el parametro recibido es update entonces actualiza la herramienta seleccionada
    if(insertOrUpdate =="update"){
        await updateNewTool(contentAll.slice(0,-1) , id);
    }
}


module.exports = {
    toolSettingController
}