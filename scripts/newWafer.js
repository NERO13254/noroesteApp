const dbRed                         = require("../db/dbRed");
const db                            = dbRed.getDb(__dirname);
const getDateConent                 = document.getElementById("dateContainer");
const workshopCodeContent           = document.getElementById("workshopCodeContent");
const operationTypeContentRegulator = document.getElementById("operationTypeContentRegulator");
const reportStatus                  = require("../functtions/reportStatus");
const reportStatusContent           = document.getElementById("reportStatusContent");
const regulatorInputDynamic         = document.getElementById("regulatorInputDynamic");
const dynamicInputRegulator         = require("../functtions/newWafer/dynamicInputRegulator");
const searchDataSaved               = require("../functtions/newWafer/searchDataSaved");
const dynamicCilinders              = require("../functtions/newWafer/dynamicCilinders");
const collectAndSaveData            = require("../functtions/newWafer/collectAndSaveData");
const searchDataClient              = require("../functtions/newWafer/searchDataClient");
const searchLocation                = require("../functtions/newWafer/searchLocation");
const oldObleaContent               = document.getElementById("oldObleaContent");
const ammountCilindersContent       = document.getElementById("ammountCilindersContent");
const saveWafer                     = document.getElementById("saveWafer");
const buttonContent                 = document.getElementById("buttonContent");
const guide                         = require("../functtions/guide");
const dni                           = document.getElementsByName("dni")[0];
const locationData                  = document.getElementsByName("location")[0];
let numberClientSearched            = 0 ;
let newDate = new Date();
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){console.log(err.message)}else{
                resolve();
            }
        })
    })
}
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){console.log(err.message)}else{
                resolve(row);
            }
        })
    })
}
window.onload =async()=>{
    // corrobora que no haya una oblea para observar
    if(!localStorage.getItem("idWaferSaved")){
        // obtiene el contenedor de la fecha y selecciona el input hijo para insertarle la fecha de hoy
        getDateConent.children[1].value = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getUTCFullYear()}`;
        document.getElementsByName("fistRegulatorDate")[0].value= newDate.getMonth()+1+"/"+String(newDate.getFullYear()).slice(2);
        // lo mismo con el codigo taller
        if(!localStorage.getItem("idWorkShop")){
            workshopCodeContent.children[1].value = "HIT035";
        }else{
            let contentCode = await allAnswer(`SELECT workshopcode FROM tdm WHERE id='${localStorage.getItem("idWorkShop")}'`);
            workshopCodeContent.children[1].value = contentCode[0]["workshopcode"];
        }
    }
    else{
        // inserta los datos de la oblea cargada previamente guiandose por el numero del localStorage
        console.log(localStorage.getItem("idWaferSaved"))
        await searchDataSaved.searchDataSaved(localStorage.getItem("idWaferSaved"));
        // luego cambia el boton de "GUARDAR" a "ACTUALIZAR"
        let button = document.createElement("button");
        button.id = "updateWafer";
        button.textContent = "Actualizar";
        saveWafer.replaceWith(button);
        button.addEventListener("click" , async()=>{
            await collectAndSaveData.collectAndSaveData("update" , document.getElementById("oldObleaContent").children[1].value);
        });
    }
}

document.getElementById("oldObleaContent").children[1].addEventListener("keyup" , async(e)=>{
    if(e.key == "Enter"){
       await searchDataSaved.searchDataSaved(e.target.value);
        // luego cambia el boton de "GUARDAR" a "ACTUALIZAR"
        let button = document.createElement("button");
        button.id = "updateWafer";
        button.textContent = "Actualizar";
        saveWafer.replaceWith(button);

        let getUpdateWafer = document.getElementById("updateWafer");
        getUpdateWafer.addEventListener("click" , async()=>{
            await collectAndSaveData.collectAndSaveData("update" , document.getElementById("oldObleaContent").children[1].value);
        });
    }
});
// al presionar enter en DNI carga los datos del cliente si es que ya se cagaron anteriormente
dni.addEventListener("keyup" , (e)=>{
    if(e.key=="Enter"){
        searchDataClient.searchDataClient(dni.value);
    }
});
// al presionar enter en Localidad Busca coincidencias junto con su CP y lo inserta en html
locationData.addEventListener("keyup" , (e)=>{
    if(e.key=="Enter"){
        searchLocation.searchLocation(locationData.value);
    }
});
// obtiene el input que indica que tipo de operación es y al presionar enter obtiene el valor del input
operationTypeContentRegulator.children[1].addEventListener("keyup" , (e)=>{
    if(e.key == "Enter"){
        let getLetter = e.target.value.toUpperCase();
        // corrobora que se haya ingresado un solo valor y que sea valido
        if(getLetter.length>1){
            reportStatus.reportStatus("Valor invalido" , "Ingrese Solo Una Letra Válida" , "Por favor, ingrese solo una de las siguientes letras en el campo: C, M, R o D." , 1 , ["Aceptar"] , ["canelProcess"] ,  reportStatusContent)
            regulatorInputDynamic.innerHTML = "";
        }
        else if (getLetter == "C"||getLetter == "M"||getLetter == "R"||getLetter == "D" ){

            // si es conversion o modificación despliega un segundo div de regulador
            if(getLetter == "C"||getLetter == "M"){
                dynamicInputRegulator.dynamicInputRegulator();
            }else{
                regulatorInputDynamic.innerHTML = "";
            }
        }else{
            regulatorInputDynamic.innerHTML = "";
            reportStatus.reportStatus("Valor invalido" , "Ingrese Una Valor Válida" , "Por favor, ingrese solo una de las siguientes letras en el campo: C, M, R o D." , 1 , ["Aceptar"] , ["canelProcess"] ,  reportStatusContent)
        }
    }
});
// al presinar enter en la cantidad de cilindros se envia el valor de este a la funcion y se insertan en html
ammountCilindersContent.addEventListener("keyup" , async(e)=>{
    if(e.key== "Enter"){
        await dynamicCilinders.dynamicCilinders(parseInt(e.target.value));
        // se inserta la guia
        let guideContent = [{name : "M/S/D/B" }  ,{name : "Crpc" }, {name : "Año.Rev" },{name : "Mes.Rev" } ,{name : "Año.Fab" },{name : "Mes.Fab" } ,{name : "Usado" } ,{name : "Nuevo" }, {name : "N°Serie" },{name : "Código" } ]
        guide.printGuide(guideContent , document.getElementById("cilinderesContainer") , "append" );
    }
})
// al presionar guardar Oblea 
saveWafer.addEventListener("click" , async()=>{
   await collectAndSaveData.collectAndSaveData();
});