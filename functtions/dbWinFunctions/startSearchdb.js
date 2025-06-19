function startSearchDb(data){
    
    // obtiene el valor que se desea buscar
    let dataUser        = data.value.trim().toLowerCase();
    console.log(dataUser);
    // obtiene y limpia el contenedor de resultados
    let searchedResults = document.getElementById("searchedResults");
    searchedResults.innerHTML="";
    
    // obtiene todos los inputs de la lista
    let searchContent   = Array.from(document.querySelectorAll("#defaultResults input"));
    
    // filtra los resultados coincidientes de la lista con el valor a buscar
    let filteredResults = searchContent.filter(data=> data.value.toLowerCase().trim().includes(dataUser));
    
    //si encuentra resultados los imprime en HTML
    if(filteredResults.length>0){
        filteredResults.forEach(element => {
            let nodeCloned = element.parentNode.cloneNode(true);
            nodeCloned.querySelectorAll("input").forEach(data=>{data.style.backgroundColor="rgb(233 233 233)";});
            nodeCloned.querySelector(`.${element.className}`).style.backgroundColor="orange";
            searchedResults.append(nodeCloned);
        });
    }else{
        searchedResults.innerHTML="";
    }

}
module.exports= {
    startSearchDb
}