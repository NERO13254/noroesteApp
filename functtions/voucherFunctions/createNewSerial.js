const { answers } = require("./answers");

async function createNewSerial() {
    let listSerial = document.getElementById("listSerial");

    let serial = document.getElementById("serialData").value;
    let insideId = document.getElementById("insideid").textContent;

    // crea la serie
    await answers.createSerial(insideId , serial);

    // Añade la nueva serie a la lista de series
    let div = document.createElement("div");
    div.className = 'serialContent';
    div.innerHTML = `
    <strong>${serial}</strong>
    <input type="checkbox">
    `;
    listSerial.prepend(div);
    
    document.querySelector(".addSerialController").classList.toggle("show");
    document.getElementById("serialData").value='';
}

module.exports = {
    createNewSerial
}