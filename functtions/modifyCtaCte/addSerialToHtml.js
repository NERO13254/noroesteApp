const { reportStatus } = require("../reportStatus");
const { addProduct } = require("./addProduct");
const { calculateNewTotalValue } = require("./calculateNewTotalValue");

async function addSerialToHtml(serial) {
    // obtiene el contenedor que fué clickeado al momento de seleccionar el producto (valvula gp18)
    let e = contentDivSelected;
    // evalua que no exista una serie igual en el HTML
    let dataFiltered = Array.from(document.querySelectorAll(".productContent"));
    let existences = dataFiltered.filter(data=>data.children[5].textContent==serial.target.parentNode.children[0].textContent)
    // en caso de que no exista la serie la añade al HTML y actualiza el valor total
    if(serial.target.getAttribute("type")=="checkbox" && existences.length<=0){
        obj = {
            "insideid":e.target.parentNode.children[0].textContent,
            "nameProd":e.target.parentNode.children[1].textContent,
            "ammounProd":0,
            "valueProd":e.target.parentNode.children[3].textContent,
            "totalValue":e.target.parentNode.children[3].textContent,
            "serialName":serial.target.parentNode.children[0].textContent
        }
        addProduct(obj);
        calculateNewTotalValue();
    
    }else if(serial.target.getAttribute("type")=="checkbox" && existences.length>0){
        // si se encuentra con que la serie ya está en el html lanza error
        reportStatus("Aviso","Serie ya en lista" , "La serie que intenta agregar ya se encuentra dentro del remito", 1 , ["Aceptar"], ["canelProcess"],  document.getElementById("alertContent"));
    }
}
module.exports = {
    addSerialToHtml
}