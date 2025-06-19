const { searchDni, insertClient, updateClient } = require("./answers");

async function saveOrUpdateDate(getInputsClient){
    // corrobora si existe un dato con ese dni en db
    const getIdClient = await searchDni(dni.value);
    let chainOfClinetData   = "";
    //  recorre todos los valores de los inputs y crea una cadena con cada valor encontrado
    if(getIdClient.length<=0){
        // crea una sola cadena con los valores y los inserta haciendo un slice para eliminar la ulitma ","
        getInputsClient.forEach(element => {
            chainOfClinetData+=`'${element.value}',`;
        });
        // isnerta el cliente en DB
        await insertClient(chainOfClinetData.slice(0,-1));
    }else{

        for (let i = 0; i < getInputsClient.length; i++) {
            const element = getInputsClient[i];
            chainOfClinetData+=`${element.id}='${element.value}',`;
        }
        // actualiza los datos del cliente
        await updateClient(chainOfClinetData.slice(0,-1) , getIdClient[0]["id"] );
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}
module.exports = {
    saveOrUpdateDate
}