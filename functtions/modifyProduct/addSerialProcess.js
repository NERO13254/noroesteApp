const { answers } = require("./answers");
const { orderAndInsertSerialsInHtml } = require("./orderAndInsertSerialsInHtml");


async function addSerialProcess(serialsArray) {
    let startString = document.getElementById("startMultiple").value
    // obtiene los campos"desde" "hasta", resta los valores y al resultado se lo asigna a valueDifrence
    let start = parseInt(startString);
    let end = parseInt(document.getElementById("endMultiple").value);
    
    let valueDifrence = 0;
    valueDifrence = ( start>0 && end>0 && start<end && (end-start)<=19 ) ? (end-start) : 0 ;

    // obtiene la conjuncion de nuemros ej (01  , 002 )
    let zeroAmmount = startString.length; 


    // obtiene todos los campos del producto (serie y codigo) 
    let getDataInput = document.querySelectorAll("#rowsOfInputsContent .containerRow");

    await answers.beggin();
    if(valueDifrence>0){
        for (let i = 0; i <= valueDifrence; i++) {
            let completeSerial = "";

            getDataInput.forEach(element=>{
                let valueContent = element.children[1].value +String(i+start).padStart(zeroAmmount, "0");
            

                completeSerial+= ` ${element.children[0].value} ${valueContent} `.toUpperCase();
                completeSerial = completeSerial.trim();
            });
            
        
            // inserta la serie en db
            completeSerial = completeSerial.split(" ").length==2 ? completeSerial.replace(/[" "]/g,"") : completeSerial;
            await answers.createSerial(document.getElementById("insideid").value.trim().toUpperCase(), completeSerial);
            // añade el string al array de series
            serialsArray.push(completeSerial);
        }
    }else{
        let completeSerial = "";
        getDataInput.forEach(element=>{
            let valueContent = element.children[1].value;
            
            completeSerial+= ` ${element.children[0].value} ${valueContent} `.toUpperCase();
            completeSerial = completeSerial.trim();
        });
    
        // inserta la serie en db
        completeSerial = completeSerial.split(" ").length==2 ? completeSerial.replace(/[" "]/g,"") : completeSerial;
        await answers.createSerial(document.getElementById("insideid").value.trim().toUpperCase(), completeSerial);
        // añade el string al array de series
        serialsArray.push(completeSerial);
    }
    await answers.commit();
    
    // una vez creado el array de series lo ordena alfanumericamente
    await orderAndInsertSerialsInHtml(serialsArray);

}

module.exports = {
    addSerialProcess
}