const { answers } = require("./answers");

async function updateCilinderData(insideId) {
    // obtiene el numero decertificado del cilindro
    let certificateNumber = await answers.ReadCertificateNumber(insideId);

    let keys = Object.keys(waferCilinderDataObjContent);
    let cilNow = {};
    // obtiene el numero de serie de todos los cilindros ingresados
    document.querySelectorAll(".inputCilDataContent").forEach(element => {
        if(element.children[1].value.length>0){
            cilNow[element.children[1].name]=element.children[1].value;
        }
    });
    // evalua si hay cilindros nuevos
    if(keys.length < Object.keys(cilNow).length){
        let newValues = Object.keys(cilNow);
        let oldValues = Object.keys(waferCilinderDataObjContent);
        
        let printd =[];
        
        // filtra los valores nuevos 
        newValues.forEach(data=>{
            if(!oldValues.includes(data)){
                printd.push(data);
            }
        })


        // recorre los valores nuevos para almacenarlos en db
        for (let i = 0; i < printd.length; i++) {
            const element = printd[i];
            let keysNewCil = "",valuesNewCil = "";
            document.querySelectorAll(`input[name='${element}']`).forEach(data=>{
                keysNewCil += `${data.id.slice(0,-1)},`;
                valuesNewCil += `'${data.value}',`;
            })
            // añade el nuevo cilindro
            await answers.CreateCilinder("certificatenumber,insideid,"+keysNewCil.slice(0,-1) ,`'${certificateNumber[0]["certificatenumber"]}','${insideId}',`+valuesNewCil.slice(0,-1));
        }
    }

    for (let i = 0; i < keys.length; i++) {
        let dataUpdate='';
        // obtiene los inputs del cilindro 
        const element = keys[i];
        let inputContentCil = Array.from(document.querySelectorAll("input[name='"+element+"']"));

        // corrobora si se borro el cilindro y lo elimina en db
        if(inputContentCil[0].value==''){
            console.log(inputContentCil[1]);
            await answers.DeleteCilinder(insideId, waferCilinderDataObjContent[element] )
        }//sino solo actualiza el cilindro normalmente
        else{
            console.log(waferCilinderDataObjContent[element])
            // recorre los inputs para crear la consulta 
            
            inputContentCil.forEach(data=>{dataUpdate+=`${data.id.slice(0,-1)}='${data.value}',`;});
            dataUpdate = dataUpdate.slice(0,-1);


            await answers.UpdateCilinder(dataUpdate , insideId , waferCilinderDataObjContent[element]);

        }
    }
}

module.exports = {
    updateCilinderData
}