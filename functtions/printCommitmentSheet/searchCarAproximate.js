async function searchCarAproximate(element , appendContainer) {
    // obtiene el valor que se está buscando y el contenedor de resultados
    let getValue = element.value.toLowerCase();
    let getContainerOfSearch = element.parentNode.children[2].children[1];
    // a base del contenedor selecciona todos los elementos del html
    let getAllResults = Array.from(getContainerOfSearch.querySelectorAll(".searchBrand"));
    // filtra los resultados con el elemento de busqueda
    let newResults = getAllResults.filter(data=> data.children[0].textContent.toLowerCase().includes(getValue)) ;
    appendContainer.innerHTML="";
    if(newResults.length>0){
        
        newResults.forEach(element=>{
            let nodeCloned = element.cloneNode(true);
            appendContainer.append(nodeCloned);
        });
    }else{
        appendContainer.innerHTML="";
    }
}

module.exports = {
    searchCarAproximate
}