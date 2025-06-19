const { updateWafer } = require("./answers");

async function modifyWafer(params) {
    // recibe el input que contiene los inputs y los seleccina a todos los inputs
    let contentValues = Array.from(params.querySelectorAll("input"));
    // obtiene el id de la oblea mediante el nombre de el boton "guardar"
    let idWafer = params.lastChild.previousSibling.name;
    // obtiene el div de la oblea en la lista general y corrobora  que la marca contenga algo
    let brandedCase = (params.children[3].name=="branded" && params.children[3].value.length>0) ? true : false;
    let getDivOfTheGeneralList = document.querySelector(`#listWafer #modifyRowWafer[name='${idWafer}']`).parentNode;
    // recorre los inputs
    let dataAnswer =  "";
    
    contentValues.forEach(element => {
        let inputOfGeneralList = getDivOfTheGeneralList.querySelector(`input[name='${element.name}']`);
        dataAnswer+= `${element.name}='${element.value}',`;
        // Actualiza los valores de la oblea en la lista general
        inputOfGeneralList.value = element.value;
        // actualiza el color de fondo de la oblea según fue marcada
        if(brandedCase){
            inputOfGeneralList.classList.remove("wafersNotBranded");
        }else{
            inputOfGeneralList.classList.add("wafersNotBranded");
        }
        
    });

    try {
        // actualiza la oblea en db
        await updateWafer(dataAnswer.slice(0,-1) , idWafer );
        params.classList.toggle("succesBorderer");
    } catch (error) {
        params.classList.toggle("dangerousBorderer");
    }
}

module.exports = {
    modifyWafer
}