const { addSerials } = require("./addSerials");
const { getDataOfTheProduct, answers } = require("./answers");

async function addInputsHtml(){
    // obtiene todos los inputs 
    let getInputs = document.querySelectorAll(".infoContent");
    
    // obtiene los valores del producto seleccionado
    let getProducts = await answers.readDataProduct(localStorage.getItem("productsValues"));
    

    // bucle for que recorre y completa todos los campos del html
    getInputs.forEach(element => {
        // si no es el campo de existencias o foto solo inserta el valor de db en el input
        if(element.id!= "existence" && element.id!="path"){
            element.value = getProducts[0][element.id];
        }else{
            // variable que contiene cuantos productos quedan en stock
            if( element.id== "existence" ){
                let existences = getProducts[0]["existence"] ? getProducts[0]["existence"] : 0;
                element.value = parseInt(getProducts[0]["billed"]) +  existences;
            }
            else if(element.id=="path"){
                // inserta la foto del producto
                element.src = "../imgNoro/"+getProducts[0][element.id]
            }
        }
    });

    // si el producto tiene series añade el boton de series 
    if(getProducts[0]["serial"]=="SI"){
        let button = document.createElement("button");
        button.id = "addSerials";
        button.textContent = "Series";
        document.getElementsByClassName("buttonController")[1].append(button);
    }
}

module.exports = {
    addInputsHtml
}