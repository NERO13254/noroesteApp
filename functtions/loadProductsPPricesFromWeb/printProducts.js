async function printProducts(objData) {

    let listProductsModified = document.getElementById("listProductsModified");
    listProductsModified.innerHTML ="";


    // recorre cada producto y lo inserta
    objData.forEach(element => {
        console.log(element);
        let div = document.createElement("div");
        div.className = "productContent";
        div.innerHTML = `
            <div class='headerProduct' id='${element["insideid"]}'>
                <strong>${element["nombre"]}</strong>
                <button class='cancelProcess'>eliminar</button>
                <button>ver</button>
            </div>
        `;
        
        // recorre todos los datos y crea un input con la informacion de cada uno
        let detailedDiv = document.createElement("div");
        detailedDiv.className= "detailedContent";
        let objKey = Object.keys(element).slice(2);
        objKey.forEach(data=>{
            let input =  document.createElement("input");
            input.className = "dataContent";
            input.value = element[data];
            detailedDiv.append(input); 
        })

        div.append(detailedDiv);
        listProductsModified.append(div)
    });
}

module.exports = {
    printProducts
}