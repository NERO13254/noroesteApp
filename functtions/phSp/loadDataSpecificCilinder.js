const { answers } = require("./answers");

async function loadDataSpecificCilinder() {

    // obtiene todos los datos del cilindro proveniente de tipos de cilindros
    let getValuesOfCil = await answers.readSpecificDataCilinder(document.getElementById("omologation").value.toUpperCase().trim());

    // obtiene el espesor de db , en caso de que no tenga setea 6.5
    let thikness = getValuesOfCil.length>0 ? parseInt(getValuesOfCil[0]["thikness"]) : 6.5;
    // en caso de que el espesor exista pero sea NE setea 6.5  
    thikness = isNaN(thikness) ? 6.5 : thikness;

    var ojive       = thikness* 1.5;                         //OJIVA


    async function printVal(iteration ,startValue , factor , append){
        for (let i = 1; i <= iteration; i++) {
            var entero = startValue + factor * Math.random();
            entero = entero.toFixed(1);

            document.getElementById(append+i).value = entero;
        }      
    }

    // diametro
    await printVal(8,thikness , 1.3 , "diametro");
    //fondo
    await printVal(6,thikness*2 , 0.9+Math.random() , "fondo");
    //ojiva 
    await printVal(6,ojive , 1.6 , "ojiva");
    //diametro
    await printVal(6,parseInt(document.getElementById("diametter").textContent) , 1.2  , "diam");

    document.getElementById("watertemperature").value = Math.floor(Math.random() * (27 - 21 + 1)) + 21;


    // completa los campos adicionales
    document.getElementById("taramedido").value = document.getElementById("taramedido").value;
    document.getElementById("volmedido").value = document.getElementById("volmedido").value;
    document.getElementById("expansionpermanente").value = getValuesOfCil.length>0 ? getValuesOfCil[0]["totalexpansion"] : 0;
    document.getElementById("expansiontotal").value=getValuesOfCil.length>0 ? getValuesOfCil[0]["maxexpansion"] : 0; 


}

module.exports = {
    loadDataSpecificCilinder
}