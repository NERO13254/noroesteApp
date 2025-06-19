const { answers } = require("./answers");

async function updateVoucherForOtherClient(getTarget, nameCtaCte , insideIdVoucher) {
    // obtiene los valroes del remito
    let date    = document.getElementById("date").value;
    let obs     = document.getElementById("obs").value;
    let pay     = parseInt(document.getElementById("pay").value.replace(/\./g,""));
    let debit   = parseInt(document.getElementById("debit").value.replace(/\./g,""))*-1;
    let total   = parseInt(document.getElementById("total").value.replace(/\./g,""))
    let owner = document.getElementById("idNewOwner").textContent;
    owner = owner.length>0 ? owner : document.getElementById("name").split(",")[0];
    let finalValuePartial = pay + debit ;

    // obtiene el remito anterior al que se está modificando (si se pasa el 9888 , obtiene datos  del 9887)
    let collectPreviousTotal = await answers.collectPreviousVoucher(idNewOwner.textContent,getTarget.id);
    collectPreviousTotal = collectPreviousTotal.length>0?parseInt(collectPreviousTotal[0]["total"]) : 0;

    // obtiene todos los remitos que tengan un id mayor al que se está modificando
    let collectVouchers = await answers.collectLastestVouchers(idNewOwner.textContent,getTarget.id);
    
    // actualiza el remito y cierra la ventana
    let newTotal = finalValuePartial + collectPreviousTotal;
    await answers.updateVoucher(newTotal,pay,debit,obs,insideIdVoucher,owner);

    if(collectVouchers.length>0){
        // recorre todos remitos previos para actualizar su valor total
        await answers.beggin();
        for (let i = 0; i < collectVouchers.length; i++) {
            let  total = collectVouchers[i]["total"];
            const id = collectVouchers[i]["id"];
            total = total + newTotal
            await answers.updatePreviousVouchers(total , id);
        }
        await answers.commit();
    }else{
        window.close();
    }

    // si es una ph genera la consulta adaptada para esta
    if(typeVoucher.textContent.length>0){
        let obsSpliited = document.getElementById("obs").value.split(" ");
        let obsNameTdm =  obsSpliited.slice(2).join(" ");
        // reforma las obs para insertarlas en db
        obsReformed = `pH,${obsSpliited[0]} ,${obsSpliited[1]}, ${obsNameTdm}`;
        // actualiza el dueño del remito en cilindersaved
        await answers.updateOwnerPh(idNewOwner.textContent,obsSpliited[0],obsSpliited[1],nameCtaCte);
    }
}

module.exports = {
    updateVoucherForOtherClient
}