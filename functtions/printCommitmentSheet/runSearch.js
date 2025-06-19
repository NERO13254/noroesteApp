async function runSearch(nameInputListener , searchContent) {
    let nameInputListenerContent = document.getElementById(nameInputListener);
    nameInputListenerContent.addEventListener("keyup" , async(e)=>{
        // obtiene el contenedor de los resultados
        searchContent.innerHtml='';
        let resultsContent = e.target.parentNode.children[2];
        resultsContent.innerHtml='';
        // si encuentra resultados muestra el contenedor del html
        if(e.target.value.length>1){
            resultsContent.style.display='block';
            document.getElementById("contentSearchSelected").style.display="block";
            document.getElementById("contentSearchSelectedBrands").style.display="block";
            await searchCarAproximate.searchCarAproximate(e.target , e.target.parentNode.children[2].children[0]);
        }else{
            resultsContent.style.display='none';
            document.getElementById("contentSearchSelected").style.display="none";
            document.getElementById("contentSearchSelectedBrands").style.display="none";
        }
    });
}

module.exports = {
    runSearch
}