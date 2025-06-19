const { answers } = require("./answers");

async function completeDataInputs(params) {
    // obtiene las posiciones de todos los elementos
    let data = await answers.collectTablePosition(params);
    
    if(data.length>0){
        sectionSelected = data[0]["tableName"];
        //obtiene el contenedor general de resultados 
        let dataContent = document.getElementById("dataContent");
        dataContent.innerHTML = '';

        // crea el elemento HTML de y lo inserta en la tabla
        let keys = Object.keys(data[0]);
        // recorre todos los elementos de la consulta
        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            // crea el contenedor principal 
            let div = document.createElement("div");
            div.className="dataPositionContent";
            
            //inserta los inputs con sus valores en el contenedor 
            keys.forEach(keyname => {
                if(keyname=="description" || keyname=="positiondata"){

                    if(keyname=="description"){
                        let strong = document.createElement("strong");
                        strong.textContent = element[keyname];
                        div.append(strong);
                    }else{
                        let input = document.createElement("input");
                        input.value = element[keyname];
                        div.append(input);
                    }
                }
            });

            // inserta el div en el HTML
            dataContent.append(div);
        }
    }

}
module.exports= {
    completeDataInputs
}