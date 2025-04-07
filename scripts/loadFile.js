const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const filePath          = "C:\\Users\\Usuario\\Desktop\\REV.txt";
const reportStatus      = require("../functtions/reportStatus");
const {reExportOnlyCil}           = require("../functtions/rev/reExportOnlyCil");
const { defaultProcess } = require("../functtions/rev/defaultProcess");
const { chargeCilindersNoExportedOrTheDayInHtml } = require("../functtions/rev/chargeCilindersNoExportedOrTheDayInHtml");

// variable global que evalua (true / false) si se encntró la rev
var revFounded = "--";
// var global (true/false) si la patente es correcta
var errorContainer = "";
// variable global que cuenta cuantos cilindros fallaron al exportarse
var failCilindersExported = 0;

window.onload = async()=>{
    // evalua si exise el archivo REV , si no existe setea "revFounded" en true sino false
    revFounded = await defaultProcess();
    // si encuentra el archivo REV entonces lanza error
    if(!revFounded){
        reportStatus.reportStatus("Aviso" , "Archivo REV existente" ,`La rev ya fue generada , para generar una nueva primero debe eliminar la anterior`,1,["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
    }
    else{
        // carga los cilindros que no se exportaron o los del día de hoy en caso de no encontrar los primeros
        await chargeCilindersNoExportedOrTheDayInHtml();
    } 
    // al darle click al boton se despliegan o se ocultan todos los datos del cilindro
    document.addEventListener("click" , (e)=>{
        if(e.target.id == "seeAllDataCil"){
            if(document.getElementById(e.target.className)){
                document.getElementById(e.target.className).classList.toggle("classDispel");
            }else{
                e.target.parentNode.parentNode.children[1].classList.toggle("classDispel");
            }
        }
    });
    //  al darle click al exportar un solo cilindro no exportado se actualiza y se añade en la rev
    document.getElementById("listExported").addEventListener("click" , (e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            reExportOnlyCil(e);
        }
    });
}