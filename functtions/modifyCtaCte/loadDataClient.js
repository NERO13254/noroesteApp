const { answers } = require("./answers");
let nameCtaCte = document.getElementById("nameContent");

async function loadDataClient() {
    if(!localStorage.getItem("finalConsumer")){
        // obtiene los datos de la cuenta seleccionada del localStorage
        let getDataClient = await answers.readDataClient(localStorage.getItem("idCtaCte"));
        
        // imprime los datos  en el html
        nameCtaCte.textContent= getDataClient[0]["id"]+" "+getDataClient[0]["name"];
        phValue.textContent   = getDataClient[0]["valorph"];
    }else{
        nameCtaCte.textContent= "Consumidor Final";
        phValue.style.display = "none";
    }
}

module.exports = {
    loadDataClient
}