const { ipcRenderer }   = require("electron");
const gudie             = require("../functtions/guide");
const {reloadListProducts}= require("../functtions/newProduct/reloadListProducts.js");
const {searchProduct}     = require("../functtions/newProduct/searchProduct.js");
const {backBtn}           = require("../functtions/backBtn.js");
const { seeOnlyProduct } = require("../functtions/newProduct/seeOnlyProduct.js");

window.onload = async()=>{
    // boton para volver atras
    backBtn(document.getElementById("backElelemet"));

    // crea e imprime la guia de los productos
    let createGuide = [{name:"ID"} , {name:"COD INT"}, {name:"NOMBRE"} , {name:"CANTIDAD"},  {name:"MARCA"} , {name:"VALOR"} ];
    gudie.printGuide(createGuide,document.getElementById("contentProductList"));

    // carga los poductos por defecto en HTML
    await reloadListProducts();

    // Buscador de productos
    document.getElementById("searcherIn").addEventListener("keyup",e=>{
        searchProduct(e.target.value.toUpperCase());
    })

    // Abre la seccion de kits
    document.getElementById("openKits").addEventListener("click" , ()=>{
        ipcRenderer.send("openKits");
        window.close();
    });

    // al hacer click en nuevo se dirige a la ventana de nuevo producto
     document.getElementById("saveProduct").addEventListener("click" , ()=>{
        ipcRenderer.send("addNewProductListProducts");
        window.close();
    });

    // al hacer click sobre algún prodcuto 
    document.getElementById("containerAllProducts").addEventListener("click" , async(e)=>{
       await seeOnlyProduct(e);
    });
}