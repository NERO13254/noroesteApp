async function collectAndExportData(data) {
    // accede a los contenedores de los divs que conteienen la informacion del cilindro
    let arrObj = []
    await data.forEach(element => {
        onlyDataCil = element.children[1];
        let obj = {};

        // obtiene y recorre todos los elementos inputs 
        let getInputs = Array.from(onlyDataCil.querySelectorAll("input"));
        getInputs.map(data=> obj[data.id]=data.value );
        arrObj.push(obj);
    });

    return arrObj;
}

module.exports = {
    collectAndExportData
}