const { corroborateDomain }     = require("./corroborateDomain");
const { corroborateOmologation }= require("./corroborateOmologation")
async function corroborateCils(getData ) {
    let errorContainerCil ="";
    for (let i = 0; i < getData.length; i++) {
        const element = getData[i];
        let omologationSentence = await corroborateOmologation(element["omologation"]);

        // recorre los valores de cada cilindro y si encuentra datos en blanco los envia a un array
        let getKeys = Object.keys(element);
        for (let i = 0; i < getKeys.length; i++) {
            const obj = element[getKeys[i]];
            if(getKeys[i] == "domain"){
                errorContainerCil= await corroborateDomain(element[getKeys[i]]);
            }
            if(!obj && obj!=0 || obj.length<=0 ){
                
                errorContainerCil = false;
                if(errorContainerCil==false || !omologationSentence){
                    if(getKeys[i]=="capacity" || getKeys[i]=="taramedido"){

                    }else{
                        await arrContnt.push(element["serialnumber"]);
                    }
                }
            }
        }

    }
    return new Promise((resolve, reject) => {
        resolve(arrContnt);
    })
}

module.exports = {
    corroborateCils
}