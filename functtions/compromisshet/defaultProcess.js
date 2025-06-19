const { answers } = require("./answers");

async function defaultPrcess() {


    // obtiene el numero de PEC de db y lo inserta el numero de PEC en el HTML
    let getPec = answers.readPec(localStorage.getItem("idTdm"));
    document.getElementById("numberPec").textContent =getPec.length>0 ? getPec[0]["pec"] : "3101" ;

    if(localStorage.getItem("idCilinderSaved")){
        const getCilinder = localStorage.getItem("idCilinderSaved");

        // obtiene todos los inputs del usuario y obtiene usus id para hacer la consulta a db
        let getUserInputs = document.querySelectorAll(".userData");
        let collectData = "";
        getUserInputs.forEach(element => {
            collectData+=`${element.id},`;
        });
        let getDataUserCil = await answers.readDataClient(collectData.slice(0,-1) , getCilinder );

        // recorre los resultados de la consulta y los inserta sus inputs correspondientes
        let getKeys = Object.keys(getDataUserCil[0]);
        for (let i = 0; i < Object.keys(getDataUserCil[0]).length; i++) {
            if(getUserInputs[i]){
                getUserInputs[i].value = getDataUserCil[0][getKeys[i]];
            }
        }

        
        // obtiene el dni y la patente para corroborar si hay otro cilindro compañero del seleccionado
        const getTwinedCilinders = await answers.readPairCilinders(document.getElementById("dni").value, document.getElementById("domain").value , getDataUserCil[0]["chekeddate"])

        for (let i = 0; i < getTwinedCilinders.length; i++) {
            const element = getTwinedCilinders[i];
            console.log(element);
            
            let contentInput = document.getElementById("omologation"+i);

            if(contentInput){
                contentInput.value = element["omologation"];
                document.getElementById("serialnumber"+i).value = element["serialnumber"];
            }
            if(element["taramedido"]){
                document.getElementById("taramedido"+i).value = element["taramedido"]
            }
            if(element["volmedido"]){
                document.getElementById("volmedido"+i).value = element["volmedido"]
            }
        }
    }


    // obtiene las provincias y las inserta en el HTML
    const getProvinces = await answers.readProvinces();
    for (let i = 0; i < getProvinces.length; i++) {
        const element   = getProvinces[i];
        let option = new Option(element["name"] , element["name"], false ,false);
        document.getElementById("provincia").append(option);
    }
}

module.exports = {
    defaultPrcess
}