async function startSearchCountry(data , searchResults){

    // obtiene el contenedor de resultados
    let resultsContent= document.getElementById("resultsContent");
    // limpia el contenedor de resultados
    resultsContent.innerHTML="";
    resultsContent.style.display = "block"
    
    country.value   = searchResults.length>0 ? searchResults[0]["name"] :  data;
    cp.value        = searchResults.length>0 ? searchResults[0]["cp"] :  "";

}
module.exports = {
    startSearchCountry
}