const { reportStatus } = require("../reportStatus");
const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");
const { printLocationHTML } = require("./printLocationHTML");

async function createLocation() {

    
    let id = document.getElementById("idLocation");
    let name = document.getElementById("name");
    let cp = document.getElementById("cp");


    // corrobora que el registro no exista en db
    let duplicateCp = await answers.readDuplicateData(cp.value);

    if(duplicateCp.length<=0){
        await answers.createLocation(`'${name.value.toUpperCase()}','${cp.value}'`);
        document.getElementsByClassName("settingsLocationContent")[0].style.display='none';

        let lastLocation = await answers.readLastLocation();
        printLocationHTML(lastLocation[0] , document.getElementById("locationsContent"));
        
        succesAlert("Exito" , "Localidad Creada Con exito" ,1 , ["cancelProcess"] , ["Aceptar"] ,
        document.getElementById("reportStatus")
        )
    }else{
        reportStatus(
        "Error" ,
        "Codigo Postal Existente" , `El codigo postal que intenta cargar ya se encuentra
        asignado a ${duplicateCp[0]["name"]} corrobore que se haya ingresado correctamente 
        el valor que intenta ingresar`, 1 ,["Aceptar"] ,["canelProcess"],
        document.getElementById("reportStatus") ); 
    }


}

module.exports = {
    createLocation
}