const {ipcRenderer}             = require("electron");
const getDb                     = require("../db/dbRed");
const db                        = getDb.getDb(__dirname);
const searchCilinder            = require("../functtions/seeSavedCils/searchCil");
const clickCil                  = require("../functtions/seeSavedCils/clickCil");
const openOptionCompromiss      = require("../functtions/seeSavedCils/openOCompromis");
const seeWafersSavedFunc        = require("../functtions/seeSavedCils/seeWafersSavedFunc.js");
const reportStatus              = require("../functtions/reportStatus");
const seeCilindersSaved         = require("../functtions/seeSavedCils/seeCilindersSaved.js");
const backBtn                   = require("../functtions/backBtn.js");
const seeWafersDebitedFunc      = require("../functtions/seeSavedCils/seeWafersDebitedFunc");
const typeDataContenet          = document.getElementById("typeDataContenet");
const alertContent              = document.getElementById("alertContent");
const seeCilinders              = document.getElementById("seeCilinders");
var printCevigas                = document.getElementById("printCevigas");
var roadMap                     = document.getElementById("roadMap");
var newCil                      = document.getElementById("newCil");
var commitmentSheet             = document.getElementById("commitmentSheet");
var printCompromisSheet         = document.getElementById("printCompromisSheet");
var retunrLastWindow            = document.getElementById("retunrLastWindow");
var workshopCodePrint           = document.getElementById("workshopCodePrint");
var openOptionCompromisSheet    = document.getElementById("openOptionCompromisSheet");
var newOblea                    = document.getElementById("newOblea");
var seeWafers                   = document.getElementById("seeWafers");
const startSearchCil            = document.getElementById("startSearchCil");

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err ,row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        });
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

// CORROBORA QUE HAYA UN DATO EN EL LOCALSTORAGE PARA IR A IMPRIMIR CEVIGAS O HOJA DE RUTA
function checkLocalStorageData(data , ipcRendererSend ){
    if(localStorage.getItem(data)){
        ipcRenderer.send(ipcRendererSend);
    }else{
        alert("SELECCIONE UN REGISTRO");
    }
}
function goToPrint(button , goingTo){
    button.addEventListener("click" , ()=>{
        ipcRenderer.send(`${goingTo}`);
        window.close();
    });
}
let typeSearch = "";
startSearchCil.addEventListener("keyup" , (e)=>{
    // busca el cilindro en base a su codigo (333333)
    if(e.target.value.length>0){
        if(typeSearch != "wafers"){
            searchCilinder.searchCil(e , "cilindersaved" );
        }else{
            searchCilinder.searchCil(e , "waferdatasaved" );
        }
    }else{
        let searchResults       = document.getElementById("searchResults");
        searchResults.style.display="none";
    }
})

// con un click se selecciona el id para imprimir cevigas hoja d ruta etc . 
clickCil.clickCil(searchResults , "no");

// con 2 clicks se abre el cilindro para ver la info detallada
clickCil.dblClick(searchResults);


