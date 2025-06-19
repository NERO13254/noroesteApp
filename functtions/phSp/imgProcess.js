const path = require('path');
const fs = require('fs');
const { answers } = require('./answers');

async function imgProcess() {

    // obtiene la fecha 
    let newDate = new Date();
    let dateNow = `-${newDate.getMonth()+1}-${newDate.getFullYear()}`;

    // evalua si hay un cilindro guardado o no
    if(localStorage.getItem("idCilinderSaved")){
        let date =await answers.readCheckedDate(localStorage.getItem("idCilinderSaved"));
        dateNow = "-"+date[0]["chekeddate"].split("/").slice(1).join("-");
    }

    let dataImg = document.getElementById("addImg").files;
    let imgExtensions = ['JPG', 'JPEG', 'PNG'];
    
    //obtiene la ruta de la imagen
    let destinationPath = "\\\\sandra\\db\\img\\";
    let imgFolder = `${omologation.value}-${serialnumber.value}`;
    destinationPath += imgFolder + dateNow;

    // crea la carpeta de destino si no existe
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath);
    }

    // evalua cuantas imagenes tiene el input
    for(let i = 0; i < dataImg.length; i++) {
        const element = dataImg[i];
        const extension = element["name"].split(".").slice(-1)[0].toUpperCase();

        let pathFinal = destinationPath+ "\\" + element["name"];
        // si la extension de la imagen es correcta
        if(imgExtensions.includes(extension)){
            let defaultImagePath = element["path"];
            fs.copyFileSync(defaultImagePath, pathFinal);    
        }
    }

}


module.exports = {
    imgProcess
}