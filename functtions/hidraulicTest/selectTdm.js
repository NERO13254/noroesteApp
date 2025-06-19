const { answers } = require("./answers");

async function selectTdm(e) {
    let elementSelected = e.target;
    localStorage.setItem( "idWorkShop" ,elementSelected.className);

    // obtiene el contador de clicks , le suma +1 y lo actualiza
    let constructSelectAnswer = await answers.readClickCount(elementSelected.className);
 
    
    let getNumber = constructSelectAnswer.length>0 ?parseInt(constructSelectAnswer[0]["clickcount"])+1 : 1 ;

    await answers.updateClickerCount(getNumber , elementSelected.className);
}

module.exports = {
    selectTdm
}