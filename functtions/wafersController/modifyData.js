const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");

async function modifyData(e) {
    if(e.key == "Enter" && e.target.name=="dataWaferContainer" && e.target.parentNode.parentNode.className!="onlyDataContent"){
        let dataUpdate = '';
        let generalDiv = e.target.parentNode.parentNode;
        
        generalDiv = generalDiv.querySelectorAll("input");
        generalDiv.forEach(data=>{
            dataUpdate+=`${data.id}='${data.value}',`;
        });

        // actualiza los datos
        await answers.UpdateDate(dateListName,dataUpdate.slice(0,-1),insideidContent);
    }

    // // si se modifica algún dato de las valvulas o de los cilindros
    if(e.key == "Enter" && e.target.parentNode.parentNode.className=="onlyDataContent"){
        // obtiene todos los valores de los inputs y los recorre para generar la consulta update
        let allInputs = e.target.parentNode.parentNode.querySelectorAll("input");
        let data = "";
        allInputs.forEach(element=>{
            data+= `${element.id}='${element.value}',`;
        });
        let omologation = e.target.parentNode.parentNode.parentNode.id;
        await answers.UpdateOnlyDate(dateListName,data.slice(0,-1),insideidContent,omologation)
    }
    
    succesAlert("Exito", "Registro actualizado con exito" , 1, ["cancelProcess"],["Aceptar"], document.getElementById("reportStatus"))
}

module.exports = {
    modifyData
}