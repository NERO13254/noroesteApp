const dbRed                 = require("../db/dbRed");
const db                    = dbRed.getDb(__dirname);
const geGuide               = require("../functtions/guide");
const searchContent         = document.getElementById("searchProduct");
const alertContainer        = document.getElementById("alertContainer");
const listGuide             = document.getElementById("listGuide");
const searcherContainer     = document.getElementById("searcherContainer");
const searchContainerResults= document.getElementById("searchContainerResults");
const searchProdInList      = require("../functtions/seeSellerProduct/searchProdInList");
const reportStatus          = require("../functtions/reportStatus");
const { answerResponse } = require("../functtions/seeSellerProduct/answerResponse");
const { voucherData } = require("../functtions/seeSellerProduct/answers");
const { printResultsInHtml } = require("../functtions/seeSellerProduct/printResultsInHtml");

let printNameGuides = [{name:"NUM. REMIT."},{name:"COD. INT."}, {name:"VALOR"} ,{name:"CANTIDAD"}, {name:"NUM. SERIE"}];
geGuide.printGuide(printNameGuides , listGuide);
// Busca el producto ingresado en el input en db 
async function startSearch(){
    let searchFor       = document.getElementById("searchFor").value.trim();
    let optionSelected  = searchFor == "insideid" ? "insideid" : "serialnumber";

    if(searchContent.value.length <=1 ){
        reportStatus.reportStatus("Error" , "VALOR INVALIDO" , "El valor ingresado es invalido , corrobore el valor ingresado" , 1 , ['Aceptar'] , ['canelProcess'], alertContainer );
    }else{
        let searchContainerInput = `
        <input type="text" placeholder="Buscar caracteristica . . ." id="searchInput">
        <button id="startSerchProduct">BUSCAR EN LISTA</button>
        <div id="searchResults"></div>
        `;
        searcherContainer.innerHTML = searchContainerInput;
        document.getElementById("searchResults").style.display="none";
        alertContainer.innerHTML="";
        // obtiene la información del remito de la db
        let getProductDataDb= await voucherData(optionSelected , searchContent.value );
 
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
            // implementa el buscador de productos encontrados
            document.getElementById("startSerchProduct").addEventListener("click" , ()=>{
                searchProdInList.searchProdInList();
            });
        }
    }
}
//VUELVE AL INCIO
document.getElementById("quitSellerProds").addEventListener("click" , ()=>{
    window.close();
});