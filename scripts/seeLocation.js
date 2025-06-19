const { loadDefaultResults } = require("../functtions/seeLocation/loadDefaultResults");
const {searchLocations} = require("../functtions/seeLocation/searchLocations");
const { settingsLocation } = require("../functtions/seeLocation/settingsLocation");
const { updatLocation } = require("../functtions/seeLocation/updatLocation");
const { deleteLocation } = require("../functtions/seeLocation/deleteLocation");
const { backBtn} = require("../functtions/backBtn");
const { createLocation } = require("../functtions/seeLocation/createLocation");


var divSelected =  "";

window.onload = async()=> {

    // boton para volver atras
    backBtn(document.getElementById("backBtn"));

    // carga las localidades por defecto
    await loadDefaultResults();

    // al bucar una localidad
    document.getElementById("searchLocations").addEventListener("keyup" , (e)=>{
        searchLocations(e.target.value);
    });
    
    // despliega el controlador de localidades
    document.getElementById("newLocation").addEventListener("click" , async()=>{
        document.getElementById("idLocation").textContent= "";
        document.getElementById("name").value = "";
        document.getElementById("cp").value = "";
        document.getElementsByClassName("settingsLocationContent")[0].style.display='grid';
        document.getElementById("insertLocation").style.display='block';
        document.getElementById("saveModifies").style.display='none';
        document.getElementById("deleteLocation").style.display='none';
    });

    // al presionar el boton "crear" añade la localidad a db
    document.getElementById("insertLocation").addEventListener("click" , async()=>{
        await createLocation();
    });

    // al seleccionar una localidad
    document.getElementById("allResults").addEventListener("click" , async(e)=>{
        e.target.getAttribute("type")=="checkbox" ?
        (await settingsLocation(e.target), divSelected= e.target.parentNode) : "";
    });

    // al presionar "cancelar" en el menú de opciones 
    document.getElementById("cancelProcessLocation").addEventListener("click" , ()=>{
        document.getElementsByClassName("settingsLocationContent")[0].style.display='none';
    });

    // al presionar "eleminar" en el menú de opciones
    document.getElementById("deleteLocation").addEventListener("click" , async()=>{
        await deleteLocation(divSelected);
    })

    // al presionar "guardar" en el menú de opciones
    document.getElementById("saveModifies").addEventListener("click" , async()=>{
        await updatLocation(divSelected);
    });
}