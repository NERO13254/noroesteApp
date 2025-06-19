async function collectPairCilinders(dni , workshopcode , chekeddate) {
    let anserContent = "";
    // corrobora si es que existe la fecha donde se le hizo prueba hiraulica , sino la reemplaza por limit 3
    if(!chekeddate){
       anserContent =` ORDER BY id DESC LIMIT 3`;
    }else{
     anserContent =` AND chekeddate='${chekeddate}' `;
    }
    // realiza la consulta a db
    console.log(`SELECT omologation , serialnumber , datefab, lastcrpc FROM cilindersaved WHERE dni='${dni}' AND workshopcode='${workshopcode}' ${anserContent}`);

    
    const getDataPairCil    = await allAnswer(`SELECT omologation , serialnumber , datefab, lastcrpc FROM cilindersaved WHERE dni='${dni}' AND workshopcode='${workshopcode}' ${anserContent}`);
    // const getCrpc           = await allAnswer(`SELECT crpc FROM TDM WHERE id='${workshopcode}'`);
    let crpcContent         =  "NORO";
    console.log(crpcContent);
    for (let i = 0; i < getDataPairCil.length; i++) {
        const element = getDataPairCil[i];
        if(document.getElementById("omologation"+i)){
            pairOmologationCils.push(element["omologation"]);
            pairSerialNumberCils.push(element["serialnumber"]);
            document.getElementById("omologation"+i).value=element["omologation"];
            document.getElementById("serialnumber"+i).value=element["serialnumber"];
            document.getElementById("crpc"+i).value= crpcContent;
            document.getElementById("capacity"+i).value='0'
            document.getElementById("typeOperationCil"+i).value='S'
            document.getElementById("codeValve"+i).value="S"
            document.getElementById("serialValve"+i).value="S"
            document.getElementById("typeOperationValve"+i).value="S"
            if(element["datefab"]){
                completeDates(element["datefab"] , "dateFabMonth","dateFabYear" , i );
            }
            if(element["lastcrpc"]){
                completeDates(element["lastcrpc"] , "chekeddateMonth","chekeddateYear" , i );
            }
        }
    }
    // funcion que rellena las fechas de mes y año 
    function completeDates(date, dateFabMonth , dateFabYear , i){
        if(date){
            let onlyDate = date.split("/");

            document.getElementById(dateFabMonth+i).value=onlyDate[0];
            document.getElementById(dateFabYear+i).value=onlyDate[1];
        }
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}
module.exports = {
    collectPairCilinders
}