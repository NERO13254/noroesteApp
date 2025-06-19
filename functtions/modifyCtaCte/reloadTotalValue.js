const { reportStatus } = require("../reportStatus");

async function reloadTotalValue(getInputValue, getValueChanging , getTarget) {
    // siendo getInputValue el valor del input que está cambiando

    // corroborar que se haya ingresado un valor valido
    if(isNaN(getInputValue)){
        reportStatus("Error" , "Valor Invalido" , "El valor que desea agregar debe ser un numero , no debe contener letras ni simbolos" , 1 , ["Aceptar"] , ["canelProcess"],document.getElementById("alertContent"));
    }else{
        // getValueChanging es el valor base , antes de ser cambiado
        let getOldValue =  parseInt(getValueChanging.toString().replace(/\./g,""));
   
        let getTotal = parseInt(getTarget.parentNode.nextElementSibling.children[4].textContent.replace(/\./g,""));
    
        // obtiene el valor total por defecto menos el importe sumado para obtener el valor base sin sumas
        // asigna el valor total anterior a la variable global
        getOldValueContainer = getOldValue;
       
        // al valor base se le suma el valor cambiante para obtener el nuevo total
        getTotal = getTotal + getInputValue;
        // reemplaza el valor en el html
        total.value = getTotal.toLocaleString();
        // asigna el valor del input a la variable global
        getNewValue = getInputValue;
    }
}

module.exports = {
    reloadTotalValue
}