const { ipcRenderer }   = require("electron");
const getDb                     = require("../db/dbRed");
const db                        = getDb.getDb(__dirname);
const searchTotalPayOrDebit     = require("../functtions/payCilinder/searchTotalPayOrDebit");
const getOrderNumPayoOrDebit    = require("../functtions/payCilinder/getOrderNumPayoOrDebit");
const getWorkShopName           = require("../functtions/payCilinder/getWorkShopName");
const saveCil                   = require("../functtions/payCilinder/saveCil");
const payWafer                  = require("../functtions/payCilinder/payWafer");
const payProcessWafer           = require("../functtions/payCilinder/payProcessWafer");
const searchCtaCte              = require("../functtions/payCilinder/searchCtaCte");
const chargeCtaCteDefault       = require("../functtions/payCilinder/chargeCtaCteDefault");
let listCtaCte                  = document.getElementById("listCtaCte");
var listAllClients              = document.getElementById("listAllClients");
let searchContentResults        = document.getElementById("searchContentResults");
let searchResultsContainer      = document.getElementById("searchResults");
var completeDate = new Date();
var compDate = `${completeDate.getDate()}/${completeDate.getMonth()+1}/${completeDate.getFullYear()}`;       
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        })
    })
}
// buscador lanzado por el evento onkeyup() del input searchClient del html
async function searchClients(e){
    if(e.target.value.length>2){
        searchResultsContainer.style.display="block";
        searchContentResults.innerHTML="";
        searchResultsContainer.innerHTML="";
        searchCtaCte.searchCtaCte(e.target.value.toLocaleLowerCase());
    }else{
        searchResultsContainer.style.display="none";
    }
}
// se cargan todos los clientes con sus nombres y valores de ph 
window.onload = async()=>{
    chargeCtaCteDefault.chargeCtaCteDefault();
}

async function debitCililnder(e) {

    if(e.target.getAttribute("type")=="checkbox" && e.target.parentNode.className == "containerClients"){
        if(localStorage.getItem("exportWaferToEnergas")){
            // cobra la oblea al cliente
            payWafer.payWafer(e); 
        }else{
            // cobra el cilindro 
            await saveCil.saveCil(e , "B");
            if(localStorage.getItem("idCilinderSaved")){
                ipcRenderer.send("pirintCompromisShet");
            }
            window.close();
        }
    }
}

// cobra el cilindro 
listCtaCte.addEventListener("dblclick" , async (e)=>{
    // corrobora que se haya seleccionado correctamente una cta cte
    if(e.target.getAttribute("type")=='checkbox' && e.target.tagName=='INPUT' && e.target.parentNode.children[0].textContent!='Nombre'){
        await debitCililnder(e);
    }
    
});
// cobra el cilindro en el buscador de resultados
searchResultsContainer.addEventListener("dblclick" , async(e)=>{
    if(e.target.getAttribute("type")=='checkbox' && e.target.tagName=='INPUT' && e.target.parentNode.children[0].textContent!='Nombre'){
        await debitCililnder(e);
    }
});