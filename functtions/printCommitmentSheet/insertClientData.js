const { answers } = require("./answers");

async function insertClientData(firstData) {
    // obiene el Dni del tdm en base al CUIT
    let dniForCuit = String(firstData["workshopCuit"]).split("-")[1];
    // obtiene el codigo de interno 
    let insideid = firstData["insideid"];
    
    // inserta el pec cuit num interno cdigo taller y el tipo y dni del tdm en ese orden
    let keys = "pec,cuit,insideid,workshopcodeWafer,type,dni,";
    let values =`'${firstData["pec"]}','${firstData["workshopCuit"]}','${insideid}','${firstData["workshopcodeWafer"]}','DNI','${dniForCuit}',`;

    // obtiene todos los div que conteien los valores del usuario y a estos los inserta en keys-values
    let dataUser = Array.from(document.querySelectorAll("div[name='txtUser']"));
    dataUser.forEach(element =>{
        let inputData = element.children[1];
        keys+=`${inputData.id},`;
        values+=`'${inputData.value}',`
    })

    // obtiene el tipo de operacion 
    let operationType = Array.from(document.querySelectorAll(".operationType .operationOptionContent"));
    operationType.forEach(element=>{
        // obteine el elemento checkbox seleccionado
        if(element.children[1].checked){
            let completeNameOperation = element.children[0].textContent.slice(0,-1).trim();
            keys += `typeOperation , nameCompleteTypeOperation,`;
            values+= `'${element.children[1].id.slice(-1)}','${completeNameOperation}',`;
        }
    });
    
    // inserta el dominio
    keys+= "domain,";
    values+=`'${firstData["domain"]}',`;
    
    // inserta el tipo de vehiculo  junto con el tipo y numero de dni del cliente
    keys+= "typeVehicle,ortherDniType,ortherDniNumber,";
    values+=`'${firstData["typeVehicle"]}','${document.getElementById("typeDni").value}','${document.getElementById("dniUser").value}',`;

    // inserta la fecha dee ingreso , habilitacion y fecha de vencimiento
    let chekeddate= document.getElementById("chekeddate").value;
    let finishDate = chekeddate.split("/");
    finishDate = `${finishDate[0]}/${finishDate[1]}/${parseInt(finishDate[2])+1}`;

    keys += `firstDate , habilitationDate , finishDate , chekeddate`;
    values+=`'${chekeddate}', '${chekeddate}' , '${finishDate}' , '${chekeddate}' `;

    // inserta los datos de la oblea en db
    await answers.CreateUser(keys,values);
}

module.exports = {
    insertClientData
}