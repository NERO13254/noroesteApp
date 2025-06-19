const { insertWafer, getLastId } = require("./answers");
const { insertWaferInHtml } = require("./insertWaferInHtml");
const succesAlert = require("../succesAlert");
async function addNewWafer(dateNow) {
    // obtine todos los inputs 
    let collectInputs = Array.from(document.querySelectorAll(".addWaferController input"));
    let keysOfWafers = "";
    let valuesOfWafer = "";
    let objData = {};
    // genera la consulta a base de los datos recolectados
    collectInputs.forEach(element=>{
        keysOfWafers+= `${element.name} ,`;
        valuesOfWafer += `'${element.value.trim().toUpperCase()}',`; 
        objData[element.name] = element.value;
    });
    // inserta la oblea en DB
    await insertWafer(`(${keysOfWafers.slice(0,-1)},date,branded)VALUES(${valuesOfWafer.slice(0,-1)},'${dateInput.value}/${monthInput.value}/${yearInput.value}','')`)
    // Obtiene la ultima oblea
    let lastId = document.querySelector(".rowOfWafer button");
    // si hay obleas y la fecha es la de hoy  , solo obtiene el ultimo id registrado de la lista y le suma +1
    if(lastId &&  dateNow == `${dateInput.value}/${monthInput.value}/${yearInput.value}`){
        lastId = parseInt(lastId.name)+1;
    }else{
        // si no hay , obtiene el id de db , el ultimo +1 , sino le asigna 1
        lastId = await getLastId();
        lastId = lastId.length>0 ? lastId[0]["id"]+1  : 1;
    }
    objData["id"]=lastId;
    // inserta la oblea en HTML
    insertWaferInHtml(objData);
}

module.exports= {
    addNewWafer
}