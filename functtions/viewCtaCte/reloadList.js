const { answers } = require("./answers");
const {adminInfo}           = require("../../adminInfo");
const { loadFinalClient } = require("./loadFinalClient");

async function reloadList(){

    const adminSplit = localStorage.getItem("userAdmin").split(",");
    // evalua si es admin o no
    let adminCorroborate = (adminSplit[0] ==  adminInfo[0] && adminSplit[1] == adminInfo[1]) ? true : false
    
    // obtiene todas las cuentas corrientes
    const ctaCtes = await answers.readCtaCtes();
    for (let i = 0; i < ctaCtes.length; i++) {
        const rowContent = ctaCtes[i];

        // inserta el valor total
        let totalCtaCte     = await answers.readTotal(rowContent["id"]);
        totalCtaCte = totalCtaCte.length>0 ? totalCtaCte[0]["total"] : 0
        conentTotal     =  "$"+parseInt(totalCtaCte).toLocaleString();
        
        let div = document.createElement("div");
        div.className       = "optionContent";
        div.innerHTML = ` 
            <strong>${rowContent["id"]}</strong>
            <strong>${rowContent["name"]}</strong>
            <strong>${conentTotal}</strong>
            <input type="checkbox" id="${rowContent["id"]}">
        `;
        listCtaCte.append(div);

        // pinta los elementos pares de otro color
        i%2 == 0 ? div.style.background="rgb(247 ,247 ,247)" : "";
    }
    // carga el consumidor final
    await loadFinalClient();
}

module.exports = {
    reloadList
}