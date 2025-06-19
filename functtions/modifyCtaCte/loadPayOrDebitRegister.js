const { corroborateAdmin } = require("./corroborateAdmin");
// evalua si es administrador
let sentence = corroborateAdmin();

async function loadPayOrDebitRegister(element, i , bgColor , appOrPrePend) {
    // crea el div que contiene la informacion
    let div         = document.createElement("div");
    div.className   = "inputHistoryContent";
    div.id          = (i+1)+"contInput";
    let obsContent = `<strong>${element["obs"]}</strong>`;
    // si es un remito de una ph cambia el formato
    if(element["obs"].slice(0,2) == "pH"){
        let onlyData = element["obs"].split(",");
        obsContent = `
        <div class="containerInfoPh">
            <div class="contentInfoPh">
                <p>${onlyData[1]}</p>
                <p>${onlyData[2]}</p>
                <p>${onlyData[3]}</p>
            </div>
        </div>
        `;
    }
    div.innerHTML   = `
    <strong>${element["date"]}</strong>
    ${obsContent}
    <strong>${element["debit"].toLocaleString()}</strong>
    <strong>${element["pay"].toLocaleString()}</strong>
    <strong>${element["total"].toLocaleString()}</strong>
    ${sentence==true? `<button class='modifyVoucher' id='${element["id"]}'></button>` : ""}
    `;

    div.style.backgroundColor= bgColor;

    appOrPrePend == "append" ? document.getElementById("historyOperations").append(div):
    document.getElementById("historyOperations").prepend(div);
    
}

module.exports = {
    loadPayOrDebitRegister
}