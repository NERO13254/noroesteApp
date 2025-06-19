const { answers } = require("./answers");

async function refreshHistoryVucherList() {

    // obtiene el primer valor del id del div , que es el numero de remito en la lista
    let getNumberVoucher = String(divContent.id).match(/\d+/g);
    getNumberVoucher = parseInt(getNumberVoucher[0]);

    let newOwner = document.getElementById("idNewOwner").textContent.length>0 ?
    document.getElementById("idNewOwner").textContent : 
    document.getElementById("nameContent").textContent.split(" ")[0] ;
    
    await answers.beggin();
    
    // actualiza el remito seleccionado
    await answers.updateVoucher(
        parseInt(document.getElementById("total").value.replace(/\./g,"")),
        parseInt(document.getElementById("pay").value.replace(/\./g,"")),
        parseInt(document.getElementById("debit").value.replace(/\./g,"")),
        document.getElementById("obs").value,
        divContent.children[5].id,
        newOwner
    ) 
    
    // actualiza los valores previos al remito modificado
    if(getNumberVoucher>1){
        // obtiene el numero de remito y el id de la cuenta corriente para generar la consulta
        let idVoucher = divContent.children[5].id;
        let owner = document.getElementById("nameContent").textContent.split(" ")[0];
        let getPreviousVouchers = await answers.readPreiousVouchers( idVoucher,owner);
        
        let finalValue = parseInt(document.getElementById("total").value.replace(/\./g,""));

        for (let i = 0; i < getPreviousVouchers.length; i++) {
            const element = getPreviousVouchers[i];
            
            // obtiene el valor total parcial del remito 
            let voucherValue = element["pay"] - Math.abs(element["debit"])
            finalValue +=  voucherValue

            await answers.updatePreviousVouchers(finalValue , element["id"]);
        }
    }
    await answers.commit();
}

module.exports = {
    refreshHistoryVucherList
}