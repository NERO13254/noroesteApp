const { ipcRenderer }   = require("electron");

const {searchDataClient, searchCpFromLocation}  = require("../functtions/compromisshet/searchDataClient");
const { defaultPrcess } = require("../functtions/compromisshet/defaultProcess");
const { backBtn } = require("../functtions/backBtn");


window.onload = async()=> {

    // boton para volver atras
    backBtn(backTo,"seeSavedCilinders");

    // carga los datos por defecto
    localStorage.getItem("idCilinderSaved") ? await defaultPrcess() : "";

   
    // al darle enter al dni corrobora si existe en db y completa los campos de la info del usuario
    document.getElementById("dni").addEventListener("keyup" ,async(e)=>{
        e.key == "Enter"  ? await searchDataClient() : "" ;
    });

    // Al darle enter a la localidad busca el cp de esta y si lo encunetra lo añade al campo CP 
    document.getElementById("country").addEventListener("keyup" , async(e)=>{
        e.key=="Enter" ? await searchCpFromLocation(e.target.value) : "";
    });

    // al darle imprimir elimina los datos generados y cierra la ventana
    document.getElementById("printSheet").addEventListener("click" , async()=>{
        localStorage.removeItem("idCilinderSaved");
        window.print();
        ipcRenderer.send("seeSavedCilinders");
        window.close();
    });

}