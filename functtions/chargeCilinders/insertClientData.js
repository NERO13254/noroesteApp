async function insertClientData(row) {
    // recorre todos los campos y los autocompleta
    getData.forEach(element=>{
        element.value = (row[0][element.name] != null || row[0][element.name]!= undefined ) ? row[0][element.name] : "";
    })
}

module.exports = {
    insertClientData
}