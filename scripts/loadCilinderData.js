const {ipcRenderer} = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const path          = require("path");
const fs            = require("fs");
var dataUpdate      = "";
var keysAnswers     = "";
var valuesAnswers   = "";
const loadDataCilinderSaved = require("../functtions/loadCilData/loadDataCilinderSaved");
const autofillController    = require("../functtions/loadCilData/autofillController");
const saveChangesOfCilinder = require("../functtions/loadCilData/saveChangesOfCilinder");
const reportStatus          = require("../functtions/reportStatus");
const { loadAllPecs } = require("../functtions/loadCilData/loadAllPecs");
const quitLoadCil           = document.getElementById("quitLoadCil");
const idCilinderSaved       = localStorage.getItem("idCilinderSaved");
const pec                   = document.getElementById("pec");
const codeO                 = document.getElementById("codeO");
const autoFillbtn           = document.getElementById("autoFillbtn");
const autoFillContent       = document.getElementById("autoFillContent");
let completeValuesOfCil     = "";
let getKeysOfTheValuesForCil= "";
let getValuesOfCil          = "";
let codeCilinderMatched     = true;

async function allAnswer(params) {
    return new Promise((resolve) => {
        db.all(params , (err, row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        });
    }) 
}
window.onload = async()=>{
    let numberEnter = 0;
    // salto entre input
    let inputSelectedContent = Array.from(document.getElementById("containerTopInputs").querySelectorAll("input"));
    document.addEventListener("keyup" , (e)=>{
        if(e.key=="Enter"){
            inputSelectedContent[numberEnter].focus();
            numberEnter = (numberEnter + 1) % inputSelectedContent.length;
            if(e.target.id=="vol"){
                document.getElementById("autoFillbtn").focus();
            }
            
        }
    });
    // controlador del boton siguiente o finalizar
    autofillController.autofillController();

    // completa el numero pec
    await loadAllPecs();

    
    async function searchDataCilinders(params) {
        let cilForSearch = String(params).toUpperCase();
        let getDataTypeCilinder = await allAnswer(`SELECT * FROM typecilinders WHERE code LIKE '%' || '${cilForSearch}' || '%' LIMIT 1 `);
        if(getDataTypeCilinder.length>0){
            codeCilinderMatched=true;
            let getStrongs = Array.from(document.getElementsByClassName("dataCilinder")[0].querySelectorAll("strong"));
            let getInputs =Array.from(document.getElementsByClassName("dataOfTheCilinder")[0].querySelectorAll("input"));
            getInputs.map(data=>data.value = getDataTypeCilinder[0][data.id]);
            getStrongs.map(data=>data.textContent = getDataTypeCilinder[0][data.id]);
        }else{
            codeCilinderMatched=false;
        }
    }
    
    // al presionar enter en codigo de homoloagcion del cilindro
    codeO.addEventListener("keyup" ,async (e)=>{
        searchDataCilinders(e.target.value.toUpperCase());
    })

    // si hay un cilindro guardado autocompleta los datos de este
    if(idCilinderSaved){
        await loadDataCilinderSaved.loadDataCilinderSaved(idCilinderSaved);
        await searchDataCilinders(codeO.value.slice(0,-2).toUpperCase());
        autoFillContent.style.opacity='0';
    }
  
    // guarda el cilindro
    autoFillbtn.addEventListener("click" , async()=>{
        // corrobora los datos del cilindro , si estan bien se setea true a codeCilinderMatched 
        if(codeCilinderMatched==true){
            await saveChangesOfCilinder.saveChangesOfCilinder();
            localStorage.setItem("cilinderInfo" , `${codeO.value},${document.getElementById("serialNumber").value}`)
            window.close();
        }else{
            // si se le da agregar nuevo cilindro
            reportStatus.reportStatus("Error","Codigo Inexistente","El codigo que desdea agregar no se encuentra dentro de los cilindros guardados ¿Desea agregar el cilindro a la lista de cilindros?", 2 , ["Cancelar" , "Agregar"], ["canelProcess" , "addCilinderToSavedCilinders"] , document.getElementById("reportStatusContent"));
            document.getElementById("addCilinderToSavedCilinders").addEventListener("click" , ()=>{
                ipcRenderer.send("evenNewCil");
            });
            // si se presiona cancelar 
            document.getElementById("canelProcess").addEventListener("click" , ()=>{
                codeCilinderMatched= true;
            })
        }

    })
    // cierra la ventana 
    quitLoadCil.addEventListener("click" , ()=>{
        ipcRenderer.send("returnToChargeCilinders");
        window.close();
    });
}