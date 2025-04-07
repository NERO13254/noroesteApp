const {ipcRenderer}       = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const voucherContainer  = document.getElementById("voucherContainer");
const backBtn           = require("../functtions/backBtn");
const startSearchVoucher= document.getElementById("startSearchVoucher");
const getSearchInput    = document.getElementById("searchVoucherInput");
const reportStatus      = require("../functtions/reportStatus");

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer, (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}
startSearchVoucher.addEventListener("click" , async()=>{
    let getVoucher = await allAnswer(`SELECT id, owner FROM remitos WHERE insideid ='${getSearchInput.value}'`);
    if(getVoucher.length>0){
        localStorage.setItem("insideidSavedVoucher" , `${getVoucher[0]["id"]}, ${getVoucher[0]["owner"]}`);
        ipcRenderer.send("printVoucher");
        window.close();
    }else{
        reportStatus.reportStatus("Error" , "No se encontraron Resultados" , "No hubieron coincidencias con el numero de remito que se buscó y los registros almacenados , corrobore que el numero de remito que ingresó sea correcto" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("repoartStatus"));
    }
});

window.onload = async()=>{
    backBtn.backBtn(document.getElementById("backElementContent"));
}