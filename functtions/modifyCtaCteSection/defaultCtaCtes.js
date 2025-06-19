const { answers } = require("./answers")

async function defaultCtaCtes(params) {

    // obtiene todas las cuentas corrientes y las imprime en la lista por defecto
    let allCtaCte = await answers.readallCtaCtes();
    let defaultResults = document.getElementById("defaultResults");

    for (let i = 0; i < allCtaCte.length; i++) {
        const element = allCtaCte[i];
        
        let div = document.createElement("div");
        div.className = "ctaCteContent";
        div.innerHTML = `
            <strong>${element["id"]}</strong>
            <strong>${element["name"]}</strong>
            <strong>${element["iva"] ? element["iva"] : "ne"}</strong>
            <strong>${element["cuit"] ? element["cuit"] : "ne"}</strong>
            <input type='checkbox'>
        `;
        defaultResults.append(div);
    }
}

module.exports = {
    defaultCtaCtes
}