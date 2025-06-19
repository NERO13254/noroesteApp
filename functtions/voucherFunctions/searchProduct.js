const { answers } = require("./answers")

const allProducts = answers.readAllProducts();

async function searchProduct(target) {
    document.getElementById("searchContent").style.display='block';
    let insertProducts = document.getElementById("contentProducts");
    insertProducts.innerHTML='';
    insertProducts.style.display='block';
    
    // filtra los productos segun los valores ingresados por el usuario y a los resultados los almacena en array
    let products = [];
    Array.from(await allProducts).forEach(element =>{
        String(element["name"]).toUpperCase().trim().includes(target.toUpperCase().trim())
        ? products.push(element) 
        : "";
    })

    
    // crea un elemento div con los datos del producto y los inserta en la lista de resultados
    let numberIteration =0;
    products.forEach(element=>{
        let div         = document.createElement("div");
        div.className   = 'productResult';
        div.innerHTML   = `
            <strong>${element["insideid"]}</strong>
            <strong>${element["name"]}</strong>
            <strong>${element["brand"] ? element["brand"] : "NE"}</strong>
            <strong>${element["finalvalue"] ? parseInt(element["finalvalue"]).toLocaleString() : 0 }</strong>
            <input type='checkbox' name='${element["serial"]}' >
        `;
        insertProducts.append(div);

        numberIteration%2 == 0 ? div.style.background='rgb(247, 247, 247)' : "";
        numberIteration+=1;
    })
}

module.exports = {
    searchProduct
}