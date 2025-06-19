async function saveChangesOfTheKit() {
    let objectsArray =[];
    // obtiene todos los contenedores de los productos del kit
    let productContainer = productsContainerOfTheKit.querySelectorAll(".productContainer");
    // recorre los prodcutos creando un objeto por cada uno y lo inserta en el array , obteniendo un array dObjetos
    productContainer.forEach(element => {
       let newObject = {
        id: element.children[0].textContent,
        name: element.children[1].textContent,
        brand: element.children[2].textContent,
        ammount : element.children[5].value
       };
       objectsArray.push(newObject)
    });
    console.log(buyContent.value);
    let saleValueKit = parseInt(buyContent.value.replace(/\./g , ""));

    await runAnswer(`UPDATE kit SET name='${nameKit.value}',content='${JSON.stringify(objectsArray)}' , salevalue='${saleValueKit}' WHERE id='${idKitSelected}' `);
    await reloadKitList.reloadKitList();
    valueKit.classList.toggle("show");
}

module.exports = {
    saveChangesOfTheKit
}