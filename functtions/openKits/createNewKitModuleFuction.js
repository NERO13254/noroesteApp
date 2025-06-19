async function createNewKitModuleFuction() {
    // crea un array , para luego insertar cada producto en forma de objeto y tener un array de objetos
    let arrayToObjectProducts = []; 
    // obtiene el div de cada producto
    let contentProductsOfTheNewKit = document.getElementById("contentProductsOfTheNewKit").querySelectorAll(".productContainer");
    contentProductsOfTheNewKit.forEach(element=>{
        let newObjet = {
            id : element.children[0].textContent,
            name: element.children[1].textContent,
            brand : element.children[2].textContent,
            ammount : element.children[4].value
        }
        arrayToObjectProducts.push(newObjet);
    });
    // obtiene el nombre del kit
    let nameNewKit = document.getElementById("nameNewKitContent").value;
    // obtiene el valor de venta del kit
    let saleValueKit = parseInt(document.getElementById("saleValueNewKit").value.replace(/\./g , ""));
    //ejecuta laa consulta insert 
    await runAnswer(`INSERT INTO kit (name , content , salevalue)VALUES('${nameNewKit}', '${JSON.stringify(arrayToObjectProducts)}' , '${saleValueKit}' )`);
    // cierra  la ventana de kit
    createKit.classList.toggle("show");
    await reloadKitList.reloadKitList();
}

module.exports  = {
    createNewKitModuleFuction
}