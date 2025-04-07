const { addRegisterHtml } = require("../functtions/dayliPayOrDebit/addRegisterHtml");
const { answersContent } = require("../functtions/dayliPayOrDebit/answers");
const { createEelement } = require("../functtions/dayliPayOrDebit/createElement");
const { deleteRegister } = require("../functtions/dayliPayOrDebit/deleteRegister");
const { loadDataSelected } = require("../functtions/dayliPayOrDebit/loadDataSelected");
const { searchResults } = require("../functtions/dayliPayOrDebit/searchResults");
const { searchResultsForDate } = require("../functtions/dayliPayOrDebit/searchResultsForDate");

window.onload = async()=>{
    // obtiene la fecha del día de hoy
    let getDate = new Date();
    let dateNow = `${getDate.getDate()}/${getDate.getMonth()+1}/${getDate.getFullYear()}`;
    // inserta la fecha de hoy en el HTML
    let generalDate = document.querySelectorAll(".dateContnet input");
    generalDate[0].value=getDate.getDate();
    generalDate[1].value=getDate.getMonth()+1;
    generalDate[2].value=getDate.getFullYear();
    // carga los datos por defecto del día de hoy
    await loadDataSelected(dateNow);
    // al presionar el boton "+" añade un registro a la lista
    document.querySelector(".listController").addEventListener("click" , async(e)=>{
        await addRegisterHtml(e,generalDate);
    });
    // al presionar modificar o eliminar un  registro
    document.getElementById("defaultResults").addEventListener("click", async(e)=>{
        if(e.target.tagName=="BUTTON"){
            await deleteRegister(e);
        }
    });
    // al buscar registros por fecha
    document.getElementById("searchDate").addEventListener("click" , async()=>{
        searchResultsForDate(generalDate);
    });
    // al buscar un registro mediante el buscador de resultados
    document.getElementById("searchPayOrDebit").addEventListener("keyup" ,(e)=>{
        searchResults(e);
    });
    // al presionar ver todo , trae todos los resultados hasta la fecha
    document.getElementById("seeAll").addEventListener("click" , async()=>{
        // obtiene todos los pagos y egresos 
        let getAllPay       = await answersContent.collectAllPay();
        let getAllEgress    = await answersContent.collectAllEgress();
        if(getAllPay.length>0){
            document.getElementById("payDefault").innerHTML='';
            getAllPay.forEach(element => {
                createEelement(element , document.getElementById("payDefault") , "all");
            });
        }
        if(getAllEgress.length>0){
            document.getElementById("egressDefault").innerHTML='';
            getAllEgress.forEach(element => {
                createEelement(element , document.getElementById("egressDefault") , "all");
            });
        }
    });
}