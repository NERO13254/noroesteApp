async function collectDataForStorage(iteratorCil) {
    let omologationContent      = "";
    let serialNumberContent     = "";
    let arrObj =[];
    for (let i = 0; i < 4; i++) {
        // obtiene el codigo de homologado individual
        let onlyOmologation = document.getElementById("omologation"+i);

        if(onlyOmologation.value.length>0){
            omologationContent = onlyOmologation.value;
            serialNumberContent = onlyOmologation.parentNode.nextSibling.nextSibling.children[0].value;

            arrObj.push({"code" : omologationContent , "id":serialNumberContent });
            iteratorCil++
        }
    }
    localStorage.setItem("cilinderInfoToCompromisSheet", JSON.stringify(arrObj));

    return iteratorCil ;
}

module.exports = {
    collectDataForStorage
}