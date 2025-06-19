const {ipcRenderer} = require("electron");
let backBtn     = require("../functtions/backBtn");
const { createTdm } = require("../functtions/newTdm/createTdm");

// boton volver
backBtn.backBtn(document.getElementById("backBtn") , "seeTdmSaved");

// al presionar crear
document.getElementById("saveClient").addEventListener("click" , async()=>{
    //se inserta el tdm en db
    await createTdm();
   // window.close();
});