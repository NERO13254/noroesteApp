async function searchDataClient(dni) {
    // obtiene el dni coincidiente con el ingresado y corrobora si existe o no
    let searchDni = await allAnswer(`SELECT * FROM clients WHERE dni ='${dni}'`);
    // si el dni existe rellena los campos
    if(searchDni.length>0){
        let inputsOfClient = Array.from(document.getElementsByClassName("personData")[0].querySelectorAll("input"));
        inputsOfClient.forEach(element => {
            let searchType = element.className.length>0 ? searchDni[0][element.className] : "";
            element.value = searchType;
        });
        numberClientSearched = 1;
    }else{
        numberClientSearched = 0;
    }
}

module.exports = {
    searchDataClient
}