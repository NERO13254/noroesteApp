function searchWaferForDomain(params){
    let resultsOfSearch = document.getElementById("resultsOfSearch");
    // limpia el contenedor de resultados
    resultsOfSearch.innerHTML="";

    // obtiene todos los dominios existentes en la lista de obleas
    let getWaferDomain = Array.from(document.querySelectorAll("#listWafer input[name='domain']"));
    // recorre los dominios y filtra los resultados coincidientes con el parametro de busqueda
    let filteredCoincidences = getWaferDomain.filter(data=>data.value.trim().includes(params));
    // inserta los resultados de busqueda en el HTML
    filteredCoincidences.forEach(element => {
        let nodeCloned = element.parentNode.cloneNode(true);
        resultsOfSearch.append(nodeCloned);
    });
}


module.exports = {
    searchWaferForDomain
}