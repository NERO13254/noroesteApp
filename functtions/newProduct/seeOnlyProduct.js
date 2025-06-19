const { ipcRenderer } = require("electron");
const { deleteOnlyProductToWeb } = require("./deleteOnlyProductToWeb");
const { addOnlyProductToWeb } = require("./addOnlyProductToWeb");
const {adminInfo}= require("../../adminInfo");

async function seeOnlyProduct(e) {
    let getDataAcces = localStorage.getItem("userAdmin").split(",");
    
    if(adminInfo[0]!= getDataAcces[0].toLowerCase() || adminInfo[1]!= getDataAcces[1].toLowerCase()){
        saveProduct.style.display="none";
        document.querySelector(".configContent").style.display='none';
        containerAllProducts.addEventListener("click" , ()=>{
            reportStatus.reportStatus("Aviso de seguridad" , "PERMISO DENEGADO" , "no cuenta con los permisos necesarios para ejecutar esta accion" , 1 , ["Aceptar"], ["canelProcess"] , document.getElementById("alertElement") );
        });
    }else{
        // si se selecciona el producto se redirige a la sección de modificación
        if(e.target.getAttribute("type")=="checkbox"){
            localStorage.setItem("productsValues" , e.target.className);
            ipcRenderer.send("goToModifyProduct");
            window.close();
        }


        // al presionar el boton "+" se añade a la lista de prodcutos de la web
        if(e.target.tagName=="BUTTON" && e.target.id=="addProductInWeb"){
            await addOnlyProductToWeb(e.target.parentNode);

        }else if(e.target.tagName=="BUTTON" && e.target.id=="downProductOfWeb"){

            // si se presiona el boton "-" se elimina de la web
            await deleteOnlyProductToWeb(e.target.parentNode);
        }
    }
}


module.exports = {
    seeOnlyProduct
}