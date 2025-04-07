const { ipcRenderer }   = require("electron");

const getDb             = require("../db/dbRed");
const db                = getDb.getDb(__dirname);

const {saveOrUpdateDate}  = require("../functtions/compromisshet/saveOrUppdateDate");
const {searchDataClient, searchCpFromLocation}  = require("../functtions/compromisshet/searchDataClient");
const cilindersForPh    = require("../functtions/compromisshet/cilindersForPh");
const { defaultPrcess } = require("../functtions/compromisshet/defaultProcess");
let inputArray          = [];
let completArr          = [];
let ammountIteration    = 1;
let arrData = [];
let number  = 0;
// obtiene los inputs del cliente
var getInputsClient     = document.getElementsByClassName("clientData")[0].querySelectorAll("[name='inputContent']");

window.onload = async()=> {
    // carga los datos por defecto como 
   await defaultPrcess();
}
// al darle enter al dni lanza la funcion para buscar dni
document.getElementById("dni").addEventListener("keyup" ,async(e)=>{
    if(e.key=="Enter"){
        //corrobora si existe el dni en la db y completa los campos de la info del usuario
        await searchDataClient(getInputsClient);
    }
});
// Al darle enter a la localidad busca el cp de esta y si lo encunetra lo añade al campo CP 
document.getElementById("country").addEventListener("keyup" , async(e)=>{
    if(e.key=="Enter"){
       await searchCpFromLocation(e.target.value);
    }
});

// al darle imprimir elimina los datos generados y cierra la ventana
document.getElementById("printSheet").addEventListener("click" , async()=>{
    localStorage.removeItem("idCilinderSaved");
    window.print();
    ipcRenderer.send("seeSavedCilinders");
    window.close();
});