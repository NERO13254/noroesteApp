const { reportStatus } = require("../reportStatus");
const { addProduct } = require("./addProduct");
const {addProductList} = require("./addProductList");
const { addSerialToHtml } = require("./addSerialToHtml");
const {calculateNewTotalValue} = require("./calculateNewTotalValue");

const {serialController}= require("./serialController");

async function addProductToListFromDb(e) {
    // obtiene el id del producto seleccionado
    let getId = e.target.parentNode.children[0].textContent;
    let listProducts = document.getElementById("listProducts");


    // si se selecciono un producto convencional corrobora que no se encuentre en la lista
    if(getId.charAt(0)=="P"){

        let data = e.target.parentNode;

        let getStrongs = Array.from(listProducts.querySelectorAll(".productContent"));
        let corroborateProd=getStrongs.filter(data=>data.children[0].textContent==getId.slice(2));

        // en caso de que se encuentre en la lista lanza un error
        if(corroborateProd.length>0){
            reportStatus("Error","Producto ya en lista", "El producto ya se encuentra en la lista , si quiere añadir el mismo producto lo puede hacer en las cantidades de este" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("alertContent"));
        }else{
            obj = {
                "insideid":data.children[0].textContent.slice(2),
                "nameProd":data.children[1].textContent,
                "ammounProd":1,
                "valueProd":data.children[3].textContent,
                "totalValue":data.children[3].textContent,
                "serialName":""
            }
            addProduct(obj);
        }
    }else if(getId.charAt(0)=="S"){
        await serialController(e);
    }

    let brandOrSerial = "";
    let typeProd = 0;

    document.getElementById("listOfSerialsProducts").addEventListener("click" , async(e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            // controlador que añade las series existentes y al seleccionar alguna se insertan en la lista
            await addSerialToHtml(e);
        }
    })

    
}

module.exports = {
    addProductToListFromDb
}