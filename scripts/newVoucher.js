const backBtn       = require("../functtions/backBtn");
const reportStatus  = require("../functtions/reportStatus");
const { addProductToList } = require("../functtions/voucherFunctions/addProductToList");
const { addProductToSeePrevious } = require("../functtions/voucherFunctions/addProductToSeePrevious");
const { addSerialToList } = require("../functtions/voucherFunctions/addSerialToList");
const { insertNameCtaCte } = require("../functtions/voucherFunctions/insertNameCtaCte");
const { searchKits } = require("../functtions/voucherFunctions/searchKits");
const { searchProduct } = require("../functtions/voucherFunctions/searchProduct");
const {calculateTotal} = require("../functtions/voucherFunctions/calculateTotal");
const { searchSerial } = require("../functtions/voucherFunctions/searchSerial");
const { createNewSerial } = require("../functtions/voucherFunctions/createNewSerial");
const { createPayOrDebitRegister } = require("../functtions/voucherFunctions/createPayOrDebitRegister");
const { createVoucherRegister } = require("../functtions/voucherFunctions/createVoucherRegister");
const { refreshExistences } = require("../functtions/voucherFunctions/refreshExistences");
const { saveInMerchSold } = require("../functtions/voucherFunctions/saveInMerchSold");
const { ipcRenderer } = require("electron/renderer");
const { calculatePartialValuePrduct } = require("../functtions/voucherFunctions/calculatePartialValuePrduct");
const { removeSerial } = require("../functtions/voucherFunctions/removeSerial");

window.onload = async()=>{
    // boton para volver atrás
    backBtn.backBtn(document.getElementById("backBtnDiv") , "restoreWindow");
    
    // inserta el nombre de la cta cte en el html
    await insertNameCtaCte();

    // busca el producto especificado por el usuario
    document.getElementById("startSearchProd").addEventListener("keyup", async(e)=>{
        e.target.value.length > 1
        ? 
        await searchProduct(e.target.value)
        : 
        document.getElementById("searchContent").style.display="none";
    });

    // añade el producto a la vista previa 
    document.getElementById("contentProducts").addEventListener("click" , async(e)=>{
       e.target.getAttribute("type")=='checkbox' ? await addProductToSeePrevious(e) : "" ;
    })

    // al presionar "+" en la lista previa añade el producto a la lista
    document.getElementById("addProdList").addEventListener("click" , async()=>{
        addProductToList();
        await calculateTotal();
    });

    // al presionar alguna serie , la añade a la lista
    document.querySelector(".generalSerials").addEventListener("click" , (e)=>{
        e.target.getAttribute("type")=="checkbox" ? (addSerialToList(e.target) , calculateTotal()) : "";
    })

    // buscador de series
    document.getElementById("searchSerial").addEventListener("keyup" , (e)=>{
        searchSerial(e.target.value);
    });

    // al presionar "+" en el buscador de series
    document.getElementById("createSerial").addEventListener("click" , ()=>{
        document.querySelector(".addSerialController").classList.toggle("show")
    });

    // al presionar "cancelar" en el menu nueva serie
    document.getElementById("cancelAddNewSerial").addEventListener("click" , ()=>{
        document.querySelector(".addSerialController").classList.toggle("show")
    });
    
    // al presionar "crear" en el menu nueva serie 
    document.getElementById("createNewSerialController").addEventListener("click" , async()=>{
       await createNewSerial();
    }) 

    // Busca los kits en la lista , y al seleccionar alguno lo añade a la lista
    document.getElementById("searchKit").addEventListener("click"  , async()=>{
        document.getElementsByClassName("kitContainer")[0].classList.toggle("show");
        await searchKits();
    });

    // cierra la ventana de kits
    document.getElementById("quitWindowKits").addEventListener("click" , ()=>{
        document.getElementsByClassName("kitContainer")[0].classList.toggle("show");
    });

    // modifica el valor total parcial al cambiar la cantidad
    document.getElementById("listProdContent").addEventListener("keyup"  , async(e)=>{
        e.target.tagName=="INPUT" ? (await calculateTotal() , calculatePartialValuePrduct(e.target)) : "";
    });

    // elimina el producto de la lista
    document.getElementById("listProdContent").addEventListener("click" , (e)=>{
        e.target.textContent=="x" ? e.target.parentNode.remove() : "";
        calculateTotal();
    });

    // al modificar el descuento
    document.getElementById("discount").addEventListener("keyup" , ()=>{
        calculateTotal();
    });

    // guarda el remito
    document.getElementById("saveVoucher").addEventListener("click" , async()=>{
        // obtiene la fecha
        let date = new Date();
        let completeDate = `${date.getHours()}:${date.getMinutes()}   ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    
        // inserta el registro en pagos y debitos
        await createPayOrDebitRegister(completeDate);

        // quita las series del stock y actualiza las existencias
        //  ( en caso de tener series compuestas las inserta en mercaderia vendida directamente)
        await refreshExistences();

        // guarda la mercadería vendida
        await saveInMerchSold();
        
        // remueve las series 
        await removeSerial();


        // crea el remito  
        await createVoucherRegister(completeDate);
        ipcRenderer.send("printVoucher");
        window.close();
    });
}