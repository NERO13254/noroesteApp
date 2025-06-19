const {backBtn}         = require("../functtions/backBtn")
const {loadDataClient}  = require("../functtions/modifyCtaCte/loadDataClient");
const {reloadHystoryList}=require("../functtions/modifyCtaCte/reloadHistoryList");
const {searchVoucher}   = require("../functtions/modifyCtaCte/searchVoucher");
const {settingsForVoucher}= require("../functtions/modifyCtaCte/settingsForVoucher");
const {modifyVoucherSaved}= require("../functtions/modifyCtaCte/modifyVoucherSaved");
const {saveVoucherModified}=require("../functtions/modifyCtaCte/saveVoucherModified");
const {updateAllFinalValues}=require("../functtions/modifyCtaCte/updateAllFinalValues");
const {addPayController} = require("../functtions/modifyCtaCte/addPayController");
const {ipcRenderer} = require("electron");
const { savePay } = require("../functtions/modifyCtaCte/savePay");

// variable global que se usa para almacenar el remito seleccionado a modificar
var idVoucherContent = ""
window.onload = async()=>{
    // boton para volver atras 
    backBtn(document.getElementById("backBtnContent") , "backViewCtaCte");
    
    // carga el nombre de la cta cte
    loadDataClient();

    //carga la lista de pagos y debitos
    reloadHystoryList();


    // busca remitos guardados
    document.getElementById("searchVoucher").addEventListener("click" , async()=>{
       await searchVoucher();
    });

    // controlador de eventos del menu de opciones de los remitos al ser modificados
    settingsForVoucher();

    // boton de modificar remito , al presionarse se abre el menú para modificar  el remito
    document.getElementById("modifyVoucher").addEventListener("click" , async(e)=>{
        await modifyVoucherSaved(e , idVoucherContent);
    });

    // cancela la modificación del remito modificado
    cancelProcessBtn.addEventListener("click", ()=>{
        document.getElementById("modifyVoucherSaved").style.display="none"
    });

    // guarda el remito modificado 
    document.getElementById("saveModifyVocuher").addEventListener("click" , async()=>{
        await saveVoucherModified(idVoucherContent);
    });

    // Recalcula y actualiza todos los valores finales basándose en el nuevo valor final del remito modificado
    saveChangesInVoucher.addEventListener("click" , async()=>{
        await updateAllFinalValues(insideIdVoucher);
        window.close();
    });

    // al dale click a una serie evalua que no se encuentre dentro de los productos y la añade a la lista
    listOfSerialsProducts.addEventListener("click" , (serial)=>{
        addSerialToHtml(serial);
    })

    //despliega el menu de pagos
    document.getElementById("addPay").addEventListener("click", async()=>{
       await addPayController();
    });

    // al presionar "guardar" en el menú de pagos 
    document.getElementById("saveImport").addEventListener("click" , async()=>{
        await savePay();
    });

    // al presinar click en imprimir histoial de cuenta corriente
    printOperations.addEventListener("click" , ()=>{
        hystoryCtaCte = true;
        ipcRenderer.send("goToPrint");
        window.close();
    });
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
}