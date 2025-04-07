const dbRed         = require("../db/dbRed");
const db            = dbRed.getDb(__dirname);
const {ipcRenderer} = require("electron");
const succesAlert   = require("../functtions/succesAlert");
var saveTdm         = document.getElementById("saveTdm");
var getIdTdm        = localStorage.getItem("idTdm");
let getAllInputs    = document.querySelectorAll(".inputContentData");
let backBtn         = require("../functtions/backBtn");
const reportStatus  = require("../functtions/reportStatus");
let deleteTdm       = document.getElementById("deleteTdm");
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){console.log(err.message);}else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer) {
    return new Promise((resolve, reject) => {
        db.run(answer , err=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        });
    })
}
// funcion vovler
backBtn.backBtn(document.getElementById("backBtnContent"),"seeTdmSaved");

function finishProcess(){
    ipcRenderer.send("quitModifyTdm");
    window.close();
}
// al cargar la ventana selecciona los datos del tdm y los inserta en los inputs
window.onload = async()=>{
    let getDataTdm = await allAnswer(`SELECT * FROM TDM WHERE id = '${getIdTdm}'`);
    getAllInputs.forEach(element => {
        element.value = getDataTdm[0][element.id];
    });
}
// guarda los cambios en los inputs 
saveTdm.addEventListener("click" , async()=>{
    let dataContent = "";
    getAllInputs.forEach(element => {
        dataContent += `${element.id}='${element.value}',`;
    });
    await runAnswer(`UPDATE tdm SET ${dataContent.slice(0,-1)} WHERE id='${getIdTdm}'`);
    succesAlert.succesAlert("Exito", "Los cambios se efectuaron correctamente",1 ,["cancelProcess"] , ["Aceptar"] , document.getElementById("alertContainer"));
});
deleteTdm.addEventListener("click" , ()=>{
    reportStatus.reportStatus("Alerta" , "Aviso de Preservación de datos" ,"Estas por eliminar el TDM (taller de montaje) , si procede se eliminarán sus datos" , 2 , ["Cancelar" , "Eliminar"],["canelProcess" ,"deleteTdmConfirm"] , document.getElementById("alertContainer"));

    document.getElementById("deleteTdmConfirm").addEventListener("click" , async()=>{
        await runAnswer(`DELETE FROM tdm WHERE id='${getIdTdm}'`);
        ipcRenderer.send("seeTdmSaved");
        window.close();
    });

});