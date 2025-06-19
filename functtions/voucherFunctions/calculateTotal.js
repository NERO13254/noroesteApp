async function calculateTotal() {
    // obtiene el valor del descuento
    let discount = document.getElementById("discount").value ;
    discount = discount != null ? discount : 0
    let totalValue = 0;
    // obtiene todos los poductos de la lista
    let allProducts = Array.from(document.querySelectorAll(".contentProduct"));
    allProducts.forEach(element=>{
        let val     = parseInt(element.children[3].textContent.replace(/\./g  , ""));
        let ammount = element.children[4].tagName!="INPUT" ? 1 : element.children[4].value;

        totalValue += val * ammount;
    })

    totalValue = totalValue - (totalValue *(discount/100));
    document.getElementById("totalValue").textContent = totalValue.toLocaleString();
}

module.exports = {
    calculateTotal
}