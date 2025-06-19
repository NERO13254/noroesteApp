async function insertCildb(insideId,watertemp,volF,taraF,certificatenumberDb,newPath,thisDate){
    let material = localStorage.getItem("material");
    let newDate = new Date();
    let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`; 
    return new Promise((resolve, reject) => {
            
    let getDataUser = JSON.parse(localStorage.getItem("getDataUser"));
    let idWorkShop = parseInt(localStorage.getItem("idWorkShop"));
    db.run("INSERT INTO cilindersaved  ( workshopcode ,insideid ,serialnumber , brand , datefab , diametronominal, rulefab , lastcrpc, coeficent, pec ,diametro1 , diametro2 , diametro3 , diametro4 , diametro5 , diametro6 , diametro7 , diametro8 , fondo1 , fondo2 , fondo3, fondo4 , fondo5 , fondo6 ,ojiva1 , ojiva2 ,ojiva3 ,ojiva4 , ojiva5 , ojiva6 , diam1 , diam2 , diam3 , diam4 , diam5 , diam6 , expansiontotal , expansionpermanente, bureta , watertemperature , volestimado , volmedido, taraestimado, taramedido,certificatenumber , country , cp , direccion , dni , domain ,nameandsurname,provincia, omologation,material,capacity, img , chekeddate , obs , exportado, idtype) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
        idWorkShop,
        insideId,
        serialNumber.value,
        bandCilinder.value,
        dateFab.value,
        diametter.value,
        rules.textContent,
        lastCrpc.value,
        coeficent.textContent,
        pec.value,
        localStorage.getItem("1espesor"),
        localStorage.getItem("2espesor"),
        localStorage.getItem("3espesor"),
        localStorage.getItem("4espesor"),
        localStorage.getItem("5espesor"),
        localStorage.getItem("6espesor"),
        localStorage.getItem("7espesor"),
        localStorage.getItem("8espesor"),
        localStorage.getItem("1under"),
        localStorage.getItem("2under"),
        localStorage.getItem("3under"),
        localStorage.getItem("4under"),
        localStorage.getItem("5under"),
        localStorage.getItem("6under"),
        localStorage.getItem("1ojive"),
        localStorage.getItem("2ojive"),
        localStorage.getItem("3ojive"),
        localStorage.getItem("4ojive"),
        localStorage.getItem("5ojive"),
        localStorage.getItem("6ojive"),
        localStorage.getItem("1diamVal"),
        localStorage.getItem("2diamVal"),
        localStorage.getItem("3diamVal"),
        localStorage.getItem("4diamVal"),
        localStorage.getItem("5diamVal"),
        localStorage.getItem("6diamVal"),
        maxExpansion.textContent,
        totalExpansion.textContent,
        "MAYOR",
        watertemp,
        volF,
        volF,
        taraF,
        taraF,
        certificatenumberDb,
        getDataUser.country,
        getDataUser.cp,
        getDataUser.direcion,
        getDataUser.dni,
        getDataUser.domain,
        getDataUser.nameAndSurname,
        getDataUser.provincia,
        codeO.value,
        material,
        capacity.value,
        newPath,
        dateNow,
        obs.value,
        0,
        getDataUser.idtype
    ], 
    (err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("el cilindro se carga despues");
            resolve();
        }
    });
    })
}

module.exports = {
    insertCildb
}