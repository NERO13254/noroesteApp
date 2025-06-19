const { answers } = require("./answers");

async function searchProdsInDb(e) {
    // obtiene el valor de busqueda ingresado por el usuario
    let nameProduct = e.target.value;
    if(nameProduct.length>1){
        resultsOfTheSearchProdsOnDb.style.display="block";
        resultsOfTheSearchProdsOnDb.innerHTML="";
        // obtiene los productos coincidientes de la base de datos 
        let listSearch = await answers.readLikeProduct(nameProduct);
        
        if(listSearch.length>0){
            // recorre todos los resultados
            listSearch.forEach(element => {
                let firstCharTypeProduct ="";
                // si es un producto con serie le agrega s adelante del id para difrenciarlos
                if(!element["serial"] || element["serial"]=="0" || element["serial"]=="NO"){
                    firstCharTypeProduct = "P_"
                }else{
                    firstCharTypeProduct = "S_"
                }
                // crea el elemento html y lo añade a la lista 
                let div = document.createElement("div");
                div.className = "productsComesFromDb";
                div.innerHTML = `
                <strong>${firstCharTypeProduct+element["insideid"]}</strong>
                <strong>${element["name"]}</strong>
                <strong>${element["brand"]}</strong>
                <strong>${parseInt(element["finalvalue"]).toLocaleString()}</strong>
                <input type='checkbox' >
                `;
                resultsOfTheSearchProdsOnDb.append(div);
            });
        }
    }else{
        // si se ingresaron menos de 2 letras en el input para buscar , oculta el div de resultados del buscador
        resultsOfTheSearchProdsOnDb.style.display="none";
    }
}

module.exports = {
    searchProdsInDb
}