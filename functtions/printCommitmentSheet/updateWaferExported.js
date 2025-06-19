const { answers } = require("./answers");
const { updateCilinderData } = require("./updateCilinderData");
const { createValvesNoDefault } = require("./createValvesNoDefault");

async function updateWaferExported() {

    let oldWafer        = document.getElementById("wafer").value.trim();
    let collectWafer    = await answers.ReadWaferSaved(oldWafer);
    let pec             = document.getElementById("pec").value;
    let domain          = document.getElementById("domain").value;
    let typeOperation   = "";
    let nameCompleteTypeOperation ="";
    let insideId        = "";
    // actualiza el tipo de operacion
    Array.from(document.querySelectorAll(".operationType input[type='checkbox']")).forEach((element,index)=>{
        if(element.checked==true){
            typeOperation=index+1;
            nameCompleteTypeOperation = element.parentNode.children[0].textContent.slice(0,-1).trim();
        }
    }); 


    if(collectWafer.length>0){
        // actualiza los datos de la oblea general
        const element = collectWafer[0];
        let data = `pec='${pec}' , domain='${domain}'`;
        // obtiene el tipo de vehiculo
        document.querySelectorAll(".optionsSectionContent input[type='checkbox']").forEach((element,index)=>{
            if(element.checked){
                data+= `,typeVehicle='${index+1}'`;
            }
        });

        
        await answers.UpdateWaferSaved( data , element["id"]);
        insideId = element["id"];
        

        // actualiza los datos del regulador
        let dataRegulator ='';
        Array.from(document.querySelectorAll(".regulatorInputContent")).forEach(element=>{
            if(element.children[1].value.length>0){
                dataRegulator = `code='${element.children[1].value}' , serial='${element.children[2].value}'`;
            }
        });
        dataRegulator += `,typeOperationRegulator='${document.getElementById("typeOperationRegulator").value.toUpperCase()}'`;
        await answers.UpdateRegulator(dataRegulator , insideId);



        // acualiza los datos de los cilindros
        await updateCilinderData(insideId);

        // evalua si hay valvulas nuevas  y inserta los datos nuevos
        await createValvesNoDefault(insideId);

        // actualiza los datos del usuario
        let dataUpdate = `typeOperation ='${typeOperation}' , nameCompleteTypeOperation='${nameCompleteTypeOperation}',`;
        document.querySelectorAll("div[name='txtUser']").forEach(element=>{
            dataUpdate += `${element.children[1].id}='${element.children[1].value}',`;
        });
        answers.UpdateClient(dataUpdate.slice(0,-1) , insideId);
    }
}

module.exports = {
    updateWaferExported
}