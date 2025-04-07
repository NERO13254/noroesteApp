const {ipcRenderer}     = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);

var date            = document.getElementById("date");
const functions     = require("../functtions/voucherFun");
const addProdToList = require("../functtions/voucherFunctions/addProdhtml");
const printference  = require("../functtions/guide");
const applyDiscoun  = require("../functtions/voucherFunctions/applyDiscount");
const deleteProductOfList   = require("../functtions/voucherFunctions/deleteProductOfList");
const saveVoucherFunc       = require("../functtions/voucherFunctions/saveVoucher");
const saveTotalVoucher      = require("../functtions/voucherFunctions/saveVoucherFunc");
const addSerialToListSerials= require("../functtions/voucherFunctions/addSerialToListSerials");
const saveVoucherForClient  = require("../functtions/voucherFunctions/saveVoucherForClient");
const addToCartSerial       = require("../functtions/voucherFunctions/addSerialToCart");
const saveInMerchSold       = require("../functtions/voucherFunctions/saveInMerchSold");
const modifyAmmountProduct  = require("../functtions/voucherFunctions/modifyAmmountProduct");
const addProductSearchedToHtml  = require("../functtions/voucherFunctions/addProductSearchedToHtml");
const printKitsInHtml       = require("../functtions/voucherFunctions/printKitsInHtml");
const {validateKit , validateSerial, validateProduct }   = require("../functtions/voucherFunctions/valdateTypeProduct");
const startSearchProduct    = require("../functtions/voucherFunctions/startSearchProduct");
const addKitToHtml          = require("../functtions/voucherFunctions/addKitToHtml");
const backBtn       = require("../functtions/backBtn");
const reportStatus  = require("../functtions/reportStatus");
var idWorkShop      = localStorage.getItem("idCtaCte");
var runAlert        = require("../functtions/alertFun");
var containerSearch = document.getElementById("containerSearcher");
var idProd          = document.getElementById("insideidProd");
var dbIdProd        = document.getElementById("dbIdProd");
var nameProd        = document.getElementById("nameProd");
var value           = document.getElementById("value");
var addProdList     = document.getElementById("addProdList");
var listProdContent = document.getElementById("listProdContent");
var listSerial      = document.getElementById("listSerial");
var saveVoucher     = document.getElementById("saveVoucher");
var totalValue      = document.getElementById("totalValue");
var searchKit       = document.getElementById("searchKit");
const backBtnDiv    = document.getElementById("backBtnDiv");
let serialContainer = document.getElementById("listSerial");
var guideContain    = document.getElementById("guideContain");
var discount        = document.getElementById("discount");
var nameVoucherCte  = document.getElementById("nameVoucherCtaCte");
let kitContainerResults = document.getElementById("kitContainerResults");
let quitWindowKits  = document.getElementById("quitWindowKits");
let ammount         = document.getElementById("ammount");
let createRef = [ {name : "COD INT"}, {name : "NME"} , {name : "VAL"} , {name : "C/U"} , {name: "TOTAL"} ];
printference.printGuide(createRef , guideContain );

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){console.log(err.message);}else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err,)=>{
            if(err){console.log(err.message);}else{
                resolve();
            }
        })
    })
}
// boton para volver atrás
backBtn.backBtn(backBtnDiv , "restoreWindow");


