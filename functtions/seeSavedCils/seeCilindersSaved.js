const { answers } = require("./answers");
const { printCilindersInHtml } = require("./printCilindersInHtml");

async function seeCilindersSaved(){
    // obtiene los ultimos 300 cilindros del TDM
    const getAllCilinders   = await answers.readLastThreeHundredCilinders(localStorage.getItem("idWorkShop"));
    document.getElementById("cilinderListContent").innerHTML = "";
    // limpia e inserta todos los resultados de la consulta en el HTML
    for (let i = 0; i < getAllCilinders.length; i++) {
        printCilindersInHtml(getAllCilinders[i] , i , document.getElementById("cilinderListContent"));
    }
}

module.exports = {
    seeCilindersSaved
}