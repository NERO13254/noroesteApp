const { answers } = require("./answers");

async function loadAllPecs() {

    let pec = document.getElementById("pec");


    function createOption(element){
        let option = document.createElement("option");
        option.textContent = element["pec"];
        option.value = element["pec"];
        pec.append(option)
    }

    let allPecs = await answers.pecsTdm(localStorage.getItem("idWorkShop"));

    if(localStorage.getItem("idCilinderSaved")){
        let pecData = await answers.readPecSaved(localStorage.getItem("idCilinderSaved"));
        console.log("es un cilindro previo")
        createOption(pecData[0])
    }else{
        for (let i = 0; i < allPecs.length; i++) {
            const element = allPecs[i];
            pec.append(new Option(element["pec"] , element["pec"] ));
        }
    }
}

module.exports = {
    loadAllPecs
}