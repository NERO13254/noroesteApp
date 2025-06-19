const { answers } = require("./answers");

async  function insertValves(firstData){

    //cuenta cuantas valvulas hay
    let valvesContent = document.querySelectorAll(".valveContent");

    for (let i = 0; i < valvesContent.length; i++) {
        let keys    = "";
        let values  = "";
        const element = valvesContent[i];
        // si el campo del codigo de la valvula contiene informacion
        if(element.children[0].value.length>0){
            // obtiene los datos del cilindro
            let cilDataContent = element.parentNode;
            keys+="omologation,serialnumber,firstHabilitation,chekeddate,";
            values+=`'${cilDataContent.children[0].value.toUpperCase().trim()}','${cilDataContent.children[1].value.toUpperCase().trim()}',`;
            let chekedDate = document.getElementById("chekeddate").value;
            
            values+=`'${chekedDate}','${chekedDate}',`;
            let getAllPuts = element.querySelectorAll("input");
            
            // obtiene los pares clave valor para efectuar la consulta
            getAllPuts.forEach(data=>{
                keys += `${data.id.slice(0,-1)},`;
                values+= `'${data.value.trim().toUpperCase()}',`;
            })
            await answers.CreateValve("insideid,"+keys.slice(0,-1), `'${firstData["insideid"]}',`+values.slice(0,-1));
        }
    }
}

module.exports = {insertValves}