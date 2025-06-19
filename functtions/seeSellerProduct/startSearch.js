const { answerResponse } = require("./answerResponse");
const { voucherData } = require("./answers");
const { printResultsInHtml } = require("./printResultsInHtml");

async function startSearch() {
    // obtiene el parametro de busqueda
    let optionSelected  = document.getElementById("searchFor").value.trim();

    alertContainer.innerHTML="";
    // obtiene la información del remito de la db
    let getProductDataDb= await voucherData(optionSelected , document.getElementById("searchProduct").value );

    document.getElementById("listContent").innerHTML="";
    // SI NO ENCUENTRA VALORES
    if(getProductDataDb.length == 0 ){
        // imprime  el estado de los resultados de la consulta
        answerResponse(getProductDataDb);
    }
    else{
        // imprime  el estado de los resultados de la consulta
        answerResponse(getProductDataDb);
        // imprime los resultados en el HTML
        await printResultsInHtml(getProductDataDb);
    }
      
}


module.exports = {
    startSearch
}