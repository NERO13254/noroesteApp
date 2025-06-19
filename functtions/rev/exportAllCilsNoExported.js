async function exportAllCilsNoExported(getData) {
    let getAllCils = listNoExported.querySelectorAll(".cilinderContent");

    for (let i = 0; i < getAllCils.length; i++) {

        let getOmologation      = "";
        let getSerialNumberCont = "";
        // crea unobjeto que contiene las claves y valores del cilindro
        let objData = {};
        let answerDataContent = "";
        const cilContent = getAllCils[i].querySelectorAll("input[type='text']");

        cilContent.forEach(element => {
            if(element.id == "omologation"){
                getOmologation = element.value;
            }
            if(element.id== "serialnumber"){
                getSerialNumberCont = element.value;
            }
            answerDataContent+= `${element.id}='${element.value}',`;

            objData[element.id] = element.value;
        });

        for (let i = 0; i < getData.length; i++) {
            const element = getData[i];
            if(element["omologation"] == getOmologation && element["serialnumber"]== getSerialNumberCont ){
                getOmologation = element["omologation"];
                getSerialNumberCont = element["serialnumber"];
            }
        }
        await createTxt.createTxt( objData );
        await runAnswer(`UPDATE cilindersaved SET ${answerDataContent.slice(0,-1)} WHERE omologation='${getOmologation}' AND serialnumber='${getSerialNumberCont}'`);
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    exportAllCilsNoExported
}