const {ipcRenderer}         = require("electron");
const dbRed                 = require("../db/dbRed");
const db                    = dbRed.getDb(__dirname);
const runAlert              = require("../functtions/alertFun");
const reportStatus          = require("../functtions/reportStatus");
const calcTotal             = require("../functtions/modifyCtaCte/calcTotalFun");
const { reloadHystoryList } = require("../functtions/modifyCtaCte/reloadHistoryList");
const desplegateAddPay      = require("../functtions/modifyCtaCte/openPayController");
const searchVoucherFun      = require("../functtions/modifyCtaCte/searchVoucher");
const {adminInfo}           = require("../adminInfo");
const loadDataClient        = require("../functtions/modifyCtaCte/loadDataClient");
const backBtn               = require("../functtions/backBtn");
const savePay               = require("../functtions/modifyCtaCte/savePay");
const desplegateSettingsMenuVoucherSeleected = require("../functtions/modifyCtaCte/desplegateSettingsMenuVoucherSeleected");
const desplegateListCtaCtes = require("../functtions/modifyCtaCte/desplegateListCtaCtes");
const replaceNameCtaCte     = require("../functtions/modifyCtaCte/replaceNameCtaCte");
const searchCtaCteInList    = require("../functtions/modifyCtaCte/searchCtaCteInList");
const corroborateVoucherDataPh=require("../functtions/modifyCtaCte/corroborateVoucherDataPh");
const reloadTotalValue      = require("../functtions/modifyCtaCte/reloadTotalValue");
const refreshHistoryVucherList = require("../functtions/modifyCtaCte/refreshHistoryVucherList");
const corroborateValueModified= require("../functtions/modifyCtaCte/corroborateValueModified");
const updateVoucherModule   = require("../functtions/modifyCtaCte/updateVoucherModule");
const updateVoucherForOtherClient = require("../functtions/modifyCtaCte/updateVoucherForOtherClient");
const addPayController      = require("../functtions/modifyCtaCte/addPayController");
const settingsForVoucher    = require("../functtions/modifyCtaCte/settingsForVoucher");
const modifyValuesOfCtaCte  = require("../functtions/modifyCtaCte/modifyValuesOfCtaCte");
var idCtaCte                = localStorage.getItem("idCtaCte");
const { modifyVoucherSaved } = require("../functtions/modifyCtaCte/modifyVoucherSaved");
const { saveCtaCteSettings } = require("../functtions/modifyCtaCte/saveCtaCteSettings");
const { addProduct } = require("../functtions/modifyCtaCte/addProduct");
const { calculateNewTotalValue } = require("../functtions/modifyCtaCte/calculateNewTotalValue");
const { addSerialToHtml } = require("../functtions/modifyCtaCte/addSerialToHtml");
const { saveVoucherModified } = require("../functtions/modifyCtaCte/saveVoucherModified");
const { updateAllFinalValues } = require("../functtions/modifyCtaCte/updateAllFinalValues");


