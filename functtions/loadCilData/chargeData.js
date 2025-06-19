const generateValuesForCil = require("./generateValuesForCil");

async function chargeData(objeContent){

    bandCilinder.value  = objeContent.brand;
    capacity.value      = objeContent.capacity;
    rules.innerHTML     = objeContent.rules;
    thikness.innerHTML  = objeContent.thikness;
    coeficent.innerHTML = objeContent.coficent;
    diametter.value     = objeContent.diametter;
    if(objeContent.width== null ){
        widthCil.value  = "no especificado"
    }else{
        widthCil.value  = objeContent.width;
    }
    maxExpansion.innerHTML  = objeContent.maxexpansion;
    totalExpansion.innerHTML= objeContent.totalexpansion;
    localStorage.setItem("material" , objeContent.material);

    await generateValuesForCil.generateValuesForCil();

    return new Promise((resolve, reject) => {
        resolve();
    })
    
}
module.exports = {
    chargeData
}