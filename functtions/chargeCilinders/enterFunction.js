const { searchClientInDbClients } = require("./answers");
const { insertDataOfTheUserInHtml } = require("./insertDataOfTheUserInHtml");




// al presionar enter obtiene los datos del usuario y los imrpime en el html
async function enterFunction(e){

    // al presionar enter en un nuevo cilindro 
    const searchContent = await searchClientInDbClients(e.target.value);
    console.log(searchContent);
    if(searchContent.length>0){
        // obtieniendo de manera ordenada (en el orden de los iniputs) completa los campos 
        await insertDataOfTheUserInHtml(searchContent)
    }
    
}

module.exports = {
    enterFunction
}