window.onload = async()=>{
    var getAllProducts = await allAnswer("SELECT * FROM products WHERE 1");
    // inserta el nombre de la cta cte en el html
    if(!localStorage.getItem("finalConsumer")){
    const getName               = await allAnswer(`SELECT name FROM cuentascorrientes WHERE id =${idWorkShop}`)
    nameVoucherCte.textContent  = getName[0]["name"];
    }else{
        nameVoucherCte.textContent  = "CONSUMIDOR FINAL"; 
    }

    // modulo que modifica la cantidad segun lo requirea el usuario y actualiza los totales dinamicamente
    listProdContent.addEventListener("focusout", (e)=>{
        if(e.target.getAttribute("name")=="ammounProd"){
           modifyAmmountProduct.modifyAmmountProduct(e); 
           applyDiscoun.applyDiscoun();
        }
    });
    // al presionar una tecla en el buscador se implementa el modulo de busqueda
    let searchFor   = document.getElementById("searchFor");
    document.getElementById("startSearchProd").addEventListener("keyup" , async(e)=>{
        if(e.target.value.length>2){
            let getProducts = await allAnswer(`SELECT * FROM products WHERE name LIKE '%' || '${e.target.value}' || '%' `)
            startSearchProduct.startSearchProduct(e, getProducts );
            listSerial.innerHTML=''
            let getData = document.getElementsByClassName("cilData")[0].querySelectorAll(".inputProd")
            getData.forEach(element=>{
                element.children[0].textContent=''
                element.children[0].value=''
            });
        }else{
            contentProducts.innerHTML = "";
            contentProducts.style.display="none";
        }
    });
    // al seleccionar un producto de la lista implementa el modulo para añadirlo al html
    contentProducts.addEventListener("click" , (e)=>{
        addProductSearchedToHtml.addProductSearchedToHtml(e.target);
        applyDiscoun.applyDiscoun();
    });
    addProdList.addEventListener("click" , ()=>{
        // corrobora que se haya seleccionado un producto sino despliega la alerta
        if(!document.getElementById("insideidProd").textContent){
            reportStatus.reportStatus("Aviso de Selección de Producto" ,"No se ha seleccionado ningún producto","No es posible añadir un producto a la lista sin seleccionar uno primero. Para hacerlo, presione 'Buscar artículo' y escriba el nombre del producto que desea agregar." , 1 , ["Aceptar"] , ["canelProcess"] , alertContainer)
        }else{
            alertContainer.innerHTML=""
            // añade el producto (serie o producto) y le aplica el descuento
            addProdToList.addProductToList();
        }
    });

    var namesInsdeId = [];
    var num =0;
    // al darle click a alguna serie se inserta en el html
    serialContainer.addEventListener("click", async(e)=>{
    if(e.target.className.charAt(0) == "s" && e.target.getAttribute("type")=="checkbox"){
        let getColor = await addProdToList.addProductToList("conditional");
        addToCartSerial.addToCartSerial(e , getColor);
        applyDiscoun.applyDiscoun();
    }
    })

    // BUSCA EL KIT EN LA LISTA DE KITS Y LOS IMPRIME EN EL HTML
    searchKit.addEventListener("click"  ,()=>{
        document.getElementsByClassName("kitContainer")[0].classList.toggle("show");
        printKitsInHtml.printKitsInHtml();
        // aplica el descuento
        applyDiscoun.applyDiscoun();
    });
    // añade el kit a la lista
    kitContainerResults.addEventListener("click" , (e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            addKitToHtml.addKitToHtml(e.target);
            // aplica el descuento
            applyDiscoun.applyDiscoun();
        }
    });
    // cierra la ventana de kits
    quitWindowKits.addEventListener("click" , ()=>{
        document.getElementsByClassName("kitContainer")[0].classList.toggle("show");
    })


    // ESTE EVENTO ELIMINA LOS PRODUCTOS DE LA LISTA
    listProdContent.addEventListener("click" , (e)=>{
        deleteProductOfList.deleteProductOfList(e);
        // aplica el descuento
        applyDiscoun.applyDiscoun();
    });
    // funcion que guarda el remito
    saveVoucher.addEventListener("click" , async()=>{
        let getAllProducts = await allAnswer("SELECT * FROM products WHERE 1");
        console.log("va por aca")
        await saveInMerchSold.saveInMerchSold(getAllProducts);
        await saveTotalVoucher.saveVoucherFunc();
    });

    // logica del descuento 
    discount.addEventListener("keyup" , (e)=>{
        applyDiscoun.applyDiscoun();
    });
}

var allDate = new Date();
var day     = allDate.getDate();
var month   = allDate.getMonth()+1;
var year    = allDate.getFullYear();

var hours   = allDate.getHours();
var minute  = allDate.getMinutes();

function getOb(data){
    let toObjet = JSON.parse(data[0]["serial"]);
    return toObjet;
}
// REFRESCA LAS SERIES DEL PRODUCTO EN EL HTML
function reloadSerial(data){    
    getOb(data);

    for (let i =0; i < getOb(data).length; i++) {
        const element = getOb(data)[i];
        let div         = document.createElement("div");
        div.className   = "serialContent";
        div.innerHTML   =`
        <input type="checkbox" class="F${element.id}">
        <strong>${element.name}</strong>
        `;
        listSerial.append(div);
    }
    
}


db.all("SELECT  insideid FROM vouchers ORDER BY id DESC LIMIT 1 " , (err, row)=>{
    if(err){
        console.log(err.message);
    }else{
    var insideid = 1;
    if(row[0]["insideid"] < 10){
        insideid = 8879;
    } 
    else{
        insideid = row[0]["insideid"] + 1; 
    }

    date.textContent = `${hours}: ${minute} ${day}/${month}/${year}`;
}
});


