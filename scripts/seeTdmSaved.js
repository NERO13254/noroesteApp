const {ipcRenderer} = require("electron");
const dbRed         = require("../db/dbRed");
const db            = dbRed.getDb(__dirname);
const guide         = require("../functtions/guide");
const backBtn       = require("../functtions/backBtn");
const { modifyTdm } = require("../functtions/tdmSaved/modifyTdm");
const { chargeTdm } = require("../functtions/tdmSaved/chargeTdm");
const { searchTdm } = require("../functtions/tdmSaved/searchTdm");
const { changeTdmData } = require("../functtions/tdmSaved/changeTdmData");
let guideContent    = document.getElementById("guideContent");
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){
                console.log(err.message);
                console.log(row);
            }else{
                resolve(row);
            }
        })
    })
}



document.getElementById("bodyContent").addEventListener("click", (e)=>{
    // envía los datos de la cuenta seleccionada y abre la ventana para modificarla
    modifyTdm(e);
    window.close();
});

//SE INSERTA LA GUIA PARA LOS RESULTADOS
let guideValues = [{name:"Id"},{name:"Tdm"},{name:"Cod Pec"}, {name:"PEC"}, {name:"Cuit"},{name:"R.social"},{name:"LOCALIDAD"}]
guide.printGuide(guideValues , guideContent);

// boton  de nuevo tdm
let addButton = document.createElement("button");
addButton.id  = "newTdm";
addButton.textContent = "Nuevo";
guideContent.append(addButton)
// al presionar nuevo tdm  envia a nuevo tdm y cierra la ventana
guideContent.addEventListener("click" , ()=>{
    ipcRenderer.send("newTdm");
    window.close();
});

window.onload= async()=>{
   // await changeTdmData();

    
    // boton para volver atras
    backBtn.backBtn(document.getElementById("backBtnContent"));
    // imprime los TDM en el html
    await chargeTdm();
}
// se busca el tdm por nombre y las coincidencias las imprime en el html
async function startSearch(e){
   await searchTdm(e);
}