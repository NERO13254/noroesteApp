const { reportStatus } = require("../reportStatus");
const { loadDataSelected } = require("./loadDataSelected");

async function searchResultsForDate(generalDate) {
    // elimina los 0 de adelante al escribir la fecha -> 09/07/2025 = 9/7/2025
    let dateContent='';
    generalDate.forEach(element=>{
        dateContent+=element.value.trim().charAt(0)==0?element.value.trim().slice(1)+"/" : element.value+"/";
    });
    dateContent = dateContent.slice(0,-1);
    // evalua que el año contenga exactamente 4 digitos "2025"
    if(generalDate[2].value.trim().length!=4){
        reportStatus("Error","El año ingresado es invalido" , "Valor invalido , asegurese de ingresar 4 digitos en el campo del año , por ejemplo : 2025 " , 1 , ["Aceptar"], ["canelProcess"],document.getElementById("reportStatus"));
    }else{
        // carga los datos por defecto del día de hoy
        await loadDataSelected(dateContent);
    }
}

module.exports = {
    searchResultsForDate
}