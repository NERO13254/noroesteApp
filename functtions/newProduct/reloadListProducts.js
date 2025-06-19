const { answer } = require("./answers");

async function reloadListProducts(){
    prductsList.innerHTML="";
    // obtiene los datos de todos los productos
    const getProductsDb = await answer.readAllProducts();

    // recorre los productos y genera un div por cada uno

    getProductsDb.forEach((element,index) => {
        var div = document.createElement("div");
        div.className = "contenetProd";
        div.id        ="A"+element["id"];
        let costValue = element["buyvalue"];
        let billedContent = 0;
        if(element["billed"]){
            billedContent =parseInt(element["billed"]);
        }
        
        let finalValueContent = element["finalvalue"] ? element["finalvalue"].toLocaleString() : 0;
        div.innerHTML= `
        <strong id="${element["id"]}" value="${element["path"]}">${element["id"]}</strong>
        <strong id="codigo_interno" class='productData'>${element["insideid"]}</strong>
        <strong id="nombre" class='productData'>${element["name"]}</strong>
        <strong id="existencias" class='productData'>${parseInt(element["existence"])+ billedContent }</strong>
        <strong id="marca" class='productData' >${element["brand"]}</strong>
        <strong id="valor" class='productData'>$${finalValueContent} </strong>
        <button id='addProductInWeb'>+</button>
        <button id='downProductOfWeb'>-</button>
        <input type="checkbox" class="${element["id"]}" id="${element["serial"]}">
        `;

        div.style.background = index%2==0 ? "rgb(237, 237, 237)" : "white";
    
        if(element["web"]=="SI"){
            div.style.borderRight = "6px solid green";
        }else{
            div.style.borderRight = "6px solid red";
        }
        prductsList.append(div);
    });

}
module.exports = {
    reloadListProducts
}