var nameCtaCte          = document.getElementById("name");
var phValue             = document.getElementById("phValue");
var saveChanges         = document.getElementById("saveChanges");
var addPay              = document.getElementById("addPay");
var alertBox            = document.getElementById("alertBox");
var totalVal            = document.getElementById("totalVal");
var totalContainer      = document.getElementById("totalContainer");
var historyOperations   = document.getElementById("historyOperations");
var printOperations     = document.getElementById("printOperations");
var newVoucher          = document.getElementById("newVoucher");
var searchVoucher       = document.getElementById("searchVoucher");
var voucherNumSearched  = document.getElementById("voucherNumSearched");
var alertContnet        = document.getElementById("alertContnet");
let allResults          = document.getElementById("allResults");
let cancelSettingsVoucher=document.getElementById("cancelSettingsVoucher");
let searchCtaCte        = document.getElementById("searchCtaCte");
let typeVoucher         = document.getElementById("typeVoucher");
let saveChangesInVoucher= document.getElementById("saveChangesInVoucher");
let idNewOwner          = document.getElementById("idNewOwner");
let closeModifyValues   = document.getElementById("closeModifyValues");
const saveChangesModifyValues=document.getElementById("saveChangesModifyValues");
const modifyVoucher     = document.getElementById("modifyVoucher"); 
var getTarget = "";
var voucherNumber = "";
var getOldValueContainer = 0;
var getNewValue = 0;
var enterKeyPress= false
var getInputValueContent = 0;
var finishSentence = true;
var contentDivSelected = "";
var divContent = "";
// variable global que evalua si se quiere imprimir el historial de la ctacte 
var hystoryCtaCte = false;
// OBTIENE LA FECHA ACTUAL
let date = new Date();
let printDate = `${date.getHours()}:${date.getMinutes()}  ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

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
// BUSCA EL REMITO GUARDADO PREVIAMENTE
searchVoucher.addEventListener("click" , ()=>{
    searchVoucherFun.searchVoucher();
});
var discountContent = 0;
// al presionar modificar remito
saveChanges.addEventListener("click" , ()=>{
    modifyValuesOfCtaCte.modifyValuesOfCtaCte();
});
saveChangesModifyValues.addEventListener("click" , async()=>{
    // guarda los cambios del producto
    await saveCtaCteSettings();
});
window.onload = async()=>{


// carga los datos de la cta cte
loadDataClient.loadDataClient();
//ESTA FUNCION PROVIENE DE FUNCTIONS Y RECARGA LA LISTA DE DEUDAS Y PAGOS 
reloadHystoryList();

// controlador de eventos del menu de opciones de los remitos al ser modificados
settingsForVoucher.settingsForVoucher();


// boton de modificar remito , al presionarse se abre el menú para modificar  el remito
modifyVoucher.addEventListener("click" , async()=>{
    let insideIdVoucher = getTarget.parentNode.children[1].tagName=="STRONG"?getTarget.parentNode.children[1].textContent.split(" ")[1] : "";
    let voucherFound = await allAnswer(`SELECT id FROM remitos WHERE insideid='${insideIdVoucher}'`);
    if(voucherFound.length>0){
        await modifyVoucherSaved(insideIdVoucher);
    }else{
        reportStatus.reportStatus("Error", "Este registro no contiene un remito", "El registro no está asociado a un remito,debido a que es otro tipo de operación", 1 , ["Aceptar"], ["canelProcess"], document.getElementById("alertContent"))
    }
});

// guarda el remito modificado 
document.getElementById("saveModifyVocuher").addEventListener("click" , async()=>{
   await saveVoucherModified(voucherNumber);
});
// cancela la modificación del remito modificado
cancelProcessBtn.addEventListener("click", ()=>{
    document.getElementById("modifyVoucherSaved").style.display="none"
});

// Recalcula y actualiza todos los valores finales basándose en el nuevo valor final del remito modificado
saveChangesInVoucher.addEventListener("click" , async()=>{
    await updateAllFinalValues(insideIdVoucher);
});


// al dale click a una serie evalua que no se encuentre dentro de los productos y la añade a la lista
listOfSerialsProducts.addEventListener("click" , (serial)=>{
    addSerialToHtml(serial);
})



//despliega el menu de pagos
addPay.addEventListener("click", ()=>{
    addPayController.addPayController();
});
closeModifyValues.addEventListener("click" , ()=>{
    document.getElementById("inputContainers").classList.toggle("flex")
});
}
// al presinar click en imprimir histoial de cuenta corriente
printOperations.addEventListener("click" , ()=>{
    hystoryCtaCte = true;
    ipcRenderer.send("goToPrint");
    window.close();
});
// al presionar salir se redirige a las cta ctes
backBtn.backBtn(document.getElementById("backBtnContent"));
// al cerrar la ventana se redirige a las cta ctes
window.addEventListener("beforeunload" , ()=>{
    if(!hystoryCtaCte){
        localStorage.removeItem("idCtaCte");
        window.close();
        ipcRenderer.send("backToViewCtaCte");
    }
});

newVoucher.addEventListener("click", ()=>{
    ipcRenderer.send("newVucher");
});

// si recibe un dato de ipcMain (proveniente de index.js) que a su vez este es
//  llamado por pintVoucher.js recarga la lista
ipcRenderer.on("reloadQueryList" , ()=>{
    reloadHystoryList();
});