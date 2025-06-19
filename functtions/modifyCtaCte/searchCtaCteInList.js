async function searchCtaCteInList(params) {
    resultsOfTheSearch.innerHTML='';
    // obtiene todos los strongs que se encuentren disponibles
    let collectInputs= Array.from(allResults.querySelectorAll(".ctaCteResult"));
    // filtra los strongs encontrados coincidientes  con el input a buscar
    let filteredInputs = collectInputs.filter(data=> data.children[0].textContent.toUpperCase().includes(params.toUpperCase()));
    if(filteredInputs.length>0){
        resultsOfTheSearch.style.display ='flex';
        filteredInputs.forEach(element=>{
            let nodeCloned = element.cloneNode(true);
            resultsOfTheSearch.append(nodeCloned);
        });
    }else{
        resultsOfTheSearch.style.display ='none';
    }
}

module.exports = {
    searchCtaCteInList
}