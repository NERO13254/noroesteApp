function collectDataCilSaved(){
    collectDataToObjetct = {
        codeO : codeO.value,
        dateFab : dateFab.value,
        tara : tara.value,
        vol : vol.value,
        lastCrpc : lastCrpc.value,
        serialNumber : serialNumber.value,
        caseCil : caseCil.value,
        brand : bandCilinder.value,
        capacity : capacity.value,
        diametter: diametter.value,
        width:widthCil.value,
        pec : pec.value,
        thikness : thikness.textContent,
        coficent : coeficent.textContent,
        rules : rules.textContent,
        maxexpansion: maxExpansion.textContent,
        totalexpansion:totalExpansion.textContent
    }
    stringObjet = JSON.stringify(collectDataToObjetct);
    localStorage.setItem("cilinderData" , stringObjet);
}

module.exports =  {
    collectDataCilSaved
}