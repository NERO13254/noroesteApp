const { reportStatus } = require("../reportStatus");

async function addSerialToList(params) {
    let listProducts = document.getElementById("listProdContent");

    // evalua si existe la misma serie añadida 
    let corroborateSerial = false;
    let allData = listProducts.querySelectorAll(".contentProduct");
    allData.forEach(element => {
        if(element.children[4].textContent == params.parentNode.children[0].textContent.toUpperCase()){
            corroborateSerial = true;
        }
    });

    if(!corroborateSerial){
        // obtiene los datos del producto
        let div = document.createElement("div");
        div.className ="contentProduct";
        div.id = "serialProduct"
        document.querySelectorAll(".selectedProductContent strong").forEach(element=>{
            let strong = element.cloneNode(true);
            div.append(strong);
        });

        // inserta la serie del producto
        let serial = document.createElement("strong")
        serial.textContent = params.parentNode.children[0].textContent.toUpperCase();
        div.append(serial);

        let ammount = document.createElement("strong");
        ammount.textContent = "$ "+document.getElementById("finalvalue").textContent
        div.append(ammount);

        // inserta el boton "x"
        let btn = document.createElement("button");
        btn.textContent = "x";

        div.append(btn);

        listProducts.append(div);
        document.getElementById("startSearchProd").value='';
        document.getElementById("searchSerial").value='';
    }else{
        reportStatus("Error" , "Serie ya en lista" , "La serie que intenta agregar ya se encuentra en la lista" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"))
    }
}

module.exports = {
    addSerialToList
}