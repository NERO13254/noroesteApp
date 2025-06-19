const { answers } = require("./answers");

async function insertNameCtaCte() {
    let idWorkShop      = localStorage.getItem("idCtaCte");
    let nameVoucherCte  = document.getElementById("nameCtaCteSelected");
    
    // inserta el nombre de la cta cte en el html
    if(!localStorage.getItem("finalConsumer")){
    const getName               = await answers.readNameCtaCte(idWorkShop);
    nameVoucherCte.textContent  = getName[0]["name"];
    }else{
        nameVoucherCte.textContent  = "CONSUMIDOR FINAL"; 
    }
}

module.exports = {
    insertNameCtaCte
}