const { reportStatus } = require("../reportStatus");
const { createTxt } = require("./createTxt");
const {answersContainer}= require("./dbAnswers/answers");
const {printCilInHtml}    = require("./printCilInHtml");

async function chargeCilindersNoExportedOrTheDayInHtml() {
    // obtiene los cilindros que no se exportaron de la base de datos
    let cilindersNoExported = await answersContainer.getDataCilNoExported();
    if(cilindersNoExported.length>0){
        // carga los cilindros no exportados
        for (let i = 0; i < cilindersNoExported.length; i++) {
            const element = cilindersNoExported[i];
            // imprime los cilindros en HTML
            await printCilInHtml(element , document.getElementById("cilindersList"));
            // crea el TXT para exportar a energas
            await createTxt(element);
        }
        reportStatus("Aviso" , "Cilindros Exportados" ,`Se exportaron ${cilindersNoExported.length} cilindros de los cuales ${failCilindersExported} tienen errores`,1,["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
    }else{
        // alerta que indica que no hay cilindros para exportar    
        reportStatus("Aviso" , "No hay cilindros para exportar" ,`No se encontraron registros para exportar en la base de datos`,1,["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"));
        // si no encunetra ciindros no exportados , carga los cilindros del día de hoy
        // obteine la fecha de hoy
        let newDate = new Date();
        let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;

        // carga los cilindros del día de hoy
        let getAllCils = await answersContainer.getCilindersExportedsOfTheDay(dateNow);
        getAllCils.forEach(element => {
            printCilInHtml(element , document.getElementById("cilindersList"));
        });
    }
}
db.run(`INSERT INTO clients2 (idtye,dni,nameandsurname,provincia,country,cp,domain,idcevigas,idinter,direccion)VALUES('${data["idtype"]}','${data["dni"]}','${data["names"]}','${data["country"]}','${data["location"]}','${data["cp"]}','${data["domain"]}','${data["idcevigas"]}','${data["idinter"]}','${data["direccion"]}')`)

module.exports= {
    chargeCilindersNoExportedOrTheDayInHtml
}