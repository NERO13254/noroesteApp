const { getWorkShopName } = require("./getWorkShopName");

async function saveCil(e , letter){
    var targetName= e.target.className ;

    if(targetName.charAt(0) ==  letter){
        var clearData = targetName.slice(1);
        // obtiene el valor final de la ctaCte y el valor que cuesta la ph para el usuaio y suma el valor
        const getTotalValueCtaCte   = await searchTotalPayOrDebit.searchTotalPayOrDebit(clearData);
        let getTotalValClient       = parseInt(document.getElementById("V"+clearData).textContent);
        let finalValue              = parseInt(getTotalValueCtaCte);
        // obtiene la fecha
        let newDate     = new Date();
        let totalDate   = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
        // obtiene el numero de orden final +1
        const orderNum  = await getOrderNumPayoOrDebit.getOrderNumPayoOrDebit();


        // obtiene el nombre del taller y cobra el cilindro a la cta cte y actualiza el cobro en cilindros guardados
        await getWorkShopName(totalDate , getTotalValClient , finalValue , clearData , orderNum);
       
        if(!localStorage.getItem("idCilinderSaved")){ 
            ipcRenderer.send("seeSavedCilinders");
            localStorage.removeItem("dataUser");
            localStorage.removeItem("cilinderInfoToCompromisSheet");
        }


        return new Promise((resolve, reject) => {
            resolve();
        })
    }
}

module.exports = {
    saveCil
}