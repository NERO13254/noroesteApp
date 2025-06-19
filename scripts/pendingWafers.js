const getDb     = require("../db/dbRed");
const db        = getDb.getDb(__dirname);
const backBtn   = require("../functtions/backBtn");
const { addNewWafer } = require("../functtions/pendingWafers/addNewWafer");
const { pendingLastestDayWafers, allWafers } = require("../functtions/pendingWafers/answers");
const { deleteWafer } = require("../functtions/pendingWafers/deleteWafer");
const { insertWaferInHtml } = require("../functtions/pendingWafers/insertWaferInHtml");
const { loadDayliWafers } = require("../functtions/pendingWafers/loadDayliWafers");
const { loadPendingWafersForLastestDays } = require("../functtions/pendingWafers/loadPendingWafersForLastestDays");
const { modifyWafer } = require("../functtions/pendingWafers/modifyWafer");
const { searchWaferForDomain } = require("../functtions/pendingWafers/searchWaferForDomain");

const dateInput = document.getElementById("dateInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");

window.onload = async()=>{
    // boton para volver atras
    backBtn.backBtn(document.getElementById("backElement"));
    // inserta la fecha del día de hoy
    let date = new Date();
    let dateNow =  `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    dateInput.value=date.getDate();
    monthInput.value=date.getMonth()+1;
    yearInput.value=date.getFullYear();
    // carga las obleas del día de hoy
    await loadDayliWafers(dateNow);

    // al presinar "buscar" sobre la fecha trae las obleas de la fecha ingresada 
    document.getElementById("startSearch").addEventListener("click" , async()=>{
        // evalua que las fechas sean correctas
        let getInputs = document.querySelectorAll(".dateContent input");
        document.getElementById("errorDateContent").innerHTML="";
        let evaluateError = true;
        getInputs.forEach(element=>{
            if(element.value.length<=0 || !parseInt(element.value)){
                let strong = document.createElement("strong");
                strong.innerHTML = `El campo ${element.name} es incorrecto`;
                document.getElementById("errorDateContent").append(strong);
                evaluateError = false;
            }
        });
        // si no tiene errores 
        if(evaluateError){
            await loadDayliWafers(`${dateInput.value}/${monthInput.value}/${yearInput.value}`);
        }
    });

    // al presionar "+" para agregar una nueva oblea a la tabla
    document.getElementById("addRowToListWafer").addEventListener("click" , async()=>{
        // añade la oblea
       await addNewWafer(dateNow);
    });
    // al presionar el boton "guardar" de la oblea
    document.getElementsByClassName("listWaferContent")[0].addEventListener("click" , async(e)=>{
        // corrobora que se haya presionado el boton correctamente
        if(e.target.tagName=="BUTTON" && e.target.id=="modifyRowWafer"){
            // modifica la oblea seleccionada
            await modifyWafer(e.target.parentNode);
        }
    });
    // al presionar el boton  de "eliminar" de la oblea
    document.getElementsByClassName("listWaferContent")[0].addEventListener("click" , async(e)=>{
        if(e.target.tagName=="BUTTON" && e.target.id=="deleteRowWafer"){
            // elimina  la oblea seleccionada
            await deleteWafer(e.target.name, e.target.parentNode);
        }
    });
    // al presinar "buscar" en domionio 
    let resultsOfSearch = document.getElementById("resultsOfSearch");
    document.getElementById("searchContent").addEventListener("keyup" , (e)=>{
        let userData = e.target.value.trim().toUpperCase();
        // si se presionaron mas de 2 teclas se procede a buscar el dominio
        if(userData.length>=2){
            resultsOfSearch.classList.add("show");
            searchWaferForDomain(userData);
        }else{
            resultsOfSearch.classList.remove("show");
        }
    });
    let pendingWafersOfTheLastestDays = await pendingLastestDayWafers();
    // inserta el numero de obleas pendientes en el html
    document.getElementById("meterOfPendingWafers").textContent = pendingWafersOfTheLastestDays.length;

    // al presionar "pendientes" carga todas las obleas pendientes
    document.getElementsByClassName("meterOfPendingWafersContent")[0].addEventListener("click"  , async()=>{
        await loadPendingWafersForLastestDays(pendingWafersOfTheLastestDays);
    });
    // al presionar "ver todo"
    document.getElementsByClassName("seeAllWaferFromTo")[0].addEventListener("click" , async()=>{
        let collectAllWafers = await allWafers();
        document.getElementById("listWafer").innerHTML="";
        for (let i = 0; i < collectAllWafers.length; i++) {
            const element = collectAllWafers[i];
            insertWaferInHtml(element , "all");
        }
    });
}