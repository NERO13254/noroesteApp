const { reportStatus } = require("../reportStatus");
const fs = require("fs");
const { answersContainer } = require("./dbAnswers/answers");
async function createTxt(element) {

    // obtiene la fecha de ahora y la de vencimiento proximo
    let newDate = new Date();
    let completeDateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    let completeDateNext= `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()+5}`;
    let arr = ";;;;;;;;;;;;;;;;".split(";");
    let countDataCil = 0;
    let newArr = "";

    // si el cilindro no esta condenado coloca un 1 al principio de la cadena
    if(element["status"] == 0){
        newArr = "1"+arr.join(";");
    }else{
        // sino coloca el 1 en el motivo de la condena
        arr[element["status"]-1] = "1";
        newArr = arr.join(";");
    }
    // obtiene los datos  del TDM
    let getDataWorkShopCode = await answersContainer.getDataTdm(element["workshopcode"]);

    // corrobora que haya codigo de taller para cargar
    let workShopCodeContent = ""
    let workShopCodeCuit     = ""
    if(getDataWorkShopCode.length>0){
        workShopCodeContent = getDataWorkShopCode[0]["workshopcode"];
        workShopCodeCuit    = getDataWorkShopCode[0]["cuit"];
    }

    countDataCil++;
    let monthFabFin         = "";
    let yearFab             = "";

    if(element["datefab"]){
        let completeDateFab = element["datefab"];
        monthFab            = completeDateFab.split("/");
        monthFabFin         = monthFab[0];
        yearFab             = monthFab[1];
    }
    if(element["status"] == 0){
        let content             = `NORO;4501-CPII;${element["pec"]};${workShopCodeContent};${workShopCodeCuit};${element["nameandsurname"]};${element["idtype"]};${element["dni"]};${element["direccion"]};${element["country"]};${element["provincia"]};${element["cp"]};0;${element["domain"]};${element["omologation"]};${element["serialnumber"]};${monthFabFin};${yearFab};`.toUpperCase();
        let notPercase          = `${element["material"]};`;
        let orherPercase        = `${ element["capacity"]};${element["insideid"]};1;${newArr}${completeDateNow};${completeDateNext};NORO0${element["certificatenumber"]};A;${completeDateNow};${completeDateNow}`.toUpperCase();
        var totalString         = content + notPercase + orherPercase+"\n";
    }else{
        content  = `NORO;4501-CPII;${element["pec"]};${workShopCodeContent};${workShopCodeCuit};${element["nameandsurname"]};${element["idtype"]};${element["dni"]};${element["direccion"]};${element["country"]};${element["provincia"]};${element["cp"]};0;${element["domain"]};${element["omologation"]};${element["serialnumber"]};${monthFabFin};${yearFab};`.toUpperCase();
        notPercase = `${element["material"]};` ;                 
        orherPercase = `${ element["capacity"]};${element["insideid"]};0;${newArr}${completeDateNow};NORO0${element["certificatenumber"]};A;${completeDateNow};${completeDateNow}`;
        totalString= content + notPercase + orherPercase+"\n";
    }
    try {
        fs.appendFileSync(filePath , totalString , "utf-8" );
        // actualiza los datos del cilindro guardado
        await answersContainer.updateCilinderSaved(element["insideid"],element["omologation"],element["serialnumber"]);
        console.log("se exporto el cilindro" + element["omologation"] +" " + element["serialnumber"])
    } catch (error) {
        console.log(error);
        reportStatus("Error", "Error de generación " , "Hubo un error al intentar generar la  REV" , 1, ["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"))
    }
}
module.exports = {
    createTxt
}