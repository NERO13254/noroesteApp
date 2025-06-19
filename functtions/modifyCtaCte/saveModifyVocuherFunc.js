const { answers } = require("./answers");

async function saveModifyVocuherFunc(data) {

    // obtiene todos los elementos de la lista de productos modificados
    let getData = Array.from(document.getElementById("listProducts").querySelectorAll(".productContent"));

    // recorre todos los productos y arma un array de objetos de cada producto
    let arrayToObjectProducts = [];
    getData.forEach(element=>{
        let dataContnet = element.children[2].tagName=="STRONG" ? element.children[2].textContent : element.children[2].value
        let objProd = {
            [element.children[0].id] : element.children[0].textContent ,
            [element.children[1].id] : element.children[1].textContent ,
            [element.children[2].id] : dataContnet ,
            [element.children[3].id] : element.children[3].textContent.replace(/\./g,"") ,
            [element.children[4].id] : "$"+element.children[4].textContent.replace(/\./g,"") ,
            [element.children[5].id] : element.children[5].textContent 
        }
        arrayToObjectProducts.push(objProd);
    });

    let discountContent = document.getElementById("descountInput").value;
    // añade el valor final y el decuento
    arrayToObjectProducts.push({"finVal":document.getElementById("totalValueOfVoucher").textContent.replace(/\./g,"")});
    arrayToObjectProducts.push({"discount":discountContent});
    // actualiza el contenido del remito en DB
    let obs = parseInt(document.getElementById("obs").value.split(" ")[1])
    await answers.updateContentVoucher(JSON.stringify(arrayToObjectProducts),discountContent,obs);
}

module.exports = {
    saveModifyVocuherFunc
}