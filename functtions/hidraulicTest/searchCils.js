async function searchCilinder(event){
    let searcherContentInfo = document.getElementById("alertContent");
    searcherContainerResults.innerHTML="";
    // busca el cilindro coincidiente con el numero ingresado
    const getDataCil = await allAnswer(`SELECT id ,omologation , serialnumber ,paydate , workshopcode FROM cilindersaved WHERE serialnumber = '${event}'`);
    // si no ncuentra coincidencias despliega la alerta
    if(getDataCil.length == 0){
        reportStatus.reportStatus("Error" , "No se encontraron coincidencias" , `No existe un cilindro que tenga el numero de serie : ${event} , corrobore que haya ingresado el numero correctamente ` , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("alertContent"));
        searcherContainerResults.style.display="none";
    }else{
        searcherContainerResults.style.display="block";
        // si no se encuentra quien pagó el cilindro lo reepmlaza por "---"
        let nameCtaCte  = "";
        if(!getDataCil[0]["paydate"]){
            nameCtaCte= "---";
        }else{
            const getNameCtaCte = await allAnswer(`SELECT name FROM cuentascorrientes WHERE id ='${getDataCil[0]["paydate"]}'`);
            nameCtaCte = getNameCtaCte[0]["name"];
        }
        const getDataTdm = await allAnswer(`SELECT workshop FROM tdm WHERE id ='${getDataCil[0]["workshopcode"]}'`);

        let div         = document.createElement("div");
        div.className   = "searchContentData";
        div.id          = "S"+getDataCil[0]["id"];
        div.innerHTML   = `
        <strong>${getDataCil[0]["omologation"]}</strong>
        <strong>${getDataCil[0]["serialnumber"]}</strong>
        <strong>${getDataTdm[0]["workshop"]}</strong>
        <strong id="payDate">${nameCtaCte}</strong>
        `;
        searcherContainerResults.append(div);
    }
}
module.exports = {
    searchCilinder
}