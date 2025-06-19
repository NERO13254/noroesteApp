const { answers } = require("./answers");

async function desplegateCtaCte(e) {

    let idCtaCte = e.target.id;
    localStorage.setItem("idCtaCte", idCtaCte);
    
    if(idCtaCte=='000'){
        localStorage.setItem("finalConsumer" , ["1","consumidor final","0.20"]);
    }
    else{
        // obtiene el contador de clicks , le suma +1 y lo actualiza
        let constructSelectAnswer = await answers.readClickCount(idCtaCte);
        let getNumber = constructSelectAnswer.length>0 ?constructSelectAnswer[0]["clickcount"]+1 : 1 ;
        await answers.updateClickerCount(getNumber , idCtaCte);
        localStorage.removeItem("finalConsumer");
    }
}

module.exports = {
    desplegateCtaCte
}