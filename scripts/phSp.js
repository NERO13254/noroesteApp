const { searchLocations } = require("../functtions/phSp/searchLocations");
const { insertDniData } = require("../functtions/phSp/insertDniData");
const { searchCilinder } = require("../functtions/phSp/searchCilinder");
const { loadDataSpecificCilinder } = require("../functtions/phSp/loadDataSpecificCilinder");
const { loadCilinderDataSaved } = require("../functtions/phSp/loadCilinderDataSaved");
const { loadAllPecs } = require("../functtions/phSp/loadAllPecs");
const { saveOrUpdateCilinder } = require("../functtions/phSp/saveOrUpdateCilinder");
const { reportStatus } = require("../functtions/reportStatus");
const { saveOrUpdateClient } = require("../functtions/phSp/saveOrUpdateClient");
const {backBtn} = require("../functtions/backBtn");
const { loadTdmData } = require("../functtions/phSp/loadTdmData");
const { completeVolAndTara } = require("../functtions/phSp/completeVolAndTara");
const { corroborateWebCil } = require("../functtions/phSp/corroborateWebCil");
const { ipcRenderer } = require("electron");
const { completeScrappingWeb } = require("../functtions/phSp/completeScrappingWeb");

var codeCilinderMatched = false;
var condenatedCilinder = false;
window.onload = async()=>{
    
    // boton para volver atrás
    let backBtnContent =document.getElementById("backBtn");
    backBtnContent.addEventListener("click" , ()=>{localStorage.removeItem("idCilinderSaved")});
    backBtn(backBtnContent,"seeSavedCilinders");
    
    // carga todos los pec
    await loadAllPecs();

    // carga los datos del TDM
    await loadTdmData();

    // si se encuentra el codigo de cilindro en localStorage carga los datos de este
    if(localStorage.getItem("idCilinderSaved")){
        // completa todos los inputs
        await loadCilinderDataSaved(localStorage.getItem("idCilinderSaved"));
        // completa la información detallada general del cilindro (los strong al presionar "+")
        await searchCilinder(document.getElementById("omologation"));
    }

    // al presionar enter en el DNI del cliente
    document.getElementById("dni").addEventListener("keyup" , async(e)=>{
        if(e.key=="Enter"){
            await insertDniData(e);
        }
    })
    // al buscar una localidad
    document.getElementById("country").addEventListener("keyup", async(e)=>{
        await searchLocations(e);
    });
    
    // al seleccionar una localidad de la lista de resultados mediante click
    document.getElementById("resultsContent").addEventListener("click", (e)=>{
        if(e.target.tagName=="INPUT" &&  e.target.getAttribute("type")=="checkbox"){            
            document.getElementById("country").value   = e.target.parentNode.children[0].textContent;
            document.getElementById("cp").value        = e.target.parentNode.children[1].textContent;
            document.getElementById("resultsContent").style.display = "none"
        }
    });

    // al ingresar el codigo de homologado completa los campos de info detallada 
    document.getElementById("omologation").addEventListener("keyup" , async(e)=>{
       await searchCilinder(e.target);
    });
    // al salir del campo omologation completa los datos especificos del cilindro
    document.getElementById("omologation").addEventListener("focusout" , async()=>{
        // si es un cilindro nuevo , genera los datos aleatorios de este
        
        if(!localStorage.getItem("idCilinderSaved")){
            await loadDataSpecificCilinder();
        }
    })

    // al clickear el boton de "g" corrobora el cilindro en la web (enargas)
    document.getElementById("corroborateCilinderInEnargas").addEventListener("click", async()=>{
        await corroborateWebCil();
    });

    // al recibir el scrapping completa los campos con la informacion brindada
    ipcRenderer.on("scrappingData" , (e, data)=>{
        completeScrappingWeb(data);
    });
    

    // al cambiar el estado del select a "condenado"
    document.getElementById("case").addEventListener("change" , (e)=>{
        if(e.target.value=="condenado"){
            condenatedCilinder = true;
        }
    })

    // a presionar "espesores" habilita la ventana emergente de las medidas especificas del cilindro
    document.getElementById("nextWindow").addEventListener("click" , async()=>{
        document.querySelector(".specificCilnderAllDataContent").classList.toggle("showGrid");
    });

    // al hacer focus-out sobre el campo de volumen
    document.getElementById("volmedido").addEventListener("focusout" , async(e)=>{
        await completeVolAndTara(e);
    }); 
    // al hacer focus-out sobre el campo de masa
    document.getElementById("taraestimado").addEventListener("focusout" , async(e)=>{
        await completeVolAndTara(e);
    });

    //  al presionar "guardar"
    document.getElementById("saveCilinder").addEventListener("click" , async()=>{
        if(codeCilinderMatched){
            // actualiza los datos del cliente
            await saveOrUpdateClient();
            
            // guarda o actualiza los datos del cilindro y cierra la ventana
            await saveOrUpdateCilinder(condenatedCilinder);
        }else{
            reportStatus("Aviso" , "No se encuentra el codigo de cilindro especificado " , "Corrobore que el codigo del cilindro fué ingresado correctamente ,o en su defecto no hay registros de este cilindro , de ser el caso , debe añadirlo a la lista de cilindros." , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
        }
    });
}