const { reportStatus } = require("../reportStatus");
const { succesAlert } = require("../succesAlert");
const { answer } = require("./answers");
async function deleteOnlyProductToWeb(params) {
    
    let arrOb = {
        "insideid": params.children[1].textContent
    };

    // obtiene la ruta y la autorizacion
    const pathApi = 'https://noroestecil.com/APIS/api-delete-products.php';
    const passwordApi = 'Jbm3PsdeASsnewoXyZbEz';

    // envia los datos a la web
    fetch(pathApi , {
        method : "POST",
        headers  : {Authorization : passwordApi},
        body  : JSON.stringify(arrOb)
    })
    .then(response=> response.text())
    .then(async()=>{
        // si el producto se oculta con exito lanza una alerta 
        succesAlert("Exito" , "Articulo removido de la web" , 1 , ["cancelProcess"], ["Aceptar"] , document.getElementById("alertElement") );
        searchConainer.style.display="none";
        params.style.borderRight = "6px solid red";

        // actualiza el producto en db
        await answer.updateWebProduct("NO" , params.children[1].textContent);
    })
    .catch(()=>{alert("ups , algo salió mal")});
}

module.exports = {
    deleteOnlyProductToWeb
}