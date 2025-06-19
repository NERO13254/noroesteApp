const {ipcRenderer}         = require("electron");
const getDb             = require("../db/dbRed");
const db                = getDb.getDb(__dirname);

const loadStorageData       = require("../functtions/pintVocher/loadStorageData");
const loadNewVoucher        = require("../functtions/pintVocher/loadNewVoucher");
var finvalNotPercent        = localStorage.getItem("finvalNotPercent");
var idCtaCte                = localStorage.getItem("idCtaCte");
var productContent          = document.getElementById("productContent");
var idvoucher               = document.getElementById("idvoucher");
var hoursAndMinutes         = document.getElementById("hoursAndMinutes");
var fullData                = document.getElementById("fullData");
var totalContent            = document.getElementById("totalContent");
var discountContent         = document.getElementById("discountContent");
var num                     = 0 ;
var finalNotPercent         = document.getElementById("finalNotPercent");

if (localStorage.getItem("insideidSavedVoucher")) {
    // si existe en storage el numero de voucher guardado
    loadStorageData.loadStorageData();
}else{
    // carga un remito nuevo
    loadNewVoucher.loadNewVoucher();
}
// imprime la ventana
function printedFun(){
    ipcRenderer.send("restoreWindow" , "modifyCtaCte");
    window.print();
    window.close();
}

window.addEventListener("beforeunload" , ()=>{
    localStorage.removeItem("finalConsumer");
    localStorage.removeItem("insideidSavedVoucher");
    ipcRenderer.send("restoreWindow" , "modifyCtaCte");
})