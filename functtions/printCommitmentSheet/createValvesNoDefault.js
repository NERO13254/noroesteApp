const { answers } = require("./answers");

async function createValvesNoDefault(insideid) {
    // recorre todas las valvulas y las añade a un objeto
    let newValves = {}
    document.querySelectorAll(".valveContent").forEach(async(element) =>{
        // evalua que el numero de serie de la valvula no sea vacio
        if(element.children[0].value.length>0&&element.children[1].value.length>0){
            newValves[element.children[1].id]=element.children[1].value;

            // actualiza la valvula ya existente
            let data = ""
            let indexData = "";
            let positionValve = element.querySelectorAll("input");
            positionValve.forEach(valsPut=>{
                data+=`${valsPut.id.slice(0,-1)}='${valsPut.value}',`;
                indexData=valsPut.id.slice(-1);
            })
            await answers.UpdateValve(data.slice(0,-1),insideid , waferValveDataSaved["serialValve"+indexData]);
        }
    });

    // obtiene las claves de las  obleas nuevas y las por defecto
    let valsNewValve = Object.keys(newValves);
    let valsOldValve = Object.keys(waferValveDataSaved)

    // si hay valvulas nuevas la inserta
    if(valsNewValve.length> valsOldValve.length){
        // almacena en un array las valvuals nuevas 
        let valvesNoDefault = valsNewValve.filter(data=>{
            let dta = valsOldValve.includes(data) ? "" : data
            return dta
        });

        // recorre los datos y los inserta en un string para generar la consulta
        valvesNoDefault.forEach(async(element)=>{
            let values = '' , keys='';
            let generalDataValve = document.getElementById(element).parentNode
            let cilnderData = generalDataValve.parentNode;
            let chekeddate = document.getElementById("chekeddate").value;

            generalDataValve = Array.from(generalDataValve.querySelectorAll("input"));
            generalDataValve.forEach(data=>{
                keys +=`${data.id.slice(0,-1)},`;
                values+=`'${data.value}',`;
            })
            // agrega los datos del cilindro
            keys = keys+`${cilnderData.children[0].id.slice(0,-1)},${cilnderData.children[1].id.slice(0,-1)}`;
            values = values+`'${cilnderData.children[0].value}','${cilnderData.children[1].value}'`;

            // agrega los datos de la fecha y el codigo de interno
            keys += `,insideid,firstHabilitation , chekeddate` ;
            values+= `,'${insideid}','${chekeddate}','${chekeddate}'`;
            await answers.CreateValve(keys,values);
        });
    }else{
        // si se quitaron valvulas , elimina de db la que se quitó
        let valvesDeleted = valsOldValve.filter(data=>{
            let badValve = valsNewValve.includes(data)?"" : data;
            return badValve
        });

        // genera la consulta para eliminar la valvula
        for (let i = 0; i < valvesDeleted.length; i++) {
            const element = valvesDeleted[i];
            await answers.DeleteValve(insideid, waferValveDataSaved[element]);
        }
    }
}


module.exports = {
    createValvesNoDefault
}