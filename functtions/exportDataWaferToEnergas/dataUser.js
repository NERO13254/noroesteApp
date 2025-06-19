async function dataUser(element, dateNow , filePath, firstPart){
        let completeNameOperation = "";
        switch (element["typeOperationGeneral"]) {
            case "R":
                completeNameOperation = "revision"
                break;
            case "D" : 
                completeNameOperation = "desmontaje";
            case "M" :
                completeNameOperation = "modificacion";
            case "B" : 
                completeNameOperation = "baja";
            case "C" :
                completeNameOperation = "conversion";
            default:
                break;
        }

        let finishDate = element["firstDateClient"].split("/");
        finishDate = `${finishDate[0]}/${finishDate[1]}/${parseInt(finishDate[2])+1}`;
        // crea el txt del usuario
        let userTxt = `${firstPart}DNI;25258423;${element["typeDniData"]};${element["dni"]};${element["typeOperationGeneral"]};${completeNameOperation};${element["oldOblea"]};${element["newOblea"]};${element["domainCar"]};${element["brandCar"]};${element["modelCar"]};${element["yearCar"]};${element["typeVehicle"]};${element["nameAndSuname"]};${element["domicilio"]};${element["location"]};${element["province"]};${element["cpUser"]};011;tipoDeDniDesconocido;numeroDeDniDesconocido;${element["firstDateClient"]};${element["firstDateClient"]};${finishDate};${dateNow.getDate()+"/"+dateNow.getMonth()+1+"/"+dateNow.getFullYear()};A;`+ "\n";
        // escribe el txt con los datos de los usuarios 
        fs.appendFileSync(filePath , userTxt,(err)=>{
            if(err){
                console.log(err.message);
            }
        });
    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    dataUser
}