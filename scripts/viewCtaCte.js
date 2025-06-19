const {ipcRenderer}         = require("electron");
const reloadList            = require("../functtions/viewCtaCte/reloadList");
const {backBtn}             = require("../functtions/backBtn");
const { desplegateCtaCte } = require("../functtions/viewCtaCte/desplegateCtaCte");
const { startSearch } = require("../functtions/viewCtaCte/startSearch");

window.onload = async()=>{
    // bototn para vovler atras
    backBtn(document.getElementById("backBtn") );

    // ESTA FUNCION RECARGA LA LISTA DE CTACTES
    reloadList.reloadList();

    // al seleccionar una cuenta corriente
    document.getElementById("allCtaCteContent").addEventListener("click" , async(e)=>{
        e.target.tagName=="INPUT" ? await desplegateCtaCte(e) : "";

        ipcRenderer.send("modifyCtaCte");
        window.close();
    })

    // al bsucar una cta cte
    document.getElementById("searchInput").addEventListener("keyup" , async(e)=>{
        await startSearch(e.target);
    })
}