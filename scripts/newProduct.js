const { ipcRenderer }   = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const gudie             = require("../functtions/guide");
const fs                = require("fs");
const insertProduct     = require("../functtions/API/api-insert-product.js");
const clickProdOfTheList= require("../functtions/newProduct/clickProdOfTheList.js");
const reloadListProducts= require("../functtions/newProduct/reloadListProducts.js");
const searchProduct     = require("../functtions/newProduct/searchProduct.js");
const addOnlyProductToWeb= require("../functtions/newProduct/addOnlyProductToWeb.js");
const deleteOnlyProductToWeb = require("../functtions/newProduct/deleteOnlyProductToWeb.js");
const backBtn           = require("../functtions/backBtn.js");
const reportStatus      = require("../functtions/reportStatus.js");
const succesAlert       = require("../functtions/succesAlert.js");
const adminInfo         = require("../adminInfo.js");
const axios             = require("axios");

var saveProduct     = document.getElementById("saveProduct");
var insideId        = document.getElementById("insideId");
var nameProd        = document.getElementById("name");
var valueProd       = document.getElementById("valueProd");
var serialNum       = document.getElementById("serialNum");
var prductsList     = document.getElementById("prductsList");
let containerAllProducts = document.getElementById("containerAllProducts")
var existences      = document.getElementById("existences");
var brand           = document.getElementById("brand");
var alert           = document.getElementById("alert");
var searchConainer  = document.getElementById("searchConainer");
var seacherInput    = document.getElementById("searcherIn");
var openKits        = document.getElementById("openKits");
var modifyProduct   = document.getElementById("modifyProduct");
var productId       = document.getElementById("productId");
var contentProduct  = document.getElementById("contentProductList");
var imgContent      = document.getElementById("imgContent");
var serialsContent  = document.getElementById("serialsContent");

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
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
// crea e imprime la guia de los productos
let createGuide = [{name:"ID"} , {name:"COD INT"}, {name:"NOMBRE"} , {name:"CANTIDAD"},  {name:"MARCA"} , {name:"VALOR"} ];
gudie.printGuide(createGuide,contentProduct);


// REDIRIGE A LA VENTANA DE KITS
openKits.addEventListener("click" , ()=>{
    ipcRenderer.send("openKits");
    window.close();
});
// ESTA FUNCION BUSCA LOS PRODUCTOS
function searchProductEvent(e){
    if(e.target.value.length >2){
        searchConainer.style.display="block";
        searchProduct.searchProduct(e.target.value.toUpperCase());
    }else{
        searchConainer.style.display="none";
    }
}

// boton para volver atras
backBtn.backBtn(document.getElementById("backElelemet"));


// al hacer click en nuevo se dirige a la ventana de nuevo producto
saveProduct.addEventListener("click" , ()=>{
    ipcRenderer.send("addNewProductListProducts");
    window.close();
});

window.onload = ()=>{
    // carga los poductos en el html
    reloadListProducts.reloadListProducts();

    // obtiene los valores de la contraseña de usuario y los convierte en un array
    let getDataAcces = localStorage.getItem("userAdmin").split(",");
    if(adminInfo.adminInfo[0]!= getDataAcces[0].toLowerCase() || adminInfo.adminInfo[1]!= getDataAcces[1].toLowerCase()){
        saveProduct.style.display="none";
        document.querySelector(".configContent").style.display='none';
        containerAllProducts.addEventListener("click" , ()=>{
            reportStatus.reportStatus("Aviso de seguridad" , "PERMISO DENEGADO" , "no cuenta con los permisos necesarios para ejecutar esta accion" , 1 , ["Aceptar"], ["canelProcess"] , document.getElementById("alertElement") );
        });
    }else{
        // al hacer click en un producto de la lista se obtienen los datos de este y se envian por localestorage
        // luego se abre la ventana para poder modificarlo
        containerAllProducts.addEventListener("click" , (e)=>{
            clickProdOfTheList.clickProdOfTheList(e);

            // al presionar el boton "+" de algún producto se añade a la lista de prodcutos visibles en la web
            if(e.target.tagName=="BUTTON" && e.target.id=="addProductInWeb"){
                addOnlyProductToWeb.addOnlyProductToWeb(e.target.parentNode);
            }else if(e.target.tagName=="BUTTON" && e.target.id=="downProductOfWeb"){
                deleteOnlyProductToWeb.deleteOnlyProductToWeb(e.target.parentNode);
            }
        });
    }
}