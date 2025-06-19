const { reportStatus } = require("../reportStatus");
const { succesAlert } = require("../succesAlert");
const { answer } = require("./answers");
async function addOnlyProductToWeb(params) {
    // obtiene los valores del producto que se quiere agregar y los almacena en un objeto
    let arrOb = {
        "insideid": params.children[1].textContent,
        "nameProd" : params.children[2].textContent,
        "finalVal" : parseInt(params.children[5].textContent.trim().slice(1).replace(/\./g,""))
    };

    // obtiene la ruta y la autorizacion
    const pathApi = 'https://noroestecil.com/APIS/api-insert-product.php';
    const passwordApi = 'Jbm3PsdeASsnewoXyZbEz';

    // envia la info del producto 
    fetch(pathApi , {
        method : "POST" ,
        headers : { authorization : passwordApi},
        body : JSON.stringify(arrOb)
    })
    .then(response=> response.text())
    .then(async ()=>{
        // si el producto se añade a web con eixto lanza una alerta 
        succesAlert("Exito" , "Articulo añadido con éxito" , 1 , ["cancelProcess"], ["Aceptar"] , document.getElementById("alertElement") );
        searchConainer.style.display="none";
        params.style.borderRight = "6px solid green";

        // actualiza el producto en db
        await answer.updateWebProduct("SI" , params.children[1].textContent)
    })
    .catch(()=>{alert("ups algo salió mal")});
}

module.exports = {
    addOnlyProductToWeb
}