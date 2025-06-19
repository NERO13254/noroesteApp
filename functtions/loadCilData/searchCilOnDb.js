async function searchCilOnDb(data){
    // obtiene los datos del cilindro de la table "typecilinders" en base al codigo de tubo ("ER32")
    const getDataCil = await allAnswer(`SELECT * FROM typecilinders WHERE code LIKE '%' || '${data}' || '%'  `)
    
    if(getDataCil.length !== 0 ){
        // si la expancion maxima es nula entonces le asigna el promedio : 294
        if(isNaN(getDataCil[0]["thikness"]) || isNaN(getDataCil[0]["maxexpansion"]) ){
            // rellena los datos incompletos necesarios para hacer los calculos
            getDataCil[0]["maxexpansion"]   = 294;
            getDataCil[0]["thikness"]       = 5;
        }
        await chargeData.chargeData(getDataCil[0]);
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}
module.exports = {
    searchCilOnDb
}