function addProduct (obj){

    console.log(obj["ammounProd"]);
    let ammountContent = "";
    if(obj["ammounProd"]==0){
        ammountContent = '<strong id="ammounProd" >1</strong>';
    }else{
        ammountContent = `<input type="number" id="ammounProd" value="${obj["ammounProd"]}" id="ammounProd">`; 
    }

    let div = document.createElement("div");
    div.className = "productContent";
    div.innerHTML = `
    <strong id="insideid">${obj["insideid"]}</strong>
    <strong id="nameProd">${obj["nameProd"]}</strong>
    ${ammountContent}
    <strong id="valueProd">${obj["valueProd"]}</strong>
    <strong id="totalValue">${obj["totalValue"]}</strong>
    <strong id="serialName">${obj["serialName"]}</strong>
    <input type="button" value="X" class="removeItemOfTheList">
    `;
    document.getElementById("listProducts").append(div);
    document.getElementById("resultsOfTheSearchProdsOnDb").style.display='none';
}

module.exports = {
    addProduct
}