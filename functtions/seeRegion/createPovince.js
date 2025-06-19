const { answers } = require("./answers");
const {reportStatus} = require("../reportStatus");
const {succesAlert} = require("../succesAlert");
const { loadDefaultProvince } = require("./loadDefaultProvince");
async function createProvince() {
    // evalua si existe o no elnombre de la provincia
    let data = document.getElementById("name").value.toUpperCase();
    let province = await answers.readDuplicateProvince(data);
    console.log(province);

    if(province.length<=0){
        await answers.createProvince(data);
        succesAlert("Exito", "Provincia creada con exito" , 1 , ["cancelProcess"] , ["Aceptar"] , 
        document.getElementById("reportStatus"));
        await loadDefaultProvince();

        document.getElementById("modifySecttion").style.display='none';
    }else{
        reportStatus("Error" , "Provincia existente" , 
        "La provincia que intenta agregar ya se encuentra en la lista , corrobore el nombre ingresado",
        1, ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));

    }
}

module.exports = {
    createProvince
}