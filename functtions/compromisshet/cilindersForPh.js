const { collectDataForStorage } = require("./collectCilDataForStorage");
const { collectUserData } = require("./collectUserData");
const { insertNewCilInDb } = require("./insertNewCilindersInDb");

async function cilindersForPh(){
    let cilDataObj              = [];
    // variable que servira como un contador de cilindros  
    let iteratorCil             = 0;     
    //obtiene los datos del cliente
    let clientDataCollected = await collectUserData();
    // obtiene los datos de los cilindros
    let getDataCil = document.getElementsByClassName("frameContainer")[0].querySelectorAll("[name='inputContent']");
    // recorre los inputs para obtener los datos necesarios para almacenar en el localStorage

    iteratorCil = await collectDataForStorage(iteratorCil);
    
    // recorre todos los datos e inserta los valores en un array de objetos
    getDataCil.forEach(element => {
        // filtra todos los campos de cilindros que estén vacios
        if(element.value.length != 0){

            // filtra los valores de volumen y masa
            if( element.id.slice(0,-1)=="omologation" || element.id.slice(0,-1)=="serialnumber" ){
                // inserta los valores en el array global 
                cilDataObj.push(`${element.id}:${element.value.toUpperCase()}`);
            }
            else{   
                // obtiene el nombre del elemento (vol o masa)
                let name = element.id.slice(0,-1);
                // obtiene los valores del elemento 
                let data =`${element.id.slice(-1)}:${element.value}`;

                if( name=="volmedido"){
                    cilDataObj.push(`volmedido${data}`);
                    cilDataObj.push(`volestimado${data}`);
                }else{
                    cilDataObj.push(`taramedido${data}`);
                    cilDataObj.push(`taraestimado${data}`);
                }
            }
        }
    });

    let newDate = new Date();
    let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;

    for (let i = 0; i < iteratorCil; i++) {
        await insertNewCilInDb(cilDataObj, i ,clientDataCollected, dateNow);
    }
}

module.exports = {
    cilindersForPh
}