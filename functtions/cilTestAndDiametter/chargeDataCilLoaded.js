async function chargeDataCilLoaded(getIdCilinderSaved, dataCilinder){
    // obtiene todos los inputs del html , y los elementos de local storage y hace un for para rellenar el html
    function getAndPrintValuesOfTheCilinder(numberOfTotalInputs , nameInput , storageName){
        for (let i = 1; i <= numberOfTotalInputs; i++) {
            const contentInput = document.getElementById(storageName+i);
            const getAllStorage= localStorage.getItem(storageName+i);
            contentInput.value= getAllStorage;
        }
    }

    getAndPrintValuesOfTheCilinder(8, "thikness","diametro");
    getAndPrintValuesOfTheCilinder(6, "fondo","fondo");
    getAndPrintValuesOfTheCilinder(6, "ojiva","ojiva");
    getAndPrintValuesOfTheCilinder(6, "diam","diam");


    // obtine el codigo de cilindro (ER32)
    let getDataTypeCilinder = await allAnswer(`SELECT * FROM typecilinders WHERE code LIKE '%'||'${dataCilinder[0]["omologation"]}'||'%' LIMIT 1`);
    expansiontotal.value    = getDataTypeCilinder[0]["maxexpansion"];
    document.getElementById("expansionpermanente").value= getDataTypeCilinder[0]["totalexpansion"];
    watertemperature.value  = Math.floor(Math.random()*8)+ 21;
    localStorage.setItem("ruleFabCilIncomplete" , getDataTypeCilinder[0]["rules"]);
    localStorage.setItem("coficentCilIncomplete" , getDataTypeCilinder[0]["coficent"]);
    volmedido.value= dataCilinder[0]["volmedido"];
    taramedido.value=dataCilinder[0]["taramedido"];
    }
module.exports = {
    chargeDataCilLoaded
}