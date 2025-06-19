const {ipcRenderer}     = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const searchCil         = require("../functtions/hidraulicTest/searchCils");
const {insertTdmInHtml}   = require("../functtions/hidraulicTest/insertTdmInHtml");
const searchTdmLoaded   = require("../functtions/hidraulicTest/searchTdmLoaded");
const {backBtn} = require("../functtions/backBtn");
const { startSearchTdm } = require("../functtions/hidraulicTest/startSearchTdm");
const { startSearchCilinder } = require("../functtions/hidraulicTest/startSearchCilinder");
const { selectTdm } = require("../functtions/hidraulicTest/selectTdm");
var userListContent     = document.getElementById("userListContent");

window.onload= async()=>{
    backBtn(document.getElementById("backBtn"))

    // inserta los tdm en el html
    await insertTdmInHtml();

    // al buscar un TDM
    document.getElementById("searcherInput").addEventListener("keyup" , (e)=>{
        startSearchTdm(e.target);
    });

    // busca un cilindro
    document.getElementById("startSearchCilinder").addEventListener("click" , async(e)=>{
       await startSearchCilinder();
    });
    // al borrar el numero de cilindro del buscador oculta los resultados de busqueda
    document.getElementById("inputSerialCilinder").addEventListener("keyup" , (e)=>{
        if(e.key=="Backspace"){
            document.getElementById("searcherContainerResults").style.display="none";
        }
    })

    // al seleccionar un tdm
    document.getElementById("allTdmContent").addEventListener("click" , async(e)=>{
        await selectTdm(e);
        ipcRenderer.send("seeSavedCilinders");
        window.close();
    }); 
}