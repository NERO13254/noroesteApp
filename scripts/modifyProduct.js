const {ipcRenderer}                 = require("electron");
const getDb                         = require("../db/dbRed");
const db                            = getDb.getDb(__dirname);
const axios                         = require("axios");
const path                          = require("path");
const sendPostApi                   = require("../functtions/API/updateProductApi");
const deleteApiProd                 = require("../functtions/API/api-dlete-product");
const addInputsHtml                 = require("../functtions/modifyProduct/addInputsHtml");
const deleteProductFun              = require("../functtions/modifyProduct/deleteProduct");
const addSerialsFunc                = require("../functtions/modifyProduct/addSerials");
const saveProductFunc               = require("../functtions/modifyProduct/saveProduct");
const createExistences              = require("../functtions/modifyProduct/createExistences");
const addSerialController           = require("../functtions/modifyProduct/addSerialController");
const backBtn                       = require("../functtions/backBtn");
const runAlert                      = require("../functtions/alertFun");
const reportStatus                  = require("../functtions/reportStatus");
const { succesAlert } = require("../functtions/succesAlert");
const quitModifyProd                = document.getElementById("backElelemet");
const getData                       = localStorage.getItem("productsValues");
const dataToObjet                   = JSON.parse(getData);
const saveProduct                   = document.getElementById("saveProduct");
const reportStatusContent           = document.getElementById("reportStatusContent");
const deleteProduct                 = document.getElementById("deleteProduct");
const addImgButton                  = document.getElementById("addOrChangeImg");
const modifyExistences              = document.getElementById("modifyExistences");

window.onload = async()=>{
    // boton para volver atras
    backBtn.backBtn(backElelemet,"newProducts");


    // rellena los campos del html con los datos del producto Y EL BOTON DE SERIES 
    // JUNTO CON TODOS SUS CONTROLADORES
    await addInputsHtml.addInputsHtml();

    
    // FUNCION PARA GUARDAR EL PRODUCTO
    saveProduct.addEventListener("click" , ()=>{
        saveProductFunc.saveProduct();
    });
    // Funcion para eliminar el producto
    deleteProduct.addEventListener("click" , ()=>{
        deleteProductFun.deleteProduct();
    });

    // al cargar una imagen en el input file habilia el boton para subir la imagen a web
    document.getElementById("addImg").addEventListener("change" , ()=>{
        console.log("cambio");
        document.getElementById("addImgButton").style.display='block';
    })

    // sube la imagen a web
    addImgButton.addEventListener("submit" , (e)=>{
        e.preventDefault();
        let formData = new FormData();
        let file = document.getElementById("addImg").files[0];
        formData.append("imagen" , file);
        let insideid = document.getElementById("insideid").value.trim();
        formData.append("insideid" , insideid );

        fetch("https://noroestecil.com/APIS/api-update-products-img.php" , {
            method : "POST" ,
            headers : {"authorization": "Jbm3PsdeASsnewoXyZbEz"},
            body : formData
        })
        .then(response=> response.text())
        .then(data=> succesAlert("Exito","La imagen se añadió a la web con exito",1,["cancelProcess"],["Aceptar"], document.getElementById("reportStatusContent")))
        .catch(error=> console.log(error));
    });
    // abre la seccion de modificar existencias
    let billedNumber    = JSON.parse(getData)[8]["billed"];
    let noBilledNumber  = JSON.parse(getData)[5]["existencias"];
    modifyExistences.addEventListener("click" , async()=>{
        await createExistences.createExistences(billedNumber,noBilledNumber);
    });
}