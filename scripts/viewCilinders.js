const {ipcRenderer} = require("electron"); 
const { startSearchCilinder } = require("../functtions/viewCilinders/startSearchCilinder");
const { searchCilinder } = require("../functtions/viewCilinders/searchCilinder");
const { seeAllCilinderData } = require("../functtions/viewCilinders/seeAllCilinderData");
const { modifyCilinder } = require("../functtions/viewCilinders/modifyCilinder");
const { removeCilinder } = require("../functtions/viewCilinders/removeCilinder");
const typeCilindersContent= document.getElementById("typeCilindersContent");
const chargeNweClilinder = document.getElementById("chargeNweClilinder");
const {backBtn} =  require("../functtions/backBtn");


// variable que contiene el div del cilindro seleccinado
var cilnderSelected = "";

window.onload = async()=>{
    // boton para volver atras
    backBtn(document.getElementById("backElement"));

    // imprime los cilindros en el HTML
    await startSearchCilinder();

    // busca el cilindro especificado
    document.getElementById("searchCilinder").addEventListener("keyup" , async(e)=>{
        if(e.target.value.length>=3 &&  e.key=='Enter'){
            searchCilinder(e.target);
        }else{
            document.getElementById("resultsOfSearch").style.display='none'
        }
    })  

    // al seleccionar algun cilindro de la lista despliega todos los datos de este
    document.getElementById("typeCilindersContent").addEventListener("click" , (e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            // despliega el div para modificar el cilindro y asigna el cilindro seleccionado a la variable global
            seeAllCilinderData(e.target);
            cilnderSelected = e.target.parentNode
        }
    });

    // al cancelar la modificacion del cilindro 
    document.getElementById("cancelModification").addEventListener("click" , ()=>{
        document.getElementById("specificDataCilinder").style.display='none';
    })

    // al presionar guardar en el cilindro a modificar
    document.getElementById("saveModified").addEventListener("click" , async()=>{
        await modifyCilinder();
    });

    // al presionar Eliminar en el cilndro a modificar
    document.getElementById("removeCilinder").addEventListener("click" , async()=>{
        await removeCilinder();
    });

    // logica del boton agregar nuevo cilindro
    chargeNweClilinder.addEventListener("click" ,()=>{
    ipcRenderer.send("evenNewCil" , 33);
    window.close();
    });
    typeCilindersContent.addEventListener("click" , (e)=>{
        var getId = e.target.id;
        if(getId.charAt(0) == "E"){
            var clearId = getId.slice(1);
            localStorage.setItem("idTypeCil", clearId);
            ipcRenderer.send("modifyTypeCil");
            window.close();
        }
    });
}