const {calculateNewTotalValue}= require("./calculateNewTotalValue");
const {reportStatus} = require("../reportStatus");
const { addProduct } = require("./addProduct");
const { answers } = require("./answers");

async function serialController(e) {
    let insideId = e.target.parentNode.children[0].textContent.slice(2);
    let nameProduct = e.target.parentNode.children[1].textContent.toUpperCase();
    //obtiene las series coincidientes de la base de datos
    let getSerials =  await answers.collectSerials(insideId,nameProduct);
    // si encuentra series las inserta en el html sino despliega una alerta donde dice que no tiene series
    if(getSerials.length>0){
        listOfSerialsProducts.innerHTML='';
        getSerials.forEach(element=>{
            let div = document.createElement("div");
            div.className="serialContentProduct";
            div.innerHTML = `
            <strong>${element["serial"]}</strong>
            <input type='checkbox'>
            `;
            listOfSerialsProducts.append(div);   
        });
    }else{
        // despliega la alerta que no tiene series
        reportStatus("Aviso", "No se encontraron series para este producto" , "puede cargar mas series en la seccion de productos" , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("alertContent"))
    }
    // elimina el buscador y su seccion de resultados
    resultsOfTheSearchProdsOnDb.style.display="none";
    resultsOfTheSearchProdsOnDb.innerHTML="";
}


module.exports = {
    serialController
}