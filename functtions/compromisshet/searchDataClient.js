const { getDataClient, getLocation, answers } = require("./answers");

// funcion que busca los datos del cliente y los imprime en html
async function searchDataClient(){

    let getInputsClient = document.getElementsByClassName("clientData")[0].querySelectorAll("[name='inputContent']");

    // selecciona el dni de la base de datos
    let getClientData = await getDataClient();

    // si se encuentran datos los inserta en el HTML
    if(getClientData.length>0){
        for (let i = 0; i < getInputsClient.length; i++) {
            const element = getInputsClient[i];
            // inserta los  valores encontrados en el html
            element.value = getClientData[0][`${getInputsClient[i].id}`];
        }
    }
}

//funcion que busca el cp segun la localidad ingresada
async function searchCpFromLocation(data){
    // obtiene la  provincia de db
    let getCpData = await answers.readLocation(data);
    // si encuentra provincia la inserta
    if(getCpData.length>0){
        cp.value = getCpData[0]["cp"];
        country.value = getCpData[0]["name"];
    } 
}

module.exports ={
    searchDataClient,
    searchCpFromLocation
}