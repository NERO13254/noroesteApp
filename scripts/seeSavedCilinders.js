const {ipcRenderer}             = require("electron");
const openOptionCompromiss      = require("../functtions/seeSavedCils/openOCompromis");
const reportStatus              = require("../functtions/reportStatus");
const backBtn                   = require("../functtions/backBtn.js");
const {seeCilindersSaved}       = require("../functtions/seeSavedCils/seeCilindersSaved");
const { loadCodeTdm } = require("../functtions/seeSavedCils/loadCodeTdm.js");
const { loadCilinderSection } = require("../functtions/seeSavedCils/loadCilinderSection.js");
const { loadWaferSection } = require("../functtions/seeSavedCils/loadWaferSection.js");
const { selectData } = require("../functtions/seeSavedCils/selectData.js");
const { openData } = require("../functtions/seeSavedCils/openData.js");
const { newCilinder } = require("../functtions/seeSavedCils/newCilinder.js");
const { newWafer } = require("../functtions/seeSavedCils/newWafer.js");
const { startSearch } = require("../functtions/seeSavedCils/startSearch.js");



// CORROBORA QUE HAYA UN DATO EN EL LOCALSTORAGE PARA IR A IMPRIMIR CEVIGAS O HOJA DE RUTA
function checkLocalStorageData(data , ipcRendererSend ){
    if(localStorage.getItem(data)){
        ipcRenderer.send(ipcRendererSend);
    }else{
        alert("SELECCIONE UN REGISTRO");
    }
}
function goToPrint(button , goingTo){
    button.addEventListener("click" , ()=>{
        ipcRenderer.send(`${goingTo}`);
        window.close();
    });
}

window.onload = async()=>{
    backBtn.backBtn(document.getElementById("backBtn") , "quitPrint");

    // busca el cilindro o oblea 
    document.getElementById("startSearchCil").addEventListener("keyup" , async(e)=>{
        await startSearch(e);
    });

    // carga el codigo del TDM en HTML
    await loadCodeTdm();

    // obtiene los ultimos  300 cilindros del tdm seleccionado y los imprime en HTML
    await seeCilindersSaved();

    // si se recibe el renderer  , recarga la lista de precios
    ipcRenderer.on("reloadCilinderList" , async()=>{
        await seeCilindersSaved();
    });

    // al presionar en el boton de "cilindros" carga los primeros 300 cilindros y los muestra
    document.getElementById("seeCilinders").addEventListener("click" , async(e)=>{
        loadCilinderSection(e);
        await seeCilindersSaved();
    });

    // al presionar el boton de "obleas" carga las obleas pasadas por el TDM
    document.getElementById("seeWafers").addEventListener("click" , (e)=>{
        loadWaferSection(e);
    });

    // al seleccionar un elemento de la lista
    document.getElementById("containerAllResults").addEventListener("click" , async(e)=>{
        await selectData(e);
    });

    // al hacer doble click sobre algún elemento de la lista 
    document.getElementById("containerAllResults").addEventListener("dblclick" , async(e)=>{
       await openData(e);
       window.close();
    });

    // al hacer click sobre el boton HOJA DE COMPROMISO
    document.getElementById("openOptionCompromisSheet").addEventListener("click" , ()=>{
        openOptionCompromiss.openOptionCompromisSheet();
    });
    // imprime el cevigas
    document.getElementById("printCevigas").addEventListener("click", ()=>{
        checkLocalStorageData("idCilinderSaved", "printCevigas");
        window.close();
    });

    // imprime la hoja de ruta
    document.getElementById("roadMap").addEventListener("click" , ()=>{
        checkLocalStorageData("idCilinderSaved", "printRoadMap");
        window.close();
    });

    // imprime la hoja de compromiso
    document.getElementById("commitmentSheet").addEventListener("click" , ()=>{
        if(localStorage.getItem("idCilinderSaved")){
            goToPrint(commitmentSheet , "printCommitmentSheet");
        }else{
            reportStatus.reportStatus("Error" , "No se seleccionó ningún cilindro" , "Asegurese de seleccionar un cilindro para ver su ficha tecnica" , 1 , ["Aceptar"], ["canelProcess"] ,alertContent)
        }
    });

    // al presioanr "nuevo" en cilindros
    document.getElementById("newCil").addEventListener("click" , async()=>{
        await newCilinder();
        window.close();
    });
    
    // al presionar "nuevo" en obleas
    document.getElementById("newOblea").addEventListener("click" , ()=>{
        newWafer();
    });
}