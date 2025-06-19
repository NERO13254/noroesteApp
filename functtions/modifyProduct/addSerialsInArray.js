const { getSerialsOfProduct, answers } = require("./answers");

async function addSerialsInArray(serialsArray) {
    // obtiene el nombre y el codigo del producto seleccionado
    let getName =  document.getElementById("name").value.trim().toUpperCase();
    let getCode = document.getElementById("insideid").value.trim().toUpperCase();
    // obtiene las series deel producto de db
    let getSerialsFromDb = await answers.readSerialsProduct(getName , getCode);
    
    // recorre las series y las añade al array de series
    getSerialsFromDb.forEach(element => {
        serialsArray.push(element["serial"]);
    });
    
}

module.exports = {
    addSerialsInArray
}