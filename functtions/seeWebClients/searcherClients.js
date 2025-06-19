function searcherClients(searchResults , paramSearch){
    searchResults.innerHTML="";
    if(paramSearch.value.length <=2){
        searchResults.style.display="none";
    }else{
        searchResults.style.display="block";
        // obtiene el parametro de busqueda
        let searchFor = document.getElementById("searchFor").value;
        // se seleccionan todos los elementos a buscar
        let getElements = Array.from(document.querySelectorAll(".userContent"));
        // filtra los elementos coincidientes segun el valor del input seleccionado y el parametro de busqueda
        let filteredEelements = getElements.filter(data=>data.children[searchFor].textContent.toUpperCase().trim().includes(paramSearch.value.toUpperCase().trim()));
        
        // con los resultados encontrados los clona y los añade a la lista de reusltados
        filteredEelements.forEach(element=>{
            let nodeCloned = element.cloneNode(true);
            nodeCloned.style.backgroundColor="white";
            document.getElementById("searchResults").append(nodeCloned);
        });
    }
}

module.exports = {
    searcherClients
}