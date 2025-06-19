const { answers } = require("./answers");
const {reportStatus} = require("../reportStatus");

async function startSearchCilinder(params) {
    let dataSearch = document.getElementById("inputSerialCilinder").value.trim();
    let cilinder = await answers.readCilinder(dataSearch);
  
    if(cilinder.length>0){
        let payName = await answers.readNameOwnerCilinder(cilinder[0]["paydate"]);
        payName = payName.length>0 ? payName[0]["name"] : "---";
        document.getElementById("cilinderListContent").innerHTML='';
        // busca el tdm por el cual pasó el cilndro
        let tdmId = "";
        document.querySelectorAll(".contentDiv").forEach(data=>{
            tdmId = cilinder[0]["workshopcode"]==data.children[0].textContent ? data.children[1].textContent: tdmId
        });

        let div         = document.createElement("div");
        div.className   = "searchContentData";
        div.id          = cilinder[0]["id"];
        div.innerHTML   = `
        <strong>${cilinder[0]["omologation"]}</strong>
        <strong>${cilinder[0]["serialnumber"]}</strong>
        <strong>${tdmId}</strong>
        <strong id="payDate">${payName}</strong>
        `;
        document.getElementById("cilinderListContent").append(div);
        document.getElementById("searcherContainerResults").style.display="block";
    }else{
        reportStatus("Error" , "No se encontraron coincidencias" , `No existe un cilindro que tenga el numero de serie : ${event} , corrobore que haya ingresado el numero correctamente ` , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("alertContent"));
    }
}

module.exports = {
    startSearchCilinder
}