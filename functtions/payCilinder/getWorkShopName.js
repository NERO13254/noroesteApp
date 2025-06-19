// funcion que cobra los  cilindros en cilindersaved y en ctacte
async function payCilandSavePayOnDb(totalDate ,obs ,getTotalValClient ,finalValue ,clearData,orderNumContent , dataNew){
    if(localStorage.getItem("cilinderInfoToCompromisSheet")){
        console.log("la funcion entra en que hay varios cilindros")
        let acumulateFinVal = 1;

        let getDataCil = localStorage.getItem("cilinderInfoToCompromisSheet").split(",");
        let dataCilObj = JSON.parse(localStorage.getItem("cilinderInfoToCompromisSheet"));

        for (let i = 0; i < dataCilObj.length; i++) {
            // obtiene el valor final de la ctacte con la suma de la ph y aplicada y le suma el valor la ph adicional
            let newTotal = getTotalValClient*acumulateFinVal;
            let finalValueContent =newTotal+finalValue;
            // obtiene los datos del cilindro (cod omologacion y n°serie)
            const element = dataCilObj[i];
            console.log(`UPDATE cilindersaved SET paydate='${clearData}' WHERE serialnumber='${element["id"]}' AND omologation= '${element["code"]}'`);

            let obsContent = `pH,${element["code"]} ,${element["id"]},${dataNew}`;
            await runAnswer(`INSERT INTO payordebit (date, obs  , pay , debit , total ,owner, ordernum)VALUES('${totalDate}','${obsContent}','${getTotalValClient}',0,'${finalValueContent}','${clearData}','${orderNumContent}')`)
            await runAnswer(`UPDATE cilindersaved SET paydate='${clearData}' WHERE serialnumber='${element["id"]}' AND omologation= '${element["code"]}'`);
            acumulateFinVal++;
        }
    }else{
        let finalValueContent = parseInt(finalValue) + parseInt(getTotalValClient)
        await runAnswer(`INSERT INTO payordebit (date, obs  , pay , debit , total ,owner, ordernum)VALUES('${totalDate}','${obs}','${getTotalValClient}',0,'${finalValueContent}','${clearData}','${orderNumContent}')`)
        console.log(`UPDATE cilindersaved SET paydate='${clearData}' WHERE id=(SELECT id FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1)`)
        await runAnswer(`UPDATE cilindersaved SET paydate='${clearData}' WHERE id=(SELECT id FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1)`);
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}


async function getWorkShopName( totalDate , getTotalValClient , finalValue , clearData , orderNumContent ){
    // obtiene el nombre del taller por el que pasó el cilindro
    const nameTdm   = await allAnswer(`SELECT workshop FROM tdm WHERE id = '${localStorage.getItem("idWorkShop")}' `);
    let obs         = "";
    // si existen datos de un cilindro en el storage los recorre y los inserta en obs 
    if(localStorage.getItem("cilinderInfo") || localStorage.getItem("cilinderInfoToCompromisSheet")){
        let storageDataContent  = "";
        // corrobora si es un cilindro normal o un cilindro que viene de ficha tecnica
        if(!localStorage.getItem("cilinderInfoToCompromisSheet")){
            console.log("entra en la condicion de un solo cilindro")
            storageDataContent  = localStorage.getItem("cilinderInfo");
            storageDataContent  = storageDataContent.split(",");
            obs = `pH,${storageDataContent[0]} ,${storageDataContent[1]}, ${nameTdm[0]["workshop"]}`;
            await payCilandSavePayOnDb(totalDate ,obs ,getTotalValClient ,finalValue ,clearData,orderNumContent);
        }else{
            console.log("entra en multiples cilindros");
            await payCilandSavePayOnDb(totalDate ,obs ,getTotalValClient ,finalValue ,clearData,orderNumContent,nameTdm[0]["workshop"]);
        }
    }
    
    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    getWorkShopName
}