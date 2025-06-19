const { searchLikedCilinder } = require("./answers");

async function searchDataCilinders(params) {
    // recibe el codigo del cilindro convertido a string y en mayusculas para realizar la busqueda en db
    let getDataTypeCilinder =await searchLikedCilinder(String(params).toUpperCase());

    if(getDataTypeCilinder.length>0){
        codeCilinderMatched=true;
        // completa los campos con la información recolectada de la consulta
        let getStrongs = Array.from(document.getElementsByClassName("dataCilinder")[0].querySelectorAll("strong"));
        let getInputs =Array.from(document.getElementsByClassName("dataOfTheCilinder")[0].querySelectorAll("input"));
        getInputs.map(data=>data.value = getDataTypeCilinder[0][data.id]);
        getStrongs.map(data=>data.textContent = getDataTypeCilinder[0][data.id]);
    }else{
        codeCilinderMatched=false;
    }
}


module.exports = {
    searchDataCilinders
}