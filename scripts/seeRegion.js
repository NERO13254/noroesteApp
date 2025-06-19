const {backBtn}     = require("../functtions/backBtn");
const { createProvince } = require("../functtions/seeRegion/createPovince");
const { delteProvince } = require("../functtions/seeRegion/delteProvince");
const { desplegateRegionMenu } = require("../functtions/seeRegion/desplegateRegionMenu");
const { loadDefaultProvince } = require("../functtions/seeRegion/loadDefaultProvince");
const { searchProvince } = require("../functtions/seeRegion/searchProvince");
const { settingsProvince } = require("../functtions/seeRegion/settingsProvince");
const { updateProvince } = require("../functtions/seeRegion/updateProvince");
const listRegionsLoaded = document.getElementById("listRegionsLoaded");

var targetContent = "";

window.onload = async()=>{
    // boton para volver atras
    backBtn(document.getElementById("backBtn"));

    // carga las provincias por defecto
    await loadDefaultProvince();


    // al preisonar en nueva provincia
    document.getElementById("newProvince").addEventListener("click" , ()=>{
        desplegateRegionMenu();
    });

    // a presionar "cancelar" 
    document.getElementById("cancelSetting").addEventListener("click" , ()=>{
        document.getElementById("modifySecttion").style.display='none';
    });

    // inserta una provincia 
    document.getElementById("insertProvince").addEventListener("click" , async()=>{
        await createProvince();
    })

    // al seleccionar alguna provincia
    document.getElementById("allResults").addEventListener("click" , async(e)=>{
        e.target.getAttribute("type")=='checkbox' ? (settingsProvince(e.target), targetContent=e.target) : "";
    });

    // al presionar "guardar" 
    document.getElementById("updateProvince").addEventListener("click" , async()=>{
        updateProvince(targetContent);
    });

    // al presionar "eliminar provincia" 
    document.getElementById("deleteProvince").addEventListener("click" , async()=>{
       await delteProvince(targetContent);
    });

    // al buscar una provincia
    document.getElementById("searchProvince").addEventListener("keyup" , (e)=>{
        searchProvince(e.target.value.toUpperCase());
    });
}
