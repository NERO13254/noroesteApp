const { succesAlert } = require("../succesAlert");
const { createTxt } = require("./createTxt");
const { answersContainer } = require("./dbAnswers/answers");

async function reExportOnlyCil(data , getData) {
    // obtiene el div que contiene todos los datos
    let getDivSelected = data.target.parentNode.parentNode;
    // obtiene el codigo de omologación del  cilindro seleccionado por defecto (ER32)
    let getOmologation  = getDivSelected.children[1].textContent;
    // obtiene el numero de serie del cilindro por defecto (5646546)
    let getSerialNumberCont = getDivSelected.children[2].textContent;


    let dataToUpdate    = "";
    let omologationCode = "";
    let serialnumber    = "";
    // crea una variable global  que contendrá los campos de los inputs
    let getDataCil      = "";
    // segun que elemento fue presionado (cilindros no exportados / cilindros exportados )  accede a los inputs
    if(document.getElementById(data.target.className)){
        getDataCil      = document.getElementById(data.target.className).querySelectorAll("input");
    }else{
        getDataCil      = data.target.parentNode.parentNode.parentNode.children[1].querySelectorAll("input");
    }
    // crea un objeto para almacenar los datos
    let objData         = {};
    getDataCil.forEach(element => {
        // si el div es "material" entonces no  lo transforma a mayusculas
        dataToUpdate+= element.id=="material" ?`${element.id}='${element.value}',` : `${element.id}='${element.value.toUpperCase()}',`;

        if(element.id == "omologation"){
            omologationCode = element.value;
        }
        if(element.id == "serialnumber"){
            serialnumber  = element.value;
        }
        // inserta los datos en el objeto
        objData[element.id] = element.value;
    });
    // pinta el contenedor del div seleccinado de verde
    data.target.parentNode.parentNode.style.background = "#9bdd9b";
    // actualiza el cilindro
    await answersContainer.updateCilinderModified(dataToUpdate.slice(0,-1) , getSerialNumberCont,getOmologation);
    // imprime la alerta de exito que todos los cambios fueron guardados
    succesAlert( "Exito" , "Modificación Exitosa " , 2 , ["cancelProcess" , "exportOnlyCil"],["Aceptar" , "Exportar"], document.getElementById("reportStatus")  );
    // obtiene todos los datos del cilindro de db 
    console.log(getOmologation , getSerialNumberCont)
    let getDataForCilSelected = await answersContainer.getDataOnlyCil(getOmologation , getSerialNumberCont);
    
    // al presionar el boton "exportar" se genera el archivo TXT de la rev 
    document.getElementById("exportOnlyCil").addEventListener("click" , async()=>{
       await createTxt(getDataForCilSelected[0]);
    });

}

module.exports = {
    reExportOnlyCil
}