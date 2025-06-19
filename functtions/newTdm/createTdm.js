const { answers } = require("./answers");

async function createTdm() {

    let pecValue = document.getElementById("pec").value.trim();

    // relaciona el codigo pec
    let searchPec = await answers.ReadPec(pecValue);
    let pecId = "";
    // si existe el pec que se quiere cargar
    if(searchPec.length>0){
        pecId = searchPec[0]["id"];
    }else{
        pecId = await answers.CreatePec(pecValue);
        pecId = pecId[0]["id"];
    }

    console.log(pecId)
    return
    // obtiene todos los inputs y los recorre para crear la consulta
    let getAllInputs = document.querySelectorAll(".tdmData");
    let getValues = "";
    let getKeys   = "";  
    getAllInputs.forEach(element => {
        getValues+= `'${element.value}',`;
        getKeys+= `${element.id},`;
    });
    // inserta los datos del TDM en db
    //await answers.CreateTdm(getKeys.slice(0,-1),getValues.slice(0,-1));
    
    // obtiene su id 
    let lastId = await answers.ReadLastId();
    lastId = lastId.length>0 ? lastId[0]["id"] : 1;

    // Inserta el codigo de taller y lo relaciona con el TDM
    let wsCode = document.getElementById("workshopCode").value.trim().toUpperCase();
   // await answers.CreateWorkShopCode(" tdmId , workshopcode",`'${lastId}','${wsCode}'`);


}

module.exports = {
    createTdm
}