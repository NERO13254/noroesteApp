const { getProvincesNames, getClientData } = require("./answers");
const { insertDataOfTheUserInHtml } = require("./insertDataOfTheUserInHtml");

async function loadFirstClientData(){
    // en caso que se encuentren los datos del cliente ya creados en el localstorage
    if(localStorage.getItem("getDataUser")){
        // obtiene los datos transformados en json y los inserta en un array 
        let dataUser = [JSON.parse(localStorage.getItem("getDataUser"))];
        // inserta los datos en el html
        await insertDataOfTheUserInHtml(dataUser);
    }else{
        // corrobora si existe en localStorage un cilindro para ver 
        if(localStorage.getItem("idCilinderSaved")){
            // obtiene el id del cliente del localStorage
            let getStorage = localStorage.getItem("idCilinderSaved");
            // limpia el id en caso de que sea un cilindro incompleto 
            getStorage = getStorage.slice(-1)=="_" ? getStorage.slice(0,-1) : getStorage
  
            // obtiene los datos del cliente mediante su id desde db
            let dataUserFromDb = await getClientData(getStorage);
            // evalua si encontraron datos
            if(dataUserFromDb.length>0){
                // inserta los datos recolectados en el HTML
                await insertDataOfTheUserInHtml(dataUserFromDb);
            }
        }
    }
    
    // obtiene los nombres de todas las provincias de db
    let getNameProvinces = await getProvincesNames();
    // recorre todos los resultados y los imprime en el select del HTML
    for (let i = 0; i < getNameProvinces.length; i++) {
        const element = getNameProvinces[i];
        // crea el elemento option 
        let optionEelement          = document.createElement("option");
        optionEelement.value        = element["name"];
        optionEelement.innerHTML    = element["name"];

        // añade el elemento option  al HTML select
        document.getElementById("provincia").append(optionEelement);
    }                  
}
module.exports = {
    loadFirstClientData
}