async function loadDataInHtml() {
    // obtiene el codigo de taller
    let getWorkshopCode =  await allAnswer(`SELECT workshopcode FROM tdm WHERE id = '${localStorage.getItem("idWorkShop")}' `);
    document.getElementById("getWorkshopCode").textContent = getWorkshopCode[0]["workshopcode"];
    
    // obtiene los datos del cilindro
    let getCilinderData = await allAnswer(`SELECT nameandsurname , direccion , country , provincia ,cp , dni, domain , brand , omologation , serialnumber , datefab , volmedido , pec ,chekeddate, certificatenumber, insideid , chekeddate FROM cilindersaved WHERE id = '${localStorage.getItem("idCilinderSaved")}'`);
    let newDate = new Date();
    let getDate = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    let getYear = getCilinderData[0]["chekeddate"].length>0 ? getCilinderData[0]["chekeddate"] :  getDate ;
    // obtiene las keys de los datos
    let getKeysData = Object.keys(getCilinderData[0]);
    // hace un bucle para recorrer los datos e insertarlos en el html
    let number = 0
    getKeysData.forEach(element => {
        number++;
        let strong = document.createElement("strong");
        strong.id=element;
        strong.textContent = getCilinderData[0][element];
        if(element == 'certificatenumber' ){
            strong.textContent = "NORO0"+getCilinderData[0][element];
        }if(element == 'chekeddate'){
            let getNewDate =  getCilinderData[0][element].split("/");
            let strong2 = document.createElement("strong");
            strong2.id = element+2;
            strong2.textContent = `${getNewDate[0]}/${getNewDate[1]}/${parseInt(getNewDate[2])+5}`;
            dinamycData.append(strong2);
        }
        dinamycData.append(strong);
    });
}
module.exports = {
    loadDataInHtml
}