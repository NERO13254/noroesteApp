const {ipcRenderer}     = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const clickerCount      = require("../functtions/clickerCount");
const searchCil         = require("../functtions/hidraulicTest/searchCils");
const serialnumber      = document.getElementById("serialnumber");
const reportStatus      = require("../functtions/reportStatus");
const insertTdmInHtml   = require("../functtions/hidraulicTest/insertTdmInHtml");
const searchTdmLoaded   = require("../functtions/hidraulicTest/searchTdmLoaded");
const { adminInfo } = require("../adminInfo");
var userListContent     = document.getElementById("userListContent");
var searcherContentInfo = document.getElementById("searcherContentInfo");

async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        });
    })
}
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, data)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(data);
            }
        });
    })
}
let dataUser = localStorage.getItem("userAdmin").split(",");
if(adminInfo[0]!=dataUser[0] && adminInfo[1]!=dataUser[1]){
    serialnumber.style.display='none';
}


function searchCilinderContainer(e){
    let getValCil = e.target.value;
    if(getValCil.length>3){
        // busca los cilindros de toda la db
        searchCil.searchCilinder(getValCil);
    }else{
        // si es menor a 3 caracteres cierra la ventana
        searcherContentInfo.innerHTML="";
        searcherContainerResults.innerHTML="";
        searcherContainerResults.style.display="none";
    }
}
// boton para corregir numero de certificado y numero interno
serialnumber.addEventListener("click" , ()=>{
    ipcRenderer.send("modifyDataCilinderSaved");
    window.close();
});
// BUSCA LOS TDM
async function searchTdm(e){
    if(e.target.value.length > 2){
        // busca los tdm cargados en la lista previamente
        searchTdmLoaded.searchTdmLoaded(e.target.value);
    }else{
        searcherContentInfo.style.display = "none";
        searcherContentInfo.innerHTML ="";
    }
}
searcherContentInfo.addEventListener("click" , async(e)=>{
    let targetCont = e.target.className;
    if( e.target.getAttribute("type")=="checkbox"){
        let sliceTaget = targetCont.slice(1);
        localStorage.setItem( "idWorkShop" ,sliceTaget );
        // FUNCION QUE INCREMENTA EL CONTADOR DE CLICKS PARA POSICIONAR LOS TDM
        await clickerCount.clickerCount(sliceTaget , "tdm");
        ipcRenderer.send("seeSavedCilinders");
        window.close();
    }
});
window.onload= async()=>{
    const getAllTdm = await allAnswer("SELECT id , workshop , workshopcode FROM tdm WHERE 1 ORDER BY clickcount DESC, workshop ASC");
    // inserta los tdm en el html
    insertTdmInHtml.insertTdmInHtml(getAllTdm);
}
// cierra la ventana
document.getElementById("closeButton").addEventListener("click" , ()=>{
    window.close();
});

userListContent.addEventListener("click", async(e)=>{
    if(e.target.className.charAt(0)=="T" && e.target.getAttribute("type")== "checkbox"){
        idUserData  = e.target.className.slice(1);
        localStorage.setItem( "idWorkShop" ,idUserData);
        // FUNCION QUE INCREMENTA EL CONTADOR DE CLICKS PARA POSICIONAR LOS TDM
        await clickerCount.clickerCount(idUserData, "tdm");
        ipcRenderer.send("seeSavedCilinders");
        window.close();
    }
});