window.onload = async()=>{
    backBtn.backBtn(document.getElementById("backBtn") , "quitPrint");

    // al hacer click sobre el boton HOJA DE COMPROMISO
    openOptionCompromisSheet.addEventListener("click" , ()=>{
        openOptionCompromiss.openOptionCompromisSheet();
    });


    // OBTIENE EL CODIGO DE TALLER DEL LOCALSTORAGE Y BUSCA EN LA BASE D DATOS LOS CILINDROS GUARDADOS CON UN LIMITE DE 300
    var workshopcode        = localStorage.getItem("idWorkShop");
    var cilinderListContent = document.getElementById("cilinderListContent");
    let getCodeTdm          = await allAnswer(`SELECT workshopcode FROM TDM where id='${workshopcode}'`);

    await seeCilindersSaved.seeCilindersSaved(workshopcode);

    ipcRenderer.on("reloadCilinderList" , async()=>{
        await seeCilindersSaved.seeCilindersSaved(workshopcode);
    });

    seeCilinders.addEventListener("click" , async()=>{
        // oculta el contenedor de obleas y muestra el contenedor de cilindros
        document.getElementsByClassName("buttonWaferContent")[0].style.display="none";
        document.getElementsByClassName("buttonContent")[0].style.display="flex";
        // vuelve a cargar el nombre de la cta cte en bodyContent
        let contentName = document.getElementsByClassName("bodyContent")[0].children[0].textContent;
        contentName = contentName.split(":")
        document.getElementsByClassName("bodyContent")[0].children[0].textContent="CILINDROS CARGADOS DE : "+ contentName[1];
        // carga los primeros 300 cilindros
        await seeCilindersSaved.seeCilindersSaved(workshopcode);
        typeSearch="cilinders";
    });

    // obtiene el nombre del taller y lo imprime en el html
    db.all("SELECT workshop FROM tdm WHERE id =?" , [workshopcode] , (err , row)=>{
        if(err){console.log(err.message)}else{
            workshopCodePrint.append(row[0]["workshop"].toUpperCase());
        }
    });

    // CON EL DOBLE CLICK SE PUEDEN VER LA INFORMACIN DETALLADA DE LOS DATOS DEL CILINDRO 
    clickCil.dblClick(cilinderListContent);

    printCevigas.addEventListener("click", ()=>{
        // CORROBORA DATO EN LOCALSTORAGE PARA IR A IMPRIMIR CEVIGAS
        checkLocalStorageData("idCilinderSaved", "printCevigas");
        window.close();
    });

    roadMap.addEventListener("click" , ()=>{
        // CORROBORA DATO EN LOCALSTORAGE PARA IR A HOJA DE RUTA
        checkLocalStorageData("idCilinderSaved", "printRoadMap");
        window.close();
    });
    async function clearDataSaved(){
        return new Promise(resolve=>{
            localStorage.removeItem("getDataUser");
            localStorage.removeItem("cilinderInfo");
            localStorage.removeItem("idCilinderSaved");
            localStorage.removeItem("dataUser");
            ipcRenderer.send(`returnToChargeCilinders`);
            resolve(window.close());
        });
    }
    newCil.addEventListener("click" , async()=>{
        await clearDataSaved();
    });
    
    commitmentSheet.addEventListener("click" , ()=>{
        if(localStorage.getItem("idCilinderSaved")){
            goToPrint(commitmentSheet , "printCommitmentSheet");
        }else{
            reportStatus.reportStatus("Error" , "No se seleccionó ningún cilindro" , "Asegurese de seleccionar un cilindro para ver su ficha tecnica" , 1 , ["Aceptar"], ["canelProcess"] ,alertContent)
        }
    });
    
    //goToPrint(printCompromisSheet , "printCompromisSheet");
    newOblea.addEventListener("click" , ()=>{

        reportStatus.reportStatus("Aviso","¿La oblea va a ser exportada?","¿desea solo imprimir la ficha tecnica o exportar la oblea a energas ?",2,["Imprimir" , "Exportar a energas"] , ["soloPrint","exportToEnergas"],document.getElementById("alertContent"));
    
        document.getElementById("soloPrint").addEventListener("click" , ()=>{
            document.getElementById("alertContent").innerHTML='';
            localStorage.removeItem("idWaferSaved");
            ipcRenderer.send("printCommitmentSheet");
        })

        document.getElementById("exportToEnergas").addEventListener("click",()=>{
            document.getElementById("alertContent").innerHTML='';
            localStorage.setItem("exportWaferToEnergas" , "true");
            localStorage.removeItem("idWaferSaved");
            localStorage.removeItem("idCilinderSaved");
            localStorage.removeItem("waferDataSavedInObject");
            ipcRenderer.send("printCommitmentSheet");
        });


    });
    seeWafers.addEventListener("click" , ()=>{
        typeSearch = "wafers";
        document.getElementsByClassName("buttonWaferContent")[0].style.display="block";
        document.getElementsByClassName("buttonContent")[0].style.display="none";

        seeWafersSavedFunc.seeWafersSavedFunc(getCodeTdm[0]["workshopcode"]);
    });

    // Y CON UN CLICK SE SELECCIONA SU ID PARA IMPRIMIRSE 
    clickCil.clickCil(cilinderListContent);
}