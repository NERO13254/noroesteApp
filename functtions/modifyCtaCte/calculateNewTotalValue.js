function calculateNewTotalValue(e){
    if(e){
        // actualiza el valor total parcial del producto
        let getAmmount = e.target.value;
        let getValue   = parseInt(e.target.parentNode.children[3].textContent.replace(/\./g,""));
        let newValue    = getAmmount*getValue;
        e.target.parentNode.children[4].textContent = newValue.toLocaleString();
    }

    //calcula el valor total con el descuento aplicado y lo inserta en html
    let discountContent = document.getElementById("descountInput");
    let totalContent = document.getElementById("totalValueOfVoucher");
    let finalValueContent=0;
    let getData = document.querySelectorAll(".productContent");
    getData.forEach(element => {
        let ammount = element.children[2].tagName=="INPUT" ?element.children[2].value : element.children[2].textContent
        finalValueContent= finalValueContent + parseInt(ammount) * parseInt(element.children[3].textContent.replace(/\./g,""));
    });
    finalValueContent = finalValueContent + finalValueContent*parseInt(discountContent.value)/ -100;
    totalContent.textContent = Math.round(finalValueContent).toLocaleString();
}

module.exports = {
    calculateNewTotalValue
}