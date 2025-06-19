const { reportStatus } = require("../reportStatus");

function addProductToList() {
    // obtiene todos los datos del producto y el contenedor a donde se quiere agregar
    let data = document.querySelectorAll(".selectedProductContent .dataPrduct");
    let listProdContent = document.getElementById("listProdContent");
    let evaluate = false

    // evalua que no se encuentre el producto en la lista
    document.querySelectorAll(".listProducts .contentProduct").forEach(element=>{
       evaluate = element.children[0].textContent == document.getElementById("insideid").textContent ? true : false
    });

    // si el producto no se encuentra en la lista , lo agrega
    if(!evaluate){
        // crea el div que contene los datos del producto
        let div = document.createElement("div");
        div.className = "contentProduct";

        // rellena el div con los datos y la cantidad 
        data.forEach(element=>{
            let input = "";
            if(element.getAttribute("type")=="number"){
                input = document.createElement("input");
                input.type='number';
                input.value = element.value;
            }else {
                // inserta el valor del produco
                input = document.createElement("strong");
                input.textContent = element.textContent;
            }
            div.append(input);
        });

        // crea el valor total parcial del producto
        let totalPartial = document.createElement("strong");
        let ammount         = parseInt(document.getElementById("ammount").value);
        let productValue    = parseInt(document.getElementById("finalvalue").textContent.replace(/\./g,""))

        totalPartial.innerHTML = `$ ${ parseInt(ammount * productValue).toLocaleString()}`;
        div.append(totalPartial);

        let btn = document.createElement("button");
        btn.textContent = "x";
        div.append(btn);
        listProdContent.prepend(div);

        // oculta la vista previa y el buscador
        document.querySelector(".selectedProductContent").style.display='none';
        document.getElementById("contentProducts").style.display='none';
        document.querySelector(".generalSerials").style.display='none';
        document.getElementById("startSearchProd").value='';
        document.getElementById("ammount").value='1';
        document.getElementById("listSerial").innerHTML='';
    }else{
        reportStatus("Error" , "Producto ya en la lista" , "El producto ya se encuentra en la lisa" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"))
    }
}

module.exports = {
    addProductToList
}