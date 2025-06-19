const { answers } = require("./answers");


async function changeTdmData(){
   await answers.beginTransaction();
   let getDataTdm =  await answers.ReadTdmData();
   let keys = Object.keys(getDataTdm[0]).slice(1);

    let pecNumbers = [getDataTdm[0]["pec"]];
    // obtiene todos los numeros de pec filtrando los repetidos , y los almacena en un array
    getDataTdm.forEach(data=>{
        pecNumbers.includes(data["pec"]) ? "" : pecNumbers.push(data["pec"]);
    })

    // inserta los datos en pecs
    // for (let i = 0; i < pecNumbers.length; i++) {
    //     let data = pecNumbers[i];
    //     await answers.insertPec("pec", data);
    // }
    

    // crea la nueva tabla TDM relacinal
    let columnTypeAndName ="id INTEGER PRIMARY KEY AUTOINCREMENT,"; 
    keys.forEach(element=>{
        columnTypeAndName+= element!="pec" ? `${element} TEXT,` : "pec INTEGER NOT NULL DEFAULT 1,";
    })

    //elimina la tabla
    await answers.DeleteTable();

    //crea la tabla nuevamente
    await answers.createTable(columnTypeAndName);

    // inserta los datos en la nueva tabla TDM

    for (let i = 0; i < getDataTdm.length; i++) {
        const element = getDataTdm[i];
        let keysValues = "";
        let values = "";
        keys.forEach(data => {
            keysValues+=`${data != "id_pec" ? data : "pec"},`; 
            values += element[data]!= null ? `'${element[data]}',` : " ''," ;
        });

        await answers.insertTdm(keysValues.slice(0,-1) , values.slice(0,-1));
    }

    await answers.commit();
}


module.exports = {
    changeTdmData
}