const fs = require("fs");
const path = require("path");
const { pushToGitHub } = require("./pushToGitHub");

async function dayliSecurityCopyDb(destinationPath) {

    const pathDb = '\\\\SANDRA\\db\\db.db';

    await pushToGitHub("C:\\Users\\Usuario\\Desktop\\electron\\2\\pruebba");

    // obtiene el nombre del día en español (jueves)
    let newDate = new Date();
    let nameDay = {weekday : "long"}
    nameDay = newDate.toLocaleString("es-ES" , nameDay);

    // crea el nombre de la carpeta
    let day   = `${newDate.getFullYear()}${newDate.getMonth()+1}${newDate.getDate()}  - Copia del Día ${nameDay} `;

    // crea la carpeta 
    fs.mkdirSync(destinationPath+day , {recursive :true});

    // copia la base de datos a la carpeta creada
    fs.copyFileSync(pathDb , destinationPath+day+"\\db.db" )

    // evalua cuantas copias hay en la carpeta 
    let readedFiles = fs.readdirSync(destinationPath , {withFileTypes:true});
    
    // si hay mas de 5 archivos elimina el ultimo
    if (readedFiles.length>5){
        let badFolders = readedFiles.slice(5)
        for (let i = 0; i < badFolders.length; i++) {
            const element = badFolders[i];
            fs.rmdirSync(element["path"]+element["name"] );
        }

        console.log("se eliminaron los sobrantes")
    }

}

module.exports = {
    dayliSecurityCopyDb
}