const {answers} = require("./answers");
const { sendPutApi } = require("../API/updateProductApi");
const {alertFun} = require("../alertFun");

var dataToJson      = {};
async function saveProduct() {

    // corrobora que el codigo de interno del prodcuto no exista anteriormente si es que este cambió
    let getOldInsideId  = await answers.readDataProduct(localStorage.getItem("productsValues"));
    let getInsideId     = document.getElementById("insideid");

    if(getOldInsideId[0]["insideid"] != getInsideId.value){
        let searchCoincidence = await answers.readDataProduct(getInsideId.value);
        
        // si existe , lanza error 
        if(searchCoincidence.length>0){
            reportStatus.reportStatus("Error" , "Codigo De Interno Ya Existente" , `El codigo de interno ${searchCoincidence[0]["insideid"]} ya está asignado a ${searchCoincidence[0]["name"]}, elija otro codigo de interno que no esté duplicado` , 1 , ["Cerrar"] , ["canelProcess"] , document.getElementById("reportStatusContent"));
        }else{
            await updateDataProduct(getOldInsideId[0]["insideid"]);
        }
    }else{ 
        // si el codigo de interno es el mismo actualiza sus valores
        await updateDataProduct(getOldInsideId[0]["insideid"]);
    }

    // envia los datos del producto a la api para modifcarlos en la web
    await sendPutApi(dataToJson);
}

async function updateDataProduct(getOldInsideId) {
    let getData         = document.querySelectorAll(".infoContent");
    let answerPrepare   = "";
    // recorre los elementos en un foreach y asigna los datos en variables 
    getData.forEach(data =>{
        if(data.id=="existence"){}
        else{
            let contentKeysVals = data.id;
            let contentValVals  = data.value;
            if(data.id=="path"){
                contentValVals  = data.getAttribute("src").split("/")[2];
            }
            answerPrepare+=`${contentKeysVals}='${contentValVals.trim().toUpperCase()}',`;
            dataToJson[data.id] = String(data.value).trim().toUpperCase();
        }
    });
    // guarda los cambios en db
    await answers.updateExistences(answerPrepare.slice(0,-1) , getOldInsideId);
    alertFun("CAMBIOS GUARDADOS" , document.getElementById("reportStatusContent"));
}

module.exports = {
    saveProduct
}