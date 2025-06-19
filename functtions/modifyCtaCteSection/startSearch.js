async function startSearch(target) {


    let resultsOfSearch = document.getElementById("resultsOfSearch");
    resultsOfSearch.innerHTML = '';
    resultsOfSearch.style.display='block';
    // obtiene todas las cuentas corrientes y las recorre
    document.querySelectorAll(".ctaCteContent").forEach(element=>{

        // si se encuentran coincidencias con la cuneta corriente y el parametro a buscar
        if(element.children[1].textContent.toLowerCase().includes(target.value.toLowerCase())){
            let nodeCloned = element.cloneNode(true);
            resultsOfSearch.append(nodeCloned);
        }
    })

    if(target.value.length<=0){
        resultsOfSearch.style.display='none';
    }
}

module.exports = {
    startSearch
}