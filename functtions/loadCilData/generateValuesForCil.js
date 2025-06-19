const { searchLikedCilinder } = require("./answers");

async function generateValuesForCil(typeOperation){
    // obtiene todos los datos del cilindro proveniente de tipos de cilindros
    let getValuesOfCil = await searchLikedCilinder(document.getElementById("codeO").value.toUpperCase().trim());

    let coeficent = document.getElementById("coficent");
    // obtiene el espesor de db , en caso de que no tenga setea 6.5
    let thikness = getValuesOfCil.length>0 ? parseInt(getValuesOfCil[0]["thikness"]) : 6.5;
    // en caso de que el espesor exista pero sea NE setea 6.5  
    thikness = isNaN(thikness) ? 6.5 : thikness;

    var underVal    = (coeficent.textContent+1) * thikness;  //FONDO MINIMO
    var ojive       = thikness* 1.5;                         //OJIVA


    async function printVal(iteration ,startValue , factor , storageName ){

        
        for (let i = 1; i <= iteration; i++) {
            var entero = startValue + factor * Math.random();

            entero = entero.toFixed(1);
            let finishNameStorage =storageName+i;
            // inserta los valores en las variables correspondientes
            if(typeOperation == "insert"){
                keysAnswers+=`${finishNameStorage},`;
                valuesAnswers+= `'${entero}',`;
            }else{
                dataUpdate += `${finishNameStorage} = '${entero}',`;
            }
        }      
    }

    // diametro
    await printVal(8,thikness , 1.3 , "diametro" );
    //fondo
    await printVal(6,thikness*2 , 0.9+Math.random() , "fondo");
    //ojiva 
    await printVal(6,ojive , 1.6 , "ojiva");
    //diametro
    await printVal(6,parseInt(document.getElementById("diametter").value) , 1.2 , "diam");
}

module.exports = {
    generateValuesForCil
}