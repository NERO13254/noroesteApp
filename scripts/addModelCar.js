const {ipcRenderer} = require("electron");
const dbRed         = require("../db/dbRed");
const db            = dbRed.getDb(__dirname);
const brand         = document.getElementById("brand"); 
const model         = document.getElementById("model");
const alert         = document.getElementById("alert");
const quitForm      = document.getElementById("quitForm");
const seeCarsSaved  = document.getElementById("seeCarsSaved");
const inputContainerSearchContent = document.getElementById("inputContainerSearchContent");
let getTarget       = document.getElementById("modifyCarController");
const deleteCar       = document.getElementById("deleteCar");
const addModelCar   = document.getElementById("addModelCar");
const reportStatus  = require("../functtions/reportStatus");
const loadCarsSaved = require("../functtions/addModelCar/loadCarsSaved");
const desplegateCarController = require("../functtions/addModelCar/desplegateCarController");
const addCarToDb    = require("../functtions/addModelCar/addCarToDb");
const updateCarSaved= require("../functtions/addModelCar/updateCarSaved");
const addNewCar     = require("../functtions/addModelCar/addNewCar");
let idCarSelected ="";

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
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

window.onload = async()=>{
    // carga los modelos de atuos por defecto
    loadCarsSaved.loadCarsSaved();
    // abre la ventana para modificar el auto
    seeCarsSaved.addEventListener("click" , (e)=>{
        idCarSelected = e.target.id;
        if(e.target.getAttribute("type")=="checkbox"){
            desplegateCarController.desplegateCarController(e.target); 
        }
    });
    // guarda el modelo y marca que fué modificado
    saveModifyCar.addEventListener("click" , async()=>{
        updateCarSaved.updateCarSaved();
    })
    //elimina el modelo y marca guardado
    deleteCar.addEventListener("click" , ()=>{
        reportStatus.reportStatus("Aviso de preservación de datos", "Estas por eliminar un dato de forma permanente", "Si eliminas el modelo y marca , estos se borraran de forma definitiva ¿está seguro que desea proceder?" , 2 , ["Cancelar" ,"Borrar"] , ["canelProcess", "deleteProduct"], document.getElementById("reportStatus"));
        if(document.getElementById("deleteProduct")){
            deleteProduct.addEventListener("click" , async()=>{
                await runAnswer(`DELETE FROM cars WHERE id ='${idCarSelected}'`);
                document.getElementsByClassName("deleteOrtherProductAlert")[0].style.display="none";
                modifyCarController.classList.toggle("show");
                loadCarsSaved.loadCarsSaved();
            })
        }
    });
    // cierra la ventana de modificación del auto
    let quitModifyCar = document.getElementById("quitModifyCar");
    quitModifyCar.addEventListener("click" , ()=>{
        getTarget.classList.toggle("show");
    });
    // muestra la ventana para agregar un nuevo modelo de auto
    addModelCar.addEventListener("click" , ()=>{
        addNewCar.addNewCar();
    });
    // al pesionar agregar modelo de auto lo añade a la db y a la lista del html
    document.getElementById("saveNewCar").addEventListener("click" , async()=>{
        let corroborateModels = await allAnswer(`SELECT id FROM cars WHERE model='${modelCarInput.value.toLowerCase()}'`);
        if(corroborateModels.length>0){
            reportStatus.reportStatus("Error", "Modelo ya existente", "El modelo que intenta agregar ya se encuentra guardado , corrobore que haya escrito el nombre correctamente" , 1 , ["Aceptar"] , ["canelProcess"], document.getElementById("reportStatus"));
        }else{
            await addCarToDb.addCarToDb(
            Array.from(document.querySelectorAll(".containerBrand")),
            newBrandCar.value.toUpperCase().trim(),
            document.getElementById("newModelCarInput").value.toLowerCase().trim()
            );

            addNewCar.addNewCar();
            loadCarsSaved.loadCarsSaved();
        }
    });
    document.getElementById("quitNewCar").addEventListener("click"  , ( )=>{
        addNewCar.addNewCar();
    });
}


// cierra laa ventana 
quitForm.addEventListener("click" , ()=>{
    window.close();
});