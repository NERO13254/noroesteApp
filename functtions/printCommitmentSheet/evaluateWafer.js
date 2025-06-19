const { reportStatus } = require("../reportStatus");

async function evaluateWafer() {

    let evaluateWaferSucces = true;    
    // evalua que la valvula tenga un cilindro asignado
    document.querySelectorAll(".valveContent").forEach(element=>{
        if(element.children[0].value.length>0 && element.parentNode.children[0].value.length<=0){
            reportStatus("Error" , `Valvula sin cilindro`,`A la valvula ${element.children[0].value}: ${element.children[1].value} no se le asignó ningun cilindro`, 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
            evaluateWaferSucces = false;
        }
    });

    // evalua que los datos del cilindro estén completos
    document.querySelectorAll(".inputCilDataContent").forEach(element=>{
        if(element.children[0].value.length>0){
            // recorre todos los inputs y si encuentra alguno vacío retorna error
            element.querySelectorAll("input").forEach(dataInput=>{
                if(dataInput.value.length<=0){
                    console.log(dataInput)
                    console.log(dataInput.value);
                    console.log(dataInput.length);
                    reportStatus("Error" , "Datos del cilindro Incompletos" , `El campo de ${dataInput.id} de la sección de cilindros está vacía`,1 ,["Aceptar"] ,  ["canelProcess"] , document.getElementById("reportStatus"));
                    evaluateWaferSucces = false;
                }
            });
        }
    });

    // evalua que los datos del regulador sean correctos
    let regulatorData = document.querySelector(".regulatorInputContent");
    if(regulatorData.children[1].value.length<=0 || regulatorData.children[2].value.length<=0 || document.getElementById("typeOperationRegulator").value.length<=0 ){
        reportStatus("Error" , "Datos del Regulador Incompletos" , `Asegurese de completar los datos del regulador`,1 ,["Aceptar"] ,  ["canelProcess"] , document.getElementById("reportStatus"));
        evaluateWaferSucces = false;
    }

    // corrobora que se haya seleccionado por lo menos un tipo de tramite
    let corroborateOperation = false;
    let searchData = document.querySelectorAll(".operationType input");

    for (let i = 0; i < searchData.length; i++) {
        const element = searchData[i];

        if(element.checked==true){
            corroborateOperation = true;
            console.log("gooDelement")
            break
        }else{
            console.log("badEelement");
        }
    }

    if(!corroborateOperation){
        reportStatus("Error" , "Tipo de tramite incompleto" , `Asegurese de seleccionar el tipo de tramite que desea realizar`,1 ,["Aceptar"] ,  ["canelProcess"] , document.getElementById("reportStatus"));
        evaluateWaferSucces = false;
    }

    return evaluateWaferSucces;
}

module.exports = {
    evaluateWafer
}
