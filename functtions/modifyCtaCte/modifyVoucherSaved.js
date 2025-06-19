const {searchProdsInDb} = require("./searchProdsInDb");
const {addProductToListFromDb} = require("./addProductToListFromDb");
const {calculateNewTotalValue} = require("./calculateNewTotalValue");
const { answers } = require("./answers");
const { printVoucherProductsInHtml } = require("./printVoucherProductsInHtml");
const { reportStatus } = require("../reportStatus");

async function modifyVoucherSaved(e, idVoucherContent) {
    
    let obs = document.getElementById("obs").value.split(" ");
    obs = (obs[0]=="RMTO" && !isNaN(parseInt(obs[1])) ) ? parseInt(obs[1]) : -1;
   

    let voucherFound = await answers.collectDataVoucher(obs);

    if(voucherFound.length>0){

        let listProducts                = document.getElementById("listProducts");
        let discountContent             = document.getElementById("descountInput");
        let searchProductOnDb           = document.getElementById("searchProductOnDb");
        let resultsOfTheSearchProdsOnDb = document.getElementById("resultsOfTheSearchProdsOnDb");

        // muestra el contenedor de productos del remito y lo limpia
        document.getElementById("modifyVoucherSaved").style.display="grid"
        document.getElementById("alertContent").textContent="";
        listProducts.innerHTML="";


        // obtiene el contenido del remito y lo imprime en el html
        printVoucherProductsInHtml(JSON.parse(voucherFound[0]["content"]));
        voucherNumber = idVoucherContent[0]["insideid"];
    

        // controlador de cantidades
        listProducts.addEventListener("change" , (e)=>{
            calculateNewTotalValue(e);
        });
        // remueve el elemento al presionar X
        listProducts.addEventListener("click" , (e)=>{
            if(e.target.className=="removeItemOfTheList" && e.target.tagName=='INPUT' ){
                e.target.parentNode.remove();
                calculateNewTotalValue();
            }
        });

        // busca los productos en db segun lo que escriba el usuario en input buscar
        searchProductOnDb.addEventListener("keyup" , async(e)=>{
            await searchProdsInDb(e);
        });
        
        // al seleccinar un elemento de la lista se evalua si no está en la lista y se agrega
        resultsOfTheSearchProdsOnDb.addEventListener("click" ,async(e)=>{
            if(e.target.getAttribute("type")=='checkbox'){
                await addProductToListFromDb(e);
                contentDivSelected = e;
            }
        });
        // al cambiar el descuento se actualiza el total
        discountContent.addEventListener("keyup" , ()=>{
            //actualiza el total
            calculateNewTotalValue();
        });
    }
    else{
        reportStatus("Error", "Este registro no contiene un remito", "El registro no está asociado a un remito,debido a que es otro tipo de operación", 1 , ["Aceptar"], ["canelProcess"], document.getElementById("alertContent"))
    }
}

module.exports = {
    modifyVoucherSaved
}