const { collectDataClient } = require("./answers");

async function insertDniInHtml(params) {
    let getInputs = document.getElementsByClassName("row2")[0].querySelectorAll("input");
    let collectDataDni = await collectDataClient(params);
    if(collectDataDni.length>0){
        console.log(collectDataDni[0])
        getInputs.forEach(element=>{
            if(element.getAttribute("name")){
                if(element.id=="dniUser"){
                    element.value = collectDataDni[0]["dni"];
                }
                else if(element.id=="typeDni"){
                    element.value = "DNI";
                }
                else{
                    element.value = collectDataDni[0][element.id];
                }
                
            }
        });                
    }
}

module.exports = {
    insertDniInHtml
}