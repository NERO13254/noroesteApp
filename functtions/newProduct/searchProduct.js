async function searchProduct(params) {
    let searchConainer  = document.getElementById("searchConainer");
    if(params.length >2){
        searchConainer.style.display="block";
        // vacía el contenedor de las busquedas del html
        searchConainer.innerHTML="";
        let getData = Array.from(document.querySelectorAll(".contenetProd"));
        // filtra los productos con los parametros de busqueda especificados
        let results = getData.filter(data=>data.children[2].textContent.includes(params));

        // recorre todos los coincidientes y los imprime el el html cambiando su color
        results.forEach((element, index)=>{
            let elementCloned = element.cloneNode(true);
            searchConainer.append(elementCloned);
            elementCloned.style.backgroundColor = index%2 == 0 ? 'rgb(237, 237, 237)' : "white";
        });
        
    }else{
        searchConainer.style.display="none";
    }
}

module.exports = {
    searchProduct
}