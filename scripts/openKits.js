const {ipcRenderer} = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const listKits      = document.getElementById("listKits");
const newKit        = document.getElementById("newKit");
const openWindow    = document.getElementById("openWindow");
const costContent   = document.getElementById("costContent");
const modifyKit     = document.getElementById("modifyKit");
const alert         = document.getElementById("alert");
const buytContent   = document.getElementById("buyContent");
const kitController = document.getElementById("kitController");
const valueKit      = document.getElementById("valueKit");
const saveKit       =  document.getElementById("saveKit");
const createNewKit  = document.getElementById("createNewKit");
const searchProductForNewKit    = document.getElementById("searchProductForNewKit");
const searchProductOfTheDb  = document.getElementById("searchProductOfTheDb");
let closeWindowKit  = document.getElementById("closeWindowKit");
let searchProductOfTheList = document.getElementById("searchProductOfTheList");
let deleteKit       = document.getElementById("deleteKit");
const nameKit       = document.getElementById("nameKit");
const backBtn       =  require("../functtions/backBtn");
const printGuide    = require("../functtions/guide");
const adminInfo     = require("../adminInfo");
const desplegateProductsOfTheKit    = require("../functtions/openKits/desplegateProductsOfTheKit");
const searchProductInTheList = require("../functtions/openKits/searchProductInTheList");
const searchProductInTheDb  = require("../functtions/openKits/searchProductInTheDb");
const addProductOfTheDbAtKit    = require("../functtions/openKits/addProductOfTheDbAtKit");
const saveChangesOfTheKit       = require("../functtions/openKits/saveChangesOfTheKit");
const reloadKitList             = require("../functtions/openKits/reloadKitList");
const createNewKitModuleFuction = require("../functtions/openkits/createNewKitModuleFuction");
const reportStatus              = require("../functtions/reportStatus");
let idKitSelected = "";
let costValuesKits = [];
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){console.log(err.message);}else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err,)=>{
            if(err){console.log(err.message);}else{
                resolve();
            }
        })
    })
}

window.onload = async()=>{
    let getKitsData = await allAnswer("SELECT id,name, costvalue , salevalue, content FROM kit WHERE 1");
    // boton para volver <-
    backBtn.backBtn(document.getElementById("backBtnContent") , "backToListProducts" );
    // si no es administrador no puede acceder a manipular los kits
    const adminInfoContent  = adminInfo.adminInfo
    const getDataAcces      = localStorage.getItem("userAdmin").split(",");
    if(adminInfoContent[0] != getDataAcces[0] || adminInfoContent[1] != getDataAcces[1] ){
        kitController.style.display="none";
    }

    // obtiene los datos de los kits
    await reloadKitList.reloadKitList(getKitsData);
    // redirige a nuevo kit
    newKit.addEventListener("click" , ()=>{
        document.getElementById("createKit").classList.toggle("show");
    });

    // despliega el controlador de los productos del kit seleccionado
    listKits.addEventListener("click", async(e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            idKitSelected = e.target.className;
            desplegateProductsOfTheKit.desplegateProductsOfTheKit(e);
        }
    });
    // buscador interno para los productos que están agregados al kit
    searchProductOfTheList.addEventListener("keyup" , (e)=>{
        if(e.target.value.length>2){
            // obtiene el contenedor de resultados , lo limpia, y lo hace visible en el html
            let containerResultsOfTheList = document.getElementById("containerResultsOfTheList");
            containerResultsOfTheList.innerHTML="";
            containerResultsOfTheList.style.display="block";
            searchProductInTheList.searchProductInTheList(e.target.value);
        }else{
            containerResultsOfTheList.style.display="none"; 
        }
    });
    // buscador para añadir un producto al kit 
    searchProductOfTheDb.addEventListener("keyup" , (e)=>{
        if(e.target.value.length>2){
            // obtiene el contenedor de resultados , lo limpia, y lo hace visible en el html
            let containerResults = document.getElementById("containerResults");
            containerResults.innerHTML="";
            containerResults.style.display="block";
            searchProductInTheDb.searchProductInTheDb(e.target.value , containerResults);
        }else{
            containerResults.style.display="none"; 
        }
    });
    // Busca los productos para añadir el nuevo producto al nuevo kit
    let resultsOfTheSearch = document.getElementById("resultsOfTheSearch");
    searchProductForNewKit.addEventListener("keyup", (e)=>{
        if(e.target.value.length>2){
            resultsOfTheSearch.innerHTML="";
            resultsOfTheSearch.style.display="block";
            searchProductInTheDb.searchProductInTheDb(e.target.value ,resultsOfTheSearch );
        }else{
            resultsOfTheSearch.style.display="none"; 
        }
    });
    // añade el producto seleccionado al nuevo kit
    resultsOfTheSearch.addEventListener("click" , (e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            addProductOfTheDbAtKit.addProductOfTheDbAtKit(e.target,document.getElementById("contentProductsOfTheNewKit") ,getKitsData, resultsOfTheSearch ,"newKit");
        }
    });
    // añade el producto de la base de datos seleccionado a la lista de productos y actualiza el contenido del kit
    containerResults.addEventListener("click" , (e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            addProductOfTheDbAtKit.addProductOfTheDbAtKit(e.target,document.getElementById("productsContainerOfTheKit") ,getKitsData , containerResults);
        }
    });
    // cierra la ventana de kit
    closeWindowKit.addEventListener("click" , ()=>{
        valueKit.classList.toggle("show");
    });
    // cierra la ventana de nuevo kit
    document.getElementById("cancelProcessNewKit").addEventListener("click" , ()=>{
        document.getElementById("createKit").classList.toggle("show");
    });
    // elimina el poducto del kit
    valueKit.addEventListener("click" , async(e)=>{
        if(e.target.tagName=="BUTTON" && e.target.id != "closeWindowKit" && e.target.id != "saveKit" && e.target.id != "createNewKit" && e.target.id !="deleteKit"){
           e.target.parentNode.remove();
        }
    });
    // elimina el producto del nuevo kit
    document.getElementById("createKit").addEventListener("click" , async(e)=>{
        if(e.target.tagName=="BUTTON" && e.target.id != "closeWindowKit" && e.target.id != "saveKit" && e.target.id != "createNewKit"){
            e.target.parentNode.remove();
        }
    });
    // al presionar "guardar" en un kit ya creado
    saveKit.addEventListener("click" , ()=>{
        saveChangesOfTheKit.saveChangesOfTheKit();
    });
    // al presionar "crear" en un nuevo kit
    createNewKit.addEventListener("click" , ()=>{
        createNewKitModuleFuction.createNewKitModuleFuction();
    });
    // borra el kit de db 
    deleteKit.addEventListener("click" , ()=>{
        // lanza el aviso de seguridad
        reportStatus.reportStatus("Aviso de preservación de datos" , "Estas por eliminar un Kit" , "Si eliminas un kit , los productos que contiene , al igual que su valor se eliminarán ¿deseas eliminarlo igualmente?" , 2 , ["Cancelar" , "Eliminar"] , ["canelProcess" , "procedeToDeleteKit"] , document.getElementById("statusContainer"));
        //obtiene el boton "eliminar" para eliminar el kit de db
        document.getElementById("procedeToDeleteKit").addEventListener("click" , async()=>{
            await runAnswer(`DELETE FROM kit WHERE id = '${idKitSelected}'`);
            valueKit.classList.toggle("show")
            document.getElementsByClassName("deleteOrtherProductAlert")[0].style.display="none";
            await reloadKitList.reloadKitList();
        });
    });
}