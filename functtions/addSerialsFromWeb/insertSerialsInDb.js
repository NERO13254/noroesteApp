
const { answers } = require("./answers");

async function insertSerialsInDb(response , nameSelected , div) {
    // recorre los resultados e inserta las series coincidientes
    try {
        await answers.begginSentence();
        for (const element of response) {
            if(element["name"]== nameSelected){
                await answers.CreateSerial(element["name"],element["serial"]);
                dataRemoved.push({"name":element["name"],"serial":element["serial"]});
            }
        }
        await answers.commitSentence();

    } catch (error) {
        console.log(error)
    }

    // pinta de color verde el contenedor general ejecutado y cambia el texto del boton
    div.parentNode.classList.toggle("succesStatus");
    div.textContent = "Cargar otra vez";
}

module.exports = {
    insertSerialsInDb
}