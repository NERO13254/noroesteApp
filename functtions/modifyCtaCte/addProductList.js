// fucnion que agrega el producto a la lista de productos
function addProductList(elementValue, brandOrSerial){
    let div = document.createElement("div");
    div.className= "productContent";
    div.innerHTML = `
    <strong id='insideid'>${elementValue.children[0].textContent}</strong>
    <strong id='nameProd'>${elementValue.children[1].textContent}</strong>
    <input  id='ammounProd' type='number' value='1'>
    <strong id='valueProd'>${elementValue.children[3].textContent}</strong>
    <strong id='totalvalue'>${elementValue.children[3].textContent}</strong>
    <strong id='serialName'>${brandOrSerial}</strong>
    <input type='button' value='X' class='removeItemOfTheList'>
    `;
    listProducts.append(div);
}

module.exports = {
    addProductList
}