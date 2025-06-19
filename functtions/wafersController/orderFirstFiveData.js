async function orderFirstFiveData(obj) {
    // si encuentra el contenedor del os primeros 5 valores lo agrega
    return `${obj["pec"]};${obj["workshopCuit"]};${obj["id"]};${obj["workshopcodeWafer"]};${obj["domain"]};${obj["typeVehicle"]};`;
}

module.exports = {
    orderFirstFiveData
}