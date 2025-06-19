async function searchResults(e) {
    let searchContent = e.target.value.trim().toLowerCase();
    // obtiene todos los resultados
    let allData = Array.from(document.querySelectorAll(".dataResults .dataContent input"));
    if(searchContent.length>1 &&allData.length>0){
        // filtra los datos con el parametro de busqueda
        let dataFiltered = allData.filter(data=>data.value.trim().toLowerCase().includes(searchContent));
        // si encuentra datos coincidientes los imprime en la seccion de resultados correspondientes
        document.getElementById("egressSearch").innerHTML='';
        document.getElementById("paySearch").innerHTML='';
        document.querySelector(".contentResults").style.display="grid";

        if(dataFiltered.length>0){
            dataFiltered.forEach(element => {
                let content = element.parentNode.parentNode.id=="egressDefault"? "egressSearch" : "paySearch";
                content = document.getElementById(content);
                let divCloned = element.parentNode.cloneNode(true);
                content.append(divCloned);
            });
        }
    }else{
        document.getElementById("egressSearch").innerHTML='';
        document.getElementById("paySearch").innerHTML='';
        document.querySelector(".contentResults").style.display="none";
    }
}

module.exports = {
    searchResults
}