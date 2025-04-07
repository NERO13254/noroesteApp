const dbRed                 = require("../db/dbRed");
const db                    = dbRed.getDb(__dirname);
const backBtn               = require("../functtions/backBtn");
const createProductBtn      = document.getElementById("createProduct");   
const allInputs             = document.querySelectorAll(".infoContainer");
const alertFun              = require("../functtions/alertFun");
const reportStatus          = require("../functtions/reportStatus");
const { ipcRenderer }       = require("electron");
const alertContainer        = document.getElementById("alertContainer");
const containerValGenerate  = document.getElementById("containerValGenerate");
const calculateValue        = document.getElementById("calculateValue");
const insertProduct         = require("../functtions/API/api-insert-product.js");
const axios                 = require("axios");
window.onload=()=>{
    backBtn.backBtn(document.getElementById("backElelemet") , "newProducts");
}
// calcula el valor de venta estimado y lo añade al html como dato informativo
allInputs[6].addEventListener("keyup" , ()=>{
    if(allInputs[6].value.length<=2 || isNaN(allInputs[6].value) ){
        calculateValue.style.display = "none";
    }else{
        calculateValue.style.display = "block";
        let calculateValueToSell = parseInt(allInputs[6].value) * 1.5; 
        containerValGenerate.textContent = calculateValueToSell.toLocaleString();
    }
});

createProductBtn.addEventListener("click" , ()=>{
// se asegura que se completen los campos obligatorios
if(allInputs[0].value.length==0  || allInputs[1].value.length==0  || allInputs[7].value.length==0  ){
    let messageVar ="";
    let num =0
    if(allInputs[0].value.length==0){
        messageVar ="CODIGO DE INTERNO INCOMPLETO";
    }else if(allInputs[1].value.length==0){
        messageVar ="NOMBRE INCOMPLETO";
    }else if(allInputs[7].value.length==0){
        messageVar ="VALOR DE VENTA INCOMPLETO";
    }
    console.log(messageVar)
    alertFun.alertFun(messageVar , alertContainer );
}else{

    alertContainer.innerHTML = "";
    reportStatus.reportStatus("aviso ", "ESTÁS POR CREAR UN NUEVO PRODUCTO" , "se añadirá un nuevo producto a la lista , corrobore que todos los campos sean correctos" , 2 , ["Cancelar" , ["Crear"]] , ["canelProcess" , "createProduct"], alertContainer);
    // CORROBORA SI EXISTE EL CODIGO DE INTERNO Y LO AÑADE
    
    document.getElementById("createProduct").addEventListener("click" , ()=>{
        db.all("SELECT insideid FROM products WHERE insideid= ?" , [allInputs[0].value] , (err ,  row)=>{
            if(err){
                console.log(err.message);
            }else{
                if(row.length==0){

                let infoProd = {
                    insideid    : allInputs[0].value ,
                    nameProd    : allInputs[1].value ,
                    finalVal    : allInputs[7].value
                }
                insertProduct.insertProduct(infoProd);

                    insertProduct.insertProduct();
                    db.run("INSERT INTO products (insideid , name , buyvalue , finalvalue , existence ,serial, path ,brand) VALUES  (?,?,?,?,?,?,?,?)" ,
                    [
                        allInputs[0].value ,
                        allInputs[1].value ,
                        allInputs[6].value ,
                        allInputs[7].value ,
                        allInputs[3].value ,
                        allInputs[4].value ,
                        allInputs[5].value ,
                        allInputs[2].value ], (err)=>{
                    if(err){
                        console.log(err.message);
                    }
                    else{
                        ipcRenderer.send("newProducts");
                        window.close();
                    }
                    });
                }else{
                    alertFun.alertFun("CODIGO DE INTERNO YA EXISTENTE" , alertContainer );
                }
            }
        });
    });
}
});