const dateNow               = document.getElementById("dateNow");
const finishDateContent     = document.getElementById("finishDate");
const modelCar              = document.getElementById("modelCar");
const brandCar              = document.getElementById("brandCar");
const resultsOfTheSearchBrand= document.getElementById("resultsOfTheSearchBrand");
const resultsOfTheSearchModel= document.getElementById("resultsOfTheSearchModel");
const inputContainerSearchContentBrand = document.getElementById("inputContainerSearchContentBrand");
const inputContainerSearchContentModel = document.getElementById("inputContainerSearchContentModel");
const addNewCarToList       = document.getElementById("addNewCarToList");
const { ipcRenderer } = require("electron");
const dbRed                 = require("../db/dbRed");
const collectData           = require("../functtions/printCommitmentSheet/collectData");
const collectPairCilinders  = require("../functtions/printCommitmentSheet/collectPairCilinders");
const collectDataWafer      = require("../functtions/printCommitmentSheet/collectDataWafer");
const {updateDataSaved}       = require("../functtions/printCommitmentSheet/updateDataSaved");
const brandsAndModelsCarsDefault= require("../functtions/printCommitmentSheet/brandsAndModelsCarsDefault");
const searchCarAproximate   = require("../functtions/printCommitmentSheet/searchCarAproximate");
const autoCompleteBrandInput= require("../functtions/printCommitmentSheet/autoCompleteBrandInput");
const addNewModelCar        = require("../functtions/printCommitmentSheet/addNewModelCar");
const {saveWaferInDb}         = require("../functtions/printCommitmentSheet/saveWaferInDb");
const runSearch             = require("../functtions/printCommitmentSheet/runSearch");
const collectDataController = require("../functtions/printCommitmentSheet/collectDataController");
const insertDataWaferInHtml = require("../functtions/printCommitmentSheet/insertDataWaferInHtml");
const { reportStatus } = require("../functtions/reportStatus");
const { insertDniInHtml } = require("../functtions/printCommitmentSheet/insertDniInHtml");
const { corroborateAllData } = require("../functtions/printCommitmentSheet/corroborateAllData");
const { returnFirstData } = require("../functtions/printCommitmentSheet/returnFirstData");
const { insertCilinders } = require("../functtions/printCommitmentSheet/insertCilinders");
const { insertValves } = require("../functtions/printCommitmentSheet/insertValves");
const { answers } = require("../functtions/printCommitmentSheet/answers");
const { insertClientData } = require("../functtions/printCommitmentSheet/insertClientData");
const db                    = dbRed.getDb(__dirname);
const goToPrint             = document.getElementById("printButton");
let getCilinderSavedInputs = document.querySelectorAll(".dataInput"); 
let getCilinderSavedData = "";
let answerCilinderSaved = "";
let defaultDomain       = "";
let waferExist          = 0;
let dataCilinder = [];
let dateNew             = new Date();
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
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
        })
    })
} 
// estas 2 variables se usan en el modulo collectData para alacenar el numero y codigo de cilindro, y se usan en updateDataSaved
let pairOmologationCils     = [];
let pairSerialNumberCils    = [];
window.onload = async()=>{
    // si es una oblea para exportar cambia el boton a "Guardar"
    if(localStorage.getItem("exportWaferToEnergas")){
        console.log("para cobrar");
        document.querySelector(".printContent").innerHTML='<button id="exportToEnergas">Guardar</button>';
    }

    // al presionar enter sobre la fecha de habilitacion se le suman +5 años y se inserta en html
    chekeddate.addEventListener("keyup"  , (e)=>{
        if(e.key =="Enter"){
            let getDateNow = chekeddate.value.split("/").slice(0,-1);

            let newDate = parseInt(chekeddate.value.split("/").slice(-1))+5;
            getDateNow.push(newDate);
            finishDateContent.value=getDateNow.join("/");
        }
    });
    // al apretar enter en dni busca si existe o y lo inserta
    document.getElementById("dniUser").addEventListener("keyup" , async(e)=>{
        if(e.key=="Enter"){
            await insertDniInHtml(e.target.value );
        }
    });
    // busca el codigo postal y la localidad
    country.addEventListener("keyup",async(e)=>{
        if(e.key=="Enter"){
            let searchLocatins = await allAnswer(`SELECT name ,cp FROM locations WHERE name LIKE '%'|| '${e.target.value}' || '%' LIMIT 1`);
            if(searchLocatins.length>0){
                e.target.value  = searchLocatins[0]["name"];
                cp.value        = searchLocatins[0]["cp"];
            }
        }
    });
    // obtiene todos los modelos y marcas de vehiculos y los inserta en los divs correspondientes
    brandsAndModelsCarsDefault.brandsAndModelsCarsDefault();


    // obtiene todos los id de los campos para hacer la consulta 
    for (let i = 0; i <= 10; i++) {
        const element = getCilinderSavedInputs[i].id;
        if(element=="omologation0"){
        }else{
            answerCilinderSaved+= `${element},`;
        }
    }
    // busca el modelo y marca autocompletando los campos
    await runSearch.runSearch("modelCar" , inputContainerSearchContentModel);
    await runSearch.runSearch("brandCar" , inputContainerSearchContentBrand);
    // controlador de los controlees de marca y modelo
    await collectDataController.collectDataController();

    
    // carga los datos por defecto del  cilindro
    if(localStorage.getItem("idCilinderSaved") || localStorage.getItem("idWaferSaved")){
        await insertDataWaferInHtml.insertDataWaferInHtml();
    }else{
       let getWsCode = await allAnswer(`SELECT workshopcode FROM tdm WHERE id ='${localStorage.getItem("idWorkShop")}'`);
       workshopcode.value   = getWsCode[0]["workshopcode"];
       chekeddate.value     = `${dateNew.getDate()}/${dateNew.getMonth()+1}/${dateNew.getFullYear()}`;
       finishDate.value     = `${dateNew.getDate()}/${dateNew.getMonth()+1}/${dateNew.getFullYear()+5}`;
    }

    // al hacer click en el boton imprimir
    goToPrint.addEventListener( "click", async()=>{

        if(document.getElementById("wafer").value.length<=0 || document.getElementById("wafer").value=="NO"){
            reportStatus("Error", "Oblea anterior invalida" , "El numero de oblea anterior que fué ingresado es invalido" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
        }else{
            await collectData.collectData();
            // funcion que guarda o actualiza la oblea en la tabla wafersdata
            await saveWaferInDb();
            
            await updateDataSaved(getCilinderSavedData );  
          
           ipcRenderer.send("printWafer");
           window.close();
        }
    });

    window.addEventListener("beforeunload" , ()=>{
        localStorage.removeItem("idCilindersaved");
        localStorage.removeItem("cilinderInfo");
        localStorage.removeItem("idWaferSaved");
        localStorage.removeItem("newOblea");
    });

    // al presionar "guardar" , se dirige a la seccion de cobros para cobrar la oblea

        document.getElementById("exportToEnergas").addEventListener("click",async()=>{
            // obtiene los primeros 0 a 5 valores del txt y los retorna en un objeto
            let firstData = await returnFirstData();
            
            // obteine los datos del regulador y crea la oblea general
            await corroborateAllData(firstData);
            
            // obtiene los datos de los cilindros
            await insertCilinders(firstData);

            // obtiene los datos de la valvula
            await insertValves(firstData);

            // obtiene los datos del cliente
            await insertClientData(firstData);

            return
        
            if(document.getElementById("wafer").value.length<=0 || document.getElementById("wafer").value=="NO"){
                reportStatus("Error", "Oblea anterior invalida" , "El numero de oblea anterior que fué ingresado es invalido" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
            }else{
                // recolecta todos los datos de la oblea y los almacena en localStorage
                await collectData.collectData();
        
                // guarda o actualiza la oblea
                await saveWaferInDb("toExport");

                // actualiza los datos del cilindro comprometido con la oblea
                await updateDataSaved(getCilinderSavedData );
                
                localStorage.setItem("exportWaferToEnergas" , document.getElementById("domain").value);
                ipcRenderer.send("payCilinder");
                window.close();
            }
        })
    
}

