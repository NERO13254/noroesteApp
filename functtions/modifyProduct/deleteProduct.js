const { ipcRenderer } = require("electron");
const { answers } = require("./answers");
const {deleteProductApi} = require("../API/api-dlete-product");
const {reportStatus} = require("../reportStatus");

async function deleteProduct(){
    // lanza la alerta para asegurar que el usuario quiere elmiminar un producto 
    reportStatus("Alerta" , "Estas por Eliminar Un Producto" , "Si eliminas el producto puede que se pierda información relevante acerca de este , como las series o stock del mismo" , 2 , ["Cancelar" , "Eliminar"] , ["canelProcess", "deletePrduct"] , reportStatusContent);
    // añade un listener al boton de la alerta eliminar y si se presiona elimina el producto de db y la web
    document.getElementById("deletePrduct").addEventListener("click" , async()=>{
        let getInsideIdStorage  = JSON.parse(localStorage.getItem("productsValues"));
        let getInsideId         = document.getElementById("insideid");
        let ejecuteSentence     = 0;
        
        reportStatusContent.innerHtml = "";
    

        // elimina el producto de la base
        await answers.deleteProduct(getInsideIdStorage);
        // eleimina las series del producto 
        //await answers.deleteSerial(document.getElementById("name").value, document.getElementById("insideid").value);
        // envia la instruccion a la API para que se elimine el la WEB
        await deleteProductApi(String(getInsideId.value).trim().toUpperCase());
        
        // cierra la ventana
        ipcRenderer.send("newProducts");
        window.close();
    });
}
module.exports = {
    deleteProduct
}