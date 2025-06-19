const dbRed = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const {backBtn} = require("../functtions/backBtn");
const { defaultLoadedTools } = require("../functtions/instrumental/defaultLoadedTools");
const { deleteThisTool } = require("../functtions/instrumental/deleteThisTool");
const { modifyThisTool } = require("../functtions/instrumental/modifyThisTool");
const { startSearch } = require("../functtions/instrumental/startSearch");
const { toolSettingController } = require("../functtions/instrumental/toolSettingController");
var toolList = document.getElementById("defaultLoadedTools");
var settingsTool = document.getElementById("settingsOfToolLoaded");
window.onload = async()=>{
    // boton para volver atras
    backBtn(document.getElementById("backBtn"));
    // carga las herramientas por defecto
    await defaultLoadedTools();


    // boton para añadir una nueva herramienta
    document.getElementById("addNewTool").addEventListener("click" , ()=>{
        settingsTool.style.display='grid';
        // al darle a guardar crea una nueva herramienta
        let saveChangesCloned = document.getElementById("saveChanges").cloneNode(true);
        document.getElementById("saveChanges").replaceWith(saveChangesCloned);

        saveChangesCloned.addEventListener("click" , async()=>{
            // inserta los datos en db
            await toolSettingController("insert");
        })
    });

    document.getElementById("toolList").addEventListener("click" , async(e)=>{
        // al presionar el boton de modificación
        if(e.target.className=='modifyThisTool'){
            await modifyThisTool(e);
        }

        //  al presionar el boton de eliminar
        if(e.target.className=='deleteThisTool'){
            await deleteThisTool(e);
        }
    });


    // Y EL BUSCADOR 
    // EL BUSCADOR USA EN EL MISMO CONTENEDOR DE RESULTADOS
    let div = document.getElementById("searchResults");
    document.getElementById("searchTool").addEventListener("keyup" , (e)=>{
        if(e.target.value.length>3){
            div.style.display="grid";
            startSearch(e.target.value, div);
        }else{
            div.style.display="none";
        }
    });

    // boton para cerrar el controlador para añadir una nueva herramienta
    document.getElementById("cancelProcess").addEventListener("click" , ()=>{
        settingsTool.style.display='none';
    